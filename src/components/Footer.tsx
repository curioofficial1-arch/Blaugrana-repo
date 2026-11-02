import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-xs bg-gradient-to-br from-[#004D98] via-[#A50044] to-[#EDBB00]" />
              <span className="font-athletic text-xl font-bold tracking-wider text-white">
                BARÇA FAN CENTRAL
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              Més que un club · Founded 1899 in Barcelona, Catalonia. The independent digital supporters portal uniting Culers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Matchday & Team
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('matchday')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Spotify Camp Nou Fixtures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('squad')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Culers Squad Ratings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Live League Table & Form
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Community */}
          <div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Radar & Community
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Transfer Radar & Reliability Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('polls')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Weekly Culers Referendums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  The 8-Feature Masterplan
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage Note */}
          <div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Catalan Heritage
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Tots units fem força — United we are strong." Built with passion for the blaugrana colors, honoring Johan Cruyff's philosophy and La Masia's timeless legacy.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Barça Fan Central. Crafted for Culers globally.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-semibold font-athletic tracking-wider uppercase">
              Visca el Barça i Visca Catalunya!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
