import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class ProductCategory extends Sequelize.Model{}
    
    ProductCategory.init({
        
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return ProductCategory;
}