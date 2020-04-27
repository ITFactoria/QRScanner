import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Record } from "../../models/record.model";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { NavController } from "@ionic/angular";

//import { InAppBrowser } from '@ionic-enterprise/inappbrowser/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  records: Record[];
  record : Record;

  constructor(public dataService: DataService, private inAppBrowser: InAppBrowser, private navCtrl: NavController) { }


  sendEmail() {
    console.log("Send email....");
    this.dataService.buildFile();
  }

  

  showPage(record: Record) {
    console.log("show page ", record);

    switch (record.format) {
      case 'http': {
        this.inAppBrowser.create(record.text);
        break;
      }
      case 'geo:': {
        console.log("geo: ", record);
        this.navCtrl.navigateForward(`/tabs/tab2/map/${record.text}`);
        break;
      }
    }


  }


}
