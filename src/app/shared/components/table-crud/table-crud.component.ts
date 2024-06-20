import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Flowbite } from '../../../decorators/Flowbite.decorator';
import { UpperCasePipe } from '@angular/common';
import { HEADER_ACTION_TYPE, ITableColumn, ITableHeaderActions, ITableRowActions, SORT_STATUS } from '../../../interfaces/ITableCrud.interface';
import { PaginatorComponent } from "../paginator/paginator.component";

@Component({
  selector: 'app-table-crud',
  standalone: true,
  templateUrl: './table-crud.component.html',
  styleUrl: './table-crud.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    UpperCasePipe,
    PaginatorComponent
  ]
})
@Flowbite()
export class TableCrudComponent implements OnInit {
  @Input() tableColumns: ITableColumn<any>[] = [];
  @Input() datasource: any[] = [];
  @Input() pagination: any = null;
  @Input() addButtonText: string = 'Agregar';
  @Input() headerActions: ITableHeaderActions[] | null = [];
  @Input() rowActions: ITableRowActions[] | null = [];
  @Input() loading: boolean = false;
  @Output() inputSearchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() exportEvent: EventEmitter<HEADER_ACTION_TYPE> = new EventEmitter<HEADER_ACTION_TYPE>();
  @Output() pageEvent: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  searchControl: FormControl = new FormControl('');
  sortStatus: SORT_STATUS = SORT_STATUS.ASCENDING;
  sortOrder: number = 1;
  sortedColumn: string = 'id';
  pageOfItems: any[] = [];
  pageSizes: number[] = [5, 10, 20, 50];

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(filterValue => this.inputSearchEvent.emit(filterValue));
  }

  hasHeaderActions(): boolean {
    return this.headerActions?.length ? this.headerActions.some(a => [HEADER_ACTION_TYPE['EXPORT-PDF'], HEADER_ACTION_TYPE['EXPORT-XLSX']].includes(a.type)) : false;
  }

  get visibleColumns(): ITableColumn<any>[] {
    return this.tableColumns.filter(column => column.visible);
  }

  trackByVisibleColumns(data: any[]): any[] {
    return data.map(obj => {
      const newObj: Record<string, any> = {};
      this.tableColumns.forEach(header => {
        if (header.visible) {
          newObj[header.property] = obj[header.property];
        }
      });
      return newObj;
    });
  }

  getValuesFromObject(obj: any): string[] {
    return Object.values(obj);
  }

  onFilterBtnClicked(): void {
    this.filterEvent.emit();
  }

  onAddBtnClicked(): void {
    this.addEvent.emit();
  }

  onExportBtnClicked(type: HEADER_ACTION_TYPE): void {
    this.exportEvent.emit(type);
  }

  onSortByClicked(column: ITableColumn<any>): void {
    switch (this.sortStatus) {
      case SORT_STATUS.ASCENDING:
        this.sortStatus = SORT_STATUS.DESCENDING;
        break;
      case SORT_STATUS.DESCENDING:
      default:
        this.sortStatus = SORT_STATUS.ASCENDING;
        break;
    }
    this.sortedColumn = column.property;
    this.sortOrder = column.property === this.sortedColumn ? (this.sortOrder * -1) : 1;
    this.datasource = this._sortData(this.datasource, column.property);
  }

  private _sortData(dataToSort: any[], property: string): any[] {
    return [...dataToSort.sort((a: any, b: any) => {
      let result = 0;
      if (a[property] < b[property]) {
        result = -1;
      }
      if (a[property] > b[property]) {
        result = 1;
      }
      return result * this.sortOrder;
    })];
  }

  onPageChanged(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
