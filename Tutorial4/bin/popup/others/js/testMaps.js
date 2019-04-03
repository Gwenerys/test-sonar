
$(function() {
    // uncomment one line below to test page in standalone mode, inside I.E.
    //initMaps() // Google Maps popup
    //initStreetView() // Google StreetView popup
});

function initMaps() {
	var obj = {
	    maps: {
			zoom: 14,
			address: "5 rue guy moquet 91400 Orsay",
			satellite: false,
			//legend: true
		},
	    autoClose: 30000
 	};
	initialize(obj);
}

function initStreetView() {
	var obj = {
	    maps: {
			streetview: true,
			zoom: 1,
			address: "5 rue guy moquet 91400 Orsay",
			width: 500,
			height: 350
			//satellite: false,
			//legend: true
		},
	    autoClose: 30000
 	};
	initialize(obj);
}
