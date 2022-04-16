import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class ImageTest extends Sequelize.Model{}

    ImageTest.init({

        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        image: {
            type: Sequelize.BLOB
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return ImageTest;
};