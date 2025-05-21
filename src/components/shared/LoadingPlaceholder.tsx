// src/components/shared/LoadingPlaceholder.tsx
import { Loader2 } from 'lucide-react';

interface LoadingPlaceholderProps {
  text?: string;
  className?: string;
}

export function LoadingPlaceholder({ text = "Loading...", className }: LoadingPlaceholderProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-muted-foreground ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <p>{text}</p>
    </div>
  );
}
