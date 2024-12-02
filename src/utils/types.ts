import { Task } from '../models/Task';

export type SortField = 'dueDate' | 'priority' | 'status' | 'createdAt' | 'title';
export type SortOrder = 'asc' | 'desc';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface SortConfig {
    field: SortOption;
    order: SortOrder;
    priorityOrder: { [key: string]: number };
    statusOrder: { [key: string]: number };
}
  
export type SortOption = 'dueDate' | 'priority' | 'status' | 'createdAt' | 'title';

export interface ValidationError {
    field: string;
    message: string;
}


export type ThemeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
    tags?: string[];
    dateRange?: {
        start: Date;
        end: Date;
    };
}

export const PRIORITY_ORDER = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
  } as const;
  
  export const STATUS_ORDER = {
    TODO: 1,
    IN_PROGRESS: 2,
    COMPLETED: 3
  } as const;

export interface UserPreferences {
    defaultSort: SortConfig;
    theme: 'light' | 'dark';
    notifications: boolean;
    taskReminders: boolean;
}

export interface TaskStatistics {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
    avgCompletionTime: number;
    priorityDistribution: {
        high: number;
        medium: number;
        low: number;
    };
}

export type FormMode = 'create' | 'edit' | 'view';

export interface FormState {
    isSubmitting: boolean;
    errors: ValidationError[];
    isDirty: boolean;
}

export type TaskEvent = {
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    taskId: string;
    timestamp: Date;
    changes?: Partial<Task>;
};