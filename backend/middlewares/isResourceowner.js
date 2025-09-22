


const isresourceOwner = (req, res, next) => {
    
    try {
    const paramId = req.params.id;
    const userId = req.user._id.toString();
    

    if(!paramId || !userId){
        return res.status(403).json({ message : "Bad Request: User ID not provided in URL." })
    }


    if(userId != paramId){
            return res.status(403).json({message: "You're trying to access other user's info, PROHIBITTED"})
        }

    next();
        
    } catch (error) {

        next(error);
        
    }
    
   


}

export default isresourceOwner;