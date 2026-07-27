import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonCardSubtitle,
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonTextarea,
  IonButtons,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { addIcons } from 'ionicons';
import { 
  trashOutline, 
  mailOutline,
  arrowBackOutline,
  refreshOutline,
  personOutline,
  createOutline,
  closeOutline,
  checkmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.page.html',
  styleUrls: ['./mostrar.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonCard, 
    IonCardContent, 
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonModal,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonList,
    IonRadioGroup,
    IonRadio,
    IonTextarea,
    IonButtons,
    IonIcon,
    IonText
  ]
})
export class MostrarPage implements OnInit {

  datosClientes: any[] = [];
  datoSeleccionado: any = {};
  isModalOpen = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    // Registrar todos los iconos que se usan en el template
    addIcons({ 
      trashOutline, 
      mailOutline,
      arrowBackOutline,
      refreshOutline,
      personOutline,
      createOutline,
      closeOutline,
      checkmarkOutline
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.cargar();
  }

  async cargar() {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from("formulario_demo")
        .select("*")
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      this.datosClientes = data || [];
      console.log('Datos cargados:', this.datosClientes.length);
    } catch (error: any) {
      console.error('Error al cargar datos:', error);
    }
  }

  // Abrir modal con el elemento seleccionado
  abrirModal(dato: any) {
    this.datoSeleccionado = { ...dato };
    this.isModalOpen = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.isModalOpen = false;
    this.datoSeleccionado = {};
  }

  // Actualizar registro
  async actualizar() {
    try {
      const { error } = await this.supabaseService.supabase
        .from('formulario_demo')
        .update({
          nombre: this.datoSeleccionado.nombre,
          email: this.datoSeleccionado.email,
          edad: this.datoSeleccionado.edad,
          dob: this.datoSeleccionado.dob,
          genero: this.datoSeleccionado.genero,
          pais: this.datoSeleccionado.pais,
          tecnologias: this.datoSeleccionado.tecnologias,
          recibe_newsletter: this.datoSeleccionado.newsletter || this.datoSeleccionado.recibe_newsletter,
          observaciones: this.datoSeleccionado.observaciones
        })
        .eq('id', this.datoSeleccionado.id);

      if (!error) {
        alert('Registro actualizado correctamente');
        this.cerrarModal();
        this.cargar(); // Recargar la lista
      } else {
        alert('Error al actualizar: ' + error.message);
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert('Error al actualizar: ' + error.message);
    }
  }

  // Navegar a la página de borrar
  irABorrar() {
    this.router.navigate(['/borrar']);
  }
}