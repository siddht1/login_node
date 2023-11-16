import express from 'express';
import cors from 'cors';
import { ulid } from 'ulid';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Removed redundant bodyParser.json() middleware
app.use(morgan('combined'));
app.use(helmet());

// Use express-static middleware to serve static files and handle JSON parsing
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.all('/', (req, res) => { // Specify the correct route path
  res.render('register.ejs'); // Use direct view name instead of variable
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
