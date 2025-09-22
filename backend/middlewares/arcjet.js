import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res,next) => {
    try {
        const decision = await aj.protect(req, {requested : 1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({message : "RATE LIMIT EXCEEDED !!!!"});
            if(decision.reason.isBott()) return res.status(429).json({message : "Bot Deteced !!!!"});

            res.status(403).json({message: "Access Deniedd"});


        }

        next();


    } catch (error) {
        console.error(`Arcjet Middleware Error : ${error}`);
    }
}

export default arcjetMiddleware;