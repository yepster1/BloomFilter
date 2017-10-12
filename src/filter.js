const md5 = require('md5');
const fs = require('fs');
const math = require('math.js');
const bitArray = require("bit-array");

const averageEnglishWord = 5.1;
const e = 2.71828; //approximate value for e

function innitateBloomFilter(file){
	var file = typeof file !== "undefined" ? file : "words.txt";
	const stats = fs.statSync(file); //gets all the stats from the file that we are going to get data from so we assume a n value
	const fileSizeInBytes = stats.size; //each character is 1 byte.
	
	//we can assume that the average word size will hold to the standard of english. therefore our n will approximetly be
	this.n = fileSizeInBytes/averageEnglishWord;

	console.log("Their are approximetly " + n + " words in the test set");

	this.m = math.pow(2,24); //using a 4 meg bloom filter

	this.k = math.round(getK(n,m)); // get the optimal amount of hashes to use

	this.bloomFilter = new bitArray(m); //innitate the bloom filter


	console.log("k value is " + k);
}

function getHashFunction(item){
	var hashed = md5(item);
	return parseInt(string,16)%this.m;
}

function addItem(item){
	for(var i = 0; i < k; i++){
		this.bloomFilter.set(getHashFunction(item + k),true) //add k each time as this will completely change the hash output
	}
}

function getItem(){
	for(var i = 0; i < k; i++){
		if(this.bloomFilter.get(getHashFunction(item + k)) == false){
			return false; //this is definitely not in the bloom filter
		}
	}
	return true; //there is a chance that this item is in the bloom filter
}

function getPValueFromNandM(n,m){
	return math.pow(e,(-(m/n)*math.pow(math.log(2,e),2))); //get what the p value would be using the formula found on wikipidia
}

function getK(n,m){
	return (m/n)*math.log(2,e);
}

module.exports = {
	getPValueFromNandM: getPValueFromNandM
}
