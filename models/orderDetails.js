import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class OrderDetails extends Sequelize.Model{}


    OrderDetails.init({
        
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        price:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Price can not be null!'
                },
                notEmpty:{
                    msg:'Price can not be empty!'
                },
            },
        },

        quantity:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Quantity can not be null!'
                },
                notEmpty:{
                    msg:'Quantity can not be empty!'
                },
            },
        },

    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return OrderDetails;
};