import express, { urlencoded } from 'express'
import connectDB from './config/mongo.js';
import routes from './routers/routes.js';
import { errorHandler } from './middleware/errorHandler.js'


const app = express();

connectDB();

app.use(express.json());
app.use(urlencoded({extended:true}));

app.use('/api', routes);



app.use(errorHandler);

app.listen(2000, () => {
    console.log('listening on port 2000 http://localhost:2000/');
});