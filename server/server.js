import express, { urlencoded, json } from 'express'
import { connectDB } from './config/mongo.js';
import { router } from './routers/routes.js';
import { errorHandler } from './middleware/errorHandler.js'
import { configDotenv } from 'dotenv';

configDotenv();
connectDB();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening on port 2000 http://localhost:${port}/`);
});