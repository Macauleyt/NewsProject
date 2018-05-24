//function to check the value of certain input boxes,
// also checks for undefined values and null values
// for use throughout project

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
