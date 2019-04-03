/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Bootstrap popup templates ======
* \\
* :!: //__Caution:__ this page is auto-generated from source code and should not be modified from wiki application//
* \\
* \\
* ===== Presentation =====
* \\
*  Bootstrap popup templates are a set of pre-defined templates based on the Bootstrap JS framework.
* 
*  See [[http://getbootstrap.com/|Bootstrap Web site]] for more details about this framework.
*
* It provides an easy way to display popups or forms with advanced html content, buttons, input controls, ..., 
*
* To avoid spending time in learning Bootstrap syntax and possibilities, the templates provides a configuration interface which allows to specify the html content to display (messages, controls, ...) by providing a description object.
* 
*
* Different types of templates are provided by default :
*   * simple popups to display messages, with buttons ('Yes', 'No', 'Ok', 'Cancel', 'Close', ...),
*   * tooltip popups,
*   * forms to input values.
*
* The template can be displayed inside a web browser (Internet Explorer) or in a popup ('ctx.popup.messbox2')
*
* Syntax to display a popup is :
*
<code javascript>
var popup = ctx.popup('<popup name>'[, <template name>]).open( <container options> <html options> );
</code>
*
* For more details about the popup management, see [[:lib:ctx:ctx.popup|ctx.popup]].
*
* \\
* 
* ------
* ===== Definitions and enumerations =====
* \\
*/

/**
* Bootstrap Popup templates
* @description
* __Ex.:__
<code javascript>
str = ctx.popup('pAbout', e.popup.template.Ok).open({...});
</code>
*
* or:
*
<code javascript>
str = ctx.popup('pAbout').open({
  template: e.popup.template.Ok,
  ...
});
</code>

* @enumeration popup.template
* @enum {string}
* @path e.popup.template
* @readonly
* @var None Base default template
* @var NoButton Display template without buttons
* @var Close Display template with 'Close' button
* @var Ok Display template with 'Ok' button
* @var YesNo Display template with 'Yes', 'No' buttons
* @var OkCancel Display template with 'Ok', 'Cancel' buttons
* @var OkCancelOther Display template with 'Ok', 'Cancel', 'Other' buttons
* @var FormSubmit Template used to build forms 
* @var Tooltip Template used to build tooltips
* @var TooltipAlert Template used to build progress tooltips (right bottom corner with slide effect)
* @var AppBar Template used to build application bars (AppBar)
* @var Maps Template used to display Google Maps or StreetView popup
 */
e.popup.template = {
	None:       				'pCtxtPopupBase',
	NoButton:   				'pCtxtPopupBootstrapNoButton',
	Close:     				  'pCtxtPopupBootstrapClose',
	Ok :      			   	'pCtxtPopupBootstrapOk',
	YesNo:     					'pCtxtPopupBootstrapYesNo',
	OkCancel:    				'pCtxtPopupBootstrapOkCancel',
	OkCancelOther: 			'pCtxtPopupBootstrapOkCancelOther',
	FormSubmit: 				'pCtxtPopupBootstrapFormSubmit',
	Tooltip: 						'pCtxtPopupBootstrapTooltip',
	TooltipAlert:				'pCtxtPopupBootstrapTooltipAlert',
	TooltipAlertClose:	'pCtxtPopupBootstrapTooltipAlertClose',
	AppBar: 						'pCtxtPopupAppBar',
	Maps: 							'pCtxtPopupBootstrapMaps'
}

/**

===Popup template hierarchy===
* \\
* <WRAP orgchart>
* ^Name            ^Parent        ^Description                         ^
* |None            |              |Root template                       |
* |NoButton        |None          |Basic empty popup                   |
* |Close           |NoButton      |Popup with 'Close'                  |
* |Ok              |NoButton      |Popup with 'Ok'                     |
* |YesNo           |NoButton      |Popup with 'Yes', 'No'              |
* |OkCancel        |NoButton      |Popup with 'Ok', 'Cancel'           |
* |OkCancelOther   |NoButton      |Popup with 'Ok', 'Cancel' , 'Other' |
* |FormSubmit      |NoButton      |Popup to display a form             |
* |Tooltip         |NoButton      |Tooltip popup                       |
* |TooltipProgress |Tooltip       |Tooltip for progress display        |
* |Maps            |Tooltip       |Tooltip for Google Maps display     |
* |AppBar          |              |Application bar popup               |
* </WRAP>
* 
* \\
*/

/**
* Bootstrap Popup templates : just an alias for compatibility with existing configurations
* @deprecated use e.popup.template instead of e.popup.bootbox
* @enumeration popup.bootbox
* @advanced
* @enum {string}
* @path e.popup.bootbox
* @readonly
 */
e.popup.bootbox = e.popup.template;

/**
* Bootstrap Popup button style or color
* @description
* __Ex.:__
<code javascript>
// *** popupClose ***
ctx.popup(e.popup.template.Close).init({
  ... 
  buttons: { 
    ok: {	
      ...
      type: e.popup.buttonStyle.Grey
    } 
  } 
});
</code>
* @enumeration popup.buttonStyle
* @enum {string}
* @path e.popup.buttonStyle
* @readonly
* @var Blue Blue button
* @var Cyan Cyan button
* @var Green Green button
* @var Grey Grey button
* @var Orange Orange button
* @var Red Red button
* @var Link Link button
*/
e.popup.buttonStyle = {
  Blue: 	'primary',
  Cyan:  'info',
  Green:  'success',
  Grey: 	'default',
  Orange: 'warning',
  Red:   	'danger',
  Link:   'link'
};

/**
* Object type in a Bootstrap popup form
* @description
* __Ex.:__
<code javascript>
ctx.popup('pMyForm').init({
  ... 
  form: {
    group: [ {
      labelUsername: {
        type: e.popup.formType.Label,
        value: 'Username',
        width: 3
      }, {
      username: {
        type: e.popup.formType.Text,
        width: 9
      }
    } 
  ] }
});
</code>
* @enumeration popup.formType
* @enum {string}
* @path e.popup.formType
* @readonly
* @var Button Button
* @var Checkbox Checkbox
* @var Date Date text area
* @var Email Email
* @var Label Simple label
* @var Number Number
* @var Password Password text area
* @var Radio Radio button
* @var Select Combobox control
* @var Text Single-lign text area
* @var Time Time text area
* @var Text Single-lign text area
*/
e.popup.formType = {
  Button:   	'button',
  Checkbox:   'checkbox',
  'Date':  		'date',
  Email:   		'email',
  Label:   		'label',
  'Number':   'number',
  Password: 	'password',
  Radio: 			'radio',
  Select: 		'select',
  Text:   		'text',
  Time:   		'time',
  TextArea:   'textarea'
};

/**
* Bootstrap Popup button icons
* @description
* The icons are based on Bootstrap glyphicon
*
* For more details about the available icons, see: [[http://www.w3schools.com/bootstrap/bootstrap_ref_comp_glyphs.asp|Bootstrap Glyphicon Components]]
*
* To use a given , for example 'glyphicon glyphicon-pushpin', just use 'pushpin'
* __Ex.:__
<code javascript>
// *** popupClose ***
ctx.popup(e.popup.template.Close).init({
  ... 
  buttons: { 
    ok: {	
      ...
      icon: e.popup.buttonIcon.ok
    } 
  } 
});
</code>
* @enumeration popup.buttonIcon
* @enum {string}
* @path e.popup.buttonIcon
* @readonly
* @var asterisk glyphicon-asterisk
* @var plus glyphicon-plus
* @var ... ...
*/
e.popup.buttonIcon = {
 asterisk: 'asterisk',
 plus: 'plus',
 minus: 'minus',
 euro: 'euro',
 cloud: 'cloud',
 envelope: 'envelope',
 pencil: 'pencil',
 glass: 'glass',
 music: 'music',
 search: 'search',
 heart: 'heart',
 star: 'star',
 starEmpty: 'star-empty',
 user: 'user',
 film: 'film',
 thLarge: 'th-large',
 th: 'th',
 thList: 'th-list',
 ok: 'ok',
 remove: 'remove',
 zoomIn: 'zoom-in',
 zoomOut: 'zoom-out',
 off: 'off',
 signal: 'signal',
 cog: 'cog',
 trash: 'trash',
 home: 'home',
 file: 'file',
 time: 'time',
 road: 'road',
 downloadAlt: 'download-alt',
 download: 'download',
 upload: 'upload',
 inbox: 'inbox',
 playCircle: 'play-circle',
 repeat: 'repeat',
 refresh: 'refresh',
 listAlt: 'list-alt',
 lock: 'lock',
 flag: 'flag',
 headphones: 'headphones',
 volumeOff: 'volume-off',
 volumeDown: 'volume-down',
 volumeUp: 'volume-up',
 qrcode: 'qrcode',
 barcode: 'barcode',
 tag: 'tag',
 tags: 'tags',
 book: 'book',
 bookmark: 'bookmark',
 print: 'print',
 camera: 'camera',
 font: 'font',
 bold: 'bold',
 italic: 'italic',
 textHeight: 'text-height',
 textWidth: 'text-width',
 alignLeft: 'align-left',
 alignCenter: 'align-center',
 alignRight: 'align-right',
 alignJustify: 'align-justify',
 list: 'list',
 indentLeft: 'indent-left',
 indentRight: 'indent-right',
 facetimeVideo: 'facetime-video',
 picture: 'picture',
 mapMarker: 'map-marker',
 adjust: 'adjust',
 tint: 'tint',
 edit: 'edit',
 share: 'share',
 check: 'check',
 move: 'move',
 stepBackward: 'step-backward',
 fastBackward: 'fast-backward',
 backward: 'backward',
 play: 'play',
 pause: 'pause',
 stop: 'stop',
 forward: 'forward',
 fastForward: 'fast-forward',
 stepForward: 'step-forward',
 eject: 'eject',
 chevronLeft: 'chevron-left',
 chevronRight: 'chevron-right',
 plusSign: 'plus-sign',
 minusSign: 'minus-sign',
 removeSign: 'remove-sign',
 okSign: 'ok-sign',
 questionSign: 'question-sign',
 infoSign: 'info-sign',
 screenshot: 'screenshot',
 removeCircle: 'remove-circle',
 okCircle: 'ok-circle',
 banCircle: 'ban-circle',
 arrowLeft: 'arrow-left',
 arrowRight: 'arrow-right',
 arrowUp: 'arrow-up',
 arrowDown: 'arrow-down',
 shareAlt: 'share-alt',
 resizeFull: 'resize-full',
 resizeSmall: 'resize-small',
 exclamationSign: 'exclamation-sign',
 gift: 'gift',
 leaf: 'leaf',
 fire: 'fire',
 eyeOpen: 'eye-open',
 eyeClose: 'eye-close',
 warningSign: 'warning-sign',
 plane: 'plane',
 calendar: 'calendar',
 random: 'random',
 comment: 'comment',
 magnet: 'magnet',
 chevronUp: 'chevron-up',
 chevronDown: 'chevron-down',
 retweet: 'retweet',
 shoppingCart: 'shopping-cart',
 folderClose: 'folder-close',
 folderOpen: 'folder-open',
 resizeVertical: 'resize-vertical',
 resizeHorizontal: 'resize-horizontal',
 hdd: 'hdd',
 bullhorn: 'bullhorn',
 bell: 'bell',
 certificate: 'certificate',
 thumbsUp: 'thumbs-up',
 thumbsDown: 'thumbs-down',
 handRight: 'hand-right',
 handLeft: 'hand-left',
 handUp: 'hand-up',
 handDown: 'hand-down',
 circleArrowRight: 'circle-arrow-right',
 circleArrowLeft: 'circle-arrow-left',
 circleArrowUp: 'circle-arrow-up',
 circleArrowDown: 'circle-arrow-down',
 globe: 'globe',
 wrench: 'wrench',
 tasks: 'tasks',
 filter: 'filter',
 briefcase: 'briefcase',
 fullscreen: 'fullscreen',
 dashboard: 'dashboard',
 paperclip: 'paperclip',
 heartEmpty: 'heart-empty',
 link: 'link',
 phone: 'phone',
 pushpin: 'pushpin',
 usd: 'usd',
 gbp: 'gbp',
 sort: 'sort',
 sortByAlphabet: 'sort-by-alphabet',
 sortByAlphabetAlt: 'sort-by-alphabet-alt',
 sortByOrder: 'sort-by-order',
 sortByOrderAlt: 'sort-by-order-alt',
 sortByAttributes: 'sort-by-attributes',
 sortByAttributesAlt: 'sort-by-attributes-alt',
 unchecked: 'unchecked',
 expand: 'expand',
 collapseDown: 'collapse-down',
 collapseUp: 'collapse-up',
 logIn: 'log-in',
 flash: 'flash',
 logOut: 'log-out',
 newWindow: 'new-window',
 record: 'record',
 save: 'save',
 open: 'open',
 saved: 'saved',
 'import': 'import',
 'export': 'export',
 send: 'send',
 floppyDisk: 'floppy-disk',
 floppySaved: 'floppy-saved',
 floppyRemove: 'floppy-remove',
 floppySave: 'floppy-save',
 floppyOpen: 'floppy-open',
 creditCard: 'credit-card',
 transfer: 'transfer',
 cutlery: 'cutlery',
 header: 'header',
 compressed: 'compressed',
 earphone: 'earphone',
 phoneAlt: 'phone-alt',
 tower: 'tower',
 stats: 'stats',
 sdVideo: 'sd-video',
 hdVideo: 'hd-video',
 subtitles: 'subtitles',
 soundStereo: 'sound-stereo',
 soundDolby: 'sound-dolby',
 sound51: 'sound-5-1',
 sound61: 'sound-6-1',
 sound71: 'sound-7-1',
 copyrightMark: 'copyright-mark',
 registrationMark: 'registration-mark',
 cloudDownload: 'cloud-download',
 cloudUpload: 'cloud-upload',
 treeConifer: 'tree-conifer',
 treeDeciduous: 'tree-deciduous',
 cd: 'cd',
 saveFile: 'save-file',
 openFile: 'open-file',
 levelUp: 'level-up',
 copy: 'copy',
 paste: 'paste',
 alert: 'alert',
 equalizer: 'equalizer',
 king: 'king',
 queen: 'queen',
 pawn: 'pawn',
 bishop: 'bishop',
 knight: 'knight',
 babyFormula: 'baby-formula',
 tent: 'tent',
 blackboard: 'blackboard',
 bed: 'bed',
 apple: 'apple',
 erase: 'erase',
 hourglass: 'hourglass',
 lamp: 'lamp',
 duplicate: 'duplicate',
 piggyBank: 'piggy-bank',
 scissors: 'scissors',
 bitcoin: 'bitcoin',
 yen: 'yen',
 ruble: 'ruble',
 scale: 'scale',
 iceLolly: 'ice-lolly',
 iceLollyTasted: 'ice-lolly-tasted',
 education: 'education',
 optionHorizontal: 'option-horizontal',
 optionVertical: 'option-vertical',
 menuHamburger: 'menu-hamburger',
 modalWindow: 'modal-window',
 oil: 'oil',
 grain: 'grain',
 sunglasses: 'sunglasses',
 textSize: 'text-size',
 textColor: 'text-color',
 textBackground: 'text-background',
 objectAlignTop: 'object-align-top',
 objectAlignBottom: 'object-align-bottom',
 objectAlignHorizontal: 'object-align-horizontal',
 objectAlignLeft: 'object-align-left',
 objectAlignVertical: 'object-align-vertical',
 objectAlignRight: 'object-align-right',
 triangleRight: 'triangle-right',
 triangleLeft: 'triangle-left',
 triangleBottom: 'triangle-bottom',
 triangleTop: 'triangle-top',
 superscript: 'superscript',
 subscript: 'subscript',
 menuLeft: 'menu-left',
 menuRight: 'menu-right',
 menuDown: 'menu-down',
 menuUp: 'menu-up'
};


GLOBAL.events.START.on(function (ev) {

	// ***************************
	// *** set popup templates ***
	// ***************************
	// *** popupNone ***
	ctx.popup(e.popup.template.None).init({
		container: true,
		content: e.popup.content.Web,
		url: '/popup/popup.html',
		title: '',
		size : 'small',
		IEHost: false,
		toolWindow: true,
		topMost: true,
		modal: false,
		autoSizeId: 'popupDiv',
		X: e.popup.position.Center,
		Y: e.popup.position.Center,
		CX: 600,
		CY: 300,
		display: e.popup.display.Undefined,
		onFuncLoad: 'initialize',
		header: "<H4>No valid template provided !</H4>", 
		message: undefined, 
		icon: undefined,
		escape: undefined,
		color: e.popup.color.Red
	});
	
	// *** popupNone ***
	ctx.popup(e.popup.template.NoButton).init({
		template: e.popup.template.None,
		title: GLOBAL.labels.popup.defaultTitle,
		titleIcon: e.popup.icon16.contextor,
		header: undefined, 
		message: undefined, 
		color: e.popup.color.None 
	});
	
	// *** popupClose ***
	ctx.popup(e.popup.template.Close).init({
		template: e.popup.template.NoButton,
		escape: 'close',
		buttons: { 
			close: {	
				label: GLOBAL.labels.buttons.close, 
				type: e.popup.buttonStyle.Grey
			} 
		} 
	});
	
	// *** popupOk ***
	ctx.popup(e.popup.template.Ok).init({
		template: e.popup.template.NoButton,
		escape: 'ok', 
		buttons: { 
			ok: {	
				label: GLOBAL.labels.buttons.ok, 
				type: e.popup.buttonStyle.Blue,
				icon: e.popup.buttonIcon.ok 
			} 
		} 
	});
	
	// *** popupYesNo ***
	ctx.popup(e.popup.template.YesNo).init({
		template: e.popup.template.NoButton,
		escape: 'no', 
		buttons: { 
			yes: { 
				label: GLOBAL.labels.buttons.yes, 
				type: e.popup.buttonStyle.Green,
				icon: e.popup.buttonIcon.ok 
			}, 
			no: { 
				label: GLOBAL.labels.buttons.no, 
				type: e.popup.buttonStyle.Red,
				icon: e.popup.buttonIcon.remove
			} 
		} 
	});
	
	// *** popupOkCancel ***
	ctx.popup(e.popup.template.OkCancel).init({
		template: e.popup.template.NoButton,
		escape: 'cancel',	
		buttons: {	
			ok: {	
				label: GLOBAL.labels.buttons.ok,	
				type: e.popup.buttonStyle.Green,
				icon: e.popup.buttonIcon.ok 
			},	
			cancel: {	
				label: GLOBAL.labels.buttons.cancel,	
				type: e.popup.buttonStyle.Red,
				icon: e.popup.buttonIcon.remove
			}	
		}	
	});	
	
	// *** popupOkCancelOther ***
	ctx.popup(e.popup.template.OkCancelOther).init({
		template: e.popup.template.NoButton,
		escape: 'cancel',	
		buttons: {	
			ok: {	
				label: GLOBAL.labels.buttons.ok,	
				type: e.popup.buttonStyle.Green,
				icon: e.popup.buttonIcon.ok 
			},	
			cancel: {	
				label: GLOBAL.labels.buttons.cancel,	
				type: e.popup.buttonStyle.Red,
				icon: e.popup.buttonIcon.remove
			},	
			other: {	
				label: GLOBAL.labels.buttons.other,	
				type: e.popup.buttonStyle.Grey,
				icon: e.popup.buttonIcon.pushpin
			}	
		}	
	});	

	
	// *** popupFormSubmit ***
	ctx.popup(e.popup.template.FormSubmit).init({
		template: e.popup.template.NoButton,
		escape: 'cancel',	
		form:{
			// form description to be completed...
		},
		buttons: {
			ok: {	
				label: GLOBAL.labels.buttons.ok,	
				type: e.popup.buttonStyle.Green,
				submit: true,	
				icon: e.popup.buttonIcon.ok 
			},	
			cancel: {	
				label: GLOBAL.labels.buttons.cancel,	
				type: e.popup.buttonStyle.Red,
				icon: e.popup.buttonIcon.remove
			}	
		}	
	});	
	
	// *** popupTooltip ***
	ctx.popup(e.popup.template.Tooltip).init({
		template: e.popup.template.NoButton,
		titleVisible: false,
		highlight: true,
		//resizable: false,
		fade: 500,
		XRelative: e.popup.position.Center,
		YRelative: e.popup.position.Top,
		CX: 400,
		transparency: 90,
		closeOnClick: true,
    autoClose: 5000, // default is 5 s
		color: e.popup.color.Blue
		/*classes: {
			'icon-class': 'icon-class-tooltip',
			'modal-body': 'modal-body-tooltip',
			'modal-dialog': 'modal-dialog-tooltip'
		}*/
	});	
	
	// *** popupTooltipAlert ***
	ctx.popup(e.popup.template.TooltipAlert).init({
		template: e.popup.template.Tooltip,
		X: e.popup.position.Right,
		Y: e.popup.position.Bottom,
		XSlide: e.popup.position.Right,
		CX: 500,
		closeOnClick: false,
		icon: e.popup.gif.loader3,
    autoClose: 60000, // default is 60 s
		color: e.popup.color.Yellow			
	});	
	
	// *** popupTooltipAlertClose ***
	ctx.popup(e.popup.template.TooltipAlertClose).init({
		template: e.popup.template.TooltipAlert,
    autoClose: 0, // no auto close
		buttons: {
      ok: {
        label: e.popup.button.Close,
        type: e.popup.buttonStyle.Cyan
      }
    }
	});	
	
	// *** popupMaps ***
	ctx.popup(e.popup.template.Maps).init({
		template: e.popup.template.Tooltip,
		url: '/popup/popupMaps.html',
		maps: {	},
		resizable: true,
		closeOnClick: false,
		color: e.popup.color.None,
		transparency: 100,
		CX: 440,
		CY: 300,
    autoClose: 0, // no auto close
		buttons: {
      ok: {
        label: e.popup.button.Close,
        type: e.popup.buttonStyle.Cyan
      }
    }
	});	
	
	// *** popupAppBar ***
	ctx.popup(e.popup.template.AppBar).init({
		title: 'App Bar',
		url: '/appbar/appbar.html',
		IEHost: true,
		resizable: true,
		compactCX: 36,
    titleVisible: false,
    CX: 400,
    CY: 600,
    minCX: 36,
    maxCX: 800,
    topMost: true,
    autoHide: true,
    appBar: true,
		modal: false,
		display: e.popup.display.Right,
    X: e.popup.position.Right,
		Y: e.popup.position.Center
	});		
	
});
