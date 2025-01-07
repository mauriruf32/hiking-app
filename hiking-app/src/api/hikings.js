import axios from "./axios";

export const getHikingsRequest = () => axios.get(`/hikingplaces`);

export const getHikingRequest = (id) => axios.get(`/hikingplaces/${id}`);

export const getHikingByNameRequest = name => axios.get(`/hikingplaces/?name=${name}`);

export const createHikingRequest = hiking => axios.post(`/hikingplaces`, hiking);

export const updateHikingRequest = (id, hiking) => axios.put(`/hikingplaces/${id}`, hiking);

export const deleteHikingsRequest = id => axios.delete(`/hikingplaces/${id}`);