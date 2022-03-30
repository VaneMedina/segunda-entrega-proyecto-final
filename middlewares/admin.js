const isAdmin = true

module.exports = (req, res, next) => {
    if(isAdmin){
        return next()
    }

    if(req.method === "POST" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH"){
        return res.status(401).send({
            error : -1,
            message : "El usuario no tiene autorización." 
        })
    }
    next()
}