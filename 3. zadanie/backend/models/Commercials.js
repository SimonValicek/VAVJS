module.exports = (sequelize, DataTypes) => {
    const Commercials = sequelize.define("Commercials", {
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        counter:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Commercials;
}