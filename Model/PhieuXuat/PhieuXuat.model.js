module.exports = function(sequelize, Sequelize) {
    return sequelize.define('phieuxuat', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        DaiLy_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Total_Money: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    }, {
        sequelize,
        tableName: 'phieuxuat',
        timestamps: false,
    });
};