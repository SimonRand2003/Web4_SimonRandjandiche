import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { genreRouter } from "./controller/genre.controller";
import { movieRouter } from "./controller/movie.controller";
import { ratingRouter } from "./controller/rating.controller";
import { userRouter } from "./controller/user.controller";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use(cors());
app.use(bodyParser.json());
app.use('/', genreRouter);
app.use('/', movieRouter);
app.use('/', ratingRouter);
app.use('/', userRouter);


app.get('/status', (req, res) => {
  res.json({ message: 'Backend is running...' });
});

app.get('/', (req, res) => {
  return res.status(200).send();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});


