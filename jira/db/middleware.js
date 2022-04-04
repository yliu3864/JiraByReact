module.exports = (req, res, next) => {
  if (req.method == "POST" && req.path == "/login") {
    if (req.body.username === "jack" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          id: 1,
          name: "Jack",
          token: "123"
        }
      });
    } else {
      return res.status(400).json({
        message: "wrong name or password"
      });
    }
  }

  if (req.method == "GET" && req.path == "/me") {
    console.log(req.headers.authorization);
    if (req.headers.authorization === "Bearer 123") {
      return res.status(200).json({
        user: {
          id: 1,
          name: "Jack",
          token: "123"
        }
      });
    } else {
      return res.status(400).json({
        message: "wrong token"
      });
    }
  }

  if (req.method == "PATCH" && req.path == "/project/1") {
    console.log(req.headers.authorization);
    if (true) {
      return res.status(200).json({
        // user: {
        //   id: 1,
        //   name: "Jack",
        //   token: "123"
        // }
      });
    } else {
      return res.status(400).json({
        message: "wrong token"
      });
    }
  }
  next();
};
