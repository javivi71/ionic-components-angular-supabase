import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonRange,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonList,
    IonItem,
    IonToggle,
    IonRadio,
    IonCheckbox,
    IonInput,
    IonDatetime,
    IonRadioGroup,
    IonCheckbox,
    IonTextarea
  ],
})
export class FormularioPage implements OnInit {

  formulario = {
    nombre: '',
    email: '',
    edad: null,
    dob: new Date().toISOString(),
    genero: '',
    pais: '',
    newsletter: false,
    tecnologias: [],
    //tecnologias: '',
    observaciones: '',
  };

  constructor(private supabaseService: SupabaseService) {}

  async cargar(){
    const {data} = await this.supabaseService.supabase.from("formulario_demo").select("*");
    console.log('datos recibidos:',data);
  }

  ionViewWillEnter(){
    this.cargar();
  }

  /* ---------------------------------------------------------
     Guardar()
     --------------------------------------------------------- */
  async guardar() {
    console.log(this.formulario);

    try {
      const { error } = await this.supabaseService.supabase
        .from('formulario_demo')
        .insert([
          {
            nombre: this.formulario.nombre,
            email: this.formulario.email,
            edad: this.formulario.edad,
            dob: this.formulario.dob,
            genero: this.formulario.genero,
            pais: this.formulario.pais,
            tecnologias: this.formulario.tecnologias,
            recibe_newsletter: this.formulario.newsletter,
            observaciones: this.formulario.observaciones,
          },
        ]);
      if (!error) {
        alert('Registro insertado');
      } else {
        alert("Error:" + error.details);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  ngOnInit() {}
}
