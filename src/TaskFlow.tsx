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
import { TaskManager } from './services/TaskManager';
import { Task, TaskProps } from './models/Task';
import { SortConfig, SortOption } from './utils/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

// Define the default sort configuration
const defaultSortConfig: SortConfig = {
  field: 'dueDate',
  order: 'asc',
  priorityOrder: { HIGH: 3, MEDIUM: 2, LOW: 1 },
  statusOrder: { TODO: 1, IN_PROGRESS: 2, COMPLETED: 3 }
};

const TaskFlow: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [taskManager] = useState(() => new TaskManager());
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Replace individual sort states with a single sortConfig state
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortConfig);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Update tasks when sort configuration changes
  useEffect(() => {
    setTasks(taskManager.getSortedTasks(sortConfig));
  }, [sortConfig, taskManager]);

  // Handler for sort field changes
  const handleSortFieldChange = (field: SortOption) => {
    setSortConfig(prevConfig => ({
      ...prevConfig,
      field
    }));
  };

  // Handler for toggling sort direction
  const toggleSortDirection = () => {
    setSortConfig(prevConfig => ({
      ...prevConfig,
      order: prevConfig.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Update task handlers to use the new sortConfig
  const handleCreateTask = (taskProps: Omit<TaskProps, 'id'>) => {
    const task = taskManager.createTask(taskProps);
    if (task) {
      setTasks(taskManager.getSortedTasks(sortConfig));
      setIsFormOpen(false);
    }
  };

  const handleUpdateTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (taskManager.deleteTask(id)) {
      setTasks(taskManager.getSortedTasks(sortConfig));
    }
  };

  const handleSaveTask = (updates: Omit<TaskProps, 'id'>) => {
    if (selectedTask) {
      const updated = taskManager.updateTask(selectedTask.id, updates);
      if (updated) {
        setTasks(taskManager.getSortedTasks(sortConfig));
        setSelectedTask(null);
        setIsFormOpen(false);
      }
    }
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
                value={sortConfig.field}
                onValueChange={handleSortFieldChange}
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
                {sortConfig.order === 'asc' ? '↑' : '↓'}
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
          sortConfig={sortConfig}
        />
      </main>
    </div>
  );
};

export default TaskFlow;