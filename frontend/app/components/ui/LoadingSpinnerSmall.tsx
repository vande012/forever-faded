import Image from "next/image";

export default function LoadingSpinnerSmall() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/loadinganimation.gif"
        alt="Loading..."
        width={24}
        height={24}
        priority
        unoptimized
      />
    </div>
  );
}