import express from "express";

import routes from "./src/routes/postsRoutes.js";

//Import the function  connectInDatabase the file dbConfig in folder "src/config"
//Importa a Função connectInDatabase do arquivo dbConfig na pasta "src/config"
import connectInDatabase from "./src/config/dbConfig.js";

//Created a connection with database and archived in a variable
//Cria uma conexão com o banco de dados e guarda em uma variável
const connection = await connectInDatabase(process.env.STRING_CONNECTION);

const app = express();

app.listen(3000, () => {
  console.log("Server listening in port 3000");
});


//Allows the server to interpret body requests in JSON format
//Permite que o servidor interprete requisições do corpo com formato JSON
app.use(express.json());


//Rota GET
app.get("/", (req, res) => {
  res.status(200).send("Testing Route [...] Boas vindas a Imersão!");
});

// getAllPosts find in the database "imersaoAlura" the "table" posts, collect all the data and to add in an array
// getAllPosts encontra no banco de dados "imersaoAlura" a tabela posts, coleta todos os dados e adiciona em um array
async function getAllPosts() {
  const db = connection.db("imersaoAlura");
  const postsCollection = db.collection("posts");
  return postsCollection.find().toArray();
}

app.get("/posts", async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json(posts);
});


function findPostID(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const postID = findPostID(req.params.id);
  res.status(200).json(posts[postID]);
});

//Method Search: Search in attribute "description" a keyword information the with params informaded.
//Busca no atributo "description" a palavra informada como paramêtro.
function findDescriptionPost(keyword) {
  const foundPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(keyword.toLowerCase())
  );
  return foundPosts;
}

//Search Route
app.get("posts/search/?keyword", (req, res) => {
  const foundPost = findDescriptionPost(req.params.keyword);
  if (foundPost.length === 0) {
    res
      .status(204)
      .send("Nenhum post encontrado com a palavra-chave:, ${keyword}");
  } else {
    res.status(200).json(postDescription);
  }
});
