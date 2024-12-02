import React, { useMemo } from 'react';
import { Task } from '../../models/Task';
import { TaskCard } from './TaskCard';
import { SortConfig } from '../../utils/types';
import { sortTasks } from '../../utils/sortUtils';

interface TaskListProps {
  tasks: Task[];
  sortConfig: SortConfig;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  sortConfig, 
  onEdit, 
  onDelete 
}) => {
  // Use useMemo to prevent unnecessary re-sorting when other props change
  const sortedTasks = useMemo(() => {
    return sortTasks(tasks, sortConfig);
  }, [tasks, sortConfig]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};