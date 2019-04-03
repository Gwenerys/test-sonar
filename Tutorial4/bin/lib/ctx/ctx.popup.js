/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
======ctx.popup class======
\\
:!: //__Caution:__ this page is auto-generated from source code and should not be modified from wiki application//
\\
\\
For a general overview about 'Using Popups', see [[:pg:gui.popup2|Contextor Development Guide]].		
\\
\\
------
=====Properties reference for 'ctx.popup'=====
<WRAP indent>
{{section>ctx.includes#properties_reference_for_ctxpopup}}
</WRAP>
\\
------
=====Parameter reference for 'ctx.messbox'=====
* \\
<WRAP todo>
<todo @cpuget>Parameter reference for 'ctx.messbox' : to remove ?</todo>\\
</WRAP>

*   * __Possibles values for the container parameters :__
*|< 100% 30% >|
* ^Attributes  ^Description ^
* | {e.messbox.type} Type | determines the popup type. \\ Possible values are defined in : [[lib:common:ctx.enum#emessboxtype|e.messbox.type]] |
* | {string} URL | indicates whether parameter is a URL or text.\\ This attribute initialized with Y indicates that the value parameter is a URL if the value parameter corresponds to the \\ text (** for a URL, do not use the template attribute **) |
* | {string} Template | template name. \\ This optional attribute allows a predefined template HTML, simplifying the display of messages. \\ Possible values are defined in : [[lib:common:ctx.enum#emessboxtemplate|e.messbox.template]] |
* | {string} Title | indicates the title of the window.\\ Specific values \\ • "No" will hide the title bar. |
* | {string} HWNDPARENT | handle of the parent window. \\ Optional attribute specifying the handle of the window, under Win32, against which the message box should be positioned. \\ Without this parameter, the information on the positions of the message box is interpreted by Contextor as on the Desktop. \\ This parameter allows for example to display the message box on the same physical screen as hosting the window whose handle is given, or to display the message box "down" from a window, regardless its position and size. |
* | {string} TextBt1 | Text button 1.\\ This optional attribute used to enter the text of the button 1, when using the "Template" attribute. |
* | {string} TextBt2 | Text button 2.\\ This optional attribute used to enter the text of the button 2, when using the "Template" attribute. |
* | {string} TextBt3 | Text button 3.\\ This optional attribute used to enter the text of the button 3, when using the "Template" attribute. |
* | {string} Icon | Icon used.\\ This optional attribute to override the default icon when using the "Template" attribute. |
* | {string} BackColor | Background Color.\\ This optional attribute allows you to override the default background color when using the "Template" attribute. |
* | {string} PageName | Page Name.\\ This optional attribute specifies the name of the object for Event Management (the default is HtmlView) |
* | {string} X | Pos left.\\ This attribute specifies the left position. Possible values:\\ • value in pixels \\ • 'left' \\ • 'right' \\ • 'center' |
* | {string} Y | Pos top.\\ This attribute indicates the high position. Possible values:\\ • value in pixels \\ • 'top' \\ • 'bottom' \\ • 'center' |
* | {string} CX | Width.\\ This attribute specifies the width in pixels. |
* | {string} CY | Height.\\ This attribute indicates the height in pixels. |
* | {string} Style | Window style.\\ This attribute specifies the window style. Possible values: \\ • HWND_BOTTOM (Place the lower window of the order z) \\ • HWND_TOP (Places the window of the z-order) \\ • HWND_TOPMOST (Place the foreground window) • \\ HWND_NOTOPMOST (Place the window behind all the windows TOPMOST but before the non-topmost). • \\ WS_SYSMENU (creates a window that has a Control-menu box in its title bar) \\ • WS_BORDER (creates a window that has a border) \\ • WS_THICKFRAME (creates a window with a heavy frame that can be used to resize the window) \\ • WS_DLGFRAME (creates a window with a double border but no title) \\ • SWP_NOACTIVATE (does not activate the window) \\ • SWP_SHOWWINDOW (show window) \\ • SWP_HIDEWINDOW (hide the window) \\ View Windows documentation styles |
* | {string} ExStyle | Window extended style.\\ This attribute specifies the window style. Possible values: \\ • WS_EX_TOOLWINDOW (creates Tool window, a window that can be used as a floating toolbar) \\ See Windows documentation styles |
* | {Number} Time | Duration.\\ This attribute indicates the display time in milliseconds. |
* | {string} Value | Text (HTML or XML) or URL. |
*
* \\
* ------
* =====Parameter reference for 'ctx.messboxAlert'=====
* \\
<WRAP todo>
<todo @cpuget>Parameter reference for 'ctx.messbox' : to remove ?</todo>\\
</WRAP>
*   * __Possibles values for the parameters :__
* 
* ^Attributes  ^Description ^
* | //{string}// **Id** | popup id |
* | //{string}// **Title** | popup title |
* | //{string}// **TitleIcon** | popup title icon |
* | //{boolean}// **HideTitle** | show ('false') or hide ('true') title bar.\\ Default is 'false' |
* | //{string}// **Icon** | icon to be displayed in popup.\\ Path to a '.png' file |
* | //{string}// **Text** | text to be displayed in popup |
* | //{string}// **LinkText** | optional link text |
* | //{[[lib:common:ctx.enum#emessboxalertlinktype|e.messboxAlert.linkType]]}// **Type** | link type |
* | //{string}// **Value** | value associated with the link (event or action name) |
* | //{string}// **Data** | optional data associated with link value  |
* | //{string}// **AutoCloseTime** | duration before auto close (in ms) |
* | //{string}// **AnimationSpeed** | animation speed (in ms) when showing/hiding |
* | //{[[lib:common:ctx.enum#emessboxalertanimation|e.messboxAlert.animation]]}// **AnimationType** | animation type when showing/hiding |
* | //{string}// **Transparency** | popup transparency (0 - 255) |
* | //{[[lib:common:ctx.enum#emessboxalertlook|e.messboxAlert.look]]}// **Look** | popup look |
*
*/

// init button labels
GLOBAL.labels.set({
	buttons: {
		yes: { en:"Yes", fr:"Oui", de:"Ja" },
		no: { en:"No", fr:"Non", de:"Nein" },
		ok: { en:"Ok", fr:"Ok", de:"Ok" },
		cancel: { en:"Cancel", fr:"Annuler", de:"Stornieren" },
		open: { en:"Open", fr:"Ouvrir", de:"Geöffnet" },
		del: { en:"Delete", fr:"Supprimer", de:"Delete" },
		close: { en:"Close", fr:"Fermer", de:"Schließen" },
		submit: { en:"Submit", fr:"Soumettre", de:"Submit" },
		other: { en:"Other", fr:"Autre", de:"Andere" }
	},
	popup: {
		defaultTitle: { en:"Contextor", fr:"Contextor", de:"Contextor" }
	}
});

/**
* Popup enumerations
* @class popup
* @path e.popup
* @readonly
*/
e.popup = {};

/**
* Popup button identifiers
* @description
* __Ex.:__
<code javascript>
popup.waitResult(function(res) {
  if (res == e.popup.button.Yes) { ... }
});
</code>
* @enumeration popup.button
* @enum {string}
* @path e.popup.button
* @readonly
* @var Cancel 'Cancel' button
* @var Close 'Close' button
* @var Delete 'Delete' button
* @var No 'No' button
* @var Ok 'Ok' button
* @var Open 'Open' button
* @var Other 'Other' button
* @var Submit 'Submit' button
* @var Yes 'Yes' button
*/
e.popup.button = {
  Cancel: 	'cancel',
  Close: 		'close',
  Delete: 	'del',
  No:   		'no',
  Ok:   		'ok',
  Open:   	'open',
  Other:   	'other',
  Submit: 	'submit',
  Yes:   		'yes'
};

/**
* Popup content type : Executable, Web page, ...
* @description
* __Ex.:__
<code javascript>
var popup = ctx.popup(e.popup.template.NoButton).init({
  content: e.popup.content.Web,
  ...
});
</code>
* @enumeration popup.content
* @enum {string}
* @path e.popup.button
* @readonly
* @var Exe Executable
* @var Web Web application
* @var Other Other
*/
e.popup.content = {
  Exe: 		'Executable',
  Web: 		'WebPage',
  Other: 	'Other'
};

/**
* Screen used to display popup
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert').open({
  ...,
  display: e.popup.display.Primary,
  ...
});
</code>
* @enumeration popup.display
* @enum {string}
* @path e.popup.display
* @readonly
* @var Left 'Left' display
* @var Right 'Right' display
* @var Primary 'Primary' display
* @var Secondary 'Secondary' display
* @var Undefined Undefined
*/
e.popup.display = {
  Undefined: 	'',
  Left: 	'-3',
  Right: 	'-2',
  Primary: 	'0',
  Secondary:   '1'
};

e.popup.icon16 = {
	contextor: "/bmp/contextor.png",
	ok: "/bmp/accept.png",
	error: "/bmp/cancel.png",
	help: "/bmp/help.png",
	info: "/bmp/information.png",
	repeat: "/bmp/repeat.png",
	stop: "/bmp/stop.png",
	warning: "/bmp/warning.png",
	record: "/bmp/record.png"
};
e.popup.icon32 = {
	contextor: "/bmp32/contextor.png",
	ok: "/bmp32/accept.png",
	error: "/bmp32/cancel.png",
	help: "/bmp32/help.png",
	info: "/bmp32/information.png",
	user: "/bmp32/user.png",
	warning: "/bmp32/warning.png"
};
e.popup.icon64 = {
	contextor: "/bmp64/contextor.png",
	hello: "/bmp64/hello.png",
	hello128: "/bmp64/hello128.png"
};
e.popup.gif = {
	arrows: "/gif/arrows.gif",
	loader1: "/gif/loader1.gif",
	loader2: "/gif/loader2.gif",
	loader2_48: "/gif/loader2_48.gif",
	loader3: "/gif/loader3.gif",
	loader4: "/gif/loader4.gif",
	snake: "/gif/snake.gif"
};

/**
* Bootstrap Popup backgroup color
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.btSearch.tooltip({
  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
  icon: e.popup.icon32.info,
  color: e.popup.color.Green
});		
</code>
* @enumeration popup.color
* @enum {string}
* @path e.popup.color
* @readonly
* @var Blue Blue
* @var Green Green
* @var None No color (White)
* @var Orange Orange
* @var Red Red
* @var Yellow Yellow
 */
e.popup.color = {
  Blue:   'blue',
  Green: 	'green',
  None:   '',
  Orange: 'orange',
  Red:    'red',
  Yellow: 'yellow'
}

/**
* Popup position
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.btSearch.tooltip({
  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
  XRelative: e.popup.position.Right,
  YRelative: e.popup.position.Center
  ...
});		
</code>
* @enumeration popup.position
* @enum {string}
* @path e.popup.position
* @readonly
* @var Left Left position
* @var Right Right position
* @var Top Top position
* @var Bottom Bottom position
* @var Center Center position
*/
e.popup.position = {
  Left:   'left',
  Right:  'right',
  Top:   	'top',
  Bottom: 'bottom',
  Center: 'center'
};

/** 
* @typedef {{
*   content: (string|undefined),
*   container: (boolean|undefined),
*   name: (string|undefined),
*   template: (string|undefined),
*   url: (string|undefined),
*   title: (string|undefined),
*   titleIcon: (string|undefined),
*   titleVisible: (boolean|undefined),
*   toolWindow: (boolean|undefined),
*   IEHost: (boolean|undefined),
*   modal: (boolean|undefined),
*   maximize: (boolean|undefined),
*   minimize: (boolean|undefined),
*   canClose: (boolean|undefined),
*   autoIcon: (boolean|undefined),
*   autoTitle: (boolean|undefined),
*   resizable: (boolean|undefined),
*   canMove: (boolean|undefined),
*   topMost: (boolean|undefined),
*   X: (e.popup.position|number|string|undefined),
*   Y: (e.popup.position|number|string|undefined),
*   CX: (e.popup.position|number|string|undefined),
*   CY: (e.popup.position|number|string|undefined),
*   minCX: (e.popup.position|number|string|undefined),
*   minCY: (e.popup.position|number|string|undefined),
*   maxCX: (e.popup.position|number|string|undefined),
*   maxCY: (e.popup.position|number|string|undefined),
*   compactCX: (e.popup.position|number|string|undefined),
*   compactCY: (e.popup.position|number|string|undefined),
*   XRelative: (e.popup.position|undefined),
*   YRelative: (e.popup.position|undefined),
*   XSlide: (e.popup.position|undefined),
*   YSlide: (e.popup.position|undefined),
*   display: (e.popup.display|undefined), 
*   appBar: (boolean|undefined),
*   autoHide: (boolean|undefined),
*   forceShow: (boolean|undefined),
*   visible: (boolean|undefined),
*   fade: (number|undefined),
*   slide: (number|undefined),
*   plugin: (boolean|undefined),
*   detachOnClose: (boolean|undefined),
*   showToolbar: (boolean|undefined),
*   highlight: (boolean|undefined),
*   highlightColor: (number|undefined),
*		demoMode: (boolean|undefined),
*   header: (string|undefined),
*   message: (string|undefined),
*   footer: (string|undefined),
*   file: (string|undefined),
* 	autoClose: (number|undefined),
*   icon: (string|undefined),
* 	transparency: (number|undefined),
*   callback: (function(*)|undefined),
*   position: (ctx.position|undefined),
*   buttons: (Object|undefined)
* }}
*/
ctx.popupParams = {
	/** @type {string} */ content: '',
	/** @type {boolean} */ container: true,
	/** page name 
	* @type {string} */ name: '', // 
  /** @type {string} */ template: '', //: Template
  /** @type {string} */ url: '',
  /** embedding mode
	* @type {boolean} */ IEHost: false, 
  /** @type {boolean} */ modal: false, // modal / modeless mode
  // *** title bar ***
  /** popup title 
	* @type {string} */ title: '',
  /** icon to be displayed in title bar 
	* @type {string} */ titleIcon: '',
  /** show ('true') or hide ('false') title bar. 
	* @type {boolean} */ titleVisible: true,
  /** @type {boolean} */ canClose: true, // 'Close' system button
  /** popup has a 'Maximize' system button ('true') or not ('false') 
	* @type {boolean} */ maximize: false,
  /** popup has a 'Minimize' system button ('true') or not ('false'). 
	* @type {boolean} */ minimize: false,
  /** display a 'tool window' title bar ('true') or a standard title bar ('false') 
	* @type {boolean} */ toolWindow: false,
	/** @type {string} */ autoSizeId: '',
  /** @type {boolean} */ autoIcon: false,
  /** @type {boolean} */ autoTitle: false,
  // *** size and position ***
  /** @type {boolean} */ resizable: true,
  /** @type {boolean} */ canMove: true,
  /** @type {boolean} */ topMost: true,
  /** @type {e.popup.position|number|string|undefined} */ X: e.popup.position.Center,
  /** @type {e.popup.position|number|string|undefined} */ Y: e.popup.position.Center,
	/** @type {number|undefined} */ transparency: undefined,
  /** @type {e.popup.position|number|string|undefined} */ CX: 500,
  /** @type {e.popup.position|number|string|undefined} */ CY: 180,
  /** @type {e.popup.position|number|string|undefined} */ minCX: 0,
  /** @type {e.popup.position|number|string|undefined} */ minCY: 0,
  /** @type {e.popup.position|number|string|undefined} */ maxCX: 0,
  /** @type {e.popup.position|number|string|undefined} */ maxCY: 0,
  /** @type {e.popup.position|number|string|undefined} */ compactCX: 0,
  /** @type {e.popup.position|number|string|undefined} */ compactCY: 0,
  /** @type {e.popup.position|undefined} */ XRelative: undefined,
  /** @type {e.popup.position|undefined} */ YRelative: undefined,
  /** @type {e.popup.position|undefined} */ XSlide: undefined,
  /** @type {e.popup.position|undefined} */ YSlide: undefined,
  /** @type {e.popup.display|undefined} */ display: undefined, // force on main screen display
  // AppBar mode
  /** @type {boolean} */ appBar: false,
  autoHide: true,
	forceShow: true,
  // Misc. parameters
  visible: true,
  fade: undefined,
  slide: undefined,
  plugin: false,
  detachOnClose: false,
  showToolbar: false,
  // local parameters (neither container, nor html content)
  highlight: false,
	highlightColor: undefined,
  callback: undefined,
  position: undefined,
	demoMode: false,
  // html content parameters
	header: undefined,
	message: undefined,
	footer: undefined,
	file: undefined,
 	autoClose: 0,		
	icon: undefined,
	buttons: {}
};

/** 
* @typedef {{
*   name: (string|undefined),
*   template: (string|undefined),
* 	title: (string|undefined),
* 	titleIcon: (string|undefined),
* 	titleVisible: (boolean|undefined),
* 	icon: (string|undefined),
* 	text: (string|undefined),
* 	linkText: (string|undefined),
* 	linkType: (e.messboxAlert.linkType|undefined),
* 	value: (string|undefined),
* 	data: (string|undefined),
* 	autoClose: (number|undefined),
* 	animationSpeed: (number|undefined),
* 	animationType: (e.messboxAlert.animation|undefined),
* 	transparency: (number|undefined),
* 	look: (e.messboxAlert.look|undefined)
* }}
*/
ctx.popupAlertParams = {
	name: '',
	template: '',
	title: '',
	titleIcon: '',
	titleVisible: true,
	icon: '',
	text: '',
	linkText: '',
	linkType: '',
	value: '',
	data: '',
	autoClose: 0,
	animationSpeed: 200,
	animationType: e.messboxAlert.animation.None,
	transparency: 0,
	look: e.messboxAlert.look.AppLookWindows7
};
	

var _containerMapping = {
  template: 'Template',
  name: 'Id',
  Id: 'Id',
	content: 'Type',
	container: 'Container',
  url: 'Args',
  Args: 'Args',
  IEHost: 'IEHost',
  modal: 'Modal',
  Modal: 'Modal',
  // *** title bar ***
  title: 'Name',
  Name: 'Name',
  titleIcon: 'Icon',
  Icon: 'Icon',
  titleVisible: 'TitleBar',
  TitleBar: 'TitleBar',
  toolWindow: 'ToolWindow',
  ToolWindow: 'ToolWindow',
  canClose: 'CanClose',
  CanClose: 'CanClose',
  maximize: 'Maximize',
  Maximize: 'Maximize',
  minimize: 'Minimize',
  Minimize: 'Minimize',
  autoIcon: 'AutoIcon',
  AutoIcon: 'AutoIcon',
  autoTitle: 'AutoTitle',
  AutoTitle: 'AutoTitle',
  // *** size and position ***
  resizable: 'Resizable',
  Resizable: 'Resizable',
  canMove: 'CanMove',
  CanMove: 'CanMove',
  topMost: 'TopMost',
  TopMost: 'TopMost',
	transparency: 'Transparency',
	Transparency: 'Transparency',
  X: 'X',
  Y: 'Y',
  CX: 'CX',
  CY: 'CY',
  minCX: 'MinCX',
  MinCX: 'MinCX',
  minCY: 'MinCY',
  MinCY: 'MinCY',
  maxCX: 'MaxCX',
  MaxCX: 'MaxCX',
  maxCY: 'MaxCY',
  MaxCY: 'MaxCY',
  compactCX: 'CompactCX',
  CompactCX: 'CompactCX',
  compactCY: 'CompactCY',
  CompactCY: 'CompactCY',
  XRelative: 'XRelative',
  YRelative: 'YRelative',
  XSlide: 'XSlide',
  YSlide: 'YSlide',
  display: 'Display',
  Display: 'Display',
  // AppBar mode
  appBar: 'AppBar',
  AppBar: 'AppBar',
  fade: 'Fade',
  Fade: 'Fade',
  slide: 'Slide',
  Slide: 'Slide',
  autoHide: 'AutoHide',
  AutoHide: 'AutoHide',
  forceShow: 'ForceShow',
  ForceShow: 'ForceShow',
  // Misc. parameters
	autoSizeId: 'AutoSizeId',
  visible: 'Visible',
  plugin: 'Plugin',
  detachOnClose: 'DetachOnClose',
  showToolbar: 'ShowToolbar'
}

var _localMapping = {
  highlight: 'highlight',
	highlightColor: 'highlightColor',
  callback: 'callback',
  position: 'position',
	demoMode: 'demoMode'
}

/** Options for the 'ctx.popup' library
* @path ctx.options.popup
* @class ctx.options.popup
* @struct
*/
ctx.options.popup = {
	/** Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
	* @property {e.trace.level} traceLevel
	* @path ctx.options.popup.traceLevel */ traceLevel: e.trace.level.None
};

///** 
//* @typedef {{
//*   message: string,
//*   icon: string
//* }}
////* @extends {ctx.basePopupParams}
//*/
//ctx.popupParams = {
//	message: '',
//	icon: ''
//}

//var popupParams = new ctx.popupParams();

/** map of popup templates 
* @path ctx.popups
* @type {Object}
*/
ctx.popups = {}; 

/**
* Class used to manage popups objects
* @description
* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose');
</code>
* @class ctx.popup
* @path ctx.popup
* @param {string|Object} [name] popup name (by default, 'pDefault' is used)
* @param {string} [template] popup template name (by default, no template is used)
* @param {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
* @return {ctx.popupClass} popup object
*/
ctx.popup = function (name, template, parentProcess) {
	var obj = {};
	if (typeof (name) === 'object') {
		obj = name;
	} else if (typeof (name) === 'string') {
		obj[name] = null;
	} else
		obj['pDefault'] = null;
	var popup;
	ctx.each(obj, function(id, value) {
		if (!ctx.popups[id])
			ctx.popups[id] = new ctx.popupClass(id, template, parentProcess); // create new
		popup = ctx.popups[id];
		if (value && typeof (value) === 'object') {
			popup.initParams = value;
		}
	});	
	return popup;
};

/**
* Class used to implement popups objects
* @description
* __Ex.:__
<code javascript>
ctx.popups[name] = new ctx.popupClass(name, template, parentProcess);
</code>
* @class ctx.popupClass
* @path ctx.popupClass
* @constructor
* @advanced
* @param {string} name popup name
* @param {string} [template] popup template name (by default, no template is used)
* @param {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
*/
ctx.popupClass = function (name, template, parentProcess) {
  parentProcess = (parentProcess || GLOBAL); // parent process (GLOBAL is default)
  // private attributes
	/** @type {ctx.page} */ var _pg = null;
	/** @type {ctx.application} */ var _parentProcess = parentProcess;
  /** @type {string} */ var _template = template || '';
  /** @type {string} */ var _action = '';
  /** @type {string} */ var _actionLanguage = '';
  /** @type {string} */ var _res = '';
  /** @type {string} */ var _nature = '';
  /** @type {string} */ var _subCommand = '';
	var _waitCloseObj = null;
	var _waitNotifObj = null;
	// event name used to send notifications
	/** @type {string} */ var _eventName = 'evNotification';
	/** \\
	* ===== Properties =====
	*/
	/** class type
	* @ignore
	* @const 
	* @path ctx.popupClass.ctxType
	* @property {string} */ this.ctxType = 'ctx.popupClass';
	
	/** data container
	* @path ctx.popupClass.data
	* @property {ctx.dataManager} */ this.data = new ctx.dataManager(null);
	
	/** initialization parameter object
	* @ignore
	* @path ctx.popupClass.initParams
	* @property {Object} */ this.initParams = null;
  
 	/** popup name
	* @path ctx.popupClass.name
	* @advanced
	* @property {string} */ this.name = name;

		/** container parameter object
	* @ignore
	* @path ctx.popupClass.containerParams
	* @property {Object} */ this.containerParams = {};
  
		/** content parameter object
	* @ignore
	* @path ctx.popupClass.contentParams
	* @property {Object} */ this.contentParams = {};
  
		/** local parameter object
	* @ignore
	* @path ctx.popupClass.localParams
	* @property {Object} */ this.localParams = {};
  
	/** HTML function name
	* @ignore
	* @path ctx.popupClass.loadFunc
	* @property {string} */ this.loadFunc = '';
  
	/** merged HTML function name
	* @ignore
	* @path ctx.popupClass.mergedLoadFunc
	* @property {string} */ this.mergedLoadFunc = '';
  
  /** merged parameter object
	* @path ctx.popupClass.mergedParams
	* @ignore 
	* @property {Object} */ this.mergedParams;
  
	/** merged local parameter object
	* @path ctx.popupClass.mergedLocalParams
	* @ignore 
	* @property {Object} */ this.mergedLocalParams;	

	/** merged HTML parameters
	* @path ctx.popupClass.mergedOnLoadArgs
	* @ignore
	* @property {Object} */ this.mergedOnLoadArgs = [];

	/** HTML parameters
	* @ignore
	* @path ctx.popupClass.onLoadArgs
	* @property {Object} */ this.onLoadArgs = [];
	
	/** parameter object
	* @ignore
	* @path ctx.popupClass.params
	* @property {Object} */ this.params;
  
	/** \\
	* ===== Methods =====
	*/
	/**
	* Activates the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('pClose').activate();
</code>
	* @method activate
	* @path ctx.popupClass.activate
  * @return {*} return value
  */
  this.activate = function () {
		return ((_pg && _pg.exist()) ? _pg.activate() : '');
  }
	
  /**
  * Checks if page already declared, adds it if not
  * @method check
	* @path ctx.popupClass.check
	* @ignore internal usage
	* @private
  * @return {boolean} result
  */
  this.check = function () {
    if (_parentProcess && (!(_parentProcess instanceof ctx.application))) {
      return false; // invalid parent application or process -> exit
    }
    //create a dynamic page
    var pg = null;
    // test if already existing, create a new page if not
    pg = _parentProcess.getPage(this.name, -1, _nature);
    if (!pg)
    { pg = _parentProcess.addPage(this.name, { nature: _nature } ); } // nature: 'MESSBOX', MESSBOX2', 'MESSBOXALERT'
    _pg = pg;
		return true;
	}
	
  /**
	* Closes the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('pClose').close();
</code>
  * @method close
	* @path ctx.popupClass.close
  * @return {string} return value
  */
  this.close = function () {
		return ((_pg && _pg.exist()) ? _pg.close() : '');
  }
	
  /**
	* Executes javascript code in the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popups.pMyPopup.execScript("$(...)...");
</code>
  * @method execScript
	* @path ctx.popupClass.execScript
  * @param {...*} list code to be executed or function name, then parameters to be used
  * @return {string} return value
  */
  this.execScript = function (list) {
		return ((_pg && _pg.exist()) ? _pg.execScript.apply(_pg, arguments) : '');
  }
	
  /**
	* Tests popup existence
	* @description
	* __Ex.:__
<code javascript>
if (ctx.popup('pClose').exist()) { ... }
</code>
  * @method exist
	* @path ctx.popupClass.exist
  * @return {boolean} result : 'true' if page exists
  */
  this.exist = function () {
    return (_pg ? _pg.exist() : false);
  }
	
	/**
	* Gets the return code of a popup after it has closed
	* @description
	* __Ex.:__
<code javascript>
res =  popup.open();
popup.waitClose(function(ev) {
  if (popup.getCloseResult(ev) == e.popup.button.Yes) {
    // the window has closed, 'yes' button was clicked
    ...
  }
});
</code>
	*
	* __Note:__ 
	*   - for a ''messbox'' popup, the result code is 'Bt1', 'Bt2', 'Bt3'
	*   - for a ''messbox2'' popup, the result code is the id of the clicked button, or an object with input data (for a form popup)
	*
	* @method getCloseResult
  * @path ctx.popupClass.getCloseResult
	* @advanced
	* @param {Object} ev event attached to the object
  * @return {*} return value
	*/
	this.getCloseResult = function (ev) {
		try {
			if (_res)
				return _res;
			if (!(ev && ev.data))
				return '';
			var xml = ctx.xml.parse(ev.data);
			if (!xml)
				return ev.data; // 'messbox2' directly returns the clicked object
			// for 'messbox', get the 'Ctx_Result' value
			var xmlNode = xml.selectSingleNode("//_Items_/Ctx_Result");
			return (xmlNode ? xmlNode.text : '');
		} catch(ex) {
			ctx.log(ex, e.logIconType.Error, ex.message);
			return '';
		}
	}
	
	/**
	* Initializes an HTML message box (based on ctx.popup.messbox2)
	* @method init
	* @path ctx.popupClass.init
	* @param {Object} params object containing attributes about the popup (title, size, position, ...) see ''[[lib:ctx:ctx.popup#properties_reference_for_ctxpopup|complete list]]''
	* @description
	*
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose').init({
  template: e.popup.template.YesNo,
  title: GLOBAL.labels.stopPopup.title,
  CX: 500,
  CY: 180,
  message: '<br/><b>' + GLOBAL.labels.updatePopup.label + '</b><br/><br/>', 
  icon: e.popup.icon64.hello
});
popup.open();
</code>
	*
  * @return {ctx.popupClass} popup object
  */
  this.init = function (params) {
		params = params || {};
		var loadFunc = '';

		// add resource folder if omitted
		var tCheck = ['url', 'file', 'icon', 'titleIcon'];
		ctx.each(tCheck, function(id, value) {
		  if (params[value] && (!ctx.isPathAbsolute(params[value]))) {
				var filename = params[value];
				if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
					filename = '\\' + filename;
				params[value] = ctx.options.resourceURL + filename;
			}
		});
		
		// if a position object is provided, update popup position relatively
		/** @type {ctx.position} */ var pos = params.position || null;
		if (pos && (pos.cx || pos.cy)) {
			switch (params.XRelative) {
				case e.popup.position.Right:
				{
					params.X = pos.x + pos.cx;
					break;
				}
				case e.popup.position.Left:
				{
					params.X = pos.x;
					break;
				}
				case e.popup.position.Center:
				default:
				{
					params.X = pos.x + pos.cx / 2;
					break;
				}
			}
			switch (params.YRelative) {
				case e.popup.position.Bottom:
				{
					params.Y = pos.y + pos.cy;
					break;
				}
				case e.popup.position.Center:
				{
					params.Y = pos.y + pos.cy / 2;
					break;
				}
				case e.popup.position.Top:
				default:
				{
					params.Y = pos.y;
					break;
				}
			}
		}
		
		if (params.file && ctx.fso) {
			// load HTML/Markdown message from an external file
			try {
				params.message = ctx.fso.file.read(params.file);
			} catch (ex) {	}
		}

//		// Markdown converter
//		if (!ctx.converter) {
//			try {
//				var options = {
//					strikethrough: true,
//					tablesHeaderId: true,
//					tables: true,
//					tasklists: true,
//					extensions: ['icon']
//				}
//				ctx.converter = showdown.Converter(options);
//			} catch (ex){
//				//alert(ex.message);
//			}
//		} 

//		// Handlebars template converter
//		if (params.message && params.data && (typeof params.data === 'object')) {
//			try {
//				var template = exports.Handlebars.compile(params.message);
//				params.message = template(params.data);
//			} catch (ex){ }
//		} 
		
//		// parse message content as Markdown text
//		if (ctx.converter && ctx.converter.makeHtml) {
//			if (params.message) {
//				params.message = ctx.converter.makeHtml(params.message);
//			}
//			if (params.title) {
//				params.title = ctx.converter.makeHtml(params.title);
//			}
//		}

		// collect parameters relative to container, local or html content
		this.localParams = {};
		for (var id in params) {
			if (_containerMapping[id])
				this.containerParams[_containerMapping[id]] = params[id];
			else if (_localMapping[id])
				this.localParams[_localMapping[id]] = params[id];
			else if (id == 'onFuncLoad')
				loadFunc = params[id];
			else
				this.contentParams[id] = params[id];
		}
		var popup = this.messbox2(this.containerParams);
		if (loadFunc) popup.onFuncLoad(loadFunc);
		return popup.onLoad(this.contentParams);
  }

  /**
	* Creates a Windows or HTML message box popup object (version 1)
	* @method messbox
	* @path ctx.popupClass.messbox
	* @advanced
  * @param {Object} [params] popup settings
	* @description
	* 'ctx.messbox' is kept for compatibility. You should use 'ctx.messbox2' popups instead.\\
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* \\
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose').messbox({
  Type: e.messbox.type.HTMLView,
  Template: e.messbox.template.Info,
  Icon: 'Contextor.gif',
  Title: GLOBAL.labels.stopPopup.title,
  Value: GLOBAL.labels.stopPopup.label,
  TextBt1: GLOBAL.labels.buttons.yes,
  TextBt2: GLOBAL.labels.buttons.no,
  Style: "SWP_SHOWWINDOW HWND_TOPMOST SWP_NOACTIVATE",
  ExStyle: "WS_EX_TOOLWINDOW"
});
popup.open();
popup.waitResult(function(ev) {
  // ...
});
</code>
	* 
	* @return {ctx.popupClass} popup object
  */
  this.messbox = function (params) {
    params = params || {};
    _action = e.nature.MESSBOX;
		_actionLanguage = 'messbox';
    _nature = e.nature.MESSBOX;
    _subCommand = '<SETVALUE ZoneCtx="_Work0_" Value="1"/>';
    this.loadFunc = ''; // default name for the initialization function
    this.params = {
      PageName: name,
      Result: params.Result || '_Work0_' // add 'Result' parameter to get result
      // TBC...
    }
    this.setParam(this.params, params);
		this.check();
    return this;
  }
	
  /**
	* Creates an HTML message box popup object (version 2)
  * @method messbox2
	* @advanced
	* @path ctx.popupClass.messbox2
  * @param {Object} [params] popup settings
	* @description
	*  You'd better use 'ctx.popupClass.init({...})' which wraps this method.
	* @return {ctx.popupClass} popup object
  */
  this.messbox2 = function (params) {
    if (!params) { params = {
		  Name: undefined, 
		  Id: undefined, 
		  Template: undefined, 
		  Result: undefined, 
		 	Args: undefined,
		 	Icon: undefined,
		 	IEHost: undefined,
		 	ToolWindow: undefined,
		 	TopMost: undefined,
		 	X: undefined,
		 	Y: undefined,
		 	Display: undefined,
		  CX: undefined, 
		  CY: undefined
	  } };
    _action = e.nature.MESSBOX2;
		_actionLanguage = 'messbox2';
    _nature = e.nature.MESSBOX2;
    _subCommand = '<SETVALUE ZoneCtx="_Work0_" Value="1"/>';
    this.loadFunc = ''; // default name for the initialization function
    this.params = {
        Id: name,
        Result: params.Result || '_Work0_' // add 'Result' parameter to get result
        // TBC...
    }
    //if ((!_template) && params.Template)
    if (params.Template)
        _template = params.Template; // get template name
    // set internal param.
    this.setParam(this.params, params);
		this.check();
    return this;
  }
	

  /**
  * Creates a message box alert popup object
  * @method messboxAlert
	* @path ctx.popupClass.messboxAlert
	* @advanced
  * @param {ctx.popupAlertParams} [params] popup settings
	* @description
	* 'ctx.messboxAlert' is kept for compatibility. You should use 'ctx.messbox2' popups instead.
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* 
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pAlert').messboxAlert({
  // Title
  HideTitle: false,
  Title: 'popup title',
  TitleIcon: ctx.options.resourceURL + e.popup.icon16.contextor,
  // Content
  Icon: ctx.options.resourceURL + e.popup.icon32.contextor,
  Text: 'Put the popup text here...',
  // Link
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event, // None|Event|Action
  Value: 'evStartScenario', // Action or Event to trigger
  Data: 'scScenario1', // data associated with event or action
  // Animation
  AutoCloseTime: '10000',
  AnimationSpeed: '30',
  AnimationType: e.messboxAlert.animation.Slide,
  // Look
  Transparency: '200',
  Look: e.messboxAlert.look.AppLookOffice2007Blue
});
popup.open();
</code>
	* 
	* @return {ctx.popupClass} popup object
  */
  this.messboxAlert = function (params) {
    if (params) {
			var obj = {};
			obj.Id = params.name || params['Id'];
			obj.Title = params.title || params['Title'];
			obj.TitleIcon = params.titleIcon || params['TitleIcon'];
			obj.HideTitle = (!params.titleVisible) || params['HideTitle'];
			obj.Icon = params.icon || params['Icon'];
			obj.Text = params.text || params['Text'];
			obj.LinkText = params.linkText || params['LinkText'];
			obj.Type = params.linkType || params['Type'];
			obj.Value = params.value || params['Value'];
			obj.Data = params.data || params['Data'];
			obj.AutoCloseTime = params.autoClose || params['AutoCloseTime'];
			obj.AnimationSpeed = params.animationSpeed || params['AnimationSpeed'];
			obj.AnimationType = params.animationType || params['AnimationType'];
			obj.Transparency = params.transparency || params['Transparency'];
			obj.Look = params.look || params['Look'] ;

			_action = e.nature.MESSBOXALERT;
			_actionLanguage = 'messboxAlert';
	    _nature = e.nature.MESSBOXALERT;
	    _subCommand = '';
	    this.params = {
	        Id: name
	        // TBC...
	    }
	    if ((!template) && params.template && params.Template)
	        _template = params.template || params.Template; // get template name
	    // set internal param.
	    this.setParam(this.params, obj);
			this.check();
		}
    return this;
  }

	/**
  * Defines the name of the initialization function to be called in the HTML content, following page load
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('popupYesNo').messbox2({...})
.onFuncLoad('initialize')
.onLoad({	
  message: '<br>dummy message</br>', 
  title: 'Dummy title'
});

// At page load, the following code is executed in the page :
initialize({"message": "<br>dummy message</br>",  "title": "Dummy title"});
</code>
  * @method onFuncLoad
	* @path ctx.popupClass.onFuncLoad
  * @param {string} funcName function name (if different of default value ('initialize'))
  *							ex. : onFuncLoad('initialize');
	* @return {ctx.popupClass} popup object
  */
  this.onFuncLoad = function (funcName) {
    this.loadFunc = funcName;
    return this;
  }
	
  /**
  * Defines the parameters of the initialization function to be called in the HTML content, following page load
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('popupYesNo').messbox2({...})
.onFuncLoad('initialize')
.onLoad({	
  message: '<br>dummy message</br>', 
  title: 'Dummy title'
});

// At page load, the following code is executed in the page :
initialize({"message": "<br>dummy message</br>",  "title": "Dummy title"});
</code>
  * @method onLoad
	* @path ctx.popupClass.onLoad
	* @advanced
  * @param {...(string|Object)} list arguments of the function to be called : parameters initialize('arg1', 'arg2', ...)
  *							ex. : onLoad(obj1, obj2);
	* @return {ctx.popupClass} popup object
  */
  this.onLoad = function (list) {
    var args = Array.prototype.slice.call(arguments, 0);
		var nb = args.length;
    for (var i = 0; i < nb; i++) {
      ctx.popups[name].onLoadArgs[i] = args[i];
    }
    return this;
  }

  /**
  * Merges recursively popup parameters with their parent templates
  * @method mergeParams
	* @path ctx.popupClass.mergeParams
	* @ignore
	* @return {ctx.popupClass} popup object
  */
  this.mergeParams = function () {

		// *** get template popup ***
		var templatePopup = null;
		if (_template) templatePopup = ctx.popups[_template];
		if (templatePopup)
			templatePopup.mergeParams(); // recursively merge templates
		
		// *** merge container params ***
    this.mergedParams = {};
    if (templatePopup && templatePopup.params)
        this.setParam(this.mergedParams, templatePopup.mergedParams);
    this.setParam(this.mergedParams, this.params);
		// check coherence
		if ((this.mergedParams['Container'] === false) && (!this.mergedParams.IEHost)) {
			this.mergedParams.IEHost = true;
		}
		// *** merge local params ***
		this.mergedLocalParams = {
			highlight: undefined,
			highlightColor: undefined,
			position: undefined,
			callback: undefined,
			demoMode: undefined
		};
    if (templatePopup && templatePopup.localParams)
        this.setParam(this.mergedLocalParams, templatePopup.mergedLocalParams);
    this.setParam(this.mergedLocalParams, this.localParams);

    // *** merge parameters from template and page for the HTML content ***
    this.mergedLoadFunc = this.loadFunc || (templatePopup ? templatePopup.mergedLoadFunc : '');
    var nbArgs = 0;
    this.mergedOnLoadArgs = [];
    if (templatePopup && templatePopup.mergedOnLoadArgs) {
      nbArgs = Math.max(templatePopup.mergedOnLoadArgs.length, this.onLoadArgs.length);
      for (var i = 0; i < nbArgs; i++) {
        this.mergedOnLoadArgs[i] = {};
        this.setParam(this.mergedOnLoadArgs[i], templatePopup.mergedOnLoadArgs[i]);
        this.setParam(this.mergedOnLoadArgs[i], this.onLoadArgs[i]);
      }
    } else {
      nbArgs = this.onLoadArgs.length;
      this.mergedOnLoadArgs = this.onLoadArgs;
    }
    if (this.mergedLoadFunc && nbArgs) {
      var argText = ''
			var nb = this.mergedOnLoadArgs.length;
	    for (var i = 0; i < nb; i++) {
				if (i == 0) {
					// add appli, page, event names as parameters (might be used by the page to send events back)
					this.mergedOnLoadArgs[i].appliName = _parentProcess.name;
					this.mergedOnLoadArgs[i].pageName = this.name || (templatePopup ? templatePopup.name : ''); 
					this.mergedOnLoadArgs[i].eventName = _eventName; 
				}
        //this.onLoadArgs[i] = this.mergedOnLoadArgs[i];
        if (argText != '')
          argText += ', ';
				if (typeof this.mergedOnLoadArgs[i] === 'string') { 
	        argText += ctx.serialize(this.mergedOnLoadArgs[i], true, false);
				} else {
	        argText += ctx.serialize(this.mergedOnLoadArgs[i], false, false);						
				}
      }
      this.mergedParams.OnLoad = this.mergedLoadFunc + "(" + argText + ");";
    }		
		return this;
	}
	
	/**
  * Opens and displays a popup
	* @description
	* __Note:__ the popup should have been previously initialized using ''ctx.popup.messbox'', ''ctx.popup.messbox2'' or ''ctx.popup.messboxAlert'' 
	*
	* __Ex.:__
<code javascript>
ctx.popup('pClose', e.popup.template.YesNo).messbox2({	
  ... 
}).onLoad({	
  ... 
}).open();
</code>
	*
  * @method open
	* @path ctx.popupClass.open
	* @param {ctx.popupParams|boolean} [params] object containing attributes about the popup (title, size, position, ...)
  * @param {boolean} [closeIfOpened] if 'true', popup is closed if already opened, otherwise updated (default is false)
	* @param {function(*)} [callback] optional callback called when the tooltip is closed
  * @return {ctx.popupClass} popup object
  */
  this.open = function (params, closeIfOpened, callback) {
		_res = '';
		if (((_nature == '') || (_nature == e.nature.MESSBOX2)) && (typeof this.initParams === 'object')) {
			this.init(this.initParams);
		} 
		if (typeof params === 'object') {
			this.init(params);
		} else if (typeof params === 'boolean') {
			closeIfOpened = params;
			params = undefined;
		}

	  if (!this.check()) {
			return this;
		}

		if ((closeIfOpened) && _pg.exist())
    { _pg.close(); }
		
		// ensure a default template is used for MESSBOX2
		if ((_nature == e.nature.MESSBOX2) && (!_template) && (!this.params.Args)) {
			_template = e.popup.template.None;
		}
		
		this.mergeParams();

		// promise integration			
		callback = callback || this.mergedLocalParams.callback;
		if (!callback || (typeof callback !== 'function')) {
			if (ctx.currentPromise) {
				callback = ctx.currentPromise.resolve;
			}
		}

		var displayed = false;
		
		// if 'demoMode' flag is set, and we are currently in demo mode, skip display
		if (!(this.mergedLocalParams.demoMode && (!ctx.options.demoMode))) {
			// if a position is provided, highlight it
			var pos = this.mergedLocalParams.position;
			if (this.mergedLocalParams && (this.mergedLocalParams.highlight !== false) && this.mergedOnLoadArgs && this.mergedOnLoadArgs[0] && this.mergedOnLoadArgs[0].autoClose && pos && (pos.cx || pos.cy)) {
				ctx.highlight(pos, this.mergedOnLoadArgs[0].autoClose, true, true, this.mergedLocalParams.highlightColor);
			}
			
			// *** display the popup ***
	    var desc = _pg.getObjectDescriptor();
	    desc.pageInst = 0;
			displayed = true;
			if ((_nature == e.nature.MESSBOX2) && (!this.mergedParams.Args))
			{
				// check an URL or path is defined for the popup content
				throw new Error(e.error.InvalidArgument, "ctx.popup('" + this.name + "') has no URL defined");
			}
      var res = ctx.verbExec(desc, _actionLanguage, _action, this.mergedParams, _subCommand, true);
			if (this.mergedParams.Modal) {
				// for a modal call, result is synchronous
				_res = res;
			} else {
				// if there is callback defined, listen to closure
				if (callback && (typeof callback === 'function')) {
					this.waitResult(function(result) {
						callback(result);
					});
				}
			}
		}

		// if display was skipped, and a callback is defined, call it immediately
		if (!displayed) {
			if (callback && (typeof callback === 'function')) {
				callback('');
			}
		}
    return this;
  }
	
  /**
  * Gets the internal ''ctx.page'' object
	* @description
	* __Ex.:__
<code javascript>
var pg = ctx.popup('pClose').page();	
</code>
  * @method page
	* @path ctx.popupClass.page
  * @return {ctx.page} pg
  */
  this.page = function () {
    return _pg;
  }
	

  /**
  * Copies source object parameters to a destination object
	* @description
	* __Ex.:__
<code javascript>
this.setParam(this.params, params);
</code>
  * @method setParam
	* @path ctx.popupClass.setParam
  * @private
  * @ignore internal usage
  * @param {Object} params
  * @param {Object} [sourceParams]
  */
  this.setParam = function (params, sourceParams) {
    params = params || {};
    sourceParams = sourceParams || {};
    for (var i in sourceParams) {
      //if (typeof sourceParams[i] !== 'undefined')
      params[i] = sourceParams[i];
    }
  }

  /**
	* Displays an HTML message box (based on ctx.popup.messbox2)
	* @description
	* This function is just an alias to shorten syntax:
<code javascript>ctx.popup(<name>).show(<container options>, <template>, <HTML content>, <closeIfOpened>);</code>
	* is equivalent to :
<code javascript>ctx.popup(<name>, <template>).messbox2(<container options>).onLoad(<HTML content>).open(<closeIfOpened>);</code>
	* \\
	* __Ex.:__
<code javascript>
	ctx.popup('pAbout').open({
	  template: e.popup.template.Ok,
		title:  GLOBAL.labels.aboutPopup.title,
		CX: 600,
		CY: 210,
		message: label, 
		icon: e.popup.icon64.hello128
	});
</code>
  * @method show
	* @deprecated Use 'ctx.popupClass.open' instead
	* @path ctx.popupClass.show
	* @ignore
	* @param {Object} container object containing attributes about the popup container (title, size, position, ...)
	* @param {Object} [content] object containing attributes about the HTML content (message, icon, ...)
  * @param {boolean} [closeIfOpened] if 'true', popup is closed if already opened, otherwise updated (default is false)
	* @param {string} [template] popup template to derive from. See [[:lib:ctx:ctx.popup.Bootstrap#popupBootstrap|e.popup.template enumeration]]
  * @return {ctx.popupClass} popup object
  */
  this.show = function (container, content, closeIfOpened, template) {
		if (template && (typeof container === 'object'))
			container.Template = template;
		return this.messbox2(container).onLoad(content).open(closeIfOpened);
  }

  /**
	* Displays an alert message box (based on ctx.popup.messboxAlert)
	* @description
	* 'ctx.messboxAlert' is kept for compatibility. You should use 'ctx.messbox2' popups instead.
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* \\
	* This function is just an alias to shorten syntax:
<code javascript>ctx.popup(<name>).showAlert(<params>, <closeIfOpened>);</code>
	* is equivalent to :
<code javascript>ctx.popup(<name>).messboxAlert(<params>).open(<closeIfOpened>);</code>
	* \\
	* __Ex.:__
<code javascript>
ctx.popup('pAlert').showAlert({
  // Title
  HideTitle: false,
  Title: 'popup title',
  TitleIcon: ctx.options.resourceURL + e.popup.icon16.contextor,
  // Content
  Icon: ctx.options.resourceURL + '/bmp32/contextor.png',
  Text: 'Put the popup text here...',
  // Link
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event, // None|Event|Action
  Value: 'evStartScenario', // Action or Event to trigger
  Data: 'scScenario1', // data associated with event or action
  // Animation
  AutoCloseTime: '10000',
  AnimationSpeed: '30',
  AnimationType: e.messboxAlert.animation.Slide,
  // Look
  Transparency: '200',
  Look: e.messboxAlert.look.AppLookOffice2007Blue
});
</code>
  * @method showAlert
	* @path ctx.popupClass.showAlert
  * @param {ctx.popupAlertParams} [params] popup settings
  * @return {ctx.popupClass} popup object
  */
  this.showAlert = function (params) {
		return this.messboxAlert(params).open(true);
  }

	this.openAlert = function (params) {
		return this.showAlert(params);
  }

	/**
  * Waits until a popup is present, then calls a callback 
	* @description
	* The behaviour is the following :
	*   * if the page already exists, the callback is immediately called
	*   * else it calls the callback on reception of a 'LOAD' event on the page. 
	* The handler on the 'LOAD' event is set a single time.
	*
 	* __Ex.:__
<code javascript>
ctx.popup('pClose').wait(function(ev) { 
  ...
});
</code>
  * @method wait
	* @path ctx.popupClass.wait
  * @param {function(ctx.event)} callback callback to be called when page is present
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.wait = function (callback) {
    //return _pg.wait(callback);
		return _pg.addOnce({ LOAD: callback });
  }
	
  /**
  * Waits until a page is closed, then calls a callback 
	* @description
	* @deprecated  Rather use ctx.popupClass.waitResult(function(res) { ... })
	* The behaviour is the following :
	*   * if the page doesn't exist, the callback is immediately called
	*   * else it calls the callback on reception of a 'UNLOAD' event on the page. 
	* The handler on the 'UNLOAD' event is set a single time.
	*
 	* __Ex.:__
<code javascript>
res =  popup.open();
popup.waitClose(function(ev) {
  ...
});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **...waitClose** + 'TAB' :
	* 
<code javascript>
...waitClose(function(ev) {
  ...
});
</code>
	* </WRAP>
  * @method waitClose
	* @path ctx.popupClass.waitClose
  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
	* @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.waitClose = function (callback) {
    //return _pg.waitClose(callback);
		return _pg.addOnce({ UNLOAD: callback });
  }

  /**
  * Waits until a popup is closed, then calls a callback with result
	* the callback is also called if a button is clicked in the page (without closing it)
	* @description
	* The behaviour is the following :
	*   * if the popup is modal, the call is immediate
	*   * if the popup is modeless, the call is asynchronous
	*
 	* __Ex.:__
<code javascript>
var popup = ctx.popup('...').open(...);
popup.waitResult(function(res) { ... });
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **...waitResult** + 'TAB' :
	* 
<code javascript>
...waitResult(function(res) {
  ...
});
</code>
	* </WRAP>
  * @method waitResult
	* @path ctx.popupClass.waitResult
  * @param {function(*)} callback callback to be called when page is closed or absent
  * @return {ctx.popupClass} popup object
  */
  this.waitResult = function (callback) {
		var popup = this;
		if (this.mergedParams.Modal) {
			// modal popup : get result immediately
			var res = popup.getCloseResult(null);
			if (typeof callback === 'function') {
				callback.apply(popup, [res]);
			} 
		} else {
			// wait all notifications
			if (_waitNotifObj != null) {
				ctx.off(_waitNotifObj);
				_waitNotifObj = null;
			}
			var evObj = {};
			evObj[_eventName] = function(ev) {
				var res = popup.getCloseResult(ev);
				if (typeof callback === 'function') {
					callback.apply(popup, [res]);
				};
			};
			_waitNotifObj = _pg.addOn(evObj, false, false, 0, true);
				
			// wait until page is closed
			if (_waitCloseObj != null) {
				ctx.off(_waitCloseObj);
				_waitCloseObj = null;
			}
			_waitCloseObj = _pg.addOn({ UNLOAD: function(ev) {
				if (_waitNotifObj) {
					// stop listening to notifications
					ctx.off(_waitNotifObj);
					_waitNotifObj = null;
				}
				ctx.off(_waitCloseObj);
				_waitCloseObj = null;
				var res = popup.getCloseResult(ev);
				if (typeof callback === 'function') {
					callback.apply(popup, [res]);
				} 
			}}, false, false, 0, true);
		}
		return this;
  }
	
}


/**
 * Module for Clipboard management
 * @class ctx.smartClipboard
 * @path ctx.smartClipboard
 * @constructor
 */
ctx.smartClipboard = (function() {
	var _params = {};
	var self = 
	/** @lends ctx.smartClipboard */
	{
	/**
	* The 'Smart Clipboard' is a tool to memorize project data, and display them in a popup, to easily and quickly insert data in any application.
	* 
	* \\
	* For an overview about 'Smart Clipboard', see [[pg:orch.clipboard#smart_clipboard_management|Programming Guide]].		
	*/
		data: {},
		/** \\
		* ===== Methods =====
		*/

		/**
		* Clears the content of the clipboard 
		* @description
		* __Ex.:__
<code javascript>
ctx.smartClipboard.clear();
</code>
		* @method clear
	  * @path ctx.smartClipboard.clear
		*/
		clear : function() {
			for (var id in self.data) {
				self.data[id] = '';
			}
		},

		/**
		* Initialises clipboard fields 
		* @description
		* __Ex.:__
<code javascript>
var text = ctx.smartClipboard.init({
  id: { label:'Id', icon: 'key' },
  name: { label:'Name', icon: 'user' },
  firstname: { label:'Firstname', icon: 'user' }
});
</code>
		* @method init
	  * @path ctx.smartClipboard.init
		* @param {Object} obj object describing the parameters
		* @return {boolean}
		*/
		init : function (obj) {
			_params = {};
			self.data = {};
			for (var id in obj) {
				_params[id] = {
					label: obj[id].label || id,
					icon: obj[id].icon
				};
				self.data[id] = obj[id].value || '';
			}
			return true;
		},

		/**
		* Displays clipboard popup
		* @description
		* __Ex.:__
<code javascript>
ctx.smartClipboard.show();
</code>
		* @method show
	  * @path ctx.smartClipboard.show
	  * @param {string} [name] popup name (default is 'pPopupClipboard')
		* @return {ctx.popupClass} popup object
		*/
		show : function (name) {
			var label = "<script>function cl(element) { close(element.id); }</script>";
			var count = 0;
			for (var id in _params) {
				count ++;
				if (self.data[id]) {
					var icon = _params[id].icon;
					if (icon) {
						if (icon.indexOf('.') == -1)
							icon = icon + '.png';
						if ((icon.indexOf('\\') == -1) && (icon.indexOf('/') == -1))
							icon = ctx.options.resourceURL + '/bmp/' + icon;
					}
					label = label + "<img src='" + icon + "' height='16' width='16'>";
					label = label + "<a name='choiceLink'  href='javascript:void(0)' id='" + id + "' onclick='cl(this);' > ";
					if (_params[id].label)
						label = label + _params[id].label + ': ';
					label = label + '<b>' + self.data[id] + "</b> </a><br/>";
				}
			}
			name = name || 'pClipboard';
			var popup = ctx.popup(name).open({
				template: e.popup.template.Close,
				titleVisible: false,
				X: e.popup.position.Right,
				Y: e.popup.position.Bottom,
				XSlide: e.popup.position.Right,
				CX: 400,
				CY: (count ? (count * 25 + 10) : 300),
				transparency: 90,
				message: label,
		    autoClose: 15000, // default is 15 s
				color: e.popup.color.Yellow			
			});
			popup.waitResult(function(res) {
				// selected id (or 'ok' si 'Ok' button was clicked without selection)
				var id = res;
				if (_params[id]) {
					var txt = String(self.data[id]);
					if (txt != '') {
						//ctx.log(txt);
						ctx.keyStroke(txt);
					}
				}
			});
			return popup;
		}
	};
	return self;
})();

/** alias used for Intellisense
* @method $popup
* @path ctx.$popup
* @ignore
*/
ctx.$popup = ctx.popup('pDummy');

/** popup object
* @path popup
* @type {ctx.popupClass}
* @ignore
*/
var popup = ctx.$popup;

/** alias used for Intellisense
* @method $init
* @path ctx.popupClass.$init
* @ignore
*/
popup.$init = popup.init({});

