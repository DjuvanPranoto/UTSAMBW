import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public navController: NavController, public alertController: AlertController, public tab1: Tab1Page) {}
  
  List = this.tab1.noteList;
  judList = this.tab1.judIndex;
  

  async updateTask(index) {
    let alert = await this.alertController.create({
      header: 'Want to Edit ? ',
      message: 'Type in your new task to update.',
      inputs: [
      { name: 'editJudul', placeholder: this.List[index].judulNote },
      { name: 'editIsi', placeholder: this.List[index].isiNote },
      { name: 'editTanggal', placeholder: this.List[index].tanggalNote },
      { name: 'editNilai', placeholder: this.List[index].nilaiNote }
      ],
      buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => 
        {
          this.List[index].judulNote = data.editJudul;
          this.List[index].isiNote = data.editIsi;
          this.List[index].tanggalNote = data.editTanggal;
          this.List[index].nilaiNote = data.editNilai;
          
        }
      }
      ]
    });
    alert.present();
  }

  deleteTask(index) {
    this.List.splice(index, 1);
    this.judList.splice(index, 1);
  }
}
