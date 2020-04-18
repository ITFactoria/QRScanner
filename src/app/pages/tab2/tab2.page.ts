import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Record } from "../../models/record.model";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  records : Record[];

  constructor(public dataService : DataService) {}

  
  sendEmail(){
    console.log("Send email....");
  }
  

}
