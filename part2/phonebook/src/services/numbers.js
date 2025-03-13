import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => { 
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newObject => {
  console.log("Enviando solicitud POST con datos:", newObject);
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  // if (!newObject.name || !newObject.number) {
  //   console.log("No se envió la solicitud porque falta nombre o número");
  //   alert("Both name and number are required!"); // Muestra la advertencia como en el frontend
  //   return Promise.reject(new Error("Both name and number are required!"));
  // }
  console.log("Enviando solicitud PUT con datos:", newObject);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}