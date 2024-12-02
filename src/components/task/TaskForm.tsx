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

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate.toISOString().split('T')[0] || ''
  );
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>(
    initialValues?.priority || 'MEDIUM'
  );
  const [tags, setTags] = useState(initialValues?.tags?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    });
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
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        {initialValues ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};
