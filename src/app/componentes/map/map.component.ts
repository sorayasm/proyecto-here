import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private platform: any;

  @ViewChild('map')
  public mapElement: ElementRef;

  public constructor() {
    console.log("Holi2")
    this.platform = new H.service.Platform({
        'app_id': 'vvZ3bT5wEdEGwTxWyyVA',
        'app_code': 'DrBz6nmjEAehxuHf3j9p6Q'
    });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    console.log("Holi")
    const defaultLayers = this.platform.createDefaultLayers();
    // tslint:disable-next-line:no-var-keyword
    const map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
            zoom: 10,
            center: { lat: 37.7397, lng: -121.4252 }
        }
    );
  }


}
