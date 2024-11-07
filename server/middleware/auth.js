import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  console.log(req.body);
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    /* verify that this is the correct user -- use the JWT_SECRET in our env file */
    /* basically it gets decoded */
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next(); // proceed to the actual controller
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
