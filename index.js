// Desc:
// Date: 21/05/2023
// Auth:

const express = require("express"); // importa express
const mongoose = require("mongoose"); // importa mongoose
const app = express(); // cria o app express

const env = require("custom-env").env();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Configurações do express

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas da aplicação

//
const personRoutes = require("./routes/personRoutes"); // importa as rotas de personRoutes

app.use("/person", personRoutes); // usa as rotas de personRoutes

// Rota get teste
app.get("/", (req, res) => {
  /* res.send('Oi gata'); */
  res.json({ message: "Hello, World!" });
});

/* mongodb+srv://admin:teste>@cluster0.vo9iwcf.mongodb.net/db_matheus?retryWrites=true&w=majority */

// Entregar uma porta para o servidor

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vo9iwcf.mongodb.net/${DB_NAME}`
  )
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
