module.exports = (sequelize, DataTypes) => {
    const Steps = sequelize.define("Steps", {
        date: {
            type:DataTypes.DATEONLY,
            allowNull: false
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull:false
        }
    
    });

    return Steps;
}