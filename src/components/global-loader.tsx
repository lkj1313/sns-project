import logo from "@/assets/logo.png";
export default function GlobalLoader() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      <div className="mb-15 animate-bounce">
        <img src={logo} alt="logo" className="h-10 w-10" />
      </div>
    </div>
  );
}
