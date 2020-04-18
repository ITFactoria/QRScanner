import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { DataService } from 'src/app/services/data.service';
import { Record } from "../../models/record.model";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  record: Record;

  constructor(private qrScanner: QRScanner, private dataService: DataService) {

  }
  scan() {
    // Optionally request the permission early
    console.log("scaneando");
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        console.log("Error programado");
        this.record = new Record('http','https://google.com');
        //this.record
        //this.record.format ='http';
        //this.record.text = 'https://google.com';
        this.dataService.saveRecord(this.record);
        
      });
  }

}
