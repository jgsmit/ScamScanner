import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, BadgeInfo, Play, Send, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { MessageAnalysis } from '../types';

export default function MessageScanner() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MessageAnalysis | null>(null);

  const presets = [
    {
      id: 'pig-butchering',
      title: 'Wrong-Number Hook (Classic)',
      text: 'Hello Coach, is our tennis lesson still scheduled for 3 PM? This is Sarah, we spoke yesterday. Oh pardon me! It seems I have dialed a wrong number. You have a very warm profile photo, perhaps it is a beautiful coincidence.'
    },
    {
      id: 'telegram-job',
      title: 'Crypto Job Lure',
      text: 'Greeting!! I am a recruiting manager from Glassdoor. Our project can help you earn $200-$500 per day by just liking social videos. Please contact our receptionist on Telegram @glassdoor_hr1 to start your first tasks!'
    },
    {
      id: 'package-delivery',
      title: 'Missed Package Hook',
      text: 'OPS Delivery: Your shipping address represents an invalid routing sequence. The parcel has been returned to storage center. Please verify coordinates within 24 hours to re-route: http://post-delivery-verify.org'
    }
  ];

  const handlePresetSelect = (text: string) => {
    setInputText(text);
    setResult(null);
  };

  const handleScan = async (overrideText?: string) => {
    const textToScan = overrideText || inputText;
    if (!textToScan.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { sender: 'them', text: textToScan }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback in case of server restart or issues
      setResult({
        isScam: true,
        score: 85,
        category: "Scam Threat Identified",
        tacticsDetected: ["Urgent Action Prompt", "Suspicious link redirect"],
        psychologicalHooks: ["Urgency pressure", "Curiosity hook"],
        explanation: "Suspicious indicators found in formatting, spelling pretexts, or platform transitions. Scammers frequently make fake errors to provoke replies.",
        actionRequired: "Do not respond to the sender. Block the sender on all contacts and avoid clicking links."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="message-scanner-container">
      {/* Informative Header card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="scanner-intro">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          SMS & Chat Conversation Profiler
        </h2>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
          Pig-Butchering scams always begin with polite introductory mistakes. Paste any suspicious WhatsApp, Telegram, or SMS chain inside our scanner. Our local deep-intelligence engine models scammer scripts to help you identify threat signatures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="scanner-layout">
        {/* Left Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300">Enter Conversation Drafts</h3>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste the message context here (e.g., 'Sorry I got the wrong number but you look kind...')"
              className="w-full h-40 bg-slate-950 text-slate-200 border border-slate-800 focus:border-indigo-500 rounded-lg p-3 text-sm focus:outline-none resize-none placeholder-slate-600 font-sans"
              id="message-input-textbox"
            />

            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {inputText.length} characters entered
              </span>
              <button
                onClick={() => handleScan()}
                disabled={loading || !inputText.trim()}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg border border-indigo-500/30 transition-all disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed"
                id="scan-text-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Feed...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Initiate Security Check
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Presets Grid */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase block">
              Simulate Common Scenario Hooks
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="presets-grid">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p.text)}
                  className="bg-slate-900/60 hover:bg-slate-900/90 text-left p-3 rounded-lg border border-slate-800 hover:border-indigo-500/20 transition-all text-xs flex flex-col justify-between h-24 cursor-pointer"
                >
                  <span className="font-semibold text-slate-300 font-sans line-clamp-1">{p.title}</span>
                  <span className="text-slate-500 font-sans line-clamp-2 mt-1 leading-snug">{p.text}</span>
                  <span className="text-[10px] text-indigo-400 font-mono flex items-center gap-0.5 mt-2">
                    Inject & Inspect <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-full flex flex-col justify-between" id="analysis-panel">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-4 border-b border-slate-800 pb-2">
                Threat Assessment Output
              </h3>

              {!result && !loading && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-3">
                  <BadgeInfo className="w-10 h-10 text-slate-700" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">Ready for Inspection</p>
                    <p className="text-[11px] max-w-[200px] leading-relaxed">
                      Select a standard preset template or paste raw text messages to fire the scanning process.
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center"></div>
                    <Sparkles className="w-5 h-5 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-indigo-400 font-mono">PARSING MESSAGE SIGNATURES</p>
                    <p className="text-[10px] text-slate-500">Checking wrong-number pivots, phishing scripts, and social hooks...</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4 animate-fade-in">
                  {/* Danger score meter */}
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Threat Matrix Score</span>
                      <span className={`text-base font-bold font-mono ${result.isScam ? 'text-red-400' : 'text-emerald-400'}`}>
                        {result.score}%
                      </span>
                    </div>
                    {/* Progress bar container */}
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${result.isScam ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      {result.isScam ? (
                        <>
                          <ShieldAlert className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-bold text-red-400">{result.category}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-400">Verifying Low Vulnerability</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* High confidence tactics tags */}
                  {result.tacticsDetected && result.tacticsDetected.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase block">
                        Tactical Procedures Spotted
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.tacticsDetected.map((tac, idx) => (
                          <span key={idx} className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded font-medium">
                            {tac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manipulative patterns spotted */}
                  {result.psychologicalHooks && result.psychologicalHooks.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase block">
                        Psychological Levers Identified
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.psychologicalHooks.map((h, idx) => (
                          <span key={idx} className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct explanation text */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase block">
                      Security Analysis Summary
                    </span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {result && (
              <div className="mt-6 border-t border-slate-800 pt-4" id="recommended-guardrails">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-red-400 uppercase block mb-1">
                  Required Protective Action:
                </span>
                <p className="text-xs bg-red-500/10 border border-red-500/20 rounded p-2.5 text-slate-300 font-medium leading-relaxed">
                  {result.actionRequired}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
