module.exports = {
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'mncnpm_qldaily',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
};