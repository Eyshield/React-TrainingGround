export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElement: number;
  isFirst: boolean;
  isLast: boolean;
}
