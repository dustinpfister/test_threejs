module.exports = (frameData, a_bytes, i_byte, bytes_per_frame, data) => {
 
    const count_wave = frameData[0];
    const byte_bias = frameData[1];
    const count_bias = frameData[2];
 
    const a2 = (a_bytes * count_bias % 1);
    const a3 = Math.sin( Math.PI * a2 )
    const a = i_byte / count_wave % 1;
    const n = Math.round( (128 + Math.cos( Math.PI * a ) * (byte_bias * a3)) );
 
    return n;
};
