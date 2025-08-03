import { Suspense } from 'react';

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading delivery status...</div>}>
      {children}
    </Suspense>
  );
}