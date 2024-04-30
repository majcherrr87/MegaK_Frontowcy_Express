function renderErrorMessage(res, description) {
  return res.render("error", {
    description,
  });
}

module.exports = {
  renderErrorMessage,
};
