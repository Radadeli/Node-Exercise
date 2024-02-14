import { Request, Response } from "express";
import pgPromise from "pg-promise"
import Joi from "joi";

const db = pgPromise()({
  connectionString: "postgres:argentina@localhost:5432/prove",
});

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;
  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
  `)
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
   
  const planets = await db.many(`SELECT * FROM planets`)
  console.log(planets)
}

setupDb()


const getAll = async (req: Request, res: Response) => {
  const planets = await db.many("SELECT * FROM planets");
  res.status(200).json(planets);
};
const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params
  const planet = await db.one("SELECT * FROM planets WHERE id=$1", Number(id));
  res.status(200).json(planet);
};

const planetSchema = Joi.object({
  name: Joi.string().required(),
});
const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name }
  const validNewPlanet = planetSchema.validate(newPlanet)
  
  if (validNewPlanet.error) {
    return res
    .status(400)
    .json({ msg: validNewPlanet.error.details[0].message })
  } else {
    await db.none("INSERT INTO planets (name) VALUES ($1)", newPlanet.name);
    res.status(201).json({ msg: "Planet created successfully" });
  }
};
const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none("UPDATE planets SET name=$2 WHERE id=$1", [id, name]);
  res.status(200).json({ msg: "Planet updated successfully" });
};
const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params
  await db.none("DELETE FROM planets WHERE id=$1", Number(id));
  res.status(200).json({ msg: "Planet deleted successfully" });
};

const createImage = async  (req: Request & { file: { path: string } }, res: Response) => {
res.status(201).json({ msg: "Planet image uploaded successfully" });
const {id} = req.params
const fileName = req.file?.path; 

if(fileName) {
  db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
  res.status(201).json({ msg: "Planet image uploaded successfully"})
} else {
  res.status(400).json({ msg: "Planet image failed to upload"})
}
}

export { getAll, getOneById, create, updateById, deleteById, createImage };
