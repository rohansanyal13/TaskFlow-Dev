import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  LogOut, 
  Plus,
  Menu,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortConfig } from '../../utils/types';

interface LayoutProps {
  children: React.ReactNode;
  onSortChange: (sortConfig: SortConfig) => void;
  onCreateTask: () => void;
  currentSort: SortConfig;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onSortChange,
  onCreateTask,
  currentSort
}) => {
  const { logout } = useAuth();

  const handleSortChange = (field: SortConfig['field']) => {
    if (currentSort.field === field) {
      // Toggle order if same field
      onSortChange({
        field,
        order: currentSort.order === 'asc' ? 'desc' : 'asc',
        priorityOrder: {},
        statusOrder: {}
      });
    } else {
      // Default to ascending for new field
      onSortChange({
        field,
        order: 'asc',
        priorityOrder: {},
        statusOrder: {}
      });
    }
  };

  const getSortIcon = (field: SortConfig['field']) => {
    if (currentSort.field !== field) return null;
    return currentSort.order === 'asc' ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">TaskFlow</h1>
            
            {/* Sort Controls for Desktop */}
            <div className="hidden md:flex space-x-2">
              <Button
                variant={currentSort.field === 'dueDate' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleSortChange('dueDate')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Due Date
                {getSortIcon('dueDate')}
              </Button>
              <Button
                variant={currentSort.field === 'priority' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleSortChange('priority')}
              >
                <Star className="mr-2 h-4 w-4" />
                Priority
                {getSortIcon('priority')}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile Sort Controls */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  {currentSort.field === 'dueDate' ? <Calendar className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange('dueDate')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Sort by Due Date
                  {getSortIcon('dueDate')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('priority')}>
                  <Star className="mr-2 h-4 w-4" />
                  Sort by Priority
                  {getSortIcon('priority')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              onClick={onCreateTask}
              size="sm"
              className="hidden md:flex"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onCreateTask}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Logout */}
            <Button 
              onClick={logout}
              variant="ghost"
              size="sm"
              className="hidden md:flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};