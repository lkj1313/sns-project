import { useEffect } from "react";
import { useIsSessionLoaded } from "@/store/session";
import supabase from "@/lib/supabase";

import { useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";
import { useSession } from "@/store/session";
import { useProfileData } from "@/hooks/queries/use-profile-data";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();
  const { data: profile, isLoading: isLoadingProfile } = useProfileData(
    session?.user.id,
  );
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);
  if (!isSessionLoaded) return <GlobalLoader />;
  if (isLoadingProfile) return <GlobalLoader />;
  return <>{children}</>;
}
