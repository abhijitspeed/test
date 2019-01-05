import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'California Earth Quack';
  constructor(private http: Http) { }
  httpdata;
  serviceData;
  filterValue;
   ngOnInit() {
      this.http.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").
      pipe(map((response) => response.json())).
      subscribe((data) => this.displaydata(data))
   }
   displaydata(data) {   
       this.httpdata = data.features;
       let other = [];
       this.httpdata.map(currentValue => { 
           if(currentValue.properties.place.includes("California")){ 	
               //console.log(currentValue.properties.place);
               //console.log(currentValue.properties.title.substring(1, 6));
               return {
                   "place" : currentValue.properties.place,
                   "scale" : currentValue.properties.title.substring(1, 6).trim()
               };
           } return;
       }).forEach(item => {
           if(item != null) {
       		   other.push(item)
           }
       }
       );
       this.serviceData = other;
   }
   highLight(event: any) {
   this.filterValue = event.target.value;
   console.log(this.filterValue);
   }
}
export class CaliforniaEarthQuack{
    place: String;
    scale: String;
}