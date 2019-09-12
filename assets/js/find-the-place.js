$(document).ready(function(){
    $(this).scrollTop(0);
});

(function() {
    $.getJSON( "assets/data/place.json", function( data ) {
        $.each(data.places, function(key1, place){
            var path = place.place_path;
            var coordinates = place.coordinates;
            $("#card-deck").append(`
                <div class="card border-0 m-0 shadow-sm">
                    <img class="card-img-top" src="assets/images/places/${path}/${place.images[0]}" alt="Card image cap" height="210px" style="object-fit: cover">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold text-gold">${place.place_name}</h5>
                        <div class="d-flex">
                            <button id="${path}" class="btn btn-info btn-sm border flex-fill mr-1" style="border-radius: 20px;">
                            <span class="mdi mdi-map-marker"></span> Lihat di peta
                            </button>
                            <a href="places/${path}.html" class="btn btn-outline-secondary btn-sm border flex-fill ml-1" style="border-radius: 20px;">
                                Detail
                            </a>
                        </div>
                    </div>
                </div>
            `);

            var markers = [];
            function clickZoom(e) {
                mymap.setView(e.target.getLatLng(),15);
            }
            
            var marker = L.marker([coordinates[0], coordinates[1]], {title:path}).addTo(mymap).
            bindPopup("<img src=assets/images/places/"+path+"/"+place.images[0]+"><b>"+place.place_name+"</b>").on('click', clickZoom);
            markers.push(marker);

            function markerFunction(id){
                for (var i in markers){
                    var markerID = markers[i].options.title;
                    var position = markers[i].getLatLng();
                    if (markerID == id){
                        mymap.setView(position, 15);
                        markers[i].openPopup();
                    };
                }
            }

            $(".btn-info").click(function(){
                markerFunction($(this)[0].id);
            });
        })
    });
})();

var mymap = L.map('map').setView([-8.261383, 115.391466], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3VyeWF3aWd1bmFhIiwiYSI6ImNqbTh0YnkxMDBzeTQza2tkenAwaWszOGEifQ.cY1nx875Kw12YxqT7nCpyw'
}).addTo(mymap);


