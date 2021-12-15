module.exports = function(sequelize, Sequelize) {
    return sequelize.define('daily', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        Phone: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        District: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        Day: {
            type: Sequelize.DATE,
            allowNull: true
        },
        Debts: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING(30),
            allowNull: true
        }

    }, {
        sequelize,
        tableName: 'daily',
        timestamps: false,
    });
};
