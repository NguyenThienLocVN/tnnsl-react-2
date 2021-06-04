import axios from 'axios';
import configData from '../../config.json';

export const apiClient = axios.create({
    baseURL: configData.BASE_API_URL,
    withCredentials: true,
});

// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// check if user is logged in from the session storage
export const checkLoggedIn = () => {
    return sessionStorage.getItem('isLoggedIn') || null;
}
   
// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
}
   
// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}