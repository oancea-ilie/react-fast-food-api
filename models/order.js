import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Order extends Sequelize.Model{}

    Order.init({

        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        ammount:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Ammount can not be null!'
                },
                notEmpty:{
                    msg:'Ammount can not be empty!'
                },
            },
        },

        order_address:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Order Address can not be null!'
                },
                notEmpty:{
                    msg:'Order Address can not be empty!'
                },
            },
        },

        order_date:{
            type: Sequelize.DATE(6),
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Order Date can not be null!'
                },
                notEmpty:{
                    msg:'Order Date  can not be empty!'
                },
            },
        },

    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Order;
};