export interface ErrorState {
    message: string;
    field?: string;
    timestamp: Date;
    id: string;
  }
  
  export class ErrorHandler {
    private static instance: ErrorHandler;
    private errors: ErrorState[] = [];
    private listeners: ((errors: ErrorState[]) => void)[] = [];
  
    private constructor() {}
  
    static getInstance(): ErrorHandler {
      if (!ErrorHandler.instance) {
        ErrorHandler.instance = new ErrorHandler();
      }
      return ErrorHandler.instance;
    }
  
    addError(message: string, field?: string): void {
      const error: ErrorState = {
        message,
        field,
        timestamp: new Date(),
        id: crypto.randomUUID()
      };
      this.errors.push(error);
      this.notifyListeners();
  
      // Automatically remove error after 5 seconds
      setTimeout(() => {
        this.removeError(error.id);
      }, 5000);
    }
  
    removeError(id: string): void {
      this.errors = this.errors.filter(error => error.id !== id);
      this.notifyListeners();
    }
  
    getErrors(): ErrorState[] {
      return [...this.errors];
    }
  
    clearErrors(): void {
      this.errors = [];
      this.notifyListeners();
    }
  
    subscribe(listener: (errors: ErrorState[]) => void): () => void {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    private notifyListeners(): void {
      this.listeners.forEach(listener => listener(this.getErrors()));
    }
  }