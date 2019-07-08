$(document).ready(function(){
    $(this).scrollTop(0);
});
let searchParams = new URLSearchParams(window.location.search)
searchParams.has('attraction') // true
let param = searchParams.get('attraction')
console.log(param);

(function() {
    $.getJSON( "assets/data/atraksi.json", function( data ) {
        $.each(data.clusters, function(key1, cluster){
            var c = cluster.cluster_name;
            var c_path = cluster.cluster_path;
            $.each(cluster.attractions, function(key2, attraction){
                var desc_id = attraction.description_id;
                var desc_en = attraction.description_en;
                var coordinates = attraction.coordinates;
                var attraction_path = attraction.attraction_path;
                
                if(param === attraction_path) {
                    $("#attraction_name").text(attraction.attraction_name);
                    $("#cluster_name").text(c);
                    $("#desc_id").text(desc_id);
                    $("#desc_en").text(desc_en);
                    $.each(attraction.images, function(key3, image){
                        $("#img-slider").append(`
                            <img src="assets/images/attraction/${c_path}/${attraction_path}/${image.src}" class="mx-1" alt="">
                        `);
                    });
                    L.marker([coordinates[0], coordinates[1]], {title:attraction_path}).addTo(mymap).
                    bindPopup("<b>"+attraction.attraction_name+"</b>").openPopup();
                }
            })
        })
    });
})();

var mymap = L.map('map').setView([-8.261383, 115.391466], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3VyeWF3aWd1bmFhIiwiYSI6ImNqbTh0YnkxMDBzeTQza2tkenAwaWszOGEifQ.cY1nx875Kw12YxqT7nCpyw'
}).addTo(mymap);