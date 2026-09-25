// src/services/apiclientService.js
import api from './apiClient.js'

const apiclientService = {
    get: (url) => {
        return api.get(url)
    },
    post: (url, body) => {
        return api.post(url, body)
    },
    /*
    // GET /blueprints → todos
    getAll: async () => {
        try {
            const response = await api.get('/blueprints')
            return response.data
        } catch (error) {
            console.error("No se pudo obtener la lista de blueprints:", error)
            throw error
        }
    },
    // GET /blueprints/:author → filtrar por autor
    getByAuthor: async (author) => {
        try {
            const response = await api.get('/blueprints/' + author)
            return response.data
        } catch (error) {
            console.error(`No se pudo obtener los blueprints del autor ${author}:`, error)
            throw error
        }
    },
    // GET /blueprints/:author/:name → buscar uno
    getByAuthorAndName: async (author, name) => {
        try {
            const response = await api.get(`/blueprints/${author}/${name}`)
            return response.data
        } catch (error) {
            console.error("No se pudo obtener el blueprint:", error)
            throw error
        }
    },
    // POST /blueprints → crea uno nuevo
    create: async (blueprint) => {
        try {
            const response = await api.post('/blueprints', blueprint)
            return response.data
        } catch (error) {
            console.error("No se pudo crear el blueprint:", error)
            throw error
        }
    },*/
}

export default apiclientService