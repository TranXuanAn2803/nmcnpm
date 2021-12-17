module.exports = function(sequelize, Sequelize) {
    return sequelize.define('phieuthu', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        DaiLy_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Phone: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        Date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        Address: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        Email: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        Total_Money: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    }, {
        sequelize,
        tableName: 'phieuthu',
        timestamps: false,
    });
};