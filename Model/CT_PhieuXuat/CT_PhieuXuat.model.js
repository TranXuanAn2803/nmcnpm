module.exports = function(sequelize, Sequelize) {
    return sequelize.define('ct_phieuxuat', {
        STT: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        PhieuXuat_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        HangHoa_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

    }, {
        sequelize,
        tableName: 'ct_phieuxuat',
        timestamps: false,
    });
};