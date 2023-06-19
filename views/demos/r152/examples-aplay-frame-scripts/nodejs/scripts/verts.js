module.exports = (frameData, a_bytes, i_byte, bytes_per_frame, data) => {

    let i = 0;
    const len = frameData.length / 3;

    let xMean = 0;
    let yMean = 0;
    while(i < len){

        const s = i * 3;
        const x = frameData[i];
        const y = frameData[i + 1];
        const z = frameData[i + 2];

        xMean += x;
        yMean += y;

        i += 1;
    }

    xMean /= len;
    yMean /= len;

    const n = Math.round( 128 + xMean * 32);
    return n;
};
