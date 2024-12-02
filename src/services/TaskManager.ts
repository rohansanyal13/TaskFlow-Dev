import { Task, TaskProps } from '../models/Task';
import { ErrorHandler } from '../utils/ErrorHandler';
import { SortConfig, TaskPriority } from '../utils/types';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() -1);

export class TaskManager {
    private tasks: Map<string, Task> = new Map();
    private errorHandler: ErrorHandler;

    constructor() {
        this.errorHandler = ErrorHandler.getInstance();
    }

    createTask(props: Omit<TaskProps, 'id'>): Task | null {
        try {
            const task = new Task(props);
            this.validateTask(task);
            this.tasks.set(task.id, task);
            //task.dueDate.setDate(task.dueDate.getDate() + 1);
            return task;
        } catch (error) {
            if (error instanceof Error) {
                this.errorHandler.addError(error.message);
            }
            return null;
        }
    }



    private validateTask(task: Task): void {
        if (!task.title || task.title.length === 0) {
            throw new Error('Task title cannot be empty');
        }
        if (task.title.length > 100) {
            throw new Error('Task title cannot exceed 100 characters');
        }
        if (task.description.length > 500) {
            throw new Error('Task description cannot exceed 500 characters');
        }
        if (task.dueDate  < yesterday) {
            throw new Error('Due date cannot be in the past');
        }
        if (task.tags.length > 10) {
            throw new Error('Cannot have more than 10 tags');
        }
        if (task.tags.some(tag => tag.length > 20)) {
            throw new Error('Tag length cannot exceed 20 characters');
        }
    }

    getTask(id: string): Task | undefined {
        const task = this.tasks.get(id);
        if (!task) {
            this.errorHandler.addError('Task not found');
        }
        return task;
    }

    updateTask(id: string, updates: Partial<Omit<TaskProps, 'id'>>): Task | null {
        try {
            const existingTask = this.tasks.get(id);
            if (!existingTask) {
                throw new Error('Task not found');
            }
    
            // Create new task props by combining existing and updated properties
            const updatedProps: TaskProps = {
                id: existingTask.id,
                title: updates.title ?? existingTask.title,
                description: updates.description ?? existingTask.description,
                dueDate: updates.dueDate ? new Date(updates.dueDate) : new Date(existingTask.dueDate),
                priority: updates.priority ?? existingTask.priority,
                status: updates.status ?? existingTask.status,
                tags: updates.tags ?? [...existingTask.tags],
                createdAt: existingTask.createdAt,
                updatedAt: new Date()
            };
    
            // Create a new Task instance with the updated properties
            const updatedTask = new Task(updatedProps);
            
            // Validate the new task
            this.validateTask(updatedTask);
            
            // Save the updated task
            this.tasks.set(id, updatedTask);
            
            return updatedTask;
        } catch (error) {
            if (error instanceof Error) {
                this.errorHandler.addError(error.message);
            }
            return null;
        }
    }

    deleteTask(id: string): boolean {
        if (!this.tasks.has(id)) {
            this.errorHandler.addError('Cannot delete: Task not found');
            return false;
        }
        return this.tasks.delete(id);
    }

    getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    getSortedTasks(sortBy: string, sortDirection: string, sortConfig: SortConfig): Task[] {
        try {
            const tasks = this.getAllTasks();
            const { field, order } = sortConfig;

            return tasks.sort((a, b) => {
                let comparison = 0;

                if (field === 'dueDate') {
                    comparison = a.dueDate.getTime() - b.dueDate.getTime();
                } else if (field === 'priority') {
                    const priorityOrder: Record<TaskPriority, number> = {
                        HIGH: 0,
                        MEDIUM: 1,
                        LOW: 2
                    };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                }

                return order === 'asc' ? comparison : -comparison;
            });
        } catch (error) {
            if (error instanceof Error) {
                this.errorHandler.addError('Error sorting tasks');
            }
            return this.getAllTasks();
        }
    }
}

export type { SortConfig };
