import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
