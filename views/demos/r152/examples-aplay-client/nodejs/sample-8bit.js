const path = require('path');
// get json data
const data = require( path.join(__dirname, String( process.argv[2] || 'adata') + '.json') );

const buff = Buffer.alloc(1);
data.forEach( ( n_byte ) => {
    const n = parseInt( n_byte );
    buff.write(n.toString(16), 0, 1, 'hex');
    process.stdout.write(buff)
});