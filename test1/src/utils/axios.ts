//setup axios
import axios from 'axios';

//set base url
axios.defaults.baseURL = 'https://api.github.com';

//fetch users request
const fetchUsers = (query: string) => axios.get(`/search/users?q=${query}&per_page=100`);

//export axios
export { fetchUsers };
