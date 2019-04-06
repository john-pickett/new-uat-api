const script = (sequelize, DataTypes) => {
    const Script = sequelize.define('script', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        feature_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        steps: {
            type: DataTypes.JSON
        }
    }, {
        underscored: true
    })

    return Script
}

module.exports = script;