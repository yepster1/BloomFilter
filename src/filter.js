var BitArray = require('bit-array'),
	fnv = require('fnv');
var LN_2 = Math.log(2);

function getHashFunction(item, m)
{
	var h = new fnv.FNV();
	h.update(item);
	/**
	 * Note this is an interesting caveat, the javascript operator % is the remainder not the modulo we expect
	 * therefore its possible to get back a negative number
	 */
	return Math.abs(h.value() % m);
}

function Filter(n, p, m, k)
{
	this.n = n;
	this.p = p;
	this.m = m || Math.round(-this.n * Math.log(this.p) / (LN_2 * LN_2)); //using optimal m for the size of n
	console.log(this.m)
	this.k = k || Math.round(-Math.log(p) / LN_2); // using optimal k
	this.bloomFilter = new BitArray(this.m); //innitate the bloom filter
}
Filter.prototype = {
	add: function(item)
	{
		for (var i = 0; i < this.k; i++)
		{
			// console.log(i + item, getHashFunction(i + item, this.m))
			var val = getHashFunction(i + item, this.m);
			this.bloomFilter.set(val, true); //add k each time as this will completely change the hash output
		}
	},
	check: function(item)
	{
		for (var i = 0; i < this.k; i++)
		{
			// console.log(i + item, getHashFunction(i + item, this.m))
			if (!this.bloomFilter.get(getHashFunction(i + item, this.m)))
			{
				//console.log('k is ' + i + ' false');
				return false; //this is definitely not in the bloom filter
			}
			//console.log('k is ' + i + ' true');
		}
		return true; //there is a chance that this item is in the bloom filter
	}
};
module.exports = Filter;