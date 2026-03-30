export const validarCampoPetMiddleware = (req, res, next) => {
   try {
      const { nome, idade, raça, nomeTutor } = req.body;
      if (!nome) {
         return res.status(400).send({
            ok: false,
            mensagem: "O campo nome não foi informado",
         });
      }
      if (!idade) {
         return res.status(400).send({
            ok: false,
            mensagem: "O campo idade não foi informado",
         });
      }
      if (!raça) {
         return res.status(400).send({
            ok: false,
            mensagem: "O campo raça não foi informado",
         });
      }
      if (!nomeTutor) {
         return res.status(400).send({
            ok: false,
            mensagem: "O campo nomeTutor não foi informado",
         });
      }
      next();
   } catch (error) {
      res.status(500).send({
         ok: false,
         mensagem: error.toString(),
      });
   }
};
