import express from 'express';
import cors from 'cors';
import recommendationRouter from './routes/recommendationRouter.js';
import serverErrorMiddleware from './middlewares/serverErrorMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(serverErrorMiddleware);
app.use('/recommendations', recommendationRouter);

export default app;
