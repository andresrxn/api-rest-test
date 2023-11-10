import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
const URI_MONGODB = "mongodb+srv://carlosraxon019:N6q0jzX3DJYfbTd1@clustermovie.qwbgz21.mongodb.net/?retryWrites=true&w=majority";

//pass: N6q0jzX3DJYfbTd1

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI_MONGODB, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
   }
})

async function connect() {
   try {
      await client.connect()
      const database = client.db('movies')
      return database.collection('movies')
   } catch (error) {
      console.error('Error connecting to the database')
      console.error(error)
      await client.close()
   }
}

export class MovieModel {

   static async isValidId({ id }) {
      const db = await connect();

      try {
         const objectId = new ObjectId(id);
         const movie = await db.findOne({ _id: { $eq: objectId } });

         return movie !== null;
      } catch (error) {
         return false;
      }
   }

   static async getMovies({ }) {
      const db = await connect()
      // if (genre) {
      //    return db.find({
      //       genre: {
      //          $elemMatch: {
      //             $regex: genre,
      //             $options: 'i'
      //          }
      //       }
      //    }).toArray()
      // }
      const movies = await db.find({}).toArray()
      return { result: movies.length, movies }
   }


   static async getByType({ type, value }) {
      if (type === 'id') {
         type = '_id'
         value = new ObjectId(value)
      } else {
         value = { $regex: new RegExp(value, 'i') }
      }

      console.log({ [type]: value });

      const db = await connect()
      return db.find({ [type]: value }).toArray()
   }

   static async addMovie({ data }) {
      const db = await connect()
      const { insertedId } = await db.insertOne(data)

      if (!insertedId) return false
      return data

   }

   static async deleteMovie({ id }) {
      const db = await connect()
      const objectId = new ObjectId(id)
      const { deletedCount } = await db.deleteOne({ _id: objectId })
      return deletedCount > 0
   }

   static async updateMovie({ id, data }) {
      const db = await connect()
      const objectId = new ObjectId(id)

      console.log(id, data);
      const result = await db.findOneAndUpdate(
         { _id: objectId },
         { $set: data },
         { returnDocument: 'after' } // Esta opción devuelve el documento después de la actualización
      );

      if (!result) return false

      return result
   }
}