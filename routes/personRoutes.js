const router = require("express").Router(); // importa o router do express

const Person = require("../models/Person"); // importa o model Person

// Create - criação de dados
router.post("/", async (req, res) => {
  // async e await para esperar o banco de dados

  // req.body é o corpo da requisição
  // {name: "Matheus", salary: 5000, approved: false}
  const { name, salary, approved } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Nome é obrigatório" });
  }
  /* if (!salary) {
      return res.status(422).json({ error: "Salário é obrigatório" });
    }
    if (!approved) {
      return res.status(422).json({ error: "Aprovação é obrigatória" });
    } */

  const person = {
    name,
    salary,
    approved,
  };

  // Salvar no banco de dados
  try {
    await Person.create(person);

    res.status(201).json({ message: "Pessoa criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json({ people: people });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - leitura de dados por id
router.get("/:id", async (req, res) => {
  // req.params.id é o id que vem da url
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      return res.status(422).json({ error: "Pessoa não encontrada" });
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      return res.status(422).json({ error: "Pessoa não encontrada" });
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - remoção de dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    return res.status(422).json({ error: "Pessoa não encontrada" });
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Pessoa removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - remoção de TODOS os dados
router.delete("/", async (req, res) => {
  try {
    await Person.deleteMany();

    res.status(200).json({ message: "Pessoas removidas com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router; // exporta o router
