import fs from "fs";

import toGenerateDescriptionWithGemini from "../services/serviceGemini.js";

import {
  getAllPosts,
  createNewPost,
  uploadImage,
  toUpdate,
} from "../models/postModel.js";

// **Portuguese:** Lista todos os posts existentes.
// **English:** Lists all existing posts.
export async function listAllPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

// **Portuguese:** Cria um novo post a partir dos dados enviados no corpo da requisição.
// **English:** Creates a new post based on the data sent in the request body.
export async function toAddPost(req, res) {
  const newPost = req.body;
  try {
    const postCreated = await createNewPost(newPost);
    res.status(201).json(postCreated);
  } catch (error) {
    logger.error("Erro ao criar post:", error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o post." });
  }
}

// **Portuguese:** Faz o upload de uma nova imagem para um post.
// **English:** Uploads a new image for a post.
export async function uploadNewImage(req, res) {
  const newImage = {
    description: "",
    imageUrl: req.file.originalname,
    imageAlternative: "",
  };

  try {
    const postCreated = await uploadImage(newImage);
    const refreshNameImage = `uploads/${postCreated.insertedId}.png`;

    // **Portuguese:** Renomeia o arquivo da imagem para o ID do post criado.
    // **English:** Renames the image file to the ID of the created post.
    fs.renameSync(req.file.path, refreshNameImage);

    res.status(201).json(postCreated);
  } catch (error) {
    logger.error("Erro ao criar post:", error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o post." });
  }
}

export async function toUpdatePost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  
  try {
    const imageBuffer =fs.readFileSync(`uploads/${id}.png`)
    const description = await toGenerateDescriptionWithGemini(imageBuffer)
    
    const postUpdated = {
      imageUrl: urlImage,
      description: description,
      imageAlternative: req.body.imageAlternative,
    };

    const postCreated = await toUpdate(id, postUpdated);

  
    res.status(201).json(postCreated);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o post." });
  }
}
