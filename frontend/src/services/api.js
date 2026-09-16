import axios from "axios";

const API = axios.create({
  baseURL: "http://YOUR_EC2_PUBLIC_IP:5000",
});

export default API;
