// src/services/apimock.js

const mockData = [
    { author: 'John', name: 'house', points: [{ x: 10, y: 10 }, { x: 50, y: 80 }, { x: 100, y: 100 }] },
    { author: 'John', name: 'car', points: [{ x: 20, y: 20 }, { x: 90, y: 90 }] },
    { author: 'Jane', name: 'tree', points: [{ x: 5, y: 5 }, { x: 60, y: 120 }, { x: 120, y: 5 }] },
]

const apimock = {
    get: (url) => {

        const parts = url.split('/').filter(part => part !== '');
        if (parts[0] == 'blueprints') {
            // GET /blueprints → todos
            if (parts.length === 1) {
                return Promise.resolve({ data: mockData });
            }

            const author = parts[1];

            // GET /blueprints/:author/:name -> buscar uno
            if (parts.length === 3) {
                const name = parts[2];
                const result = mockData.find(bp =>
                    bp.author.toLowerCase() === author.toLowerCase() &&
                    bp.name.toLowerCase() === name.toLowerCase()
                );

                return Promise.resolve({ data: result });
            }

            //Get /blueprints/:author → filtrar por autor
            if (parts.length === 2) {
                const result = mockData.filter(bp => bp.author.toLowerCase() === author.toLowerCase());
                return Promise.resolve({ data: result });
            }
        }
    },

    post: (url, data) => {

        //PostBlueprint -> crea uno nuevo
        if (url == '/blueprints') {
            mockData.push(data);
            return Promise.resolve({ status: 201, data: data })
        }

        return Promise.reject({ status: 400, message: 'Bad Request' })
    }
}

export default apimock