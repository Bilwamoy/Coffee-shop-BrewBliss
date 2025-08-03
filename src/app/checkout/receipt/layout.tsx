import { Suspense } from 'react';

export default function ReceiptLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      {children}
    </Suspense>
  );
}