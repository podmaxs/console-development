// CREACION DE MODULO #1 
// CON EL SNIPPET DE podmaxs
// PARA INSTANCIAR O AMPLIAR

(function(){
	"use strict";
	angular.module('developConsole',[])
	.factory('$consoleConfig', [function(){
		return new function(){
			var self  = this;
			this.logs = {
				'log': [],
				'warn': [],
				'info': [],
				'error': []
			};

			this.mode = "";

			this.defaults = {};
			
			this.getLine = function(){
				var p = new Error();
				if(p.stack.toString().indexOf('console.log (') != -1){
					var le = p.stack.toString().split('console.log (');
					if(le[1] && typeof le[1] == typeof "" && le[1].indexOf('\n') != -1){
						var nl = le[1].split('\n');
						if(nl[0])
							return nl[0];
					}
				}
				return "0";
			}

			this.overrideConsole = function(type){
				self.defaults[type] = console[type];
				console[type]       = function(){
					self.checkMode();
					if(self.mode == 'dev')
						for(var i in arguments)
							self.defaults[type](arguments[i]);
					for(var i in arguments)
						self.logs[type].push({ data:arguments[i],line: self.getLine(),date: new Date()});
				}
			}

			for(var t in self.logs)
				self.overrideConsole(t);

			this.checkMode = function(){
				if(self.mode == ""){
					if(window.location.hostname == 'localhost')
						self.mode = 'dev';
					else
						self.mode = 'prod';
				}
			}

			console['mode'] = function(mode){
				if(mode == 'prod' || mode == 'dev')
					self.mode = mode;
			}

			console['dev'] = function(){
				for(var i in arguments)
					self.defaults.log(arguments[i]);
			}

			console['config'] = function(){
				self.defaults.info({
					'Console mode':self.mode
				});
			}

			console['clean'] = function(){
				console.clear();
				for(var t in self.logs)
					self.logs[t] = [];
				self.defaults.info("Logs list cleared");
				return true;
			}

			console['logs'] = function(){
				for(var t in self.logs){
					self.defaults.info('Table '+t);
					console.table(self.logs[t]);
				}
			}
		};
	}])
	.run(['$consoleConfig',function($consoleConfig){}]);
	
})();