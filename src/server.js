import http from 'node:http'
// CommonJS => required
// ESModules => import/export

const server = http.createServer((req, res) => {
    return res.end('Hello World')        
})

server.listen(3333)
// localhost:3333
