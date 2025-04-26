import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Access denied. Bearer token missing." });
    }

    // Extract token from Bearer string
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. Token missing.",authHeader,token  });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded._id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
}