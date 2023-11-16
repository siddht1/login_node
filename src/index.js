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
  

// root

app.all("*", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
