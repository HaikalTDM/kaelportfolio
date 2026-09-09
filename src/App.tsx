import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroWork from './components/HeroWork';
import About from './components/About';
import Footer from './components/Footer';
import EnquiryDialog from './components/EnquiryDialog';
import { useLenis } from './lib/scroll';

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  useLenis();

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="min-h-screen bg-void relative overflow-x-clip">
      {/* Ambient cursor spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 120, 91, 0.04), transparent 80%)`,
        }}
      />

      <div id="top" />
      <Header onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <HeroWork onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <About />
      <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <EnquiryDialog isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </main>
  );
}
