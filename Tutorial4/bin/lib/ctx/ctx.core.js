/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Ctx framework Core classes and methods ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* This module implements core classes and functions used to define Contextor language :
*   * Object descriptor,
*   * Technical and functional events,
*   * Context management,
*   * Registry management,
*   * ...
* 
* \\
*/

/*
 * @ignore
* Global legacy variables, used when porting V2 language projects to V3 language
* Do not use in general case !
*/
var _Work0_ = '';
var _Work1_ = '';
var _Work2_ = '';
var _Work3_ = '';
var _Work4_ = '';
var _Work5_ = '';
var _Work6_ = '';
var _Work7_ = '';
var _Work8_ = '';
var _Work9_ = '';

/**  
 * global _DEBUG flag : can be overidded at compile time
 * @ignore
 * @define {boolean} */
var _DEBUG = false;

// add 'String.prototype.trim' function if nedded
if (!String.prototype.trim) {
   String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };
}
if (!String.prototype.ltrim) {
	String.prototype.ltrim = function(){ return this.replace(/^\s+/,''); };
}
if (!String.prototype.rtrim) {
	String.prototype.rtrim = function(){ return this.replace(/\s+$/,''); };
}
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(prefix) { return (this.indexOf(prefix) == 0); };
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(suffix) { return (this.indexOf(suffix, this.length - suffix.length) !== -1); };
}
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// add 'Object.keys' function if nedded
if (!Object.keys) {
  // JScript in IE8 and below mistakenly skips over built-in properties.
  // https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute
  var hasDontEnumBug = !({toString: true}).propertyIsEnumerable('toString');

  var getKeys = function(object) {
    var type = typeof object;
    if (type != 'object' && type != 'function' || object === null) {
      throw new TypeError('Object.keys called on non-object');
    }

    var keys = [];
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  if (hasDontEnumBug) {
    var dontEnumProperties = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'prototypeIsEnumerable',
      'constructor'
    ];

    Object.keys = function(object) {
      var keys = getKeys(object);
      for (var ii = 0, il = dontEnumProperties.length; ii < il; ii++) {
        var property = dontEnumProperties[ii];
        if (object.hasOwnProperty(property)) {
          keys.push(property);
        }
      }
      return keys;
    };
  } else {
    Object.keys = getKeys;
  }
}
		
// add 'Array.isArray' function if nedded
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/**
* Contextor Framework
* @class ctx
* @path ctx
* @constructor
*/
var ctx = (	function () {
	/** framework global version 
	* @const 
	* @ignore
	* @type {string} */ var _coreVersion = "3.2.6.11";
	
	// verbs saved anyway
	var _forceSave = {
		'ctx.log': true
	};
	
	var self = 
/** \\
* ===== Properties =====
*/
	/** @lends ctx */
	{
	/** any event const value 
	* @ignore
	* @const 
	* @path ctx.anyEvent
	* @property {string} */ anyEvent: '_Any_',

	/** class type 
	* @ignore
	* @const 
	* @path ctx.ctxType
	* @property {string} */ ctxType: 'ctx',
	
	/** map of event handlers
	* @ignore 
	* @path ctx.subscriptions
	* @property {Object} subscriptions */ subscriptions: {},

	/** Application array
	* @ignore 
	* @path ctx.app
	* @description 
	* Contains the list of declared applications
	* 
	* __Ex.:__
<code javascript>
// enumerate applications
for (var id in ctx.app) {
  var app = ctx.app[id];
	ctx.log(app.name);
}
</code>
	* @property {Object} */ app : {}, 
	
	/** Application data array
	* @ignore 
	* @path ctx.data
	* @description
	* ctx.data.
	*   Appli1
	*    [0] --> contains ctx.app.Appli1[0].data
	*    [3584] --> contains ctx.app.Appli1[3584].data
	*   Appli2
	*    [0] --> contains ctx.app.Appli2[0].data
	*    [2587] --> contains ctx.app.Appli2[2587].data
	*    [3798] --> contains ctx.app.Appli2[3789].data
	*
	* @ignore [internal usage]
	* Contains the list of data container for declared application instances
	* @property {Array<ctx.dataManager>} */ data : [], 
		
	/** map of 'Action' functions depending on nature
	* @ignore
	* @path ctx.actionFunction
	* @property {Object} */ actionFunction : {},
	
	/** map of 'ActionApp' functions depending on nature
	* @ignore
	* @path ctx.actionAppFunction
	* @property {Object} */ actionAppFunction : {},

	/** custom types declared for items
	* @ignore
	* @path ctx.customItems
	* @property {Object} */ customItems : {},
	
	/** disable notifications
	* @ignore
	* @path ctx.noNotify
	* @property {boolean} */ noNotify : false,
	
	/** custom types declared for pages
	* @ignore
	* @path ctx.pageCustomTypes  
	* @property {Object} */ pageCustomTypes : {},
	
	/** Map of pending functions
	* @ignore
	* @path ctx.pendingFunctions  
	* @property {Array.<function()>} */ pendingFunctions : [],
	
//	/** Map of pending scenarios
//	* @ignore
//	* @path ctx.pendingScenarios
//	* @property {Array.<ctx.scenarioClass>} */ pendingScenarios : [],
//	
//	/** Map of pending promises
//	* @ignore
//	* @path ctx.pendingPromises
//	* @property {Array.<ctx.promiseClass>} */ pendingPromises : [],
	
	/** Object index
	* @ignore
	* @path ctx.objectIndex  
	* @property {number} */ objectIndex : 0,
	
	/** Counter array
	* @ignore
	* @path ctx.counters  
	* @property {Object} */ counters : {
	 	/** Action counter list 
		* @ignore
		* @path ctx.counters.actions  
		* @property {Object} */ actions: {},
	 	/** Running scenario counter list
		* @ignore
		* @path ctx.counters.scenarios  
		* @property {Object} */ scenarios: {}
	}, 
	
	/** 
	* @ignore
	* @type {string} */ _traceDate : '',
	
	/** 
	* @ignore
	* @type {WScriptShell} */ _shell : null,
	
	/** 
	* @ignore
	* @type {ScriptingFileSystemObject} */ _fso : null,

	/**
	* Current application
	* @path ctx.currentAppli
	* @property {ctx.application} currentAppli */	currentAppli : null,
		
	/** Current event
	* @path ctx.currentEvent  
	* @property {ctx.event} currentEvent */ currentEvent : null, 
			
	/** Current promise
	* @ignore
	* @path ctx.currentPromise  
	* @property {ctx.promiseClass} currentPromise */ currentPromise : null, 
			
	/**
	* Current page
	* @path ctx.currentPage
	* @property {ctx.page} currentPage */	currentPage : null,

	/** Current running scenario
	* @ignore
	* @path ctx.currentScenario  
	* @property {ctx.scenarioClass} currentScenario */ currentScenario : null,

	/** Current running step
	* @ignore
	* @path ctx.currentStep
	* @property {ctx.stepClass} currentStep */ currentStep : null,
		
	/** Current subscription
	* @ignore
	* @path ctx.currentSubscription
	* @property {Object} currentSubscription */ currentSubscription : null,
		
	/** Current parentId
	* @ignore
	* @path ctx.currentParentId
	* @property {number} currentParentId */ currentParentId : 0,
		
	/** Current timer reason
	* @ignore
	* @path ctx.currentTimerReason
	* @property {string} currentTimerReason */ currentTimerReason : '',
		
	/** Engine activity : variable is false by default, is set to true after event GLOBAL:START is received
	* @ignore
	* @path ctx.engineStarted 
	* @property {boolean} engineStarted */ engineStarted : false,
		
	/** Engine is stopping (GLOBAL END was received)
	* @ignore
	* @path ctx.engineStopInProgress 
	* @property {boolean} */ engineStopInProgress : false,

	/** Project sub features
	* @ignore 
	* @path ctx.features 
	* @property {Object} */ features : {},

	/** Last received event
	* @ignore
	* @path ctx.lastEvent  
	* @property {ctx.event} lastEvent */ lastEvent : null, 
			
/** \\
* ===== Methods =====
*/
			
	/**
	* Adds an application or process
	* @description
	* __Ex.:__
<code javascript>
var GLOBAL = ctx.addApplication('GLOBAL');
var LinkedIn = ctx.addApplication('LinkedIn', {"nature":"WEB3","path":"www.linkedin.com/"});
</code>
	* @method addApplication
	* @path ctx.addApplication
	* @ignore
	* @param {string} name
	* @param {Object} [obj]
	* @return {ctx.application} Created application
	*/
	addApplication : function (name, obj) {
		return (ctx.app[name] = new ctx.application(name, obj));
	},

	/**
	* Adds a pending function
	* @description
	* __Ex.:__
<code javascript>
</code>
	* @method addPendingFunction
	* @path ctx.addPendingFunction
	* @ignore
	* @param {function()} callback
	*/
	addPendingFunction : function (callback) {
		if (ctx.currentEvent && ctx.currentEvent.parent) {
			// add function in the pending list, it will be called at the end of event treatment
			ctx.pendingFunctions.push(callback);
		} else {
			// no event is being treated (typically, endStep() called from a timer function) : call immediately
			callback();
		}
	},
	
	/**
	* clears old trace folders and archives
	* @description
	* __Ex.:__
<code javascript>
ctx.clearTraceFolder();
</code>
	* @method clearTraceFolder
	* @ignore internal use
  * @path ctx.clearTraceFolder
	* @return {boolean} result
	*/
	clearTraceFolder : function () {
		var res = true;
		try {
			// archive should be something like files '<computer>.<user>.2015-10-30T14.45.23Z.889.zip' or folders '<computer>.<user>.2015-10-30T14.45.23Z.889'
			var targets = {	};
			ctx.noNotify = true;
			targets.files = ctx.fso.folder.getFileCollection(ctx.options.currentDir),
			ctx.noNotify = true;
			targets.folders = ctx.fso.folder.getFolderCollection(ctx.options.currentDir)
			var prefix = ctx.options.computerName + '.' + ctx.options.userName + '.';
			var pos, pos2;
			var sDate;
			var oldFileArray = []; // archives to be deleted
			var fileArray = []; 
			for (var id in targets) {
				var f = targets[id];
				for (; !f.atEnd(); f.moveNext()) {
					var filename = f.item().Name;
					pos = filename.indexOf(prefix);
					if (pos >= 0) {
						// date = '2015-10-30T...'
						sDate = filename.substr(prefix.length + pos, 10);
						var todayDate = new Date();
						var y = parseInt(sDate.substr(0, 4), 10);
						var m = (parseInt(sDate.substr(5, 2), 10) - 1);
						var d = parseInt(sDate.substr(8, 2), 10);
						if ((y > 2000) && (d > 0)) {
							var fileDate = new Date(y, m, d);
							var diffDate = todayDate - fileDate;
							var nbDays = Math.floor(diffDate / (1000 * 60 * 60 * 24));
							if (nbDays <= ctx.options.traceArchive.maxDuration) {
								fileArray.push(filename);
							} else {
								oldFileArray.push(filename);
							}
						}
					}
				}	
			}
			//list of recent files:
			// - sort by ascendant date
			// - move the first entries (oldest) to oldFileArray,  (only keep the last 'maxCount' archives)
			fileArray.sort();
			var nbToDelete = fileArray.length - ctx.options.traceArchive.maxCount;
			if (nbToDelete > 0) {
				for (var i = 0; i < nbToDelete ; i ++) {
					var filename = fileArray.shift();
					oldFileArray.push(filename);
				}
			}
			//delete obsolete files and folders
			while (oldFileArray.length > 0) {
				var entry = ctx.options.currentDir + '\\' + oldFileArray.shift();
				ctx.noNotify = true;
				if (entry.endsWith('.zip') ) {
					ctx.fso.file.remove(entry);
				} else {
					ctx.fso.folder.remove(entry);
				}
			}
		} catch (ex) {}
		return res;
	},
	
	/**
	* Compares two version numbers (one can be the product version)
	* @description
	* __Ex.:__
<code javascript>
if (ctx.compareVersion('3.0.6.5') < 0) 
{
	// Interactive version is inferior to '3.0.6.5'
}
</code>
	* @advanced
	* @method compareVersion
	* @path ctx.compareVersion
	* @param {string} version version to be compared
	* @param {string} [reference] reference version for comparison (if omitted, 'ctx.options.productVersion' is used)
	* @return {number} result : -2 (failure), -1 (version > reference), 0 (equal), 1 (reference > version)
	*/
	compareVersion : function (version, reference) {
		reference = reference || ctx.options.productVersion;
    if (typeof version + typeof reference !== 'stringstring') {
        return -2;
    }
    var a = reference.split('.');
    var b = version.split('.');
    var i = 0;
    var len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || (parseInt(a[i], 10) > parseInt(b[i], 10))) {
            return 1; // reference > version
        } else if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || (parseInt(a[i], 10) < parseInt(b[i], 10))) {
            return -1; // version > reference
        }
    }
    return 0; // version = reference
	},


	/**
	* Emulates DOM 'window' and 'document' objects in a non-Web javascript engine
	* @ignore
	* @method emulateBrowser
	* @path ctx.emulateBrowser
	* @return {boolean} result success state
	*/
	emulateBrowser : function () {
		try {
			if (typeof window === 'undefined') {
				var doc = new ActiveXObject("htmlfile");
				window = doc.parentWindow;
				if (typeof navigator === 'undefined') { /** @suppress {const} */ navigator = window.navigator; }					
				if (typeof document === 'undefined') { /** @suppress {const} */ document = window.document; }
				if (typeof location === 'undefined') { /** @suppress {const} */ location = document.location; }
				if (typeof window.ActiveXObject === 'undefined') { window.ActiveXObject = ActiveXObject; }
				try {
					/**
					* @param {Function|string} callback
					* @param {number} [delay]
					* @param {...*} [var_args]
					* @ignore
					* @see https://developer.mozilla.org/en/DOM/window.setTimeout
					*/
					setTimeout = function(callback, delay, var_args) { return window.setTimeout(callback, delay, var_args); };
					clearTimeout = function(obj) { return window.clearTimeout(obj) };
					/**
					* @param {Function|string} callback
					* @param {number} [delay]
					* @ignore
					* @see https://developer.mozilla.org/en/DOM/window.setTimeout
					*/
					setInterval = function(callback, delay) { return window.setInterval(callback, delay); };
					clearInterval = function(obj) { return window.clearInterval(obj) };
					alert = function(message) { return window.alert(message) };
				} catch (ex) {
//					/**
//					* @param {Function|string} callback
//					* @param {number} [delay]
//					* @param {...*} [var_args]
//					* @ignore
//					* @see https://developer.mozilla.org/en/DOM/window.setTimeout
//					*/
//					setTimeout = function(callback, delay, var_args) { return setTimeout(callback, delay) };
//					clearTimeout = function(obj) { return clearTimeout(obj) };
					alert = function(message) { return ctx.log(message) };
				}
			}
		} catch (ex) {
			return false;
		}
		return true;
	},
	
	/**
	* Gets a defined applicaton or process object by its name
	* @advanced
	* @description
	* __Ex.:__
<code javascript>
var app = ctx.getApplication('LinkedIn');
</code>
	* @method getApplication
	* @path ctx.getApplication
	* @param {string} name application name
	* @return {ctx.application} Application object
	*/
	getApplication : function (name) {
		return (ctx.app[name]);
	},
	
	/**
	* Retrieves the object descriptor from a string selector
	* @description
	* Object selector, should be : ''[appliName[(appliInst)]]:[pageName[(pageInst)]]:[item[(itemInst)][index]]:''
	*   * if 'appliName' is omitted, current appli is used
	*   * if 'appliInst' is omitted, current appli instance is used
	*
	* __Ex.:__
<code javascript>
  - var desc = ctx.getDescriptor("MyAppli:pMain:btSearch");
  - var desc = ctx.getDescriptor(".pMain.btSearch");
  - var desc = ctx.getDescriptor("..btSearch");
  - var desc = ctx.getDescriptor("MyAppli(5145).pMain.btSearch");
  - var desc = ctx.getDescriptor("MyAppli.pMain(1002).btSearch");
  - var desc = ctx.getDescriptor("MyAppli.pMain.rowResult[0]"); // first value in occursed item
  - var desc = ctx.getDescriptor("MyAppli.pMain.tabResult[iRow][iCol]"); // cell (iRom, iCol) in an array
</code>
	* @method getDescriptor
	* @path ctx.getDescriptor
	* @ignore
	* @param {string|ctx.descriptor} [selector] string selector
	* @param {ctx.descriptor} [desc] Optional source descriptor object (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @return {ctx.descriptor} Object descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	*/
	getDescriptor : function (selector, desc) {
		if ((typeof selector === 'undefined') || (selector === '')) {
			selector = '.'; // implicit selector : [current appli:current page]
		}
		var tSelector = selector.split('.');
		var val;
		var offset = 0;
		if (desc) {
			if (desc.appliName !== '')
				offset--;
			if (desc.pageName !== '')
				offset--;
		} else {
      desc = new ctx.descriptor();
		}
		var nb = tSelector.length;
		if (typeof tSelector[offset] !== 'undefined') {
			if (tSelector[offset] !== '') {
				//rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
				val = tSelector[offset]; //.match('/^*\(/g');
				desc.appliName = val;
				if (ctx.currentEvent && desc.appliName == ctx.currentEvent.appliName && ctx.app[ctx.currentEvent.appliName] && ctx.app[ctx.currentEvent.appliName][ctx.currentEvent.appliInst])
					desc.appliInst = ctx.currentEvent.appliInst;
			} else if (ctx.currentEvent && ctx.app[ctx.currentEvent.appliName] && ctx.app[ctx.currentEvent.appliName][ctx.currentEvent.appliInst]) {
				desc.appliName = ctx.currentEvent.appliName;
				desc.appliInst = ctx.currentEvent.appliInst;
			}
		}
		if (typeof tSelector[offset + 1] !== 'undefined') {
			if (tSelector[offset + 1] !== '') {
				val = tSelector[offset + 1]; //.match('/^*\(/g');
				desc.pageName = val;
				if (ctx.currentEvent && desc.pageName == ctx.currentEvent.pageName)
					desc.pageInst = ctx.currentEvent.pageInst;
			} else if (ctx.currentEvent) {
				desc.pageName = ctx.currentEvent.pageName;
				desc.pageInst = ctx.currentEvent.pageInst;
			}
		}
		if (typeof tSelector[offset + 2] !== 'undefined') {
			if (tSelector[offset + 2] !== '') {
				val = tSelector[offset + 2]; //.match('/^*\(/g');
				desc.itemName = val;
			} else {
				desc.itemName = ctx.currentEvent.itemName;
			}
			desc.itemFullName = desc.itemName;
	    for (var i = 0; i < desc.index.length; i++) {
				desc.itemFullName = desc.itemFullName + '[' + desc.index[i] + ']';
			}
		}
		return desc;
	},

	/**
	* Returns Javascript engine version
	* @description
	* __Ex.:__ 
<code javascript>
var obj = ctx.getEngineVersion(); 
// obj = {
//   scriptEngine: 'JScript', 
//   majorVersion: '5', 
//   minorVersion: '8', 
//   buildVersion: '16428' }
</code>
	* @method getEngineVersion
	* @path ctx.getEngineVersion
	* @return {Object} object containing version values (see ex. below)
	*/
	getEngineVersion : function () {
		var obj = {};
		try {
			obj.scriptEngine = Host.ScriptEngine();
			obj.majorVersion = Host.ScriptEngineMajorVersion();
			obj.minorVersion = Host.ScriptEngineMinorVersion();
			obj.buildVersion = Host.ScriptEngineBuildVersion();
		} catch(ex) {}
		ctx.notifyAction('ctx.getEngineVersion', obj);
		return obj;
	},
	
	/**
	* Retrieves the object descriptor from the current page or application
	* @ignore
	* @method getObjectDescriptor
	* @path ctx.getObjectDescriptor
	* @param {ctx.descriptor} [desc] Optional source descriptor object (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @return {ctx.descriptor} Object descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	*/
	getObjectDescriptor : function (desc) {
		// global descriptor : return default appli / page
		if (!desc)
		    desc = new ctx.descriptor();
//		if (ctx.currentPage)
//			desc = ctx.currentPage.getObjectDescriptor(desc);
//		else if (ctx.currentAppli)
//			desc = ctx.currentAppli.getObjectDescriptor(desc);
//		if (desc.appliName == '') {
//			// default host process, in case no ctx.currentEvent is defined (usual if action launched using 'Test code' or 'Page tester')
//			desc = GLOBAL.getObjectDescriptor(desc);
//		}
		return desc;
	},

	/** Returns a formatted XML command from a command name and an object containing parameters
	* @description
	* __Ex.:__
<code javascript>
ex. : 'MESSBOX', {PageName: 'pVersion', Type: e.messbox.type.HTMLView, Template: 'Warning', Title: "Contextor - Version", ...}
returns : "<MESSBOX PageName='pVersion' Type='HTMLView' Template='Warning'><_Value>...</_Value></MESSBOX>"
</code>
	* Description
	* @method getXMLSyntax
	* @path ctx.getXMLSyntax
	* @ignore
	* @param {string} command command name ('MESSBOX', 'SETVALUE', 'LOGMESS', ...)
	* @param {Object} [object] command parameters
	* @param {string} [subcommand] optional subcommand as a string
	* @return {string} formatted string
	*/
	getXMLSyntax : function (command, object, subcommand) {
		var str = '<' + command,
		val, att;
		// add standard attributes
		for (att in object) {
			if ((typeof object[att] !== 'undefined') && (object[att] != null)) {
				val = String(object[att]);
				if ((typeof val !== 'undefined') && !((val.indexOf('<') != -1) || (val.indexOf('>') != -1) || (val.indexOf('"') != -1) || (val.indexOf('&') != -1)))
					str = str + " " + att + "=\"" + object[att] + "\"";
			}
		}
		str = str + '>';
		// add CData attributes
		for (att in object) {
			if ((typeof object[att] !== 'undefined') && (object[att] != null)) {
				val = String(object[att]);
				if (val && (val !== '') && ((val.indexOf('<') != -1) || (val.indexOf('>') != -1) || (val.indexOf('"') != -1) || (val.indexOf('&') != -1))) {
					var bCData = (val.indexOf('<![CDATA[') == -1);
					str = str + "<_" + att + ">";
					if (bCData)
						str = str + "<![CDATA[";
					str = str + object[att];
					if (bCData)
						str = str + "]]>";
					str = str + "</_" + att + ">";
				}
			}
		}
		if (subcommand)
			str = str + subcommand;
		str = str + '</' + command + '>';
		return str;
	},
	
	/**
	* Gets or sets the debug mode
	* @description
	* __Ex.:__
<code javascript>
// add a test menu in systray in debug mode only
if (ctx.isDebug()) {
systray.addMenu(...);
}
</code>
	* @method isDebug
	* @deprecated Rather use ctx.options.isDebug
	* @path ctx.isDebug
	* @param {boolean} [value] boolean value to set the debug mode
	* @return {boolean} result true: debug mode | false: release mode
	*/
	isDebug : function (value) {
		if (typeof value !== 'undefined')
			ctx.options.isDebug = (value ? true : false);
		return ctx.options.isDebug;
	},
	
	/**
	* Tests if an object is empty
	* @description
	* __Ex.:__
<code javascript>
// add a test menu in systray in debug mode only
if (ctx.isEmpty(obj)) { ... }
</code>
	* @method isEmpty
	* @path ctx.isEmpty
	* @param {Object} obj object to be tested
	* @return {boolean} result true: empty | false: not empty
	*/
	isEmpty : function(obj) { 
		for(var i in obj) { return false; } return true; 
	},

	/**
	* Tests if a path is absolute or relative
	* @description
	* __Ex.:__
<code javascript>
if (ctx.isPathAbsolute(path)) { ... }
</code>
	* @method isPathAbsolute
	* @path ctx.isPathAbsolute
	* @param {string} path to be tested
	* @return {boolean} result true: absolute | false: relative
	*/
	isPathAbsolute : function (path) {
		// path like : http://..., c:...
		if (path.indexOf(':') > 0) { return true; }
		// path like : ...//...
		var r = new RegExp('^(?:[a-z]+:)?//', 'i');
		if (r.test(path)) { return true; }
		// path like : \\server\...
		 return /^(?:[A-Za-z]:)?\\/.test(path);
	},

	/**
	* Function used to transcode a source object to a destination object
	* @description
	* __Ex.:__
<code javascript>
var source = {
  Title: 'Inception',
  Released: '16 Jul 2010',
  Director: 'Christopher Nolan',
  Plot: 'A thief, who steals corporate secrets through ...'
};
var dest = {};
ctx.map(source, dest, {
  Title: title,
  Released: date,
  Director: director,
  Plot: details,
})
// --> dest = {
//  title: 'Inception',
//  datez: '16 Jul 2010',
//  director: 'Christopher Nolan',
//  details: 'A thief, who steals corporate secrets through ...'
//};

</code>
	* @method map
	* @path ctx.map
	* @param {*} source source object
	* @param {Object} dest destination object
	* @param {Object} mapping transcoding object
	* @return {Object} destination object
	*/
	map : function (source, dest, mapping) {
    dest = dest || {};
    if ((typeof source !== 'object') || (typeof dest !== 'object') || (typeof mapping !== 'object')) {
			throw new Error(e.error.InvalidArgument, "ctx.map : source, dest and mapping should be objects.");
		}
		ctx.each(mapping, function(id, value) {
			if ((source[id] !== undefined) && (source[id] !== null)) dest[value] = source[id];
		});		
		return dest;
	},

	
	/**
	* Function used to trace function calls
	* @description
	* __Ex.:__
	* <code javascript>
	* ctx.notifyAction('excel.file.open');
	* </code>
	* @method notifyAction
  * @path ctx.notifyAction
	* @ignore
	* @param {string} name action name
	* @param {*} [res] function result
	* @param {ctx.descriptor} [desc] object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @param {string} [verb] connector language verb
	* @param {Object} [params] function parameters
	* @param {*} [attributes] optional extra attributes
	* @suppress {es5Strict } warning 'arguments.callee'
	*/
	notifyAction : function (name, res, desc, verb, params, attributes) {
		if (ctx.noNotify) { 
			ctx.noNotify = false; 
			return;
		}		
		var forceSave = _forceSave[name];
		if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.frameworkTraces || forceSave) {
			params = params || (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments, 0) : undefined);
			var obj = {
				ts: ctx.getTime(),
				ctx:'Action',
				action: name,
				params: params,
			  result: res,
				verb: verb
			};
			if (ctx.currentParentId > 0) {
				obj.parentId = ctx.currentParentId;
			}
			if (desc) { 
				if (desc.appliName) { 
					obj.appliName = desc.appliName; 
					obj.appliInst = desc.appliInst; 
				}
				if (desc.pageName) { 
					obj.pageName = desc.pageName; 
					obj.pageInst = desc.pageInst; 
				}
				if (desc.itemName) { 
					obj.itemName = desc.itemFullName; 
					if (desc.itemInst > 0) { obj.itemInst = desc.itemInst; }
					if (desc.itemOccurs > 0) { obj.itemOccurs = desc.itemOccurs; }
				}
			}
			try {
				if (attributes) {
					var att = (attributes.ctxShort ? attributes.ctxShort() : attributes);
					for (var id in att) {
						obj[id] = att[id];
					}
				}
			} catch (ex) { }
			
			ctx.notifyDebug(obj, forceSave);
		}
		if (name) {
			if (ctx.counters.actions[name]) ctx.counters.actions[name] ++; else ctx.counters.actions[name] = 1;
		}
	},

	/**
	* Sends a debug string to Contextor Debugger
	* @description
	* __Ex.:__
<code javascript>
var obj = {
	ctx: 'State',
	name: name,
	...
};
ctx.notifyDebug(obj);
</code>
	* @method notifyDebug
	* @ignore
  * @path ctx.notifyDebug
	* @param {Object} obj
	* @param {boolean} [forceSave] if true, trace is saved in any case
	* @param {boolean} [fileOnly] if true, trace in file and not in Debug flow
	*/
	notifyDebug : function (obj, forceSave, fileOnly) {
		if (forceSave || ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.frameworkTraces) {
			// add timestamp
			if (!obj.ts)
				obj.ts = ctx.getTime();
			var txt = ctx.serialize(obj, false, false, undefined, true);
			// *** send notifications to Studio Debugger ***
			if (ctx.options.trace.frameworkNotify && (typeof Host !== 'undefined') && (Host.Debug) && (!fileOnly)) {
				Host.Debug.write(txt);
			}
			// *** local serialization in a trace file ***
			if (ctx.engineStarted && (forceSave || ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces) && ctx.options.traceFolder) {
				//if (forceSave || ctx.options.trace.frameworkTraces)
				if (forceSave)
					ctx.wkMng.CtxtWriteFile(ctx.options.currentDir + '\\' + ctx.options.traceFolder + '\\traces.pscl', txt + '\n', true);
				//if (ctx.options.trace.autoRecordingStarted && (!ctx.options.trace.frameworkTraces))
				if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces)
					ctx.wkMng.CtxtWriteFile(ctx.options.currentDir + '\\' + ctx.options.traceFolderRecording + '\\traces.pscl', txt + '\n', true);
			}
			if (ctx.options.trace.alternativeTraceFile)
				ctx.wkMng.CtxtWriteFile(ctx.options.trace.alternativeTraceFile, txt + '\n', true);
		}		
	},

	/**
	* Function used to trace error
	* @description
	* __Ex.:__
	* <code javascript>
	* ctx.notifyError(data);
	* </code>
	* @method notifyError
  * @path ctx.notifyError
	* @ignore
	* @param {*} data data
	* @param {string} label label
	*/
	notifyError : function (data, label) {
		ctx.log(data, e.logIconType.Error, label);
	},

	/**
	* Sends a debug string to Contextor Debugger
	* @description
	* __Ex.:__
<code javascript>
var obj = {
	ctx: 'State',
	name: name,
	...
};
ctx.notifyEvent(obj);
</code>
	* @method notifyEvent
	* @ignore
  * @path ctx.notifyEvent
	* @param {ctx.event} ev
	* @param {boolean} [fileOnly] if true, trace in file and not in Debug flow
	*/
	notifyEvent : function (ev, fileOnly) {
		var obj = {
			ts: ctx.getTime(),
			ctx:					'Event', 
			event:        ev.name, 
			appliName:    ev.appliName, 
			appliInst:    ev.appliInst 
		};
		if (ev.pageName) { 
			obj.pageName = ev.pageName; 
			obj.pageInst = ev.pageInst; 
		}
		if (ev.itemName) {
			obj.itemName = ev.itemName; 
			obj.itemInst = ev.itemInst;
			if (ev.itemIndex) { obj.itemIndex = ev.itemIndex; }
		}
		if (ev.reqAppliName) { 
			obj.reqAppliName = ev.reqAppliName; 
			obj.reqAppliInst =	ev.reqAppliInst;
		}
		if (ev.reqEventName) { obj.reqEventName = ev.reqEventName; } 
		if (ev.reqItemName) { obj.reqItemName = ev.reqItemName; }
		if (ev.data) { obj.data = ev.data; }
		
		// add screenshot capture
		if (ctx.options.trace.screenshotTraces && ((ev.name == e.event.page.LOAD) || (ev.name == e.event.page.ACTIVATE))) {
			var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces) ? ctx.options.traceFolderRecording : ctx.options.traceFolder)
			if (ev.page && ev.page.hwnd) {
				var file = ctx.getTimestamp(null, true) + '.png';
				ctx.noNotify = true;
				ctx.screenshot( { 
					File: ctx.options.currentDir + '\\' + traceFolder + "\\" + file,
					HWND: ev.page.hwnd
				} );
				obj.screenshot = {
					file: file, 
					folder: traceFolder,
					hwnd: ev.page.hwnd
				}; 
			}
		}
		ctx.notifyDebug(obj, false, fileOnly);
	},

	/**
	* Function used to trace informations
	* @description
	* __Ex.:__
	* <code javascript>
	* ctx.notifyInfo('desktop', data);
	* </code>
	* @method notifyInfo
  * @path ctx.notifyInfo
	* @ignore
	* @param {*} data data
	* @param {string} name label associated with data
	* @param {string} [filename] filename in which traces are recorded (if omitted, use the default trace files)
	*/
	notifyInfo : function (data, name, filename) {
		ctx.log(data, e.logIconType.Data, name);
	},
	
	/**
	 * Sends a 'State' event to Contextor Debugger
	 * @ignore
	 * @method notifyState
   * @path ctx.notifyState
	 * @param {string} type
	 * @param {string} name
	 * @param {number} id
	 * @param {string} action
	 * @param {*} [data]
	 * @param {string} [parentName]
	 * @param {number} [parentId]
	 * @param {ctx.application} [parentAppli]
	 */
	notifyState : function (type, name, id, action, data, parentName, parentId, parentAppli) {
		if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.frameworkTraces) {
			var obj = {
				ts: ctx.getTime(),
				ctx: 'State',
				type: type,
				name: name,
				id: id,
				action: action
			};
			if (parentAppli && parentAppli.name) {
				obj.appliName = parentAppli.name;
				if (parentAppli.instance > 0) obj.appliInst = parentAppli.instance;
			}
			if (parentName) {
				obj.parentName = parentName;
			}
			if (parentId) {
				obj.parentId = parentId;
			}
			if (data) {
				obj.data = data;
			}
			ctx.notifyDebug(obj);
		}
	},
	
/** update of option files
* @method updateOptions
* @path ctx.updateOptions
* @ignore
*/
updateOptions : function () {
	var text = '';
	try {
		var file = ctx.options.currentURL + "\\ctx.options.json";
		text = ctx.fso.file.read(file);
	} catch (ex) {}
	if (text) {
		try {
			var obj = ctx.json.parse(text);
			var groups = ['all'];
			var groups2;
			if (obj['machines']) {
				groups2 = obj['machines'][ctx.options.computerName];
			  if (groups2 && Array.isArray(groups2)) { 
					groups = groups.concat(groups2); 
				}
			}
			if (obj['logins']) {
				groups2 = obj['logins'][ctx.options.userName];		
			  if (groups2 && Array.isArray(groups2)) { 
					groups = groups.concat(groups2); 
				}
			}
			ctx.each(groups, function(id, group) {
				var options = obj.options[group];
				if ('object' === typeof(options)) {
					ctx.set(options, ctx.options);
				}
			});		
		} catch (ex) {
			ctx.log("ctx.options.json could not be read", e.logIconType.Warning);
		}
	}
},
	
/** callback called at engine startup : initializes some dynamic variables 
* @method onEngineStart
* @path ctx.onEngineStart
* @ignore
*/
onEngineStart : function () {
	
	ctx.engineStarted = true;

	// check libraries
	if (ctx.popup === undefined) { ctx.log('ctx.popup library should be included', e.logIconType.Error) ;	}
	if (ctx.fso === undefined) { ctx.log('ctx.fso library should be included', e.logIconType.Error) ;	}
	if (ctx.wmi === undefined) { ctx.log('ctx.wmi library should be included', e.logIconType.Error) ;	}
	if (ctx.wscript === undefined) { ctx.log('ctx.wscript library should be included', e.logIconType.Error) ;	}
	if (ctx.diagnostic === undefined) { ctx.log('ctx.diagnostic library should be included', e.logIconType.Error) ;	}

	// Browser emulation
	ctx.emulateBrowser();

	// Standard paths
	ctx.options.currentDir = ctx.context.get('//WkMng_Info/CurrentDir');
	ctx.options.currentURL = ctx.context.get('//WkMng_Info/CurrentURL');
	ctx.options.resourceURL = ctx.options.currentURL;
	ctx.options.execDir = ctx.context.get('//WkMng_Info/ConteXtorDir');
	ctx.options.serverURL = ctx.context.get('//WkMng_Info/ServerURL');
	
	// machine and user infos
	ctx.options.computerName = ctx.context.get('//WkMng_Info/ComputerName');
	ctx.options.userName = ctx.context.get('//WkMng_Info/UserCode');
	ctx.options.fullUserName = ctx.context.get('//WkMng_Info/FullUserCode');
	ctx.options.canonicalName = ctx.context.get('//WkMng_Info/CanonicalName');
	ctx.options.displayName = ctx.context.get("//GLOBAL/WkMng_Info/DisplayName");
	ctx.options.fullyQualifiedDN = ctx.context.get("//GLOBAL/WkMng_Info/FullyQualifiedDN");

	// product version (get version from WkMng component)
	ctx.updateProductVersion();

	// no redondancy with variables in Context: PrjVersion, PrjName, ...
	ctx.options.projectVersion = ctx.context.get('//GLOBAL/PrjVersion');
	ctx.options.projectClient = ctx.context.get('//GLOBAL/PrjClient');
	ctx.options.projectName = ctx.context.get('//GLOBAL/PrjName');
	ctx.options.projectDate = ctx.context.get('//GLOBAL/PrjDate');
	ctx.options.projectLabel = ctx.context.get('//GLOBAL/PrjLabel');
	ctx.options.projectComment = ctx.context.get('//GLOBAL/PrjComment');
	ctx.options.frameworkVersion = ctx.version(); // SDK version
	ctx.options.JScriptVersion = ctx.getEngineVersion(); // JS Engine version
	
	// *** Traces levels ***
	var traceLevel = ctx.context.get('//WkMng_Param/WkMng_TraceLevel');

	// *** WkMng trace levels (not modifiable, just for display) ***
	ctx.options.trace.errors = ((traceLevel & 1) ? true : false);
	ctx.options.trace.events = ((traceLevel & 2) ? true : false);
	ctx.options.trace.actions = ((traceLevel & 4) ? true : false);
	ctx.options.trace.actionsFull = ((traceLevel & 8) ? true : false);
	ctx.options.trace.context = ((traceLevel & 16) ? true : false);
	ctx.options.trace.extendPilots = ((traceLevel & 32) ? true : false);
	ctx.options.trace.objects = ((traceLevel & 64) ? true : false);
	ctx.options.trace.windowsEvents = ((traceLevel & 128) ? true : false);
	ctx.options.trace.messageBoxes = ((traceLevel & 256) ? true : false);
	ctx.options.trace.debuggerV2 = ((traceLevel & 512) ? true : false);
	ctx.options.trace.advanced = ((traceLevel & 1024) ? true : false);
	
	// *** ctx framework trace levels ***
	// Studio debug channel
	ctx.options.trace.frameworkNotify = ((traceLevel & 2048) ? true : false);
	
	// trace recording
	ctx.options.trace.frameworkTraces = ((traceLevel & 4096) ? true : false);
	ctx.options.trace.screenshotTraces = ((traceLevel & 8192) ? true : false);
	if (ctx.options.trace.frameworkTraces && ctx.diagnostic) {
		ctx.diagnostic.enableRecording(true, false, true);
	}
	
	// read options from the command line
	ctx.noNotify = true;
	var node = ctx.context.getCtx('//GLOBAL/WkMng_Info/OptionFiles');
	if (node && node.childNodes) {
		for (var i = 0; i < node.childNodes.length; i ++) {
			var text = node.childNodes[i].text;
			if (text) {
				var pos = text.indexOf('=');
				if (pos > 0) {
					var key = text.substring(0, pos).trim();
					var val = text.substring(pos + 1).trim();
					if (key !== '') {
						// overload or add option
						if (ctx.index(ctx.options, key) !== undefined) {
							var type = typeof(ctx.index(ctx.options, key));
							if (type == 'boolean')
								val = (val == 'true' ? true : false); 
							else if (type == 'number')
								val = parseInt(val, 10);
						} else {
							if (val == 'true') val = true; 
							else if (val == 'false') val = false; 
							else if (!isNaN(parseInt(val, 10))) val = parseInt(val, 10);
						}
						ctx.index(ctx.options, key, val);
					}
				} else {
					// non formatted option (<key>=>value>) : store it 'as is'
					ctx.options.optionFiles.push(text);
				}
			} 
		}
	}
	
	// read options from the options file
	ctx.updateOptions();
	
	// test menu display
	ctx.options.isDebug = (ctx.options.trace.debuggerV2 || ctx.options.trace.frameworkNotify);

	// for compatibility, save data in GLOBAL.data
	ctx.set(ctx.options, GLOBAL.data);
	
	// clear old trace folders
	ctx.clearTraceFolder();
	
	// create a new trace folder
	ctx.reinitTraceFolder(false, true);

	// check every tem minutes if day changed : if true, reinitialize trace folder
	setInterval(function() {
		var today = ctx.getTimestamp(null, true).substring(0, 10);
		var currentDay = ctx.options.traceTimestamp.substring(0, 10);
		if (today != currentDay) {
			ctx.reinitTraceFolder(false, true);
		}
	}, 600000);
},

	/** callback called at engine stop
	* @method onEngineStop
	* @path ctx.onEngineStop
	* @ignore
	*/
	onEngineStop : function () {
		ctx.engineStarted = false;	
	},	


	/**
	* creates / reinits trace folder and triggers archiving
	* @description
	* __Ex.:__
<code javascript>
ctx.reinitTraceFolder(false, true);
</code>
	* @method reinitTraceFolder
	* @ignore internal use
  * @path ctx.reinitTraceFolder
	* @param {boolean} [copyArchive] copy or send archive 
	* @param {boolean} [createNew] create a new trace folder
	* @param {boolean} [recording] create a folder for auto or manual recording 	
	* @param {boolean} [deleteOld] delete folder for auto recording 	
	* @param {string} [prefix] optional prefix
	* @return {string} new trace folder path
	*/
	reinitTraceFolder : function (copyArchive, createNew, recording, deleteOld, prefix) {
		try {
			var traceFolder = (recording ? ctx.options.traceFolderRecording : ctx.options.traceFolder)
			var oldTraceFolder = traceFolder; // reset trace folder
			prefix = prefix || (recording ? e.trace.type.Record : e.trace.type.Log);
			if (createNew) {
				// create a new trace folder
				ctx._fso = ctx._fso || new ActiveXObject("Scripting.FileSystemObject"); 
				var ts = ctx.getTimestamp(null, true);
				if (!recording) { ctx.options.traceTimestamp = ts; }
				traceFolder = prefix + '.' + ctx.options.computerName + '.' + ctx.options.userName + '.' + ts;
				if(recording) 
					ctx.options.traceFolderRecording = traceFolder; 
				else 
					ctx.options.traceFolder = traceFolder;
				if (!ctx._fso.FolderExists(ctx.options.currentDir + '\\' + traceFolder)) {
					ctx._fso.CreateFolder(ctx.options.currentDir + '\\' + traceFolder);
				}
				// notify Studio with the folder name for LOGS
				if (!recording) {
					GLOBAL.notify(GLOBAL.events._evUpdateLogFolder, ctx.options.currentDir + '\\' + traceFolder);
				}
				if (typeof ctx.onStartTraceCallback === 'function') {
					ctx.onStartTraceCallback(ctx.options.currentDir + '\\' + traceFolder);
				}
			} else {
				if(recording) 
					ctx.options.traceFolderRecording = '';
				else 
					ctx.options.traceFolder = '';
			}
			// archive previous folder
			if (oldTraceFolder) {
				if (deleteOld) {
					if (ctx._fso.FolderExists(ctx.options.currentDir + '\\' + oldTraceFolder)) {
						ctx._fso.DeleteFolder(ctx.options.currentDir + '\\' + oldTraceFolder);
					}
				} else {
					if (typeof ctx.onStopTraceCallback === 'function') {
						ctx.onStopTraceCallback(ctx.options.currentDir + '\\' + oldTraceFolder, copyArchive);
					}
				}
			}
		} catch (ex) {}
		return traceFolder;
	},

	/** Calculates a RGB value
	* @description
	* __Ex.:__
<code javascript>
var color = ctx.rgb(0xff, 0, 0); // 'red color'
</code>
	* @method rgb
	* @path ctx.rgb
	* @param {number} r red color (0 to 0xff)
	* @param {number} g green color (0 to 0xff)
	* @param {number} b blue color (0 to 0xff)
	* @return {number} RGB value
	*/
	rgb : function (r, g, b) { 
		return r + g * 0x100 + b * 0x10000; 
	},

	/** function called to update product versions 
	* @method updateProductVersion
	* @path ctx.updateProductVersion
	* @ignore
	*/
	updateProductVersion : function() {
		ctx.options.productVersions = {};
		var node = ctx.context.getCtx('//GLOBAL/WkMng_Info/Components');
		if (node && node.childNodes) {
			for (var i = 0; i < node.childNodes.length; i ++) {
				var component = node.childNodes[i].tagName;
				var version = node.childNodes[i].childNodes[1].text || node.childNodes[i].childNodes[0].text; // product version, or file version
				ctx.options.productVersions[component] = version;
			}
		}
		ctx.options.productVersion = ctx.options.productVersions['XsWrkMng2'];
	},

	/**
	* Generates a GUID string.
	* @description
	* __Ex.:__
<code javascript>
var uuid = ctx.uuid(); // uuid = af8a8416-6e18-a307-bd9c-f2c947bbb3aa
</code>
	* Adapted from Slavik Meltser (slavik@meltser.info). See http://slavik.meltser.info/?p=142 
	* @method uuid
	* @path ctx.uuid
	* @returns {string} The generated GUID.
	*/
	uuid : function () {
	/**
		* Generates a GUID sub-string.
		* @method _p8
		* @ignore
		* @param {boolean} [s] true: -xxxx-xxxx, false: xxxxxxxx
		* @returns {string} sub-string
		*/
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
	},

	/** Returns the ctx framework version
	* @description
	* __Ex.:__
<code javascript>
var vers = ctx.version(); // '3.0.1'
</code>
	* @method version
	* @path ctx.version
	* @return {string} Framework global version
	*/
	version : function () {
		ctx.notifyAction('ctx.version', _coreVersion);
		return _coreVersion;
	}
	
	};
	return self;
})();


//ctx.fn = ctx.prototype = {
//	constructor: ctx
//};

/**
 * Module extension function
 * @ignore
 * @method extend
 * @path ctx.extend
 * @param {...*} args
 * @return {Object} target
 */
ctx.extend = function (args) {
//ctx.extend = ctx.fn.extend = function (args) {
	var options,
	name,
	src,
	copy,
	copyIsArray,
	clone,
	target = arguments[0] || {},
	i = 1,
	length = arguments.length,
	deep = false;
	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && typeof target !== "function") {
		target = {};
	}
	// extend ctx itself if only one argument is passed
	if (length === i) {
		target = this;
		--i;
	}
	for (i = 0; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) !== null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];
				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if (deep && copy && ((typeof copy == "object") || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && (typeof src == "object") ? src : {};
					}
					// Never move original objects, clone them
					target[name] = ctx.extend(deep, clone, copy);
					// Don't bring in undefined values
				} else if (typeof copy !== 'undefined') {
					target[name] = copy;
				}
			}
		}
	}
	// Return the modified object
	return target;
};

/**
* Emulated WkMng object, only for testing in a Web browser
* @path ctx.ICtxWkMng
* @class ctx.ICtxWkMng
* @ignore
* @constructor
*/
ctx.ICtxWkMng = function () {
	this.WkMgTrtEvent = function (AppliName, Event, ObjectName, ControlName, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp, ReqPrjName, reqAppliName, reqEventName, reqItemName, lReqIdInstanceAppli) { return ""; }
	this.WkMgTrtEvent2 = function (AppliName, Event, ObjectName, ControlName, lControlIndex, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp, ReqPrjName, reqAppliName, reqEventName, reqItemName, lReqIdInstanceAppli) { return ""; }
	this.WkMgLog = function (Message, lType) { return ""; }
	this.WkMgLogErrSys = function (Message, ler, lerr) { return ""; }
	this.WkMgSelSingleNode = function (queryString) { return ""; }
	this.WkMgNotify = function (CtxName, AppliName, Event, ObjetName, ControlName, lControlIndex, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp) { return ""; }
	this.CtxtAction = function (Action, AppliName, PageName, Item, lItemIndex, DataIn, lIdAppliInst, lIdPageInst, lIdItemInst) {
		ctx.log("CtxtAction: " + Action + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')' + (Item !== '' ? '.' + Item + (lIdItemInst ? '(' + lIdItemInst + ')' : '') + (lItemIndex ? '[' + lItemIndex + ']' : '') : '') + '|' + DataIn);
		return "";
	}
	this.CtxtActionApp = function (Action, AppliName, PageName, P1, P2, P3, P4, P5, lIdAppliInst, lIdPageInst, lIdItemInst) {
		ctx.log("CtxtActionApp: " + Action + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')|' + P1 + '|' + P2 + '|' + P3 + '|' + P4 + '|' + P5 + '|' + lIdItemInst);
		return "";
	}
	this.CtxtVerbExec = function (Command, AppliName, PageName, lIdAppliInst, lIdPageInst) {
		ctx.log("CtxtVerbExec: " + Command + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')');
		return "";
	}
	this.CtxtLogTick = function () { return ""; }
	this.CtxtLogTime = function (vChrono, Mess) { return ""; }
	this.CtxtWriteFile = function (File, Text, vbEnd) { return ""; }
	this.CtxtCreateObj = function (Object) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtGetVal
	 * @path ctx.ICtxWkMng
	 * @param {string} variable
	 * @param {string} nodeCtx
	 * @param {string} idApp
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtGetVal = function (variable, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtSetVal
	 * @param {string} variable
	 * @param {string} value
	 * @param {string} nodeCtx
	 * @param {string} idApp
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtSetVal = function (variable, value, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtGetCtx
	 * @param {string} variable
	 * @param {string} nodeCtx
	 * @param {string} idApp
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtGetCtx = function (variable, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtSetCtx
	 * @param {string} ctxt
	 * @param {string} iAction
	 * @param {string} model
	 * @param {string} iModel
	 * @param {string} nodeCtx
	 * @param {string} idApp
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtSetCtx = function (ctxt, iAction, model, iModel, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtDelCtx
	 * @param {string} variable
	 * @param {string} nodeCtx
	 * @param {string} idApp
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtDelCtx = function (variable, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CtxtAddBloc
	 * @param {string} ctxt
	 * @param {string} model
	 * @param {string} iModel
	 * @param {string} [nodeCtx]
	 * @param {string} [idApp]
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.CtxtAddBloc = function (ctxt, model, iModel, nodeCtx, idApp, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method WkMgGetPscNode
	 * @param {string} pilote
	 * @param {Object} [pResult]
	 * @return {string} result
	 */
	this.WkMgGetPscNode = function (pilote, pResult) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method WkMgMessErr
	 * @param {string} pilot
	 * @param {string} func
	 * @param {string} code
	 * @param {string} error
	 * @param {Object} lMess
	 * @return {string} result
	 */
	this.WkMgMessErr = function (pilot, func, code, error, lMess) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CryptProtect
	 * @param {string} input
	 * @param {string} [password]
	 * @return {string} result
	 */
	this.CryptProtect = function (input, password) { return ""; }
	/**
	 * Description
	 * @ignore
	 * @method CryptUnprotect
	 * @param {string} input
	 * @param {string} [password]
	 * @return {string} result
	 */
	this.CryptUnprotect = function (input, password) { return ""; }
	this.CryptEncryptStringToFile = function (inputString, outputFile, password) { return ""; }
	this.CryptDecryptFileToString = function (inputFile, password) { return ""; }
	this.CryptEncryptFileToFile = function (inputFile, outputFile, password) { return ""; }
	this.CryptDecryptFileToFile = function (inputFile, outputFile, password) { return ""; }
	this.CryptEncryptMessage = function (input, store, certificate) { return ""; }
	this.CryptDecryptMessage = function (input, store, certificate) { return ""; }
	this.CryptSignMessage = function (input) { return ""; }
	this.CryptVerifySignedMessage = function (input) { return ""; }
	};

/**
 * The wkMng object :
 *   - if executed in Contextor engine, set it to a WkMng object
 *   - if executed in a test Web page, set it to a dummy emulation object
 * @ignore
 * @method wkMng
 * @path ctx.wkMng
 * @return {ctx.ICtxWkMng}
 */
ctx.wkMng = (
/** @suppress {checkTypes}  */
function() 
{
	// real (Interactive engine) or emulated (IE browser) object
	/** @type {ctx.ICtxWkMng} */
	var _wkMng = null;
	if (!_wkMng) {
		if (typeof Contextor !== 'undefined') {
			_wkMng = Contextor;
		} else if (typeof ctx.ICtxWkMng !== 'undefined') {
			_wkMng = new ctx.ICtxWkMng();
		}
	}
	return _wkMng;
})();


/**
* Object describing an object position and size (X, Y, CX, CY, ...)
* @class ctx.position
* @path ctx.position
* @param {number} [x] object left position (relative to screen)
* @param {number} [y] object top position (relative to screen)
* @param {number} [cx] object width
* @param {number} [cy] object height
* @param {number} [x2] object left position (relative to parent window)
* @param {number} [y2] object top position (relative to parent window)
* @param {number} [hwnd] handle of the parent window
* @constructor
*/
ctx.position = function (x, y, cx, cy, x2, y2, hwnd) {
/** \\
* ===== Properties =====
*/
  /** class type
	* @ignore
	* @const 
	* @path ctx.position.ctxType
	* @property {string} */ this.ctxType = 'ctx.position';
	/** object left position (relative to screen)
	* @path ctx.position.x
	* @property {number} */ this.x = x || 0;
	/** object top position (relative to screen)
	* @path ctx.position.y
	* @property {number} */ this.y = y || 0;
	/** object width
	* @path ctx.position.cx
	* @property {number} */ this.cx = cx || 0;
	/** object height
	* @path ctx.position.cy
	* @property {number} */ this.cy = cy || 0;
	/** object left position (relative to parent window)
	* @path ctx.position.x2
	* @property {number} */ this.x2 = x2 || 0;
	/** object top position (relative to parent window)
	* @path ctx.position.y2
	* @property {number} */ this.y2 = y2  || 0;
	/** handle of the parent window
	* @path ctx.position.hwnd
	* @property {number} */ this.hwnd = hwnd || 0;
};

/**
* Object describing an object (application, page, item), with given names and instances
* @class ctx.descriptor
* @advanced
* @path ctx.descriptor
* @constructor
*/
ctx.descriptor = function () {
/** \\
* ===== Properties =====
*/
  /** class type
	* @ignore
	* @const 
	* @path ctx.descriptor.ctxType
	* @property {string} */ this.ctxType = 'ctx.descriptor';

	/** application or process object
	* @path ctx.descriptor.appli
	* @property {ctx.application} */ this.appli = null;
	
	/** application or process instance
	* @path ctx.descriptor.appliInst
	* @property {number} */ this.appliInst = -1;
	
	/** application or process name
	* @path ctx.descriptor.appliName
	* @property {string} */ this.appliName = "";
	
	/** event name 
	* @path ctx.descriptor.event
	* @property {string} */ this.event = "";
	
	/** occurence list for multi-dimension items
	* @path ctx.descriptor.index
	* @property {Array.<string>} */ this.index = [];
	
	/** item object
	* @path ctx.descriptor.item
	* @property {ctx.item} */ this.item = null;
	
	/** item full name (including occurences or prefix)
	* @path ctx.descriptor.itemFullName
	* @property {string} */ this.itemFullName = ""; // item name including occurences (item[...][...])
	
	/** item instance
	* @path ctx.descriptor.itemInst
	* @property {number} */ this.itemInst = 0;
	
	/** item name 
	* @path ctx.descriptor.itemName
	* @property {string} */ this.itemName = "";
	
	/** item occurence level
	* @path ctx.descriptor.itemOccurs
	* @property {number} */ this.itemOccurs = 0;	
	
	/** object nature
	* @path ctx.descriptor.nature
	* @property {string} */ this.nature = "";
	
	/** page object
	* @path ctx.descriptor.page
	* @property {ctx.page} */ this.page = null;
	
	/**  page instance
	* @path ctx.descriptor.pageInst
	* @property {number} */ this.pageInst = -1;
	
	/** page name
	* @path ctx.descriptor.pageName
	* @property {string} */ this.pageName = "";
	
	/** object type : application, page, item, ...
	* @path ctx.descriptor.type
	* @property {string} */ this.type = "";
	
	/** [Internal usage]
	 * Returns the short description for serialization
	 * @ignore
	 * @method ctxShort
	 * @path ctx.descriptor.ctxShort
	 */
	this.ctxShort = function() {
		var att = ['type', 'event', 'appliName', 'appliInst', 'pageName', 'pageInst', 'itemName', 'itemInst', 'itemOccurs', 'index'];
		var obj = {};
		var self = this;
		ctx.each(att, function(id, value) {
			obj[value] = self[value];
		});
		return obj;
	}
};

/**
* Class used to implement technical or functional events
* @class ctx.event
* @path ctx.event
* @constructor
* @advanced
* @param {string} name Event name
* @param {ctx.application|ctx.page|ctx.item} [parent] Parent object
* @param {Object|ctx.dataManager} [dataClass] data model object
* @param {boolean} [technical] if true, technical object
*/
ctx.event = function (name, parent, dataClass, technical) {
/** \\
* ===== Properties =====
*/
  /** class type
	* @ignore
	* @const 
	* @path ctx.event.ctxType
	* @property {string}  */ this.ctxType = 'ctx.event';
	
	/** parent application or process object
	* @path ctx.event.appli
	* @property {ctx.application} */ this.appli = (parent ? parent.appli : null);
	
	/** application or process instance
	* @path ctx.event.appliInst
	* @property {number} */ this.appliInst = (parent && parent.appli ? parent.appli.instance : -1);
	
	/** application or process name
	* @path ctx.event.appliName
	* @property {string} */ this.appliName = (parent && parent.appli ? parent.appli.name : '');
	
	/** optional data stored in event
	* @path ctx.event.data
	* @property {ctx.dataManager} */ this.data = null;
	if (dataClass instanceof ctx.dataManager) {
		this.data = dataClass.create();
	} else {
		this.data = new ctx.dataManager(dataClass, name);
	}
	
	/** item index
	* @path ctx.event.itemIndex
	* @property {number} */ this.itemIndex = (parent && parent.item ? parent.item.index : 0);
	
	/** item instance
	* @path ctx.event.itemInst
	* @property {number} */ this.itemInst = (parent && parent.item ? parent.item.instance : 0);
	
	/** item name 
	* @path ctx.event.itemName
	* @property {string} */ this.itemName = (parent && parent.item ? parent.item.name : '');
	
	/** item occurence level
	* @path ctx.event.itemOccurs
	* @property {number} */ this.itemOccurs = (parent && parent.item ? parent.item.occurs : 0);
	
	/** Event name
	* @path ctx.event.name
	* @property {string} */ this.name = name;
	
	/** instance count
	* @path ctx.event.nbInst
	* @property {number} */ this.nbInst = 0;
	
	/** parent page object
	* @path ctx.event.page
	* @property {ctx.page} */ this.page = (parent ? parent.page : null);
	
	/** page instance 
	* @path ctx.event.pageInst
	* @property {number} */ this.pageInst = (parent && parent.page ? parent.page.instance : -1);
	
	/** page name
	* @path ctx.event.pageName
	* @property {string} */ this.pageName = (parent && parent.page ? parent.page.name : '');
	
	/** parent object associated with event (application, page, item)
	* @path ctx.event.parent
	* @property {ctx.application|ctx.page|ctx.item|undefined} */ this.parent = parent;
	
	/** source application or process instance
	* @path ctx.event.reqAppliInst
	* @property {number} */ this.reqAppliInst = 0;
	
	/** source application or process name
	* @path ctx.event.reqAppliName
	* @property {string} */ this.reqAppliName = '';
	
	/** source event name
	* @path ctx.event.reqEventName
	* @property {string} */ this.reqEventName = '';
	
	/** source item name
	* @path ctx.event.reqItemName
	* @property {string} */ this.reqItemName = '';
	
	/** technical vs functionnal event
	* @path ctx.event.technical
	* @property {boolean} */ this.technical = technical;
	
/** \\
* ===== Methods =====
*/
	/**
	* Clears event content
	* @description
	* __Ex.:__
<code javascript>
ev.clear();
</code>
	* @method clear
	* @path ctx.event.clear
	*/
	this.clear = function () {
		this.name = '';
		this.parent = null;
		this.appli = null;
		this.page = null;
		this.appliName = '';
		this.pageName = '';
		this.itemName = '';
		this.appliInst = -1;
		this.pageInst = -1;
		this.itemInst = 0;
		this.itemIndex = -1;
		this.itemOccurs = 0;
		this.nbInst = 0;
		this.data = {};
		this.reqAppliName = '';
		this.reqAppliInst = 0;
		this.reqEventName = '';
		this.reqItemName = '';
	}
	
  /**
  * Returns a copy of the event
	* @description
	* __Ex.:__
<code javascript>
var ev2 = ev.copy();
</code>
  * @method copy
	* @path ctx.event.copy
  * @return {ctx.event} copied event
  */
	this.copy = function () {
		var ev = new ctx.event(this.name);
		for (var id in ev) { ev[id] = this[id]; }
		return ev;
	}

	/** [Internal usage]
	 * Returns the short description for serialization
	 * @ignore
	 * @method ctxShort
	 * @path ctx.event.ctxShort
	 */
	this.ctxShort = function() {
		var att = ['name', 'appliName', 'appliInst', 'pageName', 'pageInst', 'itemName', 'itemInst', 'itemIndex', 'itemOccurs', 'nbInst', 'data', 'reqAppliName', 'reqAppliInst', 'reqEventName', 'reqItemName'];
		var obj = {};
		var self = this;
		ctx.each(att, function(id, value) {
			obj[value] = self[value];
		});
		return obj;
	}
	
	/**
	* Gets an alias of the event, like <appliName[appliInst].pageName[pageInst].itemName:name>
	* @method getAlias
	* @path ctx.event.getAlias
	* @return {string} result
	*/
	this.getAlias = function () {
		var res = this.appliName + '[' + this.appliInst + ']';
		if (this.pageName) {
			res = res + '.' + this.pageName + '[' + this.pageInst + ']';
		}
		if (this.itemName) {
			res = res + '.' + this.itemName;
		}
		res = res + ':' + this.name;
		return res;
	}
	
	/**
	* Gets an alias of the event source, like <reqAppliName[reqAppliInst].reqPageName[reqPageInst].reqItemName:name>
	* @method getAliasReq
	* @path ctx.event.getAliasReq
	* @return {string} result
	*/
	this.getAliasReq = function () {
		var res = this.reqAppliName + '[' + this.reqAppliInst + ']';
		if (this.reqItemName) {
			res = res + '.' + this.reqItemName;
		}
		res = res + ':' + (this.reqEventName || this.name);
		return res;
	}
	
	/**
	* Extracts informations from the LOAD message
	* @method getLoadInfos
	* @path ctx.event.getLoadInfos
	* @ignore
	* @return {boolean} result
	*/
	this.getLoadInfos = function () {
		if (!(this.page instanceof ctx.page ))
			return false;
		try {
			/** @type{string} */ var sEv = '';
			if (typeof this.data === 'string') { 
				sEv = this.data;
			};
			this.page.currentNavigator = e.navigator.IE; // by default, suppose it's I.E.
			var xml = ctx.xml.parse(sEv);
			if (xml) {
				try {
					var xmlNode = xml.selectSingleNode("//_ObjectData_/UserAgent");
					if (xmlNode && xmlNode.text) {
						this.page.userAgent = xmlNode.text || '';
						if (this.page.userAgent.indexOf('Chrome') >= 0) {
							this.page.currentNavigator = e.navigator.Chrome;
						} else if (this.page.userAgent.indexOf('Firefox') >= 0) {
							this.page.currentNavigator = e.navigator.Firefox;
						}
					}
					// for a Web page : <_ObjectData_><Tab><HWND>0x260fd0</HWND></Tab></_ObjectData_>
					xmlNode = xml.selectSingleNode("//_ObjectData_/Process");
					if (xmlNode && xmlNode.text) {
						this.page.processId = parseInt(xmlNode.text, 10);
					}
					xmlNode = xml.selectSingleNode("//_ObjectData_/MainIEFrame/HWND");
					if (xmlNode && xmlNode.text) {
						var str = xmlNode.text.substring(2);
						this.page.hwndMain = parseInt(str, 16);
					}
					xmlNode = xml.selectSingleNode("//_ObjectData_/Tab/HWND");
					if (xmlNode && xmlNode.text) {
						var str = xmlNode.text.substring(2);
						this.page.hwnd = parseInt(str, 16);
					} else {
						// for a Windows Page : <_ObjectData_><HWND>35589254</HWND></_ObjectData_>
						try {
							xmlNode = xml.selectSingleNode("//_ObjectData_/HWND");
						} catch (ex) { }
						if (xmlNode && xmlNode.text) {
							if (this.page.is && this.page.is(e.nature.SWG))
								this.page.hwnd = parseInt(xmlNode.text, 16);
							else
								this.page.hwnd = parseInt(xmlNode.text, 10);
						}					
					}
				} catch (ex) { }
			}
		} catch(ex) {
			return false;
		}
		return true;
	}
	
	/**
	* Retrieves the object descriptor from the given event
	* @method getObjectDescriptor
	* @path ctx.event.getObjectDescriptor
	* @ignore
	* @param {ctx.descriptor} [desc] Optional source descriptor object
	* @return {ctx.descriptor} Object descriptor
	*/
	this.getObjectDescriptor = function (desc) {
		if (!desc)
			desc = new ctx.descriptor();
		if (this.parent)
			desc = this.parent.getObjectDescriptor(desc);
		if (this.name) { desc.event = this.name; }
		if (this.type) { desc.type = this.type; }
		if (this.appli) { desc.appli = this.appli; }
		if (this.page) { desc.page = this.page; }
		if (this.appliName) { desc.appliName = this.appliName; }
		if (this.pageName) { desc.pageName = this.pageName; }
		if (this.itemName) { desc.itemName = this.itemName; }
		if (this.appliInst >= 0) { desc.appliInst = this.appliInst; }
		if (this.pageInst >= 0) { desc.pageInst = this.pageInst; }
		if (this.itemInst >= 0) { desc.itemInst = this.itemInst; }
		if (this.itemIndex >= 0) { desc.itemIndex = this.itemIndex; }
		if (this.itemOccurs) { desc.itemOccurs = this.itemOccurs; }
		if (this.index) { desc.index = this.index; }
		return desc;
	};
	
	/**
	* Sets a permanent or single handler to listen to a given event
	* @description
	* __Ex.:__
<code javascript>
LinkedIn.events.START.on(function(ev) {...});
</code>
  * @method notify
	* @path ctx.event.notify
	* @throws {Error}
  * @param {ctx.event} event event object to be notified
  * @param {*} [data] event data
  * @param {number|string} [timer] timer value (ms)
  * @param {string} [appliInst] appli instance
  * @param {string} [method] optional method name : 'Send' for a synchronous call
  * @param {string} [itemName] item name
  * @return returns result
	*/
	this.notify = function (event, data, timer, appliInst, method, itemName) {
		if (this.appli && (typeof this.appli.notify === 'function')) {
			var reqEvent = this;
			return this.appli.notify(event, data, timer, appliInst, method, itemName, reqEvent);
		}
		return '';
	};

	/**
	* Sets a permanent or single handler to listen to a given event
	* @description
	* __Ex.:__
<code javascript>
LinkedIn.events.START.on(function(ev) {...});
</code>
	* @method on
	* @path ctx.event.on
	* @param {function(ctx.event)} func callback to be called on event reception
	* @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
	* @param {Object} [context] context object to be called with the callback
	* @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	* @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
	*/
	this.on = function (func, immediateCondition, context, single, delay, noStepReset) {
		return ctx.on(this, func, immediateCondition, context, single, delay, noStepReset);
	};

	/**
	* Sets a single handler to listen to a given event
	* @description
	* __Ex.:__
<code javascript>
LinkedIn.events.START.once(function(ev) {...});
</code>
	* @method once
	* @path ctx.event.once
	* @param {function(ctx.event)} func callback to be called on event reception
	* @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
	* @param {Object} [context] context object to be called with the callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	* @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
	*/
	this.once = function (func, immediateCondition, context, delay, noStepReset) {
		return ctx.on(this, func, immediateCondition, context, true, delay, noStepReset);
	};

	/**
  * Sends an event back to the source application or page
	* @description
  * __Ex.:__
<code javascript>
// *** source application ***
// send a functional event to 'MyAppli' application
var obj = { name: 'Smith', firstname: 'John' };
MyAppli.notify(MyAppli.events.evSetId, obj);
});

// *** destination application ***
// handles the event on 'MyAppli' application
MyAppli.on({evSetId: function(ev) {
// handle input data
var data = ev.data;
... = data.name;
...
// add output data
data.result = ...
// send answer to the source application
ev.reply();
}});

// *** source application ***
// handles the answer event on 'MyAppli' application
MyAppli.on({evSetId: function(ev) {
// handle answer here...
var data = ev.data;
... = data.result;
}});
</code>
  * @method reply
  * @path ctx.event.reply
	* @param {Object} [data] optional data values
	* @param {ctx.event} [newEvent] optional event to send to		
  * @return {string} result value
  */
	this.reply = function (data, newEvent) {
    var desc = this.getObjectDescriptor();
		if (data) { 
      if (typeof this.data !== 'object') {
				this.data = {};
			}
			ctx.set(data, this.data); 
		}
    var reqEvent = (newEvent && newEvent.name ? newEvent.name : (this.reqEventName ? this.reqEventName : this.name ));
    var reqAppliName = (newEvent && newEvent.appliName ? newEvent.appliName : (this.reqAppliName ? this.reqAppliName : this.appliName ));
    var reqAppliInst = (newEvent && newEvent.reqAppliInst >= 0 ? newEvent.reqAppliInst : (this.reqAppliInst >= 0 ? this.reqAppliInst : this.appliInst ));
    // anti-loop checking
    if ((reqEvent == this.name) && (reqAppliName == this.appliName) && ((this.reqAppliInst == -1) || (this.reqAppliInst == this.appliInst))) {
      return '';
    }
    return ctx.verbExec(desc, 'reply', 'NOTIFY', {
      Event: reqEvent,
      Appli: reqAppliName,
      InstanceAppli: ((reqAppliInst == -1) ? undefined : reqAppliInst),
      Data: ctx.serialize(this.data, false, true),
			EventResp: this.name
    });
	}
	/**
	* Serializes an event content
	* @description
	* __Ex.:__
<code javascript>
var txt = ev.serialize();
</code>
	* @method serialize
	* @path ctx.event.serialize
	* @param {boolean} [doEscape] if 'true', escapes all control characters ("\b" -> "\\b", "\"" -> "\\\"", "\\" -> "\\\\", ...)
	* @param {boolean} [addPrefix] if 'true' and 'data' is an object, adds a prefix to automate unserialisation
	* @return {string} serialized value
	*/
	this.serialize = function (doEscape, addPrefix) {
		//var ev = ctx.clone(this);
		// make a shallow copy of the event, remove objects with circular references
		var ev = {};
		for (var id in this) {
			if (!((id == 'parent') || (id == 'appli') || (id == 'page')))
      	ev[id] = this[id];
		}
		return ctx.serialize(this, doEscape, addPrefix);
	};
	
  /**
  * Merges an object in the given event
	* @description
	* __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method set
	* @path ctx.event.set
  * @param {Object} obj object to be merged
  */
	this.set = function (obj) {
		return ctx.set(obj, this);
	}

	/**
	* Sets a 'SETPENDING' action
	* @description
	* __Ex.:__
<code javascript>
MyHllApiAppli.on({ evLogin: function(ev) {
if (MyHllApiAppli.nbInst == 1)  {
  // only virtual instance exists : connect session to create a real instance
  MyHllApiAppli.PAGELOAD.connectPS(MyHllApiAppli.data.session);
  MyHllApiAppli.data.isHllConnected = true;
  ev.setpending();
} else {
  // *** real instance ***
  // start scenario
  MyHllApiAppli.scenarios.scLogin.start();
}
}});
</code>
	* @method setpending
	* @path ctx.event.setpending
	* @return {string} action result
	*/
	this.setpending = function () {
		var desc = this.getObjectDescriptor();
		return ctx.verbExec(desc, 'setpending', 'SETPENDING', {
			Event : this.name,
			Data : ctx.serialize(this.data, false, true),
			Item : this.itemName,
			ReqAppli : this.reqAppliName,
			ReqIdInstanceAppli : this.reqAppliInst,
			EventResp : this.reqEventName,
			ItemResp : this.reqItemName
		});
	}
};

/**
* Class used to manage promise objects
* @description
* __Ex.:__
<code javascript>
var promise = ctx.promise('pClose');
</code>
* @class ctx.promise
* @path ctx.promise
* @param {function(*)} resolver function
* @param {String} [label] optional string for labeling the promise.
* @return {ctx.promiseClass} promise object
*/
ctx.promise = function (resolver, label) {
	return new ctx.promiseClass(resolver); // create new
};

/**
* Class used to implement promise objects
* @description
* __Ex.:__
<code javascript>
</code>
* @class ctx.promiseClass
* @path ctx.promiseClass
* @constructor
* @advanced
* @param {function(*)} resolver function
* @param {String} [label] optional string for labeling the promise.
*/
ctx.promiseClass = function (resolver, label) {
	var _promise = this;
  var _id = ctx.objectIndex ++;
  var _label = label;
  var _state = undefined; // FULFILLED || REJECTED || 
  var _result = undefined;
  var _subscribers = [];
	var _catch = null;
	
	_subscribers.push( {
		done: resolver,
		fail: undefined,
		label: label
	} );
	//_subscribers.push(resolver);
	
	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method all
	* @path ctx.promiseClass.all
	* @advanced
	* @param {Array<ctx.promiseClass>} entries array of promises
	* @param {String} [label] optional string for labeling the promise.
	* @return {ctx.promiseClass} promise object
  */
  this.all = function (entries, label) {
    //return new Enumerator(this, entries, true /* abort on reject */, label).promise;
    return _promise;
  }

	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method catch
	* @path ctx.promiseClass.catch
	* @advanced
	* @param {function(*)|undefined} onRejection rejection function
	* @param {String} [label] optional string for labeling the promise.
	* @return {ctx.promiseClass} promise object
  */
  this['catch'] = function (onRejection, label) {
    return _promise.then(undefined, onRejection, label);
//		_catch = func;
//    return this;
  }
	
	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method finally
	* @path ctx.promiseClass.finally
	* @advanced
	* @param {function(*)} callback callback function
	* @param {String} [label] optional string for labeling the promise.
	* @return {ctx.promiseClass} promise object
  */
  this['finally'] = function (callback, label) {
    var constructor = _promise.constructor;
    return _promise.then(function(value) {
			var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
      return constructor.resolve(callback(lastEvent)).then(function(){
        return value;
      });
    }, function(reason) {
			var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
      return constructor.resolve(callback(lastEvent)).then(function(){
        throw reason;
      });
    }, label);
  }
	
	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method reject
	* @path ctx.promiseClass.reject
	* @advanced
	* @static
	* @param {*} reason value that the returned promise will be rejected with.
	* @param {String} [label] optional string for identifying the returned promise.
	* @return {ctx.promiseClass} promise object
  */
  this.reject = function (reason, label) {
		return _promise;
  }

	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method resolve
	* @path ctx.promiseClass.resolve
	* @advanced
	* @param {*} value result value
	* @return {ctx.promiseClass} promise object
  */
  this.resolve = function (value) {
		var obj = _subscribers.shift();
		if (obj && obj.done) {
			var oldPromise = ctx.currentPromise;
			var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
			ctx.currentPromise = _promise;
			var context;
			if (this != _promise) { context = this; }
			if ((!context) && ctx.currentSubscription) { context = ctx.currentSubscription.context; }
			if ((!context) && lastEvent) {
				if (lastEvent.page) {
					context = lastEvent.page;
				} else if (lastEvent.appli) {
					context = lastEvent.appli;
				}
			}
			obj.done.apply(context, [value])
			ctx.currentPromise = oldPromise;
		}
		return _promise;
  }

	/**
  * 
	* @description
	* __Ex.:__
<code javascript>
</code>
  * @method then
	* @path ctx.promiseClass.then
	* @advanced
	* @param {function(*)|undefined} onFulfillment fulfill function
	* @param {function(*)} [onRejection] reject function
	* @param {String} [label] optional string for labeling the promise
	* @return {ctx.promiseClass} promise object
  */
  this.then = function (onFulfillment, onRejection, label) {
		_subscribers.push( {
			done: onFulfillment,
			fail: onRejection,
			label: label
		} );
    return _promise;
  }
	
	// differed start
	ctx.pendingFunctions.push(function () { 
		var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
		_promise.resolve(lastEvent);
	});
	
	return _promise;
}

	/** [internal use]
	* Amplify Core 1.1.2
	*
	* Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
	* Dual licensed under the MIT or GPL licenses.
	* http://appendto.com/open-source-licenses
	*
	* http://amplifyjs.com
	* @ignore
	* @class ctx.amplify
	* @path ctx.amplify
	* @throws {Error}
	* @constructor
	*/
	ctx.amplify = (function () {
		var self = 
		/** @lends ctx.amplify */
		{
			/** [internal use]
			* Publishes a subscribed event
			* @ignore
			* @method publish
			* @path ctx.amplify.publish
			* @param {string} topic
			* @param {ctx.event} event
			* @return {number} the number of subscriptions for this event
			*/
			publish : function (topic, event) {
				if (typeof topic !== "string") {
					throw new Error(e.error.InvalidArgument, "You must provide a valid topic to publish.");
				}

				var args = [],
				topicSubscriptions,
				sub,
				length,
				i = 0,
				nbSubs = 0,
				ret;

				var subs = ctx.subscriptions;
				if (!ctx.subscriptions[topic]) {
					return 0;
				}

				topicSubscriptions = ctx.subscriptions[topic].slice();
				//var bAllSubsAreSingle = true;
				for (length = topicSubscriptions.length; i < length; i++) {
					sub = topicSubscriptions[i];
					var oldSub = ctx.currentSubscription;
					ctx.currentSubscription = sub;
					//args = slice.call(arguments, 1);
					// copy current event as first argument for the callback
					args.push(event.copy());
					// add optional arguments for the callback
					if (sub.argument)
						args.push(sub.argument);
					var context = sub.context;
					if (!context) {
						if (event.page) {
							context = event.page;
						} else if (event.appli) {
							context = event.appli;
						}
					}

					if (sub.active) {
						ctx.currentStep = sub.step;

						ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'run', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
						if (sub.single) {
							// trigger a single time : disable subscription
							sub.active = false
							//this.unsubscribe(topic, sub.context, sub.callback, true); 
						}	
						//	ctx.subscriptions[topic].splice(i, 1);
						//} else {
						//	bAllSubsAreSingle = false;
						//}
						
						// 25092015 experimental !! : make systematic asynchronous calls --> cancelled
						//sub.delay = sub.delay || 1;
						
						if (sub.delay) {
							// call after delay
							var timerIndex = ctx.objectIndex++;
							// PLO - Nomme le Timer pour clarifier au niveau du Debugger
							var strTimeoutName = 'delay(' + sub.delay + ')' ;
							ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
							var timerId = setTimeout(function(sub, context, args) { return function() {
								ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
								sub.timerId = 0;
								var oldSub = ctx.currentSubscription;
								var oldParentId = ctx.currentParentId;
								ctx.currentSubscription = sub;
								if (sub.step && sub.step.callFunction)
								{
									var oldStep = ctx.currentStep;
									ctx.currentStep = sub.step;
									ctx.currentParentId = sub.id;
									// call the function in the context of the step
									ret = sub.step.callFunction(sub.callback, context, args);
									ctx.currentStep = oldStep;
								} else {
									// call without step context
									ret = sub.callback.apply(context, args);
								}
								ctx.currentSubscription = oldSub;
								ctx.currentParentId = oldParentId;
								ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
							}; }(sub, context, args), sub.delay);
							if (sub.step)
							{
								sub.step.timers[timerIndex] = timerId;
							} else {
								sub.timerId = timerId;
							}
						} else {
							// call immediatly
							var oldParentId = ctx.currentParentId;
							ctx.currentParentId = sub.id;
							if (sub.step && sub.step.callFunction)
							{
								// call the function in the context of the step
								ret = sub.step.callFunction(sub.callback, context, args);
							} else {
								// call without step context
								ret = sub.callback.apply(context, args);
							}
							ctx.currentParentId = oldParentId;
						}						
					}

					if (sub.single) {
						// trigger a single time : remove subscription
						this.unsubscribe(topic, sub.context, sub.callback); 
						//ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
					}	else {
						// permanent triggering : put it in 'set' state (if still active)
						if (sub.active) {
							ctx.notifyState('on', topic, sub.id, 'set', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));																					
						}
					}
					//ctx.currentStep = null;
					ctx.currentSubscription = oldSub;
					if (ret === false) {
						break; // cancel loop
					}
					nbSubs ++;
				}
				return nbSubs;
			},

			/** [internal use]
			* Registers a new event subscription
			* @ignore
			* @method subscribe
			* @path ctx.amplify.subscribe
			* @throws {Error}
			* @param {string} topic
			* @param {Object|function(ctx.event)} context or callback
			* @param {function(ctx.event)|Object|string|number} [callback] callback or priority
			* @param {number|string} [priority]
			* @param {*} [argument]
			* @param {boolean} [single]
			* @param {ctx.stepClass} [step]
		  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
			* @return {*} func
			*/
			subscribe : function (topic, context, callback, priority, argument, single, step, delay) {
				if (typeof topic !== "string") {
					throw new Error(e.error.InvalidArgument, "You must provide a valid topic to create a subscription.");
				}

				if (arguments.length === 3 && typeof callback === "number") {
					priority = callback;
					callback = context;
					context = null;
				} else if (arguments.length === 2) {
					callback = context;
					context = null;
				}
				priority = priority || 10;

				var topicIndex = 0,
				topics = topic.split(/\s/),
				topicLength = topics.length,
				added;
				for (; topicIndex < topicLength; topicIndex++) {
					topic = topics[topicIndex];
					added = false;
					if (!ctx.subscriptions[topic]) {
						ctx.subscriptions[topic] = [];
					}

					var i = ctx.subscriptions[topic].length - 1,
					sub,
					subscriptionInfo = {
						name : topic,
						id : ctx.objectIndex++,
						active : true,
						callback : callback,
						context : context,
						priority : priority,
						single : single,
						argument : argument,
						step : step,
						timerId : 0,
						delay : delay
					};

					for (; i >= 0; i--) {
						sub = ctx.subscriptions[topic][i];
						if ((sub.callback.toString() === subscriptionInfo.callback.toString()) && (sub.context == subscriptionInfo.context) && (((sub.step && subscriptionInfo.step) ? (sub.step.id == subscriptionInfo.step.id) : true)))
						{
							// don't add several times the same topic/callback/context/step
							added = true;
							break;
						}
						if (sub.priority <= priority) {
							ctx.subscriptions[topic].splice(i + 1, 0, subscriptionInfo);
							added = true;
							break;
						}
					}

					if (!added) {
						ctx.subscriptions[topic].unshift(subscriptionInfo);
						ctx.notifyState((single ? 'once' : 'on'), topic, subscriptionInfo.id, 'set', '', (step ? step.name : ''), (step ? step.id : ''));								
					}
				}

				return callback;
			},

			/** [internal use]
			* Unregisters an existing event subscription
			* @method unsubscribe
			* @path ctx.amplify.unsubscribe
			* @throws {Error}
			* @ignore
			* @param {string} topic
			* @param {Object|function(ctx.event)} context context or callback
			* @param {function(ctx.event)|Object} [callback]
			* @param {boolean} [noNotify]
			* @return {boolean} result true | false
			*/
			unsubscribe : function (topic, context, callback, noNotify) {
				if (typeof topic !== "string") {
					throw new Error(e.error.InvalidArgument, "You must provide a valid topic to remove a subscription.");
				}

				if (arguments.length === 2) {
					callback = context;
					context = null;
				}

				if (!ctx.subscriptions[topic]) {
					return false;
				}

				var length = ctx.subscriptions[topic].length;
				for (var i = 0; i < length; i++) {
					var sub = ctx.subscriptions[topic][i];
					if (sub.callback === callback) {
						if (!context || sub.context === context) {
							// Adjust counter and length for removed item
							if (sub.timerId) { clearTimeout(sub.timerId); sub.timerId = 0; }
							sub.active = false;
							ctx.subscriptions[topic].splice(i, 1);
							i--;
							length--;
							if (!noNotify) { ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : '')); }
						}
					}
				}
				if (ctx.subscriptions[topic].length === 0 ) {
					delete ctx.subscriptions[topic];
				}
				return true;
			},
			/** [internal use]
			* Unregisters all existing event subscriptions relative to a given step
			* @method unsubscribeStep
			* @path ctx.amplify.unsubscribeStep
			* @ignore
			* @param {ctx.stepClass} step step to unregister
			* @return {boolean} result true | false
			*/
			unsubscribeStep : function (step) {
				if (!step) {
					return false;
				}
				// clear the active timers launched inside the step
				for (var index in step.timers) {
					if (step.timers[index]) { 
						clearTimeout(step.timers[index]);
						delete step.timers[index]; 
						ctx.notifyState('once', 'timer' + index, parseInt(index, 10), 'reset', '', (step ? step.name : ''), (step ? step.id : -1));								
					}
				}
				for (var topic in ctx.subscriptions) { 
					var length = ctx.subscriptions[topic].length;
					for (var i = 0; i < length; i++) {
						var sub = ctx.subscriptions[topic][i];
						if (sub && (sub.step === step)) {
							// Adjust counter and length for removed item
							if (sub.timerId) { 
								clearTimeout(sub.timerId); 
								sub.timerId = 0; 
							}
							sub.active = false;
							ctx.subscriptions[topic].splice(i, 1);
							i--;
							length--;
							ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));								
						}
					}
					if (ctx.subscriptions[topic].length === 0 ) {
						delete ctx.subscriptions[topic];
					}
				};
				return true;
			}
		}
		return self;
	}());

/** Project options and settings
* @path ctx.options 
* @class ctx.options 
* @description
* ''ctx.options'' contains the options for the SDK :
*   * a set of data pre-filled by Interactive at startup: versions, project, user, machine, ...
*/
ctx.options = {

	/** Auto-test mode
	* @property {boolean} autoTest 
	* @path ctx.options.autoTest */ autoTest : false,
		
	/** Break on exception
	* @property {boolean} breakException 
	* @path ctx.options.breakException */ breakException : false,
		
	/** User canonical name
	* @property {string} canonicalName
	* @readonly
	* @path ctx.options.canonicalName */ 	canonicalName : '',
		
	/** Machine name
	* @property {string} computerName
	* @readonly
	* @path ctx.options.computerName */ computerName : '',
	
	/** Folder containing log and work files
	* @property {string} currentDir
	* @readonly
	* @path ctx.options.currentDir */ currentDir : '',
	
	/** Folder containing project files
	* @path ctx.options.currentURL 
	* @readonly
	* @property {string} currentURL */ currentURL : '',
	
	/** Demo mode enabled/disabled
	* @property {boolean} demoMode
	* @path ctx.options.demoMode */ demoMode: false,
	
	/** timer duration (ms) for demo mode
	* @property {number} demoTimer
	* @path ctx.options.demoTimer */ demoTimer: 0,
	
	/** User display name
	* @property {string} displayName
	* @readonly
	* @path ctx.options.displayName */ 	displayName : '',
		
	/** Project environment (development, qualification, production, ...)
	* @path ctx.options.env 
	* @property {string} env */ env : e.env.prod,
	
	/** Folder containing Interactive binaries
	* @property {string} execDir
	* @readonly
	* @path ctx.options.execDir */ execDir : '',
	
	/** Language framework version
	* @property {string} frameworkVersion
	* @readonly
	* @path ctx.options.frameworkVersion */ frameworkVersion: '',
	
	/** User full login (including dommain)
	* @property {string} fullUserName
	* @readonly
	* @path ctx.options.fullUserName */ fullUserName : '',
		
	/** User qualified domain name
	* @property {string} fullyQualifiedDN
	* @readonly
	* @path ctx.options.fullyQualifiedDN */ 	fullyQualifiedDN : '',
	
	/** highlight color
	* @property {number} highlightColor
	* @path ctx.options.highlightColor */ highlightColor: ctx.rgb(0xff, 0, 0), // red

	/** Debug mode enabled
	* @path ctx.options.isDebug
	* @property {boolean} isDebug */ isDebug : false,
		
	/** JScript engine version
	* @property {Object} JScriptVersion
	* @readonly
	* @path ctx.options.JScriptVersion */ JScriptVersion: '',	
	
	/** options from command line
	* @property {Object} optionFiles
	* @readonly
	* @path ctx.options.optionFiles */ optionFiles: [],
	
	/** Product version
	* @property {string} productVersion
	* @readonly
	* @path ctx.options.productVersion */ productVersion : '',
	
	/** Array of component versions
	* @property {Object} productVersions
	* @readonly
	* @path ctx.options.productVersions */ productVersions: [],

	/** Client name
	* @property {string} projectClient
	* @readonly
	* @path ctx.options.projectClient */ projectClient : '',
	
	/** Project free comment
	* @property {string} projectComment
	* @readonly
	* @path ctx.options.projectComment */ projectComment : '',
	
	/** Project date
	* @property {string} projectDate
	* @readonly
	* @path ctx.options.projectDate */ projectDate : '',
	
	/** Project icon
	* @property {string} projectIcon
	* @path ctx.options.projectIcon */ projectIcon : '',
	
	/** Project description
	* @property {string} projectLabel
	* @readonly
	* @path ctx.options.projectLabel */ projectLabel : '',
	
	/** Project name
	* @property {string} projectName
	* @readonly
	* @path ctx.options.projectName */ projectName : '',
	
	/** Project version
	* @property {string} projectVersion
	* @readonly
	* @path ctx.options.projectVersion */ projectVersion : '',
	
	/** Folder containing resource files (bitmaps, ...)
	* @property {string} resourceURL
	* @readonly
	* @path ctx.options.resourceURL */ resourceURL : '',
	
	/** Folder containing server project files
	* @property {string} serverURL
	* @readonly
	* @path ctx.options.serverURL */ serverURL : '',
	
	/** simulation mode
	* @property {boolean} simulationMode
	* @path ctx.options.simulationMode */ simulationMode: false,
		
	/** Scenario timeouts disabled (for debugging purpose)
	* @path ctx.options.timeoutDisabled
	* @property {boolean} timeoutDisabled */ timeoutDisabled : false,
	
	/** Display a confirmation popup before restarting when a project update is available
	* @path ctx.options.updateConfirmation
	* @property {boolean} updateConfirmation */ updateConfirmation : true,
			
	trace : {
	  /** 
		* @path ctx.options.trace.actions
		* @property {boolean} trace.actions */ actions : false, 

		/** 
		* @path ctx.options.trace.actionsFull
		* @property {boolean} trace.actionsFull */ actionsFull : false,
	  
		/** 
		* @path ctx.options.trace.advanced
		* @property {boolean} trace.advanced */ advanced : false,			 	
	  
	  /** 
		* @path ctx.options.trace.alternativeTraceFile
		* @ignore
		* @property {string} trace.alternativeTraceFile */ alternativeTraceFile : '', 

	  /** 
		* @path ctx.options.trace.autoRecording
		* @property {boolean} trace.autoRecording */ autoRecording : false, 

	  /** 
		* @path ctx.options.trace.autoRecordingCode
		* @ignore
		* @property {e.error} trace.autoRecordingCode */ autoRecordingCode : e.error.OK, 

	  /** 
		* @path ctx.options.trace.autoRecordingStarted
		* @ignore
		* @property {boolean} trace.autoRecordingStarted */ autoRecordingStarted : false, 

		/** 
		* @path ctx.options.trace.context
		* @property {boolean} trace.context */ context : false,  
	  
		/** 
		* @path ctx.options.trace.debuggerV2
		* @property {boolean} trace.debuggerV2 */ debuggerV2 : false, 
	  
		/** 
		* @path ctx.options.trace.errors
		* @property {boolean} trace.errors */ errors : false, 
	  
		/** 
		* @path ctx.options.trace.events
		* @property {boolean} trace.events */ events : false, 

		/** 
		* @path ctx.options.trace.extendPilots
		* @property {boolean} trace.extendPilots */ extendPilots : false, 
	  
		/** 
		* @path ctx.options.trace.frameworkNotify
		* @property {boolean} trace.frameworkNotify */ frameworkNotify : false,			 	
		
		/** 
		* @path ctx.options.trace.frameworkTraces
		* @property {boolean} trace.frameworkTraces */ frameworkTraces : false,			 	
	  
		/** 
		* @path ctx.options.trace.messageBoxes
		* @property {boolean} trace.messageBoxes */ messageBoxes : false, 
	  
		/** 
		* @path ctx.options.trace.objects
		* @property {boolean} trace.objects */ objects : false,  
	  
		/** 
		* @path ctx.options.trace.screenshotTraces
		* @property {boolean} trace.screenshotTraces */ screenshotTraces : false,
			
		/** 
		* @path ctx.options.trace.windowsEvents
		* @property {boolean} trace.windowsEvents */ windowsEvents : false
	},

//	/** trace Archive
//	* @property {boolean} traceArchive
//	* @path ctx.options.traceArchive */ traceArchive: {
	traceArchive: {
		/** max archive duration (number of days)
		* @property {boolean} traceArchive.maxDuration
		* @path ctx.options.traceArchive.maxDuration */	maxDuration: 5, // 5 days max
		
		/** max archive count (number of folder or ZIP files)
		* @property {boolean} traceArchive.maxCount
		* @path ctx.options.traceArchive.maxCount */ maxCount: 10 // 10 archives max
	},
	
	/** Folder containing traces
	* @property {string} traceFolder
	* @path ctx.options.traceFolder */ traceFolder : '',
	
	/** Folder containing traces for recording
	* @property {string} traceFolder
	* @path ctx.options.traceFolder */ traceFolderRecording : '',
	
	/** Trace level (global trace level for the framework)
	* @property {e.trace.level} traceLevel
	* @path ctx.options.traceLevel */ traceLevel: e.trace.level.None,

	/** Timestamp of the trace folder creation
	* @property {string} traceTimestamp
	* @path ctx.options.traceTimestamp */ traceTimestamp : '',
	
	/** User login
	* @property {string} userName
	* @path ctx.options.userName */ userName : ''
	
};
/** 
* __Ex.:__
*
<code javascript>
ctx.options :
{
  // pre-defined data
  currentURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\bin",
  currentDir: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\log",
  serverURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\server",
  resourceURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\bin",
  execDir: "C:\\Program Files (x86)\\Contextor\\Interactive\\",
  frameworkVersion: "3.0.17",
  productVersion: "3.0.5.3",
  projectVersion: "1.12",
  projectClient: "R and D",
  projectName: "demoLanguageV3",
  projectDate: "26/05/2015",
  projectLabel: "Language v3 Demo",
  projectComment: "Provides a set of demonstration cases based on language v3",
  traces {
    ...
  }
  ...
}
</code>
*
*/

/**
 * Module for resource management
 * @class ctx.resources
 * @path ctx.resources
 * @constructor
 */
ctx.resources = (function() {
	//var _dom = undefined;
	var _map = [];
	var _dom = undefined;
	var self = 
	/** @lends ctx.resources */
	{
		/** \\
		* ===== Methods =====
		*/

		/**
		* Clears the content of the clipboard 
		* @description
		* __Ex.:__
<code javascript>
ctx.resources.clear();
</code>
		* @method clear
		* @ignore
	  * @path ctx.resources.clear
		*/
		clear : function(type) {
			for (var id in self.data) {
			}
		},

		/**
		* Loads an Html file
		* @description
		* __Ex.:__
<code javascript>
</code>
		* @method loadHtml
	  * @path ctx.resources.loadHtml
		* @param {string} path object describing the parameters
		* @return {string}
		*/
		loadHtml: function(path) {
			var htmlCode = ctx.fso.file.read(path);
		  htmlCode = htmlCode.replace(/[\n\t\r]/gi, '');

			var posEnd = -1;
			var posBeg = -1;
			var loop = true;
			var image = '';
			var code;
			while (loop) {
				image = '';
				posEnd = htmlCode.indexOf('.png"', posEnd);
				if (posEnd > 0) {
					posBeg = htmlCode.lastIndexOf('"', posEnd);
					if (posBeg > 0) {
						image = htmlCode.substring(posBeg + 1, posEnd + 4);
						image = self.loadImageAsBase64(image);
						code = htmlCode;
						htmlCode = code.substring(0, posBeg + 1) + image + code.substring(posEnd + 3);
						posEnd += 5;
					}
				} else {
					loop = false;
				}
			}
			return htmlCode;
		},

		/**
		* Loads an image file
		* @description
		* __Ex.:__
<code javascript>
</code>
		* @method loadImageAsBase64
	  * @path ctx.resources.loadImageAsBase64
		* @param {string} filePath image filename
		* @param {string} [rootPath] optional root path (if filePath is a relative path)
		* @return {string}
		*/
		loadImageAsBase64: function (filePath, rootPath) {
			var filename = filePath;
		  if (filePath && (!ctx.isPathAbsolute(filePath))) {
				if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
					filename = '\\' + filename;
				rootPath = rootPath || ctx.options.resourceURL;
				filename = rootPath + filename;
			}
			try {
				var bytes = ctx.fso.file.read(filename, e.file.encoding.Binary);
			  //_dom = _dom || new ActiveXObject('Microsoft.XMLDOM');
			  var _dom = new ActiveXObject('Microsoft.XMLDOM');
			  var elem = _dom.createElement('tmpCtxt');
			  elem.dataType = 'bin.base64';
			  elem.nodeTypedValue = bytes;
			  var res = 'data:image/png;base64,' + elem.text.replace(/[^A-Z\d+=\/]/gi, '');
				return res;
			} catch (ex) {	
				ctx.log('ctx.resources.loadImageAsBase64: could not load \'' + filePath + '\'', e.logIconType.Warning);
			}
			return filePath;
		}
	};
	return self;
})();


	/**
	* Function used to implement page and item actions
	* @description
	* __Ex.:__
	* <code javascript>
	* return ctx.action(desc, 'set', 'SETVALUE', 'John');
	* </code>
	* @method action
  * @path ctx.action
	* @throws {Error}
	* @ignore
	* @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @param {string} name action name
	* @param {string} language framework language verb
	* @param {string|number|Object} [data] parameter(s) associated with the object
	* @param {string} [prefix] optional prefix used to qualify action
	* @param {string} [minVersion] minimum engine version required for the action
	* @return {string} result value
	* @suppress {es5Strict } warning 'arguments.callee'
	*/
	ctx.action = function (desc, language, name, data, prefix, minVersion) {
		var res = '';
		var params = '';
		if (ctx.engineStarted) {
			data = ctx.serialize(data, false, false);
			prefix = prefix || '';
			var itemName = (prefix ? prefix + desc.itemFullName : desc.itemFullName) || '';
			try {
				params = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments, 0) : undefined);
				try {
					if (ctx.options.demoTimer > 0) {
						if (desc.item && desc.item.highlight) {
							// demo mode : highlight item with a synchronous tempo
							desc.item.highlight(ctx.options.demoTimer, true, false);
						} else if (desc.page && desc.page.highlight) {
							// demo mode : highlight page with a synchronous tempo
							desc.page.highlight(ctx.options.demoTimer, true, false);
						}
					}
				} catch (ex) { }
				if (minVersion && ctx.compareVersion(minVersion) < 0) {
					ctx.notifyAction(language, res, desc, name, params);
					ctx.log(desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': requires minimum version ' + minVersion, e.logIconType.Warning);						
					return res;
				}
				if (desc.appliInst < 0) {
					ctx.log(desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': there is no running instance', e.logIconType.Warning);						
				}
				if (ctx.actionFunction[desc.nature])
					res = ctx.actionFunction[desc.nature](name, desc.appliName, desc.pageName, itemName, 0, data, desc.appliInst, desc.pageInst, desc.itemInst);
				else
					res =  ctx.wkMng.CtxtAction(name, desc.appliName, desc.pageName, itemName, 0, data, desc.appliInst, desc.pageInst, desc.itemInst);
				ctx.notifyAction(language, res, desc, name, params);
				if ((!language) || (!name)) {
					throw new Error(e.error.Fail, "ctx.action : action undefined" );
				}
			} catch (ex) {
				ctx.notifyAction(language, res, desc, name, params);
				throw new Error(e.error.Fail, desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': ' + ex.message );
			}
		}
		return res;
	};
	
	/**
	* Function used to implement page and item actions
	* @description
	* __Ex.:__
<code javascript>
return ctx.actionApp(desc, 'SETTEXT', 'The title');
</code>
	* @method actionApp
	* @ignore
  * @path ctx.actionApp
	* @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @param {string} language framework language verb
	* @param {string} name action name
	* @param {string|number|Object} [P1] parameter 1
	* @param {string|number|Object} [P2] parameter 2
	* @param {string|number|Object} [P3] parameter 3
	* @param {string|number|Object} [P4] parameter 4
	* @param {string|number|Object} [P5] parameter 5
	* @param {string} [minVersion] minimum engine version required for the action
	* @return {string} result value
	* @suppress {es5Strict } warning 'arguments.callee'
	*/
	ctx.actionApp = function (desc, language, name, P1, P2, P3, P4, P5, minVersion) {
		var res = '';
		var params = '';
		if (ctx.engineStarted) {
			/** @type {string} */ var sP1 = ctx.serialize(P1, false, false);
			/** @type {string} */ var sP2 = ctx.serialize(P2, false, false);
			/** @type {string} */ var sP3 = ctx.serialize(P3, false, false);
			/** @type {string} */ var sP4 = ctx.serialize(P4, false, false);
			/** @type {string} */ var sP5 = ctx.serialize(P5, false, false);
			try {
				params = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments, 0) : undefined);
				try {
					if ((ctx.options.demoTimer > 0) && (name != 'GETRECT')) {
						if (desc.item && desc.item.highlight) {
							// demo mode : highlight item with a synchronous tempo
							desc.item.highlight(ctx.options.demoTimer, true, false);
						} else if (desc.page && desc.page.highlight) {
							// demo mode : highlight page with a synchronous tempo
							desc.page.highlight(ctx.options.demoTimer, true, false);
						}
					}
				} catch (ex) { }
				if (minVersion && ctx.compareVersion(minVersion) < 0) {
					ctx.notifyAction(language, res, desc, name, params);
					ctx.log(desc.appliName + '.' + desc.pageName + '.' + language + ': requires minimum version ' + minVersion, e.logIconType.Warning);						
					return res;
				}
				if (desc.appliInst < 0) {
					ctx.log(desc.appliName + '.' + desc.pageName + '.' + language + ': there is no running instance', e.logIconType.Warning);						
				}
				if (ctx.actionAppFunction[desc.nature])
					res = ctx.actionAppFunction[desc.nature](name, desc.appliName, desc.pageName, sP1, sP2, sP3, sP4, sP5, desc.appliInst, desc.pageInst, desc.itemInst);
				else
					res = ctx.wkMng.CtxtActionApp(name, desc.appliName, desc.pageName, sP1, sP2, sP3, sP4, sP5, desc.appliInst, desc.pageInst, desc.itemInst);
				if ((!language) || (!name)) {
					throw new Error(e.error.Fail, "ctx.actionApp : action undefined" );
				} else {
					ctx.notifyAction(language, res, desc, name, params);
				}
			} catch (ex) {
				ctx.notifyAction(language, res, desc, name, params);
				throw new Error(e.error.Fail, desc.appliName + '.' + desc.pageName + '.' + language + ': '+ ex.message );
			}
		}
		return res;
	};

	/**
	* Function used to implement global actions
	* @description
	* __Ex.:__
<code javascript>
return ctx.verbExec(desc, 'regHotKey', 'REGHOTKEY', {
  Value: shortcut,
  Proc: event.appliName,
  Event: event.name
});
</code>
	* @method verbExec
  * @path ctx.verbExec
	* @throws {Error}
	* @ignore
	* @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
	* @param {string} name action name
	* @param {string} language framework language verb
	* @param {Object} [params] parameters
	* @param {string} [subcommand]
	* @param {boolean} [pageReset] if true, reset page name and instance (false by default)
	* @param {string} [minVersion] minimum engine version required for the action
	* @return {string} result value
	* @suppress {es5Strict } warning 'arguments.callee'
	*/
	ctx.verbExec = function (desc, language, name, params, subcommand, pageReset, minVersion) {
		desc = desc || ctx.getDescriptor();
		var res = '';
		var params2 = '';
		if (ctx.engineStarted) {
			try {
				params2 = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments, 0) : undefined);
				if ((!language) || (!name)) {
					throw new Error(e.error.Fail, "ctx.verbExec : action undefined" );
				}
				var noAppli = false;
				if (!desc.appliName) {
					noAppli = true;
					GLOBAL.getObjectDescriptor(desc);
				}
				if (minVersion && ctx.compareVersion(minVersion) < 0) {
					ctx.notifyAction(language, res, desc, name, params2);
					ctx.log('ctx.verbExec \'' + language + '\' : requires minimum version ' + minVersion, e.logIconType.Warning);						
					return res;
				}
				var cmd = ctx.getXMLSyntax(name, params, subcommand);
				if (pageReset) {
				  // reset page name before calling 'verbExec' (for instance, 'EXIST' is not a 'page' verb, but an 'application' verb)
					desc.pageName = '';
					desc.pageInst = -1;
				}
				if (desc.appliInst < 0) {
					ctx.log('ctx.verbExec \'' + language + '\' : there is no running instance ', e.logIconType.Warning);						
				}
				res = ctx.wkMng.CtxtVerbExec(cmd, desc.appliName, desc.pageName, desc.appliInst, desc.pageInst);
				if(noAppli) {
					desc.appliName = 'ctx'; 
					desc.appliInst = -1; 
				}
				ctx.notifyAction(language, res, desc, name, params2);
			} catch (ex) {
				ctx.notifyAction(language, res, desc, name, params2);
				throw new Error(e.error.Fail, 'ctx.verbExec \'' + language + '\' : ' + ex.name + ' ' + ex.message );
			}
		}
		return res;
	};

	
// ******************************
// *** Event handler callback ***
// ******************************
/**
* Main entry callback to dispatch events from WkMng
* @method onEvent
* @path ctx.onEvent
* @ignore
* @param {string} appliName 	application or process name
* @param {string} pageName page name
* @param {string} itemName item name
* @param {number} itemIndex item index
* @param {string} event event name
* @param {string} data 
* @param {number} appliInst application or process instance
* @param {number} pageInst page instance
* @param {number} itemInst item instance
* @param {string} reqAppliName source application or process name
* @param {string} reqEventName source event name
* @param {string} reqItemName source item name
* @param {number} reqAppliInst source application or process instance
* @return {boolean} result
*/
ctx.onEvent = function (appliName, pageName, itemName, itemIndex, event, data, appliInst, pageInst, itemInst, reqAppliName, reqEventName, reqItemName, reqAppliInst) {
	var res = false;

	if ((!appliName) && (!event))
		return true; // test at startup to detect framework

	if (event == '_BREAK_EXCEPTION_') {
		ctx.options.breakException = (data == 'Y' ? true : false);
		return true;
	}

	if ((event == 'VERSION') || (event == '_VERSION_')) {
		ctx.updateProductVersion();
		return true;
	}
	
	// correct Expbar2 events which are un-coherent. Ex. : event='EXPBAR2', Page='', Item='evVersion'
	if (pageName === '' && itemName !== '') {
		pageName = event;
		event = itemName;
		itemName = '';
	}
	
	if (itemName) {
		// for occursed item, itemName can be formatted as item[index] : extract name and index
		var posBeg = itemName.indexOf('[');
		if (posBeg > 0)
		{
			var posEnd = itemName.indexOf(']', posBeg);
			if (posEnd > 0)
			{
				itemIndex = parseInt(itemName.substring(posBeg + 1, posEnd), 10); 
				itemName = itemName.substring(0, posBeg); 
			}
		}
	}

	var bRemovePage = false;
	var bUndefinedPage = false;
	var bRemoveApp = false;

	// build real application or page instances when receiving 'START', 'END', 'LOAD', 'UNLOAD'
	switch (event) {
		case e.event.application.START:
		{
			if (ctx.app[appliName]) {
				ctx.app[appliName].cloneApplication(appliInst)
			}
			break;
		}
		case e.event.application.END:
		{
			if (ctx.app[appliName] && ctx.app[appliName][appliInst]) {
				bRemoveApp = true;
			}
			break;
		}
		case e.event.page.LOAD:
		{
			// undeclared page management (eg. : '_Undefined_' for HLLAPI or WEB)
			if (!ctx.app[appliName][pageName]) {
				bUndefinedPage = true;
				ctx.app[appliName].addPage(pageName); 
			}
			// instantiate 'real' instances
			//ctx.app[appliName][pageName].clonePage(ctx.app[appliName], pageInst);
			ctx.app[appliName][pageName].clonePage(ctx.app[appliName][appliInst], -1);
			ctx.app[appliName][pageName].clonePage(ctx.app[appliName][appliInst], pageInst);	
			break;
		}
		case e.event.page.UNLOAD:
		{
			bRemovePage = true;
			break;
		}
	}

	var ev = new ctx.event(event);
	ctx.currentEvent = ev;

	// set current page for this application
	// set current page and application for the event
	ev.page = ev.appli = null;
	var previousCurrentPage = ctx.app[appliName].currentPage;
	var previousCurrentInstPage = (ctx.app[appliName][appliInst] ? ctx.app[appliName][appliInst].currentPage : null);
	if (appliName !== '' && pageName !== '' && ctx.app[appliName]) {
		ctx.app[appliName].currentPage = null;
		if (ctx.app[appliName][appliInst]) { ctx.app[appliName][appliInst].currentPage = null; }
	}

	if ((appliName !== '') && ctx.app[appliName]) {
		ev.appli = ctx.app[appliName][appliInst];
	}

	if ((appliName !== '') && (pageName !== '') && ctx.app[appliName] && ctx.app[appliName][appliInst] && ctx.app[appliName][appliInst][pageName]) {
		ev.page = ctx.app[appliName][appliInst][pageName][pageInst];
		if (bUndefinedPage && (previousCurrentInstPage || previousCurrentPage)) {
			// undefined page received : keep the previously defined current page
			ctx.app[appliName][appliInst].currentPage = previousCurrentInstPage;
			ctx.app[appliName].currentPage = previousCurrentPage;
		} else if (!bRemovePage) {
			ctx.app[appliName][appliInst].currentPage = ev.page;
			ctx.app[appliName].currentPage = ev.page;
		}
	}

	ev.appliName = appliName;
	ev.appliInst = appliInst;
	ev.pageName = pageName;
	ev.pageInst = pageInst;
	ev.itemName = itemName;
	ev.itemInst = itemInst;
	ev.itemIndex = itemIndex;
	ev.index = []; // [index]
	ev.nbInst = (ctx.app[appliName] ? ctx.app[appliName].nbInst : 0);
	ev.name = event;
	ev.data = ctx.unserialize(data);
	ev.reqAppliName = reqAppliName;
	ev.reqAppliInst = reqAppliInst;
	ev.reqEventName = reqEventName;
	ev.reqItemName = reqItemName;
	ev.parent = (ev.page ? ev.page : ev.appli);

	ctx.currentAppli = ev.appli;
	ctx.currentPage = ev.page;
	
	// *** engine started ***
	if ((appliName == GLOBAL.name) && (event == e.event.application.START)) {
		ctx.onEngineStart();
	}

	if (event == '_ERROR') 
	{
		var sav = ctx.options.trace.frameworkNotify ;
		ctx.options.trace.frameworkNotify = true ;
		ctx.notifyError(data, 'Error');
		ctx.options.trace.frameworkNotify = sav ;
	}
	
	// before GLOBAL:START or after GLOBAL:END, don't manage events
	if (!ctx.engineStarted)
		return true;
	
	if (ev.page && (event == e.event.page.LOAD)) {
		// memorize page hWnd, useful for screenshot for example
		ev.getLoadInfos();
	}
	
	if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.frameworkTraces) {
		ctx.notifyEvent(ev);
	}
	
	// if ctx.breakException = true : call event callback without catching exceptions
	if (ctx.options.breakException) {
		res = ctx.onEvent2(ev);
	} else {
		try {
			res = ctx.onEvent2(ev);
		} catch (ex) {
			//var code = ex.number & 0xFFFF;
			//var line = ((ex.number >> 0x10) & 0x1FFF);
			ctx.log(ex, e.logIconType.Error, ex.message );
			return false;
		}
	}

	// if 'UNLOAD' event received, clean up the page instances
	if (bRemovePage) { 
		var pg;
		if (ctx.app[appliName]) {
			ctx.app[appliName].removePage(appliInst, pageName, pageInst);				
		}
	}
	// if 'END' event received, clean up the application instances
	if (bRemoveApp) { 
		if (ctx.app[appliName] && ctx.app[appliName][appliInst]) {
			ctx.app[appliName].removeApplicationInstance(appliInst);
			if (ctx.app[appliName].defaultInst == appliInst) {
				ctx.app[appliName].defaultInst = -1; // the default instance is closed
			}
		}
	}

	// if there are pending callbacks, call them at the end of treatment
	var func = null;
	while ((func= ctx.pendingFunctions.shift()) != null) {
		func.apply();
	}
	
	// keep a copy of last received event
	ctx.lastEvent = ev.copy()

	// reset current event on exit
	ev.clear();
	
	// clear legacy variables
	_Work0_ = '';
	_Work1_ = '';
	_Work2_ = '';
	_Work3_ = '';
	_Work4_ = '';
	_Work5_ = '';
	_Work6_ = '';
	_Work7_ = '';
	_Work8_ = '';
	_Work9_ = '';

	// *** engine stopped ***
	if ((appliName == GLOBAL.name) && (event == e.event.application.END)) {
		ctx.onEngineStop();
	}
	
	return res;
}

/**
 * Sub entry callback to dispatch events from WkMng (without try/catch management)
 * @method onEvent2
 * @path ctx.onEvent2
 * @ignore
 * @param {ctx.event} ev event object
 * @return {boolean} result
 */
ctx.onEvent2 = function (ev) {

	var evName = ev.appliName;
	if (ev.appliName != 'GLOBAL') {
		// publish event for 'GLOBAL' (if it is declared)
		if ((ctx.app['GLOBAL'].events[ev.name] !== undefined) && (!ctx.app['GLOBAL'].events[ev.name].technical)) { ctx.amplify.publish('GLOBAL' + ":" + ev.name, ev); }
		if (ctx.app['GLOBAL'].events[ctx.anyEvent] !== undefined) { ctx.amplify.publish('GLOBAL' + ":" + ctx.anyEvent, ev); }
	}
	// publish event for 'appli' (if it is declared)
	if (ctx.app[ev.appliName].events[ev.name] !== undefined) { ctx.amplify.publish(evName + ":" + ev.name, ev); }
	if (ctx.app[ev.appliName].events[ctx.anyEvent] !== undefined) { ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev); }
	if (ev.pageName && ev.pageName !== '') {
		// publish event for 'appli.page'
		evName += "." + ev.pageName;
		if (ctx.app[ev.appliName][ev.pageName] && ctx.app[ev.appliName][ev.pageName].events && (ctx.app[ev.appliName][ev.pageName].events[ev.name] !== undefined)) { ctx.amplify.publish(evName + ":" + ev.name, ev); }
		if (ctx.app[ev.appliName][ev.pageName] && ctx.app[ev.appliName][ev.pageName].events && (ctx.app[ev.appliName][ev.pageName].events[ctx.anyEvent] !== undefined)) { ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev); }
	}
	if (ev.itemName && ev.itemName !== '') {
		// publish event for 'appli.page.item'
		evName += "." + ev.itemName;
		if (ctx.app[ev.appliName][ev.pageName] && ctx.app[ev.appliName][ev.pageName][ev.itemName] && ctx.app[ev.appliName][ev.pageName][ev.itemName].events && (ctx.app[ev.appliName][ev.pageName][ev.itemName].events[ev.name] !== undefined)) { ctx.amplify.publish(evName + ":" + ev.name, ev); }
		if (ctx.app[ev.appliName][ev.pageName] && ctx.app[ev.appliName][ev.pageName][ev.itemName] && ctx.app[ev.appliName][ev.pageName][ev.itemName].events && (ctx.app[ev.appliName][ev.pageName][ev.itemName].events[ctx.anyEvent] !== undefined)) { ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev); }
	}
	
	return true;
};

/**
* Evaluates a JavaScript expression
* @description
* __Ex.:__
<code javascript>
var txt = ctx.eval( "MyAppli.start();" );
</code>
* @ignore
* @method eval
* @path ctx.eval
* @param {string} expression JavaScript expression to be evaluated
* @return {*} evaluation result (serializedi in JSON if result is an object )
*/
ctx.eval = function ( expression )
{
	try {
		var res = eval ( expression );
		if (typeof res === 'object') {
			if (res && res.ctxShort) { res = res.ctxShort(); }
			res = ctx.serialize(res, false, false, '\t', true);
		}
		return res;
	}
	catch(exc) {
		// "!Error: " prefix to identify errors on Debugger side
		return "!Error: " + exc.description;
	}
}

/** Overload the evaluation fonction
* @path CtxtCompute
* @ignore
*/
CtxtCompute = ctx.eval;

/** Add an alias on the event callback to interface with WkMng
* @ignore
* @path onCtxEvent
*/
var onCtxEvent = ctx.onEvent;

/** node.js emulation
* @ignore
*/
//var module = undefined;
var module = {};
var exports = module.exports = Host;

function require(path) { }

//var modules = null;
//var JSPath = null;

/** requireJS emulation
* @constructor
* @ignore
*/
var defineMod = function(obj) {
	this.amd = {};
};
/** @type {defineMod} */ var define;

// Browser emulation
//ctx.emulateBrowser();

///**@type {Console} */ var console = {
//	/**
//	 * @param {*} data
//	 * @param {...*} var_args
//	 */
//	log: function(data, var_args) {
//		return ctx.log(data, e.logIconType.Info);
//	},
//	/**
//	 * @param {*} data
//	 * @param {...*} var_args
//	 */
//	info: function(data, var_args) {
//		return ctx.log(data, e.logIconType.Info);
//	},
//	/**
//	 * @param {*} data
//	 * @param {...*} var_args
//	 */
//	error: function(data, var_args) {
//		return ctx.log(data, e.logIconType.Error);
//	},
//	/**
//	 * @param {*} data
//	 * @param {...*} var_args
//	 */
//	warn: function(data, var_args) {
//		return ctx.log(data, e.logIconType.Warning);
//	}
//};

