// import React from 'react';
// import { Task } from '../../models/Task';
// import { Button } from '../ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { Calendar, Trash2 } from 'lucide-react';
// import { TaskForm } from './TaskForm';

// interface TaskListProps {
//   tasks: Task[];
//   onDelete: (id: string) => void;
//   onUpdate: (id: string, updates: Partial<Task>) => void;
// }

// export const TaskList: React.FC<{
//     tasks: Task[];
//     onDelete: (id: string) => void;
//     onUpdate: (id: string, updates: Partial<Task>) => void;
//   }> = ({ tasks, onDelete, onUpdate }) => {
//     const getPriorityColor = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
//       switch (priority) {
//         case 'HIGH':
//           return 'bg-red-100 text-red-800';
//         case 'MEDIUM':
//           return 'bg-yellow-100 text-yellow-800';
//         case 'LOW':
//           return 'bg-green-100 text-green-800';
//       }
//     };
  
//     const getStatusColor = (status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => {
//       switch (status) {
//         case 'TODO':
//           return 'bg-gray-100 text-gray-800';
//         case 'IN_PROGRESS':
//           return 'bg-blue-100 text-blue-800';
//         case 'COMPLETED':
//           return 'bg-emerald-100 text-emerald-800';
//       }
//     };
  
//     return (
//       <div className="space-y-4">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
//           >
//             <div className="flex items-start justify-between">
//               <div className="space-y-1">
//                 <div className="flex items-center space-x-2">
//                   <h3 className="font-medium text-gray-900">{task.title}</h3>
//                   <span
//                     className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(
//                       task.priority
//                     )}`}
//                   >
//                     {task.priority}
//                   </span>
//                   <span
//                     className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
//                       task.status
//                     )}`}
//                   >
//                     {task.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500">{task.description}</p>
//               </div>
              
//               <div className="flex space-x-2">
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" size="sm">Edit</Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Edit Task</DialogTitle>
//                     </DialogHeader>
//                     <TaskForm
//                       initialValues={task}
//                       onSubmit={(updates) => onUpdate(task.id, updates)}
//                     />
//                   </DialogContent>
//                 </Dialog>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-red-600 hover:bg-red-50 hover:text-red-700"
//                   onClick={() => onDelete(task.id)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
  
//             <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
//               <span className="flex items-center">
//                 <Calendar className="mr-1.5 h-4 w-4" />
//                 {new Date(task.dueDate).toLocaleDateString()}
//               </span>
//               <div className="flex flex-wrap gap-1">
//                 {task.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

import React from 'react';
import { Task } from '../../models/Task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
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