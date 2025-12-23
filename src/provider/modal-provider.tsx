import PostEditorModal from "@/components/modal/post-editor-modal";
import { createPortal } from "react-dom";
import AlertModal from "@/components/modal/alert-modal";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />,
          <AlertModal />,
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
