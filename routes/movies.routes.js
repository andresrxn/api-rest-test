import express from 'express'
import { MovieController } from '../controllers/movies.controller.js'

const MOVIES_ROUTER = express.Router()

MOVIES_ROUTER.use(express.json())
MOVIES_ROUTER.use(express.urlencoded({ extended: true }))



MOVIES_ROUTER.get('/', MovieController.getMovies)

//ruta para buscar en todos los campos
MOVIES_ROUTER.get('/:type/:value', MovieController.getByType)

MOVIES_ROUTER.post('/', MovieController.addMovie)

MOVIES_ROUTER.patch('/:id', MovieController.updateMovie)

MOVIES_ROUTER.delete('/:id', MovieController.deleteMovie)


// MOVIES_ROUTER.options('/:id', (req, res) => {
//    const origin = req.header('origin')
//    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//       res.header('Access-Control-Allow-Origin', origin)
//       res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//    }
// })


MOVIES_ROUTER.use((req, res) => {
   res.status(404).json({ error: 1, message: "Not a valid URL" })
})


export default MOVIES_ROUTER
