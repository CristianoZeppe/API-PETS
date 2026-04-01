import { randomUUID } from "crypto";

export const pets = [
   {
      id: randomUUID(),
      name: "Daphne",
      breed: "Mixed breed",
      age: 4,
      ownerName: "José",
   },
   {
      id: randomUUID(),
      name: "Bob",
      breed: "Golden Retriever",
      age: 6,
      ownerName: "Maria",
   },
];
