# examples-aplay-client r152 todo list

* (done) main.js will make use of a 2d canvas as the base way of drawing

* () I will want to start a aplay-client.js module

<!-- aplay-client array to text -->
I could also use blob, and read as text of filereader maybe
This might work as a way to spit out text into a text area element
I could then copy and paste that into any text editor and see if that works okay
as a way to create the raw data to play with aplay
```
var Uint8ArrayToRaw = ( uint8_array = new Uint8Array([72, 69, 76, 76, 79]) ) => {
    var blob = new Blob( [ uint8_array ] , {type: "octet/stream"});
    var reader = new FileReader();
    return new Promise( (resolve, reject) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        }, false);
        reader.addEventListener('error', (evnt) => {
            reject('error converting uint8 array to text');
        }, false);
        reader.readAsText(blob);
    });
}
```