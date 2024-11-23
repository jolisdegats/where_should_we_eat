'use client';
import { AuthProvider } from '@/utils/context/AuthProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 