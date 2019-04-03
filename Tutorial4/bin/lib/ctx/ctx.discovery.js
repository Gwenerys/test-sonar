/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== ctx.discovery class ======
*\\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* \\
* The ''ctx.discovery'' class implements a set of functions to manage the Discovery capabilities.\\
*
* Discovery functions are used to capture all user actions, and screens. Generated captures in a 'timeline' file ('.psct') can then be analyzed with Contextor Studio Discovery :
*   * either to make analysis of application usage, 
*   * or to help and accelerate generating page declarations in the Studio,
* \\
* For more details, see [[:pg:lib.ext.discovery|Contextor Discovery management]].
* \\
*/

// init discovery labels
GLOBAL.labels.set({
  discovery: {
    title: { 
      en:"Discovery capture recording", 
      fr:"Discovery capture recording", 
      de:"Discovery capture recording" },
    commentTooltip: {
      en:'Insert a comment',
      fr:'Commentaire',
      de:'Insert a comment'  },
    addComment: { 
      en:"Comment", 
      fr:"Comment", 
      de:"Comment" },
    addCommentTooltip: { 
      en:"Click to insert a comment", 
      fr:"Click to insert a comment", 
      de:"Click to insert a comment" },
    start: { 
      en:"Start", 
      fr:"Démarrer", 
      de:"Start" },
    startTooltip: { 
      en:"Click to start recording", 
      fr:"Cliquer pour démarrer l'enregistrement", 
      de:"Click to start recording" },
    stop: { 
      en:"Stop", 
      fr:"Arrêter", 
      de:"Stop" },
    stopTooltip: { 
      en:"Click to stop recording", 
      fr:"Cliquer pour arrêter l'enregistrement", 
      de:"Click to stop recording" },
    cancelTooltip: {
      en:'Click to cancel',
      fr:'Click to cancel',
      de:'Click to cancel'
    }
  }
});

/** 
 * @class       ctx.options.discovery
 * @summary     Options for the 'ctx.discovery' library
 * @path        ctx.options.discovery
 * @struct
 */
ctx.options.discovery = {
 /** 
  * @summary    Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
  * @property   {e.trace.level} traceLevel
  * @path       ctx.options.discovery.traceLevel 
  */ 
  traceLevel: e.trace.level.None
};

/**
 * @class       ctx.discovery
 * @summary     Class for the Discovery module 
 * @constructor
 */
ctx.discovery = (function () {
 /** 
  * @ignore
  * @type {Object} 
  */ 
  var _options = ctx.options.discovery;
 /** 
  * @ignore
  * embedded page object
  * @type {ctx.page} 
  */
  var _page = null; 
 /** 
  * @ignore
  * parent process
  * @type {ctx.application} 
  */
  var _parentProcess = null; 
 /** 
  * @ignore
  * page name 
  * @type {string} 
  */
  var _name = '';
 /** 
  * @ignore
  * Discovery folder
  * @type {string} 
  */
  var _discoveryPath = '';
 /** 
  * @ignore
  * @type {boolean} 
  */
  var _isStarted = false; 
  var _isPopupOpened = false; 
  var self = 
  /** @lends ctx.discovery */
  {
   /** 
    * @ignore
    * @const 
    * @property {string} ctxType class type 
    */ 
    ctxType: 'ctx.discovery',
  
   /**
    * Closes the Discovery popup.
    * @method      closePopup
    * @summary     Closes the Discovery popup.
    * @description
    * __Ex.:__
<code javascript>
var res = ctx.discovery.closePopup();
</code>
    * @path        ctx.discovery.closePopup
    */
    closePopup : function() {
      if (_isPopupOpened) {
        // close popup
        ctx.popup('pDiscovery').close();
        _isPopupOpened = false;
      }
      // stop capture
      ctx.discovery.stop();
    },
    
   /**
    * Terminates the Discovery module.
    * @method      end
    * @summary     Terminates the Discovery module.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.end();
</code>
    * @path        ctx.discovery.end
    * @return      {boolean} true for success, false otherwise
    */
    end : function () {
      ctx.notifyAction('ctx.discovery.end');
      this.closePopup();
      if (_isStarted)
      {
        this.stop();
        _isStarted = false;
      }
      if (_page) {
        _page = null;
      }
      return true;
    },
    
   /**
    * Initializes the Discovery module.
    * @method      init
    * @summary     Initializes the Discovery module.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.init();
</code>
    * @path        ctx.discovery.init
    * @param       {ctx.application} [parentProcess] Parent process object (by default, 'GLOBAL' is used)
    * @param       {string} [name] Discovery page name (by default, 'pDiscovery' is used)
    * @return      {boolean} true for success, false otherwise
    */
    init : function (parentProcess, name) {
      if (!_page) {
        ctx.notifyAction('ctx.discovery.init');
        _parentProcess = (parentProcess || GLOBAL); // parent process
        _name = name || 'pDiscovery'; // page name
        _page = _parentProcess.createExtendedConnector(e.extendedConnector.Discovery, _name);
      }
      return (_page != null);
    },
    
   /**
    * Inserts a comment in the current timeline.
    * @method      insert
    * @summary     Inserts a comment in the current timeline.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.insert( { Label: 'started customer resiliation', Process: 'cust_resil', Step: 'start' } );
</code>
    * @path        ctx.discovery.insert
    * @param       {Object} params Parameter object
    * @return      {boolean} true for success, false otherwise
    */
    insert : function (params) {
      ctx.notifyAction('ctx.discovery.insert');
      if (!_isStarted) {
        return false;        
      }
      var str = '', att, val;
      for (att in params) {
        if ((typeof params[att] !== 'undefined') && (params[att] != null)) {
          val = String(params[att]);
          str = str + "<" + att + ">";
          var bCData = (val && (val !== '') && ((val.indexOf('<') != -1) || (val.indexOf('>') != -1) || (val.indexOf('"') != -1) || (val.indexOf('&') != -1)));
          if (bCData)
            str = str + "<![CDATA[";
          str = str + params[att];
          if (bCData)
            str = str + "]]>";
          str = str + "</" + att + ">";
        }
      }
      var res = _page.actionApp('ADDCOMMENT', str);
      return true;
    },
    
   /**
    * Executes a page screenshot.
    * @ignore
    * @method      screenshot
    * @summary     Executes a page screenshot.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.screenshot();
</code>
    * @path        ctx.discovery.screenshot
    * @param       {string} [type] Screenshot type TBC
    * @param       {string} [filename] Screenshot filename
    * @return      {boolean} true for success, false otherwise
    */
    screenshot : function (type, filename) {
      ctx.notifyAction('ctx.discovery.screenshot');
      // todo
      return true;
    },
    
   /**
    * Displays the Discovery popup.
    * @method      showPopup
    * @summary     Displays the Discovery popup.
    * @description
    * __Ex.:__
<code javascript>
var res = ctx.discovery.showPopup();
</code>
    * @path        ctx.discovery.showPopup
    */
    showPopup : function() {
      _isPopupOpened = true;
      ctx.discovery.popup = ctx.popup('pDiscovery').open({ 
          template: e.popup.template.NoButton,
          title: GLOBAL.labels.discovery.title,
          canClose: false,
          X: e.popup.position.Right,
          Y: e.popup.position.Bottom,
          CX: 500,
          CY: 150,
          form: {
            id : 'inputForm',
            group : [{
              comment : {
                type : "textarea",
                rows : 1,
                value : '',
                width : 12,
                tooltip : GLOBAL.labels.discovery.commentTooltip,
                tooltipPlacement : e.popup.position.Bottom
              }
            }]
          }, 
          //escape: 'cancel',  
          size : "small",
          buttons: {  
            action: {  
              label: (_isStarted ? GLOBAL.labels.discovery.stop : GLOBAL.labels.discovery.start),  
              icon: (_isStarted ? e.popup.buttonIcon.stop : e.popup.buttonIcon.play),
              tooltip: (_isStarted ? GLOBAL.labels.discovery.stopTooltip : GLOBAL.labels.discovery.startTooltip),
              tooltipPlacement: e.popup.position.Top,
              submit : true,
              type: (_isStarted ? e.popup.buttonStyle.Red : e.popup.buttonStyle.Green)
            },  
            addComment: (_isStarted ? {  
              label: GLOBAL.labels.discovery.addComment,  
              tooltip: GLOBAL.labels.discovery.addCommentTooltip,
              tooltipPlacement: e.popup.position.Top,
              icon: 'pencil',
              submit : true,
              disabled: (_isStarted ? false : true),
              type: 'primary'  
            } : undefined),  
            cancel: {  
              label: GLOBAL.labels.buttons.cancel,  
              tooltip: GLOBAL.labels.discovery.cancelTooltip,
              tooltipPlacement: e.popup.position.Top,
              icon: 'check',
              submit : true,
              type: 'default'  
            }  
          }
          }).waitResult(function(res) {
          _isPopupOpened = false;
          // save current values
          var comment = res.comment;
          if (res.button == 'action') {
            if (_isStarted) {
              // Stop capture
              ctx.discovery.stop();
              ctx.wait(function(ev) {
                // update display 
                ctx.discovery.showPopup();
              }, 100);
            } else {
              // Start capture
              ctx.discovery.start();
              ctx.wait(function(ev) {
                // update display 
                ctx.discovery.showPopup();
              }, 100);
            }
          } else if (res.button == 'cancel') {
            // Stop capture, don't save
            ctx.discovery.stop(true);
          } else if (res.button == 'addComment') {
            if (_isStarted) {
              // *** Insert comment and screenshot ***
              ctx.discovery.insert( { Label: comment } );
              ctx.discovery.screenshot();
            }
            ctx.wait(function(ev) {
              // update display 
              ctx.discovery.showPopup();
            }, 100);
          }
      });
    },
    
   /**
    * Starts the Discovery process.
    * @method      start
    * @summary     Starts the Discovery process.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.start();
</code>
    * @path        ctx.discovery.start
    * @param       {string} [path] Folder to be created to store captures
    * @return      {boolean} true for success, false otherwise
    */
    start : function (path) {
      ctx.notifyAction('ctx.discovery.start');
      if (!_isStarted)
      {
        ctx.discovery.init();
        _discoveryPath = path || ctx.options.currentDir + "\\Discovery_" + ctx.getDate() + "_" + ctx.getTime(null, '');
        var res = _page.actionApp('STARTBAE', 'IE64', _discoveryPath);
        _isStarted = true;
      }
      return true;
    },

   /**
    * Stops the Discovery process.
    * @method      stop
    * @summary     Stops the Discovery process.
    * @description
    * __Ex.:__
<code javascript>
ctx.discovery.stop();
</code>
    * @path        ctx.discovery.stop
    * @param       {boolean} [noSave] If true, remove captures
    * @return      {boolean} true for success, false otherwise
    */
    stop : function (noSave) {
      if (_isStarted)
      {
        ctx.notifyAction('ctx.discovery.stop');
        var res = _page.actionApp('STOPBAE');
        _isStarted = false;
        if (noSave) {
          // cancel capture : remove folder
          if (_discoveryPath && ctx.fso.folder.exist(_discoveryPath)) {
            ctx.fso.folder.remove(_discoveryPath);
          }
        } else {
          // ZIP archive
          var zipFile = ctx.discovery.zipArchiveFolder(_discoveryPath);
        }
      }
      return true;
    },
    
   /**
    * Creates an archive file (.zip).
    * @method      zipArchiveFolder
    * @summary     Creates an archive file (.zip).
    * @description
    * :!: Requires Windows Seven or higher.\\
    *
    * __Ex.:__
<code javascript>
ctx.discovery.zipArchiveFolder(traceFolder);
</code>
    * @throws      {Error}
    * @path        ctx.discovery.zipArchiveFolder
    * @param       {string} [folder] Folder to be archived
    * @return      {string} ZIP filename with its full pathname
    */
    zipArchiveFolder : function (folder) {
      ctx.notifyAction('ctx.diagnostic.zipArchiveFolder');
      try {
        folder = folder || _discoveryPath;
        if (!(folder && ctx.fso.folder.exist(folder))) {
          return '';
        }
        // ZIP folder
        var zipFile = folder + '.zip';
        ctx.fso.file.zip([folder], zipFile);
        // delete folder
        ctx.fso.folder.remove(folder);
      } catch (ex) {
        return '';
      }
      return zipFile;
    }    

  };
  return self;
})();
