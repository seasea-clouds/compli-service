import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary-navy text-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg hover:text-gold transition-colors">
          &#x1F50D; Compliance Self-Check
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="hover:text-gold transition-colors">
            Pricing
          </Link>
          <a
            href="https://sinotradecompliance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors text-xs"
          >
            &larr; Main Site
          </a>
        </nav>
      </div>
    </header>
  );
}
