import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import routes from './routes/index';
import Database from './config/database';

const app = express();

// Inicializar banco de dados
Database.connect()
  .then(() => true)
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

export default app;