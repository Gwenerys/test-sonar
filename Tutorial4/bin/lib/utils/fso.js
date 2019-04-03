/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
 * @module      fso.js
 * @file        FSO (File System Object) library
 * @description This library is a collection of functions for accessing and manipulating File System Objects.\\
 * 
 * ==== Usage ====
 *
 * The library is structured in different groups of functions. \\
 * 1) Functions used to handle the FSO instance: ''ctx.fso.init'', ''ctx.fso.end''.\\
 * 2) Functions used to manage different FSO objects ''Drive'', ''Folder'' and ''Files''.\\
 * 3) Main functions to manipulate the FSO objects: ''create'', ''copy'', ''move'', ''remove'', etc.\\
 * 4) Functions used to load text files and XML files.\\
 * \\ 
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.// 
 * @path        ctx.fso
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'ctx.fso.Application' 
 * @fileoverview
 * @suppress {missingProperties}
 */

/** 
 * @class       ctx.options.fso
 * @summary     Options for the 'ctx.fso' library
 * @path        ctx.options.fso
 * @struct
 */
ctx.options.fso = {
 /** 
  * @summary    Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
  * @property   {e.trace.level} traceLevel
  * @path       ctx.options.fso.traceLevel 
  */ 
  traceLevel: e.trace.level.None
};

 /**
  * @ignore
  * @typedef {{
  *    source: string,
  *    destination: string, 
  *    filename: string, 
  *    options: string, 
  *    timeout: (number|undefined), 
  *    style: (number|undefined),
  *    useExecRun: (boolean|undefined),
  *    waitEnd: (boolean|undefined),
  *    callback: (function ()|undefined)
  * }}
  */
  ctx.robocopyOptions = {
    source: '', 
    destination: '', 
    filename: '', 
    options: '', 
    timeout: 0, 
    style: 1,
    useExecRun: false,
    waitEnd: false,
    callback: undefined  
  };
  
/**
 * @class       ctx.fso
 * @summary     Class gathering a set of functions to manage FSO instance
 * @constructor
 * @path        ctx.fso
 */
ctx.fso = (function() {
  /** @type {Object} */ var _options = ctx.options.fso;
  var _fso = 
  /** @lends ctx.fso*/
  {};
  /** @type {ScriptingFileSystemObject} see: fso.externs */ var _oFSO = null; // FSO object
  var _res = null;
  
 /**
  * Initializes the FSO library.
  * @method      init
  * @summary     Initializes the FSO library.
  * @description
  * __Ex.:__
<code javascript>
ctx.fso.init();
</code>     
  * @throws      {Error}
  * @path        ctx.fso.init
  */
  _fso.init = function() {
    //ctx.notifyAction('ctx.fso.init');
    try {
      if (_oFSO == null) {
        _oFSO = new ActiveXObject("Scripting.FileSystemObject");
      } 
      if (_oFSO == null){
        throw new Error(e.error.KO, '[fso.init] Failed to start fso.');
      }
    } catch (ex){
      throw new Error(e.error.KO, '[fso.init] Failed to start fso. '+ ex.description);
    }
  }
  
 /**
  * Ends the FSO library.
  * @method      end
  * @summary     Ends the FSO library.
  * @description
  * __Ex.:__
<code javascript>
ctx.fso.end();
</code>     
  * @throws      {Error}
  * @path        ctx.fso.end
  */
  _fso.end = function () {
    ctx.notifyAction('ctx.fso.end');
    try {
      _oFSO = null;
      CollectGarbage();
    } catch (ex){
      throw new Error(e.error.KO, '[fso.end] Failed to end FSO. '+ ex.description);
    }
  }

 /**
  * Returns the internal FSO.
  * @method      getObject
  * @summary     Returns the internal FSO.
  * @description
  * __Ex.:__
<code javascript>
var oFso = ctx.fso.getObject();
</code>     
  * @path        ctx.fso.getObject
  */
  _fso.getObject = function () {
    ctx.notifyAction('ctx.fso.getObject');
    return _oFSO;
  }
  
 /**
  * @class      ctx.fso.drive
  * @summary    Class gathering a set of functions to manipulate FSO drive
  * @path       ctx.fso.drive
  */
  _fso.drive = (function() {
    var _drive = {};
   
   /**
    * Checks if the drive exists.
    * @method      exist
    * @summary     Checks if the drive exists.
    * @description
    * __Ex.:__
<code javascript>
// Checks if the drive exists
ctx.fso.drive.exist(drive);
</code>
    * @path        ctx.fso.drive.exist
    * @param       {string} driveName Drive name  
    * @return      {boolean} result (true) if drive exists else (false) 
    */
    _drive.exist = function(driveName) {
      ctx.notifyAction('ctx.fso.drive.exist');
      try{
        // returns true or false
        if (_oFSO == null)
          _fso.init();
        if (_oFSO.DriveExists(driveName) == true){
          return true;
        } else{
          return false;
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.drive.exist] Failed to test if the drive exists. '+ ex.description);
      }
    }
    
   /**
    * Gets the pointer to drive object.
    * @method      get
    * @summary     Gets the pointer to drive object.
    * @description
    * __Ex.:__
<code javascript>
// Get a pointer to the drive
ctx.fso.drive.get('C'));
</code>
    * @throws      {Error}
    * @path        ctx.fso.drive.get
    * @param       {string} driveLetter Letter of the drive  
    * @return      {Object} Drive Object 
    */
    _drive.get = function(driveLetter) {
      ctx.notifyAction('ctx.fso.drive.get');
      try{
        _res = null;
        if (_oFSO == null) 
          _fso.init();
        _res = _oFSO.GetDrive(driveLetter)
        if (_res !== null){
          return _res;  
        } else {
          throw new Error(e.error.KO, '[fso.drive.get] Failed to get drive.');
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.drive.get] Failed to get the drive. '+ ex.description);
      } 
    }

   /**
    * Gets the letter of the drive.
    * @method      getName
    * @summary     Gets the letter of the drive.
    * @description
    * __Ex.:__
<code javascript>
// Gets the letter of the drive
ctx.fso.drive.getName(drive);
</code>
    * @path        ctx.fso.drive.getName
    * @param       {string} drive Path of drive
    * @return      {Object} The letter describing the drive 
    */
    _drive.getName = function(drive) {
      ctx.notifyAction('ctx.fso.drive.getName');
      try{
        _res = null;
        if (_oFSO == null)
          _fso.init();
        _res = _oFSO.GetDriveName(drive);
        if (_res !== null){
          return _res;  
        } else {
          throw new Error(e.error.KO, '[fso.drive.getName]  Failed to get drive letter.');
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.drive.getName] Failed to get the drive letter. '+ ex.description);
      }
    }
    return _drive; 
  })();

  /**
   * @class    ctx.fso.folder
   * @summary  Class gathering a set of functions to manipulate folders
   * @path     ctx.fso.folder
   */
  _fso.folder = (function() {
    var _folder = {};
    
   /**
    * Copies a folder.
    * @method      copy
    * @summary     Copies a folder.
    * @description
    * __Ex.:__
<code javascript>
// Copies the folder
ctx.fso.folder.copy(foldersrc, folderdst, true);
</code>
    * @throws      {Error}
    * @path        ctx.fso.folder.copy
    * @param       {string} foldersrc Folder source  
    * @param       {string} folderdst Folder destination  
    * @param       {boolean} [overwrite] Overwrite option
    */
    _folder.copy = function(foldersrc, folderdst, overwrite) {
      ctx.notifyAction('ctx.fso.folder.copy');
      try{
        // Copy the named folder
        // returns true or false
        if (_oFSO == null)
          _fso.init();
        _oFSO.CopyFolder(foldersrc,folderdst,overwrite);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.copy] folderSrc='+foldersrc+', folderdst='+folderdst+', overwrite='+overwrite+' Failed to copy the folder. '+ ex.description);
      }
    }
    
   /**
    * Creates a folder.
    * @method      create
    * @summary     Creates a folder.
    * @description
    * __Ex.:__
<code javascript>
// Creates the named folder
ctx.fso.folder.create(folder);
</code>
    * @throws {Error}
    * @path ctx.fso.folder.create
    * @param {string} folderName Folder name  
    */
    _folder.create = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.create');
      try{
        if (_oFSO == null)
          _fso.init();
          if (!_oFSO.FolderExists(folderName)) {
            var parentFolder =  _oFSO.GetParentFolderName(folderName);
            if (parentFolder) {
              // recursively create parent folder
              ctx.fso.folder.create(parentFolder);
            }
            _res = _oFSO.CreateFolder(folderName);
          }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.create] folderName='+folderName+' Failed to create the folder. '+ ex.description);
      }
    }

   /**
    * Checks if the folder exists.
    * @method      exist
    * @summary     Checks if the folder exists.
    * @description
    * __Ex.:__
<code javascript>
// Checks if the folder exists
ctx.fso.folder.exist(folder);
</code>
    * @throws      {Error}
    * @path        ctx.fso.folder.exist
    * @param       {string} folderName Folder name  
    * @return      {boolean} result (true) if folder exists else (false) 
    */
    _folder.exist = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.exist');
      var result;
      try{
        // Tests if the named folder exists
        // returns true or false
        if (_oFSO == null)
          _fso.init();
        result = _oFSO.FolderExists(folderName);
        return result;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.exist] folderName='+folderName+' Failed to test if the folder exists. '+ ex.description);
      }
    }
    
   /**
    * Gets the pointer to a folder.
    * @method      get
    * @summary     Gets the pointer to a folder.
    * @description
    * __Ex.:__
<code javascript>
// Gets the pointer to a folder
ctx.fso.folder.get(folder);
</code>
    * @throws      {Error}
    * @path        ctx.fso.folder.get
    * @param       {string} folderName Folder name  
    * @return      {Object} Folder object
    */
    _folder.get = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.get');
      try{
        // access to the named folder
        if (_oFSO == null)
          _fso.init();
        return _oFSO.GetFolder(folderName);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.get] folderName='+folderName+' Failed to to get the folder object. '+ ex.description);
      }
    }

   /**
    * Gets the collection of files in a folder.
    * @method      getFileCollection
    * @summary     Gets the collection of files in a folder.
    * @description
    * __Ex.:__
<code javascript>
var folder = '...';
var f = ctx.fso.folder.getFileCollection(folder);
for (; !f.atEnd(); f.moveNext()) {
  var file = f.item();
  var filename = file.Name;
  var filedate = file.DateCreated;
  var filepath = file.Path;
  ...
}
</code>
    * @path        ctx.fso.folder.getFileCollection
    * @param       {string} folderName Folder name  
    * @return      {Enumerator} Collection of files 
    */
    _folder.getFileCollection = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.getFileCollection');
      try{
        // access to the named folder
        _res = null;
        if (_oFSO == null)
          _fso.init();
        var f = _oFSO.GetFolder(folderName);
        var result = new Enumerator(f.Files);
        return result;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.getFileCollection] Failed to to get the file collection of the folder. '+ ex.description);
      }
    }
    
   /**
    * Gets the collection of sub folders in a folder.
    * @method      getFolderCollection
    * @summary     Gets the collection of sub folders in a folder.
    * @description
    * __Ex.:__
<code javascript>
var folder = '...';
var f = ctx.fso.folder.getFolderCollection(folder);
for (; !f.atEnd(); f.moveNext()) {
  var file = f.item();
  var filename = file.Name;
  var filedate = file.DateCreated;
  var filepath = file.Path;
  ...
}
</code>
    * @path        ctx.fso.folder.getFolderCollection
    * @param       {string} folderName Folder name  
    * @return      {Enumerator} Collection of folders 
    */
    _folder.getFolderCollection = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.getFolderCollection');
      try{
        // access to the named folder
        _res = null;
        if (_oFSO == null)
          _fso.init();
        var f = _oFSO.GetFolder(folderName);
        var result = new Enumerator(f.SubFolders);
        return result;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.getFolderCollection] Failed to to get the file collection of the folder. '+ ex.description);
      }
    }
    
   /**
    * Moves folder.
    * @method      move
    * @summary     Moves folder.
    * @description
    * __Ex.:__
<code javascript>
// Moves the folder
ctx.fso.folder.move(foldersrc, folderdst);
</code>
    * @throws      {Error}
    * @path        ctx.fso.folder.move
    * @param       {string} foldersrc Folder source  
    * @param       {string} folderdst Folder destination  
    */
    _folder.move = function(foldersrc,folderdst) {
      ctx.notifyAction('ctx.fso.folder.move');
      try{
        if (_oFSO == null)
          _fso.init();
        var res = _oFSO.MoveFolder(foldersrc,folderdst);
        
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.move] Failed to move the folder. '+ ex.description);
      }
    }
    
   /**
    * Removes folder.
    * @method      remove
    * @summary     Removes folder.
    * @description
    * __Ex.:__
<code javascript>
// Removes the folder
ctx.fso.folder.remove(folder);
</code>
    * @throws      {Error}
    * @path        ctx.fso.folder.remove
    * @param       {string} folderName Folder name  
    */
    _folder.remove = function(folderName) {
      ctx.notifyAction('ctx.fso.folder.remove');
      try{
        if (_oFSO == null)
          _fso.init();
          if (_oFSO.FolderExists(folderName) == true) {
            _oFSO.DeleteFolder(folderName);
          } else {
            throw new Error(e.error.KO, '[fso.folder.remove] Failed to remove the folder.');
          }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.remove] Failed to remove the folder. '+ ex.description);
      }
    }
    
    return _folder; 
  })();

  /**
   * @class    ctx.fso.file
   * @summary  Class gathering a set of functions to manipulate files
   * @path     ctx.fso.file
   */
  _fso.file = (function() {
    var _file = 
    {};
        
    _file.chr = function chr(n) { return String.fromCharCode(n); }
  
   /**
    * Copies a file.
    * @method      copy
    * @summary     Copies a file.
    * @description
    * __Ex.:__
<code javascript>
// Copies the file
ctx.fso.file.copy(filenamesrc, filenamedst, true);
</code>
    * @throws {Error}
    * @path ctx.fso.file.copy
    * @param {string} filenamesrc Filename source  
    * @param {string} filenamedst Filename destination  
    * @param {boolean} [overwrite] Overwrite option
    */
    _file.copy = function(filenamesrc, filenamedst, overwrite) {
      ctx.notifyAction('ctx.fso.file.copy');
      try{
        if (_oFSO == null) 
          _fso.init();        
        _oFSO.CopyFile(filenamesrc,filenamedst, overwrite);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.copy] Failed to copy the file. '+ ex.description);
      }
    }
    
   /**
    * Deletes all files in a folder.
    * @method      deleteInFolder
    * @summary     Deletes all files in a folder.
    * @description
    * __Ex.:__
<code javascript>
// deletes all files in folder
ctx.fso.file.deleteInFolder(folder);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.deleteInFolder
    * @param       {string} strFolderFullPath strFolderFullPath  
    */
    _file.deleteInFolder = function(strFolderFullPath) {
      ctx.notifyAction('ctx.fso.file.deleteInFolder');      
      try{
        var oTheFolder = null;
        var oFilesEnum = null;
        if (_oFSO === null)
          _fso.init();
        oTheFolder = _fso.folder.get(strFolderFullPath); 
        if (oTheFolder === null) {
          throw new Error(e.error.KO, '[fso.file.deleteInFolder] NULL Folder Object for Folder Spec [" + strFolderFullPath + "]');
        } 
        oFilesEnum = new Enumerator(oTheFolder.Files);
        if (oFilesEnum === null) {
          throw new Error(e.error.KO, '[fso.file.deleteInFolder] NULL Files Enumerator for Folder Spec [" + strFolderFullPath + "]');
        } // endif
        var strOneFileName;
        for (; !oFilesEnum.atEnd(); oFilesEnum.moveNext()) {
          strOneFileName = oFilesEnum.item().Name;
          _fso.file.remove(strFolderFullPath + "\\" + strOneFileName);
        } // end for
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.deleteInFolder] Failed to delete the files in folder. '+ ex.description);
      }
    }
    
   /**
    * Checks if the file exists.
    * @method      exist
    * @summary     Checks if the file exists.
    * @description
    * __Ex.:__
<code javascript>
// Checks if the file exists
ctx.fso.file.exist(file);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.exist
    * @param       {string} filename File name  
    * @return      {boolean} result (true) if the file exists else (false) 
    */
    _file.exist = function(filename) {
      ctx.notifyAction('ctx.fso.file.exist');
      var result = false;
      try{
        if (_oFSO == null)
          _fso.init();
        if (_oFSO.FileExists(filename) == true){
          return true;
        } else {
          return false;
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.exist] filename='+filename+' Failed to test the file object exists. '+ ex.description);
      }
    }
        
   /**
    * Gets a pointer to a file.
    * @method      get
    * @summary     Gets a pointer to a file.
    * @description
    * __Ex.:__
<code javascript>
// Gets the pointer to a file
ctx.fso.file.get(file);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.get
    * @param       {string} filename File name  
    * @return      {Object} File object
    */
    _file.get = function(filename) {
      ctx.notifyAction('ctx.fso.file.get');
      try{
        _res = null;
        if (_oFSO == null)
          _fso.init();
          var result  = _oFSO.GetFile(filename);
          return result;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.get] Failed to get the file object. '+ ex.description);
      }
    }

   /**
    * Gets the basename of a file.
    * @method      getBaseName
    * @summary     Gets the basename of a file.
    * @description
    * __Ex.:__
<code javascript>
// Get the basename of a file
ctx.fso.file.getBaseName('c:\temp\file.txt'); // returns 'file'
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.getBaseName
    * @param       {string} filename File name  
    * @return      {string} Basename of the file 
    */
    _file.getBaseName = function(filename) {
      ctx.notifyAction('ctx.fso.file.getBaseName');
      try{
        // Get the file basename
        if (_oFSO == null)
          _fso.init();
        return _oFSO.GetBaseName(filename);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.getBaseName] Failed to get the file basename. '+ ex.description);
      }
    }
    
   /**
    * Gets the extention of the file.
    * @method      getExtensionName
    * @summary     Gets the extention of the file.
    * @description
    * __Ex.:__
<code javascript>
// Get the file extension (extension only, after ".")
ctx.fso.file.getExtensionName('c:\temp\file.txt'); // returns 'txt'
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.getExtensionName
    * @param       {string} filename File name  
    * @return      {string} Extention name 
    */
    _file.getExtensionName = function(filename) {
      ctx.notifyAction('ctx.fso.file.getExtensionName');
      try{
        if (_oFSO == null)
          _fso.init();
          return _oFSO.GetExtensionName(filename);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.getExtensionName] Failed to get the file extention name. '+ ex.description);
      }
    }
      
   /**
    * Gets the full name of the file.
    * @method      getFileName
    * @summary     Gets the full name of the file.
    * @description
    * __Ex.:__
<code javascript>
// Gets the full file name (basename+extension)
ctx.fso.file.getFileName('c:\temp\file.txt'); // returns 'file.txt'
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.getFileName
    * @param       {string} filename File name  
    * @return      {string} The full name of the file 
    */
    _file.getFileName = function(filename) {
      ctx.notifyAction('ctx.fso.file.getFileName');
      try{
        if (_oFSO == null)
          _fso.init();
        return _oFSO.GetFileName(filename);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.getFileName] Failed to get the file name. '+ ex.description);
      }
    }
      
   /**
    * Gets the name of the parent folder.
    * @method      getParentFolderName
    * @summary     Gets the name of the parent folder.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.file.getParentFolderName('c:\temp\file.txt'); // returns 'c:\temp'
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.getParentFolderName
    * @param       {string} filename File name  
    * @return      {string} The parent folder name
    */
    _file.getParentFolderName = function(filename) {
      ctx.notifyAction('ctx.fso.file.getFileName');
      try{
        if (_oFSO == null)
          _fso.init();
        return _oFSO.GetParentFolderName(filename);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.getFileName] Failed to get the file name. '+ ex.description);
      }
    }    

   /**
    * Creates a file.
    * @method      create
    * @summary     Creates a file.
    * @description
    * __Ex.:__
<code javascript>
// Reads the file 
var file = '...';
var txt = ctx.fso.file.create(file);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.create
    * @param       {string} filename File name  
    */
    _file.create = function(filename)
    {
      ctx.notifyAction('ctx.fso.file.create');
      try {
        if (_oFSO == null)
          _fso.init();
         _oFSO.CreateTextFile(filename);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.create] : '+ ex.description);
      }
    };
      
   /**
    * Reads XML file as a string.
    * @method      loadXml
    * @summary     Reads XML file as a string.
    * @description
    * __Ex.:__
<code javascript>
// Reads an xml file and transforms in a string
ctx.fso.file.loadXml(xmlfile, 'XML');
</code>
    * @path        ctx.fso.file.loadXml
    * @param       {string} strFullFileName strFullFileName  
    * @param       {string} strLineKey strLineKey  
    * @return      {string} The content of the XML file 
    */
    _file.loadXml = function(strFullFileName, strLineKey) {
      ctx.notifyAction('ctx.fso.file.loadXml');
      // strLineKey : root of the string. If empty, then no root node
      // content is return with root node strLineKey, if exists
      if (_oFSO === null)
        _fso.init();
      /** @type {TextStream} */
      var oTextStream = null;
      var strLine = null;
      try {
        oTextStream = _oFSO.OpenTextFile(strFullFileName, 1, false, 0); // only for write, do not create, ascii
        if (oTextStream === null)
          return "NULL Text Stream Object in LoadFile, opening file [" + strFullFileName + "]";
        var strFileContent = "";
        if (strLineKey != "")
          strFileContent += "<" + strLineKey + ">";
        while (oTextStream.AtEndOfStream != true) {
          strLine = oTextStream.ReadLine();
          if (strLine.substring(0, 2) != "<?") // skip <?xmlLink ... ?>
            strFileContent += strLine;
        } // end while
        if (strLineKey != "")
          strFileContent += "</" + strLineKey + ">";
        oTextStream.Close();
        oTextStream = null;
        return strFileContent;
      } catch (ex) {
        if (oTextStream) {
          oTextStream.Close();
        }
        throw new Error(e.error.KO, '[fso.file.LoadFileAsXml] Failed to load the text file. '+ ex.description);
      }
    }        
    
   /**
    * Moves the file.
    * @method      move
    * @summary     Moves the file.
    * @description
    * __Ex.:__
<code javascript>
// Moves the file
ctx.fso.file.move(filenamesrc, filenamedst);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.move
    * @param       {string} filenamesrc File name source  
    * @param       {string} filenamedst File name destination  
    */
    _file.move = function(filenamesrc,filenamedst) {
      ctx.notifyAction('ctx.fso.file.move');
      try{
        if (_oFSO == null)
          _fso.init();
         _oFSO.MoveFile(filenamesrc,filenamedst);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.move] Failed to move the file. '+ ex.message);
      }
    }

   /**
    * Opens an Explorer dialog to select a file or folder.
    * @method      openDialog
    * @summary     Opens an Explorer dialog to select a file or folder.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.file.openDialog(title, options);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.openDialog
    * @param       {string} title Dialog title
    * @param       {number} [options] Options TBC
    * @param       {string} [rootFolder] Root folder
    * @param       {number} [hwnd] Hwnd parent window handle
    * @return      {string} Selected path or filename 
    */
    _file.openDialog = function(title, options, rootFolder, hwnd) {
      var res = '';
      ctx.notifyAction('ctx.fso.file.openDialog');
      try{
        var shell = new ActiveXObject("shell.application");
        hwnd = hwnd || 0;
        options = options || 16384;
        rootFolder = rootFolder || '';
        var file = shell.BrowseForFolder(hwnd, title, options, rootFolder);
        ctx.log(file, e.logIconType.Info, 'BrowseForFolder');
        res = (file && file.Self ? file.Self.Path : '');
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.openDialog] Failed. '+ (ex.description || ex.number));
      }
      return res;
    }
  
   /**
    * Opens an Explorer application, and selects the mentioned filename.
    * @method      openExplorer
    * @summary     Opens an Explorer application, and selects the mentioned filename.
    * @description
    * __Ex.:__
<code javascript>
var file = "c:\\...";
ctx.fso.file.openExplorer(file);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.openExplorer
    * @param       {string} file File name to be selected
    * @return      {string} Selected path or filename 
    */
    _file.openExplorer = function(file) {
      var res = '';
      ctx.notifyAction('ctx.fso.file.openExplorer');
      try{
        file = file.replace(/\//g, "\\");
        ctx.shellexec('explorer.exe', "/select," + file);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.openExplorer] Failed. '+ (ex.description || ex.number));
      }
      return res;
    }
  
   /**
    * Reads a file.
    * @method      read
    * @summary     Reads a file.
    * @description
    * __Ex.:__
<code javascript>
// Reads the file 
var file = '...';
var txt = ctx.fso.file.read(file, e.file.encoding.ASCII);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.read
    * @param       {string} filename File name  
    * @param       {e.file.encoding} [encoding] File encoding (default is 'e.file.encoding.UTF8'). See [[lib:common:ctx.enum#efileencoding|e.file.encoding]]
    * @return      {*} Content of the file 
    */
    _file.read = function(filename, encoding)
    {
      ctx.notifyAction('ctx.fso.file.read');
      try {
        /** @type {ADODBStreamObject} */ var oStream = new ActiveXObject('ADODB.Stream');
        if (encoding === e.file.encoding.Binary) {
          oStream.Type = 1; // 1 = binary
        } else {
          oStream.Type = 2; // 2 = text
          oStream.Charset = encoding || e.file.encoding.UTF8;
        }
        //oStream.Mode = 1; // 1 = read
        oStream.Open();
        oStream.Position = 0;
        oStream.LoadFromFile(filename);
        //var size = oStream.Size;
        var content;
        if (encoding === e.file.encoding.Binary) {
          content = oStream.Read();
        } else {
          content = oStream.ReadText();
        }
        oStream.Close();
        return content;
      } catch (ex) {
        if (oStream) {
          oStream.Close();
        }
        throw new Error(e.error.KO, '[fso.file.read] : '+ ex.description);
      }
    };
    
   /**
    * Removes the file.
    * @method      remove
    * @summary     Removes the file.
    * @description
    * __Ex.:__
<code javascript>
// Removes the file
ctx.fso.file.remove(file);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.remove
    * @param       {string} filename File name  
    */
    _file.remove = function(filename) {
      ctx.notifyAction('ctx.fso.file.remove');
      try{
        if (_oFSO == null)
          _fso.init();
        if (_oFSO.FileExists(filename) == true){
          _oFSO.deleteFile(filename, false);
        } else {
          throw new Error(e.error.KO, '[fso.file.remove] Failed to remove the file.');
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.remove] Failed to remove the file. '+ ex.description);
      }
    }

   /**
    * Copies a set of files in asyncronous mode, using 'robocopy' tool.
    * @method      robocopy
    * @summary     Copies a set of files in asyncronous mode, using 'robocopy' tool.
    * @description The copy can be synchronous or asynchronous (recommended usage). The copy is a mirroring : only new and modified files are copied.\\
    * The function is based on Microsoft 'robocopy' utility tool, so requires Windows Vista minimum.
    * 
    * For more details about the object passed in callback (asynchronous mode) or in function return (synchronous mode), see [[:lib:ctx:ctx.popup#ctx_popupclass_onload|ctx.popup.onLoad()]] \\
    * __Ex.:__
<code javascript>
// Copies the folder from shared network, in asynchronous mode
var sourceFolder = '\\server\...';
var destFolder = 'c:\\...';
ctx.fso.file.robocopy(sourceFolder, destFolder, '', 30, function(obj) { 
  ...
});
</code>
    * @see         https://en.wikipedia.org/wiki/Robocopy
    * @see         https://technet.microsoft.com/en-us/library/cc733145.aspx
    * @throws      {Error}
    * @path        ctx.fso.file.robocopy
    * @param       {ctx.robocopyOptions} params
    */
    _file.robocopy = function(params) {
      ctx.notifyAction('ctx.fso.folder.robocopy');
      params = params || {};
      params.options = params.options || '/R:1 /W:1'; // '/R:0 /W:5';
      if (!params.filename) {
        params.filename = '*';
        params.options = params.options + ' /MIR';
      }
      var obj = {};
      try{
        // options :
        //  - /MIR : mirroring
        //  - /R:0 : no reiteration
        //  - /W:5 : 5s iteration
        var command = 'robocopy "' + params.source + '" "' + params.destination + '" ' + params.filename + ' ' + params.options;
        if (params.useExecRun) {
          obj = ctx.execRun(command, params.style, params.waitEnd);
        } else {
          obj = ctx.exec(command, params.timeout, params.callback);
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.robocopy] failed : '+ ex.description);
      }
      return obj;
    }
    
   /**
    * Unzips a ZIP file in a given folder.
    * @method      unzip
    * @summary     Unzips a ZIP file in a given folder.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.file.unzip("c:\\temp\\result.zip", "c:\\temp\\result");
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.unzip
    * @param       {string} zipFile Zip file to be unzipped
    * @param       {string} unzipDir Destination folder
    */
    _file.unzip = function(zipFile, unzipDir) {
      ctx.notifyAction('ctx.fso.file.unzip');
      try{
        // inspired from http://stackoverflow.com/questions/27037647/unzip-a-file-using-batch-scripting
        // Thanks to 'rojo' 2014/11/20
        _fso.init();
        var shell = new ActiveXObject('Shell.Application'), dst, zip;
        if (!unzipDir) unzipDir = '.';
        if (!_oFSO.FolderExists(unzipDir)) 
          _oFSO.CreateFolder(unzipDir);
        dst = shell.NameSpace(_oFSO.getFolder(unzipDir).Path);
        zip = shell.NameSpace(_oFSO.getFile(zipFile).Path);
        for (var i=0; i<zip.Items().Count; i++) {
          try {
            if (_oFSO.FileExists(zipFile)) {
              dst.CopyHere(zip.Items().Item(i), 4 + 16);
            }
          } catch(ex) {
            ctx.log('[fso.file.unzip] Failed: ' + zip.Items().Item(i).Path + ', error: ' + ex.description, e.logIconType.Warning);
          }
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.unzip] Failed to unzip file. '+ ex.description);
      }
    }
    
   /**
    * Writes a file.
    * @method      write
    * @summary     Writes a file.
    * @description
    * __Ex.:__
<code javascript>
// Writes a file
var file = '...';
var txt = '...';
ctx.fso.file.write(file, txt, e.file.encoding.UTF8);
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.write
    * @param       {string} filename File name  
    * @param       {*} content Text buffer to be written  
    * @param       {e.file.encoding} [encoding] File encoding (default is 'e.file.encoding.UTF8'). See [[lib:common:ctx.enum#efileencoding|e.file.encoding]]
    */
    _file.write = function(filename, content, encoding)
    {			
      ctx.notifyAction('ctx.fso.file.write');
      try {
        /** @type {ADODBStreamObject} */ var oStream = new ActiveXObject('ADODB.Stream');
        //oStream.Mode = 2; // 2 = write
        oStream.Open();
        if (encoding === e.file.encoding.Binary) {
          oStream.Type = 1; // 1 = binary
        } else {
          oStream.Type = 2; // 2 = text
          oStream.Charset = encoding || e.file.encoding.UTF8;
	        oStream.Position = 0;
        }
        if (encoding === e.file.encoding.Binary) {
          oStream.Write(content);
        } else {
					if ('string' === typeof content) { 
						oStream.WriteText(content, 0);
					}	          
        }
				if ( _file.exist(filename)) {
					_file.remove(filename);
				}
        oStream.SaveToFile(filename, 2); // 2 = overwrite if exist
        oStream.Close();
      } catch (ex) {
        if (oStream) {
          oStream.Close();
        }
        throw new Error(e.error.KO, '[fso.file.write] : '+ ex.description);
      }
    };
    
   /**
    * Copies a set of files in asyncronous mode, using 'xcopy' tool.
    * @method      xcopy
    * @summary     Copies a set of files in asyncronous mode, using 'xcopy' tool.
    * @description The copy can be synchronous or asynchronous (recommended usage). The copy is a mirroring : only new and modified files are copied.\\
    * The function is based on Microsoft 'robocopy' utility tool, so requires Windows Vista minimum.\\
    *
    * __Ex.:__
<code javascript>
// Copies the folder from shared network, in asynchronous mode
var sourceFolder = '\\server\...';
var destFolder = 'c:\\...';
ctx.fso.file.xcopy(sourceFolder, destFolder, '', 30, function(obj) { 
  ...
});
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.xcopy
    * @param       {string} sourceFolder Source folder 
    * @param       {string} destFolder Destination folder   
    * @param       {string} [filename] File name or pattern (if omitted, '*' is used, and '/MIR' option is added), and options
    * @param       {number} [timeout] Timeout delay in seconds (default is 60 s)
    * @param       {function(Object)} [callback] Callback called with result object. If omitted, the copy is synchronous
    */
    _file.xcopy = function(sourceFolder, destFolder, filename, timeout, callback) {
      ctx.notifyAction('ctx.fso.folder.xcopy');
      var options =  '';
      if (!filename) {
        filename = '*';
      }
      var obj = {};
      try{
        var command = 'xcopy /E "' + sourceFolder + '" "' + destFolder + '" ' + filename; // + ' ' + options; 
        obj = ctx.exec(command, timeout, callback);
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.folder.xcopy] failed : '+ ex.description);
      }
      return obj;
    }
    
   /**
    * Archives a set of files or folders.
    * @method      zip
    * @summary     Archives a set of files or folders.
    * @description
    * __Ex.:__
<code javascript>
var files = ["c:\\temp\\file1.txt", "c:\\temp\\file2.txt", "c:\\temp\\file3.txt", "c:\\temp\\file4.txt"];
ctx.fso.file.zip(files, "c:\\temp\\result.zip");
</code>
    * @throws      {Error}
    * @path        ctx.fso.file.zip
    * @param       {Array.<string>} files Array of files or folders to be zipped  
    * @param       {string} zipFile Generated zip file  
    */
    _file.zip = function(files, zipFile) {
      ctx.notifyAction('ctx.fso.file.zip');
      // Inspired from : http://stackoverflow.com/questions/27273334/batch-script-to-zip-a-folder-without-using-external-softwares
      // Thanks to 'rojo' 2014/12/04
      try{
        var res = e.error.OK;
        if (_oFSO === null)
          _fso.init();
        var shell = new ActiveXObject("Shell.Application");
        var nb = files.length;
        if (nb > 0) {
          if (!zipFile) { zipFile = files[0] + '.zip'; }
          var zip = _oFSO.CreateTextFile(zipFile);
          zip.Write("PK" + _fso.file.chr(5) + _fso.file.chr(6));
          for (var i=18; i > 0; i--) zip.Write(_fso.file.chr(0));
          zip.Close()
          zip = shell.NameSpace(_oFSO.GetFile(zipFile).Path);
          var file;
          var zipThis;
          for (var i=0; i < files.length; i++) {
            try {
              if (_oFSO.FileExists(files[i])) {
                file = _oFSO.GetFile(files[i]);
              } else if (_oFSO.FolderExists(files[i])) {
                file = _oFSO.GetFolder(files[i]);
                if (!shell.NameSpace(file.Path).Items().Count) {
                  // Windows can't add an empty folder to a zip file, but it *can* add a folder that contains an empty folder.
                  shell.NameSpace(file.Path).NewFolder('(empty)');
                }
              } else {
                throw new Error(e.error.InvalidArgument, "Unable to locate " + files[i]);
              }
              var folder = shell.NameSpace(file.ParentFolder + '\\');
              zipThis = folder.ParseName(_oFSO.GetFileName(files[i]));
            } catch(ex) {
            var output = 'Skipping ' + files[i] + ': ';
            output += ex.description ? ex.description : 'error ' + ex.number + ' (unspecified error)';
            addLog(output);
            files.splice(i--,1);
            continue;
            }
            //ctx.log('Compressing ' + _oFSO.GetFileName(file) + '... ');
            zip.CopyHere(zipThis);
            while (zip.Items().Count <= i) {
              ctx.sleep(100);
            }
            //ctx.log('Done.  (' + zip.Items().Count + ' of ' + files.length + ')');
          }

          if (!zip.Items().Count) {
              _oFSO.DeleteFile(_oFSO.GetFile(zipFile));
              ctx.log('Zip file is empty.  Deleting.', e.logIconType.Warning);
          }
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.file.zip] files.length='+files.length+',  zipFile='+zipFile+' Failed to zip files. '+ ex.description);
      }
    }
    return _file; 
  })();

 /**
  * @class       ctx.fso.ftp
  * @summary     Class gathering a set of functions to access files through FTP sites
  * @path        ctx.fso.ftp
  */
  _fso.ftp = (function() {
    var _ftp = {};
    var _site;
    var _user;
    var _password;
    var _secure;
    var _url;
    var _root = "HKCU\\Software\\Contextor\\CtxtRun\\Settings\\FTP";
    var _shell = null;
    
   /**
    * Downloads files from a FTP site.
    * @method      download
    * @summary     Downloads files from a FTP site.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.ftp.init('192.168.9.100', 'jsmith', 'xxxxxx');
var fileList = ['file.zip'];
ctx.fso.ftp.download('c:\\temp', 'home/temp', fileList, e.file.operation.NoUI);
</code>
    * @throws      {Error}
    * @path        ctx.fso.ftp.download
    * @param       {string} localFolder Local folder name
    * @param       {string} remoteFolder Remote folder name
    * @param       {Array.<string>} fileList File list
    * @param       {e.file.operation} [flags] File operation flags (default is ''e.file.operation.NoUI'') (see [[lib:common:ctx.enum#efileoperation|e.file.operation]])
    */
    _ftp.download = function(localFolder, remoteFolder, fileList, flags) {
      ctx.notifyAction('ctx.fso.ftp.download');
      remoteFolder = remoteFolder || '.';
      localFolder = localFolder || '.';
      flags = flags || e.file.operation.NoUI;
      var shell = new ActiveXObject("Shell.Application");
      if (!_fso.folder.exist(localFolder))
        _fso.folder.create(localFolder);
      var remoteURL = _url + (remoteFolder.indexOf('/') == 0 ? '' :  '/') + remoteFolder;
      var local = shell.NameSpace(localFolder);
      try {
        var remote = shell.NameSpace(remoteURL);
        for (var i = 0; i < fileList.length; i++) {
          local.CopyHere(remoteURL + "/" + fileList[i], flags);
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.ftp.download] Failed to download files. '+ ex.description);
      }
    }
    
   /**
    * Initializes FTP connection.
    * @method      init
    * @summary     Initializes FTP connection.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.ftp.init('192.168.9.100', 'jsmith', 'xxxxxx');
</code>
    * @throws      {Error}
    * @path        ctx.fso.ftp.init
    * @param       {string} site FTP site URL
    * @param       {string} [user] User name (if omitted, user and password are read in registry)
    * @param       {string} [password] Password
    * @param       {boolean} [secure] use FTPS (true) or FTP (false) protocol
    */
    _ftp.init = function(site, user, password, secure) {
      ctx.notifyAction('ctx.fso.ftp.init');
      try{
        var res = e.error.OK;
        _site = site;
        _user = user;
        _password = password || '';
        _secure = secure;
        if (!_user) {
          // no user defined, read login/password in registry and decrypt
          _shell = _shell || new ActiveXObject("WScript.Shell");
          _user = ctx.cryptography.unprotect(_shell.RegRead(_root + "\\" + _site + "\\user"));
          _password = ctx.cryptography.unprotect(_shell.RegRead(_root + "\\" + _site + "\\password"));
        } else {
          // user defined, encrypt and write login/password in registry
          _shell = _shell || new ActiveXObject("WScript.Shell");
          _shell.RegWrite(_root + "\\" + _site + "\\user", ctx.cryptography.protect(_user), "REG_SZ");
          _shell.RegWrite(_root + "\\" + _site + "\\password", ctx.cryptography.protect(_password), "REG_SZ");          
        }
        // should be like : 'ftp://jsmith:xxxxxx@192.168.9.100';
        _url = '';
        if (_site)
          _url = (_secure ? 'ftps://' : 'ftp://') + (_user ? (_user + (_password ? ':' + _password : '')) : '') + '@' + _site;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.ftp.zip] Failed to initialize the ftp connection. '+ ex.description);
      }
    }
    
   /**
    * Lists remote files.
    * @method      list
    * @summary     Lists remote files.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.ftp.init('192.168.9.100', 'jsmith', 'xxxxxx');
var tab = [];
ctx.fso.ftp.list('/home/temp', tab);
</code>
    * @throws      {Error}
    * @path        ctx.fso.ftp.list
    * @param       {string} remoteFolder Remote folder name
    * @param       {Array.<Object>} tab Array of file names
    * @return      {Object|e.error} result
    */
    _ftp.list = function(remoteFolder, tab) {
      ctx.notifyAction('ctx.fso.ftp.list');
      var res = e.error.OK;
      var shell = new ActiveXObject("Shell.Application");
      //if (!_url) return 
      if (typeof tab !== 'object')
        return e.error.InvalidArgument;
      remoteFolder = remoteFolder || '.';
      var remoteURL = _url + (remoteFolder.indexOf('/') == 0 ? '' :  '/') + remoteFolder;
      try {
        var remote = shell.NameSpace(remoteURL);
        for (var i = 0; i < remote.Items().Count; i++) {
          tab.push({
            name: remote.Items().item(i).Name,
            path: remote.Items().item(i).Path,
            size: remote.Items().item(i).Size,
            type: remote.Items().item(i).Type,
            isFolder: remote.Items().item(i).IsFolder,
            isLink: remote.Items().item(i).IsLink
          });
        }
        return tab;
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.ftp.list] Failed to list remote files. '+ ex.description);
      }
    }

   /**
    * Saves FTP user information (login, password) for a given site, in the HKCU (Current User) registry.
    * @method      save
    * @summary     Saves FTP user information (login, password) for a given site, in the HKCU (Current User) registry.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.ftp.save('192.168.9.100', 'jsmith', 'xxxxxx');
</code>
    * @throws      {Error}
    * @path        ctx.fso.ftp.save
    * @param       {string} site FTP site URL
    * @param       {string} user User name
    * @param       {string} password Password
    */
    _ftp.save = function(site, user, password) {
      try{
        // no user defined, read login/password in registry
        _shell = _shell || new ActiveXObject("WScript.Shell");
        _shell.RegWrite(_root + "\\" + _site + "\\user", user, "REG_SZ");
        _shell.RegWrite(_root + "\\" + _site + "\\password", password, "REG_SZ");
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.ftp.save] Failed to save the connection. '+ ex.description);
      }
    }

   /**
    * Uploads files from a FTP site.
    * @method      upload
    * @summary     Uploads files from a FTP site.
    * @description
    * __Ex.:__
<code javascript>
ctx.fso.ftp.init('192.168.9.100', 'jsmith', 'xxxxxx');
var fileList = ['file.zip'];
ctx.fso.ftp.upload('c:\\temp', 'home/temp', fileList, e.file.operation.NoUI);
</code>
    * @throws      {Error}
    * @path        ctx.fso.ftp.upload
    * @param       {string} localFolder Local folder name
    * @param       {string} remoteFolder Remote folder name
    * @param       {Array.<string>} fileList File list
    * @param       {e.file.operation} [flags] File operation flags (default is ''e.file.operation.NoUI'') (see [[lib:common:ctx.enum#efileoperation|e.file.operation]])
    * @return      {boolean} success
    */
    _ftp.upload = function(localFolder, remoteFolder, fileList, flags) {
      ctx.notifyAction('ctx.fso.ftp.upload');
      remoteFolder = remoteFolder || '.';
      flags = flags || e.file.operation.NoUI;
      var shell = new ActiveXObject("Shell.Application");
      var remoteURL = _url + (remoteFolder.indexOf('/') == 0 ? '' :  '/') + remoteFolder;
      try {
        var remote = shell.NameSpace(remoteURL);
        for (var i = 0; i < fileList.length; i++) {
          var file = (localFolder ? localFolder + "\\" : '') + fileList[i];
          file = file.replace(/\//g, "\\");
          remote.CopyHere(file, flags);
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[fso.ftp.upload] Failed to upload files. '+ ex.description);
      }
      return true;
    }

    return _ftp; 
  })();
 
  return _fso;
})();
