import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/message/HPPZ5X6XZSMLM1';

const serviceLinks = [
  { name: 'GACC Food Registration', href: '/check/gacc' },
  { name: 'Chinese Label Compliance', href: '/check/label' },
  { name: 'CCC Certification', href: '/check/ccc' },
  { name: 'Cosmetics Filing (NMPA)', href: '/check/cosmetics' },
  { name: 'Cross-border E-commerce', href: '/check/ecommerce' },
  { name: 'Brand Protection', href: '/check/trademark' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-navy py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Compliance Check</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://sinotradecompliance.com/en/services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  All Services
                </a>
              </li>
              <li>
                <a
                  href="https://sinotradecompliance.com/en/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://sinotradecompliance.com/en/packages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="https://sinotradecompliance.com/en/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://sinotradecompliance.com/en/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Compliance Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/check/gacc" className="text-white/70 hover:text-white transition-colors text-sm">
                  GACC Food Check
                </Link>
              </li>
              <li>
                <Link href="/check/ccc" className="text-white/70 hover:text-white transition-colors text-sm">
                  CCC Check
                </Link>
              </li>
              <li>
                <Link href="/check/cosmetics" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cosmetics Check
                </Link>
              </li>
              <li>
                <Link href="/check/ecommerce" className="text-white/70 hover:text-white transition-colors text-sm">
                  E-commerce Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:david@sinotradecompliance.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>david@sinotradecompliance.com</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.032 21.965c-1.717 0-3.396-.355-4.918-1.055l-4.835 1.567 1.586-4.73c-.712-1.517-1.072-3.196-1.072-4.918 0-5.523 4.504-10.029 10.029-10.029 2.687 0 5.207 1.044 7.103 2.942 1.896 1.896 2.94 4.418 2.94 7.106 0 5.524-4.504 10.117-10.833 10.117zm0-18.458c-4.413 0-8.029 3.614-8.029 8.029 0 1.674.496 3.294 1.431 4.666l-.925 2.759 2.848-.924c1.33.839 2.87 1.274 4.45 1.274 4.413 0 8.117-3.614 8.117-8.029 0-2.148-.835-4.165-2.356-5.686s-3.54-2.089-5.536-2.089z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Jing'an District, Shanghai, China</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-white/60 text-sm mb-4">
            &copy; {new Date().getFullYear()} SinoTrade Compliance. All rights reserved.
          </p>
          <p className="text-center text-white/40 text-xs max-w-2xl mx-auto">
            The information provided by this self-check tool is for general informational purposes only and does not constitute professional legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
