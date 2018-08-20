const test = require("tape");
const deuteranopia = require("../");

test("deuteranopia", t => {
  t.deepEqual(deuteranopia([0, 0, 0]).map(Math.floor), [11, 11, 11], "black");
  t.deepEqual(deuteranopia([0, 20, 0]).map(Math.floor), [21, 21, 11], "color");
  t.deepEqual(deuteranopia([0, 20, 0]), deuteranopia([0, 20, 0]));
  t.end();
});
