import { Request, Response } from "express";

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const getAll = (req: Request, res: Response) => {
  res.json(planets);
};
const getOneById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ error: "Planet not found" });
  res.json(planet);
};
const create = (req: Request, res: Response) => {
  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
};
const updateById = (req: Request, res: Response) => {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ error: "Planet not found" });

  planets[planetIndex].name = req.body.name;
  res.json({ msg: "Planet updated successfully" });
};
const deleteById = (req: Request, res: Response) => {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ error: "Planet not found" });

  planets.splice(planetIndex, 1);
  res.json({ msg: "Planet deleted successfully" });
};

export { getAll, getOneById, create, updateById, deleteById };
