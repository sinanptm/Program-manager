import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './config/mongo.js';
import { router } from './routers/routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { configDotenv } from 'dotenv';

configDotenv();
connectDB();

const app = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'client/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => res.send("Server is ready"));
}

app.use(errorHandler);

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} https://sahityotsav-manager.onrender.com`);
});

export default app;
