import express from "express";

import routes from "./src/routes/postsRoutes.js";

// **Portuguese:** Cria uma nova instância do servidor Express.
// **English:** Creates a new instance of the Express server.
const app = express();

app.use(express.static("uploads"))

// **Portuguese:** Registra as rotas definidas no arquivo `postsRoutes.js`.
// **English:** Registers the routes defined in the `postsRoutes.js` file.
routes(app);

// **Portuguese:** Inicia o servidor na porta 3000 e imprime uma mensagem no console.
// **English:** Starts the server on port 3000 and prints a message to the console.
app.listen(3000, () => {
  console.log("Server listening in port 3000");
});