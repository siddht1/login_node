import express from 'express';
import cors from 'cors';
import { ulid } from 'ulid';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' })); // Remove redundant bodyParser.urlencoded()
app.use(morgan('combined'));
app.use(helmet());

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.all('/', (req, res) => { // Specify the correct route path
  res.render('register.ejs'); // Use direct view name instead of variable
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
