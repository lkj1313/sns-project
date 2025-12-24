import { fetchComments } from "@/api/comment";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";

export function useCommentsData({ postId }: { postId: number }) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments({ postId }),
  });
}
