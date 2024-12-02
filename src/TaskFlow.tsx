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
import { Task } from './models/Task';
import { TaskProps } from './models/Task';

const TaskFlow: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [taskManager] = useState(() => new TaskManager());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'LIST' | 'KANBAN' | 'SPRINT'>('LIST');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setTasks(taskManager.getTasksByView(view));
  }, [view]);

  const handleCreateTask = (taskProps: Omit<TaskProps, 'id'>) => {
    const task = taskManager.createTask(taskProps);
    if (task) {
      setTasks(taskManager.getTasksByView(view));
      setIsFormOpen(false);
    }
  };

  const handleUpdateTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (taskManager.deleteTask(id)) {
      setTasks(taskManager.getTasksByView(view));
    }
  };

  const handleSaveTask = (updates: Omit<TaskProps, 'id'>) => {
    if (selectedTask) {
      const updated = taskManager.updateTask(selectedTask.id, updates);
      if (updated) {
        setTasks(taskManager.getTasksByView(view));
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
      <Header view={view} onViewChange={setView} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
            <p className="mt-1 text-muted-foreground">
              Manage and organize your tasks effectively
            </p>
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