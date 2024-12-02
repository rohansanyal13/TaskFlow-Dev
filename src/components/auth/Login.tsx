// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ErrorHandler, ErrorState } from '../../utils/ErrorHandler';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState<ErrorState[]>([]);
  const { login, createAccount } = useAuth();
  const errorHandler = ErrorHandler.getInstance();

  useEffect(() => {
    const unsubscribe = errorHandler.subscribe(setErrors);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createAccount(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      // Errors are handled by AuthProvider
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">TaskFlow</h2>
          <p className="mt-2 text-gray-600">
            {isRegistering ? 'Create an account' : 'Sign in to manage your tasks'}
          </p>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 space-y-2">
            {errors.map((error) => (
              <Alert key={error.id} variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {isRegistering ? 'Create Account' : 'Sign In'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Create one"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};