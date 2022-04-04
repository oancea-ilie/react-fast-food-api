import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import db from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js"
import productCategoryRoutes from "./routes/productCategoryRoutes.js"

import path from "path"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const __dirname=path.resolve();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
}else{
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orders-details', orderDetailsRoutes);
app.use('/api/product-categories', productCategoryRoutes);


db.sequelize.sync().then( ()=>{

    app.listen(3005, async()=>{
        console.log("Express server is listening on port 3005!");
    });

})

