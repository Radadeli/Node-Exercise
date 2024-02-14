import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./src/controllers/planets";
import multer from "multer" 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage });

const app = express();
const port = 3000;

app.use("/uploads", express.static("uploads"))

app.use(morgan("dev"));
//We have to do this to accept POST
app.use(express.json());

//GET method

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

//POST method

app.post("/api/planets", create);

//PUT method: update method

app.put("/api/planets/:id", updateById);

//DELETE method

app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
