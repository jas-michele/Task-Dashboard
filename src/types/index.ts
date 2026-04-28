export type TaskStatus = 'pending' | 'in-progress' | 'completed';
 
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskID: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;

}

export interface TaskItemsProps {
    task: Task;
    onStatusChange: (taskID: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

export interface TaskFilters {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    search?: string;
}

export interface TaskFilterProps {
    onFilterChange: (filters: TaskFilters) => void;
}

export interface Filters {
    status?: Task["status"];
    priority?: Task["priority"];
    search?: string;
}