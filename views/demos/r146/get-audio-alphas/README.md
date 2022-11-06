# get audio alphas prototype

What I want to have here is a way to load audo sample data exported from audacity in html file format. This audo data can then be used to create an array of alpha values that can then in turn be used as a way to update things with an animation on a frame by frame basis

So in other words this is a music visualization tool for threejs projects.

## Goals with this prototype

* (done) start a javaScript module that will load one or more html files that contain sample data
* (done) the loader will parse the html into a result object that will contain a key for every sample

* () have the demo make use of at least two sets of sample data

## Using DOM PARSER

```
https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
```