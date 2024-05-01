const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");
const { getAddonsFromReq } = require("./get-addons-from-req");
const { handelbarsHelpers } = require("./handlebars-helpers");

function getCookieSettings(req) {
  const { cookieBase: base } = req.cookies;
  const addons = getAddonsFromReq(req);
  const allBases = Object.entries(COOKIE_BASES);
  const allAddons = Object.entries(COOKIE_ADDONS);

  const sum =
    (base ? handelbarsHelpers.findPrice(allBases, base) : 0) +
    addons.reduce(
      (prev, curr) => prev + handelbarsHelpers.findPrice(allAddons, curr),
      0
    );
  return {
    addons,
    base,
    sum,
    allAddons,
    allBases,
  };
}

module.exports = {
  getCookieSettings,
};
