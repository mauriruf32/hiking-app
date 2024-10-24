import axios from "./axios";

export const RegisterRequest = user => axios.post(`/register`, user);

export const getCommentsRequest = () => axios.get(`/comments`);

export const getCommentByIdRequest = id => axios.get(`/comments/${id}`);

export const createCommentRequest = (comments) => axios.post(`/comments`, comments);

export const LoginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

// export const logoutRequest = () => axios.get(`/verify`);


// export default RegisterRequest; LoginRequest;
