/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Request classes ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
* 
* Requests are used to exchange data between processes or applications, with a logic of asynchronous questions / answer.
* 
* For more details about the request management, see [[:pg:orch.request|Requests]].
* \\
*/

	/**
	 * List of predefined requests
	 * @class ctx.requests
	 * @path ctx.requests
	 * @constructor
	 */
	ctx.requests = (function() {
		var self = 
		/** @lends ctx.requests */
		{
			/** \\
			* ===== Methods =====
			*/
			/** Instanciates and initializes a request based on an event
			* @description
			* __Ex.:__
<code javascript>
MyAppli.on({ evCRMELIGetData: function(ev) {
	// create a request, unserialized from the received event
	var req = ctx.requests.initialize(ev);
	...
}});
</code>
			* @method initialize
			* @path ctx.request.initialize
			* @param {ctx.event} ev object with initialized values
			* @return {ctx.requestClass} request object
			*/
			initialize : function initialize(ev) {
				var req;
				for (var id in ctx.requests) {
					if (ctx.requests[id].initialize) {
						req = ctx.requests[id].initialize(ev);
						if (req) { break; }
					}
				}
				if (!req)
					throw new Error(e.error.InvalidArgument, 'ctx.requests.initialize: unknown request model: ' + (ev ? ev.name : ''));
				return req;
			}
		};
		return self;
	})();


/**
* Class used to manage request models
* @class ctx.request
* @path ctx.request
* @constructor
* @param {Object} obj Object containing request structure
* @param {string|ctx.event} [eventName] event name to be called in destination application (if omitted, should be defined in 'create' function)
* @param {string|ctx.event} [reqEventName] event name to be called in source application (if omitted, 'event' is used)
* @param {function(ctx.requestClass,(number|string)=)} [sendFunc] optional callback used to override the default callback called on request sending
* @param {function(ctx.requestClass,(number|string)=)} [replyFunc] optional callback used to override the default callback called on request answering
* @param {Object} [evObj] optional extra event attributes
*/
ctx.request = function (obj, eventName, reqEventName, sendFunc, replyFunc, evObj) {
	/** @type {string} */ var _eventName = '';
	if (eventName instanceof ctx.event)
		_eventName = eventName.name;
	else if (typeof(eventName) === 'string')
		_eventName = eventName;
	/** @type {string} */ var _reqEventName = '';
	if (reqEventName instanceof ctx.event)
		_reqEventName = reqEventName.name;
	else if (typeof(reqEventName) === 'string')
		_reqEventName = reqEventName;
	/** \\
	* ===== Methods =====
	*/
	/**
	* Creates a request based on model
	* @description
	* __Ex.:__
<code javascript>
// create a request
var req = ctx.requests.getELIData.create( { name:'Smith', firstname: 'John'} );
...
</code>
	* @method create
  * @path ctx.request.create
	* @param {Object} [val] object with initialized values
	* @param {string|ctx.event} [eventName] event name to be called in destination application (if omitted, should be defined in 'create' function)
	* @param {string|ctx.event} [reqEventName] event name to be called in source application (if omitted, 'event' is used)
	* @return {ctx.requestClass} request object
	*/
	this.create = function (val, eventName, reqEventName) {

		if (eventName) { 
			if (eventName instanceof ctx.event)
				_eventName = eventName.name;
			else if (typeof(eventName) === 'string')
				_eventName = eventName;
		}
		if (reqEventName) { 
			if (reqEventName instanceof ctx.event)
				_reqEventName = reqEventName.name;
			else if (typeof(reqEventName) === 'string')
				_reqEventName = reqEventName;
		}
		var request = new ctx.requestClass(obj, _eventName, _reqEventName, sendFunc, replyFunc, evObj);
		if (val) {
			// model initialization
			//request.data = request.ev.data.data;
			request.set(val, false);
		}
		return request;
	}
	
	/**
	* Instanciates and initializes a request based on an event
	* @description
	* __Note:__ ''ctx.requests.initialize(ev);'' gives the same result and should be used preferently for simplicity
	*
	* __Ex.:__
<code javascript>
MyAppli.on({ evCRMELIGetData: function(ev) {
// create a request, unserialized from the received event
var req = ctx.requests.getELIData.initialize(ev);
...
}});
</code>
	* @method initialize
  * @path ctx.request.initialize
	* @param {ctx.event} ev object with initialized values
	* @return {ctx.requestClass} request object
	*/
	this.initialize = function (ev) {
		var request = null;
		if (ev && (_eventName == ev.name)) {
			request = new ctx.requestClass(obj, _eventName, _reqEventName, sendFunc, replyFunc, evObj);
			if (ev && ev.data) {
				// model initialization
				request.evSet(ev);
				request.data = ev.data.data;
				request.info = ev.data.info;
			}
		}
		return request;
	}
}

/**
* Class used to manage request objects
* @class ctx.requestClass
* @path ctx.requestClass
* @constructor
* @advanced
* @throws {Error}
* @param {Object} obj Object containing request structure
* @param {string} [eventName] event name to be called in destination application (if omitted, should be defined in 'create' function)
* @param {string} [reqEventName] event name to be called in source application (if omitted, 'eventName' is used)
* @param {function(ctx.requestClass,(number|string)=)} [sendFunc] optional callback used to override the default callback called on request sending
* @param {function(ctx.requestClass,(number|string)=)} [replyFunc] optional callback used to override the default callback called on request answering
* @param {Object} [evObj] optional extra event attributes
*/
ctx.requestClass = function (obj, eventName, reqEventName, sendFunc, replyFunc, evObj) {
	if (!eventName)
		throw new Error(e.error.InvalidArgument, 'ctx.request: no event name defined');

	var _sendFunc = sendFunc;
	var _replyFunc = replyFunc;
	var _replyDirection = false;

	/** \\
	* ===== Properties =====
	*/
  /** 
	* @ignore
	* @const 
	* @path ctx.requestClass.ctxType
	* @property {string} */ this.ctxType = 'ctx.requestClass';

	// *** event technical data ***
	/** event technical data
	* @path ctx.requestClass.ev
	* @property {ctx.event} ev */	this.ev = new ctx.event(eventName);
	this.ev.reqEventName = reqEventName;

	if (typeof this.ev.data !== 'object') this.ev.data = {};

	// *** event user data ***
	this.ev.data.data = new ctx.dataManager(); // misc data attributes;
	/** data container
	* @path ctx.requestClass.data
	* @property {ctx.dataManager} data  */	this.data = this.ev.data.data;
	
	
	// *** event info ***
	this.ev.data.info = {
		source : {
			id: '',
			machine: ''
		},
		destination : {
			id: '',
			machine: ''
		},
		code : e.error.OK,
		label : '',
		ts : ctx.getTimestamp(),
		uuid : ctx.uuid(), // unique ID
		remote : false // by default, local mode (false=NOTIFY sending)
	};
	/** request information
	* @path ctx.requestClass.info
	* @property {ctx.dataManager} info  */	this.info = this.ev.data.info;

	
	/** \\
	* ===== Methods =====
	*/

	/**
	* Changes the request type (event name associated with an existing request)
	* @description
	* __Ex.:__
<code javascript>
// change its type 'evGetCaseAut1' --> 'evUpdateCaseAut1'
req.changeType('evUpdateCaseAut1');
</code>
	* @method changeType
  * @path ctx.requestClass.changeType
	* @param {string|ctx.event} eventName event name to be called in destination application (if omitted, should be defined in 'create' function)
	* @param {string|ctx.event} [reqEventName] event name to be called in source application (if omitted, 'eventName' is used)
	* @return {ctx.requestClass} request object
	*/
	this.changeType = function (eventName, reqEventName) {
		if (eventName) { 
			if (eventName instanceof ctx.event)
				this.ev.name = eventName.name;
			else if (typeof(eventName) === 'string')
				this.ev.name = eventName;
		}
		if (reqEventName) { 
			if (reqEventName instanceof ctx.event)
				this.ev.reqEventName = reqEventName.name;
			else if (typeof(reqEventName) === 'string')
				this.ev.reqEventName = reqEventName;
		}
		return this;
	}

	/**
	* Sets event attributes
	* @description
	* __Ex.:__
<code javascript>
req.evSet(evObj);
</code>
	* @method evSet
	* @ignore
  * @path ctx.requestClass.evSet
	* @param {Object|*} [evObj] object
	*/
	this.evSet = function (evObj) {
		for (var id in evObj) {
			this.ev[id] = evObj[id];
		}
	}

	/**
	* Gets a data value based on its id
	* @description
	* __Ex.:__
<code javascript>
var name = req.get('name');
</code>
	* @method get
	* @path ctx.requestClass.get
	* @param {string} id identifier
	* @return {*} result
	*/
	this.get = function (id) {
		return this.data[id];
	}
	
	/**
  * Answers a request
	* @description
	* __Ex.:__
<code javascript>
...
// send request answer 
req.reply(e.error.OK, 'Operation successful');
</code>
	* @method reply
  * @path ctx.requestClass.reply
	* @throws {Error}
	* @param {e.error} [code] result code
	* @param {string} [label] result label
	* @param {boolean} [forceLocal] if true, force local sending
	*/
	this.reply = function (code, label, forceLocal) {
		if (code) this.info.code = code;
		if (label) this.info.label = label;
		var ev = this.ev;

		var req = this;
		
		// switch source -> destination (if not in reply mode)
		if (!_replyDirection) {
			_replyDirection = true;
			var id = req.info.destination.id;
			var machine = req.info.destination.machine;
			req.info.destination.id = req.info.source.id;
			req.info.destination.machine = req.info.source.machine;
			req.info.source.id = id;
			req.info.source.machine = machine;
		}

		// by convention, if destination is not mentioned, use source process name (supposed to be the same group name)
		if (!req.info.destination.id) 
			req.info.destination.id = req.ev.reqAppliName;

		// reinit source
		if (!req.info.source.id)
			req.info.source.id = ctx.options.fullUserName;
		if (!req.info.source.machine)
			req.info.source.machine = ctx.options.computerName;
		
		// notify from destination application to source application
		// send request serialization result as data
		var appli = ((req.ev.appliInst == -1) ? ctx.app[req.ev.appliName] : ctx.app[req.ev.appliName][req.ev.appliInst]);
		if (appli) {
      // anti-loop checking
      var reqEvent = (req.ev.reqEventName ? req.ev.reqEventName : req.ev.name);
      var reqAppliName = (req.ev.reqAppliName ? req.ev.reqAppliName : req.ev.appliName);
      if ((reqEvent == req.ev.name) && (reqAppliName == req.ev.appliName) && ((req.ev.reqAppliInst == -1) || (req.ev.reqAppliInst == req.ev.appliInst))) {
          return '';
      }
			// call alternative reply function, if defined
			if (_replyFunc && (!forceLocal)) {
				var res = _replyFunc(req);
				if (res) return res; // if managed by function, returns
			}
			 
			// by default, NOTIFY event locally
			var data = ctx.serialize(req.ev.data, false, true);
			var desc = appli.getObjectDescriptor();
      return ctx.verbExec(desc, 'reply', 'NOTIFY', {
        Appli: req.ev.reqAppliName,
        InstanceAppli: ((req.ev.reqAppliInst == -1) ? 'All' : req.ev.reqAppliInst),
        Event: (req.ev.reqEventName || req.ev.name),
        Data: data,
				Item: req.ev.reqItemName
      });
		} else {
			throw new Error(e.error.InvalidArgument, 'ctx.request.reply: invalid destination application ' + req.ev.appliName + '[' + req.ev.appliInst + ']');
		}
	}
	

	/**
	* Sends a request, from a source process or application to a destination process or application
	* @description
	* __Ex.:__
<code javascript>
var req = ctx.requests.getELIData.create();
req.data.id = ...;
...
// send request from 'MyAppli' application to 'MyAppli' application 
req.send(MyAppli, MyAppli);
</code>
	* @method send
	* @path ctx.requestClass.send
	* @throws {Error}
	* @param {ctx.application} sourceApp source application
	* @param {ctx.application} [destApp] destination application or process (if omitted, dest = source)
	* @param {string} [destId] destination identifier (if omitted, destApp.name is used)
	* @param {boolean} [forceLocal] if true, force local sending
	*/
	this.send = function (sourceApp, destApp, destId, forceLocal) {
		destApp = destApp || sourceApp;
		if (!((sourceApp instanceof ctx.application) && (destApp instanceof ctx.application))) {
			throw new Error(e.error.InvalidArgument, 'ctx.request.send: invalid applications');
		}

		var req = this;

		// switch source -> destination (if in reply mode)
		if (_replyDirection) {
			_replyDirection = false;
			var id = req.info.destination.id;
			var machine = req.info.destination.machine;
			req.info.destination.id = req.info.source.id;
			req.info.destination.machine = req.info.source.machine;
			req.info.source.id = id;
			req.info.source.machine = machine;
		}

		req.ev.appliName = destApp.name;
		req.ev.appliInst = destApp.instance;
		if (req.data != req.ev.data.data) { req.set(req.data); }
		
		if ((req.ev.appliInst == -1) && (destApp.nbInst <= 1)) { req.ev.appliInst = 0; } // no active instance : notify instance '0'
		
		req.ev.reqAppliName = sourceApp.name;
		req.ev.reqAppliInst = sourceApp.instance;
		if ((req.ev.reqAppliInst == -1) && (sourceApp.nbInst <= 1)) { req.ev.reqAppliInst = 0; } // no active instance : notify instance '0'

		if (!req.info.source.id)
			req.info.source.id = ctx.options.fullUserName;
		if (!req.info.source.machine)
			req.info.source.machine = ctx.options.computerName;
		
		if (destId) 
			req.info.destination.id = destId;
		// by convention, if destination is not mentioned, use destination process name (supposed to be the same as group name)
		if (!req.info.destination.id) 
			req.info.destination.id = req.ev.appliName;
		
		// call alternative send function, if defined
		if (_sendFunc  && (!forceLocal)) {
			var res = _sendFunc(req);
			if (res) return res; // if managed by function, returns
		}

		// notify from source application to destination application
		// send request serialization result as data
		var reqAppli = ((req.ev.reqAppliInst == -1) ? ctx.app[req.ev.reqAppliName] : ctx.app[req.ev.reqAppliName][this.ev.reqAppliInst]);
		if (reqAppli) {
			var desc = reqAppli.getObjectDescriptor();
			var data = ctx.serialize(req.ev.data, false, true);
      return ctx.verbExec(desc, 'send', 'NOTIFY', {
        Appli: req.ev.appliName,
        InstanceAppli: ((req.ev.appliInst == -1) ? 'All' : req.ev.appliInst),
        Event: req.ev.name,
        Data: data,
				Page: req.ev.pageName,
        InstancePage: ((req.ev.pageInst == -1) ? undefined : req.ev.pageInst),
				Item: req.ev.itemName
      });
		} else 
			throw new Error(e.error.InvalidArgument, 'ctx.request.send: invalid source application ' + req.ev.reqAppliName + '[' + req.ev.reqAppliInst + ']');
	}

	/**
	* Sets data value 
	* @description
	* __Ex.:__
<code javascript>
req.set( {name: 'Smith', firstname: 'John'} );
</code>
	* @method set
	* @path ctx.requestClass.set
	* @throws {Error}
	* @param {Object|*} obj object containing data to be set
	* @param {boolean} [create] if false, only allows to set data defined in the model (false by default)
	*/
	this.set = function (obj, create) {
		if (create) {
			for (var id in obj) {
				// create attribute if doesn't exist
				if (typeof this.ev.data.data[id] === 'undefined')
					this.ev.data.data[id] = obj[id];
				else 
					throw new Error(e.error.DuplicateId, "ctx.request: attribute '" + id + "' already exists: reserved name");
			}
		} else {
			for (var id in obj) {
				// update attribute if existing, or throw error
				if (typeof this.ev.data.data[id] !== 'undefined')
					this.ev.data.data[id] = obj[id];
				else 
					throw new Error(e.error.InvalidArgument, "ctx.request: attribute '" + id + "' doesn't exist");
			}
		}
	}
	
	this.evSet(evObj);

	// set data attributes
	if (obj) { this.set(obj, true) }
};

