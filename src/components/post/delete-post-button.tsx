import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { useNavigate } from "react-router";
export default function DeletePostButton({ id }: { id: number }) {
  const navigate = useNavigate();
  const openAlertModal = useOpenAlertModal();
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess: () => {
      const pathname = window.location.pathname;

      if (pathname.startsWith(`/post/${id}`)) {
        navigate("/", { replace: true });
      }

      toast.success("포스트가 삭제되었습니다.");
    },
    onError: (error) => {
      toast.error("포스트 삭제 실패", {
        position: "top-center",
      });
    },
  });
  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "정말 포스트를 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },
    });
  };
  return (
    <Button
      disabled={isDeletePostPending}
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
    >
      삭제
    </Button>
  );
}
