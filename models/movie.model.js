import MOVIES from '../utils/movies.js'

export class MovieModel {
   static async isValidId({ id }) {
      return MOVIES.findIndex(movie => movie.id === parseInt(id))
   }

   static async getMovies({ options } = {}) {
      return { result: MOVIES.length, movies: MOVIES }
   }

   static async getByType({ type, value }) {
      const movies = await MOVIES.filter(movie => movie[type].toString().toLocaleLowerCase() === value.toLocaleLowerCase())
      return movies
   }

   static async addMovie({ data }) {

      const newMovie = {
         id: MOVIES.length + 1,
         ...data
      }

      MOVIES.push(newMovie)
      return newMovie
   }

   static async updateMovie({ movieIndex, data }) {

      const updatedMovie = {
         ...MOVIES[movieIndex],
         ...data
      }
      MOVIES[movieIndex] = updatedMovie
      return updatedMovie
   }

   static async deleteMovie({ movieIndex }) {
      MOVIES.slice(movieIndex, 1)
      return true
   }

}