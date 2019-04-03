
/** Description */
ApplicationScenario.step({ stApplicationScenarioSTART: function(ev, sc, st) {
	var data = sc.data;
	ApplicationScenario.start();
	
	ApplicationScenario.pApplicationScenario.btStart.events.COMMAND.on(function(ev){
		data.id = ApplicationScenario.pApplicationScenario.edEdit.get();
		sc.endStep();
	});
	return;
}});



/** Description */
SampleCRM.step({ stSampleCRMSTART: function(ev, sc, st) {
	var data = sc.data;
	SampleCRM.start();
	SampleCRM.pSampleCRM.wait(function(ev1) {
		sc.endStep();
	});
	return;
}});


/** Description */
SampleCRM.step({ stSampleCRMSetData: function(ev, sc, st) {
	var data = sc.data;
	SampleCRM.pSampleCRM.edContractId.set(data.id);
	SampleCRM.pSampleCRM.btSearch.click();
	sc.endStep();
	return;
}});


/** Description */
SampleCRM.step({ stSampleCRMGetData: function(ev, sc, st) {
	var data = sc.data;
	data.id = SampleCRM.pSampleCRM.edContractId.get();
	data.name = SampleCRM.pSampleCRM.edName.get();
	data.firstname = SampleCRM.pSampleCRM.edFirstname.get();
	sc.endStep();
	return;
}});


/** Description */
Eligibility.step({ stEligibilitySTART: function(ev, sc, st) {
	var data = sc.data;
	Eligibility.start();
	Eligibility.pEligibility.wait(function(ev1){
		sc.endStep();
	});	
	return;
}});


/** Description */
Eligibility.step({ stEligibilitySetData: function(ev, sc, st) {
	var data = sc.data;
	Eligibility.pEligibility.oContractId.set(data.id);
	Eligibility.pEligibility.oName.set(data.name);
	Eligibility.pEligibility.oFirstname.set(data.firstname);
	Eligibility.pEligibility.btSearch.click();
	sc.endStep();
	return;
}});


/** Description */
Eligibility.step({ stEligibilityGetData: function(ev, sc, st) {
	var data = sc.data;
	data.SerialNumber = Eligibility.pEligibility.oSerialNumber.get();
	data.EquipmentType = Eligibility.pEligibility.oEquipmentType.get();
	data.OfferType = Eligibility.pEligibility.oOfferType.get();
	sc.endStep();
	return;
}});


/** Description */
ApplicationScenario.step({ stAppScenarioRecoverData: function(ev, sc, st) {
	var data = sc.data;
	ApplicationScenario.pApplicationScenario.btPopup1.click();
	ApplicationScenario.pPopup1.events.LOAD.once(function(ev1){
		ApplicationScenario.pPopup1.edEdit.set(data.id+' '+data.name+' '+data.firstname+' '+data.SerialNumber+' '+data.EquipmentType+' '+data.OfferType);
		sc.endStep();
	});
}});


/** Description */
ApplicationScenario.step({ stEditHandler: function(ev, sc, st) {
	var data = sc.data;
	ApplicationScenario.pApplicationScenario.edEdit.events.COMMAND.on(function(ev1){
		var obj = ApplicationScenario.pApplicationScenario.edEdit.get();
		ctx.log(obj);
		if (obj == 'close') {
			Eligibility.close();
			SampleCRM.close();
			ApplicationScenario.close();
			sc.endScenario();	
			
		}
	});
	
	//sc.endStep();
	return;
}});



/** Description */
ApplicationScenario.scenario({ scScenario: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ApplicationScenario.steps.stApplicationScenarioSTART);
	sc.step(SampleCRM.steps.stSampleCRMSTART);
	sc.step(SampleCRM.steps.stSampleCRMSetData);
	sc.step(SampleCRM.steps.stSampleCRMGetData);
	sc.step(Eligibility.steps.stEligibilitySTART);
	sc.step(Eligibility.steps.stEligibilitySetData);
	sc.step(Eligibility.steps.stEligibilityGetData);
	sc.step(ApplicationScenario.steps.stAppScenarioRecoverData);
	sc.step(ApplicationScenario.steps.stEditHandler);
}});
