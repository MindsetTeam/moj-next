export default (req, res) => {
  res.status(404).json({
    success: false,
    msg: `URL:${req.url} does not work in ${req.method} method`,
  });
};
