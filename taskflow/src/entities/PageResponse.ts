export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPage: number;
  totalElement: number;
  isFirst: boolean;
  isLast: boolean;
}
