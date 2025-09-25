import Spinner from "./Spinner";

type Props = {
  active: boolean;
  label?: string;
  fullScreen?: boolean;
  className?: string;
};

export default function PageLoader({
  active,
  label = "Loading…",
  fullScreen = true,
  className = "",
}: Props) {
  if (!active) return null;
  return (
    <div
      className={`${
        fullScreen ? "fixed" : "absolute"
      } inset-0 z-50 grid place-items-center
                  bg-white/80 backdrop-blur-sm ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Spinner size="lg" label={label} />
    </div>
  );
}
