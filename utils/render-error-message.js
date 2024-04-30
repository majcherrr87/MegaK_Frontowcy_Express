function renderErrorMessage(res, addonName, description) {
  return res.render("error", {
    description: `${addonName} ${description}`,
  });
}

module.exports = {
  renderErrorMessage,
};
