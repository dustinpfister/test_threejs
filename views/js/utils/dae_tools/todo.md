# todo list for dae_tools.js

## 0.2.0 - () - load all method, and progress bar
* have a DAE.loadAll method that can be used to load a collection of dea loader results into a dae object
* a base url can be set for loadAll along with an array or relative paths

## 0.1.0 - ( done 6/25/21 ) - onDone callback fires when textures load
* (done) The DAE.loadOne method on done callback/promise resolve should happen when the dea file loads AND all textures are laoded too. 

## 0.0.0 - ( done 6/23/21 ) - Basic tools
* (done) have a DAE.create method that will create a dea state object
* (done) have a DAE.loadOne method that can be used to load just one dea loader result into a dea state object
* (done) have a DEA.createGroup method that can be used to create a group, and append only desired contents from a dea result object
* (done) have DEA.loadOne return a promise that will resolve when the model is done loading

