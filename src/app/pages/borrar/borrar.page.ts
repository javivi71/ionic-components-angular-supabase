import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonAlert,
  IonToast,
  IonSpinner,
  IonText,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { addIcons } from 'ionicons';
import { 
  trashOutline, 
  refreshOutline, 
  personOutline, 
  arrowBackOutline,
  mailOutline,
  closeOutline,
  warningOutline,
  checkmarkOutline,
  peopleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.page.html',
  styleUrls: ['./borrar.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    IonButton,
    //IonItem,
    IonLabel,
    IonIcon,
    IonAlert,
    IonToast,
    IonSpinner,
    IonText,
    IonButtons
  ]
})
export class BorrarPage implements OnInit {

  datosClientes: any[] = [];
  isLoading = false;
  isDeleting = false;
  showAlert = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';
  registroAEliminar: any = null;
  alertButtons: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    // REGISTRAR TODOS LOS ICONOS QUE SE USAN EN EL TEMPLATE
    addIcons({ 
      trashOutline, 
      refreshOutline, 
      personOutline, 
      arrowBackOutline,
      mailOutline,
      closeOutline,
      warningOutline,
      checkmarkOutline,
      peopleOutline
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.isLoading = true;
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
      this.mostrarToast('Error al cargar los datos', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // Preparar eliminación (mostrar alerta de confirmación)
  confirmarEliminacion(registro: any) {
    this.registroAEliminar = registro;
    this.showAlert = true;
    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.showAlert = false;
          this.registroAEliminar = null;
        }
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          this.eliminarRegistro(registro);
        }
      }
    ];
  }

  // Eliminar registro
  async eliminarRegistro(registro: any) {
    this.isDeleting = true;
    this.showAlert = false;

    try {
      const { error } = await this.supabaseService.supabase
        .from('formulario_demo')
        .delete()
        .eq('id', registro.id);

      if (error) {
        throw error;
      }

      // Eliminar del array local
      this.datosClientes = this.datosClientes.filter(item => item.id !== registro.id);
      
      this.mostrarToast(`Registro #${registro.id} eliminado correctamente`, 'success');
      this.registroAEliminar = null;

    } catch (error: any) {
      console.error('Error al eliminar:', error);
      this.mostrarToast('Error al eliminar el registro: ' + error.message, 'danger');
    } finally {
      this.isDeleting = false;
    }
  }

  // Eliminar todos los registros
  confirmarEliminacionTodos() {
    if (this.datosClientes.length === 0) {
      this.mostrarToast('No hay registros para eliminar', 'warning');
      return;
    }

    this.showAlert = true;
    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.showAlert = false;
        }
      },
      {
        text: 'Eliminar Todos',
        role: 'destructive',
        handler: () => {
          this.eliminarTodos();
        }
      }
    ];
  }

  async eliminarTodos() {
    this.isDeleting = true;
    this.showAlert = false;

    try {
      // Obtener todos los IDs
      const ids = this.datosClientes.map(item => item.id);
      
      const { error } = await this.supabaseService.supabase
        .from('formulario_demo')
        .delete()
        .in('id', ids);

      if (error) {
        throw error;
      }

      this.datosClientes = [];
      this.mostrarToast('Todos los registros eliminados correctamente', 'success');

    } catch (error: any) {
      console.error('Error al eliminar todos:', error);
      this.mostrarToast('Error al eliminar todos los registros: ' + error.message, 'danger');
    } finally {
      this.isDeleting = false;
    }
  }

  // Mostrar toast
  mostrarToast(mensaje: string, color: string = 'success') {
    this.toastMessage = mensaje;
    this.toastColor = color;
    this.showToast = true;
  }

  // Navegar de vuelta
  volver() {
    this.router.navigate(['/mostrar']);
  }
}