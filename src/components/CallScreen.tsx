import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, AlertTriangle, Eye, ShieldAlert, CheckCircle, RefreshCw, Cpu, ScanEye, Terminal, Play, Radio } from 'lucide-react';
import { ScammerTarget } from '../types';

import prettyLady1 from '../assets/images/pretty_lady_1_1780486542257.png';
import unmaskedScammer1 from '../assets/images/unmasked_scammer_1_1780486560885.png';
import prettyLady2 from '../assets/images/pretty_lady_2_1780486577429.png';
import unmaskedScammer2 from '../assets/images/unmasked_scammer_2_1780486594320.png';

export default function CallScreen() {
  const targets: ScammerTarget[] = [
    {
      id: 'target-1',
      name: 'Anna (Singapore/Hong Kong bait)',
      displayAge: 27,
      location: 'Pretending: Singapore Cafe',
      avatarUrl: prettyLady1,
      unmaskedUrl: unmaskedScammer1,
      tactic: 'Intentional Golf wrong-number text. Pivots dialogue to cryptocurrency speculation.',
      fakeIdentityDescription: 'Pretends to be a wealthy model & investment mentor based in Singapore, using an interactive real-time AI filter of an attractive Asian woman.',
      realIdentityDescription: 'Exposed: Chen (23), an exploited worker coerced by a human trafficking cartel inside an industrial cyber-scam compound in Sihanoukville, Cambodia.',
      glitches: [
        'Earring asymmetry glitch (neural model failed to match left/right designs)',
        'Unnatural collarbone edge-jitter during rapid horizontal posture shifts',
        'No micro-blinking or organic pupil dilatations detected over 12 seconds',
        'Incoherent teeth merging during speaking articulation (structural interpolation mismatch)'
      ]
    },
    {
      id: 'target-2',
      name: 'Emily (London Florist bait)',
      displayAge: 29,
      location: 'Pretending: London Studio',
      avatarUrl: prettyLady2,
      unmaskedUrl: unmaskedScammer2,
      tactic: 'Claims wrong number delivery error. Starts flirting and wants to chat on Telegram.',
      fakeIdentityDescription: 'Pretends to be an elegant independent luxury makeup expert and flower shop owner in central London.',
      realIdentityDescription: 'Exposed: Yuri (38), a veteran black-hat social engineering hacker operating from a multi-line scam router vault in an industrial suburb of Kyiv, Ukraine.',
      glitches: [
        'Hair blending artifact (blonde strands unnaturally melting into background walls)',
        'Eyelash tracking misalignment (neural anchor points shifting of 3px from eyelid limits)',
        'Subtle dynamic lighting shadow lag upon hand movements across screen',
        'Synthetically synthesized high-frequency vocal patterns from voice cloning engine'
      ]
    }
  ];

  const [selectedTarget, setSelectedTarget] = useState<ScammerTarget>(targets[0]);
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'active'>('idle');
  const [useScanHUD, setUseScanHUD] = useState(false);
  const [scanningStatus, setScanningStatus] = useState<'scan_off' | 'decrypting' | 'unmasked'>('scan_off');
  const [progressMetric, setProgressMetric] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation loop logs for visual hacker flair without overloading
  useEffect(() => {
    if (callState === 'active') {
      const interval = setInterval(() => {
        if (scanningStatus === 'decrypting') {
          const simulatedLogs = [
            'STABILIZING RAW VIDEO BUFFER...',
            'EXTRACTING COORDINATE FRAME MATRIX...',
            'ALIGNED EYEBALL VECTORS (X: 1.43, Y: -0.89)...',
            'ISOLATING GAN ARTIFACT HIGHLIGHTS...',
            'BYPASSING ROTATED PROXY ENCRYPTORS...',
            'DETERMINING ACTUAL SUBNET IP...'
          ];
          const randomLog = simulatedLogs[Math.floor(Math.random() * simulatedLogs.length)];
          setLogs((prev) => [randomLog, ...prev.slice(0, 5)]);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [callState, scanningStatus]);

  // Handle the unmask decryption progress countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (scanningStatus === 'decrypting') {
      if (progressMetric < 100) {
        timer = setTimeout(() => {
          setProgressMetric((prev) => prev + 10);
        }, 300);
      } else {
        setScanningStatus('unmasked');
        setLogs((prev) => ['RAW FACIAL STRUCT EXPOSED SECURELY', 'DEEPFAKE FILTER REMOVED', ...prev]);
      }
    }
    return () => clearTimeout(timer);
  }, [scanningStatus, progressMetric]);

  const startCallTrigger = () => {
    setCallState('ringing');
    setScanningStatus('scan_off');
    setProgressMetric(0);
    setUseScanHUD(false);
    setLogs(['Awaiting call validation...', 'Inbound stream requested via spoofed node']);
  };

  const acceptCall = () => {
    setCallState('active');
    setLogs(['Call accepted. Network connected: 4G LTE/SD', 'Analyzing metadata...']);
  };

  const declineHandup = () => {
    setCallState('idle');
    setScanningStatus('scan_off');
    setProgressMetric(0);
  };

  const triggerUnmaskScanner = () => {
    setScanningStatus('decrypting');
    setProgressMetric(0);
    setLogs(['Initializing unmask decrypters...', 'Deploying facial thermal vector reverse algorithm']);
  };

  return (
    <div className="space-y-6" id="call-sandbox-container">
      {/* Intro info box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="call-intro">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ScanEye className="w-5 h-5 text-red-400 animate-pulse" />
          Neural Call Guardianship Sandbox
        </h2>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
          Interactive simulator replicating how cybercriminals hijack real-time video calls with beautiful AI female filters. Test realtime threat artifact overlays and trigger direct security decounters to unmask and view scammers on their actual live terminals.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="call-grid-layout">
        
        {/* Left column Config parameters */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Configure Scam Target Profile
            </h3>

            <div className="space-y-2">
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTarget(t);
                    setCallState('idle');
                    setScanningStatus('scan_off');
                  }}
                  disabled={callState !== 'idle'}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between cursor-pointer ${selectedTarget.id === t.id ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-300'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.location}</p>
                  </div>
                  <CheckCircle className={`w-4 h-4 ${selectedTarget.id === t.id ? 'text-indigo-400' : 'text-slate-700'}`} />
                </button>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block">
                Staged Bait Tactic Instructions
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-3 rounded border border-slate-800/60">
                {selectedTarget.tactic}
              </p>
            </div>

            {callState === 'idle' && (
              <button
                onClick={startCallTrigger}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 rounded-lg border border-emerald-500/30 text-sm font-semibold transition-all shadow-md cursor-pointer animate-pulse"
                id="spawn-call-btn"
              >
                <Radio className="w-4 h-4" />
                Trigger Simulated Inbound Call
              </button>
            )}
          </div>
        </div>

        {/* Right column Mobile Screen & HUD Feed */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-10 gap-6">
          
          {/* Main Visual Call Frame Simulator */}
          <div className="md:col-span-6 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden h-[540px] w-full max-w-[310px] relative flex flex-col justify-between shadow-2xl mx-auto" id="mobile-call-screen">
            
            {/* Simulation Header */}
            <div className="p-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  {callState === 'idle' ? 'STANDBY' : callState === 'ringing' ? 'INCOMING INTERCEPT' : 'ENCRYPTED OVERRIDE LIVE'}
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">FPS: 24 | LAT: ~42ms</div>
            </div>

            {/* Simulated Live Viewport Area */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900" id="video-feed-viewport">
              
              {/* Idle standby mode screen */}
              {callState === 'idle' && (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-600">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">Call Sandbox Standby</p>
                    <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                      Select a setup profile on the left and tap "Simulate Inbound Call" to experience the guardian interface.
                    </p>
                  </div>
                </div>
              )}

              {/* Ringing screen mode */}
              {callState === 'ringing' && (
                <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                  <div className="absolute top-1/4 animate-bounce">
                    <img 
                      src={selectedTarget.avatarUrl} 
                      alt="caller profile" 
                      className="w-28 h-28 rounded-full border-4 border-emerald-500/80 object-cover shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-1.5 mt-20">
                    <p className="text-xl font-bold text-white font-sans">{selectedTarget.name.split(' ')[0]}</p>
                    <p className="text-xs text-slate-400 tracking-wider font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Incoming Video Call...
                    </p>
                  </div>

                  {/* Ringing waves interactive */}
                  <div className="absolute bottom-1/4 flex gap-8 items-center justify-center">
                    <button 
                      onClick={declineHandup}
                      className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={acceptCall}
                      className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 animate-pulse"
                    >
                      <Phone className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              {/* Active Call screen view */}
              {callState === 'active' && (
                <div className="w-full h-full relative" id="active-call-viewport-inner">
                  
                  {/* Background Live stream image: either lady avatar or unmasked operator */}
                  <img 
                    src={scanningStatus === 'unmasked' ? selectedTarget.unmaskedUrl : selectedTarget.avatarUrl} 
                    alt="active feed" 
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dynamic Glowing scanning laser bar */}
                  {scanningStatus === 'decrypting' && (
                    <div className="absolute left-0 w-full h-1.5 bg-cyan-400/90 shadow-[0_0_15px_#22d3ee] animate-pulse z-10" style={{
                      animation: 'scanBarMotion 1.5s infinite linear',
                      top: `${progressMetric}%`
                    }}></div>
                  )}

                  {/* Scan overlay HUD boundaries (Glitch inspectors) */}
                  {useScanHUD && scanningStatus !== 'unmasked' && (
                    <div className="absolute inset-0 z-10 pointer-events-none border-2 border-red-500/40" id="glitch-hud-view">
                      
                      {/* Interactive face scanner tracking metrics box */}
                      <div className="absolute top-1/4 left-1/4 w-28 h-28 border-2 border-dashed border-red-400/70 border-spacing-2 animate-pulse flex items-center justify-center">
                        <span className="text-[8px] bg-red-500/80 text-white px-1 absolute top-0 font-mono tracking-widest uppercase">
                          AI MATCHING: 98.4%
                        </span>
                      </div>
                      
                      {/* Random scanner tags pointing around */}
                      <div className="absolute top-[52%] right-[15%] flex flex-col items-end text-[8px] font-mono bg-slate-950/80 px-2 py-1 leading-normal text-red-400 tracking-wider rounded border border-red-500/30">
                        <span>EYE REFLECTION: INCONSISTENT</span>
                        <span>DEPTH ERROR PINNED</span>
                      </div>

                      <div className="absolute bottom-[35%] left-[10%] flex flex-col text-[8px] font-mono bg-slate-950/80 px-2 py-1 leading-normal text-red-400 tracking-wider rounded border border-red-500/30">
                        <span>CHIN RENDER GLITCH</span>
                        <span>BLUR ANOMALY</span>
                      </div>
                    </div>
                  )}

                  {/* Decrypted expose banner */}
                  {scanningStatus === 'unmasked' && (
                    <div className="absolute inset-x-3 top-4 z-20 bg-red-600/90 border border-red-500 text-white px-3 py-2 text-center rounded-lg shadow-lg font-mono text-[10px] tracking-wider uppercase font-extrabold animate-pulse">
                      🚨 BIOPROXY EXPOSED: FRAUD IDENTIFIED
                    </div>
                  )}

                  {/* Bottom Action controllers inside call */}
                  <div className="absolute bottom-4 inset-x-4 flex flex-col gap-3 z-20 bg-slate-950/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-900">
                    
                    {scanningStatus === 'scan_off' && (
                      <button
                        onClick={triggerUnmaskScanner}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 rounded-xl border border-red-500/30 text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all"
                        id="unmask-scan-trigger"
                      >
                        <Cpu className="w-4 h-4" />
                        Expose Real Face (Override Video)
                      </button>
                    )}

                    {scanningStatus === 'decrypting' && (
                      <div className="w-full space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400">
                          <span>UNREELING DEEPFAKE BUFFER...</span>
                          <span>{progressMetric}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progressMetric}%` }} />
                        </div>
                      </div>
                    )}

                    {scanningStatus === 'unmasked' && (
                      <button
                        onClick={() => {
                          setScanningStatus('scan_off');
                          setProgressMetric(0);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 py-2 rounded-xl text-xs font-semibold cursor-pointer border border-slate-800"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset Interceptor Feed
                      </button>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-900 pt-2.5">
                      <button 
                        onClick={() => setUseScanHUD(!useScanHUD)}
                        disabled={scanningStatus === 'unmasked'}
                        className={`text-[10px] font-mono px-3 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800 flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {useScanHUD ? 'Hide HUD' : 'Visual HUD Overlay'}
                      </button>

                      <button 
                        onClick={declineHandup}
                        className="p-2 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow hover:bg-red-700"
                        title="Hang Up Call"
                      >
                        <PhoneOff className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side Inspector analysis detail and dynamic logs dashboard */}
          <div className="md:col-span-4 space-y-4">
            
            {/* Real Identity breakdown once unmasked */}
            {callState === 'active' && scanningStatus === 'unmasked' && (
              <div className="bg-slate-900 border border-red-500/30 rounded-xl p-4 space-y-3 animate-fade-in" id="identity-disclosure-card">
                <div className="flex items-center gap-2 text-red-400 pb-1.5 border-b border-slate-800">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Unmasked Profile Report</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">FAKE TARGET BRANDING:</span>
                    <span className="text-slate-300 font-sans">{selectedTarget.fakeIdentityDescription}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">REAL DETECTED CORRESPONDENT:</span>
                    <span className="text-red-400 font-sans font-semibold leading-relaxed block">
                      {selectedTarget.realIdentityDescription}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2 rounded border border-slate-800/80">
                  <p className="text-[10px] text-slate-400 font-sans font-medium">
                    🔍 <strong className="text-slate-200">How the "unmasking" engine executes:</strong> In real situations, mobile guardians bypass spoofed IP addresses and decrypt the stream metadata, calculating inconsistencies in ambient frequencies and identifying coordinate camera stream delays to match known boiler-room routing grids.
                  </p>
                </div>
              </div>
            )}

            {/* AI Deepfake Glitches detected overview */}
            {callState === 'active' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-300">Live Synthesis Anomalies</span>
                </div>
                <div className="space-y-2">
                  {selectedTarget.glitches.map((gl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-2 rounded">
                      <span className="text-red-400 font-bold">&#8226;</span>
                      <span>{gl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Console logs output */}
            {callState === 'active' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>GUARDIAN TERMINAL STREAM</span>
                </div>
                <div className="bg-slate-950 border border-slate-900 p-2.5 rounded h-32 overflow-y-auto space-y-1">
                  {logs.map((log, idx) => (
                    <p key={idx} className={`${log.startsWith('RAW') || log.startsWith('🚨') ? 'text-red-400 font-bold' : log.includes('EXPOSED') ? 'text-orange-400' : 'text-slate-500'}`}>
                      &gt; {log}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {callState === 'idle' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center text-slate-500 py-12 space-y-3">
                <Radio className="w-8 h-8 text-slate-700 mx-auto animate-pulse" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold">Decrypter Module Standby</p>
                  <p className="text-[10px] max-w-[200px] mx-auto leading-relaxed">
                    Once an active call begins, real-time biometrics, visual jitter, and terminal tracing feeds will initialize here.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
      
      {/* Styles added injection for the laser scanning animation */}
      <style>{`
        @keyframes scanBarMotion {
          0% { top: 0%; }
          50% { top: 80%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}
