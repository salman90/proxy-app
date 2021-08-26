/**
 * database configuration for development and test environments
 */

require('dotenv').config();

module.exports = {
    development: {
        // HOST: "mysql_server",
        // USER: 'salman',
        // PASSWORD: 'secret',
        HOST: "localhost",
        PORT: '8889',
        USER: 'root',
        PASSWORD: 'salman',
        DB: 'urlDatabase',
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        HOST: "localhost",
        PORT: '8889',
        USER: 'root',
        PASSWORD: 'salman',
        DB: 'testURLMalware',
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};