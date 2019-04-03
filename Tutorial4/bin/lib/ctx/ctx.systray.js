/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== ctx.systray class ======
*\\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application. //
*
* \\
* For a general overview about 'Systray', see [[:pg:gui.systray|Systray and menu-bar management]].		
*
*/

/** map of systrays and menubars 
* @ignore
* @path ctx.systrays
* @type {Object}
*/
ctx.systrays = {}; 

/**
* Class used to manage systray or bar menus
* @description
* __Ex.:__
<code javascript>
systray = ctx.systray('systray', GLOBAL);
</code>
* @class ctx.systray
* @path ctx.systray
* @param {string} [name] systray name (by default, 'systray' is used)
* @param {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
* @return {ctx.systrayClass} systray object
*/
ctx.systray = function (name, parentProcess) {
	name = name || 'SYSTRAY1';
	if (!ctx.systrays[name])
		ctx.systrays[name] = new ctx.systrayClass(name, parentProcess); // create new
	return ctx.systrays[name];
}

/**
* Class implementing the systray or bar menu object
* @description
* __Ex.:__
<code javascript>
ctx.systrays[name] = new ctx.systrayClass(name, parentProcess);
</code>
* @class ctx.systrayClass
* @path ctx.systrayClass
* @constructor0
* @advanced
* @param {string} name systray name
* @param {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
*/
ctx.systrayClass = function (name, parentProcess) {
	/** class type
	* @ignore
	* @const 
	* @path ctx.systrayClass.ctxType
	* @property {string} ctxType  */ this.ctxType = 'ctx.systrayClass';
  /** @type {ctx.page} */ var _page = null; // embedded page object
  /** @type {ctx.application} */ var _parentProcess = (parentProcess || GLOBAL); // parent process
	/** systray name
	* @path ctx.systrayClass.name
	* @advanced
	* @property {string} name  */ this.name = name;
  /** @type {Object} */ var _items = {};
  /** @type {Object} */ var _images = {};
	/** @type {boolean} */ var _bCreated = false;
  /** @type {string} */ var _defaultIconId = '';
  /** @type {string} */ var _defaultLabel = '';
  /** @type {number} */ var _timerObj = 0;
  /** @type {boolean} */ var _alternativeIcon = false;

	/** \\
	* ===== Methods =====
	*/

  /**
  * Adds a menu in a systray or bar menu\\
	* @description
	* __Ex.:__
<code javascript>
// *** syntax 1 : menu declaration and menu handler in two different functions ***
// menu declaration 
systray.addMenu('', 'evVersion', GLOBAL.labels.menu.about + ' (MESSBOX)', 'about');
});
...
// menu handler
systray.on('evVersion', function (ev) {
	// add code here...
});
	
// *** syntax 2 : menu declaration and menu handler in a single function ***
systray.addMenu('ScnAppMenu', 'evScnAppStartScn', 'Start data collect', '', function(ev) {
  var scn = ScnApp.scenarios.scCollectData.start();
});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **systray.addMenu** + 'TAB' :
	* 
<code javascript>
systray.addMenu('parent', 'event', 'text', 'image', function(ev) {
  var data = {};
  ...
});
</code>
	* </WRAP>
  * @method addMenu
 	* @path ctx.systrayClass.addMenu
  * @param {string} parentId parent menu identifier (if empty, menu is a root menu)
  * @param {string} id event id menu identifier (should be unique)
  * @param {string} label menu text
  * @param {string|function(ctx.event)} [iconId] icon identifier (loaded in ''ctx.systray.loadImage()''). If this parameter is a function, then icon is omitted and it represents the menu handler function
  * @param {function(ctx.event)} [func] menu handler function
  * @return {*} return value
  */
  this.addMenu = function (parentId, id, label, iconId, func) {
    var res = '';
		//this.items[id] = id;
		if (typeof iconId === 'function') {
			// iconId omitted
			func = iconId;
			iconId = '';
		}
    // memorize parameters for later creation (in case page not yet created)
    _items[id] = _items[id] || {};
		_items[id].parentId = parentId,
    _items[id].id = id,
    _items[id].label = label,
    _items[id].iconId = iconId,
		_items[id].created = false
		if (func) { _items[id].func = func; }    
    if (_bCreated) {
      // page created : add menu
      var desc = _page.getObjectDescriptor();
			var evObj = {};
			evObj[id] = '';
      _page.addEvent(evObj);
      if ((!parentId) || (parentId === '') || (parentId === 'SYSTRAY1')){
        parentId = this.name; // give systray name to the root menu				
			}
      res = ctx.actionApp(desc, 'addMenu', 'ADDMENUITEM', parentId, id, '', label, iconId);
			// if callback is defined, add a handler
      if (_items[id].func) {
        this.on(id, _items[id].func);
      }
			_items[id].created = true;
    }
		return res;
  }

	/**
  * Auto-enables or auto-disables a menu item
	* @description
	* __Ex.:__
<code javascript>
systray.autoDisable('evMenu1', true);
</code>
  * @method autoDisable
 	* @path ctx.systrayClass.autoDisable
  * @param {string} id menu identifer
  * @param {boolean} [bAutoDisable]  auto-disable if true (default) , auto-enable if false
  * @return {*} return value
  * @private
  */
  this.autoDisable = function (id, bAutoDisable) {
    return this.setParam(id, (bAutoDisable === false) ? 'NOAUTODISABLE' : 'AUTODISABLE');
  }

	/**
  * Checks or unchecks a menu item
	* @description
	* __Ex.:__
<code javascript>
systray.check('evMenu1', true);
</code>
  * @method check
 	* @path ctx.systrayClass.check
  * @param {string} id menu identifer
  * @param {boolean} [bCheck] check if true (default), uncheck if false
  * @return {*} return value
  */
  this.check = function (id, bCheck) {
    return this.setParam(id, (bCheck === false) ? 'UNCHECK' : 'CHECK');
  }

	/**
  * Creates a bar menu
	* @description
	* __Ex.:__
<code javascript>
menuBar.createBarMenu(ctx.options.projectName, 'ICON1');
</code>
  * @method createBarMenu
 	* @path ctx.systrayClass.createBarMenu
  * @param {string} label Tooltip 
  * @param {string} [iconId] icon id (default is 'ICON1') 
  * @param {string} [iconType] resource type (executable icon (ICON (default)) or external bitmap file (FILE)) 
  * @param {string} [filename] resource name or icon file
  * @param {ctx.systrayClass} [systray] systray object on which route all events 
  * @return {*} return value
  */
  this.createBarMenu = function (label, iconId, iconType, filename, systray) {
    // dynamically create the page from ExpBar2 extended pilot
		if (!_page)
    _page = _parentProcess.createExtendedConnector(e.extendedConnector.ExpBar, this.name);
		if (!_defaultIconId) _defaultIconId = iconId || 'ICON1';
		if (!_defaultLabel) _defaultLabel = label;

		_bCreated = true;
    this.loadImage(iconId, iconType, filename);
    var desc = _page.getObjectDescriptor();
    var res = ctx.actionApp(desc, 'createBarMenu', 'CREATEBAR', this.name, '', '', label, iconId);
    var it = null;
    // later create menu items
    for (var id in _items) {
      it = _items[id];
			if (it.id && !it.created) {
	      this.addMenu(it.parentId, it.id, it.label, it.iconId, it.func);
				it.created = true;
			}
    }
		if (systray && (systray instanceof ctx.systrayClass)) {
			// route all events on the 'systray' object
			var evCallback = {};
			evCallback[ctx.anyEvent] = function(ev) { systray.notify(ev.name); }
			_page.addOn( evCallback);
		}
    return res;
  }

	/**
  * Creates a systray menu
	* @description
	* __Ex.:__
<code javascript>
systray.createSystrayMenu(ctx.options.projectName, 'ICON1', 'FILE', '/bmp/chart_pie.png');
</code>
  * @method createSystrayMenu
 	* @path ctx.systrayClass.createSystrayMenu
  * @param {string} label Tooltip text
  * @param {string} [iconId] icon id (default is 'ICON1') 
  * @param {string} [iconType] resource type (executable icon (ICON (default)) or external bitmap file (FILE)) 
  * @param {string} [filename] resource name or icon file
  * @param {ctx.systrayClass} [systray] systray object on which route all events 
  * @return {*} return value
  */
  this.createSystrayMenu = function (label, iconId, iconType, filename, systray) {
    // dynamically create the page from ExpBar2 extended pilot
		if (!_page)
    	_page = _parentProcess.createExtendedConnector(e.extendedConnector.ExpBar, this.name);
		if (!_defaultIconId) _defaultIconId = iconId || 'ICON1';
		if (!_defaultLabel) _defaultLabel = label;
		
    _bCreated = true;
    var it = null;
    // later load icons
    for (var id in _images) {
      it = _images[id];
			if (it.id && !it.created) {
	      this.loadImage(it.id, it.type, it.filename);
				it.created = true;
			}
    }
   	this.loadImage(iconId, iconType, filename);
    var desc = _page.getObjectDescriptor();
    var res = ctx.actionApp(desc, 'createSystrayMenu', 'CREATESYSTRAY', this.name, '', '', label, iconId);
    // later create menu items
    for (var id in _items) {
      it = _items[id];
			if (it.id && !it.created) {
	      this.addMenu(it.parentId, it.id, it.label, it.iconId, it.func);
				it.created = true;
			}
    }
		if (systray && (systray instanceof ctx.systrayClass)) {
			// route all events on the 'systray' object
			var evCallback = {};
			evCallback[ctx.anyEvent] = function(ev) { systray.notify(ev.name); }
			_page.addOn( evCallback);
		}
    return res;
  }

  /**
  * Deletes a menu
	* @description
	* __Ex.:__
<code javascript>
systray.deleteMenu('evMenu1');
</code>
  * @method deleteMenu
 	* @path ctx.systrayClass.deleteMenu
  * @param {string} id menu id
  * @return {*} return value
  */
  this.deleteMenu = function (id) {
    var desc = _page.getObjectDescriptor();
		if (_items[id]) { delete _items[id]; }
    return ctx.actionApp(desc, 'deleteMenu', 'DELETE', id);
  }

  /**
  * Enables or disables a menu item
	* @description
	* __Ex.:__
<code javascript>
systray.enable('evMenu1', false);
</code>
  * @method enable
 	* @path ctx.systrayClass.enable
  * @param {string} id menu identifer
  * @param {boolean} [bEnable]  enable if 'true' (default) , disable if 'false'
  * @return {*} return value
  */
  this.enable = function (id, bEnable) {
    return this.setParam(id, (bEnable === false) ? 'DISABLE' : 'ENABLE');
  }

	/**
  * Triggers icon flashing
	* @description
	* __Ex.:__
<code javascript>
systray.flashIcon('ICON2');
</code>
  * @method flashIcon
 	* @path ctx.systrayClass.flashIcon
  * @param {string} iconId alternative icon id 
  * @param {number} [timer] timer in ms (default is 2000 ms)
  * @param {boolean} [enable] activates or disables the flash effect
  */
  this.flashIcon = function (iconId, timer, enable) {
		timer = timer || 2000;
		var sys = this;
		if (enable) {
			_timerObj = setInterval(function() {
				_alternativeIcon = !_alternativeIcon;
				sys.createSystrayMenu(_defaultLabel, (_alternativeIcon ? _defaultIconId : iconId));
			}, timer);
		} else {
			if (_timerObj)
				clearInterval(_timerObj);
			if (_alternativeIcon) {
				_alternativeIcon = false;
				sys.createSystrayMenu(_defaultLabel, _defaultIconId);
			}
		}		
  }

	/**
  * Loads a bitmap to be later used as icon in a menu
	* @description
	* __Ex.:__
<code javascript>
// load icon, associated with id 'about'
systray.loadImage('about', 'FILE', e.popup.icon16.help);
...
// use icon in menu
systray.addMenu('', 'evVersion', GLOBAL.labels.menu.about + ' (MESSBOX)', 'about');
});
</code>
  * @method loadImage
 	* @path ctx.systrayClass.loadImage
  * @param {string} [id] image identifier
  * @param {string} [type] type : 'FILE|ICON'
  * @param {string} [filename] image filename
  * @return {boolean} result
  */
  this.loadImage = function (id, type, filename) {
    id = id || 'ICON1'; // default 'Interactive' icon
    type = type || 'ICON';
		if (_images[id] && _images[id].created)
			return true;
	  if (filename && (!ctx.isPathAbsolute(filename))) {
			if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
				filename = '\\' + filename;
			filename = ctx.options.resourceURL + filename;
		}
   //this.images[id] = id;
    // page not yet created : just memorize parameters for later creation
    _images[id] = {
      id: id,
      type: type,
			created: false,
      filename: filename
		};
    if (_bCreated) { 
      var desc = _page.getObjectDescriptor();
      var res = ctx.actionApp(desc, 'loadImage', 'LOADIMAGE', id, type, filename);
			_images[id].created = true;
			if (res != '')
				ctx.log('ctx.loadImage (' + id + '): ' + res, e.logIconType.Error);
			return (res == '');
		}
		return true;
  }
	
	/**
  * Triggers a menu action
	* @description
	* __Ex.:__
<code javascript>
// send an 'About...' menu notification
systray.notify('evVersion');
</code>
  * @method notify
 	* @path ctx.systrayClass.notify
	* @param {string} id menu identifier
	* @return {*} action result
  */
  this.notify = function (id) {
		return _page.notify(id);
  }

	/**
  * Sets a callback handler on an menu action
	* @description
	* __Ex.:__
<code javascript>
// 'About...' menu handler
systray.on('evVersion', function (ev) {
	// add code here...
});
</code>
  * @method on
 	* @path ctx.systrayClass.on
	* @param {string} id menu id
	* @param {function(ctx.event)} func callback to be called on event reception
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.on = function (id, func) {
    // memorize parameters for later creation (in case page not yet created)
    _items[id] = _items[id] || { };
		if (func) { _items[id].func = func; }    
    if (_bCreated) {
			var evObj = {};
			evObj[id] = '';
	    return ctx.on(_page.addEvent(evObj), func);
		}
		return null;
  }

	/** 
  * Modifies a menu item (checks, disables, ...)
	* @description
	* __Ex.:__
<code javascript>
systray.setParam('evMenu1', 'CHECK');
</code>
  * @ignore
  * @private internal use only
  * @method setParam
 	* @path ctx.systrayClass.setParam
  * @param {string} id event id
  * @param {string} state
  * @param {string} [value]
  * @param {string} [label]
  * @return {*} return value
  */
  this.setParam = function (id, state, value, label) {
    var desc = _page.getObjectDescriptor();
		var evObj = {};
		evObj[id] = '';
    _page.addEvent(evObj);
    return ctx.actionApp(desc, 'setParam', 'SETPARAM', id, state, value, label);
  }
  
	/**
  * Updates title in a bar menu
	* @description
	* __Ex.:__
<code javascript>
systray.setTitle('In progress...');
</code>
  * @method setTitle
 	* @path ctx.systrayClass.setTitle
  * @param {string} text bar title
  * @return {*} return value
  */
  this.setTitle = function (text) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'setTitle', 'SETTEXT', text);
  }

  /**
  * Shows or hides the systray or bar menu
	* @description
	* __Ex.:__
<code javascript>
systray.show(false);
</code>
  * @method show
 	* @path ctx.systrayClass.show
  * @param {boolean} [bShow] show if true (default) , hide if false
  * @return {*} return value
  */
  this.show = function (bShow) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'show', (bShow === false) ? 'HIDE' : 'SHOW');
  }

	/**
  * Displays a balloon message on the systray
	* @description
	* __Ex.:__
<code javascript>
systray.showBalloon(ctx.options.projectLabel, 'Ready for testing...', e.systray.iconType.Warning, 10000);
</code>
  * @method showBalloon
 	* @path ctx.systrayClass.showBalloon
  * @param {string} title balloon title
  * @param {string} text  balloon text
  * @param {e.systray.iconType} iconType icon type (see [[lib:common:ctx.enum#esystrayicontype|e.systray.iconType]])
  * @param {number} duration balloon durantion (in ms)
  * @return {*} return value
  */
  this.showBalloon = function (title, text, iconType, duration) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'showBalloon', 'SHOWBALLOON', this.name, title, text, iconType, duration);
  }
  
  /**
  * Updates an existing menu in a systray or bar menu
	* @description
	* __Ex.:__
<code javascript>
systray.updateMenu('', 'evVersion', GLOBAL.labels.menu.about, 'about');
...
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **systray.updateMenu** + 'TAB' :
	* 
<code javascript>
systray.updateMenu('', 'event', 'text', 'image');
</code>
	* </WRAP>
  * @method updateMenu
 	* @path ctx.systrayClass.updateMenu
  * @param {string} parentId parent menu identifier (if empty, menu is a root menu)
  * @param {string} id event id menu identifier (should be unique)
  * @param {string} label menu text
  * @param {string} [iconId] icon identifier (loaded in ''ctx.systray.loadImage()'').
  * @return {*} return value
  */
  this.updateMenu = function (parentId, id, label, iconId) {
    var res = '';
    if ((!parentId) || (parentId === '')){
      parentId = this.name; // give systray name to the root menu				
		}
    if (_bCreated) {
      var desc = _page.getObjectDescriptor();
      res = ctx.actionApp(desc, 'updateMenu', 'ADDMENUITEM', parentId, id, '', label, iconId);
    }
		return res;
  }

};

