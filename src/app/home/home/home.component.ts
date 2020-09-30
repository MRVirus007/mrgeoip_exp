import { Component, OnInit } from '@angular/core';
import { VisitorsService } from '../../services/api.service';
declare let L;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ipaddress: string = '';
  latitude: string = '';
  longitude: string = '';
  region: string = '';
  isp: string = '';
  city: string = '';
  location: string = '';
  country: string = '';
  postalCode: string = '';
  timezone: string = '';
  search: string = '';
  constructor(private visitorsService: VisitorsService) {}
  initializingMap() {
    // call this method before you initialize your map.
    var container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }
  }

  leafMap(lati, long) {
    const map = L.map('map').setView([lati, long], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.zoomControl.remove();
    //Map Icon
    //Map Icon
    var blackIcon = L.icon({
      iconUrl: '../../assets/images/icon-location.svg',

      iconSize: [38, 45], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    var marker = L.marker([this.latitude, this.longitude], {
      icon: blackIcon,
    }).addTo(map);
  }

  setIt(ipman) {
    this.visitorsService.getGEOLocation(ipman).subscribe((res) => {
      this.ipaddress = res['ip'];
      this.location = res['location'];
      this.country = this.location['country'];
      this.latitude = this.location['lat'];
      this.longitude = this.location['lng'];
      this.region = this.location['region'];
      this.city = this.location['city'];
      this.postalCode = this.location['postalCode'];
      this.timezone = this.location['timezone'];
      this.isp = res['isp'];
      //Adding the Map
      this.initializingMap();
      this.leafMap(this.latitude, this.longitude);
    });
  }

  onSub(num) {
    // console.log(num);
    //this.ipaddress = num;
    this.setIt(num);
  }

  ngOnInit() {
    this.visitorsService.getIpAddress().subscribe((res) => {
      this.ipaddress = res['ip'];
      this.setIt(this.ipaddress);
    });
  }
}
