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
    const marker1 = new H.map.Marker ({lat: -33.430531, lng: -70.649787}),
          marker2 = new H.map.Marker ({lat: -33.439578, lng: -70.657415}),
          marker3 = new H.map.Marker ({lat: -33.424611, lng: -70.644079}),
          marker4 = new H.map.Marker ({lat: -33.420956, lng: -70.653184}),
          marker5 = new H.map.Marker ({lat: -33.429782, lng: -70.647036}),
          marker6 = new H.map.Marker ({lat: -33.424559, lng: -70.650866}),
        group = new H.map.Group();
        group.addObjects([marker1, marker2, marker3, marker4, marker5, marker6]);
        this.map.addObject(group);
        marker1.setData(`
        <p>Centro de Acopio</p>
        <p>Vega Central</p>
        <p>Antonia López de Bello 743, Providencia.</p>
        <a href="mailto:correo@correo.cl">organizacion@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        marker2.setData(`
        <p>Ayuda de Tranporte</p>
        <p>Liceo Javiera Carrera</p>
        <p>Compañía de Jesús 1484, Santiago.</p>
        <a href="mailto:correo@correo.cl">liceo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        marker3.setData(`
        <p>Centro de Acopio</p>
        <p>Academia de Humanidades</p>
        <p>Rapa Nui, Recoleta.</p>
        <a href="mailto:correo@correo.cl">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        marker4.setData(`
        <p>Capacitación de Primeros Auxilios</p>
        <p>Universidad de Chile</p>
        <p>Avenida Santos Dumont 1052, Independencia.</p>
        <a href="mailto:correo@correo.cl">uchileo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        marker5.setData(`
        <p>Centro de Acopio</p>
        <p>Hao Wei</p>
        <p>Avenida Recoleta 281, Recoleta.</p>
        <a href="mailto:correo@correo.cl">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        marker6.setData(`
        <p>Coordinación de voluntarios</p>
        <p>Distribuidora Monterrey</p>
        <p>Avenida La Paz 535, Independencia.</p>
        <a href="mailto:correo@correo.cl">correo@correo.cl</a>
        <a href="tel:+56000000000">+569123456789</a>
        `);
        group.addEventListener('tap', event => {
            // tslint:disable-next-line:prefer-const
                let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                    content: event.target.getData()
                });
                this.ui.getBubbles().forEach(bub => this.ui.removeBubble(bub));
                this.ui.addBubble(bubble);
            }, false);
        }
}

