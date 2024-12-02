import React from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { ErrorDisplay } from './components/error/ErrorDisplay';
import TaskFlow from './TaskFlow';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ErrorDisplay />
      <TaskFlow />
    </AuthProvider>
  );
};

export default App;