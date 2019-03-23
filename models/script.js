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
        steps: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        underscored: true
    })

    return Script
}

module.exports = script;