import axios from "./axios";

export const getHikingsRequest = () => axios.get(`/hikingplaces`);

export const getHikingRequest = id => axios.get(`/hikingplaces/${id}`);

export const createHikingRequest = hiking => axios.post(`/hikingplaces`, hiking);

export const updateHikingRequest = (hiking) => axios.put(`/hikingplaces/${hiking.id}`, hiking);

export const deleteHikingsRequest = (id) => axios.delete(`/hikingplaces/${id}`);