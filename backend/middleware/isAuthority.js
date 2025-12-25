const isAuthority = (req, res, next) => {
  if (req.user.role !== "authority") {
    return res.status(403).json({ message: "Authority only" });
  }
  next();
};

export default isAuthority;
