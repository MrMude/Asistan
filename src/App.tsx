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
const getDaysDiff = (target) => {
  if (!target) return 999;
  return Math.ceil((new Date(target) - new Date(todayStr())) / (1000 * 60 * 60 * 24));
};

const INITIAL_MODULES = [
  { id: "asakai", label: "Asakai Toplantısı", color: "#F59E0B" },
  { id: "iyilestirme", label: "İyileştirme Toplantısı", color: "#38BDF8" },
  { id: "kalite_guvence", label: "Kalite Güvence", color: "#10B981" },
  { id: "kalite_kontrol", label: "Kalite Kontrol", color: "#A855F7" },
  { id: "tedarik_kalite", label: "Tedarik Kalite", color: "#EC4899" }
];

const KANBAN_STAGES = [
  { id: "acik", label: "Açık / Yeni", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" },
  { id: "devam", label: "Devam Ediyor", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
  { id: "beklemede", label: "Beklemede", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  { id: "tamam", label: "Tamamlandı", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" }
];

const INITIAL_USERS = [
  { id: "usr-admin", username: "admin", password: "0000", name: "Sistem Yöneticisi (Admin)", role: "admin", status: "approved", permissions: ["asakai", "iyilestirme", "kalite_guvence", "kalite_kontrol", "tedarik_kalite"] },
  { id: "usr-ahmet", username: "ahmet", password: "0000", name: "Ahmet Yılmaz", role: "moderator", status: "approved", permissions: ["asakai", "kalite_guvence"] },
  { id: "usr-selin", username: "selin", password: "0000", name: "Selin Yıldız", role: "user", status: "approved", permissions: ["kalite_kontrol", "iyilestirme"] }
];

const INITIAL_TASKS = [
  { id: "tsk-1", module: "asakai", kod: "ASK-2026-001", baslik: "Vardiya A Hatası Giriş Kontrol Tespiti", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-01", vade: "2026-08-28", bitisTarihi: "", durum: "acik", oncelik: "Kritik", subtasks: [{ id: "st-1", text: "Karantinaya alınması", sorumlu: "Ahmet Yılmaz", done: true }] },
  { id: "tsk-2", module: "iyilestirme", kod: "IYL-2026-001", baslik: "Pres Hattı Fire Oranını Düşürme Kaizen Projesi", sorumlu: "Selin Yıldız", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz", "Selin Yıldız"], acilisTarihi: "2026-08-10", vade: "2026-09-01", bitisTarihi: "", durum: "devam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-3", module: "kalite_guvence", kod: "KGV-2026-001", baslik: "ISO 9001 İç Tetkik Hazırlıkları ve Doküman Revizyonu", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz"], acilisTarihi: "2026-08-02", vade: "2026-08-25", bitisTarihi: "", durum: "devam", oncelik: "Kritik", subtasks: [] },
  { id: "tsk-4", module: "kalite_kontrol", kod: "KKK-2026-001", baslik: "CNC Tezgah Parça Tolerans Ölçüm Doğrulaması", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-03", vade: "2026-08-15", bitisTarihi: "2026-08-14", durum: "tamam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-5", module: "tedarik_kalite", kod: "TRD-2026-001", baslik: "Sac Tedarikçisi ABC Metal hammadde girdi kontrolü", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-04", vade: "2026-08-30", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [] }
];

const INITIAL_TODOS = [
  { id: "td-1", user: "Sistem Yöneticisi (Admin)", text: "Haftalık KPI Raporlarını İncele", done: false, priority: "Yüksek", subtasks: [{ id: "ts-1", text: "Dashboard verilerini dışa aktar", done: true }], developments: [] }
];

const INITIAL_CHATS = [
  { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", participants: [], messages: [{ id: "m-1", sender: "Sistem Yöneticisi (Admin)", text: "Herkese iyi çalışmalar, sisteme hoş geldiniz.", time: "08:30" }] }
];

export default function App() {
  const [modulesList, setModulesList] = useState(() => {
    const saved = localStorage.getItem("dva_v6_modules");
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("dva_v6_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dva_v6_tasks");
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("dva_v6_todos");
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("dva_v6_chats");
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("dva_v6_notifs");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("dva_v6_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLocked, setIsLocked] = useState(() => {
    return localStorage.getItem("dva_v6_current_user") ? true : false;
  });

  const [pendingUserForPasswordSetup, setPendingUserForPasswordSetup] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const [activeModule, setActiveModule] = useState("dashboard");
  const [dashboardFilter, setDashboardFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  useEffect(() => { localStorage.setItem("dva_v6_modules", JSON.stringify(modulesList)); }, [modulesList]);
  useEffect(() => { localStorage.setItem("dva_v6_users", JSON.stringify(usersList)); }, [usersList]);
  useEffect(() => { localStorage.setItem("dva_v6_tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("dva_v6_todos", JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem("dva_v6_chats", JSON.stringify(chats)); }, [chats]);
  useEffect(() => { localStorage.setItem("dva_v6_notifs", JSON.stringify(notifications)); }, [notifications]);
  
  useEffect(() => {
    if (currentUser && !isLocked) {
      localStorage.setItem("dva_v6_current_user", JSON.stringify(currentUser));
    } else if (!currentUser) {
      localStorage.removeItem("dva_v6_current_user");
    }
  }, [currentUser, isLocked]);

  const addNotification = (targetUserName, message, ekipUyeleri = []) => {
    const newNotif = { id: uid(), user: targetUserName, ekipUyeleri, text: message, date: todayStr(), read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleLogin = (username, password) => {
    const found = usersList.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (found) {
      if (found.status === "pending") {
        setError("Hesabınız henüz Admin onayından geçmemiştir.");
        return;
      }
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
      setError("Hatalı Kullanıcı Adı veya Şifre!");
    }
  };

  const handleSaveFirstPassword = (e) => {
    e.preventDefault();
    if (!newPasswordInput.trim() || newPasswordInput.length !== 4 || isNaN(newPasswordInput)) {
      setError("Lütfen tam olarak 4 haneli rakamlardan oluşan bir şifre giriniz.");
      return;
    }
    const updatedUser = { ...pendingUserForPasswordSetup, password: newPasswordInput.trim() };
    setUsersList(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    setPendingUserForPasswordSetup(null);
    setNewPasswordInput("");
    setIsLocked(false);
    setActiveModule("dashboard");
    setError(null);
  };

  const handleApproveUser = (userId) => { setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: "approved" } : u)); };
  const handleUnlock = (password) => { if (currentUser && password === currentUser.password) { setIsLocked(false); setError(null); } else { setError("Şifre hatalı!"); } };
  const handleLogout = () => { setCurrentUser(null); setIsLocked(false); };
  
  const handleSaveUser = (userObj) => {
    setUsersList((prev) => {
      const exists = prev.find((u) => u.id === userObj.id);
      if (exists) return prev.map((u) => (u.id === userObj.id ? userObj : u));
      return [...prev, userObj];
    });
    if (currentUser?.id === userObj.id) setCurrentUser(userObj);
  };
  const handleDeleteUser = (userId) => { setUsersList((prev) => prev.filter((u) => u.id !== userId)); };
  
  const handleAddModule = (label, color) => {
    const newId = "mod_" + uid();
    const newMod = { id: newId, label, color: color || "#38BDF8" };
    setModulesList(prev => [...prev, newMod]);
    // Admin yetkisine otomatik ekle
    setUsersList(prev => prev.map(u => u.role === "admin" ? { ...u, permissions: [...(u.permissions || []), newId] } : u));
  };

  const handleDeleteModule = (modId) => {
    if (modulesList.length <= 1) {
      setError("En az bir ana başlık kalmalıdır!");
      return;
    }
    setModulesList(prev => prev.filter(m => m.id !== modId));
  };

  const handleSaveTask = (taskObj) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === taskObj.id);
      if (exists) return prev.map((t) => (t.id === taskObj.id ? taskObj : t));
      return [...prev, taskObj];
    });
    if (selectedTask?.id === taskObj.id) setSelectedTask(taskObj);
  };
  const handleDeleteTask = (taskId) => { setTasks((prev) => prev.filter((t) => t.id !== taskId)); if (selectedTask?.id === taskId) setSelectedTask(null); };
  
  const handleMoveStage = (taskId, newStage) => {
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      const bitis = newStage === "tamam" ? todayStr() : target.bitisTarihi;
      handleSaveTask({ ...target, durum: newStage, bitisTarihi: bitis });
    }
  };

  const handleAddSubtask = (taskId, subText, subSorumlu) => {
    if (!subText.trim()) return;
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      const newSub = { id: uid(), text: subText.trim(), sorumlu: subSorumlu || target.sorumlu, done: false };
      handleSaveTask({ ...target, subtasks: [...(target.subtasks || []), newSub] });
      addNotification(subSorumlu || target.sorumlu, `Yeni alt adım atandı: ${subText.trim()}`);
    }
  };
  const handleToggleSubtask = (taskId, subtaskId) => {
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      const newSubs = (target.subtasks || []).map((st) => st.id === subtaskId ? { ...st, done: !st.done } : st );
      handleSaveTask({ ...target, subtasks: newSubs });
    }
  };

  const handleCreateTask = (taskData) => {
    setTasks((prev) => {
      const prefix = (taskData.module || "ask").substring(0, 3).toUpperCase();
      const newTask = {
        id: uid(), module: taskData.module || modulesList[0]?.id || "asakai", kod: `${prefix}-2026-${(prev.length + 1).toString().padStart(3, "0")}`,
        baslik: taskData.baslik, sorumlu: taskData.sorumlu || currentUser.name, gorevTipi: taskData.gorevTipi || "bireysel",
        ekipUyeleri: taskData.gorevTipi === "ekip" ? (taskData.ekipUyeleri || []) : [], acilisTarihi: todayStr(),
        vade: taskData.vade || todayStr(), bitisTarihi: "", durum: "acik", oncelik: taskData.oncelik || "Orta", subtasks: []
      };
      addNotification(newTask.sorumlu, `Yeni görev atandı: ${newTask.baslik}`, newTask.ekipUyeleri);
      return [...prev, newTask];
    });
  };

  if (pendingUserForPasswordSetup) {
    return (
      <div style={styles.loginOverlay}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <div style={styles.loginLogo}><Key size={36} color="#F59E0B" /></div>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>4 Haneli Şifre Belirleyin</h1>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>Hoş geldiniz, {pendingUserForPasswordSetup.name}. İlk giriş şifreniz doğrulandı. Lütfen kalıcı 4 haneli şifrenizi girin.</p>
          </div>
          {error && <div style={styles.errorBar}>{error}</div>}
          <form onSubmit={handleSaveFirstPassword} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            <div><label style={styles.inputLabel}>4 Haneli Yeni Şifre</label><input type="password" maxLength={4} style={styles.mainInput} value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} placeholder="Örn: 1453" required autoFocus /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Şifreyi Kaydet ve Giriş Yap <ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginScreen onLogin={handleLogin} error={error} />;
  if (isLocked) return <LockScreen currentUser={currentUser} onUnlock={handleUnlock} onSwitchUser={handleLogout} error={error} />;

  const myNotifications = notifications.filter(n => n.user === currentUser.name || (n.ekipUyeleri && n.ekipUyeleri.includes(currentUser.name)));
  const unreadCount = myNotifications.filter(n => !n.read).length;

  return (
    <div style={styles.appShell}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}><ShieldCheck size={24} color="#F59E0B" /></div>
          <div><div style={styles.brandName}>Dva • Kalite OS</div><div style={styles.brandSub}>Süreç & Yetki Yönetim Paneli</div></div>
        </div>
        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} /><span>To-Do List</span></button>
          {modulesList.map((m) => {
            if (currentUser.role !== "admin" && !(currentUser.permissions || []).includes(m.id)) return null;
            return <button key={m.id} style={{ ...styles.navTab, ...(activeModule === m.id ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}><Zap size={15} color={activeModule === m.id ? "#F59E0B" : m.color} /><span>{m.label}</span></button>;
          })}
          <button style={{ ...styles.navTab, ...(activeModule === "ic_yazisma" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("ic_yazisma")}><MessageCircle size={15} color="#38BDF8" /><span>İç Yazışmalar</span></button>
          
          {(currentUser.role === "admin" || currentUser.role === "moderator") && (
            <button style={{ ...styles.navTab, ...(activeModule === "detayli_rapor" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("detayli_rapor")}><FileText size={15} color="#38BDF8" /><span>Detaylı Rapor</span></button>
          )}
          {currentUser.role === "admin" && (
            <button style={{ ...styles.navTab, ...(activeModule === "admin_panel" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin_panel")}><Lock size={15} color="#EF4444" /><span>Yetki & Ana Başlıklar</span></button>
          )}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          <button style={styles.notificationBellBtn} onClick={() => setShowNotificationsModal(true)} title="Bildirimler">
            <Bell size={18} color="#F59E0B" />{unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
          </button>
          <div style={styles.userProfileBar}>
            <div style={{ textAlign: "right" }}><div style={styles.userName}>{currentUser.name}</div><div style={styles.userRoleTag}>{currentUser.role === "admin" ? "🔑 Admin" : currentUser.role === "moderator" ? "🛡️ Moderatör" : "👤 Kullanıcı"}</div></div>
            <div style={styles.userAvatar}>{currentUser.name.charAt(0)}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginLeft: 4 }}>
                <button style={styles.actionSmallBtn} onClick={() => setShowPasswordModal(true)} title="Şifre Değiştir"><Key size={14} color="#38BDF8" /></button>
                <button style={styles.actionSmallBtn} onClick={handleLogout} title="Oturumu Kapat"><LogOut size={14} color="#EF4444" /></button>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {activeModule === "dashboard" ? (
          <DashboardView tasks={tasks} usersList={usersList} currentUser={currentUser} modulesList={modulesList} onOpenDetail={(t) => setSelectedTask(t)} onNavigateModule={(modId) => setActiveModule(modId)} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "ic_yazisma" ? (
          <InternalChatView chats={chats} setChats={setChats} currentUser={currentUser} usersList={usersList} tasks={tasks} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} modulesList={modulesList} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} onApproveUser={handleApproveUser} onAddModule={handleAddModule} onDeleteModule={handleDeleteModule} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Erişim Yetkiniz Bulunmamaktadır</h2></div>
        ) : activeModule === "detayli_rapor" ? (
          (currentUser.role === "admin" || currentUser.role === "moderator") ? <DetailedReportView tasks={tasks} usersList={usersList} modulesList={modulesList} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Erişim Yetkiniz Yok</h2></div>
        ) : (
          <KanbanBoardView
            activeModule={activeModule} modulesList={modulesList} tasks={tasks.filter((t) => t.module === activeModule)}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser}
            onOpenDetail={(t) => setSelectedTask(t)} onMoveStage={handleMoveStage}
            onCreateTask={handleCreateTask} onDeleteTask={handleDeleteTask} usersList={usersList}
          />
        )}
      </main>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask} currentUser={currentUser} onClose={() => setSelectedTask(null)}
          onAddSubtask={handleAddSubtask} onToggleSubtask={handleToggleSubtask} onMoveStage={handleMoveStage}
          onDeleteTask={handleDeleteTask} usersList={usersList} modulesList={modulesList}
        />
      )}

      {showPasswordModal && <ChangePasswordModal currentUser={currentUser} onClose={() => setShowPasswordModal(false)} onSaveUser={handleSaveUser} />}
      {showNotificationsModal && (
        <NotificationsModal notifications={myNotifications} onClose={() => setShowNotificationsModal(false)} onMarkAllRead={() => { setNotifications(prev => prev.map(n => (n.user === currentUser.name || (n.ekipUyeleri && n.ekipUyeleri.includes(currentUser.name))) ? { ...n, read: true } : n)); }} />
      )}
    </div>
  );
}

function DashboardView({ tasks, currentUser, modulesList, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name || (t.ekipUyeleri && t.ekipUyeleri.includes(currentUser.name)));
  
  const userPoints = useMemo(() => {
    let pts = 0;
    myTasks.forEach(t => {
      if (t.durum === "tamam") {
        if (t.bitisTarihi && t.vade && t.bitisTarihi <= t.vade) pts += 10;
        else pts += 2;
      } else {
        if (t.vade && t.vade < todayStr()) pts -= 5;
      }
    });
    return pts;
  }, [myTasks]);

  const getRank = (pts) => {
    if (pts < 0) return { label: "Riskli Bölge", color: "#EF4444" };
    if (pts < 30) return { label: "Çırak", color: "#94A3B8" };
    if (pts < 80) return { label: "Operatör", color: "#38BDF8" };
    if (pts < 150) return { label: "Uzman", color: "#10B981" };
    return { label: "Lider", color: "#F59E0B" };
  };
  const currentRank = getRank(userPoints);

  const myCompleted = myTasks.filter(t => t.durum === "tamam").length;
  const myActive = myTasks.filter(t => t.durum !== "tamam").length;
  const delayedTasksList = myTasks.filter(t => t.durum !== "tamam" && t.vade && t.vade < todayStr());
  const approachingTasks = myTasks.filter(t => t.durum !== "tamam" && getDaysDiff(t.vade) >= 0 && getDaysDiff(t.vade) <= 3);

  return (
    <div style={styles.viewContainer}>
      <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", borderRadius: 16, border: `1px solid ${currentRank.color}`, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>Hoş Geldin, {currentUser.name} <Flame size={24} color={currentRank.color} /></h1>
          <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 6 }}>Kalite ve performans merkezinizdesiniz.</p>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>Puan</div><div style={{ fontSize: 32, fontWeight: 900, color: currentRank.color }}>{userPoints} <span style={{ fontSize: 16 }}>P</span></div></div>
          <div style={{ width: 1, height: 40, background: "#334155" }}></div>
          <div><div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>Seviye</div><div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.3)", padding: "6px 12px", borderRadius: 10, marginTop: 4 }}><Trophy size={18} color={currentRank.color} /><span style={{ fontSize: 14, fontWeight: 800, color: currentRank.color }}>{currentRank.label}</span></div></div>
        </div>
      </div>

      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8" }}><div style={styles.dashCardTitle}>Üzerimdeki İşler</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B" }}><div style={styles.dashCardTitle}>Aktif Bekleyen</div><div style={styles.dashCardValue}>{myActive}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Tamamlanan</div><div style={styles.dashCardValue}>{myCompleted}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Gecikenler</div><div style={{ fontSize: 24, fontWeight: 800, marginTop: 6, color: "#EF4444" }}>{delayedTasksList.length}</div></div>
      </div>

      {approachingTasks.length > 0 && (
        <div style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px solid #F59E0B", borderRadius: 14, padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={18} /> Yaklaşan Görevler Radarı</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {approachingTasks.map(t => (
              <div key={t.id} style={{ background: "#1E293B", padding: 12, borderRadius: 10, borderLeft: "3px solid #F59E0B", cursor: "pointer" }} onClick={() => onOpenDetail(t)}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginBottom: 4 }}><span>{t.kod}</span><span style={{ color: "#F59E0B", fontWeight: 700 }}>{getDaysDiff(t.vade)} Gün Kaldı</span></div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>{t.baslik}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KanbanBoardView({ activeModule, modulesList, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  
  const currentModObj = modulesList.find(m => m.id === activeModule) || modulesList[0] || { label: "Pano", color: "#F59E0B" };
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.baslik.toLowerCase().includes(searchQuery.toLowerCase()) || t.sorumlu.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (taskFilter === "bireysel" && t.gorevTipi !== "bireysel") return false;
    if (taskFilter === "ekip" && t.gorevTipi !== "ekip") return false;
    if (taskFilter === "yaklasan") {
      const diff = getDaysDiff(t.vade);
      if (t.durum === "tamam" || diff < 0 || diff > 3) return false;
    }
    if (taskFilter === "geciken") {
      if (t.durum === "tamam" || getDaysDiff(t.vade) >= 0) return false;
    }
    return true;
  });

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: 10, borderRadius: 12 }}><Zap size={24} color={currentModObj.color} /></div>
          <div><h1 style={styles.viewTitle}>{currentModObj.label} Panosu</h1><p style={styles.viewSub}>Kanban akış yönetimi ve grup/görev takibi.</p></div>
        </div>
        {isAdminOrMod && <button style={styles.primaryActionBtn} onClick={() => setShowNewModal(true)}><Plus size={16} /> Yeni Görev Ekle</button>}
      </div>

      <div style={styles.filterToolbar}>
        <div style={styles.searchWrapper}><Search size={15} color="#F59E0B" /><input style={styles.searchInput} placeholder="Görev veya Sorumlu Ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
        <select style={{ ...styles.selectInput, width: "auto" }} value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>
          <option value="all">Tüm Görevler</option><option value="bireysel">👤 Bireysel</option><option value="ekip">👥 Ekip</option><option value="yaklasan">⏳ Yaklaşanlar</option><option value="geciken">🚨 Gecikenler</option>
        </select>
      </div>

      <div style={styles.kanbanGrid}>
        {KANBAN_STAGES.map(stage => {
          const stageTasks = filteredTasks.filter(t => t.durum === stage.id);
          return (
            <div key={stage.id} style={styles.kanbanColumn} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("text"); if(id) onMoveStage(id, stage.id); }}>
              <div style={{ ...styles.kanbanColumnHeader, borderTopColor: stage.color }}><span style={{ fontWeight: 800, fontSize: 13, color: stage.color }}>{stage.label}</span><span style={styles.kanbanBadge}>{stageTasks.length}</span></div>
              <div style={styles.kanbanCardsList}>
                {stageTasks.map(task => {
                  const isLate = task.durum !== "tamam" && getDaysDiff(task.vade) < 0;
                  return (
                  <div key={task.id} style={{...styles.kanbanCard, border: isLate ? "1px solid #EF4444" : "1px solid #334155"}} draggable onDragStart={e => e.dataTransfer.setData("text", task.id)}>
                    <div style={styles.cardHeaderRow}>
                      <span style={styles.taskCodeBadge}>{task.kod}</span>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {task.gorevTipi === "ekip" && <span style={{ fontSize: 9, background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>👥 Ekip</span>}
                        {isLate && <AlertCircle size={14} color="#EF4444" />}
                      </div>
                    </div>
                    <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(task)}>{task.baslik}</div>
                    <div style={styles.kanbanCardFooter}><span style={{ color: isLate ? "#EF4444" : "#94A3B8" }}>📅 {fmtDate(task.vade)}</span><span>👤 {task.sorumlu}</span></div>
                  </div>
                )})}
              </div>
            </div>
          );
        })}
      </div>
      {showNewModal && <CreateTaskModal activeModule={activeModule} modulesList={modulesList} usersList={usersList} currentUser={currentUser} onClose={() => setShowNewModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function TodoListView({ todos, setTodos, currentUser }) {
  const [newTodoText, setNewTodoText] = useState("");
  const [priority, setPriority] = useState("Normal");
  const myTodos = todos.filter(t => t.user === currentUser.name);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const item = { id: uid(), user: currentUser.name, text: newTodoText.trim(), done: false, priority, subtasks: [], developments: [] };
    setTodos([item, ...todos]);
    setNewTodoText("");
  };

  const handleToggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const handleDelete = (id) => setTodos(todos.filter(t => t.id !== id));

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Kişisel Yapılacaklar (To-Do List)</h1><p style={styles.viewSub}>Bireysel yapılacaklar ve notlar.</p></div>
      </div>
      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <form onSubmit={handleAddTodo} style={{ display: "flex", gap: 10 }}>
          <input style={{ ...styles.mainInput, flex: 3 }} placeholder="Yeni yapılacak iş veya not..." value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
          <select style={{ ...styles.selectInput, flex: 1 }} value={priority} onChange={(e) => setPriority(e.target.value)}><option value="Normal">Normal</option><option value="Yüksek">Yüksek</option><option value="Kritik">Kritik</option></select>
          <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Ekle</button>
        </form>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {myTodos.map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0F172A", padding: "12px 16px", borderRadius: 10, border: "1px solid #334155" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => handleToggle(t.id)}>
                {t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}
                <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{t.text}</span>
              </div>
              <button style={styles.deleteIconBtn} onClick={() => handleDelete(t.id)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternalChatView({ chats, setChats, currentUser, usersList, tasks }) {
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || "chat-genel");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats, activeChatId]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgObj = { id: uid(), sender: currentUser.name, text: newMessage.trim(), time: timeStr };
    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, msgObj] } : c));
    setNewMessage("");
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><div><h1 style={styles.viewTitle}>İç Yazışmalar</h1><p style={styles.viewSub}>Sistem içi genel mesajlaşma modülü.</p></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, height: "62vh" }}>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", padding: "4px 8px" }}>KANALLAR</div>
          {chats.map(c => (
            <div key={c.id} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", background: c.id === activeChatId ? "rgba(245, 158, 11, 0.15)" : "#0F172A", border: c.id === activeChatId ? "1px solid #F59E0B" : "1px solid #334155" }} onClick={() => setActiveChatId(c.id)}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.id === activeChatId ? "#F59E0B" : "#F8FAFC" }}>{c.title}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: "1px solid #334155", paddingBottom: 10, marginBottom: 12 }}><h3 style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>{activeChat?.title}</h3></div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 8 }}>
            {activeChat?.messages?.map(msg => {
              const isMe = msg.sender === currentUser.name;
              return (
                <div key={msg.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>{msg.sender} • {msg.time}</div>
                  <div style={{ background: isMe ? "#F59E0B" : "#0F172A", color: isMe ? "#0F172A" : "#F8FAFC", padding: "10px 14px", borderRadius: 10, border: "1px solid #334155", fontSize: 13, fontWeight: isMe ? 700 : 400 }}>{msg.text}</div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} style={{ display: "flex", gap: 10, marginTop: 14, borderTop: "1px solid #334155", paddingTop: 14 }}>
            <input style={styles.mainInput} placeholder="Mesaj yazın..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button type="submit" style={styles.primaryActionBtn}><Send size={16} /> Gönder</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DetailedReportView({ tasks, usersList, modulesList }) {
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><div><h1 style={styles.viewTitle}>Operasyonel Rapor</h1></div><button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}><span style={styles.taskCodeBadge}>{t.kod}</span></td><td style={styles.tdTitle}>{t.baslik}</td>
                <td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.durum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, modulesList, onSaveUser, onDeleteUser, onApproveUser, onAddModule, onDeleteModule }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newModLabel, setNewModLabel] = useState("");
  const [newModColor, setNewModColor] = useState("#38BDF8");

  const pendingUsers = usersList.filter(u => u.status === "pending");
  const approvedUsers = usersList.filter(u => u.status === "approved" || !u.status);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Yetki, Üyelik & Ana Başlık Yönetimi</h1></div>
        <button style={styles.primaryActionBtn} onClick={() => { setEditingUser(null); setShowUserModal(true); }}><UserPlus size={16} /> Kullanıcı Ekle</button>
      </div>

      {/* YENİ ANA BAŞLIK EKLEME BÖLÜMÜ */}
      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><FolderPlus size={18} /> Yeni Ana Başlık / Pano Ekle</h3>
        <form onSubmit={e => {
          e.preventDefault();
          if (!newModLabel.trim()) return;
          onAddModule(newModLabel.trim(), newModColor);
          setNewModLabel("");
        }} style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input style={{ ...styles.mainInput, flex: 2 }} placeholder="Başlık adı (Örn: AR-GE Projeleri)..." value={newModLabel} onChange={e => setNewModLabel(e.target.value)} required />
          <input type="color" style={{ width: 44, height: 40, background: "transparent", border: "none", cursor: "pointer" }} value={newModColor} onChange={e => setNewModColor(e.target.value)} title="Renk Seçin" />
          <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Başlık Ekle</button>
        </form>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          {modulesList.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0F172A", padding: "6px 12px", borderRadius: 8, border: `1px solid ${m.color}` }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: m.color }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC" }}>{m.label}</span>
              {modulesList.length > 1 && <X size={14} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => onDeleteModule(m.id)} title="Başlığı Sil" />}
            </div>
          ))}
        </div>
      </div>

      {pendingUsers.length > 0 && (
        <div style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid #F59E0B", borderRadius: 14, padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>⏳ Onay Bekleyen Üyelik Talepleri ({pendingUsers.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pendingUsers.map(u => (
              <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0F172A", padding: "10px 14px", borderRadius: 8, border: "1px solid #334155" }}>
                <div><div style={{ fontWeight: 700, fontSize: 13, color: "#F8FAFC" }}>{u.name} (@{u.username})</div></div>
                <div style={{ display: "flex", gap: 8 }}><button style={styles.primaryActionBtn} onClick={() => onApproveUser(u.id)}><Check size={14} /> Onayla</button><button style={styles.deleteDangerBtn} onClick={() => onDeleteUser(u.id)}>Reddet</button></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#F59E0B" }}>Aktif Sistem Kullanıcıları & Yetkileri</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı Soyadı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>Erişebildiği Başlıklar</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>
            {approvedUsers.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.tdTitle}>{u.name}</td>
                <td style={styles.td}>{u.username}</td>
                <td style={styles.td}>{u.role}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {(u.permissions || []).map(pId => {
                      const mod = modulesList.find(m => m.id === pId);
                      return mod ? <span key={pId} style={{ fontSize: 10, background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "2px 6px", borderRadius: 4 }}>{mod.label}</span> : null;
                    })}
                  </div>
                </td>
                <td style={styles.td}><button style={styles.editIconBtn} onClick={() => { setEditingUser(u); setShowUserModal(true); }}><Edit2 size={13} /> Yetki & Düzenle</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUserModal && <UserModal userToEdit={editingUser} modulesList={modulesList} onClose={() => setShowUserModal(false)} onSave={onSaveUser} />}
    </div>
  );
}

function UserModal({ userToEdit, modulesList, onClose, onSave }) {
  const [name, setName] = useState(userToEdit ? userToEdit.name : "");
  const [username, setUsername] = useState(userToEdit ? userToEdit.username : "");
  const [password, setPassword] = useState(userToEdit ? userToEdit.password : "0000");
  const [role, setRole] = useState(userToEdit ? userToEdit.role : "user");
  const [permissions, setPermissions] = useState(userToEdit ? userToEdit.permissions || [] : modulesList.map(m => m.id));

  const handleTogglePerm = (modId) => {
    if (permissions.includes(modId)) {
      setPermissions(permissions.filter(p => p !== modId));
    } else {
      setPermissions([...permissions, modId]);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 500 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Kullanıcı ve Yetki Tanımla</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <form onSubmit={e => { e.preventDefault(); onSave({ id: userToEdit ? userToEdit.id : uid(), name, username, password, role, status: "approved", permissions }); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Adı Soyadı</label><input style={styles.mainInput} value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Kullanıcı ID</label><input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Şifre</label><input type="password" style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Rol</label><select style={styles.selectInput} value={role} onChange={e => setRole(e.target.value)}><option value="user">Kullanıcı</option><option value="moderator">Moderatör</option><option value="admin">Admin</option></select></div>
          <div>
            <label style={styles.inputLabel}>Erişebileceği Ana Başlıklar / Panolar</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "#0F172A", padding: 12, borderRadius: 8, border: "1px solid #334155" }}>
              {modulesList.map(m => (
                <label key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#F8FAFC", cursor: "pointer" }}>
                  <input type="checkbox" checked={permissions.includes(m.id)} onChange={() => handleTogglePerm(m.id)} />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
        </form>
      </div>
    </div>
  );
}

function CreateTaskModal({ activeModule, modulesList, usersList, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || usersList[0]?.name || "");
  const [vade, setVade] = useState(todayStr());
  const [module, setModule] = useState(activeModule);
  const [gorevTipi, setGorevTipi] = useState("bireysel");
  const [ekipUyeleri, setEkipUyeleri] = useState([]);

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 520 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Görev</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Görev adı..." /></div>
          <div><label style={styles.inputLabel}>Modül / Ana Başlık</label><select style={styles.selectInput} value={module} onChange={e => setModule(e.target.value)}>{modulesList.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select></div>
          <div><label style={styles.inputLabel}>Sorumlu</label><select style={styles.selectInput} value={sorumlu} onChange={e => setSorumlu(e.target.value)}>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select></div>
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module, gorevTipi, ekipUyeleri }); onClose(); }}>Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, onClose, onAddSubtask, onToggleSubtask, onMoveStage, onDeleteTask, usersList, modulesList }) {
  const [newSubtext, setNewSubtext] = useState("");
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={styles.drawerBody}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>{task.baslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "#0F172A", padding: 12, borderRadius: 10 }}>
            <div><label style={styles.inputLabel}>Sorumlu</label><div>{task.sorumlu}</div></div>
            <div><label style={styles.inputLabel}>Aşama</label><select style={styles.selectInput} value={task.durum} onChange={e => onMoveStage(task.id, e.target.value)}>{KANBAN_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
          </div>
          <div style={styles.subtaskSection}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#F59E0B" }}>Alt Adımlar</div>
            {(task.subtasks || []).map(st => (
              <div key={st.id} style={styles.subtaskRowInteractive} onClick={() => onToggleSubtask(task.id, st.id)}>
                {st.done ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#6B7280" />}<span style={{ textDecoration: st.done ? "line-through" : "none", flex: 1 }}>{st.text}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}><input style={styles.mainInput} placeholder="Alt adım..." value={newSubtext} onChange={e => setNewSubtext(e.target.value)} /><button style={styles.addInlineBtn} onClick={() => { onAddSubtask(task.id, newSubtext, task.sorumlu); setNewSubtext(""); }}>Ekle</button></div>
          </div>
        </div>
        <div style={styles.drawerFooter}>{isAdminOrMod ? <button style={styles.deleteDangerBtn} onClick={() => onDeleteTask(task.id)}>Sil</button> : <div />}<button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function NotificationsModal({ notifications, onClose, onMarkAllRead }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Bildirimler</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, maxHeight: 350, overflowY: "auto" }}>
          {notifications.map(n => (<div key={n.id} style={{ background: "#0F172A", padding: 12, borderRadius: 8 }}><div style={{ fontSize: 12 }}>{n.text}</div></div>))}
        </div>
        <div style={styles.drawerFooter}><button style={styles.ghostBtn} onClick={onMarkAllRead}>Okundu İşaretle</button><button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function ChangePasswordModal({ currentUser, onClose, onSaveUser }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <div style={styles.modalOverlay}>
      <div style={{...styles.createModalContent, maxWidth: 400}}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Şifre Değiştir</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <form onSubmit={(e) => { e.preventDefault(); if(oldPassword !== currentUser.password) { alert("Eski şifre yanlış!"); return; } onSaveUser({...currentUser, password: newPassword}); alert("Şifre güncellendi"); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Eski Şifre</label><input type="password" style={styles.mainInput} value={oldPassword} onChange={e => setOldPassword(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Yeni Şifre</label><input type="password" style={styles.mainInput} value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></div>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
        </form>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.loginLogo}><ShieldCheck size={36} color="#F59E0B" /></div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>Dva Kalite OS</h1>
          <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>Süreç ve Kalite Yönetim Sistemi</p>
        </div>
        {error && <div style={styles.errorBar}>{error}</div>}
        <form onSubmit={e => { e.preventDefault(); onLogin(username, password); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
          <div><label style={styles.inputLabel}>Kullanıcı Adı</label><input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} placeholder="Kullanıcı adınız..." required autoFocus /></div>
          <div><label style={styles.inputLabel}>Şifre</label><input type="password" style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifreniz..." required /></div>
          <button type="submit" style={styles.loginSubmitBtn}>Giriş Yap <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
}

function LockScreen({ currentUser, onUnlock, onSwitchUser, error }) {
  const [password, setPassword] = useState("");
  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.loginLogo}><Lock size={36} color="#F59E0B" /></div>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>Oturum Kilitli</h1>
          <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>Tekrar hoş geldiniz, {currentUser.name}. Devam etmek için şifrenizi girin.</p>
        </div>
        {error && <div style={styles.errorBar}>{error}</div>}
        <form onSubmit={e => { e.preventDefault(); onUnlock(password); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={styles.inputLabel}>Şifreniz</label><input type="password" style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} required autoFocus /></div>
          <button type="submit" style={styles.loginSubmitBtn}>Kilidi Aç <ArrowRight size={16} /></button>
          <div style={{ textAlign: "center", marginTop: 4 }}><button type="button" style={styles.ghostBtn} onClick={onSwitchUser}>Farklı Hesap</button></div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  appShell: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#0F172A", color: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", padding: "12px 24px", background: "#1E293B", borderBottom: "2px solid #F59E0B", gap: 16, flexWrap: "wrap", boxShadow: "0 4px 20px rgba(245, 158, 11, 0.1)" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { background: "rgba(245, 158, 11, 0.15)", padding: 8, borderRadius: 10, display: "flex" },
  brandName: { fontWeight: 800, fontSize: 16, color: "#F59E0B" },
  brandSub: { fontSize: 10, color: "#94A3B8" },
  navTabs: { display: "flex", gap: 6, background: "#0F172A", padding: 4, borderRadius: 10, flexWrap: "wrap" },
  navTab: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent", color: "#94A3B8", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  navTabActive: { background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B", border: "1px solid #F59E0B", boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)" },
  navTabAdminActive: { background: "rgba(239, 68, 68, 0.2)", color: "#EF4444", border: "1px solid #EF4444" },
  notificationBellBtn: { background: "#1E293B", border: "1px solid #334155", borderRadius: 8, padding: 8, cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" },
  notificationBadge: { position: "absolute", top: -4, right: -4, background: "#EF4444", color: "#FFF", fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: "50%" },
  userProfileBar: { display: "flex", alignItems: "center", gap: 10, background: "#0F172A", padding: "6px 12px", borderRadius: 10, border: "1px solid #334155" },
  userAvatar: { width: 32, height: 32, borderRadius: "50%", background: "#F59E0B", color: "#0F172A", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 },
  userName: { fontSize: 12, fontWeight: 700 },
  userRoleTag: { fontSize: 10, color: "#F59E0B" },
  actionSmallBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 4 },
  errorBar: { background: "rgba(239, 68, 68, 0.2)", borderBottom: "1px solid #EF4444", padding: "8px 24px", color: "#FCA5A5", fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  mainContent: { flex: 1, padding: "20px 24px", overflowY: "auto" },
  viewContainer: { display: "flex", flexDirection: "column", gap: 20 },
  dashboardCardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 },
  dashCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: 16, borderLeft: "4px solid" },
  dashCardTitle: { fontSize: 11, color: "#94A3B8", fontWeight: 600 },
  dashCardValue: { fontSize: 24, fontWeight: 800, marginTop: 6, color: "#F59E0B" },
  printBtn: { background: "#1E293B", color: "#38BDF8", border: "1px solid #38BDF8", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
  kanbanGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
  kanbanColumn: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 12, minHeight: 450 },
  kanbanColumnHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "3px solid", paddingTop: 8, paddingBottom: 6 },
  kanbanBadge: { background: "#0F172A", color: "#F8FAFC", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 },
  kanbanCardsList: { display: "flex", flexDirection: "column", gap: 10, flex: 1 },
  kanbanCard: { background: "#0F172A", border: "1px solid #334155", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8, cursor: "grab" },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  kanbanCardTitle: { fontSize: 13, fontWeight: 700, cursor: "pointer", lineHeight: 1.4 },
  kanbanCardFooter: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 4 },
  taskCodeBadge: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#F59E0B", background: "rgba(245, 158, 11, 0.15)", padding: "2px 6px", borderRadius: 4, fontWeight: 700 },
  filterToolbar: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
  searchWrapper: { display: "flex", alignItems: "center", gap: 8, background: "#1E293B", padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", flex: 1 },
  searchInput: { background: "transparent", border: "none", color: "#F8FAFC", fontSize: 12, outline: "none", width: "100%" },
  primaryActionBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 10px rgba(245, 158, 11, 0.2)" },
  ghostBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" },
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
  editIconBtn: { background: "transparent", border: "none", color: "#F59E0B", cursor: "pointer", fontWeight: 600, fontSize: 11, display: "flex", gap: 4, alignItems: "center" },
  loginOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 1000 },
  loginCard: { background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 16 },
  loginHeader: { textAlign: "center" },
  loginLogo: { width: 64, height: 64, borderRadius: 16, background: "rgba(245, 158, 11, 0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" },
  inputLabel: { fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4, display: "block" },
  mainInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "10px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  selectInput: { background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  loginSubmitBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  unauthorizedBox: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, textAlign: "center", gap: 12, color: "#94A3B8" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 },
  drawerContainer: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", overflow: "hidden" },
  createModalContent: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 500, padding: 20 },
  drawerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #334155" },
  drawerBody: { padding: 20, display: "flex", flexDirection: "column", gap: 16 },
  closeBtn: { background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" },
  subtaskSection: { background: "#0F172A", border: "1px solid #334155", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 },
  subtaskRowInteractive: { display: "flex", alignItems: "center", gap: 8, background: "#1E293B", padding: "6px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" },
  addInlineBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "0 12px", borderRadius: 6, fontWeight: 700, fontSize: 11, cursor: "pointer" },
  drawerFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderTop: "1px solid #334155" },
  deleteDangerBtn: { background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer" },
  formTitle: { fontSize: 16, fontWeight: 800, color: "#F59E0B" }
};