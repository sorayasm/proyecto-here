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
    public currentPosition: any;

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
        this.search = new H.places.Search(this.platform.getPlacesService());
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((showPosition) => {
              this.lat = showPosition.coords.latitude;
              this.lng = showPosition.coords.longitude;
              this.mapLocation();
            });
        } else {
        alert('La geolocalización no funciona en este navegador.');
        }
    }

    // tslint:disable-next-line:use-life-cycle-interface
    public mapLocation() {
       // tslint:disable-next-line:prefer-const
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 13,
                center: { lat: this.lat, lng: this.lng }
            }
        );
        // tslint:disable-next-line:prefer-const
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers, 'es-ES');
        this.addMarkers();
        this.map.addLayer(defaultLayers.venues);
    }

    public places(query: string) {
        this.map.removeObjects(this.map.getObjects());
        this.search.request({ 'q': query, 'at': this.lat + ',' + this.lng }, {}, data => {
            for (let i = 0; i < data.results.items.length; i++) {
                this.dropMarker({
                    'lat': data.results.items[i].position[0],
                    'lng': data.results.items[i].position[1] },
                    data.results.items[i]);
            }
        }, error => {
            console.error(error);
        });
    }

    private dropMarker(coordinates: any, data: any) {
        // tslint:disable-next-line:prefer-const
        let marker = new H.map.Marker(coordinates);
        marker.setData(`<p class='marker'>` + data.title + `<br>` + data.vicinity + `<br> Centro de Acopio` + `</p>`);
        marker.addEventListener('tap', event => {
        // tslint:disable-next-line:prefer-const
            let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                content: event.target.getData()
            });
            this.ui.addBubble(bubble);
        }, false);
        this.map.addObject(marker);
    }

    private addMarkers() {
    const marker1 = new H.map.Marker ({lat: -33.41895,  lng: -70.64203}),
          marker2 = new H.map.Marker ({lat: -33.435130, lng: -70.643468}),
          marker3 = new H.map.Marker ({lat: -33.433419, lng: -70.650996}),
          marker4 = new H.map.Marker ({lat: -33.439158, lng: -70.644000}),
          marker5 = new H.map.Marker ({lat: -33.438942, lng: -70.641160}),
          marker6 = new H.map.Marker ({lat: -33.430902, lng: -70.634375}),
        group = new H.map.Group();
        group.addObjects([marker1, marker2, marker3, marker4, marker5, marker6]);
        this.map.addObject(group);
        marker1.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        marker2.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        marker3.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        marker4.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        marker5.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        marker6.setData(`
        <div class='modal'><p>Centro de Acopio</p>
        <p>Nombre del Lugar</p>
        <p>Dirección</p>
        <a href="">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a></div>
        `);
        group.addEventListener('tap', event => {
            // tslint:disable-next-line:prefer-const
                let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                    content: event.target.getData()
                });
                this.ui.addBubble(bubble);
            }, false);
        }
}

