module.exports = function (req, res, next) {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.userName === "admin" && req.body.password === "123") {
      res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      res.status(400).json({ message: "用户名或者密码错误" });
    }
  }

  next();
};
