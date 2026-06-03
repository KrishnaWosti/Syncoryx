"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PopupSettings {
  active: boolean;
  headline: string;
  description: string;
  discount: string;
  buttonText: string;
  placeholder: string;
  successMessage: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

interface SiteFields {
  heroTagline: string;
  heroSubtitle: string;
  ctaText: string;
  contactEmail: string;
  footerTagline: string;
  workSectionTitle: string;
  workSectionSubtitle: string;
}

type Tab = "popup" | "subscribers" | "fields";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("popup");

  // Popup state
  const [popup, setPopup] = useState<PopupSettings | null>(null);
  const [popupSaving, setPopupSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // Fields state
  const [fields, setFields] = useState<SiteFields | null>(null);
  const [fieldsSaving, setFieldsSaving] = useState(false);
  const [fieldsMessage, setFieldsMessage] = useState("");

  // Check auth on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Network error");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  // Fetch data when authenticated
  const fetchPopup = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/popup");
      if (res.ok) setPopup(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers);
        setSubscriberCount(data.total);
      }
    } catch { /* silent */ }
  }, []);

  const fetchFields = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/fields");
      if (res.ok) setFields(await res.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchPopup();
      fetchSubscribers();
      fetchFields();
    }
  }, [authenticated, fetchPopup, fetchSubscribers, fetchFields]);

  const savePopup = async () => {
    if (!popup) return;
    setPopupSaving(true);
    setPopupMessage("");
    try {
      const res = await fetch("/api/admin/popup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(popup),
      });
      if (res.ok) {
        setPopupMessage("Popup settings saved!");
        setTimeout(() => setPopupMessage(""), 3000);
      }
    } catch {
      setPopupMessage("Error saving popup settings");
    } finally {
      setPopupSaving(false);
    }
  };

  const saveFields = async () => {
    if (!fields) return;
    setFieldsSaving(true);
    setFieldsMessage("");
    try {
      const res = await fetch("/api/admin/fields", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setFieldsMessage("Site fields saved!");
        setTimeout(() => setFieldsMessage(""), 3000);
      }
    } catch {
      setFieldsMessage("Error saving site fields");
    } finally {
      setFieldsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(145deg, #070812, #0b1020)" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-violet-500" />
      </div>
    );
  }

  // Login Screen
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: "radial-gradient(900px 560px at 50% 30%, rgba(124,58,237,0.15), transparent 60%), linear-gradient(180deg, #070812, #0b1020)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <span className="text-2xl font-bold tracking-tight text-white select-none">
                Syncoryx
              </span>
            </div>
            <h1 className="text-xl font-semibold text-white text-center">Admin Access</h1>
            <p className="mt-2 text-sm text-white/50 text-center">Enter your password to continue</p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                autoFocus
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110 transition-all"
              >
                Sign In
              </button>
              {loginError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-400 text-center">
                  {loginError}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(900px 560px at 78% 4%, rgba(201,169,98,0.08), transparent 58%), radial-gradient(1200px 800px at 12% -10%, rgba(124,58,237,0.12), transparent 60%), linear-gradient(180deg, #070812, #0b1020)",
      }}
    >
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-white select-none">
              Syncoryx
            </span>
            <span className="text-xs font-medium text-white/40 tracking-wider uppercase">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 w-fit mb-8">
          {(["popup", "subscribers", "fields"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-violet-600/80 to-cyan-600/80 text-white shadow-lg"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab === "popup" && "Popup Manager"}
              {tab === "subscribers" && `Subscribers (${subscriberCount})`}
              {tab === "fields" && "Site Fields"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* POPUP TAB */}
          {activeTab === "popup" && popup && (
            <motion.div
              key="popup"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-6">Popup Settings</h2>

                {/* Active toggle */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/4 p-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-white">Popup Active</div>
                    <div className="text-xs text-white/50 mt-0.5">Toggle the popup on or off for all visitors</div>
                  </div>
                  <button
                    onClick={() => setPopup({ ...popup, active: !popup.active })}
                    className={`relative h-7 w-12 rounded-full transition-colors ${
                      popup.active ? "bg-gradient-to-r from-violet-600 to-cyan-600" : "bg-white/15"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                        popup.active ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "headline" as const, label: "Headline", type: "text" },
                    { key: "discount" as const, label: "Discount Text", type: "text" },
                    { key: "buttonText" as const, label: "Button Text", type: "text" },
                    { key: "placeholder" as const, label: "Input Placeholder", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        value={popup[field.key]}
                        onChange={(e) => setPopup({ ...popup, [field.key]: e.target.value })}
                        className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Description</label>
                  <textarea
                    value={popup.description}
                    onChange={(e) => setPopup({ ...popup, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Success Message</label>
                  <input
                    type="text"
                    value={popup.successMessage}
                    onChange={(e) => setPopup({ ...popup, successMessage: e.target.value })}
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={savePopup}
                    disabled={popupSaving}
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {popupSaving ? "Saving..." : "Save Changes"}
                  </button>
                  {popupMessage && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-lime-400">
                      {popupMessage}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SUBSCRIBERS TAB */}
          {activeTab === "subscribers" && (
            <motion.div
              key="subscribers"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Subscribers
                    <span className="ml-2 text-sm font-normal text-white/40">({subscriberCount})</span>
                  </h2>
                  <button
                    onClick={fetchSubscribers}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Refresh
                  </button>
                </div>

                {subscribers.length === 0 ? (
                  <div className="rounded-xl border border-white/8 bg-white/3 p-8 text-center">
                    <div className="text-sm text-white/40">No subscribers yet</div>
                    <div className="mt-1 text-xs text-white/25">Emails captured from the popup will appear here</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-white/8">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/8 bg-white/3">
                          <th className="px-4 py-3 text-left text-xs font-medium text-white/50">#</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((sub, i) => (
                          <tr key={sub.email} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                            <td className="px-4 py-3 text-white/40">{i + 1}</td>
                            <td className="px-4 py-3 text-white/80 font-mono text-xs">{sub.email}</td>
                            <td className="px-4 py-3 text-white/50 text-xs">
                              {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                                {sub.source}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* FIELDS TAB */}
          {activeTab === "fields" && fields && (
            <motion.div
              key="fields"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-2">Site Content Fields</h2>
                <p className="text-xs text-white/40 mb-6">Edit the text content displayed across the website. Changes take effect on the next page refresh.</p>

                <div className="space-y-4">
                  {[
                    { key: "heroTagline" as const, label: "Hero Tagline", multiline: false },
                    { key: "heroSubtitle" as const, label: "Hero Subtitle", multiline: true },
                    { key: "ctaText" as const, label: "CTA Button Text", multiline: false },
                    { key: "contactEmail" as const, label: "Contact Email", multiline: false },
                    { key: "footerTagline" as const, label: "Footer Tagline", multiline: false },
                    { key: "workSectionTitle" as const, label: "Work Section Title", multiline: false },
                    { key: "workSectionSubtitle" as const, label: "Work Section Subtitle", multiline: true },
                  ].map((field) => (
                    <div key={field.key} className="rounded-xl border border-white/8 bg-white/3 p-4">
                      <label className="block text-xs font-medium text-white/60 mb-1.5">{field.label}</label>
                      {field.multiline ? (
                        <textarea
                          value={fields[field.key]}
                          onChange={(e) => setFields({ ...fields, [field.key]: e.target.value })}
                          rows={3}
                          className="w-full rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={fields[field.key]}
                          onChange={(e) => setFields({ ...fields, [field.key]: e.target.value })}
                          className="w-full rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={saveFields}
                    disabled={fieldsSaving}
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {fieldsSaving ? "Saving..." : "Save Changes"}
                  </button>
                  {fieldsMessage && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-lime-400">
                      {fieldsMessage}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
