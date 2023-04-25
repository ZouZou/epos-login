import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class AlertService {
    private defaultId = 'default-alert';
    private Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timerProgressBar: false
      });

    success(message: string, options?: any) {
        this.Toast.fire({
            icon: 'success',
            title: message
        })
    //   this.alert(new Alert({ ...options, alertType: AlertSettings.SUCCESS, message }));
    }
  
    error(message: string, options?: any) {
        this.Toast.fire({
            icon: 'error',
            title: message
        })
    //   this.alert(new Alert({ ...options, alertType: AlertSettings.ERROR, message }));
    }
  
    info(message: string, options?: any) {
        this.Toast.fire({
            icon: 'info',
            title: message
        })
    //   this.alert(new Alert({ ...options, alertType: AlertSettings.INFO, message }));
    }
  
    warn(message: string, options?: any) {
        this.Toast.fire({
            icon: 'warning',
            title: message
        })
    //   this.alert(new Alert({ ...options, alertType: AlertSettings.WARNING, message }));
    }
}
