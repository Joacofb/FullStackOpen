import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

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

export default { 
    getAll: getAll, 
    create: create, 
    remove: remove,
    update: update
}