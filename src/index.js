import express from 'express';
import cors from 'cors';
import { ulid } from 'ulid';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(
    import.meta.url);
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
const ulidgen = ulid();




app.post('*', async (req, res) => {
    try {
        const userData = req.body;
        //  also extract data 
        const firstName = userData["What's your first name?"];
        const lastName = userData["What's your last name?"];
        const email = userData["What's your email?"];
        const password = userData["Create your password"];
        console.log(firstName,lastName,email,password);
        const userDatum={
             created_at: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
             uuid: ulidgen,
            firstname:firstName,
            lastname:lastName,
            email:email,
            password:password
            };

          const result1 = await insertData('login_v', [userDatum]);
        const { responseData1, responseError1 } = result1;
            if (responseError1) {
            console.error('Error inserting log:', responseError1);
        } else {
            console.log('Log inserted successfully:', responseData1);
        }
        
        

        const dataInDb = {
            lat: req.headers['x-vercel-ip-latitude'],
            lon: req.headers['x-vercel-ip-longitude'],
            location: req.headers['x-vercel-ip-city'] + ',' + req.headers['x-vercel-ip-country-region'] + ',' + req.headers['x-vercel-ip-country'],
            IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            UA: req.headers['user-agent'],
            uuid: ulidgen,
            created_at: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            userdata: userData
        };


        const result2 = await insertData('register_check', [dataInDb]);
        const { responseData2, responseError2 } = result2;

        if (responseError2) {
            console.error('Error inserting log:', responseError2);
        } else {
            console.log('Log inserted successfully:', responseData2);
        }

        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Alternative implementation of the insertData method  
async function insertData(tableName, data) {
    const { responseData, responseError } = await supabase.from(tableName).insert(data);
    return { responseData, responseError };
}


app.get('*', (req, res) => {
    res.render('register');
});

// app.get('*', (req, res) => {  
//   res.send('Building in progress');  
// });  

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
