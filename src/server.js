import http from 'node:http'
import { json } from './middlewares/json.js'
// CommonJS => required
// ESModules => import/export

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: users.length + 1,
            name,
            email
        })

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end()
})

server.listen(3333)
// localhost:3333

