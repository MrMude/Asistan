// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CheckSquare, Square, Plus, Trash2, Download, Upload, Sparkles,
  Calendar, Users, Target, AlertTriangle, CheckCircle2, Clock,
  Search, FileSpreadsheet, Layers, Send, Edit3, X, ShieldCheck,
  ListTodo, RefreshCw, Award, Wifi, WifiOff, Share2, Globe, UserPlus,
  Lock, Key, LogOut, Shield, ChevronRight, ChevronDown, ArrowRight, ArrowLeft, Zap, Truck,
  FileUp, HelpCircle, AlertCircle, GripVertical, Edit2, Bell, LayoutDashboard, Check, BarChart3, FileText, Printer, MessageSquare, ExternalLink, MessageCircle, GitCommit, User, Flame, Trophy, FolderPlus
} from "lucide-react";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" }) : "");

const INITIAL_MODULES = [
  { id: "asakai", label: "Asakai Toplantısı", icon: Zap, color: "#F59E0B" },
  { id: "iyilestirme", label: "İyileştirme Toplantısı", icon: RefreshCw, color: "#38BDF8" },
  { id: "kalite_guvence", label: "Kalite Güvence", icon: ShieldCheck, color: "#10B981" },
  { id: "kalite_kontrol", label: "Kalite Kontrol", icon: CheckSquare, color: "#A855F7" },
  { id: "tedarik_kalite", label: "Tedarik Kalite", icon: Truck, color: "#EC4899" }
];

const KANBAN_STAGES = [
  { id: "acik", label: "Açık / Yeni", color: "#EF4444" },
  { id: "devam", label: "Devam Ediyor", color: "#F59E0B" },
  { id: "beklemede", label: "Beklemede", color: "#3B82F6" },
  { id: "tamam", label: "Tamamlandı", color: "#10B981" }
];

const INITIAL_USERS = [
  { id: "usr-admin", username: "admin", password: "0000", name: "Sistem Yöneticisi (Admin)", role: "admin", status: "approved" },
  { id: "usr-ahmet", username: "ahmet", password: "0000", name: "Ahmet Yılmaz", role: "moderator", status: "approved" },
  { id: "usr-selin", username: "selin", password: "0000", name: "Selin Yıldız", role: "user", status: "approved" }
];

const INITIAL_TASKS = [
  { id: "tsk-1", module: "asakai", kod: "ASK-2026-001", baslik: "Vardiya A Hatası Giriş Kontrol Tespiti", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-01", vade: "2026-08-10", bitisTarihi: "", durum: "acik", oncelik: "Kritik", subtasks: [{ id: "st-1", text: "Karantinaya alınması", done: true }] },
  { id: "tsk-2", module: "iyilestirme", kod: "IYL-2026-001", baslik: "Pres Hattı Fire Oranını Düşürme Kaizen", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-10", vade: "2026-09-01", bitisTarihi: "", durum: "devam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-3", module: "kalite_guvence", kod: "KGV-2026-001", baslik: "ISO 9001 İç Tetkik Hazırlıkları", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-02", vade: "2026-08-25", bitisTarihi: "", durum: "devam", oncelik: "Kritik", subtasks: [] },
  { id: "tsk-4", module: "kalite_kontrol", kod: "KKK-2026-001", baslik: "CNC Tezgah Parça Tolerans Ölçümü", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-03", vade: "2026-08-15", bitisTarihi: "2026-08-14", durum: "tamam", oncelik: "Yüksek", subtasks: [] }
];

const INITIAL_TODOS = [
  { id: "td-1", user: "Ahmet Yılmaz", text: "Sabah 09:00 Üretim hattı brifingine katıl", done: false, priority: "Yüksek", subtasks: [], developments: [] }
];

const INITIAL_CHATS = [
  { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", participants: [], messages: [{ id: "m-1", sender: "Ahmet Yılmaz", text: "Arkadaşlar toplantı verileri hazır mı?", time: "08:30" }] }
];

export default function App() {
  const [usersList, setUsersList] = useState(() => {
    try { const s = localStorage.getItem("dva_users_v4"); return s ? JSON.parse(s) : INITIAL_USERS; } catch(e) { return INITIAL_USERS; }
  });
  const [tasks, setTasks] = useState(() => {
    try { const s = localStorage.getItem("dva_tasks_v4"); return s ? JSON.parse(s) : INITIAL_TASKS; } catch(e) { return INITIAL_TASKS; }
  });
  const [todos, setTodos] = useState(() => {
    try { const s = localStorage.getItem("dva_todos_v4"); return s ? JSON.parse(s) : INITIAL_TODOS; } catch(e) { return INITIAL_TODOS; }
  });
  const [chats, setChats] = useState(() => {
    try { const s = localStorage.getItem("dva_chats_v4"); return s ? JSON.parse(s) : INITIAL_CHATS; } catch(e) { return INITIAL_CHATS; }
  });
  const [notifications, setNotifications] = useState(() => {
    try { const s = localStorage.getItem("dva_notifs_v4"); return s ? JSON.parse(s) : []; } catch(e) { return []; }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try { const s = localStorage.getItem("dva_current_user_v4"); return s ? JSON.parse(s) : null; } catch(e) { return null; }
  });
  const [isLocked, setIsLocked] = useState(() => !!localStorage.getItem("dva_current_user_v4"));
  const [pendingUserForPasswordSetup, setPendingUserForPasswordSetup] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const [activeModule, setActiveModule] = useState("dashboard");
  const [dashboardFilter, setDashboardFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("dva_users_v4", JSON.stringify(usersList));
      localStorage.setItem("dva_tasks_v4", JSON.stringify(tasks));
      localStorage.setItem("dva_todos_v4", JSON.stringify(todos));
      localStorage.setItem("dva_chats_v4", JSON.stringify(chats));
      localStorage.setItem("dva_notifs_v4", JSON.stringify(notifications));
      if (currentUser && !isLocked) localStorage.setItem("dva_current_user_v4", JSON.stringify(currentUser));
      else if (!currentUser) localStorage.removeItem("dva_current_user_v4");
    } catch(e) {}
  }, [usersList, tasks, todos, chats, notifications, currentUser, isLocked]);

  const addNotification = (targetName, text) => {
    const n = { id: uid(), user: targetName, text, date: todayStr(), read: false };
    setNotifications(prev => [n, ...prev]);
  };

  const handleLogin = (username, password) => {
    const found = usersList.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (found) {
      if (found.password === "0000") {
        setPendingUserForPasswordSetup(found);
        setError(null);
        return;
      }
      setCurrentUser(found);
      setIsLocked(false);
      setActiveModule("dashboard");
      setError(null);
    } else {
      setError("Hatalı Kullanıcı Adı veya Şifre! (İlk giriş şifresi: 0000)");
    }
  };

  const handleSaveFirstPassword = (e) => {
    e.preventDefault();
    if (!newPasswordInput.trim() || newPasswordInput.length !== 4 || isNaN(newPasswordInput)) {
      setError("Lütfen 4 haneli rakam giriniz.");
      return;
    }
    const updated = { ...pendingUserForPasswordSetup, password: newPasswordInput.trim() };
    setUsersList(prev => prev.map(u => u.id === updated.id ? updated : u));
    setCurrentUser(updated);
    setPendingUserForPasswordSetup(null);
    setNewPasswordInput("");
    setIsLocked(false);
    setActiveModule("dashboard");
    setError(null);
  };

  if (pendingUserForPasswordSetup) {
    return (
      <div style={styles.loginOverlay}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}><Key size={36} color="#F59E0B" /><h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>4 Haneli Şifre Belirleyin</h1></div>
          {error && <div style={styles.errorBar}>{error}</div>}
          <form onSubmit={handleSaveFirstPassword} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            <div><label style={styles.inputLabel}>Yeni Şifreniz</label><input type="password" maxLength={4} style={styles.mainInput} value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} required autoFocus /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Kaydet ve Başla <ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} onRegister={(name, username, password) => {
      const newUser = { id: uid(), name, username, password: password || "0000", role: "user", status: "approved" };
      setUsersList(prev => [...prev, newUser]);
      setError("Kayıt oluşturuldu, şimdi giriş yapabilirsiniz.");
    }} error={error} setError={setError} />;
  }

  if (isLocked) {
    return (
      <div style={styles.loginOverlay}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}><Lock size={36} color="#F59E0B" /><h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>Oturum Kilitli</h1></div>
          {error && <div style={styles.errorBar}>{error}</div>}
          <form onSubmit={e => { e.preventDefault(); const p = e.target.password.value; if(p === currentUser.password) { setIsLocked(false); setError(null); } else setError("Şifre hatalı!"); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={styles.inputLabel}>Şifreniz</label><input name="password" type="password" maxLength={4} style={styles.mainInput} required autoFocus /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Kilidi Aç <ArrowRight size={16} /></button>
            <button type="button" style={styles.ghostBtn} onClick={() => setCurrentUser(null)}>Farklı Hesap</button>
          </form>
        </div>
      </div>
    );
  }

  const myNotifications = notifications.filter(n => n.user === currentUser.name);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  return (
    <div style={styles.appShell}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}><ShieldCheck size={24} color="#F59E0B" /></div>
          <div><div style={styles.brandName}>Dva • Kalite OS</div><div style={styles.brandSub}>Süreç & Yetki Yönetim Paneli</div></div>
        </div>

        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} color="#F59E0B" /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} color="#F59E0B" /><span>To-Do List</span></button>
          {INITIAL_MODULES.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button key={m.id} style={{ ...styles.navTab, ...(isActive ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}>
                <Icon size={15} color={isActive ? "#F59E0B" : m.color} /><span>{m.label}</span>
              </button>
            );
          })}
          <button style={{ ...styles.navTab, ...(activeModule === "detayli_rapor" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("detayli_rapor")}><FileText size={15} color="#38BDF8" /><span>Detaylı Rapor</span></button>
          {currentUser.role === "admin" && (
            <button style={{ ...styles.navTab, ...(activeModule === "admin_panel" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin_panel")}><Lock size={15} color="#EF4444" /><span>Admin Panel</span></button>
          )}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          <button style={styles.notificationBellBtn} onClick={() => setShowNotificationsModal(true)} title="Bildirimler">
            <Bell size={18} color="#F59E0B" />{unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
          </button>
          <div style={styles.userProfileBar}>
            <div style={{ textAlign: "right" }}><div style={styles.userName}>{currentUser.name}</div><div style={styles.userRoleTag}>{currentUser.role === "admin" ? "🔑 Admin" : "👤 Kullanıcı"}</div></div>
            <div style={styles.userAvatar}>{currentUser.name.charAt(0)}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginLeft: 4 }}>
                <button style={styles.actionSmallBtn} onClick={() => setShowPasswordModal(true)} title="Şifre Değiştir"><Key size={14} color="#38BDF8" /></button>
                <button style={styles.actionSmallBtn} onClick={() => { setCurrentUser(null); setIsLocked(false); }} title="Çıkış Yap"><LogOut size={14} color="#EF4444" /></button>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {activeModule === "dashboard" ? (
          <DashboardView tasks={tasks} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "detayli_rapor" ? (
          <DetailedReportView tasks={tasks} usersList={usersList} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} setUsersList={setUsersList} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : (
          <KanbanBoardView activeModule={activeModule} tasks={tasks.filter((t) => t.module === activeModule)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser} onOpenDetail={setSelectedTask} onMoveStage={(id, st) => setTasks(tasks.map(t => t.id === id ? {...t, durum: st, bitisTarihi: st === "tamam" ? todayStr() : t.bitisTarihi} : t))} onCreateTask={(tData) => {
            const newId = uid();
            const prefix = (tData.module || "ask").substring(0, 3).toUpperCase();
            const newTask = { id: newId, module: tData.module || "asakai", kod: `${prefix}-2026-${(tasks.length+1).toString().padStart(3,"0")}`, baslik: tData.baslik, sorumlu: tData.sorumlu || currentUser.name, gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: todayStr(), vade: tData.vade || todayStr(), bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] };
            setTasks(prev => [...prev, newTask]);
            addNotification(newTask.sorumlu, `Yeni görev atandı: ${newTask.baslik}`);
          }} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} usersList={usersList} />
        )}
      </main>

      {/* Cubicl Tarzı Sabit Alt Köşe Sohbet Barı */}
      <ChatBar chats={chats} setChats={setChats} currentUser={currentUser} usersList={usersList} tasks={tasks} />

      {selectedTask && (
        <TaskDetailModal task={selectedTask} currentUser={currentUser} onClose={() => setSelectedTask(null)} onSaveTask={(updated) => setTasks(tasks.map(t => t.id === updated.id ? updated : t))} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} />
      )}
      {showPasswordModal && <ChangePasswordModal currentUser={currentUser} onClose={() => setShowPasswordModal(false)} onSaveUser={(updated) => setUsersList(usersList.map(u => u.id === updated.id ? updated : u))} />}
      {showNotificationsModal && <NotificationsModal notifications={myNotifications} onClose={() => setShowNotificationsModal(false)} onMarkAllRead={() => setNotifications(notifications.map(n => n.user === currentUser.name ? {...n, read: true} : n))} />}
    </div>
  );
}

// --- CHAT BAR (CUBICL TARZI AÇILIR KAPANIR SOHBET) ---
function ChatBar({ chats, setChats, currentUser, usersList, tasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general"); // general or direct
  const [selectedTargetUser, setSelectedTargetUser] = useState(null);
  const [msgText, setMsgText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isOpen, activeTab, selectedTargetUser]);

  const generalChat = chats.find(c => c.type === "general") || { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", messages: [] };

  const getDirectChat = (targetName) => {
    let found = chats.find(c => c.type === "direct" && c.participants?.includes(currentUser.name) && c.participants?.includes(targetName));
    if (!found) {
      found = { id: `direct-${uid()}`, type: "direct", participants: [currentUser.name, targetName], title: targetName, messages: [] };
      setChats(prev => [...prev, found]);
    }
    return found;
  };

  const currentActiveChat = activeTab === "general" ? generalChat : getDirectChat(selectedTargetUser);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: uid(), sender: currentUser.name, text: msgText.trim(), time: timeStr };

    if (activeTab === "general") {
      const updated = { ...generalChat, messages: [...generalChat.messages, newMsg] };
      setChats(prev => prev.map(c => c.id === generalChat.id ? updated : c));
    } else {
      const direct = getDirectChat(selectedTargetUser);
      const updated = { ...direct, messages: [...direct.messages, newMsg] };
      setChats(prev => prev.map(c => c.id === direct.id ? updated : c));
    }
    setMsgText("");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{ position: "fixed", bottom: 20, right: 20, background: "#F59E0B", color: "#0F172A", border: "none", borderRadius: "50%", width: 56, height: 56, boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          title="Ekip Sohbeti"
        >
          <MessageCircle size={28} />
          {generalChat.messages.length > 0 && (
            <span style={{ position: "absolute", top: 0, right: 0, background: "#EF4444", color: "#FFF", fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: "50%" }}>
              {generalChat.messages.length}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: 360, height: 480, background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", zIndex: 1001, overflow: "hidden" }}>
          <div style={{ background: "#0F172A", padding: "10px 14px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...styles.periodBtn, ...(activeTab === "general" ? styles.periodBtnActive : {}) }} onClick={() => setActiveTab("general")}>🌐 Genel</button>
              <button style={{ ...styles.periodBtn, ...(activeTab === "direct" ? styles.periodBtnActive : {}) }} onClick={() => { setActiveTab("direct"); if(!selectedTargetUser) { const first = usersList.find(u => u.name !== currentUser.name); if(first) setSelectedTargetUser(first.name); } }}>👤 Bireysel</button>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" }}><X size={18} /></button>
          </div>

          {activeTab === "direct" && (
            <div style={{ background: "#161E2E", padding: "6px 12px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>Kişi:</span>
              <select style={{ ...styles.selectInput, fontSize: 11, padding: "4px 8px" }} value={selectedTargetUser || ""} onChange={e => setSelectedTargetUser(e.target.value)}>
                {usersList.filter(u => u.name !== currentUser.name).map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
          )}

          <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {currentActiveChat?.messages?.map(m => {
              const isMe = m.sender === currentUser.name;
              return (
                <div key={m.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2, textAlign: isMe ? "right" : "left" }}>{m.sender} • {m.time}</div>
                  <div style={{ background: isMe ? "#F59E0B" : "#0F172A", color: isMe ? "#0F172A" : "#F8FAFC", padding: "8px 12px", borderRadius: 10, fontSize: 12, fontWeight: isMe ? 700 : 400 }}>{m.text}</div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ padding: 10, background: "#0F172A", borderTop: "1px solid #334155", display: "flex", gap: 8 }}>
            <input style={{ ...styles.mainInput, fontSize: 11, padding: "8px 10px" }} placeholder="Mesaj yazın..." value={msgText} onChange={e => setMsgText(e.target.value)} autoFocus />
            <button type="submit" style={{ ...styles.primaryActionBtn, padding: "8px 12px" }}><Send size={14} /></button>
          </form>
        </div>
      )}
    </>
  );
}

// --- TODO LIST (TAM FONKSİYONEL) ---
function TodoListView({ todos, setTodos, currentUser }) {
  const [newText, setNewText] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [selectedId, setSelectedId] = useState(null);
  const [subText, setSubText] = useState("");
  const [devText, setDevText] = useState("");

  const myTodos = todos.filter(t => t.user === currentUser.name);
  const activeTodo = myTodos.find(t => t.id === selectedId);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const item = { id: uid(), user: currentUser.name, text: newText.trim(), done: false, priority, subtasks: [], developments: [] };
    setTodos([item, ...todos]);
    setNewText("");
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Kişisel Yapılacaklar (To-Do List)</h1><p style={styles.viewSub}>Notlarınızı ve alt adımlarınızı buradan yönetin.</p></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedId ? "1.2fr 1fr" : "1fr", gap: 20 }}>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <form onSubmit={handleAddTodo} style={{ display: "flex", gap: 10 }}>
            <input style={{ ...styles.mainInput, flex: 3 }} placeholder="Yeni yapılacak iş..." value={newText} onChange={e => setNewText(e.target.value)} />
            <select style={{ ...styles.selectInput, flex: 1 }} value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Yüksek">Yüksek ⚡</option>
              <option value="Kritik">Kritik 🔥</option>
            </select>
            <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Ekle</button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 450, overflowY: "auto" }}>
            {myTodos.length === 0 ? <div style={{ color: "#64748B", textAlign: "center", padding: 30 }}>Henüz To-Do kaydınız yok.</div> : myTodos.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: selectedId === t.id ? "#334155" : "#0F172A", padding: "12px 16px", borderRadius: 10, border: "1px solid #334155" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flex: 1 }} onClick={() => setTodos(todos.map(x => x.id === t.id ? {...x, done: !x.done} : x))}>
                  {t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}
                  <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{t.text}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button style={styles.editIconBtn} onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}>{selectedId === t.id ? "Kapat" : "Detay"}</button>
                  <button style={styles.deleteIconBtn} onClick={() => setTodos(todos.filter(x => x.id !== t.id))}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeTodo && (
          <div style={{ background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>To-Do Detayı</h3>
              <button style={styles.closeBtn} onClick={() => setSelectedId(null)}><X size={16} /></button>
            </div>

            <div style={{ background: "#0F172A", padding: 12, borderRadius: 10 }}>
              <label style={styles.inputLabel}>Alt Adımlar</label>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <input style={styles.mainInput} placeholder="Alt adım..." value={subText} onChange={e => setSubText(e.target.value)} />
                <button style={styles.addInlineBtn} onClick={() => { if(!subText.trim()) return; setTodos(todos.map(t => t.id === activeTodo.id ? {...t, subtasks: [...(t.subtasks||[]), {id: uid(), text: subText.trim(), done: false}]} : t)); setSubText(""); }}>Ekle</button>
              </div>
              {(activeTodo.subtasks || []).map(s => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", background: "#1E293B", padding: "6px 8px", borderRadius: 6, fontSize: 12, marginBottom: 4 }}>
                  <span onClick={() => setTodos(todos.map(t => t.id === activeTodo.id ? {...t, subtasks: t.subtasks.map(x => x.id === s.id ? {...x, done: !x.done} : x)} : t))} style={{ textDecoration: s.done ? "line-through" : "none", cursor: "pointer" }}>{s.text}</span>
                  <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => setTodos(todos.map(t => t.id === activeTodo.id ? {...t, subtasks: t.subtasks.filter(x => x.id !== s.id)} : t))} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- DİĞER EKRANLAR (DASHBOARD, KANBAN, RAPOR, ADMIN) ---
function DashboardView({ tasks, currentUser, dashboardFilter, setDashboardFilter, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name);
  const filtered = myTasks.filter(t => dashboardFilter === "aktif" ? t.durum !== "tamam" : dashboardFilter === "tamamlanan" ? t.durum === "tamam" : true);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Dashboard</h1><p style={styles.viewSub}>Hoş geldiniz, {currentUser.name}.</p></div>
        <button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button>
      </div>
      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8", cursor: "pointer" }} onClick={() => setDashboardFilter("all")}><div style={styles.dashCardTitle}>Toplam İş</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B", cursor: "pointer" }} onClick={() => setDashboardFilter("aktif")}><div style={styles.dashCardTitle}>Aktif İşler</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum !== "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981", cursor: "pointer" }} onClick={() => setDashboardFilter("tamamlanan")}><div style={styles.dashCardTitle}>Tamamlanan</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map(t => (
          <div key={t.id} style={styles.personalTaskCard} onClick={() => onOpenDetail(t)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={styles.taskCodeBadge}>{t.kod}</span><span style={{ fontSize: 10, color: "#F59E0B" }}>{t.durum.toUpperCase()}</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{t.baslik}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoardView({ activeModule, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showModal, setShowModal] = useState(false);
  const currentModObj = INITIAL_MODULES.find(m => m.id === activeModule) || INITIAL_MODULES[0];
  const filtered = tasks.filter(t => t.baslik.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><currentModObj.icon size={24} color={currentModObj.color} /><h1 style={styles.viewTitle}>{currentModObj.label}</h1></div>
        <button style={styles.primaryActionBtn} onClick={() => setShowModal(true)}><Plus size={16} /> Görev Ekle</button>
      </div>
      <div style={styles.filterToolbar}><div style={styles.searchWrapper}><Search size={15} color="#F59E0B" /><input style={styles.searchInput} placeholder="Ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div></div>
      <div style={styles.kanbanGrid}>
        {KANBAN_STAGES.map(stage => {
          const stageTasks = filtered.filter(t => t.durum === stage.id);
          return (
            <div key={stage.id} style={styles.kanbanColumn} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("text"); if(id) onMoveStage(id, stage.id); }}>
              <div style={{ ...styles.kanbanColumnHeader, borderTopColor: stage.color }}><span style={{ fontWeight: 800, fontSize: 13, color: stage.color }}>{stage.label}</span><span style={styles.kanbanBadge}>{stageTasks.length}</span></div>
              <div style={styles.kanbanCardsList}>
                {stageTasks.map(task => (
                  <div key={task.id} style={styles.kanbanCard} draggable onDragStart={e => e.dataTransfer.setData("text", task.id)}>
                    <div style={styles.cardHeaderRow}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.deleteIconBtn} onClick={() => onDeleteTask(task.id)}><Trash2 size={12} /></button></div>
                    <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(task)}>{task.baslik}</div>
                    <div style={styles.kanbanCardFooter}><span>👤 {task.sorumlu}</span><span>📅 {fmtDate(task.vade)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && <CreateTaskModal activeModule={activeModule} usersList={usersList} currentUser={currentUser} onClose={() => setShowModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function CreateTaskModal({ activeModule, usersList, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || "");
  const [vade, setVade] = useState(todayStr());
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Görev</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Görev yazın..." required /></div>
          <div><label style={styles.inputLabel}>Sorumlu</label><select style={styles.selectInput} value={sorumlu} onChange={e => setSorumlu(e.target.value)}>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select></div>
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module: activeModule }); onClose(); }}>Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, onClose, onSaveTask, onDeleteTask }) {
  const [subText, setSubText] = useState("");
  const [editTitle, setEditTitle] = useState(task.baslik);
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={styles.drawerBody}>
          <input style={styles.mainInput} value={editTitle} onChange={e => setEditTitle(e.target.value)} onBlur={() => onSaveTask({...task, baslik: editTitle})} />
          <select style={styles.selectInput} value={task.durum} onChange={e => onSaveTask({...task, durum: e.target.value})}>{KANBAN_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
          <div style={styles.subtaskSection}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#F59E0B" }}>Alt Adımlar</div>
            {(task.subtasks || []).map(st => (
              <div key={st.id} style={styles.subtaskRowInteractive} onClick={() => onSaveTask({...task, subtasks: task.subtasks.map(s => s.id === st.id ? {...s, done: !s.done} : s)})}>
                {st.done ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#6B7280" />}
                <span style={{ textDecoration: st.done ? "line-through" : "none", flex: 1 }}>{st.text}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <input style={styles.mainInput} placeholder="Alt adım..." value={subText} onChange={e => setSubText(e.target.value)} />
              <button style={styles.addInlineBtn} onClick={() => { if(!subText.trim()) return; onSaveTask({...task, subtasks: [...(task.subtasks||[]), {id: uid(), text: subText.trim(), done: false}]}); setSubText(""); }}>Ekle</button>
            </div>
          </div>
        </div>
        <div style={styles.drawerFooter}><button style={styles.deleteDangerBtn} onClick={() => onDeleteTask(task.id)}>Sil</button><button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function DetailedReportView({ tasks }) {
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Detaylı Rapor</h1><button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Modül</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>{tasks.map(t => (<tr key={t.id} style={styles.tr}><td style={styles.td}>{t.kod}</td><td style={styles.tdTitle}>{t.baslik}</td><td style={styles.td}>{t.module}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.durum}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, setUsersList }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Admin Paneli</h1><button style={styles.primaryActionBtn} onClick={() => setShowModal(true)}>Kullanıcı Ekle</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>
            {usersList.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.tdTitle}>{u.name}</td><td style={styles.td}>{u.username}</td><td style={styles.td}>{u.role}</td>
                <td style={styles.td}><button style={styles.deleteDangerBtn} onClick={() => setUsersList(usersList.filter(x => x.id !== u.id))}>Sil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <UserModal onClose={() => setShowModal(false)} onSave={(u) => setUsersList([...usersList, u])} />}
    </div>
  );
}

function UserModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("0000");
  const [role, setRole] = useState("user");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <h2>Kullanıcı Ekle</h2>
        <form onSubmit={e => { e.preventDefault(); onSave({ id: uid(), name, username, password, role, status: "approved" }); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          <input style={styles.mainInput} placeholder="Ad Soyad" value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.mainInput} placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} required />
          <input style={styles.mainInput} type="password" maxLength={4} placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
          <select style={styles.selectInput} value={role} onChange={e => setRole(e.target.value)}><option value="user">Kullanıcı</option><option value="admin">Admin</option></select>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
        </form>
      </div>
    </div>
  );
}

function NotificationsModal({ notifications, onClose, onMarkAllRead }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <h2>Bildirimler</h2>
        {notifications.map(n => (<div key={n.id} style={{ background: "#0F172A", padding: 8, marginTop: 6, borderRadius: 6, fontSize: 12 }}>{n.text}</div>))}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={styles.ghostBtn} onClick={onMarkAllRead}>Okundu İşaretle</button>
          <button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordModal({ currentUser, onClose, onSaveUser }) {
  const [p, setP] = useState("");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <h2>Şifre Değiştir</h2>
        <form onSubmit={e => { e.preventDefault(); if(p.length===4) { onSaveUser({...currentUser, password: p}); onClose(); } }} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          <input type="password" maxLength={4} style={styles.mainInput} placeholder="Yeni 4 Haneli Şifre" value={p} onChange={e => setP(e.target.value)} required />
          <button type="submit" style={styles.primaryActionBtn}>Değiştir</button>
        </form>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, onRegister, error, setError }) {
  const [isReg, setIsReg] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.loginLogo}><ShieldCheck size={36} color="#F59E0B" /></div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: "#F59E0B" }}>Dva Kalite OS</h1>
          <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>🔑 İlk giriş şifresi: <b>0000</b></p>
        </div>
        {error && <div style={styles.errorBar}>{error}</div>}
        {!isReg ? (
          <form onSubmit={e => { e.preventDefault(); onLogin(u, p); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            <div><label style={styles.inputLabel}>Kullanıcı Adı (admin, ahmet, selin)</label><input style={styles.mainInput} value={u} onChange={e => setU(e.target.value)} required autoFocus /></div>
            <div><label style={styles.inputLabel}>Şifre</label><input type="password" maxLength={4} style={styles.mainInput} value={p} onChange={e => setP(e.target.value)} required /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Giriş Yap <ArrowRight size={16} /></button>
            <button type="button" style={{ background: "transparent", border: "none", color: "#38BDF8", fontSize: 12, cursor: "pointer" }} onClick={() => setIsReg(true)}>Kayıt Ol</button>
          </form>
        ) : (
          <form onSubmit={e => { e.preventDefault(); onRegister(name, u, p); setIsReg(false); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            <div><label style={styles.inputLabel}>Adı Soyadı</label><input style={styles.mainInput} value={name} onChange={e => setName(e.target.value)} required /></div>
            <div><label style={styles.inputLabel}>Kullanıcı ID</label><input style={styles.mainInput} value={u} onChange={e => setU(e.target.value)} required /></div>
            <div><label style={styles.inputLabel}>Şifre (0000)</label><input type="password" maxLength={4} style={styles.mainInput} value={p} onChange={e => setP(e.target.value)} required /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Kayıt Oluştur</button>
            <button type="button" style={{ background: "transparent", border: "none", color: "#94A3B8", fontSize: 12, cursor: "pointer" }} onClick={() => setIsReg(false)}>← Girişe Dön</button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  appShell: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#0F172A", color: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", padding: "12px 24px", background: "#1E293B", borderBottom: "2px solid #F59E0B", gap: 16, flexWrap: "wrap" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { background: "rgba(245, 158, 11, 0.15)", padding: 8, borderRadius: 10, display: "flex" },
  brandName: { fontWeight: 800, fontSize: 16, color: "#F59E0B" },
  brandSub: { fontSize: 10, color: "#94A3B8" },
  navTabs: { display: "flex", gap: 6, background: "#0F172A", padding: 4, borderRadius: 10, flexWrap: "wrap" },
  navTab: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent", color: "#94A3B8", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  navTabActive: { background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B", border: "1px solid #F59E0B" },
  navTabAdminActive: { background: "rgba(239, 68, 68, 0.2)", color: "#EF4444", border: "1px solid #EF4444" },
  notificationBellBtn: { background: "#1E293B", border: "1px solid #334155", borderRadius: 8, padding: 8, cursor: "pointer", position: "relative" },
  notificationBadge: { position: "absolute", top: -4, right: -4, background: "#EF4444", color: "#FFF", fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: "50%" },
  userProfileBar: { display: "flex", alignItems: "center", gap: 10, background: "#0F172A", padding: "6px 12px", borderRadius: 10, border: "1px solid #334155" },
  userAvatar: { width: 32, height: 32, borderRadius: "50%", background: "#F59E0B", color: "#0F172A", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" },
  userName: { fontSize: 12, fontWeight: 700 },
  userRoleTag: { fontSize: 10, color: "#F59E0B" },
  actionSmallBtn: { background: "transparent", border: "none", cursor: "pointer" },
  errorBar: { background: "rgba(239, 68, 68, 0.2)", padding: 8, color: "#FCA5A5", fontSize: 12, textAlign: "center", borderRadius: 6 },
  mainContent: { flex: 1, padding: "20px 24px", overflowY: "auto" },
  viewContainer: { display: "flex", flexDirection: "column", gap: 20 },
  dashboardCardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 },
  dashCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: 16, borderLeft: "4px solid" },
  dashCardTitle: { fontSize: 11, color: "#94A3B8", fontWeight: 600 },
  dashCardValue: { fontSize: 24, fontWeight: 800, marginTop: 6, color: "#F59E0B" },
  periodBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" },
  periodBtnActive: { background: "#F59E0B", color: "#0F172A", border: "1px solid #F59E0B" },
  printBtn: { background: "#1E293B", color: "#38BDF8", border: "1px solid #38BDF8", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  personalTaskCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 16, cursor: "pointer" },
  kanbanGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
  kanbanColumn: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 14, minHeight: 450 },
  kanbanColumnHeader: { display: "flex", justifyContent: "space-between", borderTop: "3px solid", paddingTop: 8, paddingBottom: 6 },
  kanbanBadge: { background: "#0F172A", color: "#F8FAFC", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 },
  kanbanCardsList: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 },
  kanbanCard: { background: "#0F172A", border: "1px solid #334155", borderRadius: 10, padding: 12, cursor: "grab" },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  kanbanCardTitle: { fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 6 },
  kanbanCardFooter: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 8 },
  taskCodeBadge: { fontFamily: "monospace", fontSize: 10, color: "#F59E0B", background: "rgba(245, 158, 11, 0.15)", padding: "2px 6px", borderRadius: 4, fontWeight: 700 },
  filterToolbar: { display: "flex", gap: 12 },
  searchWrapper: { display: "flex", alignItems: "center", gap: 8, background: "#1E293B", padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", flex: 1 },
  searchInput: { background: "transparent", border: "none", color: "#F8FAFC", fontSize: 12, outline: "none", width: "100%" },
  primaryActionBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" },
  ghostBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer" },
  yearEndHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  viewTitle: { fontSize: 20, fontWeight: 800 },
  viewSub: { fontSize: 11, color: "#94A3B8" },
  yearEndTableCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" },
  th: { borderBottom: "1px solid #334155", padding: "10px 12px", color: "#F59E0B", fontWeight: 700 },
  tr: { borderBottom: "1px solid #0F172A" },
  td: { padding: "10px 12px" },
  tdTitle: { padding: "10px 12px", fontWeight: 700 },
  deleteIconBtn: { background: "transparent", border: "none", color: "#EF4444", cursor: "pointer" },
  editIconBtn: { background: "transparent", border: "none", color: "#F59E0B", cursor: "pointer", fontWeight: 600, fontSize: 11 },
  loginOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 1000 },
  loginCard: { background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 16 },
  loginHeader: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  loginLogo: { width: 64, height: 64, borderRadius: 16, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" },
  inputLabel: { fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4, display: "block" },
  mainInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "10px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  selectInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  loginSubmitBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 },
  drawerContainer: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", overflow: "hidden" },
  createModalContent: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 500, padding: 20 },
  drawerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid #334155" },
  drawerBody: { padding: "16px 0", display: "flex", flexDirection: "column", gap: 12 },
  closeBtn: { background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" },
  subtaskSection: { background: "#0F172A", padding: 12, borderRadius: 10 },
  subtaskRowInteractive: { display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer" },
  addInlineBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "6px 12px", borderRadius: 6, fontWeight: 700, cursor: "pointer" },
  drawerFooter: { display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #334155" },
  deleteDangerBtn: { background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer" },
  formTitle: { fontSize: 16, fontWeight: 800, color: "#F59E0B" }
};