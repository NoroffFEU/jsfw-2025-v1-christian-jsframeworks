import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{
        top: 72,
        zIndex: 9999,
      }}
      toastOptions={{
        duration: 3000,
        style: { borderRadius: "12px", padding: "12px" },
        success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
        error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
      }}
    />
  );
}
