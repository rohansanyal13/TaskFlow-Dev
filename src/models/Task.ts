export interface TaskProps {
    id?: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class Task {
    public id: string;
    public title: string;
    public description: string;
    public dueDate: Date;
    public priority: 'HIGH' | 'MEDIUM' | 'LOW';
    public status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    public tags: string[];
    public createdAt: Date;
    public updatedAt: Date;
  static dueDate: any;

    constructor(props: TaskProps) {
        this.id = props.id || crypto.randomUUID();
        this.title = props.title;
        this.description = props.description;
        this.dueDate = props.dueDate;
        this.priority = props.priority;
        this.status = props.status || 'TODO';
        this.tags = props.tags || [];
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }
}