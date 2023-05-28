import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { genreRouter } from "./controller/genre.routes";
import { movieRouter } from "./controller/movie.routes";
import { ratingRouter } from "./controller/rating.routes";
import { userRouter } from "./controller/user.routes";
import { expressjwt } from "express-jwt"; // Update the import statement

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
    expressjwt({ secret: jwtSecret ,algorithms:["HS256"]}).unless({
      path: ["/status","/", "/users/login","/users/add", "/api-docs"],
    })
);

app.use('/genres', genreRouter);
app.use('/movies', movieRouter);
app.use('/ratings', ratingRouter);
app.use('/users', userRouter);

app.get('/status', (req, res) => {
  res.json({ message: 'Backend is running...' });
});

app.get('/', (req, res) => {
  return res.status(200).send();
});



app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (error.name === 'UnauthorizedError'){
    res.status(401).json({status : 'unauthorized', message : error.message});
  }else if (error.name === 'ArgumentError'){
    res.status(400).json({status : 'error', message : error.message});
  }else{
    next();
  }

});