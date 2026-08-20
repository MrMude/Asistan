// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CheckSquare, Square, Plus, Trash2, Sparkles,
  Users, Bell, LayoutDashboard, Check, FileText, Printer,
  MessageCircle, Lock, Key, LogOut, Shield, ChevronRight,
  ArrowRight, Zap, Flame, Trophy, FolderPlus, Edit2, Search, AlertCircle
} from "lucide-react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

let app, auth, db, appId = 'asistan-live-workspace-v4';
let isFirebaseActive = false;

try {
  let firebaseConfig = {
    apiKey: "AIzaSyCK9WtWTyXxKTY45Mzw0kV4sPsfCIrwUG8",
    authDomain: "asistanv2-206bc.firebaseapp.com",
    projectId: "asistanv2-206bc",
    storageBucket: "asistanv2-206bc.firebasestorage.app",
    messagingSenderId: "78097147227",
    appId: "1:78097147227:web:ebd844b7834439072ee67e"
  };
  if (firebaseConfig && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseActive = true;
  }
} catch (e) {
  console.warn("Firebase local fallback mode active.", e);
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" }) : "");

const INITIAL_MODULES = [
  { id: "asakai", label: "Asakai Toplantısı", color: "#F59E0B" },
  { id: "iyilestirme", label: "İyileştirme", color: "#38BDF8" },
  { id: "kalite_guvence", label: "Kalite Güvence", color: "#10B981" },
  { id: "kalite_kontrol", label: "Kalite Kontrol", color: "#A855F7" }
];

const KANBAN_STAGES = [
  { id: "acik", label: "Açık / Yeni", color: "#EF4444" },
  { id: "devam", label: "Devam Ediyor", color: "#F59E0B" },
  { id: "beklemede", label: "Beklemede", color: "#3B82F6" },
  { id: "tamam", label: "Tamamlandı", color: "#10B981" }
];

const INITIAL_USERS = [
  { id: "usr-admin", username: "admin", password: "0000", name: "Sistem Yöneticisi (Admin)", role: "admin", status: "approved", permissions: ["asakai", "iyilestirme", "kalite_guvence", "kalite_kontrol"] },
  { id: "usr-ahmet", username: "ahmet", password: "0000", name: "Ahmet Yılmaz", role: "moderator", status: "approved", permissions: ["asakai", "kalite_guvence"] }
];

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [modulesList, setModulesList] = useState(INITIAL_MODULES);
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [tasks, setTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("asistan_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isLocked, setIsLocked] = useState(() => {
    try {
      return !!localStorage.getItem("asistan_current_user");
    } catch (e) {
      return false;
    }
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

  useEffect(() => {
    if (!isFirebaseActive) {
      try {
        setModulesList(JSON.parse(localStorage.getItem("asistan_modules") || JSON.stringify(INITIAL_MODULES)));
        setUsersList(JSON.parse(localStorage.getItem("asistan_users") || JSON.stringify(INITIAL_USERS)));
        setTasks(JSON.parse(localStorage.getItem("asistan_tasks") || "[]"));
      } catch (e) {}
      return;
    }
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) { console.warn("Auth warning:", e); }
    };
    initAuth();
    return onAuthStateChanged(auth, setFirebaseUser);
  }, []);

  useEffect(() => {
    if (!isFirebaseActive || !firebaseUser) return;
    const unsubs = [
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'modules'), s => {
        if (!s.empty) setModulesList(s.docs.map(d => ({ id: d.id, ...d.data() })));
        else INITIAL_MODULES.forEach(m => setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'modules', m.id), m));
      }),
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), s => {
        if (!s.empty) setUsersList(s.docs.map(d => ({ id: d.id, ...d.data() })));
        else INITIAL_USERS.forEach(u => setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', u.id), u));
      }),
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'tasks'), s => setTasks(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'todos'), s => setTodos(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'chats'), s => {
        if (!s.empty) setChats(s.docs.map(d => ({ id: d.id, ...d.data() })));
        else setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'chats', 'chat-genel'), { id: "chat-genel", title: "Genel Ekip Sohbeti", messages: [{ id: "m-1", sender: "Sistem", text: "ASİSTAN canlı çalışma alanına hoş geldiniz.", time: "08:30" }] });
      }),
      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'notifications'), s => setNotifications(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => unsubs.forEach(fn => fn());
  }, [firebaseUser]);

  useEffect(() => {
    if (!isFirebaseActive) {
      try {
        localStorage.setItem("asistan_modules", JSON.stringify(modulesList));
        localStorage.setItem("asistan_users", JSON.stringify(usersList));
        localStorage.setItem("asistan_tasks", JSON.stringify(tasks));
      } catch (e) {}
    }
    try {
      if (currentUser && !isLocked) localStorage.setItem("asistan_current_user", JSON.stringify(currentUser));
      else if (!currentUser) localStorage.removeItem("asistan_current_user");
    } catch (e) {}
  }, [currentUser, isLocked, modulesList, usersList, tasks]);

  const addNotification = async (targetUserName, message) => {
    const id = uid();
    const notif = { id, user: targetUserName, text: message, date: todayStr(), read: false };
    if (isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'notifications', id), notif);
    else setNotifications(prev => [notif, ...prev]);
  };

  const handleLogin = (username, password) => {
    const freshUsers = usersList;
    const found = freshUsers.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (found) {
      if (found.password === "0000") { setPendingUserForPasswordSetup(found); setError(null); return; }
      setCurrentUser(found); setIsLocked(false); setActiveModule("dashboard"); setError(null);
    } else { setError("Hatalı Kullanıcı Adı veya Şifre!"); }
  };

  const handleSaveFirstPassword = async (e) => {
    e.preventDefault();
    if (!newPasswordInput.trim() || newPasswordInput.length !== 4) { setError("4 haneli şifre giriniz."); return; }
    const updated = { ...pendingUserForPasswordSetup, password: newPasswordInput.trim() };
    if (isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', updated.id), updated);
    else setUsersList(prev => prev.map(u => u.id === updated.id ? updated : u));
    setCurrentUser(updated); setPendingUserForPasswordSetup(null); setNewPasswordInput(""); setIsLocked(false); setActiveModule("dashboard"); setError(null);
  };

  const handleSaveUser = async (userObj) => {
    if (isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', userObj.id), userObj);
    else setUsersList(prev => { const exists = prev.find(u => u.id === userObj.id); return exists ? prev.map(u => u.id === userObj.id ? userObj : u) : [...prev, userObj]; });
    if (currentUser?.id === userObj.id) setCurrentUser(userObj);
  };

  const handleDeleteUser = async (id) => {
    if (isFirebaseActive && firebaseUser) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', id));
    else setUsersList(prev => prev.filter(u => u.id !== id));
  };

  const handleSaveTask = async (taskObj) => {
    if (isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'tasks', taskObj.id), taskObj);
    else setTasks(prev => { const exists = prev.find(t => t.id === taskObj.id); return exists ? prev.map(t => t.id === taskObj.id ? taskObj : t) : [...prev, taskObj]; });
    if (selectedTask?.id === taskObj.id) setSelectedTask(taskObj);
  };

  const handleDeleteTask = async (id) => {
    if (isFirebaseActive && firebaseUser) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'tasks', id));
    else setTasks(prev => prev.filter(t => t.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  };

  if (pendingUserForPasswordSetup) {
    return (
      <div style={styles.loginOverlay}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}><Key size={36} color="#F59E0B" /><h1 style={{ fontSize: 22, fontWeight: 900, marginTop: 10, color: "#F59E0B" }}>ASİSTAN</h1></div>
          {error && <div style={styles.errorBar}>{error}</div>}
          <form onSubmit={handleSaveFirstPassword} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            <div><label style={styles.inputLabel}>4 Haneli Yeni Şifreniz</label><input type="password" maxLength={4} style={styles.mainInput} value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} required autoFocus /></div>
            <button type="submit" style={styles.loginSubmitBtn}>Kaydet ve Giriş Yap <ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginScreen onLogin={handleLogin} error={error} />;
  if (isLocked) return <LockScreen currentUser={currentUser} onUnlock={(p) => p === currentUser.password ? setIsLocked(false) : setError("Şifre hatalı!")} onSwitchUser={() => setCurrentUser(null)} error={error} />;

  const myNotifs = notifications.filter(n => n.user === currentUser.name);

  return (
    <div style={styles.appShell}>
      <header style={styles.header}>
        <div style={styles.brand}><Sparkles size={24} color="#F59E0B" /><div><div style={styles.brandName}>ASİSTAN</div><div style={styles.brandSub}>Görevler tamamlanır, puanlar toplanır, başarı kutlanır.</div></div></div>
        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("dashboard")}><LayoutDashboard size={15} /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><CheckSquare size={15} /><span>To-Do</span></button>
          {modulesList.map(m => (currentUser.role === "admin" || (currentUser.permissions || []).includes(m.id)) && (
            <button key={m.id} style={{ ...styles.navTab, ...(activeModule === m.id ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}><Zap size={15} color={m.color} /><span>{m.label}</span></button>
          ))}
          <button style={{ ...styles.navTab, ...(activeModule === "chat" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("chat")}><MessageCircle size={15} /><span>Sohbet</span></button>
          {(currentUser.role === "admin" || currentUser.role === "moderator") && <button style={{ ...styles.navTab, ...(activeModule === "rapor" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("rapor")}><FileText size={15} /><span>Rapor</span></button>}
          {currentUser.role === "admin" && <button style={{ ...styles.navTab, ...(activeModule === "admin" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin")}><Lock size={15} /><span>Admin</span></button>}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          <button style={styles.notificationBellBtn} onClick={() => setShowNotificationsModal(true)}><Bell size={18} color="#F59E0B" />{myNotifs.length > 0 && <span style={styles.notificationBadge}>{myNotifs.length}</span>}</button>
          <div style={styles.userProfileBar}>
            <div style={{ textAlign: "right" }}><div style={styles.userName}>{currentUser.name}</div><div style={styles.userRoleTag}>{currentUser.role}</div></div>
            <div style={styles.userAvatar}>{currentUser.name.charAt(0)}</div>
            <button style={styles.actionSmallBtn} onClick={() => setShowPasswordModal(true)}><Key size={14} color="#38BDF8" /></button>
            <button style={styles.actionSmallBtn} onClick={() => { setCurrentUser(null); setIsLocked(false); }}><LogOut size={14} color="#EF4444" /></button>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {activeModule === "dashboard" ? <DashboardView tasks={tasks} currentUser={currentUser} onOpenDetail={setSelectedTask} onNavigate={setActiveModule} />
        : activeModule === "todo" ? <TodoView currentUser={currentUser} db={db} appId={appId} isFirebaseActive={isFirebaseActive} firebaseUser={firebaseUser} />
        : activeModule === "chat" ? <ChatView chats={chats} setChats={setChats} currentUser={currentUser} db={db} appId={appId} isFirebaseActive={isFirebaseActive} firebaseUser={firebaseUser} />
        : activeModule === "rapor" ? <ReportView tasks={tasks} />
        : activeModule === "admin" ? <AdminView usersList={usersList} modulesList={modulesList} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} setModulesList={setModulesList} db={db} appId={appId} isFirebaseActive={isFirebaseActive} />
        : <KanbanView activeModule={activeModule} modulesList={modulesList} tasks={tasks.filter(t => t.module === activeModule)} currentUser={currentUser} usersList={usersList} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onOpenDetail={setSelectedTask} onMoveStage={async (id, s) => { const t = tasks.find(x => x.id === id); if (t) await handleSaveTask({ ...t, durum: s }); }} onCreateTask={async (d) => {
            const id = uid();
            const nt = { id, module: activeModule, kod: `ASK-${Date.now().toString().slice(-4)}`, baslik: d.baslik, sorumlu: d.sorumlu, vade: d.vade, durum: "acik", subtasks: [] };
            if (isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'tasks', id), nt);
            else setTasks(p => [...p, nt]);
          }} onDeleteTask={handleDeleteTask} />}
      </main>

      {selectedTask && <TaskDetailModal task={selectedTask} currentUser={currentUser} onClose={() => setSelectedTask(null)} onSaveTask={handleSaveTask} onDeleteTask={handleDeleteTask} />}
      {showPasswordModal && <PasswordModal currentUser={currentUser} onClose={() => setShowPasswordModal(false)} onSaveUser={handleSaveUser} />}
      {showNotificationsModal && <NotificationsModal notifications={myNotifs} onClose={() => setShowNotificationsModal(false)} />}
    </div>
  );
}

function DashboardView({ tasks, currentUser, onOpenDetail, onNavigate }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name);
  const pts = myTasks.reduce((acc, t) => acc + (t.durum === "tamam" ? 10 : 0), 0);
  return (
    <div style={styles.viewContainer}>
      <div style={{ background: "linear-gradient(135deg, #1E293B, #0F172A)", borderRadius: 16, border: "1px solid #F59E0B", padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 900, color: "#F59E0B", display: "flex", gap: 10 }}>Hoş Geldin, {currentUser.name} <Flame size={24} color="#F59E0B" /></h1><p style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>Görevler tamamlanır, puanlar toplanır, başarı kutlanır.</p></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700 }}>PUAN</div><div style={{ fontSize: 32, fontWeight: 900, color: "#F59E0B" }}>{pts} P</div></div>
      </div>
      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8" }}><div style={styles.dashCardTitle}>Toplam İş</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Tamamlanan</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div></div>
      </div>
    </div>
  );
}

function KanbanView({ activeModule, modulesList, tasks, currentUser, searchQuery, setSearchQuery, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showModal, setShowModal] = useState(false);
  const [baslik, setBaslik] = useState(""); const [sorumlu, setSorumlu] = useState(currentUser.name); const [vade, setVade] = useState(todayStr());
  const modObj = modulesList.find(m => m.id === activeModule) || { label: "Pano" };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <h1 style={styles.viewTitle}>{modObj.label} Panosu</h1>
        <button style={styles.primaryActionBtn} onClick={() => setShowModal(true)}><Plus size={16} /> Yeni Görev</button>
      </div>
      <div style={styles.filterToolbar}><div style={styles.searchWrapper}><Search size={15} color="#F59E0B" /><input style={styles.searchInput} placeholder="Ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div></div>
      <div style={styles.kanbanGrid}>
        {KANBAN_STAGES.map(s => (
          <div key={s.id} style={styles.kanbanColumn} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("text"); if(id) onMoveStage(id, s.id); }}>
            <div style={{ ...styles.kanbanColumnHeader, borderTopColor: s.color }}><span style={{ fontWeight: 800, color: s.color }}>{s.label}</span><span style={styles.kanbanBadge}>{tasks.filter(t => t.durum === s.id).length}</span></div>
            <div style={styles.kanbanCardsList}>
              {tasks.filter(t => t.durum === s.id).map(t => (
                <div key={t.id} style={styles.kanbanCard} draggable onDragStart={e => e.dataTransfer.setData("text", t.id)}>
                  <div style={styles.cardHeaderRow}><span style={styles.taskCodeBadge}>{t.kod}</span><button style={styles.deleteIconBtn} onClick={() => onDeleteTask(t.id)}><Trash2 size={12} /></button></div>
                  <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(t)}>{t.baslik}</div>
                  <div style={styles.kanbanCardFooter}><span>{t.sorumlu}</span><span>{fmtDate(t.vade)}</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.createModalContent}>
            <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Görev Ekle</h2><button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button></div>
            <form onSubmit={e => { e.preventDefault(); onCreateTask({ baslik, sorumlu, vade }); setShowModal(false); setBaslik(""); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
              <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} required /></div>
              <div><label style={styles.inputLabel}>Sorumlu</label><select style={styles.selectInput} value={sorumlu} onChange={e => setSorumlu(e.target.value)}>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select></div>
              <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
              <button type="submit" style={styles.primaryActionBtn}>Oluştur</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TodoView({ currentUser, db, appId, isFirebaseActive, firebaseUser }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    if (!isFirebaseActive) {
      try { setTodos(JSON.parse(localStorage.getItem("asistan_todos") || "[]")); } catch (e) {}
      return;
    }
    return onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'todos'), s => setTodos(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [isFirebaseActive]);
  const add = async (e) => {
    e.preventDefault(); if(!text.trim()) return;
    const id = uid(); const item = { id, user: currentUser.name, text: text.trim(), done: false };
    if(isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'todos', id), item);
    else setTodos(p => [item, ...p]);
    setText("");
  };
  return (
    <div style={styles.viewContainer}>
      <h1 style={styles.viewTitle}>Kişisel To-Do List</h1>
      <form onSubmit={add} style={{ display: "flex", gap: 10 }}><input style={{ ...styles.mainInput, flex: 3 }} placeholder="Not..." value={text} onChange={e => setText(e.target.value)} /><button type="submit" style={styles.primaryActionBtn}>Ekle</button></form>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {todos.filter(t => t.user === currentUser.name).map(t => (
          <div key={t.id} style={{ background: "#0F172A", padding: 12, borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
            <span>{t.text}</span>
            <button style={styles.deleteIconBtn} onClick={async () => {
              if(isFirebaseActive && firebaseUser) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'todos', t.id));
              else setTodos(p => p.filter(x => x.id !== t.id));
            }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatView({ chats, setChats, currentUser, db, appId, isFirebaseActive, firebaseUser }) {
  const [msg, setMsg] = useState("");
  const activeChat = chats[0] || { id: "chat-genel", title: "Genel", messages: [] };
  const send = async (e) => {
    e.preventDefault(); if(!msg.trim()) return;
    const m = { id: uid(), sender: currentUser.name, text: msg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updated = { ...activeChat, messages: [...(activeChat.messages || []), m] };
    if(isFirebaseActive && firebaseUser) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'chats', activeChat.id), updated);
    else setChats(p => p.map(c => c.id === activeChat.id ? updated : c));
    setMsg("");
  };
  return (
    <div style={styles.viewContainer}>
      <h1 style={styles.viewTitle}>Ekip Sohbeti</h1>
      <div style={{ background: "#1E293B", borderRadius: 14, padding: 20, height: "60vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {activeChat.messages?.map(m => (
            <div key={m.id} style={{ alignSelf: m.sender === currentUser.name ? "flex-end" : "flex-start", background: m.sender === currentUser.name ? "#F59E0B" : "#0F172A", color: m.sender === currentUser.name ? "#0F172A" : "#F8FAFC", padding: 10, borderRadius: 8, maxWidth: "70%" }}>
              <div style={{ fontSize: 10, opacity: 0.8 }}>{m.sender}</div><div>{m.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={send} style={{ display: "flex", gap: 10, marginTop: 10 }}><input style={styles.mainInput} placeholder="Mesaj..." value={msg} onChange={e => setMsg(e.target.value)} /><button type="submit" style={styles.primaryActionBtn}>Gönder</button></form>
      </div>
    </div>
  );
}

function ReportView({ tasks }) {
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Rapor</h1><button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>{tasks.map(t => (<tr key={t.id} style={styles.tr}><td style={styles.td}>{t.kod}</td><td style={styles.td}>{t.baslik}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.durum}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminView({ usersList, modulesList, onSaveUser, onDeleteUser, setModulesList, db, appId, isFirebaseActive }) {
  const [label, setLabel] = useState(""); const [color, setColor] = useState("#38BDF8");
  return (
    <div style={styles.viewContainer}>
      <h1 style={styles.viewTitle}>Admin Paneli & Başlıklar</h1>
      <div style={{ background: "#1E293B", padding: 20, borderRadius: 14 }}>
        <h3 style={{ color: "#F59E0B", marginBottom: 10 }}>Yeni Pano Ekle</h3>
        <form onSubmit={async e => {
          e.preventDefault(); if(!label.trim()) return;
          const id = "mod_" + uid(); const m = { id, label: label.trim(), color };
          if(isFirebaseActive) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'modules', id), m);
          else setModulesList(p => [...p, m]);
          setLabel("");
        }} style={{ display: "flex", gap: 10 }}><input style={{ ...styles.mainInput, flex: 2 }} placeholder="Pano adı..." value={label} onChange={e => setLabel(e.target.value)} /><input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 40 }} /><button type="submit" style={styles.primaryActionBtn}>Ekle</button></form>
      </div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>İsim</th><th style={styles.th}>Rol</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>{usersList.map(u => (<tr key={u.id} style={styles.tr}><td style={styles.td}>{u.name}</td><td style={styles.td}>{u.role}</td><td style={styles.td}><button style={styles.deleteDangerBtn} onClick={() => onDeleteUser(u.id)}>Sil</button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, onClose, onSaveTask, onDeleteTask }) {
  const [sub, setSub] = useState("");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}>✕</button></div>
        <div style={styles.drawerBody}>
          <h2>{task.baslik}</h2>
          <div>Sorumlu: {task.sorumlu}</div>
          <div>Alt Adımlar:</div>
          {(task.subtasks || []).map((st, i) => <div key={i}>- {st.text}</div>)}
          <div style={{ display: "flex", gap: 6 }}><input style={styles.mainInput} placeholder="Alt adım..." value={sub} onChange={e => setSub(e.target.value)} /><button style={styles.addInlineBtn} onClick={async () => {
            if(!sub.trim()) return;
            const updated = { ...task, subtasks: [...(task.subtasks || []), { id: uid(), text: sub, done: false }] };
            await onSaveTask(updated); setSub("");
          }}>Ekle</button></div>
        </div>
        <div style={styles.drawerFooter}><button style={styles.deleteDangerBtn} onClick={() => onDeleteTask(task.id)}>Sil</button><button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function NotificationsModal({ notifications, onClose }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2>Bildirimler</h2><button style={styles.closeBtn} onClick={onClose}>✕</button></div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>{notifications.map(n => <div key={n.id} style={{ background: "#0F172A", padding: 10, borderRadius: 6, fontSize: 12 }}>{n.text}</div>)}</div>
      </div>
    </div>
  );
}

function PasswordModal({ currentUser, onClose, onSaveUser }) {
  const [oldP, setOldP] = useState(""); const [newP, setNewP] = useState("");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2>Şifre Değiştir</h2><button style={styles.closeBtn} onClick={onClose}>✕</button></div>
        <form onSubmit={e => { e.preventDefault(); if(oldP !== currentUser.password) { alert("Eski şifre yanlış"); return; } onSaveUser({ ...currentUser, password: newP }); alert("Güncellendi"); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Eski Şifre</label><input type="password" style={styles.mainInput} value={oldP} onChange={e => setOldP(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Yeni Şifre</label><input type="password" style={styles.mainInput} value={newP} onChange={e => setNewP(e.target.value)} required /></div>
          <button type="submit" style={styles.primaryActionBtn}>Kaydet</button>
        </form>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, error }) {
  const [u, setU] = useState(""); const [p, setP] = useState("");
  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}><Sparkles size={40} color="#F59E0B" /><h1 style={{ fontSize: 32, fontWeight: 900, marginTop: 12, color: "#F59E0B" }}>ASİSTAN</h1><p style={{ fontSize: 12, color: "#94A3B8" }}>Görevler tamamlanır, puanlar toplanır, başarı kutlanır.</p></div>
        {error && <div style={styles.errorBar}>{error}</div>}
        <form onSubmit={e => { e.preventDefault(); onLogin(u, p); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
          <div><label style={styles.inputLabel}>Kullanıcı Adı</label><input style={styles.mainInput} value={u} onChange={e => setU(e.target.value)} required autoFocus /></div>
          <div><label style={styles.inputLabel}>Şifre</label><input type="password" style={styles.mainInput} value={p} onChange={e => setP(e.target.value)} required /></div>
          <button type="submit" style={styles.loginSubmitBtn}>Giriş Yap <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
}

function LockScreen({ currentUser, onUnlock, onSwitchUser, error }) {
  const [p, setP] = useState("");
  return (
    <div style={styles.loginOverlay}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}><Lock size={36} color="#F59E0B" /><h1 style={{ fontSize: 24, fontWeight: 900, marginTop: 10, color: "#F59E0B" }}>ASİSTAN</h1></div>
        {error && <div style={styles.errorBar}>{error}</div>}
        <form onSubmit={e => { e.preventDefault(); onUnlock(p); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={styles.inputLabel}>Şifreniz</label><input type="password" style={styles.mainInput} value={p} onChange={e => setP(e.target.value)} required autoFocus /></div>
          <button type="submit" style={styles.loginSubmitBtn}>Kilidi Aç <ArrowRight size={16} /></button>
          <button type="button" style={styles.ghostBtn} onClick={onSwitchUser}>Farklı Hesap</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  appShell: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#0F172A", color: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", padding: "12px 24px", background: "#1E293B", borderBottom: "2px solid #F59E0B", gap: 16, flexWrap: "wrap" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandName: { fontWeight: 900, fontSize: 18, color: "#F59E0B" },
  brandSub: { fontSize: 10, color: "#94A3B8" },
  navTabs: { display: "flex", gap: 6, background: "#0F172A", padding: 4, borderRadius: 10, flexWrap: "wrap" },
  navTab: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent", color: "#94A3B8", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  navTabActive: { background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B", border: "1px solid #F59E0B" },
  navTabAdminActive: { background: "rgba(239, 68, 68, 0.2)", color: "#EF4444", border: "1px solid #EF4444" },
  notificationBellBtn: { background: "#1E293B", border: "1px solid #334155", borderRadius: 8, padding: 8, cursor: "pointer", position: "relative" },
  notificationBadge: { position: "absolute", top: -4, right: -4, background: "#EF4444", color: "#FFF", fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: "50%" },
  userProfileBar: { display: "flex", alignItems: "center", gap: 10, background: "#0F172A", padding: "6px 12px", borderRadius: 10, border: "1px solid #334155" },
  userAvatar: { width: 32, height: 32, borderRadius: "50%", background: "#F59E0B", color: "#0F172A", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 },
  userName: { fontSize: 12, fontWeight: 700 },
  userRoleTag: { fontSize: 10, color: "#F59E0B" },
  actionSmallBtn: { background: "transparent", border: "none", cursor: "pointer" },
  errorBar: { background: "rgba(239, 68, 68, 0.2)", padding: "8px 12px", color: "#FCA5A5", fontSize: 12, borderRadius: 6 },
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
  primaryActionBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
  ghostBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer" },
  yearEndHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  viewTitle: { fontSize: 20, fontWeight: 800 },
  viewSub: { fontSize: 11, color: "#94A3B8" },
  yearEndTableCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" },
  th: { borderBottom: "1px solid #334155", padding: "10px 12px", color: "#F59E0B", fontWeight: 700 },
  tr: { borderBottom: "1px solid #0F172A" },
  td: { padding: "10px 12px" },
  deleteIconBtn: { background: "transparent", border: "none", color: "#EF4444", cursor: "pointer" },
  loginOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 1000 },
  loginCard: { background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 16 },
  loginHeader: { textAlign: "center" },
  inputLabel: { fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4, display: "block" },
  mainInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "10px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
  selectInput: { background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#F8FAFC", fontSize: 12, outline: "none", width: "100%" },
  loginSubmitBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "12px", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 },
  drawerContainer: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", overflow: "hidden" },
  createModalContent: { background: "#1E293B", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 500, padding: 20 },
  drawerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #334155" },
  drawerBody: { padding: 20, display: "flex", flexDirection: "column", gap: 16 },
  closeBtn: { background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" },
  subtaskSection: { background: "#0F172A", border: "1px solid #334155", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 },
  addInlineBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "0 12px", borderRadius: 6, fontWeight: 700, fontSize: 11, cursor: "pointer" },
  drawerFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderTop: "1px solid #334155" },
  deleteDangerBtn: { background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer" },
  formTitle: { fontSize: 16, fontWeight: 800, color: "#F59E0B" }
};