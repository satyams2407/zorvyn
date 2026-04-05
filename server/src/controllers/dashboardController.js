const Record = require('../models/Record');

const recordController = {
    getSummary: async (request, responsd) => {
        try{
            const totals = await Record.aggregate([
                {
                    $group : {
                        _id : '$type',
                        total : {$sum : '$amount'},
                    }
                }
            ]);

            const categoryTotals = await Record.aggregate([
                {
                    $group : {
                        _id : '$type',
                        total : {$sum : '$amount'},
                    }
                },
                {
                    $sort : {total : -1},
                }
            ]);
            let totalIncome = 0;
            let totalExpenses = 0;

            totals.forEach((item) => {
                if (item._id === 'income') {
                    totalIncome = item.total;
                }
                if (item._id === 'expense') {
                    totalExpenses = item.total;
                }
            });

            const netBalance = totalIncome - totalExpenses;

            return response.status(200).json({
                success: true,
                data: {
                    totalIncome,
                    totalExpenses,
                    netBalance,
                    categoryTotals,
                },
            });
        }
        catch(error){
            return responsd.status(500).json({message : 'Server error'});
        }
    },
    getRecentActivity: async (request, response) => {
        try {
            const limit = Number(request.query.limit) || 5;

            const recentActivity = await Record.find()
                .populate('createdBy', 'name email role')
                .sort({ date: -1, createdAt: -1 })
                .limit(limit);

            return response.status(200).json({
                success: true,
                data: recentActivity,
            });
        } 
        catch(error) {
            return response.status(500).json({message: 'An error occurred while fetching recent activity.'});
        }
    },
    getTrends: async (request, response) => {
        try {
            const period = request.query.period || 'monthly';

            let groupId;

            if (period === 'weekly') {
                groupId = {
                    year: { $isoWeekYear: '$date' },
                    week: { $isoWeek: '$date' },
                    type: '$type',
                };
            } else {
                groupId = {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    type: '$type',
                };
            }

            const trends = await Record.aggregate([
                {
                    $group: {
                        _id: groupId,
                        total: { $sum: '$amount' },
                    },
                },
                {
                    $sort: {
                        '_id.year': 1,
                        '_id.month': 1,
                        '_id.week': 1,
                    },
                },
            ]);

            return response.status(200).json({
                success: true,
                period,
                data: trends,
            });
        } 
        catch (error) {
            return response.status(500).json({ message: 'An error occurred while fetching trends.' });
        }
    },

};

module.exports = recordController;