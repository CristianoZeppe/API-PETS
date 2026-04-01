// Creating server
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./pets.js";
import { randomUUID } from "crypto";
import { validatePetFieldsMiddleware } from "./middlewares.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// List all pets
// GET /pets
app.get("/pets", (req, res) => {
   try {
      res.status(200).send({
         ok: true,
         message: "Pets retrieved successfully",
         data: pets,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
});

// Create a new pet
// POST /pets
app.post("/pets", validatePetFieldsMiddleware, (req, res) => {
   try {
      // input
      const { name, age, breed, ownerName } = req.body;

      // processing
      const newPet = {
         id: randomUUID(),
         name,
         breed,
         age,
         ownerName,
      };

      pets.push(newPet);

      // output
      res.status(201).send({
         ok: true,
         message: "Pet created successfully",
         data: newPet,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
});

// Get a pet by ID
// GET /pets/:id
app.get("/pets/:id", (req, res) => {
   try {
      // input
      const { id } = req.params;

      // processing
      const pet = pets.find((item) => item.id === id);

      if (!pet) {
         return res.status(404).send({
            ok: false,
            message: "Pet not found",
         });
      }

      // output
      res.status(200).send({
         ok: true,
         message: "Pet retrieved successfully",
         data: pet,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
});

// Update an existing pet
// PUT /pets/:id
app.put("/pets/:id", validatePetFieldsMiddleware, (req, res) => {
   try {
      // input
      const { id } = req.params;
      const { name, breed, age, ownerName } = req.body;

      // processing
      const pet = pets.find((item) => item.id === id);

      if (!pet) {
         return res.status(404).send({
            ok: false,
            message: "Pet not found",
         });
      }

      pet.name = name;
      pet.breed = breed;
      pet.age = age;
      pet.ownerName = ownerName;

      // output
      res.status(200).send({
         ok: true,
         message: "Pet updated successfully",
         data: pet,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
});

// Delete a pet
// DELETE /pets/:id
app.delete("/pets/:id", (req, res) => {
   try {
      // input
      const { id } = req.params;

      // processing
      const petIndex = pets.findIndex((item) => item.id === id);

      if (petIndex < 0) {
         return res.status(404).send({
            ok: false,
            message: "Pet not found",
         });
      }

      pets.splice(petIndex, 1);

      // output
      res.status(200).send({
         ok: true,
         message: "Pet deleted successfully",
         data: pets,
      });
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
   console.log(`The server is running on port ${port}`);
});
