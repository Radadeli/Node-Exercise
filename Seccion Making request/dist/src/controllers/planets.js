"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const db = (0, pg_promise_1.default)()("postgres:postgres@localhost:5432/postgres");
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
  DROP TABLE IF EXISTS planets;
  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
  `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
    const planets = yield db.many(`SELECT * FROM planets`);
    console.log(planets);
});
setupDb();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.query("SELECT * FROM planets");
    res.json(planets);
});
exports.getAll = getAll;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planet = yield db.one("SELECT * FROM planets WHERE id=$1", req.params.id);
    res.json(planet);
});
exports.getOneById = getOneById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none("INSERT INTO planets (name) VALUES ($1)", req.body.name);
    res.status(201).json({ msg: "Planet created successfully" });
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none("UPDATE planets SET name=$2 WHERE id=$1", [req.params.id, req.body.name]);
    res.json({ msg: "Planet updated successfully" });
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none("DELETE FROM planets WHERE id=$1", req.params.id);
    res.json({ msg: "Planet deleted successfully" });
});
exports.deleteById = deleteById;
