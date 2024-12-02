import React, { useState } from 'react';
import { Task, TaskProps } from '../../models/Task';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface TaskFormProps {
  onSubmit: (task: Omit<TaskProps, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues, onCancel }) => {
  // Initialize all form states, including the new status field
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate.toISOString().split('T')[0] || ''
  );
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>(
    initialValues?.priority || 'MEDIUM'
  );
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'COMPLETED'>(
    initialValues?.status || 'TODO'
  );
  const [tags, setTags] = useState(initialValues?.tags?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      status, // Include status in the submission
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    });
  };

  // Get status label for display
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            value={priority}
            onValueChange={(value: 'HIGH' | 'MEDIUM' | 'LOW') => setPriority(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HIGH">High Priority</SelectItem>
              <SelectItem value="MEDIUM">Medium Priority</SelectItem>
              <SelectItem value="LOW">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={status}
            onValueChange={(value: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => setStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {initialValues ? 'Update Task' : 'Create Task'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};