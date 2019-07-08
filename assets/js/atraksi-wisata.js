$(document).ready(function(){
    $(this).scrollTop(0);
});

(function() {
    $.getJSON( "assets/data/atraksi.json", function( data ) {
        $.each(data.clusters, function(key1, cluster){
            var c = cluster.cluster_path;
            $.each(cluster.attractions, function(key2, attraction){
                var desc = jQuery.trim(attraction.description_id).substring(0, 90).split(" ").slice(0, -1).join(" ") + "...";
                var img = attraction.images[0].src;
                var coordinates = attraction.coordinates;
                var attraction_path = attraction.attraction_path;

                $("#card-deck").append(`
                    <div class="card border-0 m-0 shadow-sm">
                        <img class="card-img-top" src="assets/images/attraction/${c}/${attraction.attraction_path}/${img}" alt="Card image cap" height="210px" style="object-fit: cover">
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold text-gold">${attraction.attraction_name}</h5>
                            <p class="card-text text-muted">${desc}</p>
                            <div class="d-flex">
                                <button id="${attraction.attraction_path}" class="btn btn-info btn-sm border flex-fill mr-1" style="border-radius: 20px;">
                                <span class="mdi mdi-map-marker"></span> Lihat di peta
                                </button>
                                <a href="atraksi-detail.html?attraction=${attraction_path}" class="btn btn-outline-secondary btn-sm border flex-fill ml-1" style="border-radius: 20px;">
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
                
                var marker = L.marker([coordinates[0], coordinates[1]], {title:attraction_path}).addTo(mymap).
                bindPopup("<img src=assets/images/attraction/"+c+"/"+attraction.attraction_path+"/"+img+"><b>"+attraction.attraction_name+"</b>").on('click', clickZoom);
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


