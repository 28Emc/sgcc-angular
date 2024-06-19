import { Component, OnInit } from '@angular/core';
import { ContentHeaderComponent } from '../../shared/components/content-header/content-header.component';
import { initFlowbite } from 'flowbite';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-housing',
  standalone: true,
  imports: [
    ContentHeaderComponent,

    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss'
})
export class HousingComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  addButtonText: string = 'Agregar Edificio';
  tableColumns: string[] = ['ID', 'DIRECCIÓN'];
  rowActions: any[] = [
    {
      type: 'SHOW',
      text: 'Ver detalles'
    },
    {
      type: 'EDIT',
      text: 'Editar'
    },
    {
      type: 'DELETE',
      text: 'Dar de baja'
    }
  ];
  datasource: any[] = [];
  pagination: any = null;

  ngOnInit(): void {
    initFlowbite();
  }
}
