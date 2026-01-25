import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.cookies?.accesstoken || (req.headers?.authorization ? req.headers.authorization.replace('Bearer ', '') : null);
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized request' });

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        // Admin token uses email in payload (set by adminLogin)
        if (decoded?.email && decoded.email === process.env.ADMIN_EMAIL) {
            req.user = { email: decoded.email, role: 'admin' };
            return next();
        }

        // Regular user token contains _id
        if (decoded?._id) {
            const user = await User.findById(decoded._id).select('-password');
            if (!user) return res.status(401).json({ success: false, message: 'Invalid access token' });
            req.user = user;
            return next();
        }

        return res.status(401).json({ success: false, message: 'Invalid token payload' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default verifyJWT;