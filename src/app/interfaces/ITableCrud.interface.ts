export interface ITableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'date' | 'datetime' | 'number' | 'money' | 'badge' | 'checkbox' | 'button';
  visible: boolean;
}

export enum HEADER_ACTION_TYPE {
  'EXPORT-XLSX' = 'EXPORT-XLSX',
  'EXPORT-PDF' = 'EXPORT-PDF'
}

export enum ROW_ACTION_TYPE {
  'SHOW' = 'SHOW',
  'EDIT' = 'EDIT',
  'DELETE' = 'DELETE'
}

export enum SORT_STATUS {
  'ASCENDING' = 1,
  'DESCENDING' = 2
}

export interface ITableHeaderActions {
  type: HEADER_ACTION_TYPE;
  icon: string;
  text: string;
}

export interface ITableRowActions {
  type: string;
  icon: string;
  text: string;
}

export interface IPager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
