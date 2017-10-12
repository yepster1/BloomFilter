var filter = require ('../src/filter');
var assert = require('assert');
var math = require("math.js");

describe('test get P from N and N',() => {
	var m = 100;
	var n = 50;
	var k = 1.3862943611198906;
	var expectedResult = 0.3825461314703953;
	p = filter.getPValueFromNandM(n,m);
	assert.ok(Math.abs(p - expectedResult) < 0.001);
})
