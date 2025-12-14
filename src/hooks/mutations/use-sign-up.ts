import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth";

export function useSignUp() {
  return useMutation({
    mutationFn: signup,
  });
}
