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
  qrScan: any;

  constructor(private qrScanner: QRScanner, private dataService: DataService) {

  }

  ionViewWillEnter() {
    console.log("Wiill Enter");
    //this.scan();
    //this.showCamera();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }

  /*scan1() {
    console.log("scannnnnn");
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";
          //Start Scanning
          this.qrScan = this.qrScanner.scan().subscribe((text:string) => {
            document.getElementsByTagName("body")[0].style.opacity = "1";
            console.log("Scan something: ", text);
            this.record = new Record(text.substr(0,4),text);
            console.log("record: ",this.record);
            this.dataService.saveRecord(this.record);
            this.qrScan.unsubscribe();
            this.qrScanner.hide();
          }, (err) => {
            console.log("AlertEror");
          })
        } else if (status.denied) {
          console.log("statis denied");
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          
        } else {
          console.log("Apague y vamonos");
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        console.log("Error programado");
        //this.record = new Record('http','https://google.com');
        this.record = new Record('geo', 'geo:40.73151796986687,-74.06087294062502');
        //this.record
        //this.record.format ='http';
        //this.record.text = 'https://google.com';
        this.dataService.saveRecord(this.record);
      });


  }*/

  scan() {
    // Optionally request the permission early
    console.log("scaneando");
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log("permiso dado");
          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";
        
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            document.getElementsByTagName("body")[0].style.opacity = "1";
            console.log('Scanned something', text);
            this.record = new Record(text.substr(0,4),text);
            this.dataService.saveRecord(this.record);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          },(err)=>{
            console.log("AlertError");
          });
          this.qrScanner.show();

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log("status denied forever");
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log("status denied temporally");
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        console.log("Error programado");
        //this.record = new Record('http','https://google.com');
        this.record = new Record('geo', 'geo:40.73151796986687,-74.06087294062502');
        //this.record
        //this.record.format ='http';
        //this.record.text = 'https://google.com';
        this.dataService.saveRecord(this.record);


      });
  }

  showCamera() {
    console.log("show camera");
    //(window.document.querySelector('ion-app') as
      //HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    console.log("hide camera");
    //(window.document.querySelector('ion-app') as
      //HTMLElement).classList.remove('cameraView');
  }



}
