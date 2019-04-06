const db = require('./db');
const sequelize = db.sequelize;
const User = db.models.User;
const Role = db.models.Role;
const Grade = db.models.Grade;
const Feature = db.models.Feature;
const Script = db.models.Script;

const seedData = require('./seedData');
const rolesList = seedData.rolesList;
const featuresList = seedData.featuresList;
const usersList = seedData.usersList;

const random = (limit) => {
    return Math.floor(Math.random() * limit);
}

const createDataInDB = async () => {

    // ** CREATE ROLES **
    for (var i = 0; i < 4; i++) {
        await Role.create({
            name: rolesList[i]
        })
    }
    
    const roles = await sequelize.queryInterface.sequelize.query(
        'SELECT id from ROLES;'
    );
    const roleRows = roles[0];
    
    // ** CREATE USERS
    
    for (var j = 0; j < usersList.length; j++) {
        // 4 roles but 8 users
        let k = j; 
        if (k > 3) {
            k = k - 4;
        }
        await User.create({
            first_name: usersList[j].first_name,
            last_name: usersList[j].last_name,
            email: usersList[j].email,
            role_id: roleRows[k].id
        })
    }
    
    const users = await sequelize.queryInterface.sequelize.query(
        'SELECT id from USERS;'
    );
    const userRows = users[0];
    
    // ** CREATE FEATURES **

    for (var l = 0; l < featuresList.length; l++) {
        // 4 roles but 8 features
        let k = l; 
        if (k > 3) {
            k = k - 4;
        }
        await Feature.create({
            name: featuresList[l],
            role_id: roleRows[k].id
        })
    }

    const features = await sequelize.queryInterface.sequelize.query(
        'SELECT id from FEATURES'
    )
    const featureRows = features[0];

    // ** CREATE SCRIPTS **

    for (var m = 0; m < featuresList.length; m ++) {
        await Script.create({
            name: 'Script ' + (m + 1),
            feature_id: featureRows[m].id,
            url: 'https://www.test.com/' + m,
            steps: [
                { action: 'Step one action', outcome: 'Step one outcome' },
                { action: 'Step two action', outcome: 'Step two outcome' },
                { action: 'Step three action', outcome: 'Step three outcome' },
                { action: 'Step four action', outcome: 'Step four outcome' }
            ],
            description: 'Here is the description of this feature'
        })
    }

    const scripts = await sequelize.queryInterface.sequelize.query(
        'SELECT * from SCRIPTS'
    )

    const scriptRows = scripts[0];

    /* 
    await Grade.create({
        grade: 'Pass',
        user_id: userRows[0].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[2].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[1].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[3].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[0].id,
        feature_id: featureRows[1].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[1].id,
        feature_id: featureRows[3].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[2].id,
        feature_id: featureRows[2].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[3].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[1].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[6].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[6].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[1].id,
        feature_id: featureRows[3].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[0].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[2].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[1].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[3].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[0].id,
        feature_id: featureRows[1].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[1].id,
        feature_id: featureRows[3].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[2].id,
        feature_id: featureRows[2].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[3].id,
        feature_id: featureRows[4].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[0].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[7].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[6].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[3].id,
        feature_id: featureRows[5].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[4].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[7].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[2].id,
        feature_id: featureRows[6].id
    })

    await Grade.create({
        grade: 'Pass',
        user_id: userRows[1].id,
        feature_id: featureRows[5].id
    })

    await Grade.create({
        grade: 'Fail',
        user_id: userRows[1].id,
        feature_id: featureRows[4].id
    })
    */
}

module.exports = { createDataInDB };