import axios from 'axios';
import configData from '../config.json';

export const apiClient = axios.create({
    baseURL: configData.BASE_API_URL,
    withCredentials: true,
});

// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// check if user is logged in from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}
   
// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
   
// set the token and user from the session storage
export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}