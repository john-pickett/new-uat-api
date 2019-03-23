const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres'
});

const models = {
	User: sequelize.import('../models/user'),
    Role: sequelize.import('../models/role'),
    Grade: sequelize.import('../models/grade'),
    Feature: sequelize.import('../models/feature'),
    Script: sequelize.import('../models/script')
}


module.exports = { sequelize, models };