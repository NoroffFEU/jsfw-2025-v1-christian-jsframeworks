export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} React Shop • All rights reserved
      </div>
    </footer>
  );
}
