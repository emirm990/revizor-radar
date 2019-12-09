import axios from "axios";

const url = "api/auth";
class AuthService {
    static login(email, password) {
        return axios.get("api/auth?email=" + email + "&password=" + password);
    }
    static register(name, email, password) {

        return axios.post(url, {
            name,
            email,
            password
        });
    }
}
export default AuthService;