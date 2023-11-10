use("movies")

db.createCollection('movies')

db.movies.insertMany([
   {

      title: "Inception",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      releaseYear: 2010,
      rating: 8.8,
      duration: 100
   },
   {

      title: "The Shawshank Redemption",
      genre: "Drama",
      director: "Frank Darabont",
      releaseYear: 1994,
      rating: 9.3,
      duration: 100
   },
   {

      title: "Pulp Fiction",
      genre: "Crime",
      director: "Quentin Tarantino",
      releaseYear: 1994,
      rating: 8.9,
      duration: 100
   },
   {

      title: "The Dark Knight",
      genre: "Action",
      director: "Christopher Nolan",
      releaseYear: 2008,
      rating: 9.0,
      duration: 100
   },
   {

      title: "Forrest Gump",
      genre: "Drama",
      director: "Robert Zemeckis",
      releaseYear: 1994,
      rating: 8.8,
      duration: 100
   },
   {

      title: "The Matrix",
      genre: "Science Fiction",
      director: "The Wachowskis",
      releaseYear: 1999,
      rating: 8.7,
      duration: 100
   },
   {

      title: "Fight Club",
      genre: "Drama",
      director: "David Fincher",
      releaseYear: 1999,
      rating: 8.8,
      duration: 100
   },
   {

      title: "The Godfather",
      genre: "Crime",
      director: "Francis Ford Coppola",
      releaseYear: 1972,
      rating: 9.2,
      duration: 100
   },
   {

      title: "The Lord of the Rings: The Fellowship of the Ring",
      genre: "Adventure",
      director: "Peter Jackson",
      releaseYear: 2001,
      rating: 8.8,
      duration: 100
   },
   {
      title: "Interstellar",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      releaseYear: 2014,
      rating: 9,
      duration: 100
   },
])

db.movies.findOne({ _id: ObjectId('654e7cc08050a8c855a20c05') })
db.movies.find()

