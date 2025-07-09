import express from "express"
import morgan from "morgan";
import api from './routes/router.js'
import bodyParser from "body-parser";



const port = 5000

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  morgan is a logging middleware for Node.js/Express. It logs HTTP requests to the console (or to a file), which is useful for debugging and monitoring incoming traffic.
app.use(morgan("dev")); // ✅ enable logging showing 


app.get('/', (req, res, next) => {
  res.status(200).send("<h2>Hello From backend</h2>");
  console.log("GET /".green);
  next();
});

app.use("/api", api);

app.listen(port , ()=>{
    console.log(`Server running on http://localhost:${port}`);
})

