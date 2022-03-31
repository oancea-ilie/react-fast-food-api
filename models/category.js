import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Category extends Sequelize.Model{}
    
    Category.init({
        
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Name can not be null!'
                },
                notEmpty:{
                    msg:'Name can not be empty!'
                },
            },
        },

        img:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Image can not be null!'
                },
                notEmpty:{
                    msg:'Image can not be empty!'
                },
            },
        },

        description:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Description can not be null!'
                },
                notEmpty:{
                    msg:'Description can not be empty!'
                },
            },
        },
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Category;
}