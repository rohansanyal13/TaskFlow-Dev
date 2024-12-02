// src/TaskFlow.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './components/auth/AuthContext';
import { Header } from './components/layout/Header';
import { TaskList } from './components/task/TaskList';
import { Login } from './components/auth/Login';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Plus } from 'lucide-react';
import { TaskForm } from './components/task/TaskForm';
import { TaskManager, SortConfig } from './services/TaskManager';
import { Task } from './models/Task';
import { TaskProps } from './models/Task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

export type SortOption = 'dueDate' | 'priority' | 'status' | 'createdAt' | 'title';

const defaultSortConfig: SortConfig = {
  order: 'asc', // Specify a default order
  field: 'priority', // Specify a default field
  priorityOrder: { HIGH: 3, MEDIUM: 2, LOW: 1 },
  statusOrder: { TODO: 1, IN_PROGRESS: 2, DONE: 3 },
};

const TaskFlow: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [taskManager] = useState(() => new TaskManager());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setTasks(taskManager.getSortedTasks(sortBy, sortDirection, defaultSortConfig));
  }, [sortBy, sortDirection, taskManager]);

  const handleCreateTask = (taskProps: Omit<TaskProps, 'id'>) => {
    const task = taskManager.createTask(taskProps);
    if (task) {
      setTasks(taskManager.getSortedTasks(sortBy, sortDirection, defaultSortConfig));
      setIsFormOpen(false);
    }
  };

  const handleUpdateTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (taskManager.deleteTask(id)) {
      setTasks(taskManager.getSortedTasks(sortBy, sortDirection, defaultSortConfig));
    }
  };

  const handleSaveTask = (updates: Omit<TaskProps, 'id'>) => {
    if (selectedTask) {
      const updated = taskManager.updateTask(selectedTask.id, updates);
      if (updated) {
        setTasks(taskManager.getSortedTasks(sortBy, sortDirection, defaultSortConfig));
        setSelectedTask(null);
        setIsFormOpen(false);
      }
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
            <p className="mt-1 text-muted-foreground">
              Manage and organize your tasks effectively
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortDirection}
                className="w-10"
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </Button>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedTask ? 'Edit Task' : 'Create New Task'}
                  </DialogTitle>
                </DialogHeader>
                <TaskForm
                  initialValues={selectedTask || undefined}
                  onSubmit={selectedTask ? handleSaveTask : handleCreateTask}
                  onCancel={() => {
                    setSelectedTask(null);
                    setIsFormOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
};

export default TaskFlow;