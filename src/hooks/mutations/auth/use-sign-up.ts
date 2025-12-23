import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth";
import type { useMutationCallback } from "@/types";

export function useSignUp(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signup,
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
