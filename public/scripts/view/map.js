var map;
var codefellows = {lat: 47.618248, lng: -122.351871};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * codefellows.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#A874D4';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.marginTop = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to add toilet';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'white';
  controlText.style.fontFamily = 'Delius Unicase', 'cursive';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Add Toilet';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Codefellows.
  controlUI.addEventListener('click', function() {
    $('.mainContent').hide();
    $('.aboutUsAll').hide();
    $('.toilet-form').fadeIn();
  });

}

//initializing google map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: codefellows,
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  var marker = new google.maps.Marker({
          position: codefellows,
          map: map,
        });

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  console.log('done');
}
