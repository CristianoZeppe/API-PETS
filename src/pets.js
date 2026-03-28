import { randomUUID } from "crypto";

export const pets = [
   {
      id: randomUUID(),
      nome: "Daphne",
      raça: "vira-lata",
      idade: 4,
      NomeTutor: "José",
   },
   {
      id: randomUUID(),
      nome: "Bob",
      raça: "Golden",
      idade: 6,
      NomeTutor: "Maria",
   },
];
