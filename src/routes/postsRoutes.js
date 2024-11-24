import express from "express";
import multer from "multer";
import cors from "cors"

import {
  listAllPosts,
  toAddPost,
  uploadNewImage,
  toUpdatePost,
} from "../controllers/postsController.js";


const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// **Portuguese:** Configura o armazenamento de imagens para upload.
// **English:** Configures image storage for upload.
//  - **Windows:** This section defines storage behavior for Windows systems.
//                 It specifies the upload directory ("uploads/") and keeps the original filename.
//  - **Linux:** This line is commented out for Windows. It defines the upload directory
//              ("./uploads") for Linux systems and uses the configured storage object.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    1;
  },
});

// **Portuguese:** Define o middleware `multer` para upload de imagens.
// **English:** Defines the `multer` middleware for image uploads.
const upload = multer({ dest: "./uploads", storage }); // Use configured storage for both OS



const routes = (app) => {
  // **Portuguese:** Permite que o servidor interprete requisições do corpo com formato JSON.
  // **English:** Allows the server to interpret body requests in JSON format.
  app.use(express.json());

  app.use(cors(corsOptions))
  // **Portuguese:** Rota para listar todos os posts.
  // **English:** Route for listing all posts.
  app.get("/posts", listAllPosts);

  // **Portuguese:** Rota para criar um novo post.
  // **English:** Route for creating a new post.
  app.post("/posts", toAddPost);

  // **Portuguese:** Rota para upload de uma nova imagem.
  //                - `upload.single("image")`: configura o middleware para receber apenas
  //                                            um arquivo com o campo "image" no corpo da requisição.
  // **English:** Route for uploading a new image.
  //            - `upload.single("image")`: configures the middleware to receive only one file
  //                                          with the field "image" in the request body.
  app.post("/upload", upload.single("image"), uploadNewImage);

  app.put("/posts/:id", toUpdatePost);
};

export default routes;
