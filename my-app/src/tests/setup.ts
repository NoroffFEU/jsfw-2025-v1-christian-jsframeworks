import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
});
type ToastFn = ((message: string, options?: unknown) => void) & {
  success: (message: string, options?: unknown) => void;
  error: (message: string, options?: unknown) => void;
  dismiss: () => void;
};

vi.mock("react-hot-toast", () => {
  const base = vi.fn((...args: unknown[]) => {
    void args;
  });

  const toast: ToastFn = Object.assign(base, {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  });

  const Toaster = () => null;

  return { default: toast, Toaster };
});
