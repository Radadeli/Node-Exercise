import {getAll, getOneById, create, updateById, deleteById } from "./controllers/planets.js"


const express = require("express");
const Joi = require("joi");

const router = express.Router();




const planetSchema = Joi.object({
  name: Joi.string().required(),
});


const validatePlanet = (req, res, next) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Routes
router.get("/api/planets", getAll );

router.get("/api/planets/:id", getOneById );

router.post("/api/planets", create);

router.put("/api/planets/:id", updateById );

router.delete("/api/planets/:id", deleteById );

module.exports = router;
