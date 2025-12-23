import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/types";

export function useUpdatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
        queryClient.setQueryData<Post>(
          QUERY_KEYS.post.byId(updatedPost.id),
          (prevPost) => {
            if (!prevPost) throw new Error(`${updatedPost.id} not found`);
            return {
              ...prevPost,
              ...updatedPost,
            };
          },
        );
      }
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
