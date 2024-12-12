import express from 'express'
import peliculasRoutes from "./routes/peliculas.routes.js";

const app = express();

app.use(express.json());

app.use('/apiexamenfinal/v1', peliculasRoutes);
app.listen(3000)
console.log('Server running on port 3000')