const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) =
  const { nome, email, senha, cargo } = req.body;
  const senhaHash = await bcrypt.hash(senha, 10);
  try {
    const user = await User.create({ nome, email, senha: senhaHash, cargo });
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

router.post("/login", async (req, res) =
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ erro: "Usuário não encontrado" });

  const senhaOk = await bcrypt.compare(senha, user.senha);
  if (!senhaOk) return res.status(401).json({ erro: "Senha incorreta" });

  const token = jwt.sign({ id: user._id, cargo: user.cargo }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

module.exports = router;
