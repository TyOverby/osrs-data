#!/home/tyoverby/.nvm/versions/node/v12.19.0/bin/node

const fs = require('fs');

var files = 
	fs.readdirSync('./')
          .filter(f => /.json/.test(f))
          .map(f => {
		  try { return {
			name: f, 
		        time: new Date(1000 * f.split('.')[0]),
			content: JSON.parse(fs.readFileSync(f))
		  } } catch { return null }
	  })
          .filter(t => t && t.content && t.content.data);

const prices = {};

for (const {content: {data}} of files) {
	for (const item in data) {
		if (!prices[item])  { prices[item] = {} }
		const {high, low, highTime, lowTime } = data[item];
		if (!prices[item][lowTime]) { prices[item][lowTime] = {}; }
		if (!prices[item][highTime]) { prices[item][highTime] = {}; }
		prices[item][lowTime].low = low;
		prices[item][highTime].high = high;
	}
}

var most_traded = 0;
var most_traded_q = 0;
for (const k in prices) {
	var l = Object.keys(prices[k]).length;
	if (l > most_traded_q) {
		most_traded = k;
		most_traded_q = l;
	}
}
console.log(most_traded);

//console.log(prices);
module.exports = files

fs.writeFileSync('./data.js', 'window.data = ' + JSON.stringify(prices));
