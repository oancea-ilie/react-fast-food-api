import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import db from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/categories', categoryRoutes);


db.sequelize.sync().then( ()=>{

    app.listen(3005, async()=>{
        console.log("Express server is listening on port 3005!");
    });

})

