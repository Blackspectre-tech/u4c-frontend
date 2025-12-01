"use client";

import { useEffect, useState } from "react";

export function useAppKit() {
  const [hook, setHook] = useState<null | any>(null);

  useEffect(() => {
    let mounted = true;

    import("@reown/appkit/react").then((m) => {
      if (mounted) setHook(() => m.useAppKit);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return hook ? hook() : null;
}

export function useAppKitAccount() {
  const [hook, setHook] = useState<null | any>(null);

  useEffect(() => {
    let mounted = true;

    import("@reown/appkit/react").then((m) => {
      if (mounted) setHook(() => m.useAppKitAccount);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return hook ? hook() : null;
}
