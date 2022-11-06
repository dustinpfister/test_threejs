# get audio alphas prototype

What I want to have here is a way to load audo sample data exported from audacity in html file format. This audo data can then be used to create an array of alpha values that can then in turn be used as a way to update things with an animation on a frame by frame basis

So in other words this is a music visualization tool for threejs projects.

## Goals with this prototype

* () start a javaScript module that will load one or more html files that contain sample data
* () the loader will parse the html into an array of number values

## Using DOM PARSER

```
https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
```