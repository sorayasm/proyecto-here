import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    public platform: any;
    public map: any;
    private ui: any;
    private search: any;

    @ViewChild('map')
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    public constructor() {  }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            'app_id': this.appId,
            'app_code': this.appCode
        });
    }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: this.lat, lng: this.lng }
            }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers, 'es-ES');
    }

    public places(query: string) {
        this.map.removeObjects(this.map.getObjects());
        this.search.request({ 'q': query, 'at': this.lat + ',' + this.lng }, {}, data => {
            for (let i = 0; i < data.results.items.length; i++) {
                this.dropMarker({ 'lat': data.results.items[i].position[0], 'lng': data.results.items[i].position[1] }, data.results.items[i]);
            }
        }, error => {
            console.error(error);
    });

    private dropMarker(coordinates: any, data: any) {
        const marker = new H.map.Marker(coordinates);
        marker.setData('<p>' + data.title + '<br>' + data.vicinity + '</p>');
        marker.addEventListener('tap', event => {
            const bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                content: event.target.getData()
            });
            this.ui.addBubble(bubble);
        }, false);
        this.map.addObject(marker);
    }
}

/*
// funcion para la localizacion HTML5
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Estas aquí.');
        infoWindow.open(map);
        map.setCenter(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}

// funcion para la localizacion del usuario
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: La geolocalización falló.' :
        'Error: Tu navegador no soporta la geolocalización.');
    infoWindow.open(map);
} */

