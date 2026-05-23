export default function Footer() {
  return (
    <footer className="bg-primary-navy text-white/60 py-8 text-center text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-2">
        <p>&copy; {new Date().getFullYear()} SinoTrade Compliance. All rights reserved.</p>
        <p>Jing'an District, Shanghai, China</p>
        <p>
          <a href="mailto:david@sinotradecompliance.com" className="hover:text-white transition-colors">
            david@sinotradecompliance.com
          </a>
        </p>
        <p className="pt-2">
          <a
            href="https://sinotradecompliance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            sinotradecompliance.com
          </a>
        </p>
      </div>
    </footer>
  );
}
