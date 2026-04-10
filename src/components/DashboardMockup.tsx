import React from 'react';

// ─── Custom CSS injected once ────────────────────────────────────────────────
const dashboardStyles = `
  .dash-glass-panel {
    background: rgba(30, 30, 35, 0.2);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }
  .dash-glass-icon {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
  .dash-bg-grid {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    pointer-events: none;
  }
  .dash-dot {
    position: absolute;
    border-radius: 50%;
    background: #b066ff;
    box-shadow: 0 0 10px #b066ff, 0 0 20px #b066ff;
  }
  .dash-active-row {
    position: absolute;
    left: 48px;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent 0%, rgba(176, 102, 255, 0.8) 80%, rgba(176, 102, 255, 1) 100%);
    box-shadow: 0 0 15px rgba(176, 102, 255, 0.6);
    z-index: 10;
    margin-top: 10px;
  }
  .dash-active-row::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 15px #fff, 0 0 30px #b066ff;
  }
  .dash-bar {
    width: 3px;
    background: rgba(176, 102, 255, 0.4);
    border-radius: 2px;
    margin: 0 2px;
    flex-shrink: 0;
  }
  .dash-bar:nth-child(even) { background: rgba(176, 102, 255, 0.6); }
  .dash-bar:nth-child(3n)   { background: rgba(176, 102, 255, 0.8); }
  .dash-bar-highlight {
    width: 3px;
    border-radius: 2px;
    margin: 0 2px;
    flex-shrink: 0;
    background: #fff;
    box-shadow: 0 0 10px #fff, 0 0 20px #b066ff;
  }
`;

// Deterministic "random" heights so SSR/hydration stay stable
const BAR_HEIGHTS = Array.from({ length: 60 }, (_, i) =>
  ((Math.sin(i * 1.7) + 1) / 2) * 80 + 10
);

const DashboardMockup: React.FC = () => {
  return (
    <>
      <style>{dashboardStyles}</style>

      <div
        className="font-sans antialiased relative w-full"
        style={{ color: 'white' }}
      >
        {/* Background grid */}
        <div className="dash-bg-grid" />

        {/* Floating dots */}
        <div className="dash-dot w-1.5 h-1.5 opacity-60" style={{ top: '25%', left: '25%' }} />
        <div className="dash-dot w-2 h-2 opacity-40" style={{ top: '33%', right: '25%' }} />
        <div className="dash-dot opacity-80" style={{ width: 4, height: 4, bottom: '25%', left: '33%' }} />

        {/* Floating icon cards */}
        <div
          className="dash-glass-icon absolute rounded-2xl p-4 flex items-center justify-center shadow-glow-purple z-20"
          style={{ top: -48, left: '33%', width: 80, height: 96, transform: 'rotate(-12deg)' }}
        >
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>

        <div
          className="dash-glass-icon absolute rounded-2xl p-4 flex items-center justify-center shadow-glow-purple z-20"
          style={{ bottom: -64, left: '25%', width: 96, height: 112, transform: 'rotate(-6deg)' }}
        >
          <svg className="w-12 h-12" style={{ color: '#b066ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>

        <div
          className="dash-glass-icon absolute rounded-2xl p-4 flex items-center justify-center z-20"
          style={{ top: '50%', right: -32, width: 80, height: 96, transform: 'rotate(12deg)', boxShadow: '0 0 20px rgba(74,222,128,0.3)' }}
        >
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>

        <div
          className="dash-glass-icon absolute rounded-2xl p-4 flex items-center justify-center z-20"
          style={{ bottom: -48, right: '33%', width: 80, height: 96, transform: 'rotate(6deg)', boxShadow: '0 0 20px rgba(74,222,128,0.3)' }}
        >
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Main glass panel */}
        <div className="dash-glass-panel rounded-3xl w-full flex flex-col md:flex-row overflow-hidden relative z-10" style={{ minHeight: 600 }}>

          {/* ── Left: File Tree ───────────────────────────────────────────── */}
          <section
            className="w-full md:w-1/2 p-6 flex flex-col relative"
            style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Header placeholder */}
            <div className="rounded-full mb-8" style={{ width: 128, height: 16, background: 'rgba(255,255,255,0.05)' }} />

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {/* Collapsed folder */}
              <div className="flex items-center space-x-3 cursor-pointer group" style={{ color: '#94a3b8' }}>
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
                <div className="rounded-full" style={{ width: 96, height: 12, background: 'rgba(255,255,255,0.05)' }} />
              </div>

              {/* Expanded folder */}
              <div className="ml-6 space-y-3 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center space-x-3 cursor-pointer" style={{ color: '#94a3b8' }}>
                  <svg className="w-4 h-4 opacity-50" style={{ transform: 'rotate(90deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <svg className="w-5 h-5" style={{ color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  <div className="rounded-full" style={{ width: 80, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                </div>

                {/* Active file item */}
                <div className="flex items-center space-x-3 py-2 relative">
                  <svg className="w-5 h-5 relative z-20" style={{ color: '#b066ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  <div className="rounded-full relative z-20" style={{ width: 128, height: 12, background: 'rgba(176,102,255,0.4)' }} />
                  <div className="dash-active-row" />
                </div>

                {/* File items */}
                {[80, 96].map((w, i) => (
                  <div key={i} className="ml-6 flex items-center space-x-3 cursor-pointer py-1" style={{ color: '#94a3b8' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                    <div className="rounded-full" style={{ width: w + 24, height: 12, background: 'rgba(255,255,255,0.05)' }} />
                  </div>
                ))}
              </div>

              {/* Extra folders */}
              {[128, 80].map((w, i) => (
                <div key={i} className="flex items-center space-x-3 cursor-pointer mt-4" style={{ color: '#94a3b8' }}>
                  <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  <div className="rounded-full" style={{ width: w, height: 12, background: 'rgba(255,255,255,0.05)' }} />
                </div>
              ))}
            </div>

            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none rounded-bl-3xl"
              style={{ height: 64, background: 'linear-gradient(to top, rgba(30,30,35,0.8), transparent)' }}
            />
          </section>

          {/* ── Right: Statistics ─────────────────────────────────────────── */}
          <section className="w-full md:w-1/2 p-10 flex flex-col">
            {/* Top stats */}
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-xs tracking-widest mb-1 font-mono uppercase" style={{ color: '#94a3b8', letterSpacing: '0.2em' }}>
                  System Process
                </h3>
                <p className="text-2xl font-light tracking-wide" style={{ color: '#e2e8f0' }}>
                  1.8M Files Processed
                </p>
              </div>
              <div>
                <h3 className="text-xs tracking-widest mb-1 font-mono uppercase" style={{ color: '#94a3b8', letterSpacing: '0.2em' }}>
                  Access Video
                </h3>
                <p className="text-xl font-light tracking-wide" style={{ color: '#e2e8f0' }}>
                  0.03s Query Time
                </p>
              </div>
            </div>

            {/* Bar chart */}
            <div
              className="w-full mb-10 flex items-end pb-2"
              style={{
                height: 96,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                gap: 0,
              }}
            >
              {BAR_HEIGHTS.map((h, i) => {
                const isHighlight = i === 58;
                return isHighlight ? (
                  <div
                    key={i}
                    className="dash-bar-highlight"
                    style={{ height: '100%' }}
                  />
                ) : (
                  <div
                    key={i}
                    className="dash-bar"
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>

            {/* Progress bars */}
            <div className="space-y-6">
              {/* AI Analysis */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm" style={{ color: '#e2e8f0' }}>
                  <span>AI Analysis: <strong>80%</strong></span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full" style={{ width: '80%', background: '#b066ff', boxShadow: '0 0 20px rgba(176,102,255,0.4)' }} />
                </div>
              </div>

              {/* Files Indexed */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm" style={{ color: '#e2e8f0' }}>
                  <span>Files Indexed: <strong>2.1M</strong></span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full" style={{ width: '90%', background: '#b066ff', opacity: 0.8, boxShadow: '0 0 20px rgba(176,102,255,0.4)' }} />
                </div>
              </div>

              {/* Speed indicator */}
              <div className="space-y-2">
                <div className="text-sm" style={{ color: '#e2e8f0' }}>
                  Speed: <strong>0.02s</strong>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#b066ff', boxShadow: '0 0 20px rgba(176,102,255,0.4)' }} />
                  <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashboardMockup;
