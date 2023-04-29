module.exports = (sequelize, DataTypes) => {
    const Methods = sequelize.define("Methods", {
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Methods;
}