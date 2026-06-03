import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, MessageSquare, PhoneCall, HelpCircle, AlertCircle, FileText, Activity, Smartphone } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MessageScanner from './components/MessageScanner';
import CallScreen from './components/CallScreen';
import FlutterIntegration from './components/FlutterIntegration';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'call' | 'flutter'>('dashboard');

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#070b13] text-slate-100 flex flex-col font-sans" id="app-root-container">
      {/* Upper Navigation Header */}
      <header className="bg-slate-950 border-b border-slate-900 sticky top-0 z-50 px-4 py-3 md:px-6 shadow-md" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl border border-blue-400/20 text-white shadow-lg shadow-indigo-500/10">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white font-sans">ScamShield Guard</span>
                <span className="text-[9px] font-mono tracking-wider font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                  v2.8-AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">NEURAL IMPOSTOR BYPASS & TEXT DISINFECTOR</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 font-mono">Intercept Core: Active</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Core Viewport Tab controls */}
      <div className="bg-slate-950/40 border-b border-slate-900 sticky top-[57px] z-40 overflow-hidden" id="tabs-header">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 px-4 md:px-6 overflow-x-auto scrollbar-none flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] md:text-xs font-semibold tracking-wider uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${activeTab === 'dashboard' ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' : 'bg-transparent border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            <Activity className="w-3.5 h-3.5" />
            Security Center
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] md:text-xs font-semibold tracking-wider uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${activeTab === 'scanner' ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' : 'bg-transparent border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200'}`}
            id="tab-scanner-btn"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Pattern Scanner
          </button>
          <button
            onClick={() => setActiveTab('call')}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] md:text-xs font-semibold tracking-wider uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${activeTab === 'call' ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' : 'bg-transparent border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200'}`}
            id="tab-call-btn"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Call Decrypter Simulator
          </button>
          <button
            onClick={() => setActiveTab('flutter')}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] md:text-xs font-semibold tracking-wider uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${activeTab === 'flutter' ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' : 'bg-transparent border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200'}`}
            id="tab-flutter-btn"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Flutter SDK Setup
          </button>
        </div>
      </div>

      {/* Real Screen Render content viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 space-y-6" id="main-content-area">
        {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} activeTab={activeTab} />}
        {activeTab === 'scanner' && <MessageScanner />}
        {activeTab === 'call' && <CallScreen />}
        {activeTab === 'flutter' && <FlutterIntegration />}

        {/* Informative Security Guideline Box to educate user on actual scam centers */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 mt-8" id="scam-education-block">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Scam Center Defensive Intelligence Program
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <span className="p-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-mono font-bold shrink-0">1</span>
                <div>
                  <h4 className="font-semibold text-slate-300 font-sans">The "Lost Message" Inoculation Test</h4>
                  <p className="mt-1">
                    Scammers deliberately draft friendly wrong-number greetings (mentioning golf matches, travel events, business plans). If you reply politely, they pivot the text into a conversation to build trust. Always block unknown contacts who suggest migrating to Telegram or WhatsApp.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="p-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-mono font-bold shrink-0">2</span>
                <div>
                  <h4 className="font-semibold text-slate-300 font-sans">Isolating Interactive Voice & Video Deepfakes</h4>
                  <p className="mt-1">
                    If you accept video calls on social apps, scammers use generative apps (e.g. changing dynamic photo parameters to real-time streams) to mimic models. Look carefully for eye alignment, asymmetric ear accessories, blinking pauses, and background border glitches where the fake filter separates.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <span className="p-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-mono font-bold shrink-0">3</span>
                <div>
                  <h4 className="font-semibold text-slate-300 font-sans">Exposing and Revealing Real Faces</h4>
                  <p className="mt-1">
                    If a contact refuses the request to show a specific finger motion during calls (e.g. holding three fingers near the cheek), the filter immediately breaks. Modern guardian applications intercept face mesh coordinates to track synthetic interpolations, exposing operators based in black-hat facilities.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-semibold text-slate-300">National Fraud Reporting Directives</h5>
                  <p className="text-[11px] leading-relaxed">
                    If you identify suspicious messaging patterns or believe a video feed is being synthesised, report terminal numbers and screenshots directly to the <strong className="text-slate-200">Anti-Phishing Working Group (APWG)</strong> or your local regulatory telecommunications authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 px-4 py-6 text-center text-xs text-slate-600 mt-auto" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans">
            ScamShield AI &copy; 2026. Designed to simulate defensive mobile guard systems against pig-butchering and video synthetic spoofing.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
            <span className="hover:text-slate-400 cursor-pointer">Biometric Analysis API</span>
            <span className="hover:text-slate-400 cursor-pointer">Ethics & Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
