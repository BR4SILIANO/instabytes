import "dotenv/config";

// **Portuguese:** Importa a função `connectInDatabase` do arquivo `dbConfig` na pasta `src/config`.
// **English:** Imports the `connectInDatabase` function from the `dbConfig` file in the `src/config` folder.
import { ObjectId } from "mongodb";
import connectInDatabase from "../config/dbConfig.js";
import { toAddPost } from "../controllers/postsController.js";

// **Portuguese:** Cria uma conexão com o banco de dados e armazena em uma variável.
// **English:** Creates a connection to the database and stores it in a variable.
const connection = await connectInDatabase(process.env.STRING_CONNECTION);

// **Portuguese:** Encontra no banco de dados "imersaoAlura" a tabela "posts", coleta todos os dados e adiciona em um array.
// **English:** Finds the "posts" table in the "imersaoAlura" database, collects all data, and adds it to an array.
export async function getAllPosts() {
  const db = connection.db("imersaoAlura");
  const postsCollection = db.collection("posts");
  return postsCollection.find().toArray();
}

// **Portuguese:** Cria um novo post no banco de dados "imersaoAlura" na tabela "posts".
// **English:** Creates a new post in the "imersaoAlura" database in the "posts" table.
export async function createNewPost(newPost) {
  const db = connection.db("imersaoAlura");
  const postsCollection = db.collection("posts");
  return postsCollection.insertOne(newPost);
}

// **Portuguese:** Faz o upload de uma nova imagem no banco de dados "imersaoAlura" na tabela "posts".
// **English:** Uploads a new image to the "imersaoAlura" database in the "posts" table.
export async function uploadImage(newImage) {
  const db = connection.db("imersaoAlura");
  const postsCollection = db.collection("posts");
  return postsCollection.insertOne(newImage);
}

export async function toUpdate(id, newPost) {
  const db = connection.db("imersaoAlura");
  const postsCollection = db.collection("posts");

  const objPostID = ObjectId.createFromHexString(id);

  //{ _id: new ObjectId(objPostID) }, => Filtro: busca pelo documento com o ID especificado
  //{ $set: newPost } => Atualização: define os novos valores para os campos
  return postsCollection.updateOne(
    { _id: new ObjectId(objPostID) },
    { $set: newPost }
  );
}
