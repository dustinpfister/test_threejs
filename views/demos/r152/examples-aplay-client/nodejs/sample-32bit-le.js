const path = require('path');
// get json data
const data = require( path.join(__dirname, String( process.argv[2] || 'adata') + '.json') );

const buff = Buffer.alloc(4);
data.forEach( ( n_float ) => {
    const n = parseInt( n_float );
    buff.writeFloatLE( n.toString(16), 0, 4, 'hex');
    process.stdout.write(buff)
});