/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
* ====== Enumerations and constants ======
* \\
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application. //
* 
* The global object 'e' gathers all constants and enumerations which can be used within functions and language.
* 
* Enumerations are grouped by category :
*   * errors : ''e.error.OK'', ''systeme.error.NotImplemented'', ...
*   * keys : ''e.key.F1'', ''e.key.Shift'', ...
*   * navigator type : ''e.navigator.IE'', ...
*   * messbox characteristics : ''e.messbox.appbarType.Right'', ...
*   * ...
*
* Auto-completion can help discovering the possible enumerated values :
*
* {{ :lib:ctx:enum_intellisense.png?nolink }}
* \\
* \\
*/


/**
* Enumeration object 
* @class e
* @path e
*/
var e = {};

/**
 * Ajax collection
 * @class ajax
 * @path e.ajax
 * @readonly
 */
e.ajax = {};

/**
* Ajax call method
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.method
* @enum {string}
* @path e.ajax.method
* @var del DELETE method
* @var get GET method
* @var head HEAD method
* @var options OPTIONS method
* @var post POST method
* @var put PUT method
* @readonly
*/
e.ajax.method = {
	del: 'DELETE', 
	get: 'GET', 
	head: 'HEAD', 
	options: 'OPTIONS', 
	post: 'POST', 
	put: 'PUT'
};

/**
* Ajax request type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.requestType
* @enum {string}
* @path e.ajax.requestType
* @var client Client request (to be used when calling from Web Browser JS engine)
* @var server Server request (to be used when calling from Interactive JS engine)
* @readonly
*/
e.ajax.requestType = {
	client: 'client', 
	server: 'server'
};

/**
* Ajax response type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.responseType
* @enum {string}
* @path e.ajax.responseType
* @var arraybuffer The response is an array buffer.
* @var blob The response is binary data.
* @var document The response is a document.
* @var DOMString DOMString (this is the default value)
* @var ms-stream The response is part of a streaming download. This value is supported only for download requests.
* @var text The response is text.
* @readonly
*/
e.ajax.responseType = {
	none: '', 
	arrayBuffer: 'arraybuffer', 
	blob: 'blob', 
	document: 'document',
//	MozBlob: 'moz-blob',
//	MozChunkedText: 'moz-chunked-text',
//	MozChunkedArraybuffer: 'moz-chunked-arraybuffer',
	MSStream: 'ms-stream',
	text: 'text' 
};

/**
* Ajax header type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.header
* @enum {string}
* @path e.ajax.header
* @var contentType 'Content-Type' header
* @var cacheControl 'Cache-Control' header
* @readonly
*/
e.ajax.header = {
	contentType: 'Content-Type', 
	cacheControl: 'Cache-Control'
};

/**
* Ajax cache type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.cache
* @enum {string}
* @path e.ajax.cache
* @var noCache 'no-cache' type
* @readonly
*/
e.ajax.cache = {
	noCache: 'no-cache'
};

/**
* Ajax content type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.content
* @enum {string}
* @path e.ajax.content
* @var html 'text/html',
* @var javascript 'application/javascript', 
* @var javascriptText 'text/javascript', 
* @var javascriptX 'application/x-javascript', 
* @var json 'application/json', 
* @var jsonText 'text/json', 
* @var form 'application/x-www-form-urlencoded',
* @var xml 'application/xml',
* @var xmlText 'text/xml'	
* @readonly
*/
e.ajax.content = {
	html: 'text/html',
	binary: 'application/octet-stream',
	charsetUTF8: 'charset=utf-8',
	javascript: 'application/javascript', 
	javascriptText: 'text/javascript', 
	javascriptX: 'application/x-javascript', 
	json: 'application/json', 
	jsonp: 'jsonp', 
	jsonText: 'text/json', 
	form: 'application/x-www-form-urlencoded',
	xml: 'application/xml',
	xmlText: 'text/xml'	
};

///**
// * Cryptography collection
// * @class cryptography
// * @path e.cryptography
// * @readonly
// */
e.cryptography = {}

/**
* encryption or signature algorithm
* @description
* __Ex.:__
<code javascript>
var crypt = ctx.cryptography.signMessage(
  'Hello world', 'My', 'MyCertificate', 	'', 
  e.cryptography.algorithm.PKCS12, 
  e.cryptography.storeLocation.LocalMachine);
</code>
* @enumeration e.cryptography.algorithm
* @enum {string}
* @path e.cryptography.algorithm
* @var None Undefined
* @var RSA RSA
* @var PKCS PKCS 
* @var RSA_HASH RSA_HASH 
* @var RSA_ENCRYPT RSA_ENCRYPT 
* @var PKCS_1 PKCS_1
* @var PKCS_2 PKCS_2 
* @var PKCS_3 PKCS_3 
* @var PKCS_4 PKCS_4 
* @var PKCS_5 PKCS_5 
* @var PKCS_6 PKCS_6 
* @var PKCS_7 PKCS_7 
* @var PKCS_8 PKCS_8 
* @var PKCS_9 PKCS_9 
* @var PKCS_10 PKCS_10 
* @var PKCS_12 PKCS_12 
* @var RSA_MD2 RSA_MD2 
* @var RSA_MD4 RSA_MD4 
* @var RSA_MD5 RSA_MD5 
* @var RSA_RSA RSA_RSA 
* @var RSA_MD2RSA RSA_MD2RSA
* @var RSA_MD4RSA RSA_MD4RSA 
* @var RSA_MD5RSA RSA_MD5RSA 
* @var RSA_SHA1RSA RSA_SHA1RSA 
* @var RSA_SETOAEP_RSA RSA_SETOAEP_RSA 
* @var RSAES_OAEP RSAES_OAEP 
* @var RSA_MGF1 RSA_MGF1
* @var RSA_PSPECIFIED RSA_PSPECIFIED 
* @var RSA_SSA_PSS RSA_SSA_PSS 
* @var RSA_SHA256RSA RSA_SHA256RSA 
* @var RSA_SHA384RSA RSA_SHA384RSA 
* @var RSA_SHA512RSA RSA_SHA512RSA 
* @var RSA_DH RSA_DH
* @var RSA_data RSA_data 
* @var RSA_signedData RSA_signedData 
* @var RSA_envelopedData RSA_envelopedData 
* @var RSA_signEnvData RSA_signEnvData 
* @var RSA_digestedData RSA_digestedData 
* @var RSA_hashedData RSA_hashedData 
* @var RSA_encryptedData RSA_encryptedData 
* @var RSA_emailAddr RSA_emailAddr 
* @var RSA_unstructName RSA_unstructName 
* @var RSA_contentType RSA_contentType 
* @var RSA_messageDigest RSA_messageDigest 
* @var RSA_signingTime RSA_signingTime 
* @var RSA_counterSign RSA_counterSign 
* @var RSA_challengePwd RSA_challengePwd 
* @var RSA_unstructAddr RSA_unstructAddr 
* @var RSA_extCertAttrs RSA_extCertAttrs 
* @var RSA_certExtensions RSA_certExtensions 
* @var RSA_SMIMECapabilities RSA_SMIMECapabilities 
* @var RSA_preferSignedData RSA_preferSignedData 
* @var TIMESTAMP_TOKEN TIMESTAMP_TOKEN 
* @var RFC3161_counterSign RFC3161_counterSign 
* @var RSA_SMIMEalg RSA_SMIMEalg 
* @var RSA_SMIMEalgESDH RSA_SMIMEalgESDH 
* @var RSA_SMIMEalgCMS3DESwrap RSA_SMIMEalgCMS3DESwrap" , 
* @var RSA_SMIMEalgCMSRC2wrap RSA_SMIMEalgCMSRC2wrap 
* @var RSA_RC2CBC RSA_RC2CBC 
* @var RSA_RC4 RSA_RC4 
* @var RSA_DES_EDE3_CBC RSA_DES_EDE3_CBC 
* @var RSA_RC5_CBCPad RSA_RC5_CBCPad 
* @var ANSI_x942 ANSI_x942 
* @var ANSI_x942_DH ANSI_x942_DH 
* @var X957 X957 
* @var X957_DSA X957_DSA 
* @var X957_SHA1DSA X957_SHA1DSA 
* @var ECC_PUBLIC_KEY ECC_PUBLIC_KEY 
* @var ECC_CURVE_P256 ECC_CURVE_P256 
* @var ECC_CURVE_P384 ECC_CURVE_P384 
* @var ECC_CURVE_P521 ECC_CURVE_P521 
* @var ECDSA_SHA1 ECDSA_SHA1 
* @var ECDSA_SPECIFIED ECDSA_SPECIFIED 
* @var ECDSA_SHA256 ECDSA_SHA256 
* @var ECDSA_SHA384 ECDSA_SHA384 
* @var ECDSA_SHA512 ECDSA_SHA512 
* @var NIST_AES128_CBC NIST_AES128_CBC 
* @var NIST_AES192_CBC NIST_AES192_CBC 
* @var NIST_AES256_CBC NIST_AES256_CBC 
* @var NIST_AES128_WRAP NIST_AES128_WRAP 
* @var NIST_AES192_WRAP NIST_AES192_WRAP 
* @var NIST_AES256_WRAP NIST_AES256_WRAP 
* @var DATA_STRUCTURE DATA STRUCTURE 
* @var DH_SINGLE_PASS_STDDH_SHA1_KDF DH_SINGLE_PASS_STDDH_SHA1_KDF 
* @var DH_SINGLE_PASS_STDDH_SHA256_KDF DH_SINGLE_PASS_STDDH_SHA256_KDF 
* @var DH_SINGLE_PASS_STDDH_SHA384_KDF DH_SINGLE_PASS_STDDH_SHA384_KDF 
* @var DS DS 
* @var DSALG DSALG 
* @var DSALG_CRPT DSALG_CRPT 
* @var DSALG_HASH DSALG_HASH 
* @var DSALG_SIGN DSALG_SIGN 
* @var DSALG_RSA DSALG_RSA 
* @var OIW OIW 
* @var OIWSEC OIWSEC 
* @var OIWSEC_md4RSA OIWSEC_md4RSA 
* @var OIWSEC_md5RSA OIWSEC_md5RSA 
* @var OIWSEC_md4RSA2 OIWSEC_md4RSA2 
* @var OIWSEC_desECB OIWSEC_desECB 
* @var OIWSEC_desCBC OIWSEC_desCBC 
* @var OIWSEC_desOFB OIWSEC_desOFB 
* @var OIWSEC_desCFB OIWSEC_desCFB 
* @var OIWSEC_desMAC OIWSEC_desMAC 
* @var OIWSEC_rsaSign OIWSEC_rsaSign 
* @var OIWSEC_dsa OIWSEC_dsa 
* @var OIWSEC_shaDSA OIWSEC_shaDSA 
* @var OIWSEC_mdc2RSA OIWSEC_mdc2RSA 
* @var OIWSEC_shaRSA OIWSEC_shaRSA 
* @var OIWSEC_dhCommMod OIWSEC_dhCommMod 
* @var OIWSEC_desEDE OIWSEC_desEDE 
* @var OIWSEC_sha OIWSEC_sha 
* @var OIWSEC_mdc2 OIWSEC_mdc2 
* @var OIWSEC_dsaComm OIWSEC_dsaComm 
* @var OIWSEC_dsaCommSHA OIWSEC_dsaCommSHA 
* @var OIWSEC_rsaXchg OIWSEC_rsaXchg 
* @var OIWSEC_keyHashSeal OIWSEC_keyHashSeal 
* @var OIWSEC_md2RSASign OIWSEC_md2RSASign 
* @var OIWSEC_md5RSASign OIWSEC_md5RSASign 
* @var OIWSEC_sha1 OIWSEC_sha1 
* @var OIWSEC_dsaSHA1 OIWSEC_dsaSHA1 
* @var OIWSEC_dsaCommSHA1 OIWSEC_dsaCommSHA1 
* @var OIWSEC_sha1RSASign OIWSEC_sha1RSASign 
* @var OIWDIR OIWDIR 
* @var OIWDIR_CRPT OIWDIR_CRPT 
* @var OIWDIR_HASH OIWDIR_HASH 
* @var OIWDIR_SIGN OIWDIR_SIGN 
* @var OIWDIR_md2 OIWDIR_md2 
* @var OIWDIR_md2RSA OIWDIR_md2RSA 
* @var INFOSEC INFOSEC 
* @var INFOSEC_sdnsSignature INFOSEC_sdnsSignature 
* @var INFOSEC_mosaicSignature INFOSEC_mosaicSignature 
* @var INFOSEC_sdnsConfidentiality  INFOSEC_sdnsConfidentiality" , 
* @var INFOSEC_mosaicConfidentiality INFOSEC_mosaicConfidentiality 
* @var INFOSEC_sdnsIntegrity INFOSEC_sdnsIntegrity 
* @var INFOSEC_mosaicIntegrity INFOSEC_mosaicIntegrity 
* @var INFOSEC_sdnsTokenProtection  INFOSEC_sdnsTokenProtection" , 
* @var INFOSEC_mosaicTokenProtection INFOSEC_mosaicTokenProtection 
* @var INFOSEC_sdnsKeyManagement INFOSEC_sdnsKeyManagement 
* @var INFOSEC_mosaicKeyManagement  INFOSEC_mosaicKeyManagement" , 
* @var INFOSEC_sdnsKMandSig INFOSEC_sdnsKMandSig 
* @var INFOSEC_mosaicKMandSig INFOSEC_mosaicKMandSig 
* @var INFOSEC_SuiteASignature INFOSEC_SuiteASignature 
* @var INFOSEC_SuiteAConfidentiality INFOSEC_SuiteAConfidentiality 
* @var INFOSEC_SuiteAIntegrity INFOSEC_SuiteAIntegrity 
* @var INFOSEC_SuiteATokenProtection INFOSEC_SuiteATokenProtection 
* @var INFOSEC_SuiteAKeyManagement  INFOSEC_SuiteAKeyManagement" , 
* @var INFOSEC_SuiteAKMandSig INFOSEC_SuiteAKMandSig 
* @var INFOSEC_mosaicUpdatedSig INFOSEC_mosaicUpdatedSig 
* @var INFOSEC_mosaicKMandUpdSig INFOSEC_mosaicKMandUpdSig 
* @var INFOSEC_mosaicUpdatedInteg INFOSEC_mosaicUpdatedInteg 
* @var NIST_sha256 NIST_sha256 
* @var NIST_sha384 NIST_sha384 
* @var NIST_sha512 NIST_sha512 
* @var PKIX_NO_SIGNATURE PKIX_NO_SIGNATURE 
* @var ECDSA_SPECIFIED ECDSA_SPECIFIED
* @readonly
*/
e.cryptography.algorithm = {
	None: "",
	RSA: "RSA",
	PKCS: "PKCS", 
	RSA_HASH: "RSA_HASH", 
	RSA_ENCRYPT: "RSA_ENCRYPT", 
	PKCS_1: "PKCS_1",
	PKCS_2: "PKCS_2", 
	PKCS_3: "PKCS_3", 
	PKCS_4: "PKCS_4", 
	PKCS_5: "PKCS_5", 
	PKCS_6: "PKCS_6", 
	PKCS_7: "PKCS_7", 
	PKCS_8: "PKCS_8", 
	PKCS_9: "PKCS_9", 
	PKCS_10: "PKCS_10", 
	PKCS_12: "PKCS_12", 
	RSA_MD2: "RSA_MD2", 
	RSA_MD4: "RSA_MD4", 
	RSA_MD5: "RSA_MD5", 
	RSA_RSA: "RSA_RSA", 
	RSA_MD2RSA: "RSA_MD2RSA",
	RSA_MD4RSA: "RSA_MD4RSA", 
	RSA_MD5RSA: "RSA_MD5RSA", 
	RSA_SHA1RSA: "RSA_SHA1RSA", 
	RSA_SETOAEP_RSA: "RSA_SETOAEP_RSA", 
	RSAES_OAEP: "RSAES_OAEP", 
	RSA_MGF1: "RSA_MGF1",
	RSA_PSPECIFIED: "RSA_PSPECIFIED", 
	RSA_SSA_PSS: "RSA_SSA_PSS", 
	RSA_SHA256RSA: "RSA_SHA256RSA", 
	RSA_SHA384RSA: "RSA_SHA384RSA", 
	RSA_SHA512RSA: "RSA_SHA512RSA", 
	RSA_DH: "RSA_DH",
	RSA_data: "RSA_data", 
	RSA_signedData: "RSA_signedData", 
	RSA_envelopedData: "RSA_envelopedData", 
	RSA_signEnvData: "RSA_signEnvData", 
	RSA_digestedData: "RSA_digestedData", 
	RSA_hashedData: "RSA_hashedData", 
	RSA_encryptedData: "RSA_encryptedData", 
	RSA_emailAddr: "RSA_emailAddr", 
	RSA_unstructName: "RSA_unstructName", 
	RSA_contentType: "RSA_contentType", 
	RSA_messageDigest: "RSA_messageDigest", 
	RSA_signingTime: "RSA_signingTime", 
	RSA_counterSign: "RSA_counterSign", 
	RSA_challengePwd: "RSA_challengePwd", 
	RSA_unstructAddr: "RSA_unstructAddr", 
	RSA_extCertAttrs: "RSA_extCertAttrs", 
	RSA_certExtensions: "RSA_certExtensions", 
	RSA_SMIMECapabilities: "RSA_SMIMECapabilities", 
	RSA_preferSignedData: "RSA_preferSignedData", 
	TIMESTAMP_TOKEN: "TIMESTAMP_TOKEN", 
	RFC3161_counterSign: "RFC3161_counterSign", 
	RSA_SMIMEalg: "RSA_SMIMEalg", 
	RSA_SMIMEalgESDH: "RSA_SMIMEalgESDH", 
	RSA_SMIMEalgCMS3DESwrap: "RSA_SMIMEalgCMS3DESwrap" , 
	RSA_SMIMEalgCMSRC2wrap: "RSA_SMIMEalgCMSRC2wrap", 
	RSA_RC2CBC: "RSA_RC2CBC", 
	RSA_RC4: "RSA_RC4", 
	RSA_DES_EDE3_CBC: "RSA_DES_EDE3_CBC", 
	RSA_RC5_CBCPad: "RSA_RC5_CBCPad", 
	ANSI_x942: "ANSI_x942", 
	ANSI_x942_DH: "ANSI_x942_DH", 
	X957: "X957", 
	X957_DSA: "X957_DSA", 
	X957_SHA1DSA: "X957_SHA1DSA", 
	ECC_PUBLIC_KEY: "ECC_PUBLIC_KEY", 
	ECC_CURVE_P256: "ECC_CURVE_P256", 
	ECC_CURVE_P384: "ECC_CURVE_P384", 
	ECC_CURVE_P521: "ECC_CURVE_P521", 
	ECDSA_SHA1: "ECDSA_SHA1", 
	ECDSA_SPECIFIED: "ECDSA_SPECIFIED", 
	ECDSA_SHA256: "ECDSA_SHA256", 
	ECDSA_SHA384: "ECDSA_SHA384", 
	ECDSA_SHA512: "ECDSA_SHA512", 
	NIST_AES128_CBC: "NIST_AES128_CBC", 
	NIST_AES192_CBC: "NIST_AES192_CBC", 
	NIST_AES256_CBC: "NIST_AES256_CBC", 
	NIST_AES128_WRAP: "NIST_AES128_WRAP", 
	NIST_AES192_WRAP: "NIST_AES192_WRAP", 
	NIST_AES256_WRAP: "NIST_AES256_WRAP", 
	DATA_STRUCTURE: "DATA STRUCTURE", 
	DH_SINGLE_PASS_STDDH_SHA1_KDF: "DH_SINGLE_PASS_STDDH_SHA1_KDF", 
	DH_SINGLE_PASS_STDDH_SHA256_KDF: "DH_SINGLE_PASS_STDDH_SHA256_KDF", 
	DH_SINGLE_PASS_STDDH_SHA384_KDF: "DH_SINGLE_PASS_STDDH_SHA384_KDF", 
	DS: "DS", 
	DSALG: "DSALG", 
	DSALG_CRPT: "DSALG_CRPT", 
	DSALG_HASH: "DSALG_HASH", 
	DSALG_SIGN: "DSALG_SIGN", 
	DSALG_RSA: "DSALG_RSA", 
	OIW: "OIW", 
	OIWSEC: "OIWSEC", 
	OIWSEC_md4RSA: "OIWSEC_md4RSA", 
	OIWSEC_md5RSA: "OIWSEC_md5RSA", 
	OIWSEC_md4RSA2: "OIWSEC_md4RSA2", 
	OIWSEC_desECB: "OIWSEC_desECB", 
	OIWSEC_desCBC: "OIWSEC_desCBC", 
	OIWSEC_desOFB: "OIWSEC_desOFB", 
	OIWSEC_desCFB: "OIWSEC_desCFB", 
	OIWSEC_desMAC: "OIWSEC_desMAC", 
	OIWSEC_rsaSign: "OIWSEC_rsaSign", 
	OIWSEC_dsa: "OIWSEC_dsa", 
	OIWSEC_shaDSA: "OIWSEC_shaDSA", 
	OIWSEC_mdc2RSA: "OIWSEC_mdc2RSA", 
	OIWSEC_shaRSA: "OIWSEC_shaRSA", 
	OIWSEC_dhCommMod: "OIWSEC_dhCommMod", 
	OIWSEC_desEDE: "OIWSEC_desEDE", 
	OIWSEC_sha: "OIWSEC_sha", 
	OIWSEC_mdc2: "OIWSEC_mdc2", 
	OIWSEC_dsaComm: "OIWSEC_dsaComm", 
	OIWSEC_dsaCommSHA: "OIWSEC_dsaCommSHA", 
	OIWSEC_rsaXchg: "OIWSEC_rsaXchg", 
	OIWSEC_keyHashSeal: "OIWSEC_keyHashSeal", 
	OIWSEC_md2RSASign: "OIWSEC_md2RSASign", 
	OIWSEC_md5RSASign: "OIWSEC_md5RSASign", 
	OIWSEC_sha1: "OIWSEC_sha1", 
	OIWSEC_dsaSHA1: "OIWSEC_dsaSHA1", 
	OIWSEC_dsaCommSHA1: "OIWSEC_dsaCommSHA1", 
	OIWSEC_sha1RSASign: "OIWSEC_sha1RSASign", 
	OIWDIR: "OIWDIR", 
	OIWDIR_CRPT: "OIWDIR_CRPT", 
	OIWDIR_HASH: "OIWDIR_HASH", 
	OIWDIR_SIGN: "OIWDIR_SIGN", 
	OIWDIR_md2: "OIWDIR_md2", 
	OIWDIR_md2RSA: "OIWDIR_md2RSA", 
	INFOSEC: "INFOSEC", 
	INFOSEC_sdnsSignature: "INFOSEC_sdnsSignature", 
	INFOSEC_mosaicSignature: "INFOSEC_mosaicSignature", 
	INFOSEC_sdnsConfidentiality : "INFOSEC_sdnsConfidentiality" , 
	INFOSEC_mosaicConfidentiality: "INFOSEC_mosaicConfidentiality", 
	INFOSEC_sdnsIntegrity: "INFOSEC_sdnsIntegrity", 
	INFOSEC_mosaicIntegrity: "INFOSEC_mosaicIntegrity", 
	INFOSEC_sdnsTokenProtection : "INFOSEC_sdnsTokenProtection" , 
	INFOSEC_mosaicTokenProtection: "INFOSEC_mosaicTokenProtection", 
	INFOSEC_sdnsKeyManagement: "INFOSEC_sdnsKeyManagement", 
	INFOSEC_mosaicKeyManagement : "INFOSEC_mosaicKeyManagement" , 
	INFOSEC_sdnsKMandSig: "INFOSEC_sdnsKMandSig", 
	INFOSEC_mosaicKMandSig: "INFOSEC_mosaicKMandSig", 
	INFOSEC_SuiteASignature: "INFOSEC_SuiteASignature", 
	INFOSEC_SuiteAConfidentiality: "INFOSEC_SuiteAConfidentiality", 
	INFOSEC_SuiteAIntegrity: "INFOSEC_SuiteAIntegrity", 
	INFOSEC_SuiteATokenProtection: "INFOSEC_SuiteATokenProtection", 
	INFOSEC_SuiteAKeyManagement : "INFOSEC_SuiteAKeyManagement" , 
	INFOSEC_SuiteAKMandSig: "INFOSEC_SuiteAKMandSig", 
	INFOSEC_mosaicUpdatedSig: "INFOSEC_mosaicUpdatedSig", 
	INFOSEC_mosaicKMandUpdSig: "INFOSEC_mosaicKMandUpdSig", 
	INFOSEC_mosaicUpdatedInteg: "INFOSEC_mosaicUpdatedInteg", 
	NIST_sha256: "NIST_sha256", 
	NIST_sha384: "NIST_sha384", 
	NIST_sha512: "NIST_sha512", 
	PKIX_NO_SIGNATURE: "PKIX_NO_SIGNATURE"
}

/**
* Certificate store location
* @description
* __Ex.:__
<code javascript>
var crypt = ctx.cryptography.signMessage(
  'Hello world', 'My', 'MyCertificate', 	'', 
  e.cryptography.algorithm.PKCS12, 
  e.cryptography.storeLocation.LocalMachine);
</code>
* @enumeration e.cryptography.storeLocation
* @enum {number}
* @path e.cryptography.storeLocation
* @var None Undefined
* @var CurrentUser Current User
* @var LocalMachine Local Machine
* @var CurrentService Current Service
* @var Services Services
* @var Users Users 
* @var CurrentUserGroupPolicy Current User Group Policy 
* @var LocalMachineGroupPolicy Local Machine Group Policy
* @var LocalMachineEnterprise Local Machine Enterprise 
* @readonly
*/
e.cryptography.storeLocation = {
	None : 0,
	CurrentUser : 1,
	LocalMachine : 2,
	CurrentService : 4,
	Services : 5,
	Users : 6,
	CurrentUserGroupPolicy : 7,
	LocalMachineGroupPolicy : 8,
	LocalMachineEnterprise : 9
}

e.data = {}

/**
* Path type for data access
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.pathType
* @enum {number}
* @path e.data.pathType
* @var JsonPath JsonPath syntax
* @var XPath XPath syntax
* @var SQLPath SQL-like syntax
* @readonly
*/
e.data.pathType = {
	JsonPath : 1,
	SQLPath : 2,
	XPath : 3
}

/**
* Data initialization type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.initType
* @enum {string}
* @path e.data.initType
* @var ADD creates a new node even if one already exists with the same name 
* @var CREATE creates a new node only if it does not already exist 
* @var CRINIT creates a new node if it doesn't exist already. If it exists, it is re-initialized 
* @var DEL deletes a node if it exists. 
* @readonly
*/
e.data.initType = {
	ADD : 'ADD',
	CREATE : 'CREATE',
	CRINIT : 'CRINIT',
	DEL : 'DEL'
}

/**
* Data initialization or output format
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.format
* @enum {string}
* @path e.data.format
* @var CTX existing node defined in the Context
* @var JS Javascript object
* @var JSON text in JSON format
* @var JSONURL URL of an external JSON file
* @var TEXT text without specific format 
* @var XML text in XML format 
* @var XMLURL URL of an external XML file
* @readonly
*/
e.data.format = {
	CTX : '2', 			// '2' or 'CTX'
	JS : '5',
	JSON : '3',
	JSONURL : '4',
	TEXT : '6',
	XML : '1', 			// '1' or 'XML'
	XMLURL : '0' 		// '0' or 'URL'
}

/**
* Platform environment
* @description
* __Ex.:__
<code javascript>
// define production and test URL for MyAppli application
MyAppli.pHome.setPath(e.env.prod, 'https://prodserver/crm/index.html')
MyAppli.pHome.setPath(e.env.dev, 'https://testserver/crm/index.html')
...
// select 'production' as current environment
ctx.options.env = e.env.prod;
...
// start application (with 'production' URL)
MyAppli.pHome.start();
</code>
* @enumeration e.env
* @enum {string}
* @path e.env
* @var prod Poduction
* @var qual Qualification
* @var dev Development
* @readonly
*/
e.env = {
	prod: 'prod',
	qual: 'qual',
	dev: 'dev'
}

/**
* Standard error list
* @description
* __Ex.:__
<code javascript> return e.error.OK; </code>
* @enumeration e.error
* @enum {string}
* @path e.error
* @readonly
* @var OK success 
* @var KO generic failure 
* @var Fail generic failure 
* @var NotImplemented non implemented functions 
* @var InvalidArgument invalid arguments in a function call 
* @var InvalidCommand unknown command in a function call 
* @var NotConnected unconnected channel to send data 
* @var UndefinedObject undefined object 
* @var NotFound object not found 
* @var DuplicateId name or identifier is not unique 
* @var ReservedId name or identifier is reserved
* @var TimeOut treatment or scenario failed in timeout
* @var Cancelled treatment or scenario was cancelled
*/
e.error = {
	OK : 'OK',
	KO: 'KO',
	Fail : 'Fail',
	NotImplemented : 'NotImplemented',
	InvalidArgument : 'InvalidArgument',
	InvalidCommand : 'InvalidCommand',
	NotConnected : 'NotConnected',
	UndefinedObject : 'UndefinedObject',
	NotFound : 'NotFound',
	DuplicateId : 'DuplicateId',
	ReservedId : 'ReservedId',
	TimeOut : 'TimeOut',
	Cancelled : 'Cancelled'
}

/**
 * Event collection
 * @class event
 * @path e.event
 * @readonly
 */
e.event = {}

/**
 * Technical event for an application
 * @description
 * __Ex.:__
<code javascript>
GLOBAL.events.START.on(function (ev) {function(ev) { ... });
</code>
* @enumeration e.event.application
* @enum {string}
* @path e.event.application
* @var START application started
* @var INIT application initialized
* @var QUIT application quitting
* @var END application stopped
* @readonly
*/
e.event.application = {
	START : 'START',
	INIT : 'INIT',
	QUIT : 'QUIT',
	END : 'END'
}

/**
* Technical event for an item
* @description
* __Note:__ a TRACK_EVENT should habe been set on the item to trigger the event
*
* __Ex.:__
<code javascript>
LinkedIn.pHome.btDetails.events.COMMAND.on(function(ev) { ... });
</code>
* @enumeration e.event.item
* @enum {string}
* @path e.event.item
* @var SETFOCUS    Set focus 
* @var KILLFOCUS   Kill focus
* @var ENABLE      Enable 
* @var DISABLE     Disable
* @var COMMAND     Command
* @var UPDATE      Update
* @var SCROLL      Scroll
* @var CLICK       Click
* @var RCLICK      Right click
* @var DBLCLICK    Double click 
* @var DBLCLK      Double click
* @var RDBLCLICK   Right double click
* @readonly
*/
e.event.item = {
	SETFOCUS : 'SETFOCUS',
	KILLFOCUS : 'KILLFOCUS',
	ENABLE : 'ENABLE',
	DISABLE : 'DISABLE',
	COMMAND : 'COMMAND',
	UPDATE : 'UPDATE',
	SCROLL : 'SCROLL',
	CLICK : 'CLICK',
	RCLICK : 'RCLICK',
	DBLCLICK : 'DBLCLICK',
	DBLCLK : 'DBLCLK',
	RDBLCLICK : 'RDBLCLICK'
}

/**
* Technical event for a page
* @description
* __Ex.:__
<code javascript>
LinkedIn.pHome.events.LOAD.on(function(ev) { ... });
</code>
* @enumeration e.event.page
* @enum {string}
* @path e.event.page
* @var LOAD page load
* @var UNLOAD page unload
* @var ACTIVATE  page activation
* @var ENABLE page enabling
* @var DISABLE page disabling
* @var SHOW page showing
* @var HIDE page hiding
* @var UPDATE page update
* @var SCROLL page scrolling
* @var SIZE page resizing
* @var RESIZE  page resizing
* @var MENUPOPUP page menu opening
* @var CHANGE page change
* @var SAP_CNX SAP BAPI connection event
* @var SAP_RESP SAP BAPI answer event
* @readonly
*/
e.event.page = {
	LOAD : 'LOAD',
	UNLOAD : 'UNLOAD',
	ACTIVATE : 'ACTIVATE',
	ENABLE : 'ENABLE',
	DISABLE : 'DISABLE',
	SHOW : 'SHOW',
	HIDE : 'HIDE',
	UPDATE : 'UPDATE',
	SCROLL : 'SCROLL',
	SIZE : 'SIZE',
	RESIZE : 'RESIZE',
	MENUPOPUP : 'MENUPOPUP',
	CHANGE : 'CHANGE',
	SAP_CNX : 'SAP_CNX',
	SAP_RESP : 'SAP_RESP'
}

/**
* Extended connnectors
* @description
* __Ex.:__
<code javascript>
GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '');
</code>
* @enumeration e.extendedConnector
* @enum {string}
* @path e.extendedConnector
* @var UIAutomation UIAutomation connector
* @var HLLAPI HLLAPI (3270) connector
* @var ExpBar ExpBar (systray, menu bar) connector
* @var Discovery Discovery connector
* @readonly
*/
e.extendedConnector = {
	UIAutomation : 'CxUIADriver.Pilote',
	HLLAPI : 'XsContextor2.ExpIHll2',
	ExpBar : 'XsContextor2.ExpBar2',
	Discovery : 'XsContextor2.ExpBae'
}

/**
* File collection
* @class file
* @path e.file
* @readonly
*/
e.file = {}

/**
* File encoding (Ascii, UTF-8, ...)
* @description
* __Ex.:__
<code javascript>
var file = '...';
var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
</code>
* @enumeration e.file.encoding
* @enum {string}
* @path e.file.encoding
* @var ASCII ASCII
* @var Binary Binary
* @var UTF8 UTF-8
* @var UTF16 UTF-16
* @readonly
*/
e.file.encoding = {
	ASCII : 'iso-8859-1', // 'Windows-1252',
	Binary : 'binary',
	UTF8 : 'utf-8',
	UTF16 : 'utf-16'
}

/**
* @deprecated use e.file.encoding instead of e.fileEncoding
* @enumeration fileEncoding
* @advanced
* @enum {string}
* @path e.fileEncoding
* @readonly
*/
e.fileEncoding = e.file.encoding;

/**
* File mode used for FTP operations
* @description
* __Ex.:__
<code javascript>
fso.ftp.download('c:\\temp', 'home/temp', fileList, e.file.operation.NoUI);
</code>
* @enumeration e.file.operation
* @enum {number}
* @path e.file.operation
* @var MultiDestFiles  The destination specifies multiple destination files (one for each source file in pFrom) rather than one directory where all source files are to be deposited    
* @var Silent don't display progress UI (confirm prompts may be displayed still)
* @var RenameOnCollision automatically rename the source files to avoid the collisions
* @var NoConfirmation don't display confirmation UI, assume "yes" for cases that can be bypassed, "no" for those that can not
* @var AllowUndo enable undo including Recycle behavior for IFileOperation::Delete()
* @var FilesOnly only operate on the files (non folders), both files and folders are assumed without this
* @var SimpleProgress means don't show names of files
* @var NoConfirmMkdir don't dispplay confirmatino UI before making any needed directories, assume "Yes" in these cases
* @var NoErrorUI don't put up error UI, other UI may be displayed, progress, confirmations
* @var NoCopySecurityAttribs dont copy file security attributes (ACLs)
* @var NoRecursion don't recurse into directories for operations that would recurse
* @var NoConnectedElements don't operate on connected elements ("xxx_files" folders that go with .htm files)
* @var WantNukeWarning during delete operation, warn if nuking instead of recycling (partially overrides NOCONFIRMATION)
* @var NoRecurseReparse deprecated; the operations engine always does the right thing on FolderLink objects (symlinks, reparse points, folder shortcuts)
* @var NoUI don't display any UI at all ( = Silent + NoConfirmation + NoConfirmMkdir + NoErrorUI )
* @readonly
*/
e.file.operation = {
	MultiDestFiles        :	1,
	Silent                : 4,
	RenameOnCollision     :	8 ,
	NoConfirmation        :	16,
	AllowUndo             : 64,
	FilesOnly             : 128,
	SimpleProgress        : 256,
	NoConfirmMkdir        : 512,
	NoErrorUI             : 1024,
	NoCopySecurityAttribs : 2048,
	NoRecursion           : 4096,
	NoConnectedElements 	:	8192,
	WantNukeWarning       : 16384,
	NoRecurseReparse      : 32768,
	NoUI                  : (4 + 16 + 512 + 1024) 
}

/**
* @deprecated use e.file.operation instead of e.fileOperation
* @enumeration fileOperation
* @advanced
* @enum {number}
* @path e.fileOperation
* @readonly
*/
e.fileOperation = e.file.operation;

/**
* Html collection
* @class html
* @path e.html
* @readonly
*/
e.html = {}

/**
* HTML attribute type (id, name, class, ...)
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.html.type
* @enum {string}
* @path e.html.type
* @var id object id
* @var name object name
* @var tag object tag
* @var class object class
* @readonly
*/
e.html.type = {
	id : 'id',
	name : 'name',
	tag : 'tag',
	className : 'class'
}

/**
* Relative insertion position for HTML objects
* @description
* __Ex.:__
<code javascript>
// create a SalesForce button inside MyWebAppli MyPage page, before 'company' object
var sLabel = 'Copy to SalesForce';
var sIcon = 'http://.../salesforce_icon.jpg';
this.insertImageButton('btSalesForce', MyWebAppli.MyPage.oCompany, sIcon, sLabel, e.html.position.beforeBegin);
</code>
* @enumeration e.html.position
* @enum {string}
* @path e.html.position
* @var beforeBegin Inserts html immediately before the object.
* @var afterBegin Inserts html after the start of the object but before all other content in the object.
* @var beforeEnd Inserts html immediately before the end of the object but after all other content in the object.
* @var afterEnd Inserts html immediately after the end of the object
* @readonly
*/
e.html.position = {
	beforeBegin : 'beforeBegin',
	afterBegin : 'afterBegin',
	beforeEnd : 'beforeEnd',
	afterEnd : 'afterEnd'
}

/**
* @deprecated use e.html.position instead of e.htmlPosition
* @enumeration htmlPosition
* @advanced
* @enum {string}
* @path e.htmlPosition
* @readonly
*/
e.htmlPosition = e.html.position;

/**
* Special keyboard keys (Shift, Ctrl, F1, F2, ...)
* @description
* __Ex.:__
<code javascript>
// send Ctrl+F12 shortcut
MyHllApiAppli.pSchedule.keyStroke(e.key.Ctrl + e.key.F12); 
</code>
* @enumeration e.key
* @enum {string}
* @path e.key
* @var Add '+' key
* @var Alt 'Alt' key
* @var Attn 'Attn' key
* @var Back 'Back' key
* @var BackTab 'Back Tab' key
* @var Clear 'Clear' key (HLLAPI specific)
* @var ContextMenu 'Context Menu' key
* @var Ctrl 'Control' key
* @var Decimal 'Decimal' key
* @var Del 'Delete' key
* @var Divide '/' key
* @var Down 'Down' key
* @var End 'End' key
* @var Enter 'Enter' key
* @var Erase 'Erase' key (HLLAPI specific)
* @var Esc 'Escape' key
* @var F1 'F1' key
* @var F2 'F2' key
* @var F3 'F3' key
* @var F4 'F4' key
* @var F5 'F5' key
* @var F6 'F6' key
* @var F7 'F7' key
* @var F8 'F8' key
* @var F9 'F9' key
* @var F10 'F10' key
* @var F11 'F11' key
* @var F12 'F12' key
* @var F13 'F13' key
* @var F14 'F14' key
* @var F15 'F15' key
* @var F16 'F16' key
* @var F17 'F17' key
* @var F18 'F18' key
* @var F19 'F19' key
* @var F20 'F20' key
* @var F21 'F21' key
* @var F22 'F22' key
* @var F23 'F23' key
* @var F24 'F24' key
* @var Home 'Home' key
* @var Insert 'Insert' key
* @var Left 'Left' key
* @var Multiply '*' key
* @var NumEnter 'Enter' key on numeric keyboard
* @var PA1 'PA1' key (HLLAPI specific)
* @var PA2 'PA2' key (HLLAPI specific)
* @var PA3 'PA3' key (HLLAPI specific)
* @var PageDown 'Page Down' key
* @var PageUp 'Page Up' key
* @var Pause 'Pause' key
* @var PrintScreen 'Print Screen' key
* @var Reset 'Reset' key (HLLAPI specific)
* @var Right 'Right' key
* @var ScrollLock 'ScrollLock' key
* @var Shift 'Shift' key
* @var Space 'Space' key
* @var Substract '-' key
* @var Tab 'Tab' key
* @var Up 'Up' key
* @readonly
*/
e.key = {
	Add : '_Add_',
	Alt : '_Alt_',
	Attn : '_Attn_',
	Back : '_Back_',
	BackTab : '_BackTab_',
	Clear : '_Clear_',
	ContextMenu : '_ContextMenu_',
	Ctrl : '_Ctrl_',
	Decimal : '_Decimal_',
	Del : '_Del_',
	Divide : '_Divide_',
	Down : '_Down_',
	End : '_End_',
	Enter : '_Enter_',
	Erase : '_Erase_',
	Esc : '_Esc_',
	F1 : '_F1_',                             
	F2 : '_F2_',
	F3 : '_F3_',
	F4 : '_F4_',
	F5 : '_F5_',
	F6 : '_F6_',
	F7 : '_F7_',
	F8 : '_F8_',
	F9 : '_F9_',
	F10 : '_F10_',
	F11 : '_F11_',
	F12 : '_F12_',
	F13 : '_F13_',
	F14 : '_F14_',
	F15 : '_F15_',
	F16 : '_F16_',
	F17 : '_F17_',
	F18 : '_F18_',
	F19 : '_F19_',
	F20 : '_F20_',
	F21 : '_F21_',
	F22 : '_F22_',
	F23 : '_F23_',
	F24 : '_F24_',
	Home : '_Home_',
	Insert : '_Insert_',
	Left : '_Left_',
	Multiply : '_Multiply_',
	NumEnter : '_NumEnter_',
	PA1 : '_PA1_',                             
	PA2 : '_PA2_',                             
	PA3 : '_PA3_',                             
	PageDown : '_PageDown_',
	PageUp : '_PageUp_',
	Pause : '_Pause_',
	PrintScreen : '_PrintScreen_',
	Reset : '_Reset_',
	Right : '_Right_',
	ScrollLock : '_ScrollLock_',
	Shift : '_Shift_',
	Space : ' ',
	Substract : '_Substract_',
	Tab : '_Tab_',
	Up : '_Up_',
	CapsLock : '_CapsLock_'
}

/**
* Process launch flag
* @description
* __Ex.:__
<code javascript>// start Linked home page in maximized mode
LinkedIn.pHome.start(null, null, null, e.launchFlag.ShowMaximized);
</code>
* @enumeration e.launchFlag
* @enum {string}
* @path e.launchFlag
* @var Maximize Maximize application
* @var Minimize Minimize application
* @var Hide Hide application
* @var Show Show application
* @var ShowMaximized Show application in maximized mode
* @readonly
*/
e.launchFlag = {
	Maximize : 'SW_MAXIMIZE',
	Minimize : 'SW_MINIMIZE',
	Hide : 'SW_HIDE',
	Show : 'SW_SHOW',
	ShowMaximized : 'SW_SHOWMAXIMIZED'
}

/**
* Type used to display a ctx.log icon
* @description
* __Ex.:__
<code javascript>
ctx.log('Step ' + _step.name + ': timeout' , e.logIconType.Warning );
</code>
* @enumeration e.logIconType
* @enum {number}
* @path e.logIconType
* @var Info      Info 
* @var Error     Error 
* @var Question  Question 
* @var Warning   Warning 
* @var Event     Event 
* @var Data      Data 
* @var Action    Action 
* @var UserAction    User action 
* @readonly
*/
e.logIconType = {
	Info : 0, 
	Error : 1,
	Question : 2,
	Warning : 3,
	Event : 28,
	UserAction : 4,
	Data : 6,
	Action : 24
}

/**
* message box type collection
* @class messbox
* @path e.messbox
* @readonly
*/
e.messbox = {}

/**
* Message box Appbar type (used for MESSBOX v1 only)
* @description
<code javascript>
<code javascript>
ctx.popup('pInfo').messbox({
  Type : e.messbox.type.HTMLView,
  Template : e.messbox.template.Info,
  AppBar : e.messbox.appbarType.Top,
  ...
});
</code>
* @enumeration e.messbox.appbarType
* @enum {string}
* @path e.messbox.appbarType
* @var None disabled
* @var Top Top position
* @var Bottom Bottom position
* @var Left Left position
* @var Right Right position
* @readonly
*/
e.messbox.appbarType = {
	None : '',
	Top : 'Top',
	Bottom : 'Bottom',
	Left : 'Left',
	Right : 'Right'
}

/**
* Message box template type (used for MESSBOX v1 only)
* @description
* __Ex.:__
<code javascript>
ctx.popup('pInfo').messbox({
  Type : e.messbox.type.HTMLView,
  Template : e.messbox.template.Info,
  ...
});
</code>
* @enumeration e.messbox.template
* @enum {string}
* @path e.messbox.template
* @var Info Windows popup with icon 'Info'
* @var Warning Windows popup with icon 'Warning'
* @var Error Windows popup with icon 'Error'
* @var Choice Windows popup with icon 'Choice'
* @readonly
*/
e.messbox.template = {
	Info : 'Info',
	Warning : 'Warning',
	Error : 'Error',
	Choice : 'Choice'
}

/**
* Message box template type (used for MESSBOX v1 only)
* @description
* __Ex.:__
<code javascript>
ctx.popup('pInfo').messbox({
  Type : e.messbox.type.HTMLView,
  ...
});
</code>
* @enumeration e.messbox.type
* @enum {string}
* @path e.messbox.type
* @var Info Windows popup with icon 'Info'
* @var Warning Windows popup with icon 'Warning'
* @var Error Windows popup with icon 'Error'
* @var Question Windows popup with icon 'Question'
* @var Choice Windows popup with icon 'Choice'
* @var HTMLDialog HTML modal popup
* @var HTMLView HTML modeless popup
* @var XMLDialog HTML modal popup with interpretation of XML (XSLT)
* @var XMLView HTML modeless popup with interpretation of XML (XSLT)
* @readonly
*/
e.messbox.type = {
	Info : 'Info',
	Warning : 'Warning',
	Error : 'Error',
	Choice : 'Choice',
	HTMLView : 'HTMLView',
	HTMLDialog : 'HTMLDialog',
	XMLView : 'XMLView',
	XMLDialog : 'XMLDialog'
}

///**
//* message box alert type collection
//* 
//* @class messboxAlert
//* @path e.messboxAlert
//* @readonly
//*/
e.messboxAlert = {}

/**
* messboxAlert animation type
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  AnimationType: e.messboxAlert.animation.Slide,
  ...
</code>
* @enumeration e.messboxAlert.animation
* @enum {string}
* @path e.messboxAlert.animation
* @var None    Disabled
* @var Unfold  Unfold animation
* @var Slide   Slide animation
* @var Face    Face animation
* @readonly
*/
e.messboxAlert.animation = {
	None : '',
	Unfold : 'Unfold',
	Slide : 'Slide',
	Face : 'Face'
}

/**
* type of link displayed in the message box
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event,
  Value: 'evStartScenario',
  Data: 'scScenario1',
  ...
</code>
* @enumeration e.messboxAlert.linkType
* @enum {string}
* @path e.messboxAlert.linkType
* @var None Link is disabled
* @var Action Link triggers an action 
* @var Event Link triggers an event
* @readonly
*/
e.messboxAlert.linkType = {
	None : '',
	Action : 'Action',
	Event : 'Event'
}

/**
* messboxAlert look type
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  Look: e.messboxAlert.look.AppLookVisualStudio2008,
  ...
</code>
* @enumeration e.messboxAlert.look
* @enum {string}
* @path e.messboxAlert.look
* @var AppLookWindows2000 Windows 2000					
* @var AppLookOfficeXP Office XP							
* @var AppLookWindowsXP Windows XP						
* @var AppLookWindows7 Windows 7							
* @var AppLookOffice2003 Office 2003						
* @var AppLookVisualStudio2005 Visual Studio 2005			
* @var AppLookVisualStudio2008 Visual Studio 2008			
* @var AppLookOffice2007Blue Office 2007 Blue				
* @var AppLookOffice2007Black Office 2007 Black			
* @var AppLookOffice2007BlueSilver Office 2007 BlueSilver	
* @var AppLookOffice2007Aqua Office 2007 Aqua				
* @readonly
*/
e.messboxAlert.look = {
	AppLookWindows2000					: 'AppLookWindows2000',
	AppLookOfficeXP							: 'AppLookOfficeXP',
	AppLookWindowsXP						: 'AppLookWindowsXP',
	AppLookWindows7							: 'AppLookWindows7',
	AppLookOffice2003						: 'AppLookOffice2003',
	AppLookVisualStudio2005			: 'AppLookVisualStudio2005',
	AppLookVisualStudio2008			: 'AppLookVisualStudio2008',
	AppLookOffice2007Blue				: 'AppLookOffice2007Blue',
	AppLookOffice2007Black			: 'AppLookOffice2007Black',
	AppLookOffice2007BlueSilver	: 'AppLookOffice2007BlueSilver',
	AppLookOffice2007Aqua				: 'AppLookOffice2007Aqua'
}

/**
* Page or application nature
* @description
* __Ex.:__
<code javascript>// test if application is declared as an UIAutomation application
if (MyAppli.is(e.nature.UIAUTOMATION)) { ... }
</code>
* @enumeration e.nature
* @enum {string}
* @path e.nature
* @var WEB Web (v2)
* @var WEB3 Web (v3)
* @var EXEWIN Windows (v1)
* @var WIN Windows (v2)
* @var SWG Javaswing
* @var HLLAPI HLL API
* @var UIAUTOMATION UI Automation
* @var WINDOWLESS Windowless
* @var FLEX Flash/Flex
* @var OCR OCR
* @var EXPBAR2 systray
* @var MESSBOX messbox v1
* @var MESSBOX2 messbox v2
* @var MESSBOXALERT messbox alert
* @readonly
*/
e.nature = {
	WEB	:	'WEB',
	WEB3 : 'WEB3',
	EXEWIN : 'EXEWIN',	
	WIN	:	'WIN',	
	SWG	: 'SWG',
	HLLAPI :	'HLLAPI',
	UIAUTOMATION : 'UIAUTOMATION',
	WINDOWLESS : 'Txt',
	FLEX : 'FLEX',
	NSDK : 'NSDK',
	OCR : 'OCR',
	EXPBAR2 : 'EXPBAR2',
	MESSBOX : 'MESSBOX',
	MESSBOX2 : 'MESSBOX2',
	MESSBOXALERT : 'MESSBOXALERT'
}

/**
* Standard Web navigators
* @description
* __Ex.:__
<code javascript>// force Firefox as navigator when starting Salesforce
Salesforce.navigator = e.navigator.Firefox;
...
Salesforce.start();
</code>
* @enumeration e.navigator
* @enum {string}
* @path e.navigator
* @var IE Internet Explorer
* @var Firefox Firefox
* @var Chrome Chrome
* @readonly
*/
e.navigator = {
	Chrome : 'chrome.exe',
	Firefox : 'firefox.exe',
	IE : 'iexplore.exe',
	Undefined : ''
}

/**
* Internal prefixes
* @ignore
* @description
* @enumeration e.prefix
* @enum {string}
* @path e.prefix
* @var raw raw data
* @var json json data
* @readonly
*/
e.prefix = {
	json : '!json:',
	raw : '!raw:',
	rawBegin : '%<%',
	rawEnd : '%>%',
	tryCatch : '!try:'
}

/**
 * Registry collection
 * @class registry
 * @path e.registry
 * @readonly
 */
e.registry = {}

/**
* Registry Key root
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.registry.root
* @enum {string}
* @path e.registry.root
* @var CurrentUser HKEY_CURRENT_USER
* @var LocalMachine HKEY_LOCAL_MACHINE
* @var ClassesRoot HKEY_CLASSES_ROOT
* @var Users HKEY_USERS
* @var CurrentConfig HKEY_CURRENT_CONFIG
* @readonly
*/
e.registry.root = {
	CurrentUser : 'HKCU',
	LocalMachine : 'HKLM',
	ClassesRoot : 'HKCR',
	Users : 'HKEY_USERS',
	CurrentConfig : 'HKEY_CURRENT_CONFIG'
}

/**
* Registry Key type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.registry.type
* @enum {string}
* @path e.registry.type
* @var Binary binary value
* @var ExpandString expandable string (e.g., "%windir%\\calc.exe")
* @var MultiString Array of strings
* @var Number Number
* @var String String
* @readonly
*/
e.registry.type = {
	Binary : 'REG_BINARY',
	ExpandString : 'REG_EXPAND_SZ',
	MultiString : 'REG_MULTI_SZ',
	Number : 'REG_DWORD',
	String : 'REG_SZ'
}

/**
 * Tooltip collection
 * @class tooltip
 * @path e.tooltip
 * @readonly
 */
e.tooltip = {};

/**
* Tooltip animation
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.animation
* @enum {string}
* @path e.tooltip.animation
* @var fade fade effect
* @var fall fall effect
* @var grow grow effect
* @var slide slide effect
* @var swing swing effect
* @readonly
*/
e.tooltip.animation = {
	fade: 'fade',
	fall: 'fall',
	grow: 'grow',
	slide: 'slide',
	swing: 'swing'
};

/**
* Tooltip library
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.library
* @enum {string}
* @path e.tooltip.library
* @var opentip Opentip library (see [[http://www.opentip.org]])
* @var tooltipster Tooltipster library (default value)  (see [[http://iamceege.github.io/tooltipster/]])
* @readonly
*/
e.tooltip.library = {
	opentip: 'opentip', 
	tooltipster: 'tooltipster'
};

/**
* Tooltip display side
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.side
* @enum {string}
* @path e.tooltip.side
* @var bottom bottom side
* @var left left side
* @var right right side
* @var top top side
* @readonly
*/
e.tooltip.side = {
	bottom: 'bottom', 
	left: 'left',
	right: 'right', 
	top: 'top'
};

/**
* Tooltip theme
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.theme
* @enum {string}
* @path e.tooltip.theme
* @var grey Grey theme
* @var light Light theme
* @var shadow Shadow theme
* @var white White theme
* @readonly
*/
e.tooltip.theme = {
	grey: '',
	light: 'tooltipster-light',
	shadow: 'tooltipster-shadow',
	white: 'tooltipster-noir'
};

/**
* Tooltip trigger
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.trigger
* @enum {string}
* @path e.tooltip.trigger
* @var click click trigger
* @var clickAndKeep click trigger (and tooltip is not closed when clicking outside the tooltip)
* @var custom custom trigger
* @var hover hover trigger
* @readonly
*/
e.tooltip.trigger = {
	click: 'click',
	clickAndKeep: 'clickAndKeep',
	custom: 'custom',
	hover: 'hover',
	none: ''
};

/**
* Tooltip animation update
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration tooltip.updateAnimation
* @enum {string}
* @path e.tooltip.updateAnimation
* @var fade fading animation
* @var none no animation
* @var rotate rotation animation
* @var scale scaling animation
* @readonly
*/
e.tooltip.updateAnimation = {
	fade: 'fade',
	none: '',
	rotate: 'rotate',
	scale: 'scale'
};


/**
* Trace collection
* @class trace
* @path e.trace
* @ignore
* @readonly
*/
e.trace = {};

/**
* Trace type
* @enumeration e.trace.type
* @enum {string}
* @path e.trace.type
* @ignore
* @var Discovery Discovery trace file
* @var Log Standarad trace file
* @var Record Recording trace file
* @readonly
* @advanced
*/
e.trace.type = {
	Discovery : 'discovery',
	Log : 'log',
	Record : 'record'
}

/**
* Trace level
* @enumeration e.trace.level
* @enum {number}
* @path e.trace.level
* @var Info Info level
* @var Warning Warning level
* @var Error Error level
* @var None No trace level
* @readonly
*/
e.trace.level = {
	Info : 0,
	Warning : 1,
	Error : 2,
	None : 3
}

/**
* Scenario collection
* @class scenario
* @path e.scenario
* @readonly
*/
e.scenario = {}

/**
* Scenario mode
* @description
* __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  ...
  sc.setMode(e.scenario.mode.clearIfRunning);
  // *** Add steps ***
  sc.step(...);
  ...
}});
</code>
* @enumeration e.scenario.mode
* @enum {number}
* @path e.messbox.type
* @var noControl no control on scenario launch
* @var noStartIfRunning scenario is not launched if an instance with same name is running
* @var clearIfRunning if an instance with same name is running, it is cleared before the scenario is launched 
* @var clearAll all scenarios are cleared before scenario is launched
* @readonly
*/
e.scenario.mode = {
	noControl : 0,
	noStartIfRunning : 1,
	clearIfRunning : 2,
	clearAll : 3
}

/**
* Script languages
* @description
* __Ex.:__
<code javascript>
// execute VBScript in a web page
var code = 'Call MyVBFunction(Var1, Var2)';
res = ctx.actionApp(desc, 'execScript', 'EXECSCRIPT', code, e.scriptLanguage.VBScript);
</code>
* @enumeration e.scriptLanguage
* @enum {string}
* @path e.scriptLanguage
* @var JavaScript JavaScript language
* @var VBScript VBScript language
* @readonly
*/
e.scriptLanguage = {
	JavaScript : 'JavaScript',
	VBScript : 'VBScript'
}

///**
//* Shell special folders
//* @class shell
//* @path e.shell
//* @readonly
//*/
e.shell = {}

/**
* Windows system environment types : System, User, ...
* @description
* __Ex.:__
<code javascript>// Get Desktop path
str = ctx.wscript.shell.getEnvVariable(e.shell.envVariable.Desktop, e.shell.envType.User);
</code>
* @enumeration e.shell.envType
* @enum {string}
* @path e.shell.envType
* @readonly
* @var System   System
* @var User     User
* @var Process  Process
*/
e.shell.envType = {
  System :   'SYSTEM',
  User : 'USER',
  Process : 'PROCESS'
}

/**
* Windows System variables
* @description
<code javascript>// Get temporary directory
str = ctx.wscript.shell.getEnvVariable(e.shell.envVariable.PathTemp, e.shell.envType.User);
</code>
* @enumeration e.shell.envVariable
* @enum {string}
* @path e.shell.envVariable
* @readonly
* @var NbProcessors Number of processors, \\
* ex.: NbProcessors= 8
* @var ProcessorArchitecture Processor architecture, \\
* ex. : ProcessorArchitecture= AMD64
* @var ProcessorId Processor Id,  \\
* ex. : ProcessorId= Intel64 Family 6 Model 42 Stepping 7, GenuineIntel
* @var ProcessorLevel Processor level,  \\
* ex. : ProcessorLevel= 6
* @var ProcessorRevision Processor revision, \\
* ex. : ProcessorRevision= 2a07
* @var OS OS family , \\
* ex. : OS= Windows_NT
* @var CommandPrompt Command prompt, \\
* ex. : CommandPrompt= %SystemRoot%\system32\cmd.exe
* @var HomeDrive Home drive, \\
* ex. : HomeDrive = c:
* @var PathHome Path home, \\
* ex. : PathHome= \Users\<login>
* @var Path Path, \\
* ex. : Path= %SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;...
* @var PathExtensions Path extensions, \\
* ex. : PathExtensions= .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC
* @var Prompt
* @var SystemDrive System drive, \\
* ex. : SystemDrive = c:
* @var SystemRoot system main directory, \\
* ex. : SystemRoot= C:\Windows
* @var Windir Windows main directory, \\
* ex. : Windir= %SystemRoot%
* @var PathTemp Default temporary path, \\ ex. : [System] PathTemp= %SystemRoot%\TEMP \\ ex. : [User] PathTemp= C:\Users\cpuget\AppData\Local\Temp
* @var PathTmp Default temporary path, \\ ex. : PathTemp= %SystemRoot%\TEMP
*/
e.shell.envVariable = {
  NbProcessors : 'NUMBER_OF_PROCESSORS',
	ProcessorArchitecture : 'PROCESSOR_ARCHITECTURE',
	ProcessorId : 'PROCESSOR_IDENTIFIER',
	ProcessorLevel : 'PROCESSOR_LEVEL',
	ProcessorRevision : 'PROCESSOR_REVISION',
	OS : 'OS',
	CommandPrompt : 'COMSPEC',
	HomeDrive : 'HOMEDRIVE',
	PathHome : 'HOMEPATH',
	Path : 'PATH',
	PathExtensions : 'PATHEXT',
	Prompt : 'PROMPT',
	SystemDrive : 'SYSTEMDRIVE',
	SystemRoot : 'SYSTEMROOT',
	Windir : 'WINDIR',
	PathTemp : 'TEMP',
	PathTmp : 'TMP'
}

/**
* Windows special folder list : '%MyDocuments%', '%Desktop%', ...
* @description
* see http://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx for more details
* 
* __Ex.:__
<code javascript>str = ctx.wscript.shell.getSpecialFolders(e.shell.specialFolder.Programs);</code>
* @enumeration e.shell.specialFolder
* @enum {string}
* @path e.shell.specialFolder
* @readonly
* @var AllUsersDesktop		All Users Desktop
* @var AllUsersStartMenu All Users Start Menu
* @var AllUsersPrograms  All Users Programs
* @var AllUsersStartup   All Users Startup
* @var Desktop           Desktop
* @var Favorites         Favorites
* @var Fonts             Fonts 
* @var MyDocuments       My Documents 
* @var NetHood           NetHood
* @var PrintHood         Print Hood 
* @var Programs          Programs 
* @var Recent            Recent 
* @var SendTo            SendTo 
* @var StartMenu         Start Menu 
* @var Startup           Startup 
* @var Templates         Templates 
 */
e.shell.specialFolder = {
  AllUsersDesktop :   'AllUsersDesktop',
  AllUsersStartMenu : 'AllUsersStartMenu',
  AllUsersPrograms :  'AllUsersPrograms',
  AllUsersStartup :   'AllUsersStartup',
  Desktop :           'Desktop',
  Favorites :         'Favorites',
  Fonts :             'Fonts',
  MyDocuments :       'MyDocuments',
  NetHood :           'NetHood',
  PrintHood :         'PrintHood',
  Programs :          'Programs',
  Recent :            'Recent',
  SendTo :            'SendTo',
  StartMenu :         'StartMenu',
  Startup :           'Startup',
  Templates :         'Templates'
}


///**
//* systray collection
//* @class systray
//* @path e.systray
//* @readonly
//*/
e.systray = {}

/**
* Type used to display a systray 'ballon' tooltip
* @description
* __Ex.:__
<code javascript>
// show a balloon toolip during 10 s to mention it's ready
systray.showBalloon('Contextor: demo', 'Ready for testing', e.systray.iconType.Warning, 10000);
</code>
* @enumeration e.systray.iconType
* @enum {string}
* @path e.systray.iconType
* @var Info    Information
* @var Warning Warning
* @var Error   Error
* @readonly
*/
e.systray.iconType = {
	Info : 'NIIF_INFO', 
	Warning : 'NIIF_WARNING', 
	Error : 'NIIF_ERROR'
}

/**
* Target frame : name of the frame in which to display the resource
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.navigate('http://www....', e.targetFrame.Blank);
</code>
* @enumeration e.targetFrame
* @enum {string}
* @path e.targetFrame
* @var Blank Load the link into a new unnamed window.
* @var Parent Load the link into the immediate parent of the document the link is in.
* @var Self Load the link into the same window the link was clicked in.
* @var Top Load the link into the full body of the current window.
* @readonly
*/
e.targetFrame = {
	Blank : '_blank',
	Parent : '_parent',
	Self : '_self',
	Top : '_top'
}

/**
* Browser bar style
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.setVisible(e.windowBarType.AddressBar, true);	
</code>
* @enumeration e.windowBarType
* @enum {string}
* @path e.windowBarType
* @var AddressBar Address bar
* @var Browser Full browser
* @var MenuBar Menu bar
* @var StatusBar Status bar
* @var ToolBar Tool bar 
* @readonly
*/
e.windowBarType = {
	AddressBar : 'ADRESSBAR',
	Browser : 'BROWSER',
	MenuBar : 'MENUBAR',
	StatusBar : 'STATUSBAR',
	ToolBar: 'TOOLBAR'
}
/**
* Window style
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.setWindowStyle(true, e.windowStyle.MaximizeBox);	
</code>
* @enumeration e.windowStyle
* @enum {string}
* @path e.windowStyle
* @var MinimizeBox Maximize box style
* @var MinimizeBox Minimize box style
* @var SystemMenu System menu style
* @var ToolWindow Tool window style
* @readonly
*/
e.windowStyle = {
	MaximizeBox : 'WS_MAXIMIZEBOX',
	MinimizeBox : 'WS_MINIMIZEBOX',
	SystemMenu : 'WS_SYSMENU',
	ToolWindow : 'WS_EX_TOOLWINDOW'
}

