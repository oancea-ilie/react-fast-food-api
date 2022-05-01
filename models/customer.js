import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt"

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
            unique: true,
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
            set(val){
                if(val == this.password){
                    const hashPassword = bcrypt.hashSync(val,10);
                    this.setDataValue('confirmedPassword', hashPassword);
                }
            },
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
        },
        createdIn:{
            type:Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'createdIn can not be null!'
                },
                notEmpty:{
                    msg:'createdIn can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:true,
        updatedAt:false,
    });

    return Customer;
};