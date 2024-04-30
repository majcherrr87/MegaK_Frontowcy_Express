const express = require("express");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");
const { COOKIE_ADDONS } = require("../data/cookies-data");
const { renderErrorMessage } = require("../utils/render-error-message");

const configuratorRouter = express.Router();

configuratorRouter
  .get("/select-base/:baseName", (req, res) => {
    const { baseName } = req.params;
    res
      .cookie("cookieBase", baseName)
      .render("configurator/base-selected", { baseName });
  })
  .get("/add-addon/:addonName", (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName])
      renderErrorMessage(res, addonName, "There in no such addon");

    const addons = getAddonsFromReq(req);
    if (addons.includes(addonName))
      renderErrorMessage(
        res,
        addonName,
        "is already on your cookie. You cannot add it twice."
      );

    addons.push(addonName);
    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/added", { addonName });
  })
  .get("/delete-addon/:addonName", (req, res) => {
    const { addonName } = req.params;
    const addons = getAddonsFromReq(req).filter((addon) => addon !== addonName);
    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/deleted", { addonName });
  });

module.exports = {
  configuratorRouter,
};
