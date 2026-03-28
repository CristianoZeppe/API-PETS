// Creating server
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./pets.js";
import { randomUUID } from "crypto";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// listar todos os pets
// Get/pets
app.get("/pets", (req, res) => {
   try {
      res.status(200).send({
         ok: true,
         mensagem: "Pets listados com sucesso",
         dados: pets,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         mensagem: error.toString(),
      });
   }
});

// Criar um novo pet
// POST/pets
app.post("/pets", (req, res) => {
   try {
      // entrada
      const { nome, idade, raça, nomeTutor } = req.body;
      // processamento
      const novoPet = {
         id: randomUUID(),
         nome,
         raça,
         idade,
         nomeTutor,
      };
      pets.push(novoPet);
      // saída
      res.status(201).send({
         ok: true,
         mensagem: "Pet criado com sucesso",
         dados: pets,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         mensagem: error.toString(),
      });
   }
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
   console.log(`O servidor está rodando na porta ${port}`);
});
