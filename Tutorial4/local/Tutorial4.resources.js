// Contextor Studio
// Auto-generated declaration file : do not modify !



var Eligibility = ctx.addApplication('Eligibility', {"nature":"WEB3","path":"file://D:\\Profiles\\gbriere\\Desktop\\RPA\\Contextor\\3.2.6\\Samples\\applications\\web\\eligibility\\eligibility.htm"});

Eligibility.pEligibility = Eligibility.addPage('pEligibility', {"comment":"Eligibility","path":"file://D:\\Profiles\\gbriere\\Desktop\\RPA\\Contextor\\3.2.6\\Samples\\applications\\web\\eligibility\\eligibility.htm"});
Eligibility.pEligibility.oContractId = Eligibility.pEligibility.addItem('oContractId');
Eligibility.pEligibility.oName = Eligibility.pEligibility.addItem('oName');
Eligibility.pEligibility.oFirstname = Eligibility.pEligibility.addItem('oFirstname');
Eligibility.pEligibility.oSerialNumber = Eligibility.pEligibility.addItem('oSerialNumber');
Eligibility.pEligibility.oEquipmentType = Eligibility.pEligibility.addItem('oEquipmentType');
Eligibility.pEligibility.oOfferType = Eligibility.pEligibility.addItem('oOfferType');
Eligibility.pEligibility.btSearch = Eligibility.pEligibility.addItem('btSearch');


var ApplicationScenario = ctx.addApplication('ApplicationScenario', {"nature":"WIN","path":"d:\\Profiles\\gbriere\\Desktop\\RPA\\Contextor\\3.2.6\\Samples\\applications\\win\\SampleScenario.exe"});

ApplicationScenario.pApplicationScenario = ApplicationScenario.addPage('pApplicationScenario', {"comment":"#32770 - Application Scenario - MFC"});
ApplicationScenario.pApplicationScenario.edEdit = ApplicationScenario.pApplicationScenario.addItem('edEdit', {"trackEvents":{"COMMAND":true},"type":"Txt"});
ApplicationScenario.pApplicationScenario.btStart = ApplicationScenario.pApplicationScenario.addItem('btStart', {"trackEvents":{"COMMAND":true},"type":"Btn"});
ApplicationScenario.pApplicationScenario.btPopup1 = ApplicationScenario.pApplicationScenario.addItem('btPopup1', {"type":"Btn"});
ApplicationScenario.pApplicationScenario.btPopup2 = ApplicationScenario.pApplicationScenario.addItem('btPopup2', {"type":"Btn"});

ApplicationScenario.pPopup1 = ApplicationScenario.addPage('pPopup1', {"comment":"#32770 - Popup 1"});
ApplicationScenario.pPopup1.edEdit = ApplicationScenario.pPopup1.addItem('edEdit', {"type":"Txt"});
ApplicationScenario.pPopup1.btClose = ApplicationScenario.pPopup1.addItem('btClose', {"type":"Btn"});

ApplicationScenario.pPopup2 = ApplicationScenario.addPage('pPopup2', {"comment":"#32770 - Popup 2"});
ApplicationScenario.pPopup2.edEdit = ApplicationScenario.pPopup2.addItem('edEdit', {"type":"Txt"});
ApplicationScenario.pPopup2.btClose = ApplicationScenario.pPopup2.addItem('btClose', {"type":"Btn"});


var SampleCRM = ctx.addApplication('SampleCRM', {"nature":"WIN","path":"d:\\Profiles\\gbriere\\Desktop\\RPA\\Contextor\\3.2.6\\Samples\\applications\\win\\SampleCRM.exe"});

SampleCRM.pSampleCRM = SampleCRM.addPage('pSampleCRM', {"comment":"#32770 - Sample CRM"});
SampleCRM.pSampleCRM.edContractId = SampleCRM.pSampleCRM.addItem('edContractId', {"type":"Txt"});
SampleCRM.pSampleCRM.btSearch = SampleCRM.pSampleCRM.addItem('btSearch', {"type":"Btn"});
SampleCRM.pSampleCRM.edName = SampleCRM.pSampleCRM.addItem('edName', {"type":"Txt"});
SampleCRM.pSampleCRM.edFirstname = SampleCRM.pSampleCRM.addItem('edFirstname', {"type":"Txt"});
SampleCRM.pSampleCRM.edSerialNumber = SampleCRM.pSampleCRM.addItem('edSerialNumber', {"type":"Txt"});
SampleCRM.pSampleCRM.edEquipmentType = SampleCRM.pSampleCRM.addItem('edEquipmentType', {"type":"Txt"});
SampleCRM.pSampleCRM.edOfferType = SampleCRM.pSampleCRM.addItem('edOfferType', {"type":"Txt"});
