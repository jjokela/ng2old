#ng2old

This is a demo that shows how to use Angular2 in Visual Studio 2015. 

Basically it uses the 'old' ASP.NET 4.5.2 template, npm for package management, and (currently) latest version of Angular 2 (2.0.0-rc.1).

###Why not ASP.NET 5?
* Does NOT use ASP.NET 5 template, since that is really buggy and awkward to use. (For example: sometimes complains syntax errors that go away only after closing and reopening solution, package.json file doesn't show in project tree after reopening, uses internal (old) version of node and you need to configure it to use your latest one, random hangs and other funny stuff)


##Credits
* This demo uses quite heavily John Papa's ng2 sample project, especially the shared components (toast, filter, modal ...) and the UI styling.


##Stuff you need to do before running

* Install latest version of `Node.js` (v6.2.0)
* Update npm to latest version: `npm install npm -g`
* For Visual Studio, install latest version of `TypeScript for Microsoft Visual Studio`
* To fix Visual Studio Typescript Intellisense behaving badly, there is a a bugfix mentioned [here](https://github.com/Microsoft/TypeScript/issues/8518#issuecomment-217960231). You need to replace the `typescriptServices.js` file.

##Material

* John Papa's [sample](http://a2-first-look.azurewebsites.net/)
* Angular 2 [style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)

##Notes
* This demo uses some [Material Design Lite (MDL)](https://getmdl.io/components/) components. Some of the work, and some of them, well, don't work. 
There are some nice node packages available for easing up the integration of ng2 and MDL, but they don't work well enough for latest version of ng2 yet.
* Uses in memory Web API to simulate server.
