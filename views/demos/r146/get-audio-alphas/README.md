# get audio alphas prototype

What I want to have here is a way to load audio sample data exported from audacity in html file format. This audio data can then be used to create an array of alpha values that can then in turn be used as a way to update things with an animation on a frame by frame basis

So in other words this is a music visualization tool for threejs projects.

## Goals with this prototype

* (done) start a javaScript module that will load one or more html files that contain sample data
* (done) the loader will parse the html into a result object that will contain a key for every sample
* (done) have the demo make use of at least two sets of sample data
* (done) using an absolute value array to get the kinds of alphas hat seem to work well
* (done) col number option for the load method

## Using DOM PARSER

```
https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
```