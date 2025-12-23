import { signInWithEmail } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithEmail,
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
