import cors from 'cors'

const corsMD = ({ options } = {}) => cors({
   origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
         'http://localhost:3000',
         'http://localhost:3306',
         'http://localhost:8080',
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
         return callback(null, true)
      }

      if (!origin) {
         return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
   }
})

export default corsMD