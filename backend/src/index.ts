import express, { Express, Request, Response } from "express";
import { apiRouter } from "./routes";
import {mongoose} from '@typegoose/typegoose';
import cors from 'cors';

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB. Check the README on how to run the database.', error);
});

app.use("/", apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});