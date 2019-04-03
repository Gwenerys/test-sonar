/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
 * @module      wscript.js
 * @file        WScript.Shell extension
 * @description This library contains methods to explore the registry, system variables, network.\\
 * 
 * ==== Usage ====
 *   * init() to get WScript.Shell or Create WScript.Shell.\\
 *   * initNetwork() to get WScript.Network or Create WScript.Network.\\
 *   * end() delete the WScript.Shell and the  WScript.Network.\\
 *   * display to format the result as a string.\\
 * \\
 * Using the class registry with some methods : getKey, getKeyList, getSubKeys, getKeyBHO, getKeyDirect, getSubKeysUninstall, getIEVersion.\\
 * \\
 * Using the class shell with some methods : execute, getEnvVariable, enumEnvVariable, expandEnvString, getObject, getSpecialFolders.\\
 * \\
 * Using the class network with method : getObject.\\
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @path        ctx.wscript
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'WScript.Shell' and 'WScript.Network' 
 * @fileoverview
 * @suppress {missingProperties}
 */

/** 
 * @class       ctx.options.wscript 
 * @summary     Options for the 'ctx.wscript' library
 * @path        ctx.options.wscript
 * @struct
 */
ctx.options.wscript = {
  /** 
   * @summary   Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
   * @property  {e.trace.level} traceLevel
   * @path      ctx.options.wscript.traceLevel 
   */ 
   traceLevel: e.trace.level.None
};

/**
 * @class       ctx.wscript
 * @summary     Class for WShell manipulation
 * @constructor
 */
ctx.wscript = (function() {
  /** @type {Object} */ var _options = ctx.options.wscript;
  // private variables
  /** @type {WScriptShell} */ var _shellObj = null;
  /** @type {WScriptNetwork} */ var _networkObj = null;
  var _wscript = /** @lends ctx.wscript */{
   /**
    * Initializes the WScript library.
    * @method      init
    * @summary     Initializes the WScript library.
    * @description
    * __Ex.:__
<code javascript>
ctx.wscript.init();
</code>     
    * @path        ctx.wscript.init
    * @return      {boolean} true for success, false otherwise
    */
    init: function() {
      try {
        // try to get Shell object
        if (_shellObj === null) {
          _shellObj = GetObject("WScript.Shell");
        }
      } catch (ex) {
        try {
          // create Shell object
          if (_shellObj === null) {
            _shellObj = new ActiveXObject("WScript.Shell");
          }
        } catch (ex2) {
          addLog("init : Exception : " + ex2.description);
          return false;
        } // try..catch
      } // try..catch
      return true;
    },
    
   /**
    * Initializes the WScript network library.
    * @method      initNetwork
    * @summary     Initializes the WScript network library.
    * @description
    * __Ex.:__
<code javascript>
ctx.wscript.initNetwork();
</code>     
    * @path        ctx.wscript.initNetwork
    * @return      {boolean} true for success, false otherwise
    */
    initNetwork: function() {
      try {
        // try to get Shell object
        if (_networkObj === null) {
          _networkObj = GetObject("WScript.Network");
        }
      } catch (ex) {
        try {
          // create Shell object
          if (_networkObj === null) {
            _networkObj = new ActiveXObject("WScript.Network");
          }
        } catch (ex2) {
          addLog("initNetwork : Exception : " + ex2.description);
          return false;
        } // try..catch
      } // try..catch
      return true;
    },
    
   /**
    * Ends the WScript library.
    * @method      end
    * @summary     Ends the WScript library.
    * @description
    * __Ex.:__
<code javascript>
ctx.wscript.end();
</code>     
    * @path        ctx.wscript.end
    * @return      {boolean} true for success, false otherwise
    */
    end: function() {
      //addLog(" *** ctx.wscript.end() ***");
      if (_shellObj != null) {
        _shellObj = null;
      } 
      if (_networkObj != null) {
        _networkObj = null;
      } 
      return true;    
    },
    
   /** 
    * Formats the result as an XML string.
    * @method      display 
    * @summary     Formats the result as an XML string.
    * @description
    * __Ex.:__
<code javascript>
ctx.wscript.display(tab, 'Printer', 'Printers');
</code>
    * \\
    * Output should be like: 
<code xml>
"<Printers><Printer>...</Printer>...</Printers>"
</code>     
    * @path        ctx.wscript.display
    * @param       {Array.<string>} tab
    * @param       {string} item Node name
    * @param       {string} category Node category
    */
    display: function(tab, item, category) {
      if (category) {
        category = category.replace(/ /g,"_");
        _wscript.log('  <' + category + '>');
      }
      ctx.each(tab, function(id, node) {
        if (item)
          _wscript.log('    <' + item + '>');
        ctx.each(node, function(id, value) {
          var iReman = id.replace(/ /g,"_");
          _wscript.log('      <' + iReman + '><![CDATA[' + value + ']]></' + iReman + '>');
        });
        if (item)
          _wscript.log('    </' + item + '>');
      });
      if (category)
        _wscript.log('  </' + category + '>');
    },
    
   /**
    * Logs a single line.
    * @method      log
    * @summary     Logs a single line.
    * @description
<WRAP todo>
<todo @cpuget>ctx._wscript.log : to remove ?</todo>\\
</WRAP>
    * __Ex.:__
<code javascript>
ctx._wscript.log('</' + item + '>');
</code>
    * @path        ctx.wscript.log
    * @param       {string} text Text value to generate
    * @return      wscript Application or KO
    */
    log : function(text) {
      addLog(text);
    },
    
    /**
     * @class      ctx.wscript.registry
     * @summary    Class gathering a set of functions to access Windows registry base
     * @path       ctx.wscript.registry
     */
    registry: (function() {
      var _registry = 
      {
       /** 
        * Reads a registry key.
        * @method      getKey 
        * @summary     Reads a registry key.
        * @description
        * __Ex.:__
<code javascript>
bKey = ctx.wscript.registry.getKey(keyPath);
</code>
        * @path        ctx.wscript.registry.getKey
        * @param       {string} keyPath Registry path
        */ 
        getKey : function (keyPath) {
          _wscript.init();
          var baseUrl="";
          try{
            var regValue = _shellObj.RegRead(keyPath);
            if(regValue != "" && regValue!= undefined){
              baseUrl=regValue;
              //addLog("getKey " + baseUrl + " pour la clé " + keyPath);
            }
            return baseUrl;
          }
          catch(ex){
            //addLog("getKey : Exception : " + ex.description);
            return "NotExist";
          }
        },
        
       /** 
        * Returns an array with the subkeys contain.
        * @method       getKeyList 
        * @summary      Returns an array with the subkeys contain.
        * @description
        * __Ex.:__
<code javascript>
bKey = ctx.wscript.registry.getKeyList(sBaseKey, sKey, attribute);
</code>
        * @path         ctx.wscript.registry.getKeyList
        * @param        {string} sBaseKey
        * @param        {string} sKey 
        * @param        {string} attribute
        */
        getKeyList : function(sBaseKey , sKey , attribute) 
        {
          var KLM = 0x80000002;
          var tab = [];
          var bKey = '';
          var rtn = _registry.getSubKeys('.', sBaseKey ,KLM);
          if ( rtn.Results == 0 ) 
            { 
              for (var idx=0;idx<rtn.SubKeys.length;idx++) 
              { 
              try  
              { 
                //addLog("getKey indice : " + idx + " contenu" + rtn.SubKeys[idx]);
                var elem = {};
                var subKey = rtn.SubKeys[idx];
                if (attribute == "") {
                  bKey =  _registry.getKey (sKey + "\\"+ subKey + "\\");
                } else {
                  bKey =  _registry.getKey (sKey + "\\"+ subKey + "\\" + attribute);
                }
                //addLog("getKey donnees : " + bKey + "pour sous clé "+ subKey );
                elem[subKey] = bKey ;
                tab.push(elem);
              } 
              catch(ex)   
              {  
                addLog("getKey exception : " + ex.description ); 
              } 
              }
            }
          return tab;
        },
        
       /** 
        * Returns an array with names of any subkeys.
        * @method      getSubKeys
        * @summary     Returns an array with names of any subkeys.
        * @description
        * __Ex.:__
<code javascript>
bKey = ctx.wscript.registry.getSubKeys('.', sBaseKey, KLM);
</code>
        * @path        ctx.wscript.registry.getSubKeys
        * @param       {string} strComputer Current computer ('.' by default)
        * @param       {string} strRegPath 
        * @param       {number} HKLM
        */
        getSubKeys : function (strComputer, strRegPath, HKLM) 
        { 
          try 
          { 
            var aNames = null;
            strComputer = strComputer || '.';
            var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator"); 
            var objService     = objLocator.ConnectServer(strComputer, "root\\default"); 
            var objReg         = objService.Get("StdRegProv"); 
            var objMethod      = objReg.Methods_.Item("EnumKey"); 
            var objInParam     = objMethod.InParameters.SpawnInstance_(); 
            var retVal;
            objInParam.hDefKey = HKLM; 
            objInParam.sSubKeyName = strRegPath; 
            var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
            switch(objOutParam.ReturnValue) 
            {
              case 0:          // Success 
                aNames = (objOutParam.sNames != null) ? objOutParam.sNames.toArray(): null; 
            retVal = 0;
                break; 
         
              case 2:        // Not Found 
                aNames = null; 
            retVal = 1;
                break; 
            } 
            return { Results : retVal, SubKeys : aNames }; 
          } 
         catch(ex)   
          {  
            return { Results: ex.number, SubKeys : ex.description  }  
          } 
        },
        
       /** 
        * Returns an array with the BHO state (locked or unlocked).
        * @method      getKeyBHO 
        * @summary     Returns an array with the BHO state (locked or unlocked).
        * @description
        * __Ex.:__
<code javascript>
tab = ctx.wscript.registry.getKeyBHO();
</code>
        * @path        ctx.wscript.registry.getKeyBHO
        */
        getKeyBHO : function() 
        {
          var sKey = "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects";
          var sBaseKey = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\explorer\\Browser Helper Objects";
          var sBaseKey2 = "Software\\Microsoft\\Windows\\CurrentVersion\\Ext\\Settings";
          //var sBaseKeyIE = "Software\\Microsoft\\Internet Explorer\\Approved Extensions";
          var KLM = 0x80000002;
          var HKCU = 0x80000001;
          var tab = [];
          var rtn = _registry.getSubKeys(".", sBaseKey ,KLM);
          var rtn2 = _registry.getSubKeys(".", sBaseKey2 ,HKCU);
          //var rtIE =  _registry.getSubKeys(".", sBaseKeyIE ,HKCU);
          if ( rtn.Results == 0 ) 
            { 
              for (var idx=0;idx<rtn.SubKeys.length;idx++) 
              { 
              try  
              { 
                var elem = {};
                var subKey = rtn.SubKeys[idx];
                elem.name =  _registry.getKey (sKey + "\\"+ subKey + "\\");
                elem.id =  subKey;
                //if (elem.name && elem.name == "ConteXtor BHO v3") {
                if (elem.name) {
                  try  
                    { 
                      //elem.enabled = true;
                      var sReadKey = _registry.getKey ("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Approved Extensions\\" +  subKey );
                      if (sReadKey == "NotExist") {
                        var subKey2;
                        elem.enabled = true;
                        for (var idx2=0;idx2<rtn2.SubKeys.length;idx2++) {
                          subKey2 = rtn2.SubKeys[idx2];
                          if (subKey2 == subKey) {
                            // if key is present, and Flags=1, the BHO is disabled
                            var flags = _registry.getKey ("HKEY_CURRENT_USER\\" + sBaseKey2 + "\\" +  subKey + "\\Flags");
                            //var sReadKey = _registry.getKeyList ("HKEY_CURRENT_USER\\" + sBaseKey2,  subKey, "\\Flags");
                            if (flags == 1) {
                              elem.enabled = false;
                            }
                            break;
                          }
                        }
                      } else {
                        sReadKey = _registry.getKey ("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Approved Extensions\\" +  subKey );
                        if (sReadKey == "NotExist") {
                          elem.enabled = false;
                        } else {
                          elem.enabled = true;
                        }
                      }
                      
                    } catch (ex) {
                      //addLog("getKeyBHO exception : " + ex.description  ); 
                      elem.enabled = false;
                    }
                    
                  //addLog("getKeyBHO  existance  : " + bActif + "pour sous clé "+ subKey );
                  tab.push(elem);
                }
              } 
              catch(ex)   
              {  
                addLog("getKeyBHO exception : " + ex.description  ); 
              } 
              }
            }
          return tab;
        },
        
       /** 
        * Returns an array with the subkeys contain.
        * @method      getKeyDirect 
        * @summary     Returns an array with the subkeys contain.
        * @description
        * __Ex.:__
<code javascript>
var sKey = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR";
tab = ctx.wscript.registry.getKeyDirect(sKey, 'Start') ;
</code>
        * @path        ctx.wscript.registry.getKeyDirect
        * @param       {string} sKey 
        * @param       {string} attribute
        * @return      {Array.<string>} array
        */
        getKeyDirect : function(sKey , attribute) {
          var tab = [];
          var elem = {};
          var res;
          //var name = "xxx";
          try {
            if (attribute == "") {
              res =  _registry.getKey (sKey + "\\");
            } else {
              res =  _registry.getKey (sKey + "\\" + attribute);
            }
            
            elem.name =  _registry.getKey (sKey + "\\DisplayName");
            //addLog("getKeyDirect DisplayName : " + name); 
            if (attribute == "Start") {
              if (res == 3) { elem.locked = false; }
              if (res == 4) { elem.locked = true; }
              //elem[name] =  "Usb "  + res ;
            } else {
              //elem[name] =  attribute + " " + res ;
            }
            tab.push(elem);
            return tab;
          } 
          catch(ex)   
          {  
            addLog("getKeyDirect exception : " + ex.description  ); 
            return tab;
          } 
        },
        
       /** 
        * Returns an array with the name and version for the installed programs.
        * @method      getSubKeysUninstall
        * @summary     Returns an array with the name and version for the installed programs.
        * @description (SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\) \\
        * __Ex.:__
<code javascript>
tab = ctx.wscript.registry.getSubKeysUninstall();
</code>
        * @path        ctx.wscript.registry.getSubKeysUninstall
        * @param       {string} [strComputer] Current computer ('.' by default)
        * @return      {Array.<string>} Array of string with the name and version for installed programs
        */ 
        getSubKeysUninstall : function(strComputer) 
        {
          var HKLM = 0x80000002; 
          var tab = [];
          
          strComputer = strComputer || '.';
          var rtn = _registry.getSubKeys(strComputer, "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\", HKLM);
          
          if ( rtn.Results == 0 ) 
            { 
              for (var idx=0;idx<rtn.SubKeys.length;idx++) 
              { 
              //addLog("getSubKeysUninstall indice : " + idx + " contenu" + rtn.SubKeys[idx]);
              try  
              { 
                var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator"); 
                var objService     = objLocator.ConnectServer(strComputer, "root\\default"); 
                var objReg         = objService.Get("StdRegProv"); 
                var objMethod      = objReg.Methods_.Item("GetStringValue"); 
                var objInParam     = objMethod.InParameters.SpawnInstance_(); 
                objInParam.hDefKey = HKLM; 
                var sBaseKey = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
                objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                objInParam.sValueName =  "DisplayName"; 
                var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                //addLog("getSubKeysUninstall DisplayName: " + objOutParam.sValue );
                if (objOutParam.sValue == null) {
                  objInParam.sValueName =  "QuietDisplayName"; 
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  //addLog("getSubKeysUninstall QuietDisplayName: " + objOutParam.sValue );
                }
                var elem = {};
                elem.name = objOutParam.sValue;
                if (elem.name) {
                  //addLog("getSubKeysUninstall Name : " + elem.name );
                  // version
                  objInParam.sValueName =  "DisplayVersion"; 
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  elem.version = objOutParam.sValue;
                  // date
                  objInParam.sValueName =  "InstallDate"; 
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  elem.date = objOutParam.sValue;
                  // vendor
                  objInParam.sValueName =  "Publisher"; 
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  elem.vendor = objOutParam.sValue;
                  //addLog("getSubKeysUninstall Name : " + elem.name  + " DisplayVersion: " + displayVersion);
                  tab.push(elem);
                }
              } 
              catch(ex)   
              {  
                addLog("getSubKeysUninstall exception : " + ex.description  ); 
              } 
              } 
            }  
            return tab;
        },     
        
       /** 
        * Returns Internet Explorer version.
        * @method      getIEVersion
        * @summary     Returns Internet Explorer version.
        * @description
        * __Ex.:__
<code javascript>
var version = ctx.wscript.registry.getIEVersion();
</code>
        * @path        ctx.wscript.registry.getIEVersion
        * @param       {string} strComputer Current computer ('.' by default)
        * @return      {Object} Object contains 2 variables: version, svcVersion 
        */ 
        getIEVersion : function(strComputer) 
        {
          var HKLM = 0x80000002; 
          var tab = [];
          var response = {};
          strComputer = strComputer || '.';
          var rtn = _registry.getSubKeys(strComputer, "SOFTWARE\\Microsoft\\",HKLM);
          var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator"); 
          var objService     = objLocator.ConnectServer(strComputer, "root\\default"); 
          var objReg         = objService.Get("StdRegProv"); 
          var elem = {};
          if ( rtn.Results == 0 ) 
            { 
              for (var idx=0;idx<rtn.SubKeys.length;idx++) 
              { 
              //addLog("_wscript..getIEVersion  indice : " + idx + " contenu " + rtn.SubKeys[idx]);
              try  
              { 
                if (  rtn.SubKeys[idx] == "Internet Explorer") {
                  var objMethod      = objReg.Methods_.Item("GetStringValue"); 
                  var objInParam     = objMethod.InParameters.SpawnInstance_(); 
                  objInParam.hDefKey = HKLM; 
                  var sBaseKey = "SOFTWARE\\Microsoft\\";
                  objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                  objInParam.sValueName =  "Version"; 
                  var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  
                  var version = objOutParam.sValue;
                  //addLog("_wscript..getIEVersion: " + Version );
                  //elem["Internet Explorer"] = "Version : " + version;
                  //tab.push(elem);
                  objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                  objInParam.sValueName =  "svcVersion"; 
                  var objOutParam2 = objReg.ExecMethod_(objMethod.Name, objInParam); 
                  
                  var svcVersion = objOutParam2.sValue;
                  //addLog("_wscript..getIEVersion: " + Version );
                  //elem["Internet Explorer"] = "Version : " + version + " svcVersion : " + svcVersion;
                  //tab.push(elem);
                  response.version = version;
                  response.svcVersion = svcVersion;
                }
              } 
              catch(ex)   
              {  
                addLog("getIEVersion exception : " + ex.description  ); 
              } 
              } 
            }
            //return tab;
            return response;
        }
      };
      return _registry;
    })(),

    /**
     * @class    ctx.wscript.shell
     * @summary  Class gathering a set of functions to access shell functions
     * @path     ctx.wscript.shell
     */
    shell: (function() {
      var _shell = {
        
       /** 
        * Gets an environment variable (nb of processors, OS version, ...).
        * @method      getEnvVariable
        * @summary     Gets an environment variable (nb of processors, OS version, ...).
        * @description
        * __Ex.:__
<code javascript>
var res = ctx.wscript.shell.getEnvVariable(e.shell.envVariable.NbProcessors, e.shell.envType.System);
</code>
        * @path        ctx.wscript.shell.getEnvVariable
        * @param       {string} variable System variable: 'NUMBER_OF_PROCESSORS' / 'HOMEDRIVE' / 'HOMEPATH' / ...\\ (see [[lib:common:ctx.enum#eshellenvvariable|e.shell.envVariable]])
        * @param       {string} [environment] Environment name: 'SYSTEM'(default) / 'USER' / 'PROCESS' / ...\\ (see [[lib:common:ctx.enum#eshellenvtype|e.shell.envType]])
        * @return      {string} Result ommand output (empty if failed)
        */ 
        getEnvVariable : function(variable, environment) 
        {
          try {
            if (environment === undefined)
              environment = 'SYSTEM';
            var WshSysEnv = _shell.getObject().Environment(environment);
            var res = WshSysEnv(variable);
            return res;
          } catch (ex) {
            addLog('getEnvVariable failed: ' + ex.message);
            return '';
          }
        },
        
       /** 
        * Gets an environment variable (nb of processors, OS version, ...).
        * @method      enumEnvVariable
        * @summary     Gets an environment variable (nb of processors, OS version, ...).
        * @description
        * __Ex.:__
<code javascript>
var res = ctx.wscript.shell.enumEnvVariable(e.shell.envType.System);
</code>
        * @path        ctx.wscript.shell.enumEnvVariable
        * @param       {string} [environment] environment: 'SYSTEM'(default) / 'USER' / 'PROCESS' / ...\\ (see [[lib:common:ctx.enum#eshellenvtype|e.shell.envType]])
        * @return      {Object} A list of enumerated variables, for ex.: {'OS':'WinNT', 'NUMBER_OF_PROCESSORS':'8', ...}
        */ 
        enumEnvVariable : function(environment) 
        {
          var list = {};
          try {
            if (environment === undefined)
              environment = 'SYSTEM';
            var WshSysEnv = _shell.getObject().Environment(environment);
            var colVars = new Enumerator(WshSysEnv);
            for(; ! colVars.atEnd(); colVars.moveNext())
            { 
              var val = String(colVars.item());
              var pos = val.indexOf('=');
              if (pos > 0) {
                list[val.substring(0, pos)] = val.substring(pos + 1);
              }
            }
            return list;
          } catch (ex) {
            addLog('enumEnvVariable failed: ' + ex.message);
            return list;
          }
        },
        
       /** 
        * Expands system variables.
        * @method      expandEnvString
        * @summary     Expands system variables.
        * @description
        * __Ex.:__
<code javascript>
var res = ctx.wscript.shell.expandEnvString('%path%');
</code>
        * @path        ctx.wscript.shell.expandEnvString
        * @param       {string} path System variable: '%programfiles%', '%temp%',...
        * @return      {string} Resolved path
        */ 
        expandEnvString : function(path) 
        {
          try {
            return _shell.getObject().ExpandEnvironmentStrings(path);
          } catch (ex) {
            addLog('expandEnvString failed: ' + ex.message);
            return '';
          }
        },
        
       /** 
        * Gets shell ActiveX object.
        * @method      getObject
        * @summary     Gets shell ActiveX object.
        * @description
        * __Ex.:__
<code javascript>
var shell = ctx.wscript.shell.getObject(); 
</code>
        * @path        ctx.wscript.shell.getObject
        * @return      {WScriptShell} shell 'WScript.Shell' object
        */ 
        getObject : function() 
        {
          _wscript.init();
          return _shellObj;
        },
        
       /** 
        * Gets full pathname of a special system folder.
        * @method      getSpecialFolders
        * @summary     Gets full pathname of a special system folder.
        * @description
        * __Ex.:__
<code javascript>
// returns 'User' folder
var strDesktop = ctx.wscript.shell.getSpecialFolders("Desktop"); // c:\Users\<login>\Desktop
</code>
        * Check MSDN page for a complete list of special folders:
        * [[http://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx]]
        * @path        ctx.wscript.shell.getSpecialFolders
        * @param       {string} folder Special folder name: 'Desktop', ... (see [[lib:common:ctx.enum#eshellspecialfolder|e.shell.specialFolder]])
        * @return      {WshSpecialFolders|string} Pathname or WshSpecialFolders (if 'folder' empty)
        */ 
        getSpecialFolders : function(folder) 
        {
          return _shell.getObject().SpecialFolders(folder);
        }
      };
      return _shell;
    })(),

    /**
     * @class     ctx.wscript.network
     * @summary   Class gathering a set of functions to access Windows network functions
     * @path      ctx.wscript.network
     */
    network: (function() {
      var _network = {
       /** 
        * @method      getObject 
        * @summary     Gets network ActiveX object.
        * @description
        * __Ex.:__
<code javascript>
var shell = ctx.wscript.network.getObject(); 
</code>
        * @path        ctx.wscript.network.getObject
        * @return      {WScriptNetwork} shell 'WScript.Shell' object
        */ 
        getObject : function() 
        {
          _wscript.initNetwork();
          return _networkObj;
        }
      };
      return _network;
    })()
  };
  return _wscript;
}());


