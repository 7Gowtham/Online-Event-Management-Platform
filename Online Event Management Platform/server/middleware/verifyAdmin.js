import auth from "../common/auth.js";

const verifyAdmin = async(req, res, next)=>{
    try {
        let token = req.headers.authorization ?.split(" ")[1]
        if(token){
            let payload = await auth.decodeToken(token)
            console.log("Decoded Payload:", payload);

            if(payload.role === "Admin"){
                next()
            }
            else{
                res.status(400).send({
                    message:"Unauthorized Access"
                })
            }
        }
        else{
            res.send(400).send({
                message:"Invalid Token"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

export default verifyAdmin