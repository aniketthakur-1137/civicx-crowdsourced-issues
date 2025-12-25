const authorityOnly = (req, res, next) => {
  if (req.user?.role !== "authority") {
    return res.status(403).json({ message: "Authority access only" });
  }
  next();
};

export default authorityOnly;
