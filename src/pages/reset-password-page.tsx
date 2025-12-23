import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getErrorMessage } from "@/lib/error";
import { useUpdatePassword } from "@/hooks/mutations/auth/use-update-password";
import { toast } from "sonner";
import { useNavigate } from "react-router";
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { mutate: updatePassword, isPending: isUpdatingPasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.success("비밀번호가 변경되었습니다.", { position: "top-center" });
        navigate("/");
      },
      onError: (error) => {
        const message = getErrorMessage(error);
        toast.error(message, { position: "top-center" });
        setPassword("");
      },
    });
  const [password, setPassword] = useState("");
  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    updatePassword(password);
  };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력해주세요.
        </div>
      </div>
      <Input
        disabled={isUpdatingPasswordPending}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="py-6"
        type="password"
        placeholder="password"
      />
      <Button
        disabled={isUpdatingPasswordPending}
        onClick={handleUpdatePasswordClick}
        className="w-full"
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
