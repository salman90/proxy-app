const dbConfig  = require('../config/db.config.js');
const Sequelize = require("sequelize"); 


/**
 * create new sequelize instance with database configuration for development environment
 */
const sequelize = new Sequelize(dbConfig.development.DB, dbConfig.development.USER, dbConfig.development.PASSWORD, {
    host: dbConfig.development.HOST,
    port: dbConfig.development.PORT,
    dialect: dbConfig.development.dialect,
    pool: {
        max: dbConfig.development.pool.max,
        min: dbConfig.development.pool.min,
        acquire: dbConfig.development.pool.acquire,
        idle: dbConfig.development.pool.idle
    }
})

/**
 * create new sequelize instance with database configuration for testing environment
 */
const sequelizeTest = new Sequelize(dbConfig.test.DB, dbConfig.test.USER, dbConfig.test.PASSWORD, {
    host: dbConfig.test.HOST,
    port: dbConfig.test.PORT,
    dialect: dbConfig.test.dialect,
    pool: {
        max: dbConfig.test.pool.max,
        min: dbConfig.test.pool.min,
        acquire: dbConfig.test.pool.acquire,
        idle: dbConfig.test.pool.idle
    }
})
const DevDB = {};
const testDB = {};


DevDB.Sequelize = Sequelize;
testDB.Sequelize = Sequelize;
DevDB.sequelize = sequelize;
testDB.sequelize = sequelizeTest;

DevDB.malware = require("./malware.model.js")(sequelize, Sequelize);;
testDB.malware = require("./malware.model.js")(sequelizeTest, Sequelize);;

module.exports = { DevDB, testDB} ;

