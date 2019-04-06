require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/db');
const sequelize = db.sequelize;
const User = db.models.User;
const Role = db.models.Role;
const Grade = db.models.Grade;
const Feature = db.models.Feature;
const Script = db.models.Script;
const app = express();
const port = 3000;
const seedData = require('./db/seedDB')

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
});

const eraseDatabaseOnSync = false;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    if (eraseDatabaseOnSync) {
        // seed DB with data
        seedData.createDataInDB()
    }
	app.listen(process.env.PORT || port, () => {
		console.log(`Server running on port ${port}.`)
	});
});

// setting up model relationships
// Roles
Role.hasMany(User);
User.belongsTo(Role);
// Grades
User.hasMany(Grade);
Grade.belongsTo(User);
//Features
Role.hasMany(Feature);
Feature.belongsTo(Role);
Feature.hasMany(Grade);
Grade.belongsTo(Feature);
// Scripts
Script.belongsTo(Feature);
Feature.hasOne(Script);

app.get('/', (req, res) => {
	res.send('greetings and salutations from the uat app')
});

app.get('/users', (req, res) => {
	// User.findAll().then((users) => {
	// 	res.send(users);
    // });
    User.findAll({
        include: [{model: Role}]
    }).then((users) => {
        res.send(users)
    })
});

app.post('/users', (req, res) => {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const email = req.body.email;
	const role_id = req.body.role_id;

	const newUser = User.build({
		first_name: first_name,
		last_name: last_name,
		email: email,
		role_id: role_id
	});

	newUser.save().then((record) => {
		res.send("User saved: " + JSON.stringify(record))
	}).catch((err) => {
		res.send('Error saving user: ' + err);
	})
});

app.get('/roles', (req, res) => {
	// Role.findAll().then((roles) => {
	// 	res.send(roles);
    // });
    
    Role.findAll({
        include: [{ model: User }]
    }).then((roles) => {
        res.send(roles)
    })
});

app.post('/roles', (req, res) => {
	const name = req.body.name;

	const newRole = Role.build({
		name: name
	});

	newRole.save().then((record) => {
		res.send("Role saved: " + JSON.stringify(record))
	}).catch((err) => {
		res.send('Error saving role: ' + err);
	});
});

app.get('/grades', (req, res) => {
    Grade.findAll({
        include: [{ model: User }, { model: Feature }]
    }).then((grades) => {
        res.send(grades)
    })
});

app.get('/features', (req, res) => {
    Feature.findAll({
        include: [{ model: Role }, { model: Grade }, { model: Script}]
    }).then((features) => {
        res.send(features)
    })
})

app.get('/scripts', (req, res) => {
    Script.findAll({
        include: [{model: Feature}]
    }).then((scripts) => {
        res.send(scripts)
    })
});

app.post('/scripts', (req, res) => {
    const feature_id = req.body.feature_id;
    const name = req.body.name;
    const url = req.body.url;
    const description = req.body.description;
    const steps = req.body.steps;

    const newScript = Script.build({
        feature_id,
        name,
        url,
        description,
        steps
    });

    newScript.save().then((script) => {
		res.send("Script saved: " + JSON.stringify(script))
	}).catch((err) => {
		res.send('Error saving script: ' + err);
	});

})

/*

newRole.save().then((record) => {
		res.send("Role saved: " + JSON.stringify(record))
	}).catch((err) => {
		res.send('Error saving role: ' + err);
    });
    
    */