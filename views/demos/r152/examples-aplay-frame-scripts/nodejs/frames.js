const fs = require('fs');
const path = require('path');
//-------- ----------
// file uri, data object, buffer
//-------- ----------
const file_uri = path.resolve( process.argv[2] );
const data = require(file_uri);
// if we get data then use the 'script' key to know what script to use
const process_frame = require( path.join(__dirname, 'scripts', data.script + '.js') );

const buff = Buffer.alloc(1);
//-------- ----------
// BYTES PER FRAME
//-------- ----------
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
        const n = process_frame(frameData, a_bytes, i_byte, bytes_per_frame, data);
        buff.write( n.toString(16), 0, 'hex');
        process.stdout.write( buff );
        i_byte += 1;
    }
});