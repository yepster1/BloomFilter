var Filter = require ('../src/filter');
var assert = require('assert');
var math = require("math.js");

describe('test get P from N and N',() => {
	var bloom = new Filter("testData1.txt");
	bloom.add("cat");
	bloom.add("hat");
	bloom.add("mat");
	assert.ok(bloom.check("cat"));

})
