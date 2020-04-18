import { Injectable } from '@angular/core';
import { Record } from "../models/record.model";
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  records: Record[] = [];
  

  constructor(private storage: Storage) {
    this.listRecords();
  }

  async saveRecord(record: Record) {

    await this.listRecords();
    this.records.unshift(record);
    console.log("records:", this.records);
    this.storage.set('records',this.records);
  }

  async listRecords() {
    this.storage.get('records').then((data:any)=>{
      this.records = data;
      console.log("data: ", data);
      console.log("thisrecords: ", this.records);
      
    });
  
    //this.records = this.storage.get('records') || [];
    //return this.records;
  }
}
