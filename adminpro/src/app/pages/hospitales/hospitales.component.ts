import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/hospital.service';

declare var swal: any;


@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
})
export class HospitalesComponent implements OnInit {

    hospitales: Hospital[] = [];

    totalHospitales: number;

    cargando: boolean = true;

    constructor(
        public hospitalService: HospitalService,
        public modalUploadService: ModalUploadService
    ) { }

    ngOnInit() {
        this.cargarHospitales();
        this.modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
    }

    cargarHospitales() {
        this.cargando = true;
        this.hospitalService.cargarHospitales().subscribe((hospitales: any) => {
            this.hospitales = hospitales;
            this.totalHospitales = this.hospitalService.totalHospitales;
            this.cargando = false;
        });
    }

    buscarHospital(termino: string) {
        if (!termino) {
            this.cargarHospitales();
            return;
        }
        this.cargando = true;
        this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
            this.cargando = false;
            this.hospitales = hospitales;
        });
    }

    crearHospital(nombre: string) {
        const hospital = new Hospital(nombre);
        this.hospitalService.crearHospital(hospital).subscribe(resp => this.cargarHospitales());
    }

    actualizarHospital(hospital: Hospital) {
        this.hospitalService.actualizarHospital(hospital).subscribe();
    }

    borrandoHospital(hospital: Hospital) {
        swal({
            title: `Eliminando hospital`,
            text: `¿Seguro que desea eliminar el hospital ${hospital.nombre}?`,
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(borrar => {
            if (borrar) {
                this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
                    this.cargarHospitales();
                });
            }
        });
    }

    mostratSwal() {
        swal({
            text: 'Ingrese nombre del hospital',
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'Nombre de hospital',
                    type: 'text'
                }
            },
            buttons: ['Cerrar', 'Crear Hospital'],
        }).then((value: string) => {
            if (!value || value.length < 1) {
                return;
            }
            this.crearHospital(value);
        });
    }

    mostrarModal(hospital: Hospital) {
        this.modalUploadService.mostrarModal('hospitales', hospital._id);
    }


}
