export const validatePatchFieldsMiddleware = (req, res, next) => {
   try {
      const { name, age, breed, ownerName } = req.body;

      if (!name || name.trim() === "") {
         return res.status(400).send({
            ok: false,
            message: "The 'name' field is required",
         });
      }

      if (age === undefined || age === null) {
         return res.status(400).send({
            ok: false,
            message: "The 'age' field is required",
         });
      }

      if (!breed || breed.trim() === "") {
         return res.status(400).send({
            ok: false,
            message: "The 'breed' field is required",
         });
      }

      if (!ownerName || ownerName.trim() === "") {
         return res.status(400).send({
            ok: false,
            message: "The 'ownerName' field is required",
         });
      }

      next();
   } catch (error) {
      res.status(500).send({
         ok: false,
         message: error.toString(),
      });
   }
};
