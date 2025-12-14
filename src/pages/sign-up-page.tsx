import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { getErrorMessage } from "@/lib/error";
import { toast } from "sonner";
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signUp, isPending: isSigningUpPending } = useSignUp({
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });
  const handleSignupClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    signUp({ email, password });
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@email.com"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <Button onClick={handleSignupClick} className="w-full">
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to="/sign-in">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
