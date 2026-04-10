import Header from './components/Header';
import Hero from './components/Hero';
import ProductMockup from './components/ProductMockup';
import Features from './components/Features';
import CtaSection from './components/CtaSection';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Background ambient glows */}
      <div className="glow-bg" style={{ top: '-10%', left: '-10%', width: '800px', height: '800px' }}></div>
      <div className="glow-bg" style={{ top: '20%', right: '-20%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(178, 139, 255, 0.1) 0%, rgba(5, 5, 8, 0) 60%)' }}></div>
      <div className="glow-bg" style={{ bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, rgba(5, 5, 8, 0) 60%)' }}></div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Header />
        
        <main>
          <Hero />
          <ProductMockup />
          <Features />
        </main>
      </div>

      <CtaSection />

      <footer style={{ marginTop: '100px', borderTop: '1px solid var(--border-light)', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} Lumina. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
