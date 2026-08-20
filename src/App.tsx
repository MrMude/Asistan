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
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

let app, auth, db, appId = 'asistan-live-workspace-v3';
let isFirebaseActive = false;

try {
  let firebaseConfig = {
    apiKey: "AIzaSyCK9WtWTyXxKTY45Mzw0kV4sPsfCIrwUG8",
    authDomain: "asistanv2-206bc.firebaseapp.com",
    projectId: "asistanv2-206bc",
    storageBucket: "asistanv2-206bc.firebasestorage.app",
    messagingSenderId: "78097147227",
    appId: "1:78097147227:web:7e990ef654e89c5a2ee67e"
  };

  if (firebaseConfig && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseActive = true;
  }
} catch (e) {
  console.warn("Firebase config error:", e);
}

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
  { id: "usr-admin", username: "admin", password: "0000", name: "Sistem Yöneticisi (Admin)", role: "admin", status: "approved", permissions: ["asakai", "iyilestirme", "kalite_guvence", "kalite_kontrol", "tedarik_kalite"] },
  { id: "usr-ahmet", username: "ahmet", password: "0000", name: "Ahmet Yılmaz", role: "moderator", status: "approved", permissions: ["asakai", "kalite_guvence"] }
];

const INITIAL_TASKS = [
  { id: "tsk-1", module: "asakai", kod: "ASK-2026-001", baslik: "Vardiya A Hatası Giriş Kontrol Tespiti", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: todayStr(), vade: todayStr(), bitisTarihi: "", durum: "acik", oncelik: "Kritik", subtasks: [] }
];

const INITIAL_TODOS = [
  { id: "td-1", user: "Ahmet Yılmaz", text: "Sabah 09:00 Üretim hattı brifingine katıl", done: false, priority: "Yüksek", subtasks: [], developments: [] }
];

const INITIAL_CHATS = [
  { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", participants: [], messages: [{ id: "m-1", sender: "Sistem", text: "Bulut Çalışma Alanına Hoş Geldiniz.", time: "08:30" }] }
];

export default function App() {
  const [syncMode, setSyncMode] = useState('loading');
  const [firebaseUser, setFirebaseUser] = useState(null);

  const [modulesList, setModulesList] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_modules")) || INITIAL_MODULES; } catch(e) { return INITIAL_MODULES; } });
  const [usersList, setUsersList] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_users")) || INITIAL_USERS; } catch(e) { return INITIAL_USERS; } });
  const [tasks, setTasks] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_tasks")) || INITIAL_TASKS; } catch(e) { return INITIAL_TASKS; } });
  const [todos, setTodos] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_todos")) || INITIAL_TODOS; } catch(e) { return INITIAL_TODOS; } });
  const [chats, setChats] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_chats")) || INITIAL_CHATS; } catch(e) { return INITIAL_CHATS; } });
  const [notifications, setNotifications] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_notifs")) || []; } catch(e) { return []; } });

  const [currentUser, setCurrentUser] = useState(() => { try { return JSON.parse(localStorage.getItem("asistan_current_user")) || null; } catch(e) { return null; } });
  const [isLocked, setIsLocked] = useState(() => { return !!localStorage.getItem("asistan_current_user"); });

  const [activeModule, setActiveModule] = useState("dashboard");
  const [dashboardFilter, setDashboardFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  useEffect(() => {
    if (!isFirebaseActive) {
      setSyncMode('local');
      return;
    }

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.warn("Auth failed, falling back to local storage.", e);
        setSyncMode('local');
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
        setSyncMode('firebase');
      } else {
        setSyncMode('local');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (syncMode !== 'firebase' || !firebaseUser) return;

    const unsubs = [];
    const handleSync = (colName, setter, initialData) => {
      return onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', colName), (snapshot) => {
        if (snapshot.empty) {
          if (initialData && initialData.length > 0) {
            initialData.forEach(item => setDoc(doc(db, 'artifacts', appId, 'public', 'data', colName, item.id), item));
            setter(initialData);
          } else {
            setter([]);
          }
        } else {
          setter(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      }, (err) => {
        console.error(`${colName} sync error, falling back to local:`, err);
        setSyncMode('local');
      });
    };

    unsubs.push(handleSync('modules', setModulesList, INITIAL_MODULES));
    unsubs.push(handleSync('users', setUsersList, INITIAL_USERS));
    unsubs.push(handleSync('tasks', setTasks, INITIAL_TASKS));
    unsubs.push(handleSync('todos', setTodos, INITIAL_TODOS));
    
    unsubs.push(onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'chats'), (snapshot) => {
      if (snapshot.empty) {
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'chats', 'chat-genel'), INITIAL_CHATS[0]);
        setChats(INITIAL_CHATS);
      } else {
        setChats(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    }, () => setSyncMode('local')));

    unsubs.push(onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'notifications'), (snapshot) => {
      setNotifications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, () => setSyncMode('local')));

    return () => unsubs.forEach(u => u());
  }, [syncMode, firebaseUser]);

  useEffect(() => {
    if (syncMode === 'local') {
      try {
        localStorage.setItem("asistan_modules", JSON.stringify(modulesList));
        localStorage.setItem("asistan_users", JSON.stringify(usersList));
        localStorage.setItem("asistan_tasks", JSON.stringify(tasks));
        localStorage.setItem("asistan_todos", JSON.stringify(todos));
        localStorage.setItem("asistan_chats", JSON.stringify(chats));
        localStorage.setItem("asistan_notifs", JSON.stringify(notifications));
      } catch(e) {}
    }
  }, [modulesList, usersList, tasks, todos, chats, notifications, syncMode]);

  useEffect(() => {
    try {
      if (currentUser && !isLocked) localStorage.setItem("asistan_current_user", JSON.stringify(currentUser));
      else if (!currentUser) localStorage.removeItem("asistan_current_user");
    } catch(e) {}
  }, [currentUser, isLocked]);

  const addNotification = async (targetUserName, message, ekipUyeleri = []) => {
    const notifId = uid();
    const newNotif = { id: notifId, user: targetUserName, ekipUyeleri, text: message, date: todayStr(), read: false };
    if (syncMode === 'firebase' && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'notifications', notifId), newNotif);
    else setNotifications(prev => [newNotif, ...prev]);
  };

  const handleLogin = (username, password) => {
    const activeList = usersList.length > 0 ? usersList : INITIAL_USERS;
    const found = activeList.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    
    if (found) {
      setCurrentUser(found);
      setIsLocked(false);
      setActiveModule("dashboard");
      setError(null);
    } else {
      setError("Hatalı Kullanıcı Adı veya Şifre!");
    }
  };

  const handleSaveData = async (colName, item, stateSetter) => {
    if (syncMode === 'firebase' && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', colName, item.id), item);
    } else {
      stateSetter(prev => {
        const exists = prev.find(x => x.id === item.id);
        if (exists) return prev.map(x => x.id === item.id ? item : x);
        return [...prev, item];
      });
    }
  };

  const handleDeleteData = async (colName, itemId, stateSetter) => {
    if (syncMode === 'firebase' && firebaseUser) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', colName, itemId));
    } else {
      stateSetter(prev => prev.filter(x => x.id !== itemId));
    }
  };

  const handleCreateTask = async (taskData) => {
    const newId = uid();
    const prefix = (taskData.module || "ask").substring(0, 3).toUpperCase();
    const newTask = {
      id: newId,
      module: taskData.module || modulesList[0]?.id || "asakai",
      kod: `${prefix}-2026-${(tasks.length + 1).toString().padStart(3, "0")}`,
      baslik: taskData.baslik,
      sorumlu: taskData.sorumlu || currentUser.name,
      gorevTipi: taskData.gorevTipi || "bireysel",
      ekipUyeleri: taskData.gorevTipi === "ekip" ? (taskData.ekipUyeleri || []) : [],
      acilisTarihi: taskData.acilisTarihi || todayStr(),
      vade: taskData.vade || todayStr(),
      bitisTarihi: "",
      durum: "acik",
      oncelik: taskData.oncelik || "Orta",
      subtasks: taskData.subtasks || []
    };
    await handleSaveData('tasks', newTask, setTasks);
    addNotification(newTask.sorumlu, `Yeni görev atandı: ${newTask.baslik}`, newTask.ekipUyeleri);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} error={error} syncMode={syncMode} />;
  }

  if (isLocked) {
    return (
      <div style={styles.loginOverlay}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <div style={styles.loginLogo}><Lock size={36} color="#F59E0B" /></div>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 10, color: "#F59E0B" }}>Oturum Kilitli</h1>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>Tekrar hoş geldiniz, {currentUser.name}.</p>
          </div>
          {error && <div style={styles.errorBar}>{error}</div>}
          <form onSubmit={e => { e.preventDefault(); const p = e.target.password.value; if(p === currentUser.password) { setIsLocked(false); setError(null); } else setError("Şifre hatalı!"); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={styles.inputLabel}>Şifreniz</label><input name="password" type="password" maxLength={4} style={styles.mainInput} required autoFocus /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Kilidi Aç <ArrowRight size={16} /></button>
            <button type="button" style={styles.ghostBtn} onClick={() => setCurrentUser(null)}>Farklı Hesapla Gir</button>
          </form>
        </div>
      </div>
    );
  }

  const myNotifications = notifications.filter(n => n.user === currentUser.name || (n.ekipUyeleri && n.ekipUyeleri.includes(currentUser.name)));
  const unreadCount = myNotifications.filter(n => !n.read).length;

  return (
    <div style={styles.appShell}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}><ShieldCheck size={24} color="#F59E0B" /></div>
          <div><div style={styles.brandName}>ASİSTAN OS</div><div style={styles.brandSub}>Süreç & Yetki Yönetim Paneli</div></div>
        </div>

        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} color="#F59E0B" /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} color="#F59E0B" /><span>To-Do List</span></button>
          {modulesList.map((m) => {
            const isActive = activeModule === m.id;
            return (
              <button key={m.id} style={{ ...styles.navTab, ...(isActive ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}>
                <Zap size={15} color={isActive ? "#F59E0B" : m.color} /><span>{m.label}</span>
              </button>
            );
          })}
          <button style={{ ...styles.navTab, ...(activeModule === "ic_yazisma" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("ic_yazisma")}><MessageCircle size={15} color="#38BDF8" /><span>İç Yazışmalar</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "detayli_rapor" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("detayli_rapor")}><FileText size={15} color="#38BDF8" /><span>Detaylı Rapor</span></button>
          {currentUser.role === "admin" && (
            <button style={{ ...styles.navTab, ...(activeModule === "admin_panel" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin_panel")}><Lock size={15} color="#EF4444" /><span>Admin Panel</span></button>
          )}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          {syncMode === 'firebase' ? 
            <span style={{ fontSize: 10, color: "#10B981", background: "rgba(16, 185, 129, 0.15)", padding: "4px 8px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}><Wifi size={12} /> Bulut</span> :
            <span style={{ fontSize: 10, color: "#EF4444", background: "rgba(239, 68, 68, 0.15)", padding: "4px 8px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}><WifiOff size={12} /> Yerel</span>
          }
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
          <DashboardView tasks={tasks} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} modulesList={modulesList} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} currentUser={currentUser} onSaveTodo={(t) => handleSaveData('todos', t, setTodos)} onDeleteTodo={(id) => handleDeleteData('todos', id, setTodos)} />
        ) : activeModule === "ic_yazisma" ? (
          <InternalChatView chats={chats} currentUser={currentUser} usersList={usersList} tasks={tasks} onSaveChat={(c) => handleSaveData('chats', c, setChats)} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} modulesList={modulesList} onSaveUser={(u) => handleSaveData('users', u, setUsersList)} onDeleteUser={(id) => handleDeleteData('users', id, setUsersList)} onSaveModule={(m) => handleSaveData('modules', m, setModulesList)} onDeleteModule={(id) => handleDeleteData('modules', id, setModulesList)} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : activeModule === "detayli_rapor" ? (
          <DetailedReportView tasks={tasks} usersList={usersList} modulesList={modulesList} />
        ) : (
          <KanbanBoardView activeModule={activeModule} modulesList={modulesList} tasks={tasks.filter((t) => t.module === activeModule)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser} onOpenDetail={setSelectedTask} onMoveStage={(id, st) => { const t = tasks.find(x => x.id === id); if(t) handleSaveData('tasks', {...t, durum: st}, setTasks); }} onCreateTask={handleCreateTask} onDeleteTask={(id) => handleDeleteData('tasks', id, setTasks)} usersList={usersList} />
        )}
      </main>

      {selectedTask && (
        <TaskDetailModal task={selectedTask} currentUser={currentUser} onClose={() => setSelectedTask(null)} onSaveTask={(t) => handleSaveData('tasks', t, setTasks)} onDeleteTask={(id) => { handleDeleteData('tasks', id, setTasks); setSelectedTask(null); }} />
      )}
      {showPasswordModal && <ChangePasswordModal currentUser={currentUser} onClose={() => setShowPasswordModal(false)} onSaveUser={(u) => handleSaveData('users', u, setUsersList)} />}
      {showNotificationsModal && (
        <NotificationsModal notifications={myNotifications} onClose={() => setShowNotificationsModal(false)} onMarkAllRead={() => { notifications.forEach(n => { if(n.user === currentUser.name) handleSaveData('notifications', {...n, read: true}, setNotifications); }); }} />
      )}
    </div>
  );
}

function LoginScreen({ onLogin, error, syncMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.loginLogo}><ShieldCheck size={36} color="#F59E0B" /></div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: "#F59E0B" }}>ASİSTAN</h1>
          <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 6 }}>Süreç ve Kalite Yönetim Sistemi</p>
        </div>

        {error && <div style={styles.errorBar}>{error}</div>}

        <form onSubmit={e => { e.preventDefault(); onLogin(username.trim(), password.trim()); }} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
          <div>
            <label style={styles.inputLabel}>Kullanıcı Adı (Örn: admin, ahmet)</label>
            <input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} placeholder="Kullanıcı adınızı girin..." required autoFocus />
          </div>
          <div>
            <label style={styles.inputLabel}>Şifre (İlk giriş: 0000)</label>
            <input type="password" maxLength={4} style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifrenizi girin..." required />
          </div>
          <button type="submit" style={styles.loginSubmitBtn}>Giriş Yap <ArrowRight size={16} /></button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, fontWeight: 700, color: syncMode === 'firebase' ? "#10B981" : syncMode === 'loading' ? "#F59E0B" : "#EF4444" }}>
          {syncMode === 'firebase' ? "✅ Canlı Bulut Bağlantısı Aktif" : syncMode === 'loading' ? "☁️ Bulut Bağlantısı Bekleniyor..." : "⚠️ Çevrimdışı (Yerel Hafıza Modu)"}
        </div>
      </div>
    </div>
  );
}

function DashboardView({ tasks, currentUser, dashboardFilter, setDashboardFilter, onOpenDetail, onNavigateModule, modulesList }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name || (t.ekipUyeleri && t.ekipUyeleri.includes(currentUser.name)));
  
  const filteredMyTasks = useMemo(() => {
    if (dashboardFilter === "aktif") return myTasks.filter(t => t.durum !== "tamam");
    if (dashboardFilter === "tamamlanan") return myTasks.filter(t => t.durum === "tamam");
    if (dashboardFilter === "geciken") return myTasks.filter(t => t.durum !== "tamam" && t.vade && new Date(t.vade) < new Date(todayStr()));
    if (dashboardFilter === "acik") return myTasks.filter(t => t.durum === "acik");
    return myTasks;
  }, [myTasks, dashboardFilter]);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Dashboard</h1><p style={styles.viewSub}>Hoş geldiniz, {currentUser.name}.</p></div>
        <button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button>
      </div>
      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8", cursor: "pointer" }} onClick={() => setDashboardFilter("all")}>
          <div style={styles.dashCardTitle}>Toplam İş</div><div style={styles.dashCardValue}>{myTasks.length}</div>
        </div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B", cursor: "pointer" }} onClick={() => setDashboardFilter("aktif")}>
          <div style={styles.dashCardTitle}>Aktif İşler</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum !== "tamam").length}</div>
        </div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981", cursor: "pointer" }} onClick={() => setDashboardFilter("tamamlanan")}>
          <div style={styles.dashCardTitle}>Tamamlanan</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {filteredMyTasks.length === 0 ? <div style={{ color: "#64748B", gridColumn: "span 3", padding: 30 }}>Kritere uygun görev yok.</div> : filteredMyTasks.map(t => (
          <div key={t.id} style={styles.personalTaskCard} onClick={() => onOpenDetail(t)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={styles.taskCodeBadge}>{t.kod}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: t.durum === "tamam" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)", color: t.durum === "tamam" ? "#10B981" : "#F59E0B" }}>{t.durum.toUpperCase()}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4, color: "#F8FAFC" }}>{t.baslik}</div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 10, borderTop: "1px solid #334155", paddingTop: 8 }}>Vade: {fmtDate(t.vade)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoardView({ activeModule, modulesList, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showNewModal, setShowNewModal] = useState(false);
  const currentModObj = modulesList.find(m => m.id === activeModule) || { label: "Pano", color: "#F59E0B" };
  const filteredTasks = tasks.filter(t => t.baslik.toLowerCase().includes(searchQuery.toLowerCase()) || t.sorumlu.toLowerCase().includes(searchQuery.toLowerCase()));
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: 10, borderRadius: 12 }}><Zap size={24} color={currentModObj.color} /></div>
          <div><h1 style={styles.viewTitle}>{currentModObj.label}</h1></div>
        </div>
        {isAdminOrMod && <button style={styles.primaryActionBtn} onClick={() => setShowNewModal(true)}><Plus size={16} /> Görev Ekle</button>}
      </div>
      <div style={styles.filterToolbar}>
        <div style={styles.searchWrapper}><Search size={15} color="#F59E0B" /><input style={styles.searchInput} placeholder="Ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
      </div>
      <div style={styles.kanbanGrid}>
        {KANBAN_STAGES.map(stage => {
          const stageTasks = filteredTasks.filter(t => t.durum === stage.id);
          return (
            <div key={stage.id} style={styles.kanbanColumn} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("text"); if(id) onMoveStage(id, stage.id); }}>
              <div style={{ ...styles.kanbanColumnHeader, borderTopColor: stage.color }}><span style={{ fontWeight: 800, fontSize: 13, color: stage.color }}>{stage.label}</span><span style={styles.kanbanBadge}>{stageTasks.length}</span></div>
              <div style={styles.kanbanCardsList}>
                {stageTasks.map(task => (
                  <div key={task.id} style={styles.kanbanCard} draggable onDragStart={e => e.dataTransfer.setData("text", task.id)}>
                    <div style={styles.cardHeaderRow}><span style={styles.taskCodeBadge}>{task.kod}</span>{isAdminOrMod && <button style={styles.deleteIconBtn} onClick={() => onDeleteTask(task.id)}><Trash2 size={12} /></button>}</div>
                    <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(task)}>{task.baslik}</div>
                    <div style={styles.kanbanCardFooter}><span>👤 {task.sorumlu}</span><span>📅 {fmtDate(task.vade)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {showNewModal && <CreateTaskModal activeModule={activeModule} modulesList={modulesList} usersList={usersList} currentUser={currentUser} onClose={() => setShowNewModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function CreateTaskModal({ activeModule, modulesList, usersList, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || usersList[0]?.name || "");
  const [vade, setVade] = useState(todayStr());
  const [module, setModule] = useState(activeModule);
  
  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 520 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Görev Oluştur</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Görev başlığı yazın..." /></div>
          <div>
            <label style={styles.inputLabel}>Modül (Pano)</label>
            <select style={styles.selectInput} value={module} onChange={e => setModule(e.target.value)}>{modulesList.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select>
          </div>
          <div>
            <label style={styles.inputLabel}>Sorumlu</label>
            <select style={styles.selectInput} value={sorumlu} onChange={e => setSorumlu(e.target.value)}>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select>
          </div>
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module, gorevTipi: "bireysel", ekipUyeleri: [] }); onClose(); }}>Görevi Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, onClose, onSaveTask, onDeleteTask }) {
  const [newSubtext, setNewSubtext] = useState("");
  const subtasks = task.subtasks || [];
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={styles.drawerBody}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>{task.baslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "#0F172A", padding: 12, borderRadius: 10 }}>
            <div><label style={styles.inputLabel}>Sorumlu</label><div>{task.sorumlu}</div></div>
            <div><label style={styles.inputLabel}>Aşama</label><select style={styles.selectInput} value={task.durum} onChange={e => onSaveTask({...task, durum: e.target.value})}>{KANBAN_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
          </div>
          <div style={styles.subtaskSection}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#F59E0B" }}>Alt Adımlar</div>
            {subtasks.map(st => (
              <div key={st.id} style={styles.subtaskRowInteractive} onClick={() => onSaveTask({...task, subtasks: subtasks.map(s => s.id === st.id ? {...s, done: !s.done} : s)})}>
                {st.done ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#6B7280" />}
                <span style={{ textDecoration: st.done ? "line-through" : "none", flex: 1 }}>{st.text}</span>
                <Trash2 size={12} color="#EF4444" onClick={(e) => { e.stopPropagation(); onSaveTask({...task, subtasks: subtasks.filter(s => s.id !== st.id)}); }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <input style={styles.mainInput} placeholder="Alt adım..." value={newSubtext} onChange={e => setNewSubtext(e.target.value)} />
              <button style={styles.addInlineBtn} onClick={() => { if(!newSubtext.trim()) return; onSaveTask({...task, subtasks: [...subtasks, { id: uid(), text: newSubtext.trim(), done: false }]}); setNewSubtext(""); }}>Ekle</button>
            </div>
          </div>
        </div>
        <div style={styles.drawerFooter}>{isAdminOrMod ? <button style={styles.deleteDangerBtn} onClick={() => onDeleteTask(task.id)}>Görevi Sil</button> : <div />}<button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function TodoListView({ todos, currentUser, onSaveTodo, onDeleteTodo }) {
  const [newTodoText, setNewTodoText] = useState("");
  const myTodos = todos.filter(t => t.user === currentUser.name);

  return (
    <div style={styles.viewContainer}>
      <h1 style={styles.viewTitle}>Kişisel To-Do List</h1>
      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20 }}>
        <form onSubmit={(e) => { e.preventDefault(); if(newTodoText) { onSaveTodo({ id: uid(), user: currentUser.name, text: newTodoText.trim(), done: false }); setNewTodoText(""); } }} style={{ display: "flex", gap: 10 }}>
          <input style={{ ...styles.mainInput, flex: 3 }} placeholder="Yeni not..." value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
          <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Ekle</button>
        </form>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
          {myTodos.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0F172A", padding: "12px 16px", borderRadius: 10, border: "1px solid #334155" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flex: 1 }} onClick={() => onSaveTodo({...t, done: !t.done})}>
                {t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}
                <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{t.text}</span>
              </div>
              <button style={styles.deleteIconBtn} onClick={() => onDeleteTodo(t.id)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternalChatView({ chats, currentUser, onSaveChat }) {
  const activeChat = chats[0] || INITIAL_CHATS[0];
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats]);

  return (
    <div style={styles.viewContainer}>
      <h1 style={styles.viewTitle}>Genel Ekip Sohbeti</h1>
      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", height: "60vh" }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 8 }}>
          {activeChat?.messages.map(m => {
            const isMe = m.sender === currentUser.name;
            return (
              <div key={m.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "70%" }}>
                <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>{m.sender} • {m.time}</div>
                <div style={{ background: isMe ? "#F59E0B" : "#0F172A", color: isMe ? "#0F172A" : "#F8FAFC", padding: "10px 14px", borderRadius: 10, fontSize: 13 }}>{m.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={e => { e.preventDefault(); if(msg.trim()) { onSaveChat({...activeChat, messages: [...activeChat.messages, { id: uid(), sender: currentUser.name, text: msg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]}); setMsg(""); } }} style={{ display: "flex", gap: 10, marginTop: 14, borderTop: "1px solid #334155", paddingTop: 14 }}>
          <input style={styles.mainInput} placeholder="Mesajınız..." value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button type="submit" style={styles.primaryActionBtn}><Send size={16} /> Gönder</button>
        </form>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, onSaveUser, onDeleteUser }) {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <h1 style={styles.viewTitle}>Kullanıcı Yönetimi</h1>
        <button style={styles.primaryActionBtn} onClick={() => { setEditingUser(null); setShowModal(true); }}><UserPlus size={16} /> Kullanıcı Ekle</button>
      </div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı Soyadı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>
            {usersList.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.tdTitle}>{u.name}</td><td style={styles.td}>{u.username}</td><td style={styles.td}>{u.role}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={styles.editIconBtn} onClick={() => { setEditingUser(u); setShowModal(true); }}>Düzenle</button>
                    {u.username !== "admin" && <button style={styles.deleteDangerBtn} onClick={() => onDeleteUser(u.id)}>Sil</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <UserModal userToEdit={editingUser} onClose={() => setShowModal(false)} onSave={onSaveUser} />}
    </div>
  );
}

function UserModal({ userToEdit, onClose, onSave }) {
  const [name, setName] = useState(userToEdit ? userToEdit.name : "");
  const [username, setUsername] = useState(userToEdit ? userToEdit.username : "");
  const [password, setPassword] = useState(userToEdit ? userToEdit.password : "0000");
  const [role, setRole] = useState(userToEdit ? userToEdit.role : "user");

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Kullanıcı</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <form onSubmit={e => { e.preventDefault(); onSave({ id: userToEdit ? userToEdit.id : uid(), name, username, password, role, status: "approved" }); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Adı Soyadı</label><input style={styles.mainInput} value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Kullanıcı Adı (ID)</label><input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>4 Haneli Şifre</label><input type="password" maxLength={4} style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Rol</label><select style={styles.selectInput} value={role} onChange={e => setRole(e.target.value)}><option value="user">Kullanıcı</option><option value="admin">Admin</option></select></div>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
        </form>
      </div>
    </div>
  );
}

function DetailedReportView({ tasks }) {
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Rapor</h1><button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>{tasks.map(t => (<tr key={t.id} style={styles.tr}><td style={styles.td}><span style={styles.taskCodeBadge}>{t.kod}</span></td><td style={styles.tdTitle}>{t.baslik}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.durum}</td></tr>))}</tbody>
        </table>
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
        <form onSubmit={(e) => { e.preventDefault(); if(oldPassword !== currentUser.password) { alert("Eski şifre yanlış!"); return; } if(newPassword.length !== 4) { alert("4 haneli olmalı"); return; } onSaveUser({...currentUser, password: newPassword}); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Eski Şifre</label><input type="password" maxLength={4} style={styles.mainInput} value={oldPassword} onChange={e => setOldPassword(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Yeni 4 Haneli Şifre</label><input type="password" maxLength={4} style={styles.mainInput} value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></div>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
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
  personalTaskCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8, cursor: "pointer", transition: "transform 0.2s" },
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
  filterToolbar: { display: "flex", gap: 12, alignItems: "center" },
  searchWrapper: { display: "flex", alignItems: "center", gap: 8, background: "#1E293B", padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", flex: 1 },
  searchInput: { background: "transparent", border: "none", color: "#F8FAFC", fontSize: 12, outline: "none", width: "100%" },
  primaryActionBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 10px rgba(245, 158, 11, 0.2)" },
  ghostBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
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
  loginCard: { background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 10px 40px rgba(245, 158, 11, 0.15)" },
  loginHeader: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  loginLogo: { width: 64, height: 64, borderRadius: 16, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" },
  inputLabel: { fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4, display: "block" },
  mainInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "10px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  selectInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
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