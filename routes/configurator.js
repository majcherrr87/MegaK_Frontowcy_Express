const express = require("express");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { renderErrorMessage } = require("../utils/render-error-message");

const configuratorRouter = express.Router();

configuratorRouter
  .get("/select-base/:baseName", (req, res) => {
    const { baseName } = req.params;
    if (!COOKIE_BASES[baseName]) {
      return renderErrorMessage(res, `There in no such base as ${baseName}`);
    }

    res
      .cookie("cookieBase", baseName)
      .render("configurator/base-selected", { baseName });
  })
  .get("/add-addon/:addonName", (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName]) {
      return renderErrorMessage(res, `There in no such addon ${addonName}`);
    }

    const addons = getAddonsFromReq(req);
    if (addons.includes(addonName)) {
      renderErrorMessage(
        res,
        `${addonName} is already on your cookie. You cannot add it twice.`
      );
    }

    addons.push(addonName);
    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/added", { addonName });
  })
  .get("/delete-addon/:addonName", (req, res) => {
    const { addonName } = req.params;
    const oldAddons = getAddonsFromReq(req);

    if (!oldAddons.includes(addonName)) {
      return renderErrorMessage(
        res,
        `Cannot delete samothing that isn't already added to the cookie. ${addonName} not found on cookie.`
      );
    }

    const addons = oldAddons.filter((addon) => addon !== addonName);
    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/deleted", { addonName });
  });

module.exports = {
  configuratorRouter,
};
