'use strict'

class Collection {

    constructor(name = '', model) {
        this.name = name; 
        this.model = model; 
        this.associations = new Map();
    }

    async create(json) {
        try{
            let record = await this.model.create(json);

        return record;
        }catch(e) {
            console.error('Cannot create model Error : ' + this.name);
            return e;
        }
    }
    async read(id, options = {}) {
        let sqlOptions = {};
        let records = null;
        if (options.include) sqlOptions['include'] = this.associations.get(options.include); 
        
        try {
            if (id) {
            options['where'] = { id };
            records = await this.model.findOne(sqlOptions);
            } else {
            records = await this.model.findAll(sqlOptions);
            }

            return records;
        } catch (e) {
            console.error('Error reading data for model : ' + this.name);
            return e
        }
        }

        async update(id, json) {
        try {
            if (!id) throw new Error('No record ID provided for model : ' + this.name);

            let record = await this.model.findOne({where: { id }});
            let updatedRecord = await record.update(json);
            return updatedRecord;
        } catch (e) {
            console.error('Error updating model : ' + this.name);
            return e;
        }
        }

        async delete(id) {
        try {

            if (!id) throw new Error('No record ID provided for model : ' + this.name);

            let deletedRecord = await this.model.destroy({ where: { id } });
            return deletedRecord;

        } catch (e) {
            console.error('Error deleting data for model : ' + this.name);
            return e;
        }
        }

        createAssociation(type, model, options) {
        try {
            this.model[type](model, options);
            this.associations.set(model.name, model);
        } catch (e) {
            console.error('Error adding an association for model : ' + this.name);
            return e
        }
        }
    }
    
    module.exports = Collection;
