import React, { useState } from 'react';
import { Smartphone, CheckCircle, Code, ShieldAlert, Sparkles, Bell, ToggleLeft, ToggleRight, ArrowRight, Download, Terminal, Layers } from 'lucide-react';

export default function FlutterIntegration() {
  const [permissions, setPermissions] = useState({
    sms: true,
    overlay: false,
    notifications: false,
    background: true
  });

  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'granted' | 'denied' | 'sent'>('idle');

  const triggerLiveWebNotification = async () => {
    if (!('Notification' in window)) {
      alert("This browser doesn't support system notifications.");
      return;
    }

    setNotificationStatus('idle');

    // Request permissions
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationStatus('granted');
      
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav'); // Soft clean alert chimer
      try {
        audio.play().catch(() => {});
      } catch (e) {}

      // Fire actual system notification banner
      new Notification("🚨 ScamShield Threat Alarm!", {
        body: "Suspicious 'Wrong Number' pattern detected from unverified line. Migration to Telegram suggested.",
        icon: "https://cdn-icons-png.flaticon.com/512/1067/1067357.png"
      });
      
      setNotificationStatus('sent');
      setTimeout(() => setNotificationStatus('idle'), 3000);
    } else {
      setNotificationStatus('denied');
    }
  };

  const codeSnippets = {
    dependency: `dependencies:
  flutter:
    sdk: flutter
  telephony: ^0.2.0 # Listens to real-time incoming SMS broadcasts
  flutter_local_notifications: ^16.1.0 # Sends native OS heads-up warnings
  system_alert_window: ^1.4.0 # Paints unmask overlay on Telegram/WhatsApp calls
  http: ^1.2.0`,

    smsListener: `// lib/services/sms_receiver.dart
import 'package:telephony/telephony.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// Background handler executing when SMS is received in sleep/cold states
backgroudMessageHandler(SmsMessage message) async {
  final senderNumber = message.address ?? "Unknown";
  final bodyText = message.body ?? "";
  
  print("Intercepted incoming SMS from $senderNumber: $bodyText");

  // Call the ScamShield Backend AI endpoint
  final response = await http.post(
    Uri.parse("https://your-scamshield-api.com/api/analyze-message"),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({
      "messages": [{"sender": "them", "text": bodyText}]
    }),
  );

  if (response.statusCode == 200) {
    final result = jsonDecode(response.body);
    if (result['isScam'] == true) {
      // Trigger native notification warning immediately
      NotificationService.showThreatAlert(
        title: "🚨 SCAM INCURSION FLAG",
        body: "\${result['category']}: \${result['explanation']}",
      );
    }
  }
}`,

    overlayService: `// lib/services/overlay_service.dart
import 'package:system_alert_window/system_alert_window.dart';
import 'package:flutter/material.dart';

class CallOverlayController {
  static void spawnUnmaskOverlay() async {
    SystemWindowHeader header = SystemWindowHeader(
      title: SystemWindowText(text: "🚨 DEEPFAKE DETECTED (ScamShield Override)", fontSize: 10, textColor: Colors.white),
      padding: SystemWindowPadding.setSymmetricPadding(12, 12),
      subTitle: SystemWindowText(text: "Aomalies found. Overriding synthetic filter...", fontSize: 8, textColor: Colors.white70),
      backgroundColor: Colors.red[900],
    );

    SystemWindowBody body = SystemWindowBody(
      rows: [
        EachRow(columns: [
          EachColumn(text: SystemWindowText(text: "Analyzing dynamic eye blinks: Inconsistent\\nEstimated Frame Jitter: High\\nTerminals exposed: Kyiv Scammer Router", fontSize: 9, textColor: Colors.black80))
        ])
      ],
      padding: SystemWindowPadding.setSymmetricPadding(12, 12),
    );

    await SystemAlertWindow.showSystemWindow(
      height: 140,
      header: header,
      body: body,
      margin: SystemWindowMargin(top: 100, bottom: 0, left: 16, right: 16),
      gravity: SystemWindowGravity.TOP,
      prefMode: SystemWindowPrefMode.OVERLAY
    );
  }
}`
  };

  return (
    <div className="space-y-6 animate-fade-in" id="flutter-integration-container">
      {/* Intro Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-2xl p-6 border border-indigo-500/20 shadow-xl relative overflow-hidden" id="flutter-hero">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              FLUTTER NATIVE SDK COMPATIBLE
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
              Cross-Platform Native Deployment
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Bring active background SMS intercepting, real-time calling hooks, and overlay unmaskers to physical iOS and Android devices by embedding our production Dart plugins.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center min-w-[180px]">
            <Smartphone className="w-8 h-8 text-indigo-400 mb-2" />
            <span className="text-xs text-slate-400 font-mono">Target Platform</span>
            <span className="text-sm font-semibold text-white font-mono">Android & iOS</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Setup & Interactive Notification Tool + Flutter Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="flutter-layout">
        
        {/* Left Interactive Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Native Guardian Permissions
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">SMS Broadcast Intercept</span>
                  <span className="text-[10px] text-slate-500 block">Uses telephony broadcast channels</span>
                </div>
                <button 
                  onClick={() => setPermissions(p => ({ ...p, sms: !p.sms }))}
                  className="text-indigo-400 self-center cursor-pointer"
                >
                  {permissions.sms ? <ToggleRight className="w-7 h-7 text-indigo-500" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">System Alert Windows</span>
                  <span className="text-[10px] text-slate-500 block">Used to paint unmask calling headers</span>
                </div>
                <button 
                  onClick={() => setPermissions(p => ({ ...p, overlay: !p.overlay }))}
                  className="text-indigo-400 self-center cursor-pointer"
                >
                  {permissions.overlay ? <ToggleRight className="w-7 h-7 text-indigo-500" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">Permanent Background Service</span>
                  <span className="text-[10px] text-slate-500 block">Prevents OS battery saver sleep modes</span>
                </div>
                <button 
                  onClick={() => setPermissions(p => ({ ...p, background: !p.background }))}
                  className="text-indigo-400 self-center cursor-pointer"
                >
                  {permissions.background ? <ToggleRight className="w-7 h-7 text-indigo-500" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
                </button>
              </div>
            </div>

            {/* Notification Trigger Utility */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
                Inspect Push Notification Action
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Click below to request standard Web Notification permissions. Once enabled, the application will fire a real system alerts simulation immediately on your device!
              </p>
              
              <button
                onClick={triggerLiveWebNotification}
                className="w-full py-2.5 rounded-lg border border-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                id="test-notification-btn"
              >
                <Layers className="w-3.5 h-3.5" />
                {notificationStatus === 'sent' ? 'Warning Alert Dispatched!' : 'Fire Hardware Notification Alert'}
              </button>

              {notificationStatus === 'denied' && (
                <p className="text-[10px] text-red-400 text-center font-semibold animate-pulse">
                  Notification permission was blocked. Please toggle browser site permissions.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Source Code Integration Documentation Panel */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5" id="code-docs-panel">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Flutter Native Component Scripts</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-400">dart + native setup reference</span>
            </div>

            {/* Pubspec YAML dependency instruction */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 font-sans block">
                1. Add Cross-Platform Broadcast Packages (`pubspec.yaml`)
              </label>
              <pre className="bg-slate-950 text-emerald-400 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto whitespace-pre block text-left">
                {codeSnippets.dependency}
              </pre>
            </div>

            {/* Android Background SMS interceptor snippet */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 font-sans block">
                2. Setup Background Process Interception (`sms_receiver.dart`)
              </label>
              <p className="text-[11px] text-slate-400 leading-normal">
                Reads the SMS intent data directly using Native Telephony broadcast channels on Android and routes payload arrays to the ScamShield Classifier API.
              </p>
              <pre className="bg-slate-950 text-indigo-300 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto whitespace-pre block text-left max-h-[280px]">
                {codeSnippets.smsListener}
              </pre>
            </div>

            {/* Overrides Overlay painting code */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 font-sans block">
                3. Overriding and Masking External Calling Apps (`overlay_service.dart`)
              </label>
              <p className="text-[11px] text-slate-400 leading-normal">
                Draws custom platform interface windows over Telegram and WhatsApp calls when high-probability deepfakes are unmasked.
              </p>
              <pre className="bg-slate-950 text-pink-300 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto whitespace-pre block text-left max-h-[220px]">
                {codeSnippets.overlayService}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
