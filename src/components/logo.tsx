import logo from "@/assets/logo.png";

export default function Logo() {
  return (
    <div className="h-[50x] w-[50px] flex items-center justify-center overflow-hidden">
      <img src={logo} alt="logo" className="object-contain" />
    </div>
  );
}
