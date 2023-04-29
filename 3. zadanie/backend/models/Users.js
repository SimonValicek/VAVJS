module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Weights, {
            onDelete: "cascade",
        })
    }

    Users.associate = (models) => {
        Users.hasMany(models.Steps, {
            onDelete: "cascade",
        })
    }

    Users.associate = (models) => {
        Users.hasMany(models.Pulses, {
            onDelete: "cascade",
        })
    }
   
    Users.associate = (models) => {
        Users.hasMany(models.Methods, {
            onDelete: "cascade"
        })
    }

    return Users;
}