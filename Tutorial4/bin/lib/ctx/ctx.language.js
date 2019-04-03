/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Language Global functions ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
* \\
* This module implements language functions : different global actions provided by Contextor Interactive (not linked to applications, pages, items).
* \\
* \\
* ------
*  ===== Methods =====
* 
*/
	// ******************************
	// *** misc. global functions ***
	// ******************************
	
	
	/**
	* Simulates a mouse click, based on absolute desktop coordinates
	* @description
	* 
  * :!: __History:__ this function requires Contextor Interactive version **3.0.6.3** minimum
	*
	* __Ex.:__
<code javascript>
var x=...;
var y=...;
ctx.click(x, y);
</code>
	* @method click
  * @path ctx.click
	* @deprecated use ctx.mouse.click instead of ctx.click
	* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
	* @param {number} [Y] relative vertical position (compared to desktop top left position)
	* @return {string} result value
	*/
	ctx.click = function (X, Y) {
		var desc = ctx.getDescriptor();
		var x, y;
		if (X instanceof ctx.position) {
			x = X.x + X.cx / 2;
			y = X.y + X.cy / 2;
		} else {
			x = X;
			y = Y;
		}
		return ctx.verbExec(desc, 'ctx.click', 'CLICKMOUSE', {
				X : (x || 0),
				Y : (y || 0)
			}, '', false, '3.0.6.3');
	};

//	/**
//	* Returns a clone (deep copy) of a given object
//	* @description
//	* __Ex.:__
//<code javascript>
//var obj2 = ctx.clone(obj);
//</code>
//	 * @method clone
//	 * @path ctx.clone
//	 * @advanced
//	 * @param {Object} obj object to be cloned
//	 * @return {Object} cloned object
//	 */
//	ctx.clone = function (obj) {
//		ctx.notifyAction('ctx.clone');
//		return ctx.extend(true, {}, obj);
//	};
	
	/**
	* Generic iterator function, used to iterate inside objects or arrays
	* @description
	* __Ex.:__
<code javascript>
ctx.each([ 'val1', 'val2', 'val3' ], function( value, index ) {
  // called successively with [index=0, value='val1'], [index=1, value='val2'], [index=2, value='val3']
});
ctx.each( { name:'Ford', firstname:'John' }, function( value, index ) {
  // called successively with [index='name', value='Ford'], [index='firstname', value='John']
});
</code>
	* @method each
	* @path ctx.each
	* @param {*} obj object to be enumerated
	* @param {function(string, *)} func function to be called for each enumeration. First argument is the key, second argument is the value.
	*/
	ctx.each = function (obj, func) {
		var itemCount = 0;
		var res;
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			//It's an array, loop through it
			for (var i = 0; i < obj.length; i++) {
				res = func(String(i), obj[i]);
				if (res === false) break;
			}
		} else {
			if (!(obj instanceof Object)) {
				//It's not a JS object, probably ActiveX
				var en = new Enumerator(obj);
				en.moveFirst();
				while (en.atEnd() === false) {
					res = func(String(itemCount), en.item());
					if (res === false) break;
					en.moveNext();
					itemCount++;
				}
			} else {
				for (var x in obj) {
					if (typeof obj[x] !== 'function') {
						res = func(x, obj[x]);
						if (res === false) break;
					}
				}
			}
		}
	};

	/** 
	* Executes a shell command in synchronous or asynchronous mode
	* @description
	* This function can be used to execute treatments, in synchronous or asynchronous mode
	* It is based on 'WScript.Shell.Exec' method : see https://msdn.microsoft.com/en-us/library/ateytk4a(v=vs.84).aspx for more details
	* 
	* Using asynchronous mode is recommended to perform long or CPU consuming treatments without interupting Contextor execution, with timeout management.
	*
	*
	*   * asynchronous mode : a callback is provided, called when treatment is finished.
	*
	* An object is returned by function (and passed to callback in asynchronous mode):
	* 
	* ^Attribute  ^Description ^
	* | processId | {number} | process Id. Can be used to distinguish diiferent treatments launched in parallel.  |
	* | async | {boolean} | asynchonous (true) or synchonous (false) mode |
	* | exitCode | {number} | process exit code |
	* | duration | {number} | process approximative duration in seconds |
	* | timeout | {boolean} | 'true' if function failed in timeout (always 'false' in synchonous mode) |
	* | output | {string} | process output |
	* | error | {string} | error string |
	* 
<code javascript>
var command = '...';
var timeout = ...
ctx.exec(command, timeout, function(obj) {
  // called when treatment is finished
  // obj = {exitCode=..., output=..., error=...};
  ...
});
</code>
	*
	*   * synchronous mode : no callback is provided, the result object is returned by the function
	* 
<code javascript>
var command = '...';
var timeout = ...
var obj = ctx.exec(command);
// obj = {exitCode=..., output=..., error=...};
</code>
	* 
	* __Ex.:__
<code javascript>
// returns the result of 'ipconfig /all' command, in synchronous mode
var obj = ctx.exec('ipconfig /all');

// performs a network copy, in asynchronous mode
var command = 'robocopy "z:\\..." "c:\..." /MIR';
var res = ctx.exec(command, 30, function(obj) { 
  ... 
});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **ctx.exec** + 'TAB' :
	* 
<code javascript>
ctx.exec(command, 60, function(obj) {
  ...
});
</code>
	* </WRAP>
	* @method exec
 	* @path ctx.exec
	* @param {string} command command line
	* @param {number} [timeout] timeout delay in seconds (default is 60 s)
	* @param {function(Object)} [callback] callback called with result object.
	* @return {Object} result object
	*/
	ctx.exec = function (command, timeout, callback) 
	{
		ctx.notifyAction('ctx.exec');
		var async = (typeof callback === 'function' ? true : false);
		timeout = (timeout > 0 ? timeout : 60);
		var obj = {
			processId: 0,
			exitCode: 0,
			duration: 0,
			async: async,
			timeout: false,
			error: '',
			output: ''
		};
		ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell"); 
		var exec = ctx._shell.Exec(command);
		obj.processId = exec.ProcessID;
		
		function finalize(timeout) {
			obj.timeout = timeout;
			if ((!timeout) && (!exec.StdOut.AtEndOfStream)) obj.output += exec.StdOut.ReadAll();
			if (!exec.StdErr.AtEndOfStream) obj.error = exec.StdErr.ReadAll();
			obj.exitCode = exec.ExitCode;
			exec.Terminate();			
			exec = null;
			if (callback)  {
				callback.apply(this, [obj]);
				//ctx.on(null, callback, true, null, true, 0);
			}
			return obj;
		}
		
		if (async) {
			// asynchronous mode : start a polling
			ctx.polling({
				delay: 1000, // loop 1 s
				nbMax: timeout, // loop 'timeout' s
				test: function() { 
					if (exec) {
						// for unknown reasons, some applications don't set Status to '1' when finished (eg. robocopy when copying folders)
						// but it works if 'StdOut.ReadLine()' is called during polling
						obj.output += exec.StdOut.ReadLine() + '\n';
						obj.duration ++;
						return (exec.Status != 0); 
					}
					return true; // stop
				},
				done: function() { 
					finalize(false);
				},
				fail: function() {
					// timeout is reached
					finalize(true);
				}
			});
		} else {
			// synchronous mode : wait for process exit
			obj = finalize(false);			
		}
		return obj;
	};
	
	/** 
	* Executes a shell command 
	* @description
	* This function can be used to execute treatments, waiting or not termination
	* It is based on 'WScript.Shell.Run' method : https://msdn.microsoft.com/en-us/library/d33x48a9(v=vs.84).aspx for more details
	* 
<code javascript>
var command = '...';
var res = ctx.execRun(command, 0, false);
</code>
	* 
	* __Ex.:__
<code javascript>
// performs a network copy
var command = 'robocopy "z:\\..." "c:\..." /MIR';
var res = ctx.execRun(command, 0);
</code>
	* @method execRun
 	* @path ctx.execRun
	* @param {string} command command line
	* @param {number} [style] value indicating the appearance of the program's window
	* @param {boolean} [bWaitResult] if true, waits for the command to finish (false by default)
	* @return {number} result
	*/
	ctx.execRun = function (command, style, bWaitResult) 
	{
		ctx.notifyAction('ctx.execRun');
		if (style === undefined) style = 1;
		if (bWaitResult === undefined) bWaitResult = false;
		ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell"); 
	  var res = ctx._shell.Run(command, style, bWaitResult);		
		return res;
	};
	
	/**
	* Executes a VBScript function
	* @description
	* The function should be defined in a '.vbs' or '.vb' file included in the solution
	* 
	* __Ex.:__
	* 
	*   * Create a file containing VBS functions :
	* 
	* File **utils.vbs** :
<code vbscript>
Function myFunction(a, b)
  ...
  myFunction = ...
End Function

Function sendEmail(ToAddress, MessageSubject, MessageBody)
  ...
  sendEmail = ...
End Function
</code>
	*
	* __Note:__ You should define 'Function' functions only, not 'Sub' functions
	*
	*   * Include the file in the project :
	*
<code xml>
<SCRIPTS>
  <SCRIPT Name="Utils VBS" Src="utils.vbs" Type="vbscript" />
</SCRIPTS>	
</code>
	* 
	*   * Call the functions from your JS code :
	* 
<code javascript>
res = ctx.execVBS('sendEmail("support@contextor.eu", "test mail subject", "This is a test email !")');
</code>
	*
	* @method execVBS
  * @path ctx.execVBS
	* @param {string} code VBScript code
	* @return {string} result value
	*/
	ctx.execVBS = function (code) {
		var desc = ctx.getDescriptor();
		return ctx.verbExec(desc, 'ctx.execVBS', 'SETVALUE', {
				ZoneCtx : '_Work0_',
				Expression : code,
				Type : e.scriptLanguage.VBScript
			});
	};

	/**
	* Serializes a given date or current date to format "‎YYYY-MM-DD": "‎2015-03-‎02‎", ...
	* @description
	* __Ex.:__
<code javascript>
var txt = ctx.getDate(); // result is : "‎2015-03-‎02‎"
</code>
	* @method getDate
	* @path ctx.getDate
	* @param {Date} [date] date to be serialized (if omitted, current date is used)
	* @param {string} [separator] separator (default is '-')
	* @return {string} str formatted string, or an empty string if invalid
	*/
	ctx.getDate = function (date, separator) {
		if (separator === undefined) { separator = '-'; }
		date = date || new Date();
		var y = date.getFullYear().toString();
		var m = (date.getMonth() + 1).toString();
		var d  = date.getDate().toString();
		return y  + separator + (m[1]?m:"0"+m[0])  + separator + (d[1]?d:"0"+d[0]);
	};
	
	/**
	* Serializes a given date or current date to format HH:MM:SS.mmm
	* @description
	* __Ex.:__
<code javascript>
var txt = ctx.getTime(); // result is : "17:16:48.299"
</code>
	* @method getTime
	* @path ctx.getTime
	* @param {Date} [date] date to be serialized (if omitted, current date is used)
	* @param {string} [separator] separator (default is ':')
	* @return {string} str formatted string, or an empty string if invalid
	*/
	ctx.getTime = function (date, separator) {
		if (separator === undefined) { separator = ':'; }
		date = date || new Date();
		var h = date.getHours().toString();
		var m = date.getMinutes().toString();
		var s  = date.getSeconds().toString();
		return (h[1]?h:"0"+h[0]) + separator + (m[1]?m:"0"+m[0]) + separator + (s[1]?s:"0"+s[0]) + '.' + date.getMilliseconds();
	};

	/**
	* Serializes a given date or current date to an String ("YYYY-MM-DD.HH:MM:SS.MS")
	* @description
	*
	* __Ex.:__
<code javascript>
var txt = ctx.getTimestamp(); // result is : "2014-11-04.17:16:48.299"
</code>
	* @method getTimestamp
	* @path ctx.getTimestamp
	* @param {Date} [date] date to be serialized (if omitted, current date is used)
	* @param {boolean} [isFilename] filename usage : if 'true', invalid filename characters are modified (':' replaced by '.')
	* @param {string} [separator] separator between date and time (default is '.')
	* @return {string} str formatted string, or an empty string if invalid
	*/
	ctx.getTimestamp = function (date, isFilename, separator) {
		if (separator === undefined) { separator = '.'; }
		date = date || new Date();
		var txt = ctx.getDate(date) + separator + ctx.getTime(date);
		if (isFilename) {
			txt = txt.replace(/:/g, '.'); // if filename, ':' is forbidden
		}
		return txt;
	};
	
	/**
	* Highlights a given area during a given duration
	* @description
	* 
  * :!: __History:__ this function requires Contextor Interactive version **3.0.6.6** minimum
	*
	* __Ex.:__
<code javascript>
var pos = { x:..., y:..., ...};
ctx.highlight(pos, 1000);
</code>
	* @method highlight
  * @path ctx.highlight
	* @param {ctx.position} pos position object (see [[lib:ctx:ctx.core#class_ctxposition|ctx.position]])
	* @param {number} [timer] highlight duration and wait in ms (0 by default)
	* @param {boolean} [visible] if false, the highlight is removed (true by default)
	* @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
	* @param {number} [color] default color ('ctx.options.highlightColor' by default)
	* @return {string} result value
	*/
	ctx.highlight = function (pos, timer, visible, async, color) {
		var desc = ctx.getDescriptor();
		ctx.noNotify = true;
		var res = ctx.verbExec(desc, 'ctx.highlight', 'HIGHLIGHT', {
				X : pos.x,
				Y : pos.y,
				X2 : pos.x2,
				Y2 : pos.y2,
				CX : pos.cx,
				CY : pos.cy,
				HWND : pos.hwnd,
				Visible: (visible === false ? 'N' : undefined),
				Async: (async === false ? 'N' : undefined),
				Timer : timer,
				Color : (color === undefined ? ctx.options.highlightColor : color)
			}, '', false, '3.0.6.6');
		return res;
	};

  /**
  * Gets or sets an object, given its path as a string
	* @description
	* __Ex.:__
<code javascript>
ctx.index(ctx.options, 'trace.autoRecording', true); // sets ctx.options.trace.autoRecording to 'true' value
...
var val = ctx.index(ctx.options, 'trace.autoRecording'); // returns ctx.options.trace.autoRecording value
</code>
  * @ignore [internal use]
  * @method index
	* @path ctx.index
  * @param {Object} obj source object
  * @param {*} is object path
  * @param {*} [value] value to be set
  * @return {*} value in access mode
  */
  ctx.index = function (obj, is, value) {
		if (typeof is == 'string')
			return ctx.index(obj, is.split('.'), value);
		else if ((is.length == 1) && (value!==undefined))
			return obj[is[0]] = value;
		else if (is.length==0)
			return obj;
		else
			return ctx.index(obj[is[0]], is.slice(1), value);
  }

	/**
	* Sends a keyboard set of keys to the active page 
	* @description
	* __Ex.:__
<code javascript>
ctx.keyStroke(e.key.Ctrl+e.key.Shift+'A');
</code>
	* @method keyStroke
  * @path ctx.keyStroke
	* @param {string} value key sequence
	* @param {number} [timer] delay after key sequence (default is 100 ms)
	* @return {string} execution result
	*/
	ctx.keyStroke = function (value, timer) {
		ctx.notifyAction('ctx.keyStroke');
		timer = timer || 100;
		ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell"); 
		value = ctx.keyStrokeMapping(value); // use Microsoft mapping
		ctx._shell.SendKeys(value);
		ctx.noNotify = true;
		ctx.sleep(timer);
		return '';
	};

	/**
	* Maps a key combination to a syntax compatible with UIAutomation connector or ''ctx.keyStroke'' command
	* @description
	* __Ex.:__
<code javascript>
var val = ctx.keyStrokeMapping(e.key.Ctrl+e.key.Shift+'A'); 
// input : '_Ctrl__Shift_A'
// output : '^+A'
</code>
	* @method keyStrokeMapping
	* @ignore
  * @path ctx.keyStrokeMapping
	* @param {string} value key sequence
	* @return {string} key sequence
	*/
	ctx.keyStrokeMapping = function (value) {
		var map = String(value);
    map = map      
			.replace(/\+/g, '{+}')
			.replace(/%/g, '{%}')
			.replace(/\^/g, '{^}')
			.replace(/@/g, '{@}')
			.replace(/~/g, '{~}')
			.replace(/\[/g, '{[}')
			.replace(/\]/g, '{]}')
			.replace(new RegExp(e.key.Ctrl, 'g'), '^')
			.replace(new RegExp(e.key.Shift, 'g'), '+')
			.replace(new RegExp(e.key.Alt, 'g'), '%')
			.replace(new RegExp(e.key.Space, 'g'), ' ')
			.replace(new RegExp(e.key.Back, 'g'), '{BACKSPACE}')
			.replace(new RegExp(e.key.Del, 'g'), '{DEL}')
			.replace(new RegExp(e.key.Down, 'g'), '{DOWN}')
			.replace(new RegExp(e.key.End, 'g'), '{END}')
			.replace(new RegExp(e.key.Enter, 'g'), '{ENTER}')
			.replace(new RegExp(e.key.Esc, 'g'), '{ESC}')
			.replace(new RegExp(e.key.Home, 'g'), '{HOME}')
			.replace(new RegExp(e.key.Insert, 'g'), '{INS}')
			.replace(new RegExp(e.key.Left, 'g'), '{LEFT}')
			.replace(new RegExp(e.key.PageDown, 'g'), '{PGDN}')
			.replace(new RegExp(e.key.PageUp, 'g'), '{PGUP}')
			.replace(new RegExp(e.key.Right, 'g'), '{RIGHT}')
			.replace(new RegExp(e.key.ScrollLock, 'g'), '{SCROLLLOCK}')
			.replace(new RegExp(e.key.Tab, 'g'), '{TAB}')
			.replace(new RegExp(e.key.Up, 'g'), '{UP}')
			.replace(new RegExp(e.key.CapsLock, 'g'), '{CAPSLOCK}')
			.replace(new RegExp(e.key.PrintScreen, 'g'), '{PRTSC}')

			.replace(new RegExp(e.key.Substract, 'g'), '-')
			.replace(new RegExp(e.key.Add, 'g'), '{+}')
			.replace(new RegExp(e.key.Multiply, 'g'), '*')
			.replace(new RegExp(e.key.Decimal, 'g'), '.')
			
			.replace(new RegExp(e.key.F1, 'g'), '{F1}')
			.replace(new RegExp(e.key.F2, 'g'), '{F2}')
			.replace(new RegExp(e.key.F3, 'g'), '{F3}')
			.replace(new RegExp(e.key.F4, 'g'), '{F4}')
			.replace(new RegExp(e.key.F5, 'g'), '{F5}')
			.replace(new RegExp(e.key.F6, 'g'), '{F6}')
			.replace(new RegExp(e.key.F7, 'g'), '{F7}')
			.replace(new RegExp(e.key.F8, 'g'), '{F8}')
			.replace(new RegExp(e.key.F9, 'g'), '{F9}')
			.replace(new RegExp(e.key.F10, 'g'), '{F10}')
			.replace(new RegExp(e.key.F11, 'g'), '{F11}')
			.replace(new RegExp(e.key.F12, 'g'), '{F12}')
			.replace(new RegExp(e.key.F13, 'g'), '{F13}')
			.replace(new RegExp(e.key.F14, 'g'), '{F14}')
			.replace(new RegExp(e.key.F15, 'g'), '{F15}')
			.replace(new RegExp(e.key.F16, 'g'), '{F16}')
			.replace(new RegExp(e.key.F17, 'g'), '{F17}')
			.replace(new RegExp(e.key.F18, 'g'), '{F18}')
			.replace(new RegExp(e.key.F19, 'g'), '{F19}')
			.replace(new RegExp(e.key.F20, 'g'), '{F20}')
			.replace(new RegExp(e.key.F21, 'g'), '{F21}')
			.replace(new RegExp(e.key.F22, 'g'), '{F22}')
			.replace(new RegExp(e.key.F23, 'g'), '{F23}')
			.replace(new RegExp(e.key.F24, 'g'), '{F24}')
      .replace(/[\f]/g, "\\f")
      .replace(/[\n]/g, "\\n")
      .replace(/[\r]/g, "\\r")
      .replace(/[\t]/g, "\\t")
      .replace(/[\\]/g, "\\\\")
      .replace(/[\"]/g, "\\\"")
      .replace(/\\\\\\"/g, "&quot;");


//// TODO : these keys need to be managed
//			.replace(e.key, '{BREAK}')
//			.replace(e.key, '{CAPSLOCK}')
//			.replace(e.key, '{HELP}')
//			.replace(e.key, '{NUMLOCK}')
//
//			.replace(e.key.ContextMenu, '')
//			.replace(e.key.ScrollLock, '')
//			.replace(e.key.NumEnter, '{ENTER}')
//			.replace(e.key.Pause, '')
//			.replace(e.key.Attn, '')

		return map;
};

	/**
	* Generates a log message in debugger and trace file
	* @description
	* __Ex.:__
<code javascript>
ctx.log('function failed with error : ' + res, e.logIconType.Error);
</code>
	* @method log
  * @path ctx.log
	* @param {*} mess message to be displayed (text or object)
	* @param {e.logIconType} [type] icon type (see '[[lib:common:ctx.enum#elogicontype|e.logIconType]]' values).\\ Default value is ''e.logIconType.info''.
	* @param {string} [label] optional label
	* @param {Object} [options] optional trace level
	* @return {string} result value
	*/	
	ctx.log = function (mess, type, label, options) {
		var res = '';

		if (type === undefined) { type = e.logIconType.Info; }

		var display = true;
		if (options && (options.traceLevel !== undefined)) { 
			display = ((options.traceLevel == e.trace.level.Info) 
				|| ((options.traceLevel == e.trace.level.Error) && (type == e.logIconType.Error)) 
				|| ((options.traceLevel == e.trace.level.Warning)) && ((type == e.logIconType.Error) || (type == e.logIconType.Warning)));
		}
		if (!display) { return res; } // skip display
	
		var desc = undefined;
		if (!label) {
			if (typeof mess === 'string') {
				label = mess;
				mess = undefined;
			} else {
				label = label || 'object';
			}
		}			
		
		var params = [label, type];
		if (mess && (typeof mess === 'string')) {
			params.push(mess);
			mess = undefined;
		}
//		var attributes;		
//		if (screenshot) {
//			var file = ctx.getTimestamp(null, true) + '.png';
//			ctx.screenshot( { 
//				File: (ctx.options.trace.autoRecordingStarted ? ctx.options.traceFolderRecording : ctx.options.traceFolder) + "\\" + file 
//			} );
//			attributes = { screenshot : { file: file } }; 
//		}
		
		//ctx.notifyAction('ctx.log', mess, desc, 'LOGMESS', params);
		ctx.notifyAction('ctx.log', undefined, desc, 'LOGMESS', params, mess);
		return res;
	};

	/**
	* logMess: alias for log
	* @description
	* __Ex.:__
<code javascript>
ctx.logMess('function failed with error : ' + res, e.logIconType.error);
</code>
	* @method logMess
	* @ignore
	* @deprecated use ctx.log instead of ctx.logMess
  * @path ctx.logMess
	* @param {*} mess
	* @param {e.logIconType} [type] icon type (see '[[lib:common:ctx.enum#elogicontype|e.logIconType]]' values) default is 'Info'
	* @return {string} result value
	*/
	ctx.logMess = function (mess, type) {
		return ctx.log(mess, type);
	}

	/**
	* Executes an action on 'ctx.popup.messbox2'
	* @description
	* @advanced
	* __Ex.:__
<code javascript>
// memorize window width
var width = ctx.messbox2Execute("acObjectGetValue", "Application", "pAppbar", "CX");
</code>
	* @method messbox2Execute
  * @path ctx.messbox2Execute
	* @param {string} action action name
	* @param {string|number} [P1] parameter 1
	* @param {string|number} [P2] parameter 2
	* @param {string|number} [P3] parameter 3
	* @param {string|number} [P4] parameter 4
	* @param {string|number} [P5] parameter 5
	* @return {string} result value
	*/
	ctx.messbox2Execute = function (action, P1, P2, P3, P4, P5) {
		var desc = ctx.getDescriptor();
		return ctx.verbExec(desc, 'ctx.messbox2Execute', 'EXECUTE', {
				Action : action,
				Parm1 : P1,
				Parm2 : P2,
				Parm3 : P3,
				Parm4 : P4,
				Parm5 : P5
			});
	};

	/**
	* Resets a listening handler or a wait handler
	* @description
	* __Ex.:__
<code javascript>
var obj = LinkedIn.events.evWaitSubscription.on(function(ev) {...});  // sets event listening
...
ctx.off(obj);  // resets event listening
</code>
	* \\
	* __Ex.:__
<code javascript>
var obj = ctx.wait(function(ev) {...}, 1000);  // sets a 1000 ms wait
...
ctx.off(obj);  // resets event listening
</code>
	* @method off
	* @path ctx.off
	* @param {Object} obj object provided by 'ctx.on()' or 'ctx.once()' for the corresponding handler
	* @return {boolean} result true | false
	*/
	ctx.off = function (obj) {
		if (obj && obj.timer) {
			clearTimeout(obj.timer);
		}
		if (obj && obj.evName && obj.context && obj.func) {
			return ctx.amplify.unsubscribe(obj.evName, obj.context, obj.func);
		}
		return false; // invalid object
	};

	/**
	* Sets a permanent or single handler to listen to a given event
	* @description
	* __Note:__ : this method should not be directly used, in the general cas, rather use application/page/item method:
	*   * application : application.on({ event, function(ev) { ... }});
	*   * page : application.page.on({ event: function(ev) { ... }});
	*   * item : application.page.item.on({ event: function(ev) { ... }});
	*
	* __Ex.:__
<code javascript>
// event provided as an event object
ctx.on(LinkedIn.events.START, function(ev) {...});  
...
ctx.on(LinkedIn.pHome.events.LOAD, function(ev) {...}, LinkedIn.pHome.exist, this, true); 
</code>
	* @method on
	* @path ctx.on
	* @param {ctx.event} event event name, provided as an event object or a selector string
	* @param {function(ctx.event)} func callback to be called on event reception
	* @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
	* @param {Object} [context] context object to be called with the callback
	* @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	* @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
	*/
	ctx.on = function (event, func, immediateCondition, context, single, delay, noStepReset) {
		var desc;
		// eg.: on('MyAppli.MyPage.LOAD', MyAppli.MyPage.exist, function(ev) {...}, context, true/false)
		//   or on(MyAppli.MyPage.event('LOAD'), MyAppli.MyPage.exist, function(ev) {...}, context, true/false)
		//if (typeof event === 'string')								
		//	desc = ctx.getDescriptor(event);
		// eg.: on(MyAppli.MyPage, 'LOAD', function(ev) {...}, context, true/false)
		if (event && event.getObjectDescriptor)
			desc = event.getObjectDescriptor();
		if (!func || (typeof func !== 'function')) {
			if (ctx.currentPromise) {
				func = ctx.currentPromise.resolve;
			} else {
				throw new Error(e.error.InvalidArgument, "ctx.on: no valid callback was provided");
			}
		}
		/** @type {Object} */ var oContext = context || null;
		// test if immediate condition is valid. If yes : immediately call the call back
		var evName = '';
		if ((!oContext) && ctx.currentEvent) {
		    if (ctx.currentEvent.page) {
		        oContext = ctx.currentEvent.page;
		    } else if (ctx.currentEvent.appli) {
		        oContext = ctx.currentEvent.appli;
		    }
		}
		var bImmediate = false;
		if (typeof immediateCondition === 'function') {
			// immediateCondition is a function
			bImmediate = immediateCondition && immediateCondition.call(oContext);
		} else {
			// immediateCondition is a boolean
			bImmediate = immediateCondition;			
		}

		if (event && (!(bImmediate && single))) {
			// subscribe the event :
			// - if no immediate condition
			// - or if not single trigger
			evName = desc.appliName;
			if (desc.pageName && desc.pageName !== '') {
				evName += "." + desc.pageName;
			}
			if (desc.itemName && desc.itemName !== '') {
				evName += "." + desc.itemName;
			}
			if (desc.event && desc.event !== '') {
				evName += ":" + desc.event;
			}
			ctx.amplify.subscribe(evName, oContext, func, 10, null, single, (noStepReset ? null : ctx.currentStep), delay);
		}

		var timerId = 0;
		// condition is verified
		if (bImmediate) {
			if (ctx.currentStep) {
				// call the function in the context of the step
				var st = ctx.currentStep;
				if (delay) {
					var timerIndex = ctx.objectIndex++;
					// Name the timer for debugging
					var strTimeoutName = ctx.currentTimerReason ;
					if (strTimeoutName == '') strTimeoutName = 'timer' ;
					// call after delay
					// Rearm timer linked to currentParentId
					ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '', (st ? st.name : ''), ctx.currentParentId);								
					timerId = setTimeout(function(st, func, context, event, timerIndex) { return function() {
						ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '', (st ? st.name : ''), (st ? st.id : -1));								
						// following Verbs relative to the Timer
						var oldParentId = ctx.currentParentId ;
						ctx.currentParentId = timerIndex ;
						st.callFunction(func, context, event);
						ctx.currentParentId = oldParentId ;
						if (st.timers[timerIndex]) { 
							delete st.timers[timerIndex]; 
							// following Verbs relative to the Timer
							//ctx.notifyState('once', 'timer' + timerIndex, timerIndex, 'reset', '', (st ? st.name : ''), (st ? st.id : -1));								
							ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '', (st ? st.name : ''), timerIndex);								
						}
					}; }(st, func, oContext, [ctx.currentEvent], timerIndex), delay);
					st.timers[timerIndex] = timerId;
				} else {
					// call immediatly
					st.callFunction(func, oContext, [ctx.currentEvent]);
				}
			} else {
				if (delay) {
					var timerIndex = ctx.objectIndex++;
					// Name the timer for debugging
					var strTimeoutName = ctx.currentTimerReason ;
					if (strTimeoutName == '') strTimeoutName = 'timer' ;
					// call after delay
					ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '');								
					timerId = setTimeout(function(func, context, event, timerIndex) { return function() {
						ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '');								
						// following Verbs relative to the Timer
						var oldParentId = ctx.currentParentId ;
						ctx.currentParentId = timerIndex ;
						func.apply(context, event);
						ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '');								
						ctx.currentParentId = oldParentId ;
					}; }(func, oContext, [ctx.currentEvent], timerIndex), delay);
				} else {
					// call immediatly
					func.apply(oContext, [ctx.currentEvent]);
				}
			}
		}; 
		return {
			evName :  evName,
			desc :  desc,
			context : oContext,
			timer : timerId,
			func : func
		}; // return object to be used to unsubscribe
	};
	
	/**
	* Sets a single handler to listen to a given event
	* @description
	* __Ex.:__
<code javascript>
ctx.once(LinkedIn.addEvent({ evStart : ''}), function(ev) {...});  // sets event listening
</code>
	* @method once
	* @path ctx.once
	* @advanced
	* @param {ctx.event} event event name, provided as an event object or a selector string
	* @param {function(ctx.event)} func callback to be called on event reception
	* @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
	* @param {Object} [context] context object to be called with the callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	* @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
	*/
	ctx.once = function (event, func, immediateCondition, context, delay, noStepReset) {
		return ctx.on(event, func, immediateCondition, context, true, delay, noStepReset);
	};
	
	/**
	* @typedef {{
	* 	delay: number, 
	* 	nbMax: (number|undefined), 
	* 	done: (function ()|undefined), 
	* 	test: (function ()|undefined), 
	* 	fail: (function ()|undefined)
	* }}
	* @ignore
	*/
	ctx.pollingOptions = {
		delay: 0, 
		nbMax: 0, 
		test: function () {}, 
		done: function () {}, 
		fail: function () {} 	
	};
	
	/**
	* Function used to implement asynchronous polling loops
	* @description
	* The 'pollingOptions' object is composed of the following parameters :
	* 
	* ^Attribute  ^Description ^
	* |delay | delay (in ms) between each iteration (default: 100 ms) |
	* |nbMax | max. number of loops to wait before calling 'fail' method (default: 1) |
	* |test | test function called during each iteration (default: returns 'false')\\  - if it returns 'false', the loop carries on \\  - if it returns 'true', the 'done' function is called |
	* |done | function called when 'test' function returned 'true' (default: empty) |
	* |fail | function called at the end of the loop, if 'nbMax' iterations were reached (default: empty) |
	* 
	* __Ex.:__
<code javascript>
// waits for the appearance of an Ajax object in a page (during 6 * 500 ms)
ctx.polling({
  delay: 500,
  nbMax: 6,
  test: function() { return MyAppli.MyPage.btValidate.exist(); },
  done: function() { 
   // object is present
  }, 
  fail: function() { 
    // object is absent
  }
});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **ctx.polling** + 'TAB' :
	* 
<code javascript>
ctx.polling({
  delay: 100,
  nbMax: 10,
  test: function() { 
    return false; 
  },
  done: function() { 
    // add code here
  },
  fail: function() { }
});
</code>
	* </WRAP>
	* @method polling
  * @path ctx.polling
	* @param {ctx.pollingOptions} options object desribing the polling options (delay, max iteration count, ...)
	*/
	ctx.polling = function(options)
	{
		var delay = Math.abs(options.delay) || 100,
			nbMax = isNaN(options.nbMax) ? 1 : options.nbMax,
			iLoop = 0,
			test = options.test || function(index) { return false; },
			done = options.done || function() {},
			fail = options.fail || function() {};
		ctx.notifyAction('ctx.polling');
		(function pollingLoop(){
			if ( test(iLoop) ) 
			{
				done();
			} else {
				if ((nbMax > 0) && (iLoop >= nbMax)) {
					fail();
				} else {
					iLoop ++;
					//ctx.wait(pollingLoop, delay);
					ctx.currentTimerReason = 'polling(' + iLoop + ')' ;
					ctx.on(null, pollingLoop, true, null, true, delay);
				}
			}			
		})();
	};
	
	/**
	* Reads a text from a file
	* @description
	* __Ex.:__
<code javascript>
var txt = ctx.readFile('c:\\temp\\files.txt');
</code>
	* @method readFile
  * @path ctx.readFile
	* @param {string} filename output filename
	* @return {string} read text string (empty if file not found)
	*/
	ctx.readFile = function (filename) {
		ctx.notifyAction('ctx.readFile');
		var res = '';
		if (ctx.engineStarted) 
			res = ctx.wkMng.CtxtReadFile(filename);
		return res;
	};
	
  /**
  * Declares a global shortcut ('hot key') which triggers a functional event
	* @description
  * The list of pre-defined keys for shortcut definition is defined in enumeration : [[lib:common:ctx.enum#ekey|e.key]]
	*
  * __Ex.:__
<code javascript>
// hot key 'Ctrl + F3' to trigger 'evStartTreatment' event
ctx.regHotKey(e.key.Ctrl + e.key.F3, GLOBAL.events.evStartTreatment);
</code>
  * @method regHotKey
  * @path ctx.regHotKey
  * @param {string} shortcut shortcut definition
  * @param {ctx.event} event event name to be triggered
  * @return {string} result value
  */
  ctx.regHotKey = function (shortcut, event) {
		var desc = ctx.getDescriptor();
		if (event && event.getObjectDescriptor)
			desc = event.getObjectDescriptor();
    return ctx.verbExec(desc, 'regHotKey', 'REGHOTKEY', {
      Value: shortcut,
      Proc: desc.appliName,
      Event: desc.event
    });
  }
		
	/**
	* Resolves a path, especially to replace patterns with run-time paths
	* @description
	* Possible patterns :
	*   * **%CurrentURL%** : ''GLOBAL.data.currentURL'',
	*   * **%CurrentDir%** : ''ctx.options.currentDir'',
	*   * **%ExecDir%** : ''ctx.options.execDir'',
	*   * **%ServerURL%** : ''ctx.options.serverURL''
	* 
	* __Ex.:__
<code javascript>
var path = ctx.resolvePath("%CurrentURL%\\html\\index.html");
// resolves 'path' with project local folder
</code>
	* @method resolvePath 
	* @path ctx.resolvePath
	* @param {string} path path to be resolved
	* @return {string} resolved path
	*/
	ctx.resolvePath = function (path) {
		if (path) {
			path = path.replace("%CurrentURL%", ctx.options.currentURL)
				.replace("%CurrentDir%", ctx.options.currentDir)
				.replace("%ExecDir%", ctx.options.execDir)
				.replace("%ServerURL%", ctx.options.serverURL);
		}
		return path;
	};

	/**
	* Makes a screenshot of an application window or screen area 
	* @description
	* Capture is saved in a '.png' file. 
	*
	* Different options are possible according to the object parameters : 
	*   * {string} Appli, InstanceAppli, Page, InstancePage : used to specify page name and parent application 
	*   * {string} Id : used to capture a ctx.popup (ctx.popup.messbox or ctx.popup.messbox2) 
	*   * {string} HWND : used to capture a window based on its Window Handle (hWnd) 
	*   * {string} File : filename . If omitted, name is generated on the format ''YYYYMMDD_HHMMSS_MS.png'' (ex.: ''20150113_230806_416.png''). File is generated in ''ctx.options.currentDir + '\Pictures''' 
	*   * {string} X, Y, CX, CY : specify area position to be captured 
	*   * {boolean} RawSnapshot : if 'true', makes 'raw snapshot', rather than 'print screen' mode. 
	*
	* __Ex.:__
<code javascript>
// capture a declared page
ctx.screenshot({
  Appli: 'Google',
  InstanceAppli: 1002,
  Page: 'pGoogle'
});
// capture a ctx.popup.messbox or ctx.popup.messbox2, mention the target filename
ctx.screenshot({
  Id:'google',
  File: 'c:\\temp\\google.png'
});
// capture a page in raw mode
ctx.screenshot({
  Appli: 'Google',
  Id:'pVersion',
  RawSnapshot: true
});
// capture a fix area
ctx.screenshot({
  Id:'google',
  X:50,
  Y:30,
  CX:200,
  CY:100
});	
// make a full screen capture
ctx.screenshot();
</code>
	* @method screenshot
  * @path ctx.screenshot
	* @param {Object} [obj] parameters
	* @return {string} result value
	*/
	ctx.screenshot = function (obj) {
		var desc = ctx.getDescriptor();
		return ctx.verbExec(desc, 'ctx.screenshot', 'SCREENSHOT', obj, '', false);
	};

//	/**
//	* Sends a mail
//	* @description
//	* __Ex.:__
//<code javascript>
//</code>
//	* @method sendMail
//	* @path ctx.sendMail
//	* @param {string} from 
//	* @param {string} to 
//	* @param {string} subject 
//	* @param {string} [body] 
//	*/
//	ctx.sendMail = function (from, to, subject, body)
//	{
//	  try
//	  {
//	    var oMsg      = new ActiveXObject("CDO.Message");
//	    oMsg.From     = from;
//	    oMsg.To       = to;
//	    oMsg.Subject  = subject;
//	    oMsg.TextBody = body;
//	    oMsg.Send(); 
//	  }
//	  catch(ex)  {  
//			ctx.log(ex, e.logIconType.Error, ex.message );
//		}
//	};
	
	/**
	* Serializes an object to a JSON string
	* @description
	* __Ex.:__
<code javascript>
var txt = ctx.serialize( { name:'Ford', firstname:'John' }, false, false); 
// result is : "{\"name\":\"Ford\",\"firstname\":\"John\"}"
</code>
	* @method serialize
	* @path ctx.serialize
	* @param {*} data object, string, number to be serialized
	* @param {boolean} [doEscape] if 'true', escapes all control characters ("\b" -> "\\b", "\"" -> "\\\"", "\\" -> "\\\\", ...)
	* @param {boolean} [addPrefix] if 'true' and 'data' is an object, adds a prefix to automate unserialisation
	* @param {number|string} [space] causes the resulting string to be pretty-printed
	* @param {boolean} [isShort] if 'true', serialize using short description
	* @return {string} formatted string
	*/
	ctx.serialize = function (data, doEscape, addPrefix, space, isShort) {
		function escape (key, val) {
	    if (typeof(val)!="string") return val;
	    return val      
        .replace(/[\b]/g, "\\b")
        .replace(/[\f]/g, "\\f")
        .replace(/[\n]/g, "\\n")
        .replace(/[\r]/g, "\\r")
        .replace(/[\t]/g, "\\t")
        .replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, "\\\"")
        .replace(/\\\\\\"/g, "&quot;");
        //.replace(/[\']/g, "\\\'")
        //.replace(/[\/]/g, "\\/");
		}
		var str = ''
		if ((typeof data === 'function') && (data.toString)) { 
			str = data.toString();	
		} else if (typeof data === 'number') { 
			str = String(data); 
		}	else if (typeof data === 'string') { 			
			if (data.indexOf(e.prefix.raw) == 0) {
				str = data.substring(e.prefix.raw.length); 
				str = (doEscape ? escape('', str) : str); 
			} else if (doEscape) {
				str = '"' + escape('', data) + '"'; 
			} else {
				str = data; 
			}
		} else if (typeof data === 'object') { 
			// JS Object : stringify it (add e.prefix.json as a pattern to recognize serialized objects)
			str = (addPrefix ? e.prefix.json : '') + ctx.json.stringify(data, (doEscape ? escape : null), space, undefined, isShort);
		}
		// suppress '"' for raw data
		str = str.replace(/\"%<%/g, "").replace(/%>%\"/g, "");
		return str;
	};
	
	/**
	* Delete a value or set of values from the data object
	* @description
	* __Ex.:__
	* <code javascript>
	* ctx.del("//Data_Popup1", e.data.pathType.XPath);
	* </code>
	* @method del
	* @path ctx.del
	* @param {Object} target object of the operation
	* @param {string} [path] path
	* @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[lib:common:ctx.enum#edatapathType|e.data.pathType]])
	* @return {*} returned object or value
	*/
	ctx.del = function (target, path, pathType) {
		return ctx.set('', target, path, e.data.format.CTX, e.data.initType.DEL, pathType);
	}
	
	/**
	* Tests if a value or set of values exists in the data object
	* @description
	* __Ex.:__
	* <code javascript>
	* if (ScnApp.data.exist("//Data_Popup1", e.data.pathType.XPath)) { ... }
	* </code>
	* @method exist
	* @path ctx.exist
	* @param {Object} target object to be tested
	* @param {string} [path] path
	* @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[lib:common:ctx.enum#edatapathType|e.data.pathType]])
	* @return {boolean} returned object or value
	*/
	ctx.exist = function (target, path, pathType) {
		var res = ctx.get(target, path, pathType);
		if ((res === null) || (res === undefined) || (Array.isArray(res) && (res.length == 0))) return false;
		return true;
	}
	
	/**
	* Returns a value or set of values in the data object
	* @description
	* __Ex.:__
	* <code javascript>
	* var val = ScnApp.data.get("//Data_Popup1", e.data.pathType.XPath);
	* </code>
	* @method get
	* @path ctx.get
	* @param {Object} target object to be read
	* @param {string} [path] path
	* @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[lib:common:ctx.enum#edatapathType|e.data.pathType]])
	* @param {e.data.format} [format] data format type (see [[lib:common:ctx.enum#edataformat|e.data.format]])
	* @return {*} returned object or value
	*/
	ctx.get = function (target, path, pathType, format) {
		var res;
		var sPath = path || "";
		var parentAppli = null;
		var targetObject = null;
		if (target instanceof ctx.application) {
      parentAppli = target;
      targetObject = target.data;
		} else {
			targetObject = target;
		}
		if (parentAppli) {
			if (sPath.indexOf('/') == 0)
			{
				// absolute XPath in the global data object
				targetObject = ctx.data;
			}
		}
		if (sPath) {
			switch (pathType) {
				case e.data.pathType.JsonPath :
					res = ctx.json.search(targetObject, sPath);
					break;
				case e.data.pathType.SQLPath :
					res = ctx.json.searchSQL(targetObject, sPath);
					break;
				case e.data.pathType.XPath :
				default :
					res = ctx.json.searchXPath(targetObject, sPath);
					break;
			}
		} else {
			res = targetObject;
		}
		// if the result is an object, convert it to XML text or JSON
		if (typeof res === 'object') {
			switch (format) {
				case e.data.format.XML:
				case 'XML':
				{				
					res = ctx.xml.json2xml(res); // XML raw text
					break;
				}
				case e.data.format.JSON:
				case 'JSON':
				case 'json':
				{
					res = ctx.json.stringify(res); // JSON text
					break;
				}
				default:
				{
					// return a JS object
					break;
				}
			}
		}
		return res;
	}
	
	/**
	* Merges a value or set of values in the data object
	* @description
	* __Ex.:__
	* <code javascript>
	* GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
	* </code>
	* @method set
	* @path ctx.set
	* @param {*} data object or string containing data to be set
	* @param {Object} target object (or application) to be modified
	* @param {string} [path] target path or object
	* @param {e.data.format} [format] data format type (see [[lib:common:ctx.enum#edataformat|e.data.format]])
	* @param {e.data.initType} [initType] data initialisation type (see [[lib:common:ctx.enum#edatainitType|e.data.initType]])
	* @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[lib:common:ctx.enum#edatapathType|e.data.pathType]])
	* @param {boolean} [locked] if 'true', no new attribute can be added 
  * @param {number} [level] max recursive level
  * @return {*} destination object after modification
	*/
	ctx.set = function (data, target, path, format, initType, pathType, locked, level) {
		/**
	  * Merges an object in a given object
		* __Note:__ this function is inspired from **jQuery.extend()** ([[https://api.jquery.com/jquery.extend/]])
	  * @ignore
	  * @method _set
		* @param {*} data object or string containing data to be set
		* @param {Object} target object (or application) to be modified
	  * @param {number} [level] max recursive level
		* @param {boolean} [locked] if 'true', no new attribute can be added 
	  * @return {Object} destination object after modification
	  */
		var _set = function (data, target, level, locked) {
			var copyIsArray;
		  if (!target || (typeof target !== 'object')) {
				target = {};
			}
			if (level === undefined) level = 20;
			if (data) {
				for (var id in data) {
					// anti loop
					if ( data[id] === target[id]) {
						continue;
					}
					if ( data[id] && ((copyIsArray = Array.isArray( data[id])) || (typeof  data[id] === "object"))) {
						if (/*(!locked) &&*/ (typeof target[id] !== "object" && typeof target[id] !== "function")) {
							if (copyIsArray) {
								copyIsArray = false;
								if (!(target[id] && Array.isArray(target[id])))
									target[id] = [];
							} else {
								if (!(target[id] && (typeof target[id] === "object")))
									target[id] = {};
							}
						}
		        //if (!target[id].set) {
						//	target[id].set = function (data) { _set( data, target[id] ); }
						//}
						if (level > 1) {
							_set(data[id], target[id], --level, locked);
						}
						//else
						//	ctx.log('_set : max level reached', e.logIconType.Warning);
		      } else {
						if (/*(!locked) &&*/ (data[id] !== undefined)) {
			        target[id] = data[id];
						}
		      }
		    }
			}
			return target;
		}

		var parentAppli = null;
		var targetObject = null;
		var res;
		var sPath = path || '';

		if (target && target.data) {
      parentAppli = target;
      targetObject = target.data;
		} else {
			targetObject = target;
		}
		if (typeof targetObject !== 'object') {
      throw new Error(e.error.InvalidArgument, 'ctx.set: target should be an object');
		}

		if (sPath) {
			switch (pathType) {
				case e.data.pathType.JsonPath :
		      throw new Error(e.error.NotImplemented, 'ctx.set: \'JsonPath\' type is not implemented');
					break;
				case e.data.pathType.SQLPath :
		      throw new Error(e.error.NotImplemented, 'ctx.set: \'SQLPath\' type is not implemented');
					break;
				case e.data.pathType.XPath :
				default :
					if (typeof format == 'undefined') {
						if (typeof data === 'string')
							format = e.data.format.TEXT;
						else if (typeof data === 'object')
							format = e.data.format.JS;
					}
					var obj = {}; // data to be inserted
					/** @type {string} */ var sData = '';
					if (format == e.data.format.JS) {
						if (typeof data !== 'object') {
				      throw new Error(e.error.InvalidArgument, 'ctx.set: input should be an object');
						}
						obj = data;
					} else {
						if (typeof data === 'object') {
				      throw new Error(e.error.InvalidArgument, 'ctx.set: input should be a simple type: string, number, ...');
						}
						sData = String(data);
					}
					
					if (parentAppli) {
						if (sPath.indexOf('/') == 0)
						{
							// absolute XPath in the global data object
							targetObject = ctx.data;
						}
					}

					var bCreate = true; // force creation if node does not exist
					var bRemove = false;
					switch (initType) {
						case e.data.initType.DEL:
							bRemove = true;
							break;
						case e.data.initType.ADD:
							throw new Error(e.error.NotImplemented, 'ctx.set: e.data.initType.ADD type is not implemented');
							break;
						case e.data.initType.CREATE:
							// only create the node if it does not exist
							if (ctx.exist(targetObject, sPath, pathType))
								return targetObject;
							break;
						case e.data.initType.CRINIT:
						default:
							break;
					}
					
					switch (format) {
						// *** source is a context node ***
						case e.data.format.CTX:
						case 'CTX':
							if (sData) {
								if (sData.indexOf('/') != 0)
								{
									// use a data template
									if (parentAppli && parentAppli.dataTemplates && parentAppli.dataTemplates[sData]) {
										obj = parentAppli.dataTemplates[sData];
							      if (!obj)
											throw new Error(e.error.InvalidArgument, 'ctx.set: unkown data template : \'' + sData + '\'');
									} else {
							      throw new Error(e.error.InvalidArgument, 'ctx.set: invalid data template : \'' + sData + '\'');
									}
								}
								else
								{
									obj = ctx.json.searchXPath(targetObject, sData);
								}
							}
							res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
							return res;
							break;
						// *** source is an external XML or JSON file ***
						case e.data.format.XMLURL:
						case e.data.format.JSONURL:
						case 'URL':
							if (sData) {
								ctx.ajax.call({
									url: sData,
									async: false,
									contentType: (format == e.data.format.JSONURL ? e.ajax.content.json : e.ajax.content.xml ),
									success: function(res, status, xhr) {
										try {
											if (format == e.data.format.JSONURL) {
												// res contains a string with XML data
												obj = ctx.json.parse(res);
												res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
												return res;
											} else {
												// res contains a string with XML data
												obj = ctx.xml.xml2object(res);
												res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
												return res;
											}
										} catch (ex) {
								      throw new Error(e.error.InvalidArgument, 'ctx.set: invalid data file : \'' + sData + '\'');
										}
									},
									error: function(res, obj) {
							      throw new Error(e.error.InvalidArgument, 'ctx.set: file could not be loaded : \'' + sData + '\'');
									}
								});
							}
							break;
						// *** source is a JSON string ***
						case e.data.format.JSON:
							if (sData) {
								try {
									obj = ctx.json.parse(sData);
									res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
									return res;
								} catch (ex) {
						      throw new Error(e.error.InvalidArgument, 'ctx.set: input should be a JSON string');
								}
							}
							break;
						// *** source is an XML string ***
						case e.data.format.XML:
						case 'XML':
							if (sData) {
								try {
									obj = ctx.xml.xml2object(sData);
									res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
									return res;
								} catch (ex) {
						      throw new Error(e.error.InvalidArgument, 'ctx.set: input should be an XML string');
								}
							}
							break;
						// *** source is a JS object or raw text ***
						case e.data.format.JS:
						case e.data.format.TEXT:
						default:
							obj = data;
							res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
							return res;
							break;
					}
					break;
			}
		} else {
			// *** standard 'set' mode ***
			if (typeof data === 'object') {
				targetObject = _set(data, targetObject, level, locked);
			} else {
				/** @type {*} */var tObj = targetObject;
				tObj = data;
			}
		}
		return targetObject;
	}

	/**
	* Launches an application
	* @description
	* __Ex.:__
<code javascript>
ctx.shellexec("%programfiles(x86)%\\Skype\\Phone\\Skype.exe", "/callto:echo123");
</code>
	* @method shellexec
  * @path ctx.shellexec
	* @param {string} file command line to be executed. Standard system variables can be used ('%programfiles(x86)%', '%temp%', ...)
	* @param {string} [parm] optional argument for the command line
	* @param {string} [dir] working directory
	* @param {string} [flag] display mode whan application is started : Show, Hide, Maximized, Minimized... Default value is ''e.launchFlag.Show''.\\
	*See ''[[lib:common:ctx.enum#elaunchflag|e.launchFlag]]'' enumeration for a complete list of flags
	* @return {string} result value
	*/
	ctx.shellexec = function (file, parm, dir, flag) {
		var desc = ctx.getDescriptor();
		return ctx.verbExec(desc, 'ctx.shellexec', 'SHELLEXEC', {
				File : file,
				Parm : parm,
				Dir : dir,
				Flag : (flag ? flag : e.launchFlag.Show)
			});
	};

	/**
	* Generates a synchronous wait with a given delay
	* @description
	* __Ex.:__
<code javascript>
ctx.sleep(500); // waits 500 ms
</code>
	* @method sleep
  * @path ctx.sleep
	* @param {number} timer timer value in ms (default is 100 ms)
	* @return {string} result value
	*/
	ctx.sleep = function (timer) {
		timer = timer || 100;
		var desc = ctx.getDescriptor();
		return ctx.verbExec(desc, 'ctx.sleep', 'SLEEP', { 
			Int : timer
		});
	};

	/**
	* @method tooltip
  * @path ctx.tooltip
	* @param {Object} obj tooltip object
	* @suppress {checkTypes}
	*/
	ctx.tooltip = function (obj) {
		obj = obj || {};
		ctx.each(obj, function(id, value) {
			if (value && value.item && value.item.page && (value.item.page instanceof ctx.page)) {
				var page = value.item.page;
				if (typeof value === 'object') {
					value.id = id;
					page.tooltips[id] = new ctx.tooltipClass(value, page);
				}
			}
		});			
	};

	/**
	* @method tooltipInit
  * @path ctx.tooltipInit
	* @param {Object} obj tooltip object
	*/
	ctx.tooltipInit = function (obj) {
		obj = obj || {};
		if (obj && obj.page && (obj.page instanceof ctx.page)) {
			var page = obj.page;
			page.tooltipInit(obj);
		}
	};

	/**
	* Unserialize an JSON string to an object
	* @description
	* __Ex.:__
<code javascript>
var obj = ctx.unserialize("{\"name\":\"Ford\",\"firstname\":\"John\"}"); 
// result is : { name:'Ford', firstname:'John' }
</code>
	* @method unserialize
	* @path ctx.unserialize
	* @param {string|Object} data JSON string to be unserialized
	* @param {boolean} [isObject] if 'true', forces unserialization to an object
	* @return {*} string, or unserialized object
	*/
	ctx.unserialize = function (data, isObject) {
		if (data && typeof data === 'string') { 
			// if data starts with the pattern e.prefix.json, it's a JSON serialized object
			if (isObject) {
				return ctx.json.parse(data);
			} else if (data.indexOf(e.prefix.json) == 0) {
				var str = data.substring(e.prefix.json.length); 
				return ctx.json.parse(str);
			} else {
				return data;
			}
		}
		return '';
	};

	/**
	* Sets a timeout callback
	* @description
	* __Ex.:__
<code javascript>
// call function after a 5 s delay
var id = ctx.wait(function(ev) { 
  // add code here... 
}, 5000);
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **ctx.wait** + 'TAB' :
	* 
<code javascript>
ctx.wait(function(ev) {
  ...
}, 0);
</code>
	* </WRAP>
	* @method wait
	* @path ctx.wait
	* @param {function(ctx.event)} callback callback to be called
	* @param {number} delay timer value in ms (default is 100 ms)
	* @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
	* @return {Object} an object to be provided to 'ctx.off()' to disable wait
	*/
	ctx.wait = function(callback, delay, noStepReset)
	{
		delay = delay || 100;
		ctx.notifyAction('ctx.wait');
		ctx.currentTimerReason = 'wait(' + delay + ')' ;
		return ctx.on(null, callback, true, null, true, delay, noStepReset);
	}
	
	/**
	* Writes a text to a file
	* @description
	* __Ex.:__
<code javascript>
ctx.writeFile('c:\\temp\\files.txt', result, true);
</code>
	* @method writeFile
  * @path ctx.writeFile
	* @param {string} filename output filename
	* @param {string} text string to be written
	* @param {boolean} [bEnd] if true, write at the end of the file 
	* @param {boolean} [bCR] if true, adds a carriage return 
	* @return {string} result value
	*/
	ctx.writeFile = function (filename, text, bEnd, bCR) {
		ctx.notifyAction('ctx.writeFile');
		var res = '';
		if (bCR) { text += "\n"; }
		if (ctx.engineStarted) 
			res = ctx.wkMng.CtxtWriteFile(filename, text, bEnd);
		return res;
	};
	
/** 
* @typedef {{
*   async: (boolean|undefined),
*   contentType: (e.ajax.content|string|undefined),
*   context: (Object|undefined),
*   data : (Object|undefined),
*   dataType: (e.ajax.content|undefined),
*   desc: (ctx.descriptor|undefined),
*   error: (function(Object, number, Object)|undefined),
*   header: (Array<Object>|undefined),
*   id: (number|undefined),
*   localFile: (string|undefined),
*   method: (e.ajax.method|undefined),
*   password: (string|undefined),	
*   requestType: (e.ajax.requestType|undefined),
*   success: (function(Object, number, Object)|undefined),
*   timeout: (number|undefined),
*   url: (string),
*   username: (string|undefined),
*   xhr: (Object|undefined)
* }}
*/
ctx.ajaxParams = {
	async: undefined,
	contentType: undefined,
	context: undefined,
	data : undefined,
	dataType: undefined,
	desc: undefined,
	error: undefined,
	header: undefined,
	id: undefined,
	localFile: undefined,
	method: undefined,
	password: undefined,	
	requestType: undefined,
	success: undefined,
	timeout: undefined,
	url: '',
	username: undefined,
	xhr:undefined
};

function _CtxBase64() {};
/**
 * Base 64 encoding/decoding library
 * @class ctx.base64
 * @path ctx.base64
 * @constructor
 **/
ctx.base64 = ( function _CtxBase64( ) {

  var _dom = null;
  var _elem = null;	
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	var _encode =  function(input, isBinary) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
		var bArray = false;
		var length = 0;
		if (typeof input === 'string') {
      if (!isBinary) { input = _utf8_encode(input); }
			length = input.length;
		} else {
			bArray = true;
			length = input.byteLength || input.length;
		}
    while (i < length) {
			if (bArray) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
			} else {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
			}
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  var _decode = function(input, isBinary) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    if (!isBinary) { 
			output = _utf8_decode(output); 
		}
    return output;
  };

  var _utf8_encode = function(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
	
  var _utf8_decode = function(utftext) {
      var string = "";
      var i = 0;
      var c = 0;
			var c1 = 0;
			var c2 = 0;
			var c3 = 0;

      while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }
      return string;
  }
		
	var self = 
	/** @lends ctx.base64 */
	{
		/**
		* Decodes a base 64 string to a buffer
		* @description 
<code javascript>
// decode a base 64 string
var sContent = ctx.base64.decode(ev.data);
</code>
		* @method decode
		* @path ctx.base64.decode
		* @param {string} input base 64input string to be decoded
		* @param {boolean} [isBinary] if true, the input string is considered as raw, and is not encoded/decoded in UTF8
		* @return {*} decoded string or object
		*/
    decode: function(input, isBinary) { 
			ctx.notifyAction('ctx.base64.decode');
			return _decode(input, isBinary); 
		},
			
		/**
		* Decodes a base 64 string to a buffer array
		* @description 
		* 
<code javascript>
</code>
		* @method decodeArrayBuffer
		* @path ctx.base64.decodeArrayBuffer
		* @param {string} input input string or byte array to be encoded in base 64
		* @return {*} decoded array
		*/
    decodeArrayBuffer: function(input) { 
			ctx.notifyAction('ctx.base64.decodeArrayBuffer');
	    var binary_string =  window.atob(input);
	    var len = binary_string.length;
	    var bytes = new Uint8Array( len );
	    for (var i = 0; i < len; i++)        {
	        bytes[i] = binary_string.charCodeAt(i);
	    }
	    return bytes.buffer;
		},

		/**
		* Decodes a base 64 string to a binary stream
		* @description 
<code javascript>
</code>
		* @method decodeStream
		* @path ctx.base64.decodeStream
		* @param {string} input base 64input string to be decoded
		* @return {*} decoded binary stream
		*/
    decodeStream: function(input) { 
			ctx.notifyAction('ctx.base64.decodeStream');
		  _dom = _dom || new ActiveXObject('MSXml2.DOMDocument');
		  _elem = _elem || _dom.createElement('ctxBase64Element');
		  _elem.dataType = 'bin.base64';
		  _elem.text = input;
		  return _elem.nodeTypedValue;
		},

		/**
		* Encodes a string or binary array to a base 64 string
		* @description 
		* 
<code javascript>
var txt = "馆驻 الممل Федера";
var txt64 = ctx.base64.encode(txt); // contains '6aaG6am7INin2YTZhdmF2YQg0KTQtdC00LXRgNCw'
</code>
		* @method encode
		* @path ctx.base64.encode
		* @param {Object|string} input input string or byte array to be encoded in base 64
		* @param {boolean} [isBinary] if true, the input string is considered as raw, and is not encoded/decoded in UTF8
		* @return {string} encoded string
		*/
    encode: function(input, isBinary) { 
			ctx.notifyAction('ctx.base64.encode');
			return _encode(input, isBinary); 
		},
			
		/**
		* Encodes a buffer array to a base 64 string
		* @description 
		* 
<code javascript>
</code>
		* @method encodeArrayBuffer
		* @path ctx.base64.encodeArrayBuffer
		* @param {ArrayBuffer} input input string or byte array to be encoded in base 64
		* @return {string} encoded string
		*/
    encodeArrayBuffer: function(input) { 
			ctx.notifyAction('ctx.base64.encodeArrayBuffer');
	    var binary = '';
	    var bytes = new Uint8Array( input );
	    var len = bytes.byteLength;
	    for (var i = 0; i < len; i++) {
	        binary += String.fromCharCode( bytes[ i ] );
	    }
	    return window.btoa( binary );
		},

		/**
		* Encodes a binary stream to a base 64 string
		* @description 
		* 
<code javascript>
</code>
		* @method encodeStream
		* @path ctx.base64.encodeStream
		* @param {Object} input input binary stream to be encoded in base 64
		* @return {string} encoded string
		*/
	    encodeStream: function(input) { 
				ctx.notifyAction('ctx.base64.encodeStream');
			  _dom = _dom || new ActiveXObject('MSXml2.DOMDocument');
			  _elem = _elem || _dom.createElement('ctxBase64Element');
			  _elem.dataType = 'bin.base64';
			  _elem.nodeTypedValue = input;
			  var ret = _elem.text.replace(/\n/g, "");
				_elem.nodeTypedValue= null;
			  return ret;
			}
		};
	  return self;
}( ) );

function _CtxAjax() {};
/**
 * AJAX management library
 * @class ctx.ajax
 * @path ctx.ajax
 * @constructor
 **/
ctx.ajax = (function _CtxAjax() {

/** \\
*  ===== Methods =====
*/

	/**
	* @param {ctx.ajaxParams} options
	*/
	var _createXHR = function (options) {
		var request = null;
		if (options && (options.requestType == e.ajax.requestType.client)) {
			// *** client type : Web browser call ***
			try {
				request = new ActiveXObject("MSXML2.XMLHTTP");
			} catch (ex) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (ex2) {
					try {
						request = new window.XMLHttpRequest();
					} catch (ex2) {}
				}
			}
		} else {
			// *** server type : Interactive call ***
			try {
				request = new ActiveXObject("WinHttp.WinHttpRequest");
			} catch (ex) {
				//try {
				//	request = new ActiveXObject("MSXML2.ServerXMLHTTP");
				//} catch (ex) {
					try {
						request = new ActiveXObject("MSXML2.XMLHTTP");
					} catch (ex) {
						try {
							request = new ActiveXObject("Microsoft.XMLHTTP");
						} catch (ex2) {
							try {
								request = new window.XMLHttpRequest();
							} catch (ex2) {}
						}
					}
				//}
			}
		}
		return request;
	};
	
	var _getResult = function(options) {
		try {
			var result = "";
			if (options.desc) {
				var res = {};
				res.url = options.url;
				res.status = options.xhr.status;
				res.isBinary = false;
				res.statusText = options.xhr.statusText;
				if (options.localFile)
					res.localFile = options.localFile;
				res.headers = {};
				var sHeaders = options.xhr.getAllResponseHeaders();
				var headers = sHeaders.split('\r\n');
			  for (var i = 0, len = headers.length; i < len; i++) {
					var value = headers[i];
					var pos = value.indexOf(':');
					if (pos > 0) {
						res.headers[value.substring(0, pos)] = value.substring(pos + 1);
					}
			  }
				if (Contextor) {
					var content;				
					if (options.responseType === e.ajax.responseType.arrayBuffer) {
						res.isBinary = true;
						if ('undefined' !==  typeof options.xhr.responseBody) {
							var arr = new VBArray(options.xhr.responseBody).toArray();
							//var arr = options.xhr.responseBody;
							content = ctx.base64.encode(arr, res.isBinary);
							//content = ctx.base64.encodeArrayBuffer(arr);
						} else if (options.xhr.response) {
							var arr = options.xhr.response;
							//var arr = new Uint8Array(options.xhr.response)
							//content = ctx.base64.encode(arr, res.isBinary);
							//content = btoa(String.fromCharCode.apply(null, arr));
							content = ctx.base64.encodeArrayBuffer(arr);
						} else if (options.xhr.responseStream) {
							var arr = options.xhr.responseStream;
							content = ctx.base64.encodeStream(arr);
						} else if (options.xhr.responseText) {
							content = encodeURIComponent(options.xhr.responseText);
							content = unescape(content);
							content = btoa (content);
							//content = ctx.base64.encode(options.xhr.responseText, res.isBinary);
						}
					} else if (options.xhr.responseText) {
						content = options.xhr.responseText;
					}
					var sRes = '';
					if ((typeof JSON !== 'undefined') && (typeof JSON.stringify === 'function')) { 
						sRes = e.prefix.json + JSON.stringify(res);
					} else {
						// no JSON available : send a simplified structure
						sRes = e.prefix.json + '{"isBinary":' + res.isBinary + ',"status":' + res.status + ',"statusText":"' + res.statusText + '"}';
					}
					//Contextor.Event( options.desc.event, options.desc.appliName, "_Empty_", String(options.id), options.desc.appliInst, 0, sRes);
					Contextor.Event( options.desc.event, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, sRes);
					Contextor.Event( options.desc.event, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, content);
				}
			}	else if (options.localFile) {
				// *** if a local filename is provided, save data in this file ***
				if (typeof (options.xhr.responseBody) != "undefined") {
					ctx.fso.file.write(options.localFile, options.xhr.responseBody, e.file.encoding.Binary);
				} else if ((options.xhr.responseType === e.ajax.responseType.arrayBuffer) && (options.xhr.response)) {
					ctx.fso.file.write(options.localFile, options.xhr.response, e.file.encoding.Binary);
				} else {
					ctx.fso.file.write(options.localFile, options.xhr.responseText, e.file.encoding.ASCII); // encoding management ?
				}
				result = options.localFile; // result is the file name
			} else {
				// get content type from the answer
				var dataTypes = options.xhr.getResponseHeader(e.ajax.header.contentType);
				if (dataTypes) {
				  var dataType = dataTypes.split(";")[0];
				  if (dataType) { 
						options.dataType = dataType.toLowerCase(); 
					}
					switch (options.dataType) {
						case e.ajax.content.xml:
						case e.ajax.content.xmlText:
							result = options.xhr.responseXML;
							break;
						case e.ajax.content.json:
						case e.ajax.content.jsonText:
						case e.ajax.content.javascript:
						case e.ajax.content.javascriptText:
						case e.ajax.content.javascriptX:
							//if JSON format, try to parse the result
							try {
								result = ctx.json.parse(options.xhr.responseText);
							} catch (ex) {
								result = options.xhr.responseText;
							}
							break;
						default:
	      			result = options.xhr.responseText;
							break;
					}
				}
			}

			// call success callback
			if (typeof options.success === 'function') { 
				options.success.apply(options.context, [result, options.xhr.status, options.xhr]); 
			}
		} catch (ex) {
			// call error callback
			if (typeof options.error === 'function') { 
				options.error.apply(options.context, [options.xhr, options.xhr.status, ex]); 
			}
			if (Contextor && options.desc && options.id) {
					var sRes = e.prefix.json + '{"errorMessage":"' + ex.message + '"}';
					Contextor.Event( options.desc.event, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, 'error:' + ex.message);
			}
		}
	}

	function _decodeKeyValue(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }
	  return obj;
	}

	function _encodeKeyValue(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      _encodeKeyValue(pairs, key, v);
	    });
	  }
	  pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
	}

	function _buildQuery(obj) {
	  if ((obj != null) && (typeof(obj) === 'object')) {
		  var pairs = [];
		  for (var id in obj) {
		    if (null != obj[id]) {
		      _encodeKeyValue(pairs, id, obj[id]);
	      }
	    }
		  return pairs.join('&');
		} else
			return obj;
	}

	var self = 
	/** @lends ctx.ajax */
	{
		/**
		* Creates and sends an Http Request to call a remote service or download a file
		* @description
		* This function encapsulates HttpRequest management:
		*   * SOAP, REST GET/PUT/POST/DEL request types,
		*   * asynchronous answer analysis,
		*   * header / body formatting (form or json based),
		*   * optional user/login management,
		*   * ...,
		* 
		* The syntax and approach are similar to [[http://www.w3schools.com/jquery/ajax_ajax.asp|jQuery ajax() Method]].
		*
		* The function is called with a '**ctx.ajaxParams**' object :
		* 
		* |< 100% 15% 20% >|
		* | **method** | //{[[lib:common:ctx.enum#eajaxmethod|e.ajax.method]]}//  |type of request ('GET', 'PUT', 'POST', ...). Default is 'GET' |
		* | **url** | //{string}// |URL to be called (mandatory) |
		* | **data** | //{Object}// |data to be sent (optional) |
		* | **async** | //{boolean}// |value indicating whether the request should be handled asynchronous or not. Default is true |
		* | **contentType** | //{[[lib:common:ctx.enum#eajaxcontent|e.ajax.content]]|string}// | data type to be sent : 'form', 'json', 'xml', 'html', ... Default is 'json' |
		* | **dataType** | //{[[lib:common:ctx.enum#eajaxcontent|e.ajax.content]]}// | data type expected for the response : 'form', 'json', 'xml', 'html', ... Default is 'html' |
		* | **id** | //{number}// |identifier (optional) |
		* | **localFile** | //{string}// |local file URL, only used when downloading a file |
		* | **username** | //{string}// |user name (optional) |
		* | **password** | //{string}// |password (optional) |
		* | **timeout** | //{number}// |local timeout (in milliseconds) for the request (optional) |
		* | **header** | //{Array<Object>}// | set of headers definitions to be included in the request (optional). Format is: \\ header: [\\  { type: e.ajax.header.cacheControl, value: e.ajax.cache.noCache },\\  { type: ..., value: ... }\\ ]\\ (see [[lib:common:ctx.enum#eajaxheader|e.ajax.header]] and [[lib:common:ctx.enum#eajaxcache|e.ajax.cache]]) |
		* | **requestType** | //{[[lib:common:ctx.enum#eajaxrequesttype|e.ajax.requestType]]}// |request type (client (Web browser JS engine) or server (Interactive JS engine)). Default is 'e.ajax.requestType.server' (optional) |
		* | **responseType** | //{[[lib:common:ctx.enum#eajaxresponsetype|e.ajax.responseType]]}// |data type of the response associated with the request. Default is (e.ajax.responseType.DOMString) (optional) |
		* | **context** | //{Object}// |"this" value for the callback functions (optional) |
		* | **success** | //{function(Object, number, Object)}// |callback called when the call is finished successfully. Format is: '**success(result, status, xhr)**'. Mandatory to get a result|
		* | **error** | //{function(Object, number, Object)}// |callback called in case of error (optional). Format is: '**error(xhr, status, error)**'. |
		* 
		* \\
		* __Ex. :__ **Search in Salesforce proxy server all accounts in 'Technology' industry**
		* 
<code javascript>
var data = {
  filter: "Industry='Technology'",
  sort: '-Name'
}
ctx.ajax.call({
  method: e.ajax.method.get, // it is implicit
  url: 'https://salesforceproxy.com/accounts',
  data: data,
  contentType: e.ajax.content.form, // input data are added in URL: '...?...&...'
  success: function(res, status, xhr) {
    // res contains an array of accounts
    for (var i in res) {
      var account = res[i];
      //...
    }
  },
  error: function(res) {
    ctx.log(' ctx.ajax.call  error: ' + res);
  }
});
</code>
		* @method call
		* @path ctx.ajax.call
		* @param {ctx.ajaxParams} params Request parameters
		* @return {ctx.ajaxParams} Request parameters
		*/
		call : function (params) {
			try {
				ctx.notifyAction('ctx.ajax.call');
			} catch (ex) { }
			params = params || {};
			var _timeoutTimer = 0;
			/** @type {ctx.ajaxParams} */var options = {
				async: true,
				contentType: e.ajax.content.form,
				context: null,
				data : undefined,
				dataType: e.ajax.content.html,
				desc: undefined,
				error: undefined,
				header: [
					{ type: e.ajax.header.cacheControl, value: e.ajax.cache.noCache }
				],
				id: 0,
				localFile: '',
				method: e.ajax.method.get,
				password: '',	
				requestType: e.ajax.requestType.server,
				responseType: e.ajax.responseType.none,
				success: undefined,
				timeout: undefined,
				url: '',
				username: '',
				xhr:undefined
			};
			for (var key in options) {
				if(params[key] !== undefined) {
					options[key] = params[key];
				}
			}
			if(!options.url) 
				return options; // no url provided

			try {
				// create HttpRequest
				options.xhr = _createXHR(options);		

				var isHttp = (String(options.url).toLowerCase().indexOf('http') >= 0);

				//Kill the Cache problem in IE.
				//var now = "uid=" + new Date().getTime();
				//options.url += (options.url.indexOf("?") >= 0) ? "&" : "?";
				//options.url += now;
				
				// for 'form' content, use URL encoding
				var values;

				if (options.method == e.ajax.method.post) {
					var parts = options.url.split("\?");
					if (parts[0]) { options.url = parts[0]; }					
					if (parts[1]) { values = parts[1]; }
				}

				if (options.data) {
					if (typeof(options.data) === 'object') {
						if (options.contentType == e.ajax.content.form) {
							values = _buildQuery(options.data);
						}	else {
							values = ctx.json.stringify(options.data);
						}
					} else if (typeof options.data === 'string') {
						values = options.data;
					}
				}
				
				var body; // request body (Json / encoding)
				var query; // query : url?...&...
				if (options.method == e.ajax.method.get) {
					query = values;
				} else {
					body = values;
				}
				
				if (query) {
					options.url = options.url + '?' + query;
				}

				// open request
			  if (options.username || options.password) {
					options.xhr.open(options.method, options.url, options.async, options.username || '', options.password || '');
			  } else {
					options.xhr.open(options.method, options.url, options.async);
			  }

				try {
					if ((options.xhr.responseType !== undefined) && options.responseType) {
						options.xhr.responseType = options.responseType;
					}
				} catch (ex) { }
				
				// set headers

//					//if (options.username) _xhr.setRequestHeader('x-user', options.username);
//					//if (options.password) _xhr.setRequestHeader('x-pass', options.password);
//				//_xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
//				options.xhr.setRequestHeader(e.ajax.header.contentType, options.contentType);
//				ctx.each(options.header, function(id, value) {
//					options.xhr.setRequestHeader(id, value);
//				});
				for (var id = 0; id < options.header.length; id++) {
					options.xhr.setRequestHeader(options.header[id].type, options.header[id].value);
				};
				// Timeout
				if ( options.async && options.timeout && options.timeout > 0 ) {
					_timeoutTimer = window.setTimeout( function() {
						options.xhr.abort( "timeout" );
						// call error callback
						if (typeof options.error === 'function') { 
							options.error.apply(options.context, [options.xhr, options.xhr.status, null]); 
						}
					}, options.timeout );
				}

				// manage state change
				options.xhr.onreadystatechange = function () {
					var _opt = options;
					if (options.xhr.readyState == 4) {
						// Clear timeout if it exists
						if ( _timeoutTimer ) {
							clearTimeout( _timeoutTimer );
						}

						// normal case : status == 200, or status == 0 for a localhost HTTP request
						if ((options.xhr.status == 200) || ((!isHttp) && (options.xhr.status == 0))) {
							_getResult(options);
						} else {
							// call error callback
							if (typeof options.error === 'function') { 
								options.error.apply(options.context, [options.xhr, options.xhr.status, null]); 
							}
						}
					}
				}
				
				// update body length
				if (body && body.length) { options.xhr.setRequestHeader("Content-length", body.length); }			
				//options.xhr.setRequestHeader("Connection", "close");
				
				// send the request
				options.xhr.send(typeof body !== 'undefined' ? body : null);
			} catch (ex) {
				// call error callback
				if (options.error && (typeof options.error === 'function')) { 
					options.error.apply(options.context, [options.xhr, options.xhr.status, ex]); 
				}
			}
			return options;
		}
		
//		/**
//		* Initializes proxy data
//		* @description
//		* __Ex.:__
//<code javascript>
//ctx.ajax.initProxy('jsmith', 'xxxxxx');
//</code>
//		* @method initProxy
//		* @throws {Error}
//		* @path ctx.ajax.initProxy
//		* @param {string} [user] user name (if omitted, user and password are read in registry)
//		* @param {string} [password] password
//		*/
//		initProxy : function(user, password) {
//			ctx.notifyAction('ctx.ajax.initProxy');
//			try{
//				_user = user;
//				_password = password || '';
////				if (!_user) {
////					// no user defined, read login/password in registry and decrypt
////					_shell = _shell || new ActiveXObject("WScript.Shell");
////					_user = ctx.cryptography.unprotect(_shell.RegRead(_root + "\\" + _site + "\\user"));
////					_password = ctx.cryptography.unprotect(_shell.RegRead(_root + "\\" + _site + "\\password"));
////				} else {
////					// user defined, encrypt and write login/password in registry
////					_shell = _shell || new ActiveXObject("WScript.Shell");
////					_shell.RegWrite(_root + "\\" + _site + "\\user", ctx.cryptography.protect(_user), "REG_SZ");
////					_shell.RegWrite(_root + "\\" + _site + "\\password", ctx.cryptography.protect(_password), "REG_SZ");					
////				}
//			} catch (ex) {	}
//		}
	};
	return self;
})();

	/**
	 * Module for Clipboard management
	 * @class ctx.clipboard
	 * @path ctx.clipboard
	 * @constructor
	 */
	ctx.clipboard = (function() {
		var self = 
		/** @lends ctx.clipboard */
		{
			/** \\
			* ===== Methods =====
			*/

			/**
			* Gets clipboard textual content 
			* @description
			* __Ex.:__
<code javascript>
var text = ctx.clipboard.get();
</code>
			* @method get
		  * @path ctx.clipboard.get
			* @return {string} text clipboard content
			*/
			get : function () {
				var desc = ctx.getDescriptor();
				return ctx.verbExec(desc, 'ctx.clipboard.get', 'SETVALUE', {
						ZoneCtx : '_Work0_',
						Value : '_Clipboard_'
					});
			},
			/**
			* Sets clipboard textual content 
			* @description
			* __Ex.:__
<code javascript>
ctx.clipboard.set('Hello world');
</code>
			* @method set
		  * @path ctx.clipboard.set
			* @param {string} value clipboard content
			* @return {string} execution result
			*/
			set : function (value) {
				var desc = ctx.getDescriptor();
				return ctx.verbExec(desc, 'ctx.clipboard.set', 'SETVALUE', {
						ZoneCtx : '_Clipboard_',
						Value : value
					});
			},
		  /**
		  * Enables/disables the monitoring of the 'Windows clipboard'
			* @description
			* Once enabled, an event is sent to the application or process each time the clipboard content is modified
			* 
			* __Ex.:__
<code javascript>
// enable clipboard tracking
ctx.clipboard.enableTrack(true, 'evClipboard');
</code>
		  * @method enableTrack
		  * @path ctx.clipboard.enableTrack
		  * @param {boolean} enable enables ('true') or disables ('false') clipboard monitoring 
		  * @param {ctx.event} [event] event sent to the application or process each time the clipboard content is modified ('evClipboard' if omitted)
		  * @return {string} result value
		  */
		  enableTrack : function (enable, event) {
				var process = (event ? event.appli : null) || GLOBAL;
				var name = (event ? event.name : null) || process.addEvent({evClipboard: ''}).name;
		    var desc = process.getObjectDescriptor();
		    return ctx.verbExec(desc, 'enableTrack', 'TRACKCLIPBOARD', {
		      Value: (enable ? 'Y' : 'N'),
		      Event: name
		    });
		  }
		};
		return self;
	})();

	/**
	 * Module for Context management
	 * @class ctx.context
	 * @path ctx.context
	 * @constructor
	 */
	ctx.context = (function() {
		var _getXPath = function (xPath) {
			if (!xPath) {
				xPath = "*"; // default global xPath
				if (ctx.currentEvent && ctx.currentEvent.appli) {
					xPath = '//' + ctx.currentEvent.appliName;
					if (ctx.currentEvent.appliInst >= 0) {
						xPath += '[WkMng_Running/Instance="' + ctx.currentEvent.appliInst + '"]';	
					}
				}
			}
			return xPath;
		};
		
		var self = 
		/** @lends ctx.context */
		{
			/** \\
			* ===== Methods =====
			*/
			
			/**
			* Adds a context node
			* @method addCtx
			* @path ctx.context.addCtx
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} model XML string as a model
			* @param {string} iModele TBC
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {string} result value
			*/
			addCtx : function (variable, model, iModele, xPath) {
				ctx.notifyAction('ctx.context.addCtx');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtAddBloc(variable, model, iModele, xPath, "");
				}
				return res;
			},

			/**
			* Deletes a context node
			* @description
			* __Ex.:__
<code javascript>
var obj = ctx.context.delCtx('//GLOBAL/User');
</code>
			* @method delCtx
			* @path ctx.context.delCtx
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {string} result value
			*/
			delCtx : function (variable, xPath) {
				ctx.notifyAction('ctx.context.delCtx');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtAddBloc(variable, xPath, "");
				}
				return res;
			},

			/**
			* Tests if an XML node exists, in a context tree
			* @description
			* __Ex.:__
<code javascript>
if (ctx.context.exist('//PROCESS[Name="GLOBAL"]')) { ... }
</code>
			* @method exist
			* @path ctx.context.exist
			* @param {string} xPath node xPath
			* @return {boolean} result : 'true' if node exists
			*/
			exist : function (xPath) {
				var desc = ctx.getDescriptor();
				xPath = _getXPath(xPath);
				var res = ctx.verbExec(desc, 'exist', 'EXIST', {
						ZoneCtx : xPath
					}, '<SETVALUE ZoneCtx="_Work0_" Value="1"/>', true);
				ctx.notifyAction('ctx.context.exist', res == '1' ? true : false);
				return (res == '1' ? true : false);
			},

			/**
			* Gets a context variable
			* @description
			* __Ex.:__
<code javascript>
ctx.options.currentURL = ctx.context.get('//WkMng_Info/CurrentURL');
</code>
			* @method get
			* @path ctx.context.get
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {string} read value
			*/
			get : function (variable, xPath) {
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtGetVal(variable, xPath, "");
				}
				ctx.notifyAction('ctx.context.get', res);
				return res;
			},
			
			/**
			* Gets a context node as a node
			* @description
			* __Ex.:__
<code javascript>
var obj = ctx.context.getCtx('//GLOBAL/Xc_MessBoxHtml');
</code>
			* @method getCtx
			* @path ctx.context.getCtx
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {Object} result node
			*/
			getCtx : function (variable, xPath) {
				ctx.notifyAction('ctx.context.getCtx');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtGetCtx(variable, xPath, "");
				}
				return res;
			},

			/**
			* Gets a context node as an IXMLNode object
			* @description
			* __Ex.:__
<code javascript>
var obj = ctx.context.getNode('//GLOBAL/User');
</code>
			* @method getNode
			* @path ctx.context.getNode
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {Node} XML node object
			*/
			getNode : function (xPath) {
				ctx.notifyAction('ctx.context.getNode');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.WkMgSelSingleNode(xPath);
				}
				return res;
			},

			/**
			* Gets a node as an IXMLNode object, from the project XML tree
			* @description
			* __Ex.:__
<code javascript>
var obj = ctx.context.getProject('//PROCESS[Name="GLOBAL"]');
</code>
			* @method getProject
			* @path ctx.context.getProject
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {Node} XML node object
			*/
			getProject : function (xPath) {
				ctx.notifyAction('ctx.context.getProject');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.WkMgGetPscNode(xPath);
				}
				return res;
			},

			/**
			* Sets a context variable
			* @description
			* __Ex.:__
<code javascript>
ctx.context.set('//GLOBAL/Name', 'Ford');
</code>
			* @method set
			* @path ctx.context.set
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} value value to be set
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {string} result value
			*/
			set : function (variable, value, xPath) {
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtSetVal(variable, value, xPath, "");
				}
				ctx.notifyAction('ctx.context.set', res);
				return res;
			},
		
			/**
			* Sets a context node
			* @description
			* __Ex.:__
<code javascript>
var obj = ctx.context.setCtx('//GLOBAL/User', 'XML', '<User><Name></Name><Firstname></Firstname></User>');
</code>
			* @method setCtx
			* @path ctx.context.setCtx
			* @param {string} variable variable name (can contain a relative or absolute xPath)
			* @param {string} action type of creation (TBC)
			* @param {string} model XML string as a model
			* @param {string} iModele TBC
			* @param {string} [xPath] optional xPath ('*' if omitted)
			* @return {string} result value
			*/
			setCtx : function (variable, action, model, iModele, xPath) {
				ctx.notifyAction('ctx.context.setCtx');
				var res = '';
				xPath = _getXPath(xPath);
				if (ctx.engineStarted) {
					res = ctx.wkMng.CtxtSetCtx(variable, action, model, iModele, xPath, "");
				}
				return res;
			}

		};
		return self;
	})();


	/**
	 * Module for Cryptography management
	 * @class ctx.cryptography
	 * @path ctx.cryptography
	 * @constructor
	 */
	ctx.cryptography = (function() {
		var self = 
		/** @lends ctx.cryptography */
		{
/** \\
* ===== Methods =====
*/
			/**
			* Decrypts a cyphered file to a clear file using a private key 
			* @description
			* __Ex.:__
<code javascript>
var res = ctx.cryptography.decryptFileToFile(inputFile, outputFile, "", 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
			* @method decryptFileToFile
			* @path ctx.cryptography.decryptFileToFile
			* @param {string} inputFile input file
			* @param {string} outputFile output file
			* @param {string} password optional password value used if cyphering is enabled
			* @param {string} keyContainer key container name
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} result
			*/
			decryptFileToFile : function (inputFile, outputFile, password, keyContainer, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptDecryptFileToFile(inputFile, outputFile, password, keyContainer, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.decryptFileToFile', res);
				return res;
			},
			
			/**
			* Decrypts a cyphered file to a clear string using a private key 
			* @description
			* __Ex.:__
<code javascript>
var str = ctx.cryptography.decryptFileToString(inputFile, 'myPassword', 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
			* @method decryptFileToString
			* @path ctx.cryptography.decryptFileToString
			* @param {string} inputFile input file
			* @param {string} password optional password value used if cyphering is enabled
			* @param {string} keyContainer key container name
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} clear value
			*/
			decryptFileToString : function (inputFile, password, keyContainer, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptDecryptFileToString(inputFile, password, keyContainer, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.decryptFileToString', res);
				return res;
			},

			/**
			* Decrypts a message using a certificate or key container
			* @description
			* __Ex.:__
<code javascript>
var str = ctx.cryptography.decryptMessage(
  crypt, 
  'My', 
  'Ctxt exchange', 
  '', 
  e.cryptography.algorithm.PKCS_12, 
  e.cryptography.storeLocation.LocalMachine);
});
</code>
			* @method decryptMessage
			* @path ctx.cryptography.decryptMessage
			* @param {string} input input value
			* @param {string} store certificate store
			* @param {string} certificate certificate name
			* @param {string} keyContainer key container name
			* @param {e.cryptography.algorithm} algorithm algorithm name (see [[lib:common:ctx.enum#ecryptographyalgorithm|e.cryptography.algorithm]])
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} decrypted value (null if failed)
			*/
			decryptMessage : function (input, store, certificate, keyContainer, algorithm, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptDecryptMessage(input, store, certificate, keyContainer, algorithm, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.decryptMessage', res);
				return res;
			},
			
			/**
			* Encrypts a clear file to a cyphered file using a public key 
			* @description
			* __Ex.:__
<code javascript>
var res = ctx.cryptography.encryptFileToFile(inputFile, outputFile, "", 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
			* @method encryptFileToFile
			* @path ctx.cryptography.encryptFileToFile
			* @param {string} inputFile input file
			* @param {string} outputFile output file
			* @param {string} password optional password value used if cyphering is enabled
			* @param {string} keyContainer key container name
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} result
			*/
			encryptFileToFile : function (inputFile, outputFile, password, keyContainer, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptEncryptFileToFile(inputFile, outputFile, password, keyContainer, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.encryptFileToFile', res);
				return res;
			},
					
			/**
			* Encrypts a message using a certificate or key container
			* @description
			* __Ex.:__
<code javascript>
var str = "......";
var crypt = ctx.cryptography.encryptMessage(
  str, 
  'My', 
  'Ctxt exchange', 
  '', 
  e.cryptography.algorithm.PKCS_12, 
  e.cryptography.storeLocation.LocalMachine);
});
</code>
			* @method encryptMessage
			* @path ctx.cryptography.encryptMessage
			* @param {string} input input value
			* @param {string} store certificate store
			* @param {string} certificate certificate name
			* @param {string} keyContainer key container name
			* @param {e.cryptography.algorithm} algorithm algorithm name (see [[lib:common:ctx.enum#ecryptographyalgorithm|e.cryptography.algorithm]])
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} encrypted value (null if failed)
			*/
			encryptMessage : function (input, store, certificate, keyContainer, algorithm, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptEncryptMessage(input, store, certificate, keyContainer, algorithm, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.encryptMessage', res);
				return res;
			},
			
			/**
			* Encrypts a clear string to a cyphered file using a public key 
			* @description
			* __Ex.:__
<code javascript>
var str = "......";
var res = ctx.cryptography.encryptStringToFile(str, outputFile, 'myPassword', 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
			* @method encryptStringToFile
			* @path ctx.cryptography.encryptStringToFile
			* @param {string} input input file
			* @param {string} outputFile output file
			* @param {string} password optional password value used if cyphering is enabled
			* @param {string} keyContainer key container name
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} result
			*/
			encryptStringToFile : function (input, outputFile, password, keyContainer, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptEncryptStringToFile(input, outputFile, password, keyContainer, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.encryptStringToFile', res);
				return res;
			},
			
			/**
			* Encrypts a value using a key local to the user session
			* @description
			* __Ex.:__
<code javascript>
var cyphered = ctx.cryptography.protect(obj.login, password);
</code>
			* @method protect
			* @path ctx.cryptography.protect
			* @param {string} input clear input value
			* @param {string} [password] optional password value used to encrypt
			* @return {string} cyphered value
			*/
			protect : function (input, password) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptProtect(input, password);
				}
				ctx.notifyAction('ctx.cryptography.protect', res);
				return res;
			},

			/**
			* Signs a message using a certificate or key container
			* @description
			* __Ex.:__
<code javascript>
var str = "......";
var crypt = ctx.cryptography.signMessage(
  str, 
  'My', 
  'Ctxt exchange', 
  '', 
  e.cryptography.algorithm.PKCS_12, 
  e.cryptography.storeLocation.LocalMachine);
});
</code>
			* @method signMessage
			* @path ctx.cryptography.signMessage
			* @param {string} input input value
			* @param {string} store certificate store
			* @param {string} certificate certificate name
			* @param {string} keyContainer key container name
			* @param {e.cryptography.algorithm} algorithm algorithm name (see [[lib:common:ctx.enum#ecryptographyalgorithm|e.cryptography.algorithm]])
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} signed value (null if failed)
			*/
			signMessage : function (input, store, certificate, keyContainer, algorithm, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptSignMessage(input, store, certificate, keyContainer, algorithm, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.signMessage', res);
				return res;
			},

			/**
			* Decrypts a value using a key local to the user session
			* @description
			* __Ex.:__
<code javascript>
// read cyphered entry
obj.login = ctx.cryptography.unprotect(cyphered, password);
</code>
			* @method unprotect
			* @path ctx.cryptography.unprotect
			* @param {string} input cyphered input value
			* @param {string} [password] optional password value used if decrypt
			* @return {string} clear value
			*/
			unprotect : function (input, password) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptUnprotect(input, password);
				}
				ctx.notifyAction('ctx.cryptography.unprotect', res);
				return res;
			},

			/**
			* Verifies a signed message using a certificate or key container
			* @description
			* __Ex.:__
<code javascript>
var str = ctx.cryptography.verifySignedMessage(
  crypt, 
  'My', 
  'Ctxt exchange', 
  '', 
  e.cryptography.algorithm.PKCS_12, 
  e.cryptography.storeLocation.LocalMachine);
});
</code>
			* @method verifySignedMessage
			* @path ctx.cryptography.verifySignedMessage
			* @param {string} input input value
			* @param {string} store certificate store
			* @param {string} certificate certificate name
			* @param {string} keyContainer key container name
			* @param {e.cryptography.algorithm} algorithm algorithm name (see [[lib:common:ctx.enum#ecryptographyalgorithm|e.cryptography.algorithm]])
			* @param {e.cryptography.storeLocation} storeLocation store location (see [[lib:common:ctx.enum#ecryptographystorelocation|e.cryptography.storeLocation]])
			* @return {string} clear value (null if failed)
			*/
			verifySignedMessage : function (input, store, certificate, keyContainer, algorithm, storeLocation) {
				var res = '';
				if (ctx.engineStarted) {
					res = ctx.wkMng.CryptVerifySignedMessage(input, store, certificate, keyContainer, algorithm, storeLocation);
				}
				ctx.notifyAction('ctx.cryptography.verifySignedMessage', res);
				return res;
			}
		}
		return self;
	})();

	/**
	* Class to store free data in objects
	* @class ctx.dataManager
	* @path ctx.dataManager
	* @constructor
	* @param {ctx.dataManager|Object} [obj] optional object or dataManager for initialization
	* @param {string} [name] class name (if omited, a unique name is generated)
	* @param {boolean} [locked] if 'true', no attribute can be added after initialization
	*/
	ctx.dataManager = function (obj, name, locked) {
	  if (!(this instanceof ctx.dataManager))
	    return new ctx.dataManager(obj, name, locked); // in case 'new' was not used
		/** class type
		* @ignore
		* @const 
		* @path ctx.dataManager.ctxType
		* @property {string} */ this.ctxType = 'ctx.dataManager';
		var _ctxName = name || (obj && obj.getCtxName && obj.getCtxName()) || 'class_' + ctx.uuid();
		// root data node
		//var _root = this;
		// model 
		var _model = obj;
		// locked state 
		var _locked = locked || false;

/** \\
* ===== Methods =====
*/
//		/** [Internal usage]
//		 * Returns the short description for serialization
//		 * @ignore
//		 * @method ctxShort
//		 * @path ctx.dataManager.ctxShort
//		 */
//		this.ctxShort = function() {
//			return undefined; // no serialization
//		}

		/**
		* Creates an instance of the data manager object
		* @description
		* __Ex.:__
		* <code javascript>
		* var contact = contactData.create();
		* </code>
  	* @method create
		* @path ctx.dataManager.create
  	* @param {Object} [obj] optional initialization data
		* @return {ctx.dataManager} returned object or value
  	*/
		this.create = function (obj) {
			var data = new ctx.dataManager(this);
			if (obj) { data.set(obj); }
			return data;
		}
		
		/**
		* Tests if a value or set of values exists in the data object
		* @description
		* __Ex.:__
		* <code javascript>
		* if (ScnApp.data.exist("//Data_Popup1", e.data.pathType.XPath)) { ... }
		* </code>
  	* @method exist
		* @path ctx.dataManager.exist
  	* @param {string} [path] path
  	* @param {e.data.pathType} [pathType] data path type (see [[lib:common:ctx.enum#edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
		* @return {boolean} returned object or value
  	*/
		this.exist = function (path, pathType) {
			var parentAppli = null;
			if ((this.appliName) && (this.appliInst !== undefined) && ctx.app[this.appliName]) {
				if (this.appliInst == -1)
					parentAppli = ctx.app[this.appliName];
				else
					parentAppli = ctx.app[this.appliName][this.appliInst];
			}
			/** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getObjectDescriptor());
			if (desc && desc.appli) {
				parentAppli = desc.appli;
			}
			return ctx.exist(parentAppli, path, pathType);
		}
		
		/**
		* Deletes a node in the data object
		* @description
		* __Ex.:__
		* <code javascript>
		* GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
		* </code>
  	* @method del
		* @path ctx.dataManager.del
  	* @param {string} [path] target path or object
  	* @param {e.data.pathType} [pathType] data path type (see [[lib:common:ctx.enum#edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
  	* @return {*} modified object
  	*/
		this.del = function (path, pathType) {
			return this.set('', path, e.data.format.CTX, e.data.initType.DEL, pathType);
		}
		
		/**
		* Returns a value or set of values in the data object
		* @description
		* __Ex.:__
		* <code javascript>
		* var val = ScnApp.data.get("//Data_Popup1", e.data.pathType.XPath);
		* </code>
  	* @method get
		* @path ctx.dataManager.get
  	* @param {string} [path] path
  	* @param {e.data.pathType} [pathType] data path type (see [[lib:common:ctx.enum#edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
		* @param {e.data.format} [format] output data format (see [[lib:common:ctx.enum#edataformat|e.data.format]])
		* @return {*} returned object or value
  	*/
		this.get = function (path, pathType, format) {
			var parentAppli = null;
			if ((this.appliName) && (this.appliInst !== undefined) && ctx.app[this.appliName]) {
				if (this.appliInst == -1)
					parentAppli = ctx.app[this.appliName];
				else
					parentAppli = ctx.app[this.appliName][this.appliInst];
			}
			/** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getObjectDescriptor());
			if (desc && desc.appli) {
				parentAppli = desc.appli;
			}
			return ctx.get(parentAppli, path, pathType, format);
		}
		
		/**
		* Returns Data Manager class name
		* @ignore
  	* @method getCtxName
		* @path ctx.dataManager.getCtxName
		* @return {string} class name
  	*/
		this.getCtxName = function () {
			return _ctxName;
		}

		/**
		* Merges a value or set of values in the data object
		* @description
		* __Ex.:__
		* <code javascript>
		* var contactClass = new ctx.dataManager({});
		* var contact = contactClass.create();
		* // contact :
		* //   FirstName = '';
		* //   LastName = '';
		* //   Mobile = '';
		* //   Address = '';
		* contact.FirstName = 'John';
		* contact.LastName = 'Smith';
		* ... 
		* contact.reset( ); 
		* </code>
  	* @method reset
		* @path ctx.dataManager.reset
  	* @return {*} modified object
  	*/
		this.reset = function () {
			return this.set(_model || {});
		}
		
		/**
		* Merges a value or set of values in the data object
		* @description
		* __Ex.:__
		* <code javascript>
		* GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
		* </code>
  	* @method set
		* @path ctx.dataManager.set
  	* @param {Object|string} data object or string containing data to be set
  	* @param {string} [path] target path or object
		* @param {e.data.format} [format] data format type (see [[lib:common:ctx.enum#edataformat|e.data.format]])
		* @param {e.data.initType} [initType] data initialisation type (see [[lib:common:ctx.enum#edatainittype|e.data.initType]])
  	* @param {e.data.pathType} [pathType] data path type (see [[lib:common:ctx.enum#edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
		* @param {boolean} [locked] if 'true', no attribute can be added after initialization
  	* @return {*} modified object
  	*/
		this.set = function (data, path, format, initType, pathType, locked) {
			var parentAppli = null;
			if ((this.appliName) && (this.appliInst !== undefined) && ctx.app[this.appliName]) {
				if (ctx.app[this.appliName].isProcess || (this.appliInst == -1))
					parentAppli = ctx.app[this.appliName];
				else
					parentAppli = ctx.app[this.appliName][this.appliInst];
			}
			/** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getObjectDescriptor());
			if (desc && desc.appli) {
				parentAppli = desc.appli;
			}
			var res = ctx.set(data, parentAppli || this, path, format, initType, pathType, locked || _locked);
			return res;
		}

		if (obj) { 
			this.set(obj, '', undefined, undefined, undefined, _locked); 
			if (locked === undefined) _locked = true; // if there is an initialization object, prevent adding further attributes by default
		}
		return this;
	};

	/**
	* Class to store multi-lingual labels in objects (applications, ...)
	* @class ctx.labelManager
	* @path ctx.labelManager
	* @constructor
	* @advanced
	*/
	ctx.labelManager = function () {
		e.language = e.language || { English: 'en'};
	  var _defLang = e.language.English; // default language
	  var _lang = e.language.English; // current language
	  /** @type {Object} */var _tab = {}; // map of languages
	  /** @type {Object} */var _labels = {}; // map of labels
	  /** class type
		* @ignore
		* @const 
		* @path ctx.labelManager.ctxType
		* @property {string} */ this.ctxType = 'ctx.labelManager';

/** \\
* ===== Methods =====
*/
		/** [Internal usage]
		 * Returns the short description for serialization
		 * @ignore
		 * @method ctxShort
		 * @path ctx.labelManager.ctxShort
		 */
		this.ctxShort = function() {
			return undefined; // no serialization
		}

		/**
    * Sets an object content in the labelManager
    * @method _setObject
		* @path ctx.labelManager._setObject
    * @ignore
    * @private
    * @param {Object} obj object
    * @param {Object} dest destination object
    * @param {string} lang language
    */
    var _setObject = function (obj, dest, lang) {
        for (var id in obj) {
            if (typeof obj[id] == 'object') {
                if (obj[id][lang]) {
                    // something like '{en:'...', fr:'...'}' : get label
                    dest[id] = obj[id][lang];
                } else if (obj[id][_defLang]) {
                    // something like '{en:'...'}' : get label with default language if target and source language is missing
                    if (!dest[id]) { dest[id] = obj[id][_defLang]; }
                } else {
                    // check that 'id' is not a language name ('en', 'fr', ...). If it is, skip it
                    if (!_tab[id]) {
                        // sub-labels: something like '{label1:{en:'...', fr:'..'}, label2:{en:'...', fr:'..'}, ...' : recursive call
                        dest[id] = dest[id] || {};
                        _setObject(obj[id], dest[id], lang);
                    }
                }
            } else if (typeof obj[id] == 'string') {
                dest[id] = obj[id];
            }
        }
    }
		
    /**
    * Gets a label from its identifier
		* @description
		* __Ex.:__
<code javascript>
var txt = GLOBAL.labels.get('mainTitle', e.language.English);
</code>
    * @method get
		* @path ctx.labelManager.get
    * @param {string} id label identifier
    * @param {string} [lang] language (default language if omitted)
    * @return {string} label 
    */
    this.get = function (id, lang) {
			ctx.notifyAction('ctx.labelManager.get');
      if (!lang) lang = _lang;
      return (_tab[lang] ? _tab[lang][id] : _tab[_defLang][id]);
    }
		
    /**
    * Sets a set of labels
		* @description
		* __Ex.:__
<code javascript>
// manage mono-language
GLOBAL.labels.buttons.set( { ok:'OK', cancel:'Cancel', close:'Close' });
// manage multi-languages
GLOBAL.labels.buttons.set( { ok: {en:'OK', fr:'OK'}, cancel: {en:'Cancel', fr:'Annuler'}, close: {en:'Close', fr:'Fermer' } } );
</code>
    * @method set
		* @path ctx.labelManager.set
    * @param {Object} obj object
    */
		this.set = function (obj) {
			ctx.notifyAction('ctx.labelManager.set');
    	for (var lang in _tab) {
				_setObject(obj, _tab[lang], lang);
			}
			// reinitialize current language definitions
			this.setLanguage(_lang);
		}
		/**
		* Adds supplementary languages in the label container
		* @description
		*
		* __Ex.:__
<code javascript>
GLOBAL.labels.addLanguage({English: 'en', French: 'fr'}); // adds 'English' and 'French' languages
</code>
		* @method addLanguage
		* @path ctx.labelManager.addLanguage
		* @param {Object} obj language abbreviation and name, ex.: {English: 'en', French: 'fr'}
		*/
    this.addLanguage = function (obj) {
			//ctx.notifyAction('ctx.labelManager.addLanguage');
			if (typeof obj === 'object') {
				for (var lang in obj) {
					var id = obj[lang];
		      if (id && (!_tab[id])) {
						e.language[lang] = id; // add enumeration
						_tab[id] = {};
						_labels[id] = lang;
					}
				}
			}
    }

		/**
    * Gets label list
		* @description
		*
		* __Ex.:__
<code javascript>
var list = GLOBAL.labels.getLabels(); 
// returns { 'en': 'English', 'fr': 'Français', ... };
</code>
    * @method getLabels
		* @path ctx.labelManager.getLabels
    * @return {Object} label list
    */
    this.getLabels = function () {
			return _labels;
    }
		
    /**
    * Sets the current language
		* @description
		* __Ex.:__
<code javascript>
GLOBAL.labels.setLanguage(e.language.English); // selects english as current language
</code>
    * @method setLanguage
		* @path ctx.labelManager.setLanguage
		* @throws {Error}
    * @param {string} lang language
    */
    this.setLanguage = function (lang) {
			ctx.notifyAction('ctx.labelManager.setLanguage');
      if (lang) { _lang = lang; }
      if (!_tab[_lang]) { throw new Error(e.error.InvalidArgument, 'ctx.labelManager.setLanguage: unknown language \'' + lang + '\''); }
      if (_lang && _tab[_lang]) {
        for (var id in _tab[_lang]) {
          this[id] = this.get(id);
        }
      }
    }

    /**
    * Gets the current language
		* @description
		* __Ex.:__
<code javascript>
var lang = GLOBAL.labels.getLanguage(); // lang = 'en'
</code>
    * @method getLanguage
		* @path ctx.labelManager.getLanguage
    * @return {string} current language
    */
    this.getLanguage = function () {
      return _lang;
    }

    // pre-define english / french / german languages
    this.addLanguage({ English: 'en', French: 'fr', German: 'de' });
	};

	/**
	 * Module for Mouse management
	 * @class ctx.mouse
	 * @path ctx.mouse
	 * @constructor
	 */
	ctx.mouse = (function() {
			/**
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @return {ctx.position} position object
			*/
		var _calculatePosition = function(X, Y) {
			var pos;
			if (X instanceof ctx.position) {
				pos = X;
			} else {
				pos = new ctx.position();
				pos.x = X;
				pos.y = Y;
			}
			return pos;
		}

		var self = 
		/** @lends ctx.mouse */
		{
/** \\
* ===== Methods =====
*/
			/**
			* Triggers a mouse left click at a given position
			* @description
			*
			* __Ex.:__
<code javascript>
// double click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.click(pos, 0, true);
</code>
			* @method click
			* @path ctx.mouse.click
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @param {boolean} [doubleClick] triggers a double click if this parameter is set
			*/
			click : function(X, Y, doubleClick) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var params = {
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0)
				};
				if (doubleClick) { params.Double = 'Y' };
				return ctx.verbExec(desc, 'ctx.mouse.click', 'CLICKMOUSE', params, '', false, (doubleClick ? '3.2.3.0' : '3.0.6.3'));
			},

			/**
			* Triggers a mouse middle click at a given position
			* @description
			*
			* __Ex.:__
<code javascript>
// middle click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.click(pos, 0, true);
</code>
			* @method clickMiddle
			* @path ctx.mouse.clickMiddle
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @param {boolean} [doubleClick] triggers a double click if this parameter is set
			*/
			clickMiddle : function(X, Y, doubleClick) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var params = {
					Middle : 'Y',
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0)
				};
				if (doubleClick) { params.Double = 'Y' };
				return ctx.verbExec(desc, 'ctx.mouse.clickMiddle', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a mouse right click at a given position
			* @description
			*
			* __Ex.:__
<code javascript>
// right click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.clickRight(pos);
</code>
			* @method clickRight
			* @path ctx.mouse.clickRight
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @param {boolean} [doubleClick] triggers a double click if this parameter is set
			*/
			clickRight : function(X, Y, doubleClick) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var params = {
					Right : 'Y',
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0)
				};
				if (doubleClick) { params.Double = 'Y' };
				return ctx.verbExec(desc, 'ctx.mouse.clickRight', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a click on XButton1
			* @description
			*
			* __Ex.:__
<code javascript>
ctx.mouse.clickXButton1();
</code>
			* @method clickXButton1
			* @path ctx.mouse.clickXButton1
			*/
			clickXButton1 : function() {
				var desc = ctx.getDescriptor();
				var params = {
					XButton : '1'
				};
				return ctx.verbExec(desc, 'ctx.mouse.clickXButton1', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a click on XButton1
			* @description
			*
			* __Ex.:__
<code javascript>
ctx.mouse.clickXButton2();
</code>
			* @method clickXButton2
			* @path ctx.mouse.clickXButton2
			*/
			clickXButton2 : function() {
				var desc = ctx.getDescriptor();
				var params = {
					XButton : '2'
				};
				return ctx.verbExec(desc, 'ctx.mouse.clickXButton2', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a drag&drop between two positions
			* @description
			*
			* __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
var pos2 = myAppli.pMyPage.item2.getRect(); // destination
ctx.mouse.dragAndDrop(pos, pos2);
</code>
			* @method dragAndDrop
			* @path ctx.mouse.dragAndDrop
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position) for the source
			* @param {ctx.position|number} X2 position object or relative horizontal position (compared to desktop top left position) for the target
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @param {number} [Y2] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			*/
			dragAndDrop : function(X, X2, Y, Y2) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var pos2 = _calculatePosition(X2, Y2);
				var params = {
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0),
					X2 : (pos2.x + pos2.cx / 2 || 0),
					Y2 : (pos2.y + pos2.cy / 2 || 0)
				};
				return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a right drag&drop between two positions
			* @description
			*
			* __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
var pos2 = myAppli.pMyPage.item2.getRect(); // destination
ctx.mouse.dragAndDrop(pos, pos2);
</code>
			* @method dragAndDropRight
			* @path ctx.mouse.dragAndDropRight
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position) for the source
			* @param {ctx.position|number} X2 position object or relative horizontal position (compared to desktop top left position) for the target
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			* @param {number} [Y2] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			*/
			dragAndDropRight : function(X, X2, Y, Y2) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var pos2 = _calculatePosition(X2, Y2);
				var params = {
					Right : 'Y',
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0),
					X2 : (pos2.x + pos2.cx / 2 || 0),
					Y2 : (pos2.y + pos2.cy / 2 || 0)
				};
				return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a mouse move to a given position 
			* @description
			*
			* __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
ctx.mouse.move(pos);
</code>
			* @method move
			* @path ctx.mouse.move
			* @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
			* @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
			*/
			move : function(X, Y) {
				var desc = ctx.getDescriptor();
				var pos = _calculatePosition(X, Y);
				var params = {
					Move : 'Y',
					X : (pos.x + pos.cx / 2 || 0),
					Y : (pos.y + pos.cy / 2 || 0)
				};
				return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			},

			/**
			* Triggers a wheel scroll with a given offset 
			* @description
			*
			* __Ex.:__
<code javascript>
ctx.mouse.scrollWheel(-200);
</code>
			* @method scrollWheel
			* @path ctx.mouse.dragAndDropRight
			* @param {number} offset wheel scroll offset (can be positive or negative)
			*/
			scrollWheel : function(offset) {
				var desc = ctx.getDescriptor();
				var params = {
					Wheel : offset
				};
				return ctx.verbExec(desc, 'ctx.mouse.scrollWheel', 'CLICKMOUSE', params, '', false, '3.2.3.0');
			}
		}
		return self;
	})();
	
	/**
	 * Module for Registry management
<WRAP todo>
<todo @cpuget>ctx.registry : to remove ?</todo>\\
</WRAP>
	 * @class ctx.registry
	 * @path ctx.registry
	 * @constructor
	 */
	ctx.registry = (function() {
		/** @type {WScriptShell} */ var _shellObj = null;
		//var _RegObj = null;
		var _updateKey = function(key, root) {
			root = root || e.registry.root.CurrentUser;
			key = key || '';
			key = key.replace('HKEY_LOCAL_MACHINE', e.registry.root.LocalMachine);
			key = key.replace('HKEY_CURRENT_USER', e.registry.root.CurrentUser);
			key = key.replace('HKEY_CLASSES_ROOT', e.registry.root.ClassesRoot);
			if (key.substring(0, 2) != 'HK') {
				// the root is not mentioned, add it
				key = root + '\\' + key;
			}
			return key;
		}
		var self = 
		/** @lends ctx.registry */
		{
/** \\
* ===== Methods =====
*/
			/**
			* Deletes a registry value or key
			* @description
			* For more details about the function, see [[https://msdn.microsoft.com/en-us/library/293bt9hh%28v=vs.84%29.aspx|RegDelete Method]]
			*
			* __Remarks:__ 
			*   * Specify a key-name by ending 'key' with a final backslash. 
			*   * Do not include a final backslash to specify a value name.
			*
			* __Ex.:__
<code javascript>
// delete value and key
ctx.registry.del("HKCU\\Software\\ACME\\FortuneTeller\\MindReader"); // delete the value 'MindReader'
ctx.registry.del("HKCU\\Software\\ACME\\FortuneTeller\\"); // delete the key 'FortuneTeller'
// other syntax
ctx.registry.del("Software\\ACME\\FortuneTeller\\MindReader", e.registry.root.CurrentUser); // delete the value 'MindReader'
ctx.registry.del("Software\\ACME\\FortuneTeller\\", e.registry.root.CurrentUser); // delete the key 'FortuneTeller'
</code>
			* @method del
			* @path ctx.registry.del
			* @param {string} key Registry key to be deleted
			* @param {e.registry.root} [root] selects the Registry Root key (see [[lib:common:ctx.enum#eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
			*/
			del : function(key, root) {
				ctx.notifyAction('ctx.registry.del');
				key = _updateKey(key, root);
				//_RegObj = _RegObj || new ActiveXObject("RegObj.Registry");
				_shellObj = _shellObj || new ActiveXObject("WScript.Shell");
				_shellObj.RegDelete(key);
			},
			
			/**
			* Reads a registry entry
			* @description
			* For more details about the function, see [[https://msdn.microsoft.com/en-us/library/x05fawxd%28v=vs.84%29.aspx|RegRead Method]]
			*
			* __Remarks:__ 
			*   * Specify a key-name by ending 'key' with a final backslash. 
			*   * Do not include a final backslash to specify a value name.
			*   * When you specify a key-name (as opposed to a value-name), the method returns the default value.
			*
			* __Ex.:__
<code javascript>
// read entry
data.IEVersion = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version");
// other syntax
data.IEVersion = ctx.registry.get("SOFTWARE\\Microsoft\\Internet Explorer\\Version", e.registry.root.LocalMachine);
</code>
			* @method get
			* @path ctx.registry.get
			* @param {string} key Registry key to be set
			* @param {e.registry.root} [root] selects the Registry Root key (see [[lib:common:ctx.enum#eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
			* @return {*} read value
			*/
			get : function(key, root) {
				var res;
				key = _updateKey(key, root);
				try {
					_shellObj = _shellObj || new ActiveXObject("WScript.Shell");
					res =_shellObj.RegRead(key);
				} catch (ex) {}
				ctx.notifyAction('ctx.registry.get', res);
				return res;
			},
			
			/**
			* Writes a key or value in registry
			* @description
			* Creates a new key, adds another value-name to an existing key (and assigns it a value), or changes the value of an existing value-name.
			* 
			* For more details about the function, see [[https://msdn.microsoft.com/en-us/library/yfdfhz1b%28v=vs.84%29.aspx|RegWrite Method]]
			*
			* __Remarks:__ 
			*   * Specify a key-name by ending 'key' with a final backslash. 
			*   * Do not include a final backslash to specify a value name.
			*
			* __Ex.:__
<code javascript>
ctx.registry.set(root + "\\Login", obj.login, true, true);
</code>
			* @method set
			* @path ctx.registry.set
			* @param {string} key Registry key to be set
			* @param {*} value value to be set
			* @param {e.registry.root} [root] selects the Registry Root key (see [[lib:common:ctx.enum#eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
			* @param {e.registry.type} [type] selects the value type (see [[lib:common:ctx.enum#eregistrytype|e.registry.type]]). Default is 'string'
			*/
			set : function(key, value, root, type) {
				ctx.notifyAction('ctx.registry.set');
				key = _updateKey(key, root);
				_shellObj = _shellObj || new ActiveXObject("WScript.Shell");
				if (typeof type === 'undefined') {
					if (typeof value === 'number')
						type = type || e.registry.type.Number;
					else
						type = type || e.registry.type.String;
				}
				_shellObj.RegWrite(key, value, type);
			}
		}
		return self;
	})();

