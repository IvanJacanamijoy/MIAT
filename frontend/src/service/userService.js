import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios/';

const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const getUserByIdentificacion = async (identificacion) => {
    const response = await axios.get(`${API_URL}/identificacion/${identificacion}`);
    return response.data;
};

const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const userService = {
    getUsers,
    getUserByIdentificacion,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;