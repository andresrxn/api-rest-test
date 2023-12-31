
import { validateMovie, validatePartialMovie } from '../schemes/movies.js'
import { MovieModel } from '../models/database/movies.mongo.js'

export class MovieController {


   static async getMovies(req, res) {
      try {
         const movies = await MovieModel.getMovies({})
         // const movies = MovieModel.getMovies({pages, offset, etc})
         if (movies) return res.json(movies)

         throw new Error()

      } catch (error) {
         return res.status(500).json({ error: 1, message: "Cannot get movies" })
      }
   }


   static async getByType(req, res) {
      let { type, value } = req.params
      if (!isNaN(value)) {
         value = parseFloat(value);
      } else {
         value = value.replace(/-/g, ' ');
      }

      try {
         const movie = await MovieModel.getByType({ type, value })
         if (movie.length > 0) return res.json(movie)

         throw new Error()

      } catch (error) {

         return res.status(404).json({ error: 1, message: 'Cannot find movie' })
      }
   }

   static async addMovie(req, res) {

      const result = await validateMovie(req.body)
         .then(async data => {

            const movie = await MovieModel.addMovie({ data })
            if (movie) return res.status(201).json(movie)
            throw new Error()
         })
         .catch(err => {
            const results = err.issues
            const errors = []

            results.forEach(result => {
               errors.push({ type: result.path, error: result.code, message: result.message })
            });

            res.status(400).json({ errors })
         })
   }

   static async updateMovie(req, res) {
      const { id } = req.params

      const movieIndex = await MovieModel.isValidId({ id })

      if (!movieIndex) {
         return res.status(404).json({ error: 1, message: 'Cannot find movie' })
      }

      const result = await validatePartialMovie(req.body)
         .then(async data => {

            const movie = await MovieModel.updateMovie({ id, data })

            if (movie) return res.status(201).json(movie)

            throw new Error()
         })
         .catch(err => {

            const results = err.issues
            const errors = []

            results.forEach(result => {
               errors.push({ type: result.path, error: result.code, message: result.message })
            });

            res.status(400).json(errors)
         })
   }


   static async deleteMovie(req, res) {
      const { id } = req.params

      const movieIndex = await MovieModel.isValidId({ id })

      if (!movieIndex) {
         return res.status(404).json({ error: 1, message: 'Cannot find movie' })
      }

      try {
         const movie = await MovieModel.deleteMovie({ id })
         if (movie) return res.status(201).json({ error: 0, message: "Deleted" })

         throw new Error()

      } catch (error) {
         res.status(500).json({ error: 1, message: "Cannot delete the movie" })

      }
   }

}
