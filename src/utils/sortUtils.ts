import { Task } from '../models/Task';
import { SortConfig, PRIORITY_ORDER, STATUS_ORDER } from '../utils/types';

export const sortTasks = (tasks: Task[], sortConfig: SortConfig): Task[] => {
  // Create a new array to avoid mutating the original
  const sortedTasks = [...tasks];

  sortedTasks.sort((a, b) => {
    // Helper function to handle ascending/descending order
    const compareValues = (aVal: any, bVal: any): number => {
      if (aVal === bVal) return 0;
      
      // Handle different types of comparisons
      if (aVal instanceof Date && bVal instanceof Date) {
        return aVal.getTime() - bVal.getTime();
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      
      return aVal < bVal ? -1 : 1;
    };

    let comparison = 0;
    
    switch (sortConfig.field) {
      case 'dueDate':
        comparison = compareValues(a.dueDate, b.dueDate);
        break;
        
      case 'priority':
        // Use the PRIORITY_ORDER mapping for consistent sorting
        comparison = compareValues(
          PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER],
          PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER]
        );
        break;
        
      case 'status':
        // Use the STATUS_ORDER mapping for consistent sorting
        comparison = compareValues(
          STATUS_ORDER[a.status as keyof typeof STATUS_ORDER],
          STATUS_ORDER[b.status as keyof typeof STATUS_ORDER]
        );
        break;
        
      case 'createdAt':
        comparison = compareValues(a.createdAt, b.createdAt);
        break;
        
      case 'title':
        comparison = compareValues(a.title, b.title);
        break;
        
      default:
        comparison = 0;
    }

    // Apply sort order (ascending or descending)
    return sortConfig.order === 'asc' ? comparison : -comparison;
  });

  return sortedTasks;
};