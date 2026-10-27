import React, { useState, useEffect } from 'react';
import { X, Server, Activity, Send, CheckCircle2, RefreshCw, Terminal, ExternalLink } from 'lucide-react';

interface BackendConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendConsoleModal: React.FC<BackendConsoleModalProps> = ({ isOpen, onClose }) => {
  const [healthData, setHealthData] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
      }
      const msgRes = await fetch('/api/contact/messages');
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setInquiries(msgData.inquiries || []);
      }
    } catch (err: any) {
      setHealthData({ status: 'error', error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const sendTestInquiry = async () => {
    setTestStatus('Sending test message to /api/contact...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Test Recruiter',
          email: 'test@recruiter.com',
          subject: 'Portfolio Test Contact',
          message: 'Verifying that the backend Express API is storing messages properly.',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus(`Success! Message recorded with ID: ${data.inquiryId}`);
        checkHealth();
      } else {
        setTestStatus(`Failed: ${data.error}`);
      }
    } catch (err: any) {
      setTestStatus(`Error: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090f1e] border border-cyan-500/30 p-6 sm:p-8 text-slate-100 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Express Backend Server Console</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-slate-400">
                File: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">server.ts</code> (Root Directory)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Server Status Card */}
        <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Health Status</span>
            </div>
            <button
              onClick={checkHealth}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Ping Server</span>
            </button>
          </div>

          {healthData ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Status</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {healthData.status?.toUpperCase() || 'ONLINE'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Port</span>
                <span className="text-slate-200 font-bold font-mono">3000</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Server Uptime</span>
                <span className="text-slate-200 font-mono">
                  {healthData.uptime ? `${Math.round(healthData.uptime)}s` : 'Active'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Total Messages</span>
                <span className="text-cyan-400 font-bold font-mono">{inquiries.length}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Loading server health...</div>
          )}
        </div>

        {/* Backend Endpoints Table */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active API Endpoints</span>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800/80 text-xs font-mono">
            <div className="p-3 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800/50 text-emerald-400 font-bold text-[10px]">GET</span>
                <span className="text-slate-200">/api/health</span>
              </div>
              <a
                href="/api/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-sans text-[11px]"
              >
                <span>Open in browser</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-950 border border-blue-800/50 text-blue-400 font-bold text-[10px]">POST</span>
                <span className="text-slate-200">/api/contact</span>
              </div>
              <span className="text-slate-500 font-sans text-[11px]">Submits and records inquiries</span>
            </div>

            <div className="p-3 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800/50 text-emerald-400 font-bold text-[10px]">GET</span>
                <span className="text-slate-200">/api/contact/messages</span>
              </div>
              <a
                href="/api/contact/messages"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-sans text-[11px]"
              >
                <span>View raw JSON</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Test Action */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-slate-300">
              Test Backend API Request
            </div>
            <button
              onClick={sendTestInquiry}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Send Sample POST Request</span>
            </button>
          </div>

          {testStatus && (
            <p className="text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded-lg border border-cyan-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{testStatus}</span>
            </p>
          )}
        </div>

        {/* File location summary */}
        <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-300 font-semibold block">Where is the code located?</span>
          <p>
            The backend is defined in <code className="text-cyan-300">server.ts</code> at the root directory of this repository. It is launched via <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">npm run dev</code> (which executes <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">tsx server.ts</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
