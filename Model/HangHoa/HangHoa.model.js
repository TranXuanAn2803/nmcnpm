module.exports = function(sequelize, Sequelize) {
    return sequelize.define('hanghoa', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        Unit: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        Price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    }, {
        sequelize,
        tableName: 'hanghoa',
        timestamps: false,
    });
};