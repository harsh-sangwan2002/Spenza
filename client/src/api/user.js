import axiosInstance from ".";

export const registerUser = (payload) => {
    try {
        const res = axiosInstance.post('/users/register', payload);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = (payload) => {
    try {
        const res = axiosInstance.post('/users/login', payload);
        return res;
    } catch (err) {
        console.log(err);
    }
}