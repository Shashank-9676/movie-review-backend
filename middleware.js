import jwt from 'jsonwebtoken';
export async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.secret_key);
        // console.log(decoded.name)
        req.user = decoded
        // console.log(req.user.name)
        next();
    } catch (error){
        res.status(401).json({ message: "Invalid token" });
    }
}