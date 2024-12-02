import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  ListTodo, 
  LogOut, 
  Plus,
  Menu
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  onViewChange: (view: 'LIST' | 'KANBAN' | 'SPRINT') => void;
  onCreateTask: () => void;
  currentView: 'LIST' | 'KANBAN' | 'SPRINT';
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onViewChange,
  onCreateTask,
  currentView
}) => {
  const { logout } = useAuth();

  const viewIcons = {
    LIST: <ListTodo className="h-5 w-5" />,
    KANBAN: <LayoutGrid className="h-5 w-5" />,
    SPRINT: <Menu className="h-5 w-5" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">TaskFlow</h1>
            
            {/* View Switcher for Desktop */}
            <div className="hidden md:flex space-x-2">
              <Button
                variant={currentView === 'LIST' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('LIST')}
              >
                <ListTodo className="mr-2 h-4 w-4" />
                List
              </Button>
              <Button
                variant={currentView === 'KANBAN' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('KANBAN')}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Kanban
              </Button>
              <Button
                variant={currentView === 'SPRINT' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('SPRINT')}
              >
                <Menu className="mr-2 h-4 w-4" />
                Sprint
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile View Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  {viewIcons[currentView]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewChange('LIST')}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  List View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange('KANBAN')}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Kanban Board
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange('SPRINT')}>
                  <Menu className="mr-2 h-4 w-4" />
                  Sprint View
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};