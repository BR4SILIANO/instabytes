# instabytes

DESCRIÇÃO 📑 , ANÁLISE 📋 E DOCUMENTAÇÃO 📚 DO PROJETO

Conexão com o Banco de Dados: A função connectInDatabase estabelece a conexão com o banco de dados MongoDB Atlas utilizando a string de conexão armazenada na variável de ambiente STRING_CONNECTION.

As demais funções que interagem com o banco (getAllPosts, createNewPost, uploadImage, toUpdate) utilizam a conexão obtida na inicialização para realizar operações CRUD (Create, Read, Update, Delete) na coleção "posts" do banco "imersaoAlura".

Gestão de Posts: A função listAllPosts recupera todos os posts da coleção "posts" e retorna um array com os dados.
A função toAddPost permite a criação de um novo post, recebendo os dados do post no corpo da requisição e salvando-os no banco.
A função uploadNewImage realiza o upload de uma imagem para um post recém-criado.
A função toUpdatePost atualiza um post existente, recebendo o ID do post e os novos dados a serem atualizados.
Processamento de Imagens: A função upload.single("image") configura o middleware multer para receber apenas um arquivo com o campo "image" na requisição utilizada para upload de imagens.
A função toGenerateDescriptionWithGemini utiliza a API Google Generative AI e o modelo "gemini-1.5-flash" para gerar uma descrição textual da imagem recebida como parâmetro.

1. DEPENDÊNCIAS:
mongodb: Driver para interagir com o banco de dados MongoDB.
express: Framework Node.js para desenvolvimento de APIs.
dotenv: Carrega variáveis de ambiente do arquivo .env.
multer: Middleware para upload de arquivos.
cors: Middleware para CORS (Cross-Origin Resource Sharing).
@google/generative-ai: Cliente para a Google Generative AI.

2. VARIÁVEIS DE AMBIENTE:
STRING_CONNECTION: String de conexão com o banco de dados MongoDB Atlas.
GEMINI_API_KEY : Chave de API para o Google Generative AI.

3. FUNÇÕES:
connectInDatabase(stringConexao): Estabelece conexão com o banco de dados.
🗒️ getAllPosts(): Recupera todos os posts do banco.
➕ createNewPost(newPost): Cria um novo post.
📤 uploadImage(newImage): Realiza o upload de uma imagem.
🔄 toUpdate(id, newPost): Atualiza um post existente.
🧬 toGenerateDescriptionWithGemini(imageBuffer): Gera uma descrição textual de uma imagem utilizando o Google Generative AI.

4. ROTAS:
GET /posts: Lista todos os posts.
POST /posts: Cria um novo post.
POST /upload: Realiza o upload de uma imagem para um post.
PUT /posts/:id: Atualiza um post existente.

E agora?
- Cria uma função na área de descrição do Post para Pesquisar com base em uma palavra chave (String).
- Criar uma função para inserção de comentários que deve ser vinculado ao ID do Post.
