export interface TaskRequest {
  id?: string;
  title: string;
  description: string;
  priority: string;
  userId: string;
  projectId: string;
  columnId: string;
}
