import type { TaskResponse } from "./TaskResponse";

export interface ColumnResponse {
  id: string;
  title: string;
  position: string;
  taskResponse: TaskResponse[];
}
