module.exports = function(sequelize, Sequelize) {
    return sequelize.define('loai_daily', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING(10),
            allowNull: false
        },

        Max_debt: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'loai_daily',
        timestamps: false,
    });
};