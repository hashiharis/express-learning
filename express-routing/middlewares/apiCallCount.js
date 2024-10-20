let totalAPICount = 0;

const countAPI = (req, res, next) => {
  totalAPICount++;
  console.log("Count", totalAPICount);
  next();
};

module.exports = { countAPI };
