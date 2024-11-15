const auth = {
    isLoggedIn: false,
    login(username) {
        localStorage.setItem("user", username);
        this.isLoggedIn = true;
    },
    logout() {
        localStorage.removeItem("user");
        this.isLoggedIn = false;
    },
    checkAuth() {
        this.isLoggedIn = !!localStorage.getItem("user");
        return this.isLoggedIn;
    }
};