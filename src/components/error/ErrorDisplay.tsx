import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from 'src/components/ui/alert';
import { X } from 'lucide-react';
import { ErrorHandler, ErrorState } from '../../utils/ErrorHandler';

export const ErrorDisplay: React.FC = () => {
  const [errors, setErrors] = useState<ErrorState[]>([]);
  const errorHandler = ErrorHandler.getInstance();

  useEffect(() => {
    const unsubscribe = errorHandler.subscribe((newErrors) => {
      setErrors(newErrors);
    });

    return () => unsubscribe();
  }, []);

  const handleDismiss = (id: string) => {
    errorHandler.removeError(id);
  };

  if (errors.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2 min-w-[300px] max-w-[500px]"
      style={{ pointerEvents: 'none' }} // Prevent accidental interaction with the background
    >
      {errors.map((error) => (
        <Alert
          key={error.id}
          variant="destructive"
          className="relative pointer-events-auto"
        >
          <AlertTitle className="text-lg">
            {error.field ? `${error.field} Error` : 'Error'}
          </AlertTitle>
          <AlertDescription className="text-sm">{error.message}</AlertDescription>
          <button
            onClick={() => handleDismiss(error.id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      ))}
    </div>
  );
};
