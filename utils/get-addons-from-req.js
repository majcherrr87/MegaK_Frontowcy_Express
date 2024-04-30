function getAddonsFromReq(req) {
  const { cookieAddons } = req.cookies;
  return (addons = cookieAddons ? JSON.parse(cookieAddons) : []);
}

module.exports = {
  getAddonsFromReq,
};
