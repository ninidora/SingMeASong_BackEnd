import express from 'express';
import cors from 'cors';
import recommendationRouter from './routes/recommendationRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/recommendations', recommendationRouter);

export default app;
