// Creating server
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./pets.js";
import { randomUUID } from "crypto";
import { validarCampoPetMiddleware } from "./middlewares.js";
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
app.post("/pets", validarCampoPetMiddleware, (req, res) => {
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

// Obter um pet pelo id
// GET/pets:id
app.get("/pets/:id", (req, res) => {
   try {
      // entrada
      const { id } = req.params;

      // processamento
      const pet = pets.find((item) => item.id === id);
      if (!pet) {
         return res.status(404).send({
            ok: false,
            mensagem: "O pet não foi encontrado",
         });
      }

      // saída
      res.status(200).send({
         ok: true,
         mensagem: "Pet obtido com sucesso",
         dados: pet,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         mensagem: error.toString(),
      });
   }
});

// Atualizar um pey existente
// PUT/pets/:id
app.put("/pets/:id", validarCampoPetMiddleware, (req, res) => {
   try {
      // entrada
      const { id } = req.params;
      const { nome, raça, idade, nomeTutor } = req.body;

      // processamento
      const pet = pets.find((item) => item.id === id);
      if (!pet) {
         return res.status(404).send({
            ok: false,
            mensagem: "O pet não foi encontrado",
         });
      }
      pet.nome = nome;
      pet.raça = raça;
      pet.idade = idade;
      pet.nomeTutor = nomeTutor;

      // saída
      res.status(200).send({
         ok: true,
         mensagem: "Pet atualizado com sucesso",
         dados: pets,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         mensagem: error.toString(),
      });
   }
});

// Excluir um pet
// DELETE
app.delete("/pets/:id", (req, res) => {
   try {
      // entrada
      const { id } = req.params;

      // processamento
      const petIndex = pets.findIndex((item) => item.id === id);
      if (petIndex < 0) {
         return res.status(404).send({
            ok: false,
            mensagem: "Pet não foi encontrado",
         });
      }
      pets.splice(petIndex, 1);
      // saída
      res.status(200).send({
         ok: true,
         mensagem: "Pet excluído com sucesso",
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
