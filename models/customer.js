import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Customer extends Sequelize.Model{}

    Customer.init({

        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Name can not be null!'
                },
                notEmpty:{
                    msg:'Name can not be empty!'
                },
            },
        },

        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Email can not be null!'
                },
                notEmpty:{
                    msg:'Email can not be empty!'
                },
            },
        },

        password:{
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Password can not be null!'
                },
                notEmpty:{
                    msg:'Password can not be empty!'
                },
            },
        },
        
        confirmedPassword:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Password can not be null!'
                },
                notEmpty:{
                    msg:'Password can not be empty!'
                },
            },
        },

        billing_address:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Billing Address can not be null!'
                },
                notEmpty:{
                    msg:'Billing Address can not be empty!'
                },
            },
        },

        phone:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Phone can not be null!'
                },
                notEmpty:{
                    msg:'Phone can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Customer;
};