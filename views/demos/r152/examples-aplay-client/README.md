# examples-aplay-client r152 demo

After making two demos that have to do with using threejs in the process of creating audio sample data to play with the Linux aplay command. I am now of the mindset that the best way forward would be to do everything client side. This way I can do a better job of showing what the state of things are visually with the state of the audio data when it comes to things like graphs of audio data. I can then use Uint8ClampedArray as a way to create what will be the final raw data that will be played using aplay.



## EXPORTING

One thing that is holding me back with this is how to go about exporting sample data. In other demos like this one I was going with a system where what I am exporting is JSON, and also the JSON is data that is arguments that are to be called for each frame of some video. It is then a nodejs script that converts this json data to the final binary data. However with this demo I am thinking more in terms of doing everything client side, as I would like to have access to the full set of data on this end to be used in the process of visualizing the data.

### AS JSON

For now I think the best way might be to export JSON data, and then use a simple nodejs script to convert that to raw binnary as that has been working for me thus far. However for this demo I am thinking more in terms of just a very simple nodejs script that will read a very simple form of JSON that is typed array data.

### AS RAW TEXT?

I Thought that I could also use the blob class to convert to text, and then just save that as a file.
However this does not seem to work as I always get the same tone. It would seem that non asci bytes all
end up being the same char. I do not think that this would be a good way to export anway

```
const arrayToTyped = ( data_sample = [] ) => {
    return new Uint8ClampedArray( data_sample);
};
// typed array to raw data
const Uint8ArrayToRaw = ( uint8_array = new Uint8Array([72, 69, 76, 76, 79]) ) => {
    const blob = new Blob( [ uint8_array ] , {type: "octet/stream"});
    return blob.text();
};
```