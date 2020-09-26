import 'whatwg-fetch'


let stations = {

	getData: async function (URL,map) {
        
//        var labelBaseOptions = {
//			iconUrl: 'images/station_marker.svg',
//			shadowUrl: null,
//			iconSize: new L.Point(21, 35),
//			iconAnchor: new L.Point(10, 34),
//			labelAnchor: new L.Point(25, 2),
//			wrapperAnchor: new L.Point(10, 35),
//			popupAnchor:  [-0, -35]
//		};
//
//		var labelRight = L.Icon.extend({
//			options: labelBaseOptions
//		});
        
        
//        var EEAIcon = L.icon({
//    iconUrl: 'http://127.0.0.1:8080/src/images/eea_marker.png',
//    shadowUrl: null,
//
//    iconSize:     [21, 21], 
//    iconAnchor:   [10, 34],
//    labelAnchor: [25, 2],
//    wrapperAnchor:[10, 35],
//    popupAnchor:  [0, -35] 
//});
//        
//        
        
        
        
        
        
        
        
        
        
        
		function checkStatus(response) {
			if (response.status >= 200 && response.status < 300) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}
        
		return fetch(URL)
			.then(checkStatus)
			.then((response) => response.json())
			.then((json) => {
            console.log(json);
            
            var EUStationsLayer = new L.LayerGroup();
            EUStationsLayer.addTo(map);
            
           var stations = L.geoJSON(json,{
                      pointToLayer: function (feature, latlng) { 
                          
                          
                          
                          
                       return L.circleMarker(latlng, {
                        radius:4,
                        fillColor: '#0000FF',
                        stroke:false,
                        fillOpacity: 0.7
                       })
                          
//                       return  L.marker(
//						latlng,
//						{
//							icon:EEAIcon
//						})
                          
                          
                          
                          
                          
                          
                      },
                      onEachFeature: function (feature, layer) {
                        
                        var popupContent = "<h1>Official EU Station</h1><p><b>City</b> : "+feature.properties.Name+"</p><p><b>Area Classification</b> : "+feature.properties.AreaClassification+"</p><p><b>Station Classification ID</b> : "+feature.properties.StationClassification+"</p>";
                        layer.bindPopup(popupContent,{closeButton:true, maxWidth: "auto"});
                      }});
            
            
                 EUStationsLayer.addLayer(stations);

            
            
        })
			.catch(function(error) {
				console.log('request failed', error)
			})  
		}
	}

export default stations
