import axios from "axios";

const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request;
    return response.data;
}

const create = async personObject => {
    const request = axios.post(baseUrl, personObject)
    const response = await request;
    return response.data;
}

const remove = async id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request;
    return response.data;
}

const update = async (id, updatedPersonObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPersonObject)
    const response = await request
    return response.data
}

const exportObject = {
    getAll: getAll, 
    create: create, 
    remove: remove,
    update: update
}

export default exportObject