const expect = require("chai").expect;
const { saveStaions } = require("../controllers/saveData");

it("should throw error if watherID is null", function () {
  const watherID = null;
  expect(saveStaions.bind(this, watherID)).to.throw("error ocurred");
});
