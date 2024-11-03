import axios from "./axios";

export const RegisterRequest = user => axios.post(`/register`, user);

export const LoginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

//Comments Requests
export const getCommentsRequest = () => axios.get(`/comments`);

export const getCommentByIdRequest = id => axios.get(`/comments/${id}`);

export const createCommentRequest = (comments) => axios.post(`/comments`, comments);

//Likes Requests
export const createLikeRequest = (likes) => axios.post(`/likes`, likes);

export const getLikeByIdRequest = id => axios.get(`/likes/${id}`);

export const getLikesRequest = () => axios.get(`/likes`);

export const deleteLikeRequest = (userId, hikingId) => axios.delete(`/likes/${userId}/${hikingId}`);

// export const logoutRequest = () => axios.get(`/verify`);


// export default RegisterRequest; LoginRequest;
