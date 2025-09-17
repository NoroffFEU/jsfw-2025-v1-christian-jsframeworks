export default function Footer() {
  return (
    <footer className="mt-10 bg-[#D9BEBF]">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-[#333333]">
        © {new Date().getFullYear()} React Shop • All rights reserved
      </div>
    </footer>
  );
}
