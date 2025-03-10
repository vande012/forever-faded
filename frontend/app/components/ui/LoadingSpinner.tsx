import Image from "next/image";

export default function LoadingSpinner() {
    return (
        <div className="h-screen w-full bg-black flex text-white font-roboto font-bold text-2xl items-center justify-center">
        <div className="container flex flex-col items-center justify-center">
          <Image
            src="/loadinganimation.gif"
            alt="Loading..."
            width={200}
            height={200}
            priority
          />
          <div className="text-center col-span-2">Loading...</div>
        </div>
        </div>
    );
  }