// src/utils/types.ts

import { Task } from '../models/Task';

export type ViewType = 'LIST' | 'KANBAN' | 'SPRINT';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

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

export interface UserPreferences {
    defaultView: ViewType;
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