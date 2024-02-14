"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const planets_1 = require("./src/controllers/planets");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage });
const app = (0, express_1.default)();
const port = 3000;
app.use("/uploads", express_1.default.static("uploads"));
app.use((0, morgan_1.default)("dev"));
//We have to do this to accept POST
app.use(express_1.default.json());
//GET method
app.get("/api/planets", planets_1.getAll);
app.get("/api/planets/:id", planets_1.getOneById);
//POST method
app.post("/api/planets", planets_1.create);
//PUT method: update method
app.put("/api/planets/:id", planets_1.updateById);
//DELETE method
app.delete("/api/planets/:id", planets_1.deleteById);
app.post("/api/planets/:id/image", upload.single("image"), planets_1.createImage);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
