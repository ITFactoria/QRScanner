import { Injectable } from '@angular/core';
import { Record } from "../models/record.model";
import { Storage } from '@ionic/storage';
import { File } from "@ionic-native/file/ngx";



@Injectable({
  providedIn: 'root'
})
export class DataService {

  records: Record[] = [];
  record: Record;
  

  constructor(private storage: Storage, private file: File) {
    this.listRecords();
  }

  async listRecords() {
    
    this.records = await this.storage.get('records') || [];
    //return this.records;

    //this.storage.get('records').then(data=>{this.records = data || []});
  }


  async saveRecord(record: Record) {

    console.log("savethisrecord: ", record);
    //await this.listRecords();
    this.records.unshift(record);
    console.log("records:", this.records);
    this.storage.set('records',this.records);
  }

  /*async listRecords() {
    this.storage.get('records').then((data:any)=>{
      this.records = data;
      console.log("data: ", data);
      console.log("thisrecords: ", this.records);
      
    });
  
    //this.records = this.storage.get('records') || [];
    //return this.records;
  }*/

  

  createFile(text : string){
    this.file.checkFile(this.file.dataDirectory,'records.csv')
    .then(existe=>{
      console.log("existe archivo");
      return this.writeFile(text);

    })
    .catch(err=>{
      console.log("no existe archivo");
      this.file.createFile(this.file.dataDirectory,'records.csv',false)
      .then(creado =>{
        console.log("Archivo creado");
        return this.writeFile(text);

      })
      .catch(err2=>{
        console.log("Error al crear el archivo: ", err2)
      });
    });


    
  }
  async writeFile(text: string){
    await this.file.writeExistingFile(this.file.dataDirectory,'records.csv',text);
    console.log("Archivo escrito");
    console.log(this.file.dataDirectory + 'records.csv');



  }

  buildFile(){
    console.log("buildrecords");
    const arrayTemp  = [];
    const titulos = 'Tipo, Formato, FechaCreacion,Texto\n';
    arrayTemp.push(titulos);

    this.records.forEach(record =>{
      arrayTemp.push(`${record.type},${record.format},${record.created},${record.text.replace(',',' ')}\n`);

    })
    console.log(arrayTemp.join(''));
    this.createFile(arrayTemp.join(''));
  }

  

}
