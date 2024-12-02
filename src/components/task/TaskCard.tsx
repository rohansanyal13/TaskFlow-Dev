import React from 'react';
import { Task } from '../../models/Task';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Calendar,
  Clock, 
  Tag, 
  Trash2,
  Edit
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-400';
      case 'MEDIUM':
        return 'text-yellow-400';
      case 'LOW':
        return 'text-green-400';
      default:
        return 'text-blue-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-blue-500/10 text-blue-500';
      case 'IN_PROGRESS':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'COMPLETED':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getNextDayDate = (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.toLocaleDateString();
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card p-5 transition-all hover:border-border">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold tracking-tight">{task.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {getNextDayDate(task.dueDate)}
            </span>
          </span>

          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>

          <span className={`flex items-center gap-1.5 ${getPriorityColor(task.priority)}`}>
            <Clock className="h-4 w-4" />
            {task.priority}
          </span>
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};