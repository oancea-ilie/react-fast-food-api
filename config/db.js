import { Sequelize } from "sequelize";

// models
import Customer from "../models/customer.js";
import Category from "../models/category.js";
import OrderDetails from "../models/orderDetails.js";
import Order from "../models/order.js";
import ProductCategory from "../models/productCategory.js";
import Product from "../models/product.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () =>{

    try{

        let sequelize = new Sequelize
        (process.env.database, process.env.user, process.env.password, 
            {
              host: process.env.host,
              dialect: process.env.dialect
            }
        );

        let db={
            models:{}
        }

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        db.models.Customer = Customer(sequelize);
        db.models.Category = Category(sequelize);
        db.models.OrderDetails = OrderDetails(sequelize);
        db.models.Order = Order(sequelize);
        db.models.ProductCategory = ProductCategory(sequelize);
        db.models.Product = Product(sequelize);
        
        db.models.Customer.hasMany(db.models.Order,{
            onDelete: 'CASCADE',
            as:'fk_customer_id',
            foreignKey:{
                fieldName:'customer_id',
                allowNull:false
            },
        });
        db.models.Order.belongsTo(db.models.Customer,{
            as:'fk_customer_id',
            foreignKey:{
                fieldName:'customer_id',
                allowNull:false
            },
        });

        db.models.Order.hasMany(db.models.OrderDetails,{
            onDelete: 'CASCADE',
            as:'fk_order_id',
            foreignKey:{
                fieldName:'order_id',
                allowNull:false
            },
        });
        db.models.OrderDetails.belongsTo(db.models.Order,{
            as:'fk_order_id',
            foreignKey:{
                fieldName:'order_id',
                allowNull:false
            },
        });

        db.models.Product.hasMany(db.models.OrderDetails,{
            onDelete: 'CASCADE',
            as:'fk_product_id',
            foreignKey:{
            fieldName:'product_id',
            allowNull:false
            },
        });
        db.models.OrderDetails.belongsTo(db.models.Product,{
            as:'fk_product_id',
            foreignKey:{
                fieldName:'product_id',
                allowNull:false
            },
        });

        db.models.Category.hasMany(db.models.ProductCategory,{
            onDelete: 'CASCADE',
            as:'fk_category_id',
            foreignKey:{
            fieldName:'category_id',
            allowNull:false
            },
        });
        db.models.ProductCategory.belongsTo(db.models.Category,{
            as:'fk_category_id',
            foreignKey:{
                fieldName:'category_id',
                allowNull:false
            },
        });

        db.models.Product.hasMany(db.models.ProductCategory,{
            onDelete: 'CASCADE',
            as:'fk_product_id_product_category',
            foreignKey:{
            fieldName:'product_id',
            allowNull:false
            },
        });
        db.models.ProductCategory.belongsTo(db.models.Product,{
            as:'fk_product_id_product_category',
            foreignKey:{
                fieldName:'product_id',
                allowNull:false
            },
        });

       return db;

    }catch(e){
        throw new Error(e);
    }
}

let db = connectDB();

export default db;