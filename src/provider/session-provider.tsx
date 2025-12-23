import { useEffect } from "react";
import { useIsSessionLoaded } from "@/store/session";
import supabase from "@/lib/supabase";

import { useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);
  if (!isSessionLoaded) return <GlobalLoader />;
  return <>{children}</>;
}
