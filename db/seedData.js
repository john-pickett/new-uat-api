const rolesList = ['admin', 'hr', 'manager', 'help_desk'];
const usersList = [
    {
        first_name: 'Colonel',
        last_name: 'Mustard',
        email: 'mustard@gmail.com'
    },
    {
        first_name: 'Miss',
        last_name: 'Scarlet',
        email: 'scarlet@gmail.com'
    },
    {
        first_name: 'Mrs.',
        last_name: 'White',
        email: 'white@gmail.com'
    },
    {
        first_name: 'Professor',
        last_name: 'Plum',
        email: 'plum@gmail.com'
    },
    {
        first_name: 'Mr.',
        last_name: 'Boddy',
        email: 'boddy@gmail.com'
    },
    {
        first_name: 'Mrs.',
        last_name: 'Peacock',
        email: 'peacock@gmail.com'
    },
    {
        first_name: 'Evette',
        last_name: 'Collette',
        email: 'themaid@gmail.com'
    },
    {
        first_name: 'Mr.',
        last_name: 'Green',
        email: 'green@gmail.com'
    }];

const featuresList = ['New button that clicks', 
    'New blue button that clicks with ripples', 
    'New chart with graph', 
    'New bigger chart with smaller graph',
    'New user profile', 
    'New super duper user profile with small chart', 
    'New table with search', 
    'New table with sortable column headers'
];

const scriptsList = []

const seedData = {
    rolesList,
    usersList,
    featuresList,
    scriptsList
}

module.exports = seedData;