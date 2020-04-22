import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl : any;

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
    console.log("map");
    console.log(this.latitud, this.longitud);

  }
  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRmYWN0b3JpYSIsImEiOiJjazlhYmNiOWswM29zM2ZwbmFmZzhwMWJ6In0._txl8IqGzAgUPLPsFQV59g';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}
