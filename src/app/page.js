"use client";

import { useState, useRef, useEffect } from "react";
import {
  Printer,
  KeyRound,
  Wifi,
  Send,
  Cpu,
  ShieldCheck,
  Paperclip,
  Sparkles,
  Plus,
  MessageSquare,
  Settings,
  User,
  Trash2,
  Menu,
  X,
} from "lucide-react";

// --- THEMES CONFIG ---
const THEMES = {
  cyan: {
    label: "Cyan (Défaut)",
    color: "#22d3ee",
    classes: {
      text200: "text-cyan-200",
      text300: "text-cyan-300",
      text400: "text-cyan-400",
      bg400: "bg-cyan-400",
      bg500: "bg-cyan-500",
      border400: "border-cyan-400",
      from200: "from-cyan-200",
      from400: "from-cyan-400",
      from500: "from-cyan-500",
      via300: "via-cyan-300",
      to500: "to-blue-500",
      to600: "to-blue-600",
      glowBg: "bg-cyan-500/10",
      glowBgStrong: "bg-cyan-400/40",
      glowShadow: "shadow-[0_4px_18px_-6px_rgba(34,211,238,0.4)]",
      focusShadow: "focus-within:shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)]",
      btnShadowHover: "hover:shadow-[0_4px_28px_-2px_rgba(34,211,238,0.65)]",
      btnShadow: "shadow-[0_4px_20px_-4px_rgba(34,211,238,0.45)]",
      sendShadowHover: "hover:shadow-[0_0_16px_-2px_rgba(34,211,238,0.6)]",
      activeBg: "bg-cyan-400/[0.08]",
      hoverBg: "hover:bg-cyan-400/[0.06]",
      hoverBorder: "hover:border-cyan-400/40",
      activeBorder: "border-cyan-400/20",
    }
  },
  emerald: {
    label: "Émeraude",
    color: "#34d399",
    classes: {
      text200: "text-emerald-200",
      text300: "text-emerald-300",
      text400: "text-emerald-400",
      bg400: "bg-emerald-400",
      bg500: "bg-emerald-500",
      border400: "border-emerald-400",
      from200: "from-emerald-200",
      from400: "from-emerald-400",
      from500: "from-emerald-500",
      via300: "via-emerald-300",
      to500: "to-teal-500",
      to600: "to-teal-600",
      glowBg: "bg-emerald-500/10",
      glowBgStrong: "bg-emerald-400/40",
      glowShadow: "shadow-[0_4px_18px_-6px_rgba(52,211,153,0.4)]",
      focusShadow: "focus-within:shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)]",
      btnShadowHover: "hover:shadow-[0_4px_28px_-2px_rgba(52,211,153,0.65)]",
      btnShadow: "shadow-[0_4px_20px_-4px_rgba(52,211,153,0.45)]",
      sendShadowHover: "hover:shadow-[0_0_16px_-2px_rgba(52,211,153,0.6)]",
      activeBg: "bg-emerald-400/[0.08]",
      hoverBg: "hover:bg-emerald-400/[0.06]",
      hoverBorder: "hover:border-emerald-400/40",
      activeBorder: "border-emerald-400/20",
    }
  },
  purple: {
    label: "Violet",
    color: "#c084fc",
    classes: {
      text200: "text-purple-200",
      text300: "text-purple-300",
      text400: "text-purple-400",
      bg400: "bg-purple-400",
      bg500: "bg-purple-500",
      border400: "border-purple-400",
      from200: "from-purple-200",
      from400: "from-purple-400",
      from500: "from-purple-500",
      via300: "via-purple-300",
      to500: "to-fuchsia-500",
      to600: "to-fuchsia-600",
      glowBg: "bg-purple-500/10",
      glowBgStrong: "bg-purple-400/40",
      glowShadow: "shadow-[0_4px_18px_-6px_rgba(192,132,252,0.4)]",
      focusShadow: "focus-within:shadow-[0_0_24px_-4px_rgba(192,132,252,0.35)]",
      btnShadowHover: "hover:shadow-[0_4px_28px_-2px_rgba(192,132,252,0.65)]",
      btnShadow: "shadow-[0_4px_20px_-4px_rgba(192,132,252,0.45)]",
      sendShadowHover: "hover:shadow-[0_0_16px_-2px_rgba(192,132,252,0.6)]",
      activeBg: "bg-purple-400/[0.08]",
      hoverBg: "hover:bg-purple-400/[0.06]",
      hoverBorder: "hover:border-purple-400/40",
      activeBorder: "border-purple-400/20",
    }
  },
  rose: {
    label: "Rose",
    color: "#fb7185",
    classes: {
      text200: "text-rose-200",
      text300: "text-rose-300",
      text400: "text-rose-400",
      bg400: "bg-rose-400",
      bg500: "bg-rose-500",
      border400: "border-rose-400",
      from200: "from-rose-200",
      from400: "from-rose-400",
      from500: "from-rose-500",
      via300: "via-rose-300",
      to500: "to-pink-500",
      to600: "to-pink-600",
      glowBg: "bg-rose-500/10",
      glowBgStrong: "bg-rose-400/40",
      glowShadow: "shadow-[0_4px_18px_-6px_rgba(251,113,133,0.4)]",
      focusShadow: "focus-within:shadow-[0_0_24px_-4px_rgba(251,113,133,0.35)]",
      btnShadowHover: "hover:shadow-[0_4px_28px_-2px_rgba(251,113,133,0.65)]",
      btnShadow: "shadow-[0_4px_20px_-4px_rgba(251,113,133,0.45)]",
      sendShadowHover: "hover:shadow-[0_0_16px_-2px_rgba(251,113,133,0.6)]",
      activeBg: "bg-rose-400/[0.08]",
      hoverBg: "hover:bg-rose-400/[0.06]",
      hoverBorder: "hover:border-rose-400/40",
      activeBorder: "border-rose-400/20",
    }
  }
};

const QUICK_ACTIONS = [
  { icon: Printer, label: "Débloquer AkwaPrint", hint: "Imprimante" },
  { icon: KeyRound, label: "Réinitialiser mot de passe", hint: "Accès" },
  { icon: Wifi, label: "Problème Wi-Fi", hint: "Réseau" },
];

const INITIAL_HISTORY = [
  { id: 1, title: "Blocage imprimante AkwaPrint" },
  { id: 2, title: "Réinitialisation mot de passe AD" },
  { id: 3, title: "Lenteur réseau agence Plateau" },
  { id: 4, title: "Installation poste nouvel arrivant" },
];

export default function JarvisChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [activeHistory, setActiveHistory] = useState(1);
  const scrollRef = useRef(null);

  // Layout & Settings States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentThemeKey, setCurrentThemeKey] = useState("cyan");
  const [textSize, setTextSize] = useState("normal"); // small, normal, large
  const [soundEnabled, setSoundEnabled] = useState(true);

  const t = THEMES[currentThemeKey].classes;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function playBeep() {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) {
      console.log("Audio not supported or blocked");
    }
  }

  function deleteHistory(e, id) {
    e.stopPropagation();
    setHistoryList((prev) => prev.filter((h) => h.id !== id));
    if (activeHistory === id) {
      setActiveHistory(null);
      setMessages([]);
    }
  }

  async function sendMessage(text) {
    const content = text.trim();
    if (!content) return;
    
    let currentId = activeHistory;
    if (!currentId) {
      currentId = Date.now();
      setHistoryList((prev) => [
        { id: currentId, title: content.length > 25 ? content.slice(0, 25) + "..." : content },
        ...prev,
      ]);
      setActiveHistory(currentId);
    }

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content })
      });
      const data = await res.json();
      
      setMessages((prev) => [...prev, { role: "jarvis", content: data.reply || "Erreur de communication." }]);
      playBeep();
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "jarvis", content: "Désolé, je suis hors ligne ou une erreur s'est produite." }]);
      playBeep();
    } finally {
      setIsTyping(false);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="h-[100dvh] w-full bg-[#050810] text-slate-100 flex flex-col md:flex-row overflow-hidden">
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-in { animation: msgIn 0.35s ease-out; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 999px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800/50 bg-[#0B1120]">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0">
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${t.glowBgStrong} ${t.to600}/30 blur-sm`} />
            <div className={`relative w-8 h-8 rounded-lg bg-[#050810] border ${t.border400}/30 flex items-center justify-center`}>
              <Cpu className={`w-4 h-4 ${t.text300}`} />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className={`text-base font-semibold bg-gradient-to-r ${t.from200} ${t.via300} ${t.to500} bg-clip-text text-transparent`} style={{ fontFamily: "Outfit, sans-serif" }}>
              J.A.R.V.I.S
            </h1>
            <span className="text-[10px] text-slate-500">Support IT · Ecobank</span>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 -mr-2 text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] shrink-0 h-full flex flex-col border-r border-white/[0.06] bg-gradient-to-b from-[#0A1220] to-[#060910] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className={`pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b ${t.glowBgStrong} via-white/5 to-transparent transition-colors duration-1000`} />

        {/* Mobile Close Sidebar */}
        <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-4 md:hidden text-slate-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="px-5 pt-6 pb-5 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${t.glowBgStrong} ${t.to600}/30 blur-md transition-colors duration-1000`} />
              <div className={`relative w-10 h-10 rounded-xl bg-[#0B1120] border ${t.border400}/30 flex items-center justify-center transition-colors duration-1000`}>
                <Cpu className={`w-5 h-5 ${t.text300} transition-colors duration-1000`} strokeWidth={1.75} />
              </div>
            </div>
            <div className="leading-tight">
              <h1
                className={`text-[17px] font-semibold tracking-wide bg-gradient-to-r ${t.from200} ${t.via300} ${t.to500} bg-clip-text text-transparent transition-all duration-1000`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                J.A.R.V.I.S
              </h1>
              <p className="text-[10.5px] text-slate-500 tracking-wide -mt-0.5">
                Support IT · Ecobank
              </p>
            </div>
          </div>
        </div>

        {/* New discussion */}
        <div className="px-4 mt-16 md:mt-0">
          <button
            onClick={() => {
              setMessages([]);
              setActiveHistory(null);
              setSidebarOpen(false); // Close sidebar on mobile
            }}
            className={`group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${t.from500} ${t.to600} px-4 py-2.5 text-[13px] font-medium text-white ${t.btnShadow} transition-all duration-300 ${t.btnShadowHover} hover:-translate-y-0.5`}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nouvelle discussion
          </button>
        </div>

        {/* History */}
        <div className="mt-7 px-4 flex-1 overflow-y-auto">
          <p className="text-[10.5px] font-medium tracking-[0.12em] text-slate-500 px-2 mb-2">
            HISTORIQUE
          </p>
          <div className="flex flex-col gap-1">
            {historyList.map((h) => {
              const isActive = activeHistory === h.id;
              return (
                <div key={h.id} className="relative group/item flex items-center">
                  <button
                    onClick={() => { setActiveHistory(h.id); setSidebarOpen(false); }}
                    className={`group w-full relative flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-all duration-200 pr-8 ${
                      isActive
                        ? `${t.activeBg} border ${t.activeBorder}`
                        : "border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
                    }`}
                  >
                    {isActive && (
                      <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[2px] rounded-full ${t.bg400} transition-colors duration-500`} />
                    )}
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 ${isActive ? t.text300 : "text-slate-500 group-hover:text-slate-400"} transition-colors duration-300`}
                      strokeWidth={1.75}
                    />
                    <span
                      className={`text-[12.5px] truncate ${isActive ? "text-slate-100" : "text-slate-400 group-hover:text-slate-300"}`}
                    >
                      {h.title}
                    </span>
                  </button>
                  <button
                    onClick={(e) => deleteHistory(e, h.id)}
                    className="absolute right-2 opacity-0 group-hover/item:opacity-100 p-1 rounded-md hover:bg-white/10 text-slate-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-white/[0.06] flex items-center gap-2.5 mt-auto">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.glowBgStrong} ${t.to600}/30 border border-white/10 flex items-center justify-center transition-colors duration-1000`}>
            <User className={`w-4 h-4 ${t.text200} transition-colors duration-1000`} strokeWidth={1.75} />
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-[12.5px] text-slate-200 font-medium">Agent Ecobank</p>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full ${t.bg400} opacity-75 animate-ping transition-colors duration-1000`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${t.bg400} transition-colors duration-1000`} />
              </span>
              <span className="text-[10.5px] text-slate-500">En ligne</span>
            </span>
          </div>
          <button onClick={() => {setSettingsOpen(true); setSidebarOpen(false)}} className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:${t.text300} hover:bg-white/5 transition-colors`}>
            <Settings className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 h-full flex flex-col relative w-full md:w-auto">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full ${t.glowBg} blur-[120px] transition-colors duration-1000`} />
          <div className={`absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full ${t.to600}/[0.06] blur-[120px] transition-colors duration-1000`} />
        </div>

        <main ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            {isEmpty ? (
              <div className="h-full min-h-[70vh] flex flex-col items-center justify-center text-center py-10">
                <div className="relative w-16 h-16 mb-6">
                  <div className={`absolute inset-0 rounded-full border ${t.border400}/20 animate-[spin_8s_linear_infinite] transition-colors duration-1000`} />
                  <div className={`absolute inset-1.5 rounded-full border border-dashed ${t.border400}/30 animate-[spin_14s_linear_infinite_reverse] transition-colors duration-1000`} />
                  <div className={`absolute inset-0 rounded-full ${t.glowBg} blur-xl transition-colors duration-1000`} />
                  <div className={`relative w-full h-full rounded-full bg-[#0B1120] border ${t.border400}/30 flex items-center justify-center transition-colors duration-1000`}>
                    <Cpu className={`w-6 h-6 ${t.text300} transition-colors duration-1000`} strokeWidth={1.5} />
                  </div>
                </div>
                <h2
                  className="text-2xl font-medium text-slate-100"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Bonjour, comment puis-je vous aider aujourd'hui ?
                </h2>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Décrivez votre problème IT ou choisissez une action rapide ci-dessous.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-9 w-full max-w-md mx-auto">
                  {QUICK_ACTIONS.map(({ icon: Icon, label, hint }) => (
                    <button
                      key={label}
                      onClick={() => sendMessage(label)}
                      className={`group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-md transition-all duration-300 ${t.hoverBorder} ${t.hoverBg} hover:-translate-y-0.5`}
                    >
                      <div className={`w-9 h-9 rounded-lg bg-[#0B1120] border border-white/10 flex items-center justify-center group-hover:${t.border400}/40 transition-colors duration-300`}>
                        <Icon className={`w-4 h-4 ${t.text300} transition-colors duration-1000`} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-200 leading-tight">
                          {label}
                        </p>
                        <p className="text-[11px] text-slate-500">{hint}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 py-8">
                {messages.map((m, i) => (
                  <MessageBubble key={i} role={m.role} content={m.content} t={t} textSize={textSize} />
                ))}
                {isTyping && <TypingBubble t={t} />}
              </div>
            )}
          </div>
        </main>

        <footer className="px-4 md:px-8 pb-6 pt-2 relative z-10">
          <div className="max-w-2xl mx-auto">
            {!isEmpty && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(label)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-slate-300 backdrop-blur-md transition-colors ${t.hoverBorder} hover:${t.text200}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${t.text300} transition-colors duration-1000`} strokeWidth={1.75} />
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className={`relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 ${t.focusShadow} focus-within:${t.border400}/50`}>
              <div className="flex items-end gap-2 p-2 md:p-2.5">
                <button className={`shrink-0 w-9 h-9 rounded-xl items-center justify-center text-slate-500 hover:${t.text300} hover:bg-white/5 transition-colors hidden md:flex`}>
                  <Paperclip className="w-4.5 h-4.5" strokeWidth={1.75} />
                </button>
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Décrivez votre problème IT..."
                  className="flex-1 resize-none bg-transparent text-[14px] text-slate-100 placeholder:text-slate-500 outline-none py-2 md:py-2 max-h-32 px-2 md:px-0"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className={`shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${t.from400} ${t.to500} text-[#060A14] disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 transition-all duration-300 ${t.sendShadowHover} disabled:shadow-none`}
                >
                  <Send className="w-4 h-4 md:w-4.5 md:h-4.5" strokeWidth={2} />
                </button>
              </div>
            </div>
            <p className="text-center text-[9px] md:text-[10px] text-slate-600 mt-2.5 tracking-wide">
              J.A.R.V.I.S peut faire des erreurs. Vérifiez les informations importantes.
            </p>
          </div>
        </footer>
      </div>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSettingsOpen(false)}>
          <div className="bg-[#0B1120] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" />
                Paramètres J.A.R.V.I.S
              </h3>
              <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme selection */}
              <div>
                <label className="text-[13px] font-medium text-slate-400 mb-3 block">COULEUR DU THÈME</label>
                <div className="flex gap-3">
                  {Object.keys(THEMES).map(key => (
                    <button 
                      key={key} 
                      onClick={() => setCurrentThemeKey(key)}
                      title={THEMES[key].label}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${currentThemeKey === key ? 'border-white scale-110' : 'border-transparent hover:scale-105 opacity-60 hover:opacity-100'}`}
                      style={{ backgroundColor: THEMES[key].color, boxShadow: currentThemeKey === key ? `0 0 15px ${THEMES[key].color}80` : 'none' }}
                    >
                      {currentThemeKey === key && <div className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size */}
              <div>
                 <label className="text-[13px] font-medium text-slate-400 mb-3 block">TAILLE DU TEXTE</label>
                 <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.05]">
                   <button onClick={() => setTextSize('small')} className={`flex-1 py-1.5 text-[13px] rounded-lg transition-all ${textSize==='small' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Petit</button>
                   <button onClick={() => setTextSize('normal')} className={`flex-1 py-1.5 text-[13px] rounded-lg transition-all ${textSize==='normal' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Normal</button>
                   <button onClick={() => setTextSize('large')} className={`flex-1 py-1.5 text-[13px] rounded-lg transition-all ${textSize==='large' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Grand</button>
                 </div>
              </div>

              {/* Sound Effects */}
              <div className="flex items-center justify-between py-2">
                 <div>
                   <div className="text-[14px] font-medium text-slate-200">Effets sonores</div>
                   <div className="text-[12px] text-slate-500">Bruitage lors de la réception de messages</div>
                 </div>
                 <button 
                   onClick={() => setSoundEnabled(!soundEnabled)} 
                   className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${soundEnabled ? t.bg500 : 'bg-slate-700'}`}
                 >
                   <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
              </div>

              {/* Clear History */}
              <div className="pt-4 border-t border-white/10 mt-2">
                <button 
                  onClick={() => { 
                    setHistoryList([]); 
                    setActiveHistory(null); 
                    setMessages([]); 
                    setSettingsOpen(false); 
                  }} 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/10 hover:border-red-500/30 font-medium text-[13px]"
                >
                  <Trash2 className="w-4 h-4" />
                  Effacer toutes les discussions
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function MessageBubble({ role, content, t, textSize }) {
  const isUser = role === "user";
  
  const formattedContent = content.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i !== content.split('\n').length - 1 && <br />}
    </span>
  ));

  const textClass = textSize === "small" ? "text-[13px]" : textSize === "large" ? "text-[16px]" : "text-[14px]";

  return (
    <div className={`msg-in flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className={`shrink-0 w-7 h-7 rounded-lg bg-[#0B1120] border ${t.border400}/30 flex items-center justify-center transition-colors duration-1000`}>
          <Cpu className={`w-3.5 h-3.5 ${t.text300} transition-colors duration-1000`} strokeWidth={1.75} />
        </div>
      )}
      <div
        className={
          isUser
            ? `max-w-[85%] md:max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br ${t.from500} ${t.to600} text-white px-4 py-2.5 ${textClass} leading-relaxed ${t.glowShadow} transition-all duration-500`
            : `max-w-[85%] md:max-w-[75%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] backdrop-blur-md text-slate-200 px-4 py-2.5 ${textClass} leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-500`
        }
      >
        {formattedContent}
      </div>
    </div>
  );
}

function TypingBubble({ t }) {
  return (
    <div className="msg-in flex items-end gap-2.5 justify-start">
      <div className={`shrink-0 w-7 h-7 rounded-lg bg-[#0B1120] border ${t.border400}/30 flex items-center justify-center transition-colors duration-1000`}>
        <Cpu className={`w-3.5 h-3.5 ${t.text300} transition-colors duration-1000`} strokeWidth={1.75} />
      </div>
      <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-3 flex items-center gap-1.5 transition-colors duration-500">
        <span className={`w-1.5 h-1.5 rounded-full ${t.bg400} animate-bounce [animation-delay:-0.3s] transition-colors duration-1000`} />
        <span className={`w-1.5 h-1.5 rounded-full ${t.bg400} animate-bounce [animation-delay:-0.15s] transition-colors duration-1000`} />
        <span className={`w-1.5 h-1.5 rounded-full ${t.bg400} animate-bounce transition-colors duration-1000`} />
      </div>
    </div>
  );
}
