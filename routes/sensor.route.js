const router = require("express").Router(); // importa o router do express

const Sensor = require("../models/Sensor"); // importa o model Sensor

// Create - criação de dados
router.post("/", async (req, res) => {
  // async e await para esperar o banco de dados

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  const { nome, descricao, id, x, y, area, status, tipo } = req.body;

  if (!nome) {
    return res.status(422).json({ error: "Nome do sensor é obrigatório" });
  }
  if (!id) {
    return res.status(422).json({ error: "ID do sensor é obrigatório" });
  }
  if (!x) {
    return res
      .status(422)
      .json({ error: "Coordenada X do sensor é obrigatório" });
  }
  if (!y) {
    return res
      .status(422)
      .json({ error: "Coordenada Y do sensor é obrigatório" });
  }

  const sensor = {
    nome,
    descricao,
    id,
    x,
    y,
    area,
    status,
    tipo,
  };

  // Salvar no banco de dados
  try {
    await Sensor.create(sensor);

    res.status(201).json({ message: "Sensor criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Create - fim

// Read - leitura de dados
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  try {
    const sensor = await Sensor.find();

    res.status(200).json({ sensor: sensor });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Read - leitar de dados - fim

// Read - leitura de dados por id
router.get("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  // req.params.id é o id que vem da url
  const id = req.params.id;

  try {
    const sensor = await Sensor.findOne({ _id: id });

    if (!sensor) {
      return res.status(422).json({ error: "Sensor não encontrado" });
    }

    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Read - leitura de dados por id - fim

// Update - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, PATCH");
  const par_id = req.params.id;

  const { nome, descricao, id, x, y, area, status, tipo } = req.body;

  const sensor = {
    nome,
    descricao,
    id,
    x,
    y,
    area,
    status,
    tipo,
  };

  try {
    const updatedSensor = await Sensor.updateOne({ _id: par_id }, sensor);

    if (updatedSensor.matchedCount === 0) {
      return res.status(422).json({ error: "Sensor não encontrado" });
    }

    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Update - atualização de dados (PUT, PATCH) - fim

// Delete - remoção de dados
router.delete("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE");

  const id = req.params.id;

  const sensor = await Sensor.findOne({ _id: id });

  if (!sensor) {
    return res.status(422).json({ error: "Sensor não encontrado" });
  }

  try {
    await Sensor.deleteOne({ _id: id });

    res.status(200).json({ message: "Sensor removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Delete - remoção de dados - fim

// Delete - remoção de TODOS os dados
router.delete("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE");

  try {
    await Sensor.deleteMany();

    res.status(200).json({ message: "Sensores removidos com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Delete - remoção de TODOS os dados - fim

module.exports = router; // exporta o router