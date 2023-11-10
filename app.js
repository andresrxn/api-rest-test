import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { join } from 'path'
import { fileURLToPath } from 'url'
import MOVIES_ROUTER from './routes/movies.routes.js'
import corsMD from './middlewares/cors.js'


const app = express()
const PORT = process.env.PORT || 3000
const __DIRNAME = fileURLToPath(new URL(".", import.meta.url))

app.disable('x-powered-by')

app.use(corsMD())
app.use(helmet())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(join(__DIRNAME, "public")))


app.get("/api", (req, res) => {
   res.json({ movies: `http://localhost:${PORT}/movies` })
})

app.get('/:page', (req, res) => {
   const pageName = req.params.page;
   const filePath = join(__DIRNAME, 'public', `${pageName}.html`);

   // Verificar si el archivo existe antes de enviarlo
   res.sendFile(filePath, (err) => {
      if (err) {
         res.status(404).send('Page Not Found');
      }
   });
});



app.use("/api/movies", MOVIES_ROUTER)


app.use((req, res) => {
   res.status(404).json({ error: 1, message: 'Not a valid URL' })
})

app.listen(PORT, () => console.log(`Listening https://localhost:${PORT}`))