var Filter = require('./src/filter');
var fs = require('fs');
var stdin = process.openStdin();

var bloom = new Filter();

var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('words.txt') //words.txt is a large file for example
});

//didn't want to add the entire file into memory as that would be horrible
lineReader.on('line',function(line){ 
	bloom.add(line);
});

console.log("added contents of words.txt into bloom filter");

stdin.addListener("data",function(d){
	d = d+"";
	d = d.replace("\n","");
	if(bloom.check(d)){
		console.log(d + " might be in the dataset");
	}else{
		console.log(d + " is not in the data set");
	}
})