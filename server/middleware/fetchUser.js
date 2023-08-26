var jwt = require("jsonwebtoken");
const JWT_SECRET = "TIAA-TEAM-01";

const fetchUser = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization?.split(" ")[1];
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: error });
    }
  } else {
    return res.status(401).send({ error: "Error occured" });
  }
};

module.exports = fetchUser;
