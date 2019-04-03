

var ctx = (function () {
	// communication ActiveX
	var _oContextor = null;
	// process name
	var _processName = 'GLOBAL';
	// page name
	var _pageName = 'pBootbox';
	// event name
	var _eventName = 'evNotification';

	/** Initializes object used to communicate with Unified Desktop or Contextor project
	* @method : init
	* @ignore
	*/
	function _init () {
		if (_oContextor == null) {
			try {
				if (typeof CtxtDesktop != "undefined") {
					// try to use 'CtxtDesktop' object if page is embedded in 'Unified Desktop' 
					_oContextor = CtxtDesktop;
				} else if (typeof Contextor != "undefined") {
					// try to use 'Contextor' object if page is managed by WEB connector
					_oContextor = Contextor;
				} else {
					// otherwise, create a "XsContextor2.CtxActApp" object (stand alone test in I.E.)
					_oContextor = new ActiveXObject("XsContextor2.CtxActApp");
				}
			}
			catch (e) {
				//alert(e.description);
			}
		}
	}

	var self = {

		// item array
		items : [],
		
		// item type array
		types : {
			name: '',
			tag: '',
			attributes: {},	
			children: [],
			nextSiblings: [],
			previousSiblings: [],
			options: {}
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object} key item parameters
		* @param {Object} action function name
		* @param {...*} [params] function parameters
		* @return {string} result
		*/
		itemExec : function (key, action, params) {
			var item = self.itemGet(key);
			if (!item) {
				// todo throw
				return "";
			}
			if (item && (typeof item[action] === 'function')) {
				item[action].apply(this, Array.prototype.slice.call(arguments, 2));
			}
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object|string} key item parameters
		* @return {Object} result
		*/
		itemGet : function (key) {
			var item = null;
			var id = "";
			var element = null;
			if (typeof key === 'string')
				id = key;
			else
				element = key;
			// search item
			for (var i = 0; i < ctx.items.length; i ++) {
				if ((id && (ctx.items[i].id == id)) || (element && (ctx.items[i].element == element))) {
					item = ctx.items[i]; // found
					break;
				}
			}
			return item;
		},
		
		/** initialize custom item
		* @method itemInit
		* @param {string|Object} element item parameters
		* @param {Object} params item parameters
		* @return {string} result
		*/
		itemInit : function (element, params) {
			params = params || {};
			if ('string' === typeof(element)) {
				params.id = element;
				element = undefined;
			} else if ('object' === typeof(element)) {
				params.element = element;
			}
			if ((!params.id) && (!params.element)) return ""; // no id or name !!
			
			// create a new item (or update an existing)
			var item = null;
			for (var i = 0; i < ctx.items.length; i ++) {
				if ((params.id && (ctx.items[i].id == params.id)) || (params.element && (ctx.items[i].element == params.element))) {
					item = ctx.items[i]; // already defined : update it
					break;
				}
			}
			if (!item) {
				item = {
					id: "",
					type: "",
					tag: "",
					element: null,
					init: null,
					object: null,
					template: "",
					params: {},
					options: {},
					data: {},
					attributes: {},
					children: [],
					previousSiblings: [],
					nextSiblings: []					
				};
				ctx.items.push(item);
			}
			// memorize parameters
			for (var index in params) {
				if (params[index] && (typeof(params[index]) === 'object')) { 
					item.params[index] = {};
					$.extend(true, item.params[index], params[index]); 
				} else {
					if (params[index]) { item.params[index] = params[index]; }
				}				
			}

			var type = item.type || item.params.type;
			var typeTemplate = ctx.types[type];
			var itemTemplate = item.template;

			// merge parameters with template and model
			if (typeTemplate && (typeof(typeTemplate) === 'object')) { 
				$.extend(true, item, typeTemplate); 
			}
			if (itemTemplate && (typeof(itemTemplate) === 'object')) { 
				$.extend(true, item, itemTemplate); 
			}
			$.extend(true, item, item.params); 
			/*for (var index in item) {
				if (item[index] && (typeof(item[index]) === 'object')) { 
					if (typeTemplate && typeTemplate[index]) { 
						$.extend(item[index], typeTemplate[index]); 
					} 
					if (itemTemplate && itemTemplate[index]) { 
						$.extend(item[index], itemTemplate[index]); 
					}				
					if (item.params && item.params[index]) { 
						$.extend(item[index], item.params[index]); 
					} 
				} else {
					if (item.params && item.params[index]) { 
						item[index] = item.params[index];
					} else if (itemTemplate && itemTemplate[index]) { 
						item[index] = itemTemplate[index];
					} else if (typeTemplate && typeTemplate[index]) { 
						item[index] = typeTemplate[index];
					}				
				}
			}*/

			if (typeof item.init === 'function') {
				item.init(item);
			}

			var jQObj = (item.element ? $(item.element) : $('#' + item.id));
			if (jQObj.length) {
				var tagName = jQObj.prop("tagName");
				if (item.tag && (tagName != item.tag.toUpperCase())) {
					 jQObj.replaceWith( "<" + item.tag + ">" + jQObj.html() + "</" + item.tag + ">" );
				}
				if (item.text) {
					jQObj.text( item.text );
				}
				if (item.value) {
					jQObj.val( item.value );
				}
				for (var att in item.attributes) {
					jQObj.attr( att, item.attributes[att] );
				}
				for (var id =0; id < item.children.length; id ++) {
					jQObj.append( item.children[id] );
				}
				for (var id =0; id < item.previousSiblings.length; id ++) {
					jQObj.before( item.previousSiblings[id] );
				}
				for (var id =0; id < item.nextSiblings.length; id ++) {
					jQObj.after( item.nextSiblings[id] );
				}
			}

			return item;
		},
		
		/** Get argument from URL
		* @method queryURL
		* @param {string} search_for parameter name
		* @return {string} result
		*/
		queryURL : function (search_for) {
			var query = window.location.search.substring(1);
			var parms = query.split('&');
			for (var i=0; i<parms.length; i++) {
				var pos = parms[i].indexOf('=');
				if (pos > 0  && (search_for.toLowerCase() == parms[i].substring(0,pos).toLowerCase())) {
					return parms[i].substring(pos+1);
				}
			}
			return "";
		},

		/** Set page name
		* @method setPageName
		* @param {string} [pageName] page name
		* @return {string} result
		*/
		setPageName : function (pageName) {
			_pageName = pageName || _pageName;
		},
		
		/** Set process name
		* @method setProcessName
		* @param {string} [processName] process name
		* @return {string} result
		*/
		setProcessName : function (processName) {
			_processName = processName || _processName;
		},
		
		/** Set event name
		* @method setEventName
		* @param {string} [eventName] event name
		* @return {string} result
		*/
		setEventName : function (eventName) {
			_eventName = eventName || _eventName;
		},
		
		/** Function called by project at at page LOAD
		* @method onLoad
		* @param {Object} initialization object
		*/
		onLoad : function (obj) {
			// function to be overloaded
		},
		
		/** Function called to initialize components
		* @method initUI
		*/
		initUI : function () {
			// function to be overloaded
		},
		
		/** Function called to test components
		* @method testUI
		* @param {string} test test value
		*/
		testUI : function (test) {
			// function to be overloaded
		},
		
		/** Sends an event to Contextor project
		* @method sendEvent
		* @param {string} event event name
		* @param {*} data : optional data (text buffer)
		* @return {string} result
		*/
		sendEvent : function (event, data) {
			event = event || _eventName;
			var res = '';
			try {
				_init();
				var strData = '';
				if (data && (typeof data === 'object') && JSON && JSON.stringify)
					strData = '!json:' + JSON.stringify(data);
				else if (typeof data === 'string')
					strData = data;
				if (_oContextor && (typeof _oContextor.Event != "undefined")) {
					// using Web3 connector mechanism
					res = _oContextor.Event(event, _processName, _pageName, "", -1, 0, strData);
				} else if (_oContextor && (typeof _oContextor.CtxtEvent != "undefined")) {
					// using CxtxDesktop or XsActApp2 mechanism
					res = _oContextor.CtxtEvent(_processName, event, _pageName, "", 0, strData, 0, 0, 0, _oContextor);
				}
			}
			catch (e) {
				//alert(e.description);
			}
			return res;
		},

		/** Receives an event from Contextor project
		* @method sendEvent
		* @param {string} event event name
		* @param {*} data : optional data (text buffer)
		*/
		onEvent : function (event, data) {
			// default function : to be overloaded by each page
			return 1;
		},

		/** Sends an action to Contextor Unified Desktop
		* @method actionApp
		* @param {string} action action name
		* @param {string} P1 optional parameter 1
		* @param {string} P2 optional parameter 2
		* @param {string} P3 optional parameter 3
		* @param {string} P4 optional parameter 4
		* @param {string} P5 optional parameter 5
		* @return {string} result
		*/
		actionApp : function (action, P1, P2, P3, P4, P5) {
			var res = '';
			_init();
			try {
				if (_oContextor && (typeof _oContextor.CtxtActionApp != "undefined"))
					res = _oContextor.CtxtActionApp(action, P1, P2, P3, P4, P5, 0, 0, 0);
				}
			catch (e) {
				//alert(e.description);
			}
			return res;
		}
	}

	return self;
})();

// event callback definition
var OnCtxtEvent = ctx.onEvent;
var CtxtActionApp = ctx.actionApp;
var CtxtEvent = ctx.sendEvent;

$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
	$('body .dropdown-toggle').dropdown(); 

} );
