// In src/index.js
import express from 'express';  
import cors from 'cors';  
import { ulid } from 'ulid';  
import bodyParser from 'body-parser';  
import helmet from 'helmet';  
import morgan from 'morgan';  


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  
app.use(bodyParser.json());  
app.use(morgan('combined'));  
app.use(helmet());  

const ulidgen=ulid();
 

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));  

// root



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
const registerEjsPath = path.join(__dirname, "../views/register.ejs");

app.all("*", (req, res) => {
  res.render(registerEjsPath);
});



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
