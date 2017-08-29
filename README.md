# Console Log - development - AngularJS Module
<h3>Installation</h3>
	- Install module:  npm i angularjs-dev-console -S
	- Add module to angularjs app: angular.module('myApp',['developConsole'])

<h3>Description</h3>
	This module allows no logging to be printed on the console if the environment where the app is run is different from localhost

<h3>Basic usage</h3>

	- console.mode('mode') - mode : dev / prod - String - This command set the enviroment. default is dev if is localhost domaind else is prod
	- console.logs().      - Print de all logs.
	- console.dev('')      - Equal to regular console.log