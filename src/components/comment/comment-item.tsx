import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";
import type { Comment, NestedComment } from "@/types";
import { formatTime } from "@/lib/time";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "./comment-editor";
import { toast } from "sonner";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { useOpenAlertModal } from "@/store/alert-modal";

export default function CommentItem(props: NestedComment) {
  const session = useSession();
  const openAlertModal = useOpenAlertModal();
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        toggleIsEditing();
      },
      onError: (error) => {
        toast.error("댓글 삭제에 실패했습니다.", { position: "top-center" });
      },
    });
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const toggleIsReplying = () => setIsReplying((prev) => !prev);
  const isMine = session?.user.id === props.author_id;
  const isRootComment = props.parentComment === undefined;
  const isOverTwoLevel = props.parent_comment_id !== props.root_comment_id;

  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const handleDeleteClick = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "정말 댓글을 삭제하시겠습니까?",
      onPositive: () => {
        deleteComment({ id: props.id });
      },
    });
  };
  return (
    <div
      className={`flex flex-col gap-8 ${isRootComment ? "border-b pb-5" : "ml-6"}`}
    >
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={props.author.avatar_url || defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{props.author.nickname}</div>
          {isEditing ? (
            <CommentEditor
              type="EDIT"
              commentId={props.id}
              initialContent={props.content}
              onClose={toggleIsEditing}
            />
          ) : (
            <div>
              {isOverTwoLevel && (
                <span className="font-bold text-blue-500">
                  {props.parentComment?.author.nickname}&nbsp;
                </span>
              )}
              {props.content}
            </div>
          )}
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                onClick={toggleIsReplying}
                className="cursor-pointer hover:underline"
              >
                댓글
              </div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{formatTime(props.created_at)}</div>
            </div>
            {isMine && (
              <div className="flex items-center gap-2">
                <div
                  onClick={toggleIsEditing}
                  className="cursor-pointer hover:underline"
                >
                  수정
                </div>
                <div className="bg-border h-[13px] w-[2px]"></div>
                <div
                  onClick={handleDeleteClick}
                  className="cursor-pointer hover:underline"
                >
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <CommentEditor
          type="REPLY"
          postId={props.post_id}
          parentCommentId={props.id}
          rootCommentId={props.root_comment_id || props.id}
          onClose={toggleIsReplying}
        />
      )}
      {props.children.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
