import { LoaderPinwheel } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden z-[500]">
      <LoaderPinwheel className="animate-spin" size={54} />
    </div>
  );
};

export default Loader;
