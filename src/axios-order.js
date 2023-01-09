import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burgerbuilder-98582-default-rtdb.firebaseio.com/",
});

export default instance;
