import SequelizeAuto from 'sequelize-auto';
const auto = new SequelizeAuto('bu4wembnuycqg4czxufz', 'u3jxiph0g0shxvdn', 'uHMvvanCtFUlO9OylMtG', {
    host: 'bu4wembnuycqg4czxufz-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    directory: './src/models', // where to write files
    port: 3306,
    caseModel: 'l', // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    lang: 'ts',
    additional: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    },
    tables: [
        'item', 
    ], // use all tables, if omitte
    useDefine: true,
    
})


auto.run().then(data => {
  console.log(data.tables);      // table and field list
  console.log(data.foreignKeys); // table foreign key list
  console.log(data.indexes);     // table indexes
  console.log(data.hasTriggerTables); // tables that have triggers
  console.log(data.relations);   // relationships between models
  console.log(data.text)         // text of generated models
});