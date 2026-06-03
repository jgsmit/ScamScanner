import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, Phone, MessageSquare, Trash2, ArrowUpRight, CheckCircle2, ShieldOff, AlertOctagon, HelpCircle } from 'lucide-react';

export interface ThreatEvent {
  id: string;
  sender: string;
  channel: 'SMS' | 'WhatsApp' | 'Telegram' | 'VoIP';
  timestamp: string;
  type: string;
  details: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'BLOCKED' | 'REPORTED' | 'WHITELISTED' | 'UNRESOLVED';
}

export default function ThreatHistoryLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState<'all' | 'SMS' | 'Call'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  
  // Rich history reflecting actual scam-center indicators from Singapore, Cambodia & VoIP proxies
  const [events, setEvents] = useState<ThreatEvent[]>([
    {
      id: 'evt-1',
      sender: '+855 97 990 1255',
      channel: 'Telegram',
      timestamp: 'Today, 11:24 AM',
      type: 'Synthetic Deepfake Face-Mimicry',
      details: 'Spawning unmask overlay. High discrepancy caught in lateral chin anchors and eye reflectivity mismatch (89%). Actor projected Asian female model.',
      severity: 'critical',
      status: 'BLOCKED'
    },
    {
      id: 'evt-2',
      sender: '+1 (415) 880-1102',
      channel: 'SMS',
      timestamp: 'Today, 10:45 AM',
      type: 'Pig-Butchering Wrong-Number Lure',
      details: 'Matched pretext pattern: "Is this the interior designer from Pinterest? I got your contact from my uncle..." Redirects suggested key: WeChat/Telegram.',
      severity: 'high',
      status: 'REPORTED'
    },
    {
      id: 'evt-3',
      sender: 'voip://172.93.88.23:sip',
      channel: 'VoIP',
      timestamp: 'Today, 09:12 AM',
      type: 'Synthetic Audio Caller impersonation',
      details: 'VoIP spoof mimicking Singapore Police Force. Audio compression artifact detected matching Cambodia routing clusters.',
      severity: 'critical',
      status: 'BLOCKED'
    },
    {
      id: 'evt-4',
      sender: '+44 7911 123456',
      channel: 'WhatsApp',
      timestamp: 'Yesterday, 03:40 PM',
      type: 'Phishing Redirect / Suspicious URL',
      details: 'Flagged redirect link: "bit.ly/singapore-crypto-vip-access". Target host tied to known ransomware subdomains.',
      severity: 'high',
      status: 'BLOCKED'
    },
    {
      id: 'evt-5',
      sender: '+1 (323) 987-0133',
      channel: 'SMS',
      timestamp: 'Yesterday, 01:15 PM',
      type: 'Golf Bait Trust Cultivation',
      details: 'Received wrong-number pretext: "Hey Sarah! We still on for golf lessons this Friday or did I get the wrong number?"',
      severity: 'medium',
      status: 'UNRESOLVED'
    },
    {
      id: 'evt-6',
      sender: '+65 8123 4567',
      channel: 'WhatsApp',
      timestamp: 'Yesterday, 08:30 AM',
      type: 'Impersonating Official Agent',
      details: 'Profile using Singapore judicial logos. User prompted with Singpass verification link.',
      severity: 'critical',
      status: 'REPORTED'
    },
    {
      id: 'evt-7',
      sender: '+1 (646) 554-9022',
      channel: 'SMS',
      timestamp: '2 days ago',
      type: 'Serendipity Wrong-Number Lure',
      details: 'Pretext attempt: "Hello, is this Dr. John? I am Emily, the assistant. I wanted to verify your flower basket delivery status..."',
      severity: 'medium',
      status: 'BLOCKED'
    },
    {
      id: 'evt-8',
      sender: '+1 (800) 411-9233',
      channel: 'SMS',
      timestamp: '3 days ago',
      type: 'Bulk Unknown Sender Campaign',
      details: 'Spam script offering remote part-time earnings. Target domain links routing through Hong Kong registrars.',
      severity: 'low',
      status: 'BLOCKED'
    }
  ]);

  // Action Handlers
  const handleToggleStatus = (id: string, newStatus: 'BLOCKED' | 'WHITELISTED') => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        return { ...evt, status: evt.status === newStatus ? 'UNRESOLVED' : newStatus };
      }
      return evt;
    }));
  };

  const handleDeleteLog = (id: string) => {
    setEvents(prev => prev.filter(evt => evt.id !== id));
  };

  const getSeverityStyles = (severity: 'critical' | 'high' | 'medium' | 'low') => {
    switch(severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'high':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'medium':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'low':
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const getStatusBadgeStyles = (status: ThreatEvent['status']) => {
    switch(status) {
      case 'BLOCKED':
        return 'bg-red-950/40 text-red-400 border border-red-900/40';
      case 'REPORTED':
        return 'bg-amber-950/40 text-amber-400 border border-amber-900/40';
      case 'WHITELISTED':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40';
      case 'UNRESOLVED':
        return 'bg-slate-900 text-slate-400 border border-slate-800';
    }
  };

  // Filter & Search computation
  const filteredEvents = events.filter(evt => {
    const matchesSearch = 
      evt.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChannel = 
      filterChannel === 'all' ||
      (filterChannel === 'SMS' && evt.channel === 'SMS') ||
      (filterChannel === 'Call' && (evt.channel === 'Telegram' || evt.channel === 'WhatsApp' || evt.channel === 'VoIP'));
      
    const matchesSeverity = 
      filterSeverity === 'all' || 
      evt.severity === filterSeverity;

    return matchesSearch && matchesChannel && matchesSeverity;
  });

  // Aggregate stats
  const totalCritical = events.filter(e => e.severity === 'critical').length;
  const totalHigh = events.filter(e => e.severity === 'high').length;
  const totalMedium = events.filter(e => e.severity === 'medium').length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5" id="threat-history-log-panel">
      {/* Header section with cumulative badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Threat Interception History</h3>
          </div>
          <p className="text-xs text-slate-400 leading-normal">
            Real-time chronological telemetry showing incoming SMS, VoIP triggers, and deepfake streams scanned across mobile system registers.
          </p>
        </div>

        {/* Aggregate Severity Pill counts */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full text-red-400 flex items-center gap-1">
            <span className="w-1 to-red-400 h-1 rounded-full bg-red-500 animate-pulse"></span>
            {totalCritical} Critical
          </span>
          <span className="text-[10px] font-mono font-bold bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full text-orange-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            {totalHigh} High
          </span>
          <span className="text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-amber-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
            {totalMedium} Medium
          </span>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3" id="filters-container">
        {/* Search input */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by sender signature, threat type, pattern clue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
          />
        </div>

        {/* Channel Filter buttons */}
        <div className="md:col-span-3 flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          {(['all', 'SMS', 'Call'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterChannel(ch)}
              className={`flex-1 text-[10px] font-mono tracking-wider font-semibold uppercase py-1 rounded-md transition-all cursor-pointer ${filterChannel === ch ? 'bg-indigo-600/20 border border-indigo-500/30 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Severity filter */}
        <div className="md:col-span-3 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-4 py-2 text-[10px] font-mono tracking-wide uppercase text-slate-300 focus:outline-none focus:border-indigo-500/60 cursor-pointer appearance-none"
          >
            <option value="all">Severity: All</option>
            <option value="critical">Severity: Critical</option>
            <option value="high">Severity: High</option>
            <option value="medium">Severity: Medium</option>
            <option value="low">Severity: Low</option>
          </select>
        </div>
      </div>

      {/* Interactive Logs List container */}
      <div className="space-y-3" id="history-scroller">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 bg-slate-950 rounded-xl border border-slate-800/50 space-y-1.5">
            <AlertOctagon className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-400">No matching threat events recorded</p>
            <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
              ScamShield AI is running silently in the background. Tap "Simulate Threat" on the dashboard to test alerts.
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950 border border-slate-800/70 p-4 rounded-xl hover:border-slate-800 transition-all space-y-3 relative group"
            >
              {/* Row 1: Source channels & Timestamp & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Channel icon */}
                  <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 inline-block">
                    {evt.channel === 'SMS' ? (
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    ) : (
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </span>
                  
                  {/* Sender signature details */}
                  <div className="text-left">
                    <span className="text-xs font-mono font-bold text-slate-200 block">{evt.sender}</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase block sm:inline">
                      CHANNEL: {evt.channel} · {evt.timestamp}
                    </span>
                  </div>
                </div>

                {/* Badges combo */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-bold border rounded px-2 py-0.5 ${getSeverityStyles(evt.severity)}`}>
                    {evt.severity}
                  </span>
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-bold rounded px-2 py-0.5 ${getStatusBadgeStyles(evt.status)}`}>
                    {evt.status}
                  </span>
                </div>
              </div>

              {/* Row 2: Threat details */}
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-0.5 bg-indigo-500 inline-block rounded"></span>
                  {evt.type}
                </h4>
                <p className="text-xs text-slate-400 leading-normal pl-3">
                  {evt.details}
                </p>
              </div>

              {/* Row 3: Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono">
                <span className="text-slate-500">Threat Register Code: SS-{evt.id.toUpperCase()}</span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(evt.id, 'BLOCKED')}
                    className={`px-2.5 py-1.5 rounded font-bold border transition-all cursor-pointer ${evt.status === 'BLOCKED' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-red-950/20 hover:bg-red-900/40 text-red-400 border-red-900/30'}`}
                  >
                    {evt.status === 'BLOCKED' ? 'Unblock Sender' : 'Shield Block'}
                  </button>

                  <button
                    onClick={() => handleToggleStatus(evt.id, 'WHITELISTED')}
                    className={`px-2.5 py-1.5 rounded font-bold border transition-all cursor-pointer ${evt.status === 'WHITELISTED' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 border-emerald-950/30'}`}
                  >
                    {evt.status === 'WHITELISTED' ? 'Revoke Whitelist' : 'Whitelist'}
                  </button>

                  <button
                    onClick={() => handleDeleteLog(evt.id)}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-red-950 hover:bg-red-950/25 text-slate-500 hover:text-red-400 transition-all cursor-pointer"
                    title="Delete event log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
