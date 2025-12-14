import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type useMutationCallback = {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onSettled?: () => void;
  onMutate?: () => void;
};
