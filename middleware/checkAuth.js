const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    // console.log('from checkAuth',req.headers.authorization)
    try{
        const token = req.headers.authorization.split(" ")[1] //isse use krke token ko alg nikal diya
        const verify = jwt.verify(token,'meet 2003') 
        // console.log(verify)
        if(verify)
        {
            next(); //iska kam h proceed krna agle function pe.
        }
    }
    catch(err)
    {
        return res.status(401).json({
            msg:'Invalid Token'
        })
    }

}