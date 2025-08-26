import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import usersRoutes from './routes/usersRoutes';


import ingredientsRoutes from './routes/ingredientsRoutes';
import dishesRoutes from './routes/dishesRoutes';
import drinksRoutes from './routes/drinksRoutes';
import menuSectionsRoutes from './routes/menuSectionsRoutes';

const app = express();
app.use(cors());

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001", "https://smartkitch.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.use('/user', usersRoutes);

app.use('/ingredients', ingredientsRoutes);
app.use('/dishes', dishesRoutes);
app.use('/drinks', drinksRoutes);
app.use('/menuSections', menuSectionsRoutes);



export default app;
