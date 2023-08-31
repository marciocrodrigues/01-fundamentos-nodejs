import http from 'node:http'
// CommonJS => required
// ESModules => import/export

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com'
        })

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end()
})

server.listen(3333)
// localhost:3333

