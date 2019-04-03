

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

		/** Set process name
		* @method setProcessName
		* @param {string} [processName] process name
		* @return {string} result
		*/
		setProcessName : function (processName) {
			_processName = processName || _processName;
		},
		
		/** Set page name
		* @method setPageName
		* @param {string} [pageName] page name
		* @return {string} result
		*/
		setPageName : function (pageName) {
			_pageName = pageName || _pageName;
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
		* @return {string} result
		*/
		onLoad : function (obj) {
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

