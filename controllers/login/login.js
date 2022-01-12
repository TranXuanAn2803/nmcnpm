const isAuthenticated = (req, res) => {
    if (req.user) {
        return true;
    }
    return false;
};

const login = (req, res) => {

    res.render('login/login', {
        nav: 0,
        sidebar: 0,
        tag: "Login",
    });

}

module.exports = {
    isAuthenticated,
    login,

}