"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
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
const getAll = (req, res) => {
    res.json(planets);
};
exports.getAll = getAll;
const getOneById = (req, res) => {
    const planet = planets.find((p) => p.id === parseInt(req.params.id));
    if (!planet)
        return res.status(404).json({ error: "Planet not found" });
    res.json(planet);
};
exports.getOneById = getOneById;
const create = (req, res) => {
    const newPlanet = {
        id: planets.length + 1,
        name: req.body.name,
    };
    planets.push(newPlanet);
    res.status(201).json({ msg: "Planet created successfully" });
};
exports.create = create;
const updateById = (req, res) => {
    const planetIndex = planets.findIndex((p) => p.id === parseInt(req.params.id));
    if (planetIndex === -1)
        return res.status(404).json({ error: "Planet not found" });
    planets[planetIndex].name = req.body.name;
    res.json({ msg: "Planet updated successfully" });
};
exports.updateById = updateById;
const deleteById = (req, res) => {
    const planetIndex = planets.findIndex((p) => p.id === parseInt(req.params.id));
    if (planetIndex === -1)
        return res.status(404).json({ error: "Planet not found" });
    planets.splice(planetIndex, 1);
    res.json({ msg: "Planet deleted successfully" });
};
exports.deleteById = deleteById;
