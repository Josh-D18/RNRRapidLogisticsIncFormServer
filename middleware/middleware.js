const handleRequestData = (req, res, next) => {
  const { name, email, message } = req.body;
  if (typeof name !== "string") {
    res.status(400).json({ Error: "name must be a string" });
  } else if (typeof email !== "string") {
    res.status(400).json({ Error: "email must be a string" });
  } else if (typeof message !== "string") {
    res.status(400).json({ Error: "message must be a string" });
  } else {
    next();
  }
};

module.exports = { handleRequestData };
