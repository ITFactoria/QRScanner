import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.activatedRoute.snapshot.paramMap.get('geo');
    geo = geo.substr(4);
    geo = geo.split(',');
    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);
    console.log("map page");
    console.log(this.latitud, this.longitud);

  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit")
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRmYWN0b3JpYSIsImEiOiJjazlhYmNiOWswM29zM2ZwbmFmZzhwMWJ6In0._txl8IqGzAgUPLPsFQV59g';
    /*var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
     
    });
    console.log("ngAfterViewInitAfter");*/
  

    var map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });


    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', () => {

      map.resize();

      var marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.longitud, this.latitud])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }

}
