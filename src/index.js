import express from 'express';  
import cors from 'cors';  
import { ulid } from 'ulid';  
import helmet from 'helmet';  
import morgan from 'morgan';  
import path from 'path';  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
app.use(cors());  
app.use(morgan('combined'));  
app.use(helmet());  
  
app.use(express.static(path.join(__dirname, '../public')));  
  
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, '../views'));  
  
app.get('/', (req, res) => {  
  res.render('register'); // Removed .ejs extension as it is not necessary  
});  
  
app.listen(PORT, () => {  
  console.log(`API is listening on port ${PORT}`);  
});  
