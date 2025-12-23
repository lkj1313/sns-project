import { updatePassword } from "@/api/auth";

import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useUpdatePassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
  });
}
