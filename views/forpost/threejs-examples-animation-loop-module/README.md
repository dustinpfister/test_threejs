# threejs-examples-animation-loop-module

This is an animaiton loop module project based off of by r140 demo that was the starting point for this. The aim is to have something that will work as a center framework for header apps. These apps might prove to be mainly frame, by frame, or determanisic in nature. However becuase the aim is to make a header app many of them might prove to also be stocastic, random, make use of seed data on a page by page basis, or other various factors. In any case I might like to have a standard UI that can be used to pause and start the app, as well as adjust the rate at which it updates so that the user has control over the amount of processor overhead that it will use.


## Setting CSS Values

I have went with a system where I assign class names for the main container element, as well as for all the children of the container. This way it is up to me how to adjust the style by way of css. For the most part I have got this working okay by setting the posiiton of the parent to static actually, but settng absolute positioning for the element that I append to in the hard coded html. I am sure that there will be many sitations in which I will want to adjust this, so this way I can do just that with CSS rather than hacking over the javaScript code.

```css
.aniloop_parent{
  position: static;
}
.aniloop_child{
  position: absolute;
  left: 0px;
  top: 0px;
}
#nav_headerapp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 640px;
  height: 200px;
}
```