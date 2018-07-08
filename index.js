function loadingScreen(){
	return `<li><i class="fa-li fa fa-spinner fa-pulse"></i></li>`;
}

//Quote Generator & Hiding other functions.
$(document).ready(function(){
  var urlNumber = (Math.floor((Math.random()*10)+1));
  var url = 'https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=' + urlNumber;
  $.getJSON( url, function(quotes) {
    listofQuotes = quotes;
    post = listofQuotes.shift()   
    var listOfQuotes = [];
    //$('#quoteGenerator, #row, #footer, #title, #header').hide();
    $('#row, fighterTable').hide();
    $('#quoteGenerator').html(post.title + post.content);
    //$('#quoteGenerator').hide();
    //$('#findMeButton').click(function(){
      //$('#quoteGenerator, #header, #bigPicture, #footer').fadeIn(2000);
    //});
    $('#pac-input').click(function(){
      $('#row').fadeIn(2000);
    })
  });
});

var map;
var infowindow;
var pyrmont;

//Small Project:  Select example Judo only Gym. . .
/*
$("input[name='choice']").click(function(){
    let martialArtsMapValue = $("input[name='choice']").val();}
*/
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.246074, lng: -118.537021},
          zoom: 13,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });




	      var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, 0)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
          $('#sideBarTest').empty();
          playEverything();
        });

/*PLACE SEARCHES */
		function playEverything(){
		infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
        	location: map.center,
	 		    radius: 8047,
        	type: ['gym'],
	  		  name: ['martialarts'],
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      var image = {
	      url: 'http://icons.iconarchive.com/icons/google/noto-emoji-activities/512/52746-boxing-glove-icon.png',
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(50, 50)
	    };

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        let stars = '';
        let primaryRating = '';
  
        if (place.rating === 5){
          stars = (
          `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          `);
          primaryRating = '5'; 
        }
        else if (place.rating >= 3 && place.rating < 4){
          stars = (
          `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          `);
           primaryRating = '3';
        }
        else if (place.rating >= 2 && place.rating < 3){
          stars = (
          `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          `);
          primaryRating = '2';
        }
        else if (place.rating > 0 && place.rating < 2){
          stars = (
          `<span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          `);
          primaryRating = '1';
        }
        else if (place.rating >= 4.0 && place.rating < 5.0){
          stars = (
          `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          `);
          primaryRating = '4';
        }
        else if(place.rating === undefined){
          primaryRating = 'No Rating';

        }

        $('#sideBarTest').append(place.name + "<br />"  + primaryRating + ' ' + stars + "<hr>");
        var marker = new google.maps.Marker({
    		  map: map,
    		  position: place.geometry.location,
    		  icon: image,
    		  title: name,
            });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

/*Getting Place Details*/
		var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });


            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
}
}


// WIKIPEDIA
$(document).ready(function(){
  $("input[name='choice']").click(function(){
    $('#result').html("");
    var searchURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+$( this ).val()+"&callback=?";
    $.getJSON(searchURL ,function(data) {
      var pages = data.query.pages;
      Object.keys(pages).forEach(function(key) {
        var page = pages[key];
        var url = 'https://en.wikipedia.org/?curid=' + page.pageid;
        /*var imgurl = '<img class="wikiImage" src=' + page.thumbnail.source + '>';*/
        $('#result').append('<a class="wikiImage" href="' + url + '" > \
          <h4 >' + page.title + '</h4> \
          </a>'
        );
        $('#result').append(page.extract);
      })
    });
    })
  $('#result').fadeIn(2000);
});


//Implement recent UFC events http://ufc-data-api.ufc.com/api/v1/us/events
// (featured_image) (arena) (event_date)

//UFC
$(document).ready(function(){
  //$("input[name='choice']").click(function(){
    $("#findMeButton").click(function(){
      let selectedWeight = $('#centerIt').find(":selected").val();
      let sexSelector = $('#sexSelectorButton').find(":selected").val();
      $('#fighters').html("");

      var searchURL = "https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/fighters";
      $.getJSON(searchURL ,function(data) {
        let total_fighters = 0;
        let notMatchedFighters = 0;
        for (i=0; i<data.length; i++){
          let currentWeightClass = data[i].weight_class;
          let womenWeightClass = "Women_" + selectedWeight;
          if (((currentWeightClass) === selectedWeight) && (data[i].fighter_status === "Active") && (sexSelector === "Male")){
              total_fighters++;
              var imgurl = '<img class="wikiImage" src=' + data[i].profile_image + '>';
              $('#fighters').append(
                ' ' + imgurl + ' ' +data[i].weight_class + ' ' + data[i].first_name + ' ' + data[i].last_name +'</td> <td>' 
                 +  data[i].wins +  ':' + data[i].losses + ':' + data[i].draws + '');
        
              $('#fighters').hide();
          }

          else if(((womenWeightClass) === currentWeightClass) && (data[i].fighter_status === "Active") && (sexSelector === "Female")){
              total_fighters++;
              var imgurl = '<img class="wikiImage" src=' + data[i].profile_image + '>';
              $('#fighters').append(
                '<div id="fighterAppends">' + imgurl + ' ' +data[i].weight_class + ' ' + data[i].first_name + ' ' + data[i].last_name +'</td> <td>' 
                 +  data[i].wins +  ':' + data[i].losses + ':' + data[i].draws + '</div>');
   
              $('#fighters').hide();
          }

          else{
            notMatchedFighters++;
            if(notMatchedFighters === 0){ 
              $('#fighters').append('No Fighters in this Weight Division');
              console.log(notMatchedFighters)
            }
          }

        }
      $('#fighters').fadeIn(1000);
      $('#fighterTable').fadeIn(1000);

      });
    })
});


//Homepage
$("#defaultOpen").click();
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = $(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = $(".tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

}
