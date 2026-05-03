import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductMockup from './components/ProductMockup';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CtaSection from './components/CtaSection';
import PaymentSuccess from './components/PaymentSuccess';
import SignUpSuccess from './components/SignUpSuccess';
import ResetPassword from './components/ResetPassword';
import SecretResetPassword from './components/SecretResetPassword';
import BlogIndex from './components/BlogIndex';

function Home() {
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
          <HowItWorks />
        </main>
      </div>

      <CtaSection />

      <footer style={{ marginTop: '100px', borderTop: '1px solid var(--border-light)', padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/privacy.html" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Privacy Policy</a>
            <a href="/pricing.html" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Pricing</a>
          </div>
          <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Filect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/secret-reset-password" element={<SecretResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
