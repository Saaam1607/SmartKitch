import express, { Request, Response } from 'express';

import ingredientsRoutes from './routes/ingredientsRoutes';


const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/ingredients', ingredientsRoutes);


export default app;
