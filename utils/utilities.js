import jsw from "jsonwebtoken";

const generateToken = (id) =>{
    return jsw.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
};

export default generateToken;