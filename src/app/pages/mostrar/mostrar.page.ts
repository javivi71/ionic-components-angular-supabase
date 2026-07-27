import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.page.html',
  styleUrls: ['./mostrar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard,IonCardContent,IonCardHeader
  ]
})
export class MostrarPage implements OnInit {
  
  datosClientes:any[]=[];

  constructor(private supabaseService: SupabaseService) { }
 
  async cargar(){

    const {data} = await this.supabaseService.supabase.from("formulario_demo").select("*");
    this.datosClientes = [data];

    console.log('datos recibidos:',data);
  }
 

  ngOnInit() { }

   ionViewWillEnter(){
    this.cargar();
  }

}
