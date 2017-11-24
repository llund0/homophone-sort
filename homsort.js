var fs = require('fs');

var lcnt = 0;


function main() {
	fs.readFile("../homophones.html", infile);
}

function infile(err,data) {
  console.log("infile\n");
  var d = ''+data;
  fs.writeFileSync("../homophone2.html",d);
  // console.log(d);
  var g1 = d.split(/<.tbody>/)
  var foot = g1[1];
  var rows = g1[0].split(/<tr/);
  console.log("n rows: "+rows.length +"\n");
  var head = rows.shift();
  
  rows.forEach(perRow);
  rows.sort();
  var date1 = new Date();
  
  var date2 = date1.getMonth()+'/'+date1.getDate()+'/'+date1.getFullYear();
  foot = foot.replace(/Row count: .* Updated:.*/, "Row count: "+rows.length+" Updated: "+date2);
  var all = head + '<tr' + rows.join('<tr')+"</tbody>"+foot;
  fs.writeFileSync("../homophones.html",all);
}

function perRow(item, index, arr1) {
   var b = item.replace(/><br>/g,">zZZ<br>");
   var u = b.split(/<.tr/);
   var tds = u[0].split(/<td[^>]*>/);
   var first = tds.shift();
   tds.sort();
   tds.unshift(first);
   // tds.forEach(db1);
   var b2 = tds.join('<td>');
   b2 = b2.replace(/zZZ/g,'');
   b2 = b2 + '</tr'+u[1];
   // console.log(b2);
	arr1[index] = b2;
}

function db1(item, index) {
  console.log("- "+item+" -\n");
}

main();
