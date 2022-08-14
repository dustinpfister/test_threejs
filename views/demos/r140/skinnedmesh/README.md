## skinned mesh demo

This is a skinned mesh demo in which I just want to bend a cylinder around.


https://github.com/mrdoob/three.js/blob/dev/docs/scenes/bones-browser.html

### Getting this to work on raspberry pi os?

So far this feature of threejs results in a loss of context webgl error in chromium 90.x on rpi os buster. This is because it would seem that webgl 2.0 is disabled and thus this will not work, at least not with late versions of threejs such as r140. I have started another demo using an older version of threejs in my r111 folder of demos, this does not result in a loss of content, but thus far I also have not got it working.

## Know webgl support

check out webgl report to see what the deal is with webgl support

https://webglreport.com/?v=2

## Check out the r111 demo

I started a new demo folder for my r111 collection of demos for skinned mesh. Thus far this does not result in a loss of context, but I still have not got it working there also. However the reason why might becuase of a user problem on my part as well as not finidn any decent hello world like examples of this.