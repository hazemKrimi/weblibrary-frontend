class Auth {
    static decodeJWT = jwt => {
        return JSON.parse(atob(jwt.split('.')[1])).data;
    }

    constructor() {
        if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "") {
            let data = Auth.decodeJWT(localStorage.getItem("jwt"));
            this.jwt = localStorage.getItem("jwt");
            this.id = data.id;
            this.username = data.username;
            this.email = data.email;
            this.type = data.type;
        }
    }

    getSession = () => {
        let { id, username, email, type } = this;
        if (id && username && email && type) return { id, username, email, type };
        else return null;
    }

    listBooks = async() => {
        try {
            let res = await fetch("http://localhost/web_library/api/list_books.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jwt: this.jwt })
            });
            res = await res.json();
            return res;
        } catch(err) {
            console.log(err);
        }
    }

    createBook = async creds => {
        try {
            let formData = new FormData();
            formData.append("name", creds.name);
            formData.append("book", document.querySelector("#file").files[0]);
            formData.append("jwt", this.jwt);
            let res = await fetch("http://localhost/web_library/api/create_book.php", {
                method: "POST",
                body: formData
            });
            res = await res.json();
            if (res.message === "Book Creation Successful") return true;
            else return res.message;
        } catch(err) {
            console.log(err);
        }
    }

    updateUser = async(username, email, password) => {
        try {
            let res = await fetch("http://localhost/web_library/api/update_user.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jwt: this.jwt, username, email, password })
            });
            res = await res.json();
            if (res.message === "User Update Successful") {
                localStorage.setItem("jwt", res.jwt);
                let data = Auth.decodeJWT(res.jwt);
                this.username = data.username;
                this.email = data.email;
                this.jwt = res.jwt;
                return true;
            } else return res.message;
        } catch (err) {
            console.log(err);
        }
    }

    deleteBook = async(id, path) => {
        try {
            let res = await fetch("http://localhost/web_library/api/delete_book.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jwt: this.jwt, id, path })
            });
            res = await res.json();
            if (res.message === "Book Deletion Successful") return true;
        } catch (err) {
            console.log(err);
        }
    }

    deleteUser = async() => {
        try {
            let res = await fetch("http://localhost/web_library/api/delete_user.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jwt: this.jwt })
            });
            res = await res.json();
            if (res.message === "User Deletion Successful") return true;
        } catch (err) {
            console.log(err);
        }
    }

    signup = async creds => {
        try {
            let res = await fetch("http://localhost/web_library/api/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds)
            });
            res = await res.json();
            if (res.message === "Sign Up Successful") return true;
        } catch (err) {
            return false;
        }
    }

    login = async creds => {
        try {
            let res = await fetch("http://localhost/web_library/api/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds)
            });
            res = await res.json();
            if (res.message === "Login Successful") {
                localStorage.setItem("jwt", res.jwt);
                return true;
            }
        } catch (err) {
            return false;
        }
    } 

    logout = () => {
        localStorage.removeItem("jwt");
        window.location.replace("/");
    }
}

export default new Auth();