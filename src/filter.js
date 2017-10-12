const md5 = require('md5');
const fs = require('fs');
const math = require('math.js');
const bitArray = require("bit-array");

const averageEnglishWord = 5.1;
const e = 2.71828; //approximate value for e

function Filter(file){
	var file = typeof file !== "undefined" ? file : "words.txt";
	const stats = fs.statSync(file); //gets all the stats from the file that we are going to get data from so we assume a n value
	const fileSizeInBytes = stats.size; //each character is 1 byte.
	
	//we can assume that the average word size will hold to the standard of english. therefore our n will approximetly be
	this.n = fileSizeInBytes/averageEnglishWord;

	console.log("Their are approximetly " + this.n + " words in the test set");
	this.p = 0.01; //1 % false positive rate

	this.m = math.round(this.n * -1.44 * math.log(this.p,2)) //using optimal m for the size of n
	this.k = math.round(-math.log(this.p,2)); // using optimal k
	this.bloomFilter = new bitArray(this.m); //innitate the bloom filter

	this.add = add.bind(this);
	this.check = check.bind(this);

	console.log("the bit array is " + this.m + " bits long")
	console.log("k value is " + this.k);
}

function getHashFunction(item,m){
	var hashed = md5(item).substring(0,10);
	//console.log(parseInt(hashed,16)%28);
	return parseInt(hashed,16)%m;
}

function add(item){
	for(var i = 0; i < this.k; i++){
		var val = getHashFunction(item + i,this.m);
		this.bloomFilter.set(val,true) //add k each time as this will completely change the hash output
	}
}

function check(item){
	for(var i = 0; i < this.k; i++){
		if(this.bloomFilter.get(getHashFunction(item + i,this.m)) == false){
			//console.log("k is " + i + " false");
			return false; //this is definitely not in the bloom filter
		}
		//console.log("k is " + i + " true");
	}
	return true; //there is a chance that this item is in the bloom filter
}


module.exports = Filter;
