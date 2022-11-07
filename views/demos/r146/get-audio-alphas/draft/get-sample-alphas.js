var nodes = document.querySelectorAll('tr');
var len = nodes.length;

var alphas = [];
var i = 1;
while(i < len){
    var a1 = parseFloat(nodes[i].children[2].textContent);
    var a2 = (1 + a1) / 2
    alphas.push(a2);
    i += 1;
}
console.log(JSON.stringify(alphas))