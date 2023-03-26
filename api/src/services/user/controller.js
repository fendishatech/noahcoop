const Users = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "first_name", "last_name", "email", "avatar"],
    });
    res.status(200).json({
      success: true,
      payload: users,
    });
  } catch (error) {
    res.status(500);
  }
};

const register = async (req, res) => {
  const { first_name, last_name, email, password, avatar } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await Users.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      avatar: avatar,
    });

    res.status(200).json({
      success: true,
      payload: user,
      message: "User was created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "email or password not correct",
      });
    }

    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;

    const accessToken = jwt.sign(
      {
        userId,
        username,
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        username,
        email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: { id: userId },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure : true
    });

    res.json({
      accessToken,
      user: {
        userId,
        username,
        email,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(204).json({
      message: "Unauthorized",
    });
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) {
    return res.status(204).json({
      error: "there is no user",
    });
  }

  const userId = user[0].id;
  await Users.update(
    {
      refresh_token: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "User logged out",
  });
};

const update = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(204).json({
      message: "Unauthorized",
    });
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) {
    return res.status(204).json({
      error: "there is no user",
    });
  }

  const userId = user[0].id;
  await Users.update(
    {
      refresh_token: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "User logged out",
  });
};

const destroy = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(204).json({
      message: "Unauthorized",
    });
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) {
    return res.status(204).json({
      error: "there is no user",
    });
  }

  const userId = user[0].id;
  await Users.update(
    {
      refresh_token: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "User logged out",
  });
};

module.exports = {
  getUsers,
  register,
  login,
  logout,
  update,
  destroy,
};
