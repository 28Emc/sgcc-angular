import { Component, OnInit } from '@angular/core';
import { ContentHeaderComponent } from '../../shared/components/content-header/content-header.component';
import { TableCrudComponent } from '../../shared/components/table-crud/table-crud.component';
import { initFlowbite } from 'flowbite';
import { HEADER_ACTION_TYPE, ITableColumn, ITableHeaderActions, ITableRowActions, ROW_ACTION_TYPE } from '../../interfaces/ITableCrud.interface';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import FAKE_HOUSING_DATA from "../../../assets/fake-data/housings.json";

@Component({
  selector: 'app-housing',
  standalone: true,
  imports: [
    ContentHeaderComponent,
    TableCrudComponent
  ],
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss'
})
export class HousingComponent implements OnInit {
  housingData: any[] = [];
  tableColumns: ITableColumn<any>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Dirección', property: 'address', type: 'text', visible: true },
    { label: 'Estado', property: 'status_dsc', type: 'badge', visible: true }
  ];
  tablePagination: any = null;
  filterParams: any = null;
  addButtonText: string = 'Agregar Edificio';
  headerActions: ITableHeaderActions[] = [
    {
      type: HEADER_ACTION_TYPE['EXPORT-XLSX'],
      icon: 'file-x',
      text: 'Exportar como Excel'
    },
    {
      type: HEADER_ACTION_TYPE['EXPORT-PDF'],
      icon: 'file-type-pdf',
      text: 'Exportar como PDF'
    },
  ];
  rowActions: ITableRowActions[] = [
    {
      type: ROW_ACTION_TYPE.SHOW,
      icon: 'eye',
      text: 'Ver'
    },
    {
      type: ROW_ACTION_TYPE.EDIT,
      icon: 'edit',
      text: 'Editar'
    },
    {
      type: ROW_ACTION_TYPE.DELETE,
      icon: 'trash-x',
      text: 'Dar de baja'
    }
  ];
  loading: boolean = false;
  private _filterSub$ = new Subject<string>();
  private _destroyed$ = new Subject<void>();

  constructor() {
    this._filterSub$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this._destroyed$)
    ).subscribe(changedValue => {
      console.log('changedValue', changedValue);
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.fetchHousingData();
  }

  ngOnDestroy() {
    this._filterSub$.next('');
    this._destroyed$.next();
    this._filterSub$.complete();
    this._destroyed$.complete();
  }

  fetchHousingData(): void {
    this.loading = true;

    this.housingData = FAKE_HOUSING_DATA;

    this.loading = false;
  }

  onInput(searchValue: string): void {
    this._filterSub$.next(searchValue);
  }

  onFilter(): void {
    console.log("Filter button clicked");
  }

  onAdd(): void {
    console.log("Add button clicked");
  }

  onExport(type: HEADER_ACTION_TYPE): void {
    console.log("Export button clicked", type);
  }
}
