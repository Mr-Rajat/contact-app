import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5500/api/",
    headers: {
        'Authorization': 'Bearer '+localStorage.getItem("authToken1"),
    }
})

export default api;