const fs = require('fs');
const path = require('path');

//-------- ----------
// file uri, data object, buffer
//-------- ----------
const file_uri = path.resolve( process.argv[2] );
const data = require(file_uri);
const buff = Buffer.alloc(1);
//-------- ----------
// BYTES PER FRAME
//-------- ----------
// Sample rate  / Frame Rate = Bytes Per Frame
//  2,010       / 30         =    67
//  2,100       / 30         =    70
//  8,100       / 30         =   270
// 16,200       / 30         =   540
// 42,000       / 30         = 1,400
const bytes_per_frame = data.bytes_per_frame || 270;
//-------- ----------
// FOR EACH FRAME in data.frames...
//-------- ----------
data.frames.forEach( ( frameData ) => {
    let i_byte = 0;
    const count_wave = frameData[0];
    const byte_bias = frameData[1];
    const count_bias = frameData[2];
    while(i_byte < bytes_per_frame){
        const a_bytes = i_byte / bytes_per_frame;
        //const a2 = 1 - Math.abs(0.5 - (a_bytes * count_bias % 1) ) / 0.5;
        const a2 = (a_bytes * count_bias % 1);
        const a3 = Math.sin( Math.PI * a2 )

        const a = i_byte / count_wave % 1;
        const n = Math.round( (128 + Math.cos( Math.PI * a ) * (byte_bias * a3)) );
        buff.write( n.toString(16), 0, 'hex');
        process.stdout.write( buff );
        i_byte += 1;
    }
});