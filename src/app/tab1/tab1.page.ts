import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData: Observable<data[]>;
  isiDataColl: AngularFirestoreCollection<data>;
  public noteList : Notes[] = [];
  urlImageStorage : string[] = [];
  public judIndex = [];
  jud: string ="";
  isi: string ="";
  tanggal: string ="";
  nilai: string ="";
  constructor(public navCtrl: NavController, public alertController: AlertController, public fotoService : FotoService, private afStorage:AngularFireStorage, private afs:AngularFirestore) {
    this.isiDataColl = afs.collection('dataNote');
    this.isiData = this.isiDataColl.valueChanges();
  }
  ind = 0;
  addTask() {
    
    this.noteList[this.ind] = <Notes> {
      judulNote : this.jud,
      isiNote: this.isi,
      tanggalNote: this.tanggal,
      nilaiNote: this.nilai
    }
    this.judIndex.push(this.jud);
    this.ind = this.ind + 1;
    this.jud = "";
    this.isi ="";
    this.tanggal ="";
    this.nilai ="";
  }

  async updateTask(index) {
    let alert = await this.alertController.create({
      header: 'Want to Edit ? ',
      message: 'Type in your new task to update.',
      inputs: [
      { name: 'editJudul', placeholder: this.noteList[index].judulNote },
      { name: 'editIsi', placeholder: this.noteList[index].isiNote },
      { name: 'editTanggal', placeholder: this.noteList[index].tanggalNote },
      { name: 'editNilai', placeholder: this.noteList[index].nilaiNote }
      ],
      buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => 
        {
          this.noteList[index].judulNote = data.editJudul;
          this.noteList[index].isiNote = data.editIsi;
          this.noteList[index].tanggalNote = data.editTanggal;
          this.noteList[index].nilaiNote = data.editNilai;
          
        }
      }
      ]
    });
    alert.present();
  }

  deleteTask(index) {
    this.noteList.splice(index, 1);
    this.judIndex.splice(index, 1);
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  uploadFoto(indx){
    this.urlImageStorage=[indx];
    for (var index in this.fotoService.dataFoto){
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url);
        });
      });
    }
  }

  save(){
    this.isiDataColl.doc(this.jud).set({
      judulNote : this.jud,
      isiNote: this.isi,
      tanggalNote: this.tanggal,
      nilaiNote: this.nilai
    })
  }

}

export interface Notes{
  judulNote: string;
  isiNote: string;
  tanggalNote: string;
  nilaiNote: string;
}

interface data{
  judulNote: string;
  isiNote: string;
  tanggalNote: string;
  nilaiNote: string;
}