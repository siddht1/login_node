import express from 'express';  
import cors from 'cors';  
import { ulid } from 'ulid';  
import helmet from 'helmet';  
import morgan from 'morgan';  
import path from 'path';  
import { fileURLToPath } from 'url';  
import bodyParser from 'body-parser'; 
import { createClient } from "@supabase/supabase-js";   
  
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
app.use(cors());  
app.use(morgan('combined'));  
app.use(helmet());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  
  
app.use(express.static(path.join(__dirname, '../public')));  
  
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, '../views'));  

// supabase

const supabaseUri = process.env.SUPABASE_URI;  
const supabaseKey = process.env.SUPABASE_KEY;  
const supabase = createClient(supabaseUri, supabaseKey); 

  
app.post('*', (req, res) => {  
  const userData = req.body;  
  console.log(userData);  
  
  // Perform any necessary operations with the user data  
  
  // Send a response back to the client  
  res.json({ message: 'Registration successful' });  
});  
  
app.get('*', (req, res) => {  
  res.render('register');  
});  
  
// app.get('*', (req, res) => {  
//   res.send('Building in progress');  
// });  
  
app.listen(PORT, () => {  
  console.log(`API is listening on port ${PORT}`);  
});  
