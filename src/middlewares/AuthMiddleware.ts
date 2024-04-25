import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt.utils';


interface AuthenticatedRequest extends Request {
    user?: object;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.sendStatus(401);
        }
    
        // const token = authHeader.split(' ')[1];
        const token = authHeader;
        const userData = verifyJWT(token);

        if (!userData) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = userData; // Attach user data to the request object
      
        next();
    } catch (error) {
        return res.status(500).json({ message: 'JWT Verification Error' });
    }
};


export const adminAuthmiddleware = (req:Request,res:Response,next:NextFunction)=>{
        try {        

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401);
        }
        const token = authHeader;
        const adminData:any = verifyJWT(token);
        
        if(!adminData || adminData.type != 'admin'){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        
        next()
    } catch (error) {
          return res.status(500).json({ message: 'JWT Verification Error' });
    }
}