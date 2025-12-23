import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchPosts } from "@/api/post";

export function usePostData() {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPosts(),
  });
}
