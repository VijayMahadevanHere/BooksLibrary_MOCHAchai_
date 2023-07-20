const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const { users } = require("../controller/userController");

const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //Get Token from header

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify Token
    
      req.user = users.find((user) => user.id === decoded.payload);//Get user from the token
        if(req.user){ 
            next()
        }else{
            res.status(401);
        throw new Error("Not Autorized.");
        }
      

    } catch (error) {
      console.log(error);  
      res.status(401);
      throw new Error("Not Autorized. ");
    }
  }
  if(!token){
    res.status(401)  
    throw new Error('Not Authorized no token')
  }
});

module.exports = { protect };
