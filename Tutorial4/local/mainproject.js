///** Description */
//GLOBAL.events.START.on(function(ev) {
//	var data = {};
//	systray.addMenu('', 'evScenario', 'Sample Scenario', '$image$');
//	//systray.addMenu('', 'evAppliScenario', 'Appli Scenario', '$image$');
	
	
//	/**
//	 * Description
//	 */
////	systray.on('evAppliScenario', function(ev) {
////		ApplicationScenario.scenarios.scScenario.start();
////	});
	
	
//	//SampleCRM.addEvent({evCRMSearch:''});
		
//	Eligibility.addEvent({evEligibilitySearch:''});
		
//	//ApplicationScenario.addEvent({evCRMSearch:''});
//	ApplicationScenario.addEvent({evResultEligibility:''});
//	/**
//	 * Description
//	 */
//	systray.on('evScenario', function(ev) {
		
//		ApplicationScenario.start();
		
//		ApplicationScenario.pApplicationScenario.btStart.events.COMMAND.on(function(ev){
//			var data = {};
//			data.id = ApplicationScenario.pApplicationScenario.edEdit.get();
//			ApplicationScenario.notify(SampleCRM.events.evCRMSearch, data);
//			ApplicationScenario.notify(Eligibility.events.evEligibilitySearch, data);
//		});
		
//	});
	
//	SampleCRM.addOn({evCRMSearch:function(ev) {
//		var data = ev.data;
//		// get input data
//		var id = data.id;
//		SampleCRM.start();
//		SampleCRM.pSampleCRM.wait(function(ev1) {
//			SampleCRM.pSampleCRM.edContractId.set(id);
//			SampleCRM.pSampleCRM.btSearch.click();
//			data.id = SampleCRM.pSampleCRM.edContractId.get();
//			data.name = SampleCRM.pSampleCRM.edName.get();
//			data.firstname = SampleCRM.pSampleCRM.edFirstname.get();
			
//			ev.reply(data);
//			//SampleCRM.notify(ApplicationScenario.events.evResultCRM, data);
//		});
//	}});

//	ApplicationScenario.addOn({evCRMSearch:function(ev){
//		var data = ev.data;
//		ApplicationScenario.pApplicationScenario.btPopup1.click();
//		ApplicationScenario.pPopup1.events.LOAD.once(function(ev1){
//			ApplicationScenario.pPopup1.edEdit.set(data.id + ' ' + data.name + ' ' + data.firstname);
//		});
//	}});
	
//	Eligibility.events.evEligibilitySearch.on(function(ev) {
//		var data = ev.data;
//		// get input data
//		var id = data.id;
//		Eligibility.start();
//		Eligibility.pEligibility.wait(function(ev1) {
//			Eligibility.pEligibility.oContractId.set(id);
//			Eligibility.pEligibility.btSearch.click();
//			data.serialNumber = Eligibility.pEligibility.oSerialNumber.get();
//			data.EquipmentType = Eligibility.pEligibility.oEquipmentType.get();
//			data.OfferType = Eligibility.pEligibility.oOfferType.get();
			
//			//ev.reply(data);
//			SampleCRM.notify(ApplicationScenario.events.evResultEligibility, data);
//		});
//	});

//	ApplicationScenario.events.evResultEligibility.on(function(ev){
//		var data = ev.data;
//		ApplicationScenario.pApplicationScenario.btPopup2.click();
//		ApplicationScenario.pPopup2.events.LOAD.once(function(ev1){
//			ApplicationScenario.pPopup2.edEdit.set(data.serialNumber + ' ' + data.EquipmentType + ' ' + data.OfferType);
//		});
//	});
//});


/** Description */
GLOBAL.events.START.on(function(ev) {
	var data = {};
	
	/**
	 * Description
	 */
	systray.addMenu('', 'evScenario', 'Scenario', 'image', function(ev) {
		var data = {};
		ApplicationScenario.scenarios.scScenario.start();
		
	});
	
});

