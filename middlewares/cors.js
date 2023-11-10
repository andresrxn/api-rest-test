import cors from 'cors'

const corsMD = ({ options } = {}) => cors({
   origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
         'https://api-rest-test-dev-gxsp.1.us-1.fl0.io',
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
