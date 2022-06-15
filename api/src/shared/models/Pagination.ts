export interface Pagination<V> {
  page: number;
  perPage: number;
  total: number;
  data: V[];
}
