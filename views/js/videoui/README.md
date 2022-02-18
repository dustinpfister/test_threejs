# Video UI

This is the code that I was using to create videos that worked will until chnages with chrome, and just about every other browser caused it to stop working. I have started a revision 1 of this in an effort to get it worrking again, but as of this writing thus far I have not had any success.


It would seem that what I need to do is figure out how to create a MediaStreamTrack from a blob, that is assuming that there is even a way to do that to begin with.

I have found this thus far that is my current lead if I am going to sink even more time into this

https://stackoverflow.com/questions/14864027/is-there-a-way-to-create-your-own-mediastreamtrack-using-say-json-objects
https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel


## What I have tryed thus far to get this working again.

I have tyyed everything that I can to get this working again, and thus far it would seem the only way to get this to work is to use an older browser binary from before the code breaking chnages where made.

### CAN NOT create a MediaStream for the vid.srcObject property

From what I have read with the [URL.createObjectUR](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) method the way that I have got this to work, will no longer work by using the URL.createObjectURL to create a data url for the src property of a video element. Fair enough, but altertaive to doing this will also not work.

This is what worked before the code braking chnages where made

```
vid.src = URL.createObjectURL(blob);
```

There does not seem to be any way to create a MediaStream from a blob that contains the desired video track. I have lookd all over the place and tryed all kinds of various things, with the various constrcutros that are used to create a MediaStream object and thus far nothing seems to work.

I can however create an empty media stream and set that for the srcObject property of the video at leat though.

```
// CAN NOT GET ANYTHING TO WORK WITH MEDIASTREAM
var sourceObject = new MediaStream();
vid.srcObject = sourceObject;
```

### CAN NOT set vid.srcObject to blob

The srcObject property of the video should be a way to set what the video contents are, but setting the blob created with whammy will not work.

### Can NOT change parameters for meme type of image/webp for whammy, it will cause an error

I was thinking that changing some of the parameters for the use of the mime type string given to the [canvas.ToDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) method will help.

For example when adding frames to the encoder I would do soemthing like this

```
var url = canvas.toDataURL('image/webp');
encoder.add(url)
```

However there are a numnber of additonal parameters that can be set for a meme type such as [codecs to use](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter#webm). However doing any of the followinf will case an error with whammy, and it would seem that I can not get this to work with anything other than just the plain 'image/webp' string for the type given to canvas.toDataURL.

So this of any variation other than 'image/webp' will case an error
```
var url = canvas.toDataURL('video/webm;codecs="vp8"');
encoder.add(url)
```

### Can NOT pass a canvas or context to whammy encoder, it will only take a DATA URL 

The whammy documation stats that I can pass a canvas element or a context to the encoder my way of the add method. This is not true passing anything other than a data url will case an error.

