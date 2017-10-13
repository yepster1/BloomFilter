var Filter = require('./filter'),
	readline = require('readline'),
	path = require('path'),
	fs = require('fs');
var AVERAGE_CHARS_PER_ENGLISH_WORD = 5.1,
	ACCEPTABLE_ERROR = 0.01,
	FILE_PATH = path.join(__dirname, 'words.txt');
var stats = fs.statSync(FILE_PATH), //gets all the stats from the file that we are going to get data from so we assume a n value
	fileSizeInBytes = stats.size, //each character is 1 byte.
	approximateItems = fileSizeInBytes / AVERAGE_CHARS_PER_ENGLISH_WORD,
	bloom = new Filter(approximateItems, ACCEPTABLE_ERROR),
	lineReader = readline.createInterface(
	{
		input: fs.createReadStream(FILE_PATH) //words.txt is a large file for example
	}),
	cli = readline.createInterface(
	{
		input: process.stdin
	});
console.log('There are approximately ' + approximateItems + ' words in the test set');
console.log('The bit array is ' + bloom.m + ' bits long');
console.log('k value is ' + bloom.k);
//didn't want to add the entire file into memory as that would be horrible
lineReader.on('line', function(line)
{
	bloom.add(line);
});
cli.on('line', function(d)
{
	if (bloom.check(d))
	{
		console.log(d + ' might be in the dataset');
	}
	else
	{
		console.log(d + ' is not in the data set');
	}
});