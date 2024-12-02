// src/components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../ui/button';
import { 
  LayoutGrid, 
  LogOut, 
  Moon,
  Settings
} from 'lucide-react';

export const Header: React.FC<{
  view: 'LIST' | 'KANBAN' | 'SPRINT';
  onViewChange: (view: 'LIST' | 'KANBAN' | 'SPRINT') => void;
}> = ({ view, onViewChange }) => {
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-4">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <select
            value={view}
            onChange={(e) => onViewChange(e.target.value as 'LIST' | 'KANBAN' | 'SPRINT')}
            className="rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
          >
            <option value="LIST">List View</option>
            <option value="KANBAN">Kanban View</option>
            <option value="SPRINT">Sprint View</option>
          </select>
    
          
          {/* Updated Logout Button */}
          <Button 
            variant="destructive" 
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;