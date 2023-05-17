const jwt = require("jsonwebtoken");

const jwttoken = process.env.JWT_TOKEN_SECRET;

const createToken = async (res, _id) => {
  try {
    const token = await jwt.sign({ _id }, jwttoken, { expiresIn: '3d' });
    res.cookie('token', token, { httpOnly: true,
      maxAge: 3 * 60 * 60 * 24 * 1000,
      secure: process.env.NODE_ENV !== 'development', //set to false in developemt but true in production
      sameSite: 'lax'
      });

    return token;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Token couldn't be created" });
  }
};

module.exports = createToken;

