# Video UI

This is the code that I was using to create videos that worked will until chnages with chrome, and just about every other browser caused it to stop working. I have started a revision 1 of this in an effort to get it worrking again, but as of this writing thus far I have not had any success.

## What I have tryed thus far to get this working again.

### Can not change parameters for meme type of image/webp for whammy, it will cause an error

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

### Can only pass DATA URL to whammy encoder

The whammy documation stats that I can pass a canvas element or a context to the encoder my way of the add method. This is not true passing anything other than a data url will case an error.