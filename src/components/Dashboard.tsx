import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, PhoneCall, MessageSquareQuote, Shield, ShieldAlert, BadgeInfo, Cpu, Eye, TrendingUp, XCircle, Activity, Terminal, ArrowUpRight, X, ShieldAlert as ShieldX, Check, Settings, Sliders } from 'lucide-react';
import ThreatHistoryLog from './ThreatHistoryLog';

interface DashboardProps {
  onNavigate: (tab: 'dashboard' | 'scanner' | 'call' | 'flutter') => void;
  activeTab: string;
}

export default function Dashboard({ onNavigate, activeTab }: DashboardProps) {
  // Notification rules and threat alerting configuration state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [configSettings, setConfigSettings] = useState({
    suspiciousLinks: true,
    senderFrequency: true,
    deepfakeMarker: true,
    wrongNumberBait: true,
    autoShieldLock: false,
    deepfakeThreshold: 85
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveConfig = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsConfigOpen(false);
    }, 1200);
  };

  // Real-time security alerts based on actual scam trends discussed by the user's scam center friend
  const securityAlerts = [
    {
      id: '1',
      title: 'Active Tactic: "False Serendipity" SMS Lure',
      description: 'Incoming messages showing polite "wrong number" queries targeting names like "Sarah", "Dr. John", or "Anna" seeking transition to private channels (WhatsApp, Line, Telegram).',
      severity: 'high',
      metric: '92% Scam Match'
    },
    {
      id: '2',
      title: 'Deepfake Call Campaigns on Telegram',
      description: 'Scam centers are utilizing advanced video-translation apps to project highly interactive blonde & Asian face filters to mimic real-time video feeds during video chats.',
      severity: 'critical',
      metric: 'Unmask Overrides Activated'
    },
    {
      id: '3',
      title: 'Fake Financial Advisors',
      description: 'Impersonators seeking investment in cryptocurrency with pretexts of mutual interests discussed in previous wrong-number chit-chat.',
      severity: 'medium',
      metric: 'Pig-Butchering Shield Ready'
    }
  ];

  // Dynamic state simulation for metrics and micro trend graph
  const [blockedCount, setBlockedCount] = useState(1482);
  const [threatLevel, setThreatLevel] = useState<'CRITICAL' | 'ELEVATED' | 'STABLE'>('ELEVATED');
  const [interceptionLogs, setInterceptionLogs] = useState<string[]>([
    'Intercepted pig-butchering wrong number from block +1 (415) 890-XXXX',
    'Flagged Telegram Deepfake video invite routing from Ukraine Proxy ID 722',
    'Unmasked VoIP caller signature: Match found in Sihanoukville compound registry',
    'Silenced WhatsApp bot campaign: Blocked 24 spam packets',
  ]);

  // Alert Overlay States
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState<'unresolved' | 'blocked'>('unresolved');
  const [overlayData, setOverlayData] = useState({
    sender: '+1 (323) 987-0133',
    message: 'Hey Sarah! We still on for golf lessons this Friday or did I get the wrong number again? 😊',
    type: 'Wrong-Number Pretext / Pig-Butchering Lure',
    probability: '99.4% Critical Match'
  });

  // Automatically trigger overlay after 4 seconds
  useEffect(() => {
    const overlayTimeout = setTimeout(() => {
      setIsOverlayOpen(true);
      setOverlayStatus('unresolved');
    }, 4000);

    return () => clearTimeout(overlayTimeout);
  }, []);

  // Simulate a fresh interactive overlay trigger at will
  const triggerFreshOverlay = () => {
    const candidates = [
      {
        sender: '+1 (646) 554-9022',
        message: 'Hello, is this Dr. John? I am Emily, the assistant. I wanted to verify your flower basket delivery status...',
        type: 'Delivery Incident Pretext / Identity Cultivation',
        probability: '97.2% High Match'
      },
      {
        sender: '+44 7911 123456',
        message: 'Hi Anna, sorry to bother you! My aunt said you might be interested in the Singapore Crypto Summit tomorrow?',
        type: 'Investment Solicit / Pump-and-Dump bait',
        probability: '98.9% Critical Match'
      },
      {
        sender: '+1 (415) 880-1102',
        message: 'Is this the interior designer from Pinterest? I got your contact from my uncle, we talked about remodeling.',
        type: 'Serendipity Wrong-Number Cultivation',
        probability: '95.8% High Match'
      }
    ];

    const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
    setOverlayData(randomCandidate);
    setOverlayStatus('unresolved');
    setIsOverlayOpen(true);
  };

  const handleBlockAction = () => {
    // Increment the blocker core counter
    setBlockedCount(prev => prev + 1);
    setOverlayStatus('blocked');
    
    // Add to logs immediately
    setInterceptionLogs(prev => [
      `[${new Date().toLocaleTimeString()}] BLOCKED & SILENCED: Target ${overlayData.sender} registered to global firewalls`,
      ...prev.slice(0, 4)
    ]);

    // Toast confirmation remains visible for a moment then auto slides away
    setTimeout(() => {
      setIsOverlayOpen(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Increment blocked count mock-realistically
      setBlockedCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
      
      // Randomly cycle threat level based on active spikes
      if (Math.random() > 0.85) {
        setThreatLevel((prev) => prev === 'CRITICAL' ? 'ELEVATED' : 'CRITICAL');
      }

      // Prepend dynamic network logs matching genuine fraud tactics
      if (Math.random() > 0.8) {
        const fakeLogs = [
          'Scanned incoming SMS payload: Flagged polite Wrong-Number Pretext',
          'Deepfake video filter mismatch caught on WebRTC canvas frame',
          'Asymmetry glitch extracted: Right-eye anchor point tracking lag 4px',
          'Interceded active VoIP link to fraudulent Line account @mentor_anna',
          'Blocked Discord crypto lottery redirection script',
        ];
        const randomLog = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
        setInterceptionLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] ${randomLog}`,
          ...prev.slice(0, 4)
        ]);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 relative" id="dashboard-container">
      
      {/* Real-time Alert Overlay Modal Indicator */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fade-in" id="alert-overlay">
          <div className="bg-slate-900 border-2 border-red-500/80 rounded-2xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(239,68,68,0.35)] relative overflow-hidden transform scale-100 transition-all">
            
            {/* Ambient Red Alert background blink */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldX className="w-5 h-5 text-red-500 animate-bounce" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                  Phishing Threat Caught Live
                </span>
              </div>
              <button 
                onClick={() => setIsOverlayOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {overlayStatus === 'unresolved' ? (
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-800 font-mono text-xs text-left text-slate-300">
                  <div className="text-[10px] text-slate-500 mb-1 border-b border-slate-900 pb-1 flex justify-between">
                    <span>FROM: {overlayData.sender}</span>
                    <span className="text-red-400 text-[9px] font-bold">{overlayData.probability}</span>
                  </div>
                  <p className="italic text-slate-200">"{overlayData.message}"</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Identified Signature</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded inline-block">
                    {overlayData.type}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-normal">
                  ScamShield AI analyzed this as a typical preliminary pig-butchering approach. Do not reply or click links.
                </p>

                <div className="flex gap-2.5 pt-2">
                  <button 
                    onClick={() => setIsOverlayOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-all border border-slate-700/60"
                  >
                    Ignore Lure
                  </button>
                  <button 
                    onClick={handleBlockAction}
                    className="flex-1 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white cursor-pointer transition-all border border-red-500 shadow-lg shadow-red-500/25 flex items-center justify-center gap-1.5 active:scale-95"
                    id="overlay-block-btn"
                  >
                    <XCircle className="w-4 h-4" />
                    Block Source Immediately
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/40 mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Source Blocked & Reported!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Sender IP mapped to known compound routing hubs. Logs reported to international carrier blacklist. Interception count incremented!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Settings Configuration Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fade-in" id="settings-modal">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-[0_0_50px_rgba(79,70,229,0.25)] relative overflow-hidden transform scale-100 transition-all">
            
            {/* Ambient Accent indicator line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                <h3 className="text-base font-bold text-white tracking-tight">Notification & Alert Guard Rules</h3>
              </div>
              <button 
                onClick={() => setIsConfigOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Configure ScamShield's deep classifier neural filters to regulate how alerts are triggered on your devices.
              </p>

              {/* Toggle List */}
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                {/* 1. Suspicious Link Extraction */}
                <div className="flex items-start justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/60">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-slate-200 block">Phishing Link Extraction</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Instantly parses message payloads for unverified URL shorteners or dynamic redirection domains.
                    </span>
                  </div>
                  <button 
                    onClick={() => setConfigSettings(prev => ({ ...prev, suspiciousLinks: !prev.suspiciousLinks }))}
                    className="cursor-pointer text-indigo-400 self-center focus:outline-none"
                    type="button"
                  >
                    {configSettings.suspiciousLinks ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full p-0.5 transition-all flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-9 h-5 bg-slate-800 rounded-full p-0.5 transition-all flex justify-start">
                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 2. Frequency Burst Anomaly Tracker */}
                <div className="flex items-start justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/60">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-slate-200 block">Unknown Sender Frequencies</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Flags multiple consecutive contact attempts or bots blasting VoIP grids.
                    </span>
                  </div>
                  <button 
                    onClick={() => setConfigSettings(prev => ({ ...prev, senderFrequency: !prev.senderFrequency }))}
                    className="cursor-pointer text-indigo-400 self-center focus:outline-none"
                    type="button"
                  >
                    {configSettings.senderFrequency ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full p-0.5 transition-all flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-9 h-5 bg-slate-800 rounded-full p-0.5 transition-all flex justify-start">
                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 3. Deepfake Visual Discrepancies */}
                <div className="flex items-start justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/60">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-slate-200 block">Deepfake Probability Markers</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Scan real-time call telemetry for alignment asymmetries, synthetics, and eye tracking lag.
                    </span>
                  </div>
                  <button 
                    onClick={() => setConfigSettings(prev => ({ ...prev, deepfakeMarker: !prev.deepfakeMarker }))}
                    className="cursor-pointer text-indigo-400 self-center focus:outline-none"
                    type="button"
                  >
                    {configSettings.deepfakeMarker ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full p-0.5 transition-all flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-9 h-5 bg-slate-800 rounded-full p-0.5 transition-all flex justify-start">
                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 4. Wrong-Number Conversational Bait */}
                <div className="flex items-start justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/60">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-slate-200 block">Wrong-Number Conversational Bait</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Detect polite "Serendipity" wrong-digit pretests that suggest migrating to Skype/WhatsApp.
                    </span>
                  </div>
                  <button 
                    onClick={() => setConfigSettings(prev => ({ ...prev, wrongNumberBait: !prev.wrongNumberBait }))}
                    className="cursor-pointer text-indigo-400 self-center focus:outline-none"
                    type="button"
                  >
                    {configSettings.wrongNumberBait ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full p-0.5 transition-all flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-9 h-5 bg-slate-800 rounded-full p-0.5 transition-all flex justify-start">
                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 5. Autoshield Network Blocklist */}
                <div className="flex items-start justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/60">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-slate-200 block">Asynchronous Auto-Blocklist</span>
                    <span className="text-[10px] text-slate-500 block leading-normal">
                      Automatically registers confirmed malicious actors to the local phone's system firewalls.
                    </span>
                  </div>
                  <button 
                    onClick={() => setConfigSettings(prev => ({ ...prev, autoShieldLock: !prev.autoShieldLock }))}
                    className="cursor-pointer text-indigo-400 self-center focus:outline-none"
                    type="button"
                  >
                    {configSettings.autoShieldLock ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full p-0.5 transition-all flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-9 h-5 bg-slate-800 rounded-full p-0.5 transition-all flex justify-start">
                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* 6. Threshold Slider */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-200 block">Deepfake Overlay Sensitivity</span>
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded">
                      {configSettings.deepfakeThreshold}% threshold
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    value={configSettings.deepfakeThreshold}
                    onChange={(e) => setConfigSettings(prev => ({ ...prev, deepfakeThreshold: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-500 block leading-tight">
                    Lower percentages flag matches faster but may trigger alerts on natural poor lighting conditions.
                  </span>
                </div>
              </div>

              {/* Action buttons with status indicator */}
              <div className="border-t border-slate-800 pt-4 flex gap-3">
                <button 
                  onClick={() => setIsConfigOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer transition-all border border-slate-700"
                  type="button"
                >
                  Discard Changes
                </button>
                <button 
                  onClick={handleSaveConfig}
                  className="flex-grow py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs cursor-pointer transition-all border border-indigo-500 flex items-center justify-center gap-1.5 shadow-md"
                  type="button"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 animate-pulse" />
                      Rules Updated!
                    </>
                  ) : (
                    <>
                      <Sliders className="w-3.5 h-3.5" />
                      Save Threat Criteria
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Hero Shield Indicator */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 rounded-2xl p-6 border border-blue-500/20 shadow-xl relative overflow-hidden" id="hero-shield">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              SECURE PHONE PROTECTION ENGAGED
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
              ScamShield AI Mobile Guardian
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Equipped with deep learning classifiers to detect fake videostream impersonators, wrong-number pretext messages, and unmask fraudulent actors back to their actual biometric origins.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center min-w-[190px] gap-2">
             <button 
                onClick={triggerFreshOverlay}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.97]"
                title="Manually simulate a live alert popup"
             >
               <ShieldAlert className="w-3.5 h-3.5" />
               Simulate Threat
             </button>
             <button 
                onClick={() => setIsConfigOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 hover:border-indigo-500/50 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.97]"
                title="Configure alert triggers and threat notifications"
             >
               <Settings className="w-3.5 h-3.5 text-indigo-400 hover:rotate-45 transition-transform" />
               Configure Alerts
             </button>
            <div className="pt-1 w-full border-t border-slate-800/80 mt-1">
              <span className="text-[10px] text-slate-400 font-mono block">System Integrity</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">100% SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Summary: Threat level, count, trend sparkline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" id="realtime-metrics-grid">
        {/* Metric 1: Threat Level */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Network Threat Index</span>
              <Activity className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold font-mono tracking-tight ${threatLevel === 'CRITICAL' ? 'text-red-500' : 'text-amber-400'}`}>
                {threatLevel}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Spreading Radar</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-2">
              Spikes detected in regional bot clusters mimicking Singapore residential profiles over Line messenger grids.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
            <span>Scan Frequency: 1.4s</span>
            <span className="text-red-400 py-0.5 px-2 bg-red-400/10 rounded font-mono font-extrabold uppercase animate-pulse">
              Active Warning
            </span>
          </div>
        </div>

        {/* Metric 2: Blocks count + Micro Trend sparkline */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Intercepted Fraud Lures</span>
              <XCircle className="w-4 h-4 text-red-300" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {blockedCount.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                +14% hr
              </span>
            </div>
          </div>

          {/* SVG Sparkline chart */}
          <div className="h-12 w-full mt-4 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid guide line */}
              <line x1="0" y1="15" x2="100" y2="15" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
              {/* Path line */}
              <path
                d="M 0 25 Q 15 22 25 20 T 50 12 T 75 14 T 100 2"
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Closed area gradient */}
              <path
                d="M 0 25 Q 15 22 25 20 T 50 12 T 75 14 T 100 2 L 100 30 L 0 30 Z"
                fill="url(#chartGradient)"
              />
            </svg>
          </div>

          <div className="mt-2 text-[10px] text-slate-500 font-mono flex justify-between">
            <span>7 Hours Ago</span>
            <span>Live Scan Trend</span>
          </div>
        </div>

        {/* Metric 3: Recent Interception Log Stream */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Telemetry Scammer Logs</span>
              <Terminal className="w-4 h-4 text-slate-500" />
            </div>
            {/* Terminal output window list */}
            <div className="rounded bg-slate-950 p-2.5 h-[76px] overflow-hidden border border-slate-900 space-y-2 text-[9px] font-mono font-medium text-slate-400 animate-pulse">
              {interceptionLogs.map((log, index) => (
                <div key={index} className="truncate select-none leading-none">
                  <span className="text-red-400 font-black mr-1">&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>Terminal Core Standard: v2.8</span>
            <span className="text-[10px] text-indigo-400 font-mono font-bold flex items-center gap-0.5 cursor-pointer hover:underline" onClick={() => onNavigate('scanner')}>
              Open Shell <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Defensive Core Features Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="bento-grid">
        {/* Deepfake Unmasking Sandbox Launcher */}
        <div 
          onClick={() => onNavigate('call')}
          className="group bg-slate-900 hover:bg-slate-900/80 cursor-pointer rounded-xl p-5 border border-slate-800 hover:border-blue-500/30 transition-all shadow-md flex flex-col justify-between"
          id="feature-unmask"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-red-500/15 rounded-xl border border-red-500/30 text-red-400">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono bg-red-500/10 px-2 py-0.5 rounded text-red-400 font-semibold uppercase tracking-wider">
                Override active
              </span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                Deepfake Call sandbox & Unmasker
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Simulate a Telegram or WhatsApp call from a fake profile character. Test scanning anomalies and engage raw decrypters to expose true scammers behind video masks.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-3">
            <span>Simulate Live Incoming Call</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
        </div>

        {/* Message Tactic Scanner Launcher */}
        <div 
          onClick={() => onNavigate('scanner')}
          className="group bg-slate-900 hover:bg-slate-900/80 cursor-pointer rounded-xl p-5 border border-slate-800 hover:border-blue-500/30 transition-all shadow-md flex flex-col justify-between"
          id="feature-scanner"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-indigo-500/15 rounded-xl border border-indigo-500/30 text-indigo-400">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono bg-indigo-500/10 px-2 py-0.5 rounded text-indigo-400 font-semibold uppercase tracking-wider">
                AI Pattern Engine
              </span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                SMS Wrong-Number Pattern Scanner
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Paste suspicious incoming messages or test our preset pig-butchering scripts. Analyzed by Gemini’s cyber model to label manipulation techniques in real-time.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-3">
            <span>Analyze Text Signature</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Threat Interception History Log */}
      <ThreatHistoryLog />

      {/* Scam Center Intel Insights */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="scam-center-intel">
        <div className="flex items-center gap-2 mb-4">
          <BadgeInfo className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Scam Center Tactics Feed (Intelligence Briefing)
          </h2>
        </div>
        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <div key={alert.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800/80 flex items-start gap-3 justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-500 animate-ping' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'}`} />
                  <span className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-400">
                    {alert.severity} threat warning
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white p-0 m-0">{alert.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{alert.description}</p>
              </div>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded shrink-0">
                {alert.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
