"use client";

import { useEffect, useState } from "react";
import { getClientAuth } from "../client";

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getClientAuth().then(({ session, user }) => {
      if (!isMounted) return;
      setSession(session);
      setUser(user);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);
  return { session, user, loading };
}
