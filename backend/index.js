import express from 'express'
import body_parser from 'body-parser'
import usersRouter from './src/routes/users.routes.js'
import articlesRouter from './src/routes/articles.routes.js'
import commentsRouter from './src/routes/commets.routes.js'
import publicationsRouter from './src/routes/publications.routes.js'

const server = express()
const port = 3333

// Config
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))

// Routes
server.use(usersRouter)
server.use(articlesRouter)
server.use(commentsRouter)
server.use(publicationsRouter)

// Listen
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}, server: http://localhost:${port}`);
})
