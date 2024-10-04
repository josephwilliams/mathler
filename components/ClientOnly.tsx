import { ReactNode, useEffect, useState } from "react";

// This is useful for ensuring that we have access to local storage when other components are mounted.
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: any;
  fallback?: ReactNode;
}): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isWindow = typeof window !== undefined;
  return mounted && isWindow ? children : fallback;
}
