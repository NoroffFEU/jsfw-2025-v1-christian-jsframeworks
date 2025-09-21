import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  value: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  decimals?: number;
  className?: string;
};

export default function RatingBadge({
  value,
  color = "#B69899",
  size = "sm",
  decimals,
  className = "",
}: Props) {
  const px = size === "lg" ? 20 : size === "md" ? 18 : 16;
  const textSize =
    size === "lg" ? "text-sm" : size === "md" ? "text-xs" : "text-xs";
  const num = typeof decimals === "number" ? value.toFixed(decimals) : value;

  return (
    <span
      className={`inline-flex items-center gap-1 ${textSize} ${className}`}
      aria-label={`${value} out of 5`}
    >
      <StarIcon aria-hidden="true" style={{ width: px, height: px, color }} />
      <span>{num}</span>
    </span>
  );
}
