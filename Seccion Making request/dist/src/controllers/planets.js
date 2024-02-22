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
exports.createImage = exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = exports.db = void 0;
const joi_1 = __importDefault(require("joi"));
const db_js_1 = require("./../db.js");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return db_js_1.db; } });
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db_js_1.db.many("SELECT * FROM planets");
    res.status(200).json(planets);
});
exports.getAll = getAll;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db_js_1.db.one("SELECT * FROM planets WHERE id=$1", Number(id));
    res.status(200).json(planet);
});
exports.getOneById = getOneById;
const planetSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newPlanet = { name };
    const validNewPlanet = planetSchema.validate(newPlanet);
    if (validNewPlanet.error) {
        return res.status(400).json({ msg: validNewPlanet.error.details[0].message });
    }
    else {
        yield db_js_1.db.none("INSERT INTO planets (name) VALUES ($1)", newPlanet.name);
        res.status(201).json({ msg: "Planet created successfully" });
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    yield db_js_1.db.none("UPDATE planets SET name=$2 WHERE id=$1", [id, name]);
    res.status(200).json({ msg: "Planet updated successfully" });
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_js_1.db.none("DELETE FROM planets WHERE id=$1", Number(id));
    res.status(200).json({ msg: "Planet deleted successfully" });
});
exports.deleteById = deleteById;
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json({ msg: "Planet image uploaded successfully" });
    const { id } = req.params;
    // Asegúrate de que req.file esté definido antes de intentar acceder a path
    const fileName = req.file && req.file.path;
    if (fileName) {
        yield db_js_1.db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
        res.status(201).json({ msg: "Planet image uploaded successfully" });
    }
    else {
        res.status(400).json({ msg: "Planet image failed to upload" });
    }
});
exports.createImage = createImage;
