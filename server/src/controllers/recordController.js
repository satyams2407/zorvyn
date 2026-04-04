const Record = require('../models/Record');

const recordController = {
    createRecord : async (request, response) => {
        const {amount, type, category, date} = request.body;

        try{
            if(!amount || !type || !category || !date){
                return response.status(400).json({message : 'All fields are required'});
            }
            if(!['income', 'expense'].includes(type)){
                return response.status(400).json({message : 'Invalid record type'});
            }
            const newRecord = new Record({
                amount,
                type,
                category,
                date,
                createdBy : request.user._id,
            });
            await newRecord.save();
            return response.status(201).json({success : true, data: newRecord});
        }
        catch(error){
            return response.status(500).json({message : 'An error occurred while creating record.'});
        }
    },
    getAllRecords : async (request, response) => {
        const {type, category, startDate, endDate} = request.query;

        try{
            const filter = {};
            if(type && ['income','expense'].includes(type)){
                filter.type = type;
            }
            if(category){
                filter.category = category;
            }
            if(startDate || endDate){
                filter.date = {};
            }
            if(startDate){
                filter.date.$gte = new Date(startDate);
            }
            if(endDate){
                filter.date.$lte = new Date(endDate);
            }
            const records = await Record.find(filter)
            .populate('createdBy', 'name email role')
            .sort({date : -1});

            return response.status(200).json({success : true, data: records});
        }
        catch(error){
            return response.status(500).json({message : 'An error occurred while fetching records.'});
        }
    },
    updateRecord : async (request, response) => {
        const {amount, type, category, date} = request.body;
        try{
            if(type && !['income', 'expense'].includes(type)){
                return response.status(400).json({message : 'Invalid record type'});
            }
            const updatedRecord = await Record.findById(request.params.id);
            if(!updatedRecord){
                return response.status(404).json({message : 'Record not found'});
            }
            updatedRecord.amount = amount ?? updatedRecord.amount;
            updatedRecord.type = type ?? updatedRecord.type;
            updatedRecord.category = category ?? updatedRecord.category;
            updatedRecord.date = date ?? updatedRecord.date;
            await updatedRecord.save();
            return response.status(200).json({success : true, data: updatedRecord});
        }
        catch(error){
            return response.status(500).json({message : 'An error occurred while updating record.'});
        }
    },
    deleteRecord : async (request, response) => {
        try{
            const deletedRecord = await Record.findByIdAndDelete(request.params.id);
            if(!deletedRecord){
                return response.status(404).json({message : 'Record not found'});
            }
            return response.status(200).json({success : true, message: 'Record deleted successfully'});
        }
        catch(error){
            return response.status(500).json({message : 'An error occurred while deleting record.'});
        }
    }
}