// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CheckSquare, Square, Plus, Trash2, Download, Upload, Sparkles,
  Calendar, Users, Target, AlertTriangle, CheckCircle2, Clock,
  Search, FileSpreadsheet, Layers, Send, Edit3, X, ShieldCheck,
  ListTodo, RefreshCw, Award, Wifi, WifiOff, Share2, Globe, UserPlus,
  Lock, Key, LogOut, Shield, ChevronRight, ChevronDown, ArrowRight, ArrowLeft, Zap, Truck,
  FileUp, HelpCircle, AlertCircle, GripVertical, Edit2, Bell, LayoutDashboard, Check, BarChart3, FileText, Printer, MessageSquare, ExternalLink, MessageCircle, GitCommit, User, Flame, Trophy
} from "lucide-react";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" }) : "");
const getDaysDiff = (target) => {
  if (!target) return 999;
  return Math.ceil((new Date(target) - new Date(todayStr())) / (1000 * 60 * 60 * 24));
};

const MODULES = [
  { id: "asakai", label: "Asakai Toplantısı", icon: Zap, color: "#F59E0B" },
  { id: "iyilestirme", label: "İyileştirme Toplantısı", icon: RefreshCw, color: "#38BDF8" },
  { id: "kalite_guvence", label: "Kalite Güvence", icon: ShieldCheck, color: "#10B981" },
  { id: "kalite_kontrol", label: "Kalite Kontrol", icon: CheckSquare, color: "#A855F7" },
  { id: "tedarik_kalite", label: "Tedarik Kalite", icon: Truck, color: "#EC4899" }
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
  // Asakai Toplantısı
  { id: "tsk-1", module: "asakai", kod: "ASK-2026-001", baslik: "Vardiya A Hatası Giriş Kontrol Tespiti", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-01", vade: "2026-08-10", bitisTarihi: "", durum: "acik", oncelik: "Kritik", subtasks: [{ id: "st-1", text: "Karantinaya alınması", sorumlu: "Ahmet Yılmaz", done: true }] },
  { id: "tsk-6", module: "asakai", kod: "ASK-2026-002", baslik: "Haftalık OEE Düşüş Nedenleri Analizi", sorumlu: "Ahmet Yılmaz", gorevTipi: "ekip", ekipUyeleri: ["Selin Yıldız"], acilisTarihi: "2026-08-05", vade: "2026-08-20", bitisTarihi: "", durum: "beklemede", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-11", module: "asakai", kod: "ASK-2026-003", baslik: "Gece Vardiyası İş Güvenliği Kılavuz Taraması", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-10", vade: new Date(Date.now() + 86400000*2).toISOString().slice(0,10), bitisTarihi: "", durum: "devam", oncelik: "Kritik", subtasks: [] },
  { id: "tsk-16", module: "asakai", kod: "ASK-2026-004", baslik: "Günlük Hurda Takip ve Azaltma Toplantısı", sorumlu: "Ahmet Yılmaz", gorevTipi: "ekip", ekipUyeleri: ["Selin Yıldız"], acilisTarihi: "2026-08-15", vade: "2026-08-25", bitisTarihi: "", durum: "devam", oncelik: "Kritik", subtasks: [] },
  { id: "tsk-21", module: "asakai", kod: "ASK-2026-005", baslik: "Bakım Arıza Süreleri Değerlendirmesi", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-08-22", bitisTarihi: "", durum: "acik", oncelik: "Kritik", subtasks: [] },

  // İyileştirme Toplantısı
  { id: "tsk-2", module: "iyilestirme", kod: "IYL-2026-001", baslik: "Pres Hattı Fire Oranını Düşürme Kaizen Projesi", sorumlu: "Selin Yıldız", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz", "Selin Yıldız"], acilisTarihi: "2026-08-10", vade: "2026-09-01", bitisTarihi: "", durum: "devam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-7", module: "iyilestirme", kod: "IYL-2026-002", baslik: "Kaynak Robotu Kalibrasyon Süresinin İyileştirilmesi", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-06", vade: "2026-09-05", bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] },
  { id: "tsk-12", module: "iyilestirme", kod: "IYL-2026-003", baslik: "Depo Raf Yerleşimi 5S Düzenleme Çalışması", sorumlu: "Selin Yıldız", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz", "Selin Yıldız"], acilisTarihi: "2026-08-11", vade: "2026-09-10", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [] },
  { id: "tsk-17", module: "iyilestirme", kod: "IYL-2026-004", baslik: "Paketleme İstasyonu Ergonomi İyileştirmesi", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-16", vade: "2026-09-15", bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] },
  { id: "tsk-22", module: "iyilestirme", kod: "IYL-2026-005", baslik: "Enerji Tüketimini Azaltma Projesi (Kaizen)", sorumlu: "Selin Yıldız", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz"], acilisTarihi: "2026-08-18", vade: "2026-09-30", bitisTarihi: "", durum: "devam", oncelik: "Yüksek", subtasks: [] },

  // Kalite Güvence
  { id: "tsk-3", module: "kalite_guvence", kod: "KGV-2026-001", baslik: "ISO 9001 İç Tetkik Hazırlıkları ve Doküman Revizyonu", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz", "Selin Yıldız"], acilisTarihi: "2026-08-02", vade: "2026-08-25", bitisTarihi: "", durum: "devam", oncelik: "Kritik", subtasks: [{ id: "st-3", text: "Prosedürlerin güncellenmesi", sorumlu: "Ahmet Yılmaz", done: true }] },
  { id: "tsk-8", module: "kalite_guvence", kod: "KGV-2026-002", baslik: "Müşteri Şikayeti 8D Raporu Kök Neden Araştırması", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "ekip", ekipUyeleri: ["Ahmet Yılmaz"], acilisTarihi: "2026-08-07", vade: "2026-08-14", bitisTarihi: "2026-08-12", durum: "tamam", oncelik: "Kritik", subtasks: [] },
  { id: "tsk-13", module: "kalite_guvence", kod: "KGV-2026-003", baslik: "Tedarikçi Performans Puanlama Sistemi Güncellemesi", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-12", vade: new Date(Date.now() + 86400000*1).toISOString().slice(0,10), bitisTarihi: "", durum: "acik", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-18", module: "kalite_guvence", kod: "KGV-2026-004", baslik: "Çevre Yönetim Sistemi ISO 14001 Denetim Hazırlığı", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-17", vade: "2026-09-20", bitisTarihi: "", durum: "acik", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-23", module: "kalite_guvence", kod: "KGV-2026-005", baslik: "Müşteri Özel İstekleri ve Şartname Kontrol Matrisi", sorumlu: "Sistem Yöneticisi (Admin)", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-09-05", bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] },

  // Kalite Kontrol
  { id: "tsk-4", module: "kalite_kontrol", kod: "KKK-2026-001", baslik: "CNC Tezgah Parça Tolerans Ölçüm Doğrulaması", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-03", vade: "2026-08-15", bitisTarihi: "2026-08-14", durum: "tamam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-9", module: "kalite_kontrol", kod: "KKK-2026-002", baslik: "Montaj Hattı Pnömatik Tork Kontrolü", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-08", vade: "2026-08-22", bitisTarihi: "", durum: "devam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-14", module: "kalite_kontrol", kod: "KKK-2026-003", baslik: "Paketleme Boyutsal Uygunluk Testi", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-13", vade: "2026-08-19", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [] },
  { id: "tsk-19", module: "kalite_kontrol", kod: "KKK-2026-004", baslik: "Final Muayene Raporlarının Dijitalleşmesi Onayı", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-08-24", bitisTarihi: "2026-08-18", durum: "tamam", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-24", module: "kalite_kontrol", kod: "KKK-2026-005", baslik: "Kordinat Ölçüm Cihazı (CMM) Problarının Kalibrasyonu", sorumlu: "Selin Yıldız", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-08-26", bitisTarihi: "", durum: "beklemede", oncelik: "Kritik", subtasks: [] },

  // Tedarik Kalite
  { id: "tsk-5", module: "tedarik_kalite", kod: "TRD-2026-001", baslik: "Sac Tedarikçisi ABC Metal hammadde girdi kontrolü", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-04", vade: "2026-08-18", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [] },
  { id: "tsk-10", module: "tedarik_kalite", kod: "TRD-2026-002", baslik: "Yan Sanayi Boyahane Denetimi", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-09", vade: "2026-08-30", bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] },
  { id: "tsk-15", module: "tedarik_kalite", kod: "TRD-2026-003", baslik: "Plastik Enjeksiyon Parça Ömür Testleri", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-14", vade: "2026-08-28", bitisTarihi: "", durum: "beklemede", oncelik: "Yüksek", subtasks: [] },
  { id: "tsk-20", module: "tedarik_kalite", kod: "TRD-2026-004", baslik: "Döküm Parça Çapak Temizleme Süreç Kontrolü", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-08-29", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [] },
  { id: "tsk-25", module: "tedarik_kalite", kod: "TRD-2026-005", baslik: "Yeni Cıvata Tedarikçisi Numune Onay Raporu (PPAP)", sorumlu: "Ahmet Yılmaz", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-18", vade: "2026-09-02", bitisTarihi: "", durum: "acik", oncelik: "Yüksek", subtasks: [] }
];

const INITIAL_TODOS = [
  { id: "td-1", user: "Sistem Yöneticisi (Admin)", text: "Haftalık KPI Raporlarını İncele", done: false, priority: "Yüksek", subtasks: [{ id: "ts-1", text: "Dashboard verilerini dışa aktar", done: true }], developments: [] }
];

const INITIAL_CHATS = [
  { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", participants: [], messages: [{ id: "m-1", sender: "Sistem Yöneticisi (Admin)", text: "Herkese iyi çalışmalar, sisteme hoş geldiniz.", time: "08:30" }] }
];

export default function App() {
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("dva_v3_users");
    let parsed = saved ? JSON.parse(saved) : INITIAL_USERS;
    const adminIndex = parsed.findIndex(u => u.username.toLowerCase() === "admin");
    if (adminIndex === -1) { parsed.unshift(INITIAL_USERS[0]); } 
    else { parsed[adminIndex] = { ...parsed[adminIndex], status: "approved", role: "admin" }; }
    return parsed;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dva_v3_tasks");
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("dva_v3_todos");
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("dva_v3_chats");
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("dva_v3_notifs");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("dva_v3_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLocked, setIsLocked] = useState(() => {
    return localStorage.getItem("dva_v3_current_user") ? true : false;
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

  useEffect(() => { localStorage.setItem("dva_v3_users", JSON.stringify(usersList)); }, [usersList]);
  useEffect(() => { localStorage.setItem("dva_v3_tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("dva_v3_todos", JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem("dva_v3_chats", JSON.stringify(chats)); }, [chats]);
  useEffect(() => { localStorage.setItem("dva_v3_notifs", JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => {
    if (currentUser && !isLocked) {
      localStorage.setItem("dva_v3_current_user", JSON.stringify(currentUser));
    } else if (!currentUser) {
      localStorage.removeItem("dva_v3_current_user");
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
        id: uid(), module: taskData.module || "asakai", kod: `${prefix}-2026-${(prev.length + 1).toString().padStart(3, "0")}`,
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

  if (!currentUser) return <LoginScreen onLogin={handleLogin} error={error} setError={setError} />;
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
          {MODULES.map((m) => {
            if (currentUser.role !== "admin" && !(currentUser.permissions || []).includes(m.id)) return null;
            const Icon = m.icon;
            return <button key={m.id} style={{ ...styles.navTab, ...(activeModule === m.id ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}><Icon size={15} color={activeModule === m.id ? "#F59E0B" : m.color} /><span>{m.label}</span></button>;
          })}
          <button style={{ ...styles.navTab, ...(activeModule === "ic_yazisma" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("ic_yazisma")}><MessageCircle size={15} color="#38BDF8" /><span>İç Yazışmalar</span></button>
          
          {(currentUser.role === "admin" || currentUser.role === "moderator") && (
            <button style={{ ...styles.navTab, ...(activeModule === "detayli_rapor" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("detayli_rapor")}><FileText size={15} color="#38BDF8" /><span>Detaylı Rapor</span></button>
          )}
          {currentUser.role === "admin" && (
            <button style={{ ...styles.navTab, ...(activeModule === "admin_panel" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin_panel")}><Lock size={15} color="#EF4444" /><span>Yetki & Onay Matrisi</span></button>
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
          <DashboardView tasks={tasks} usersList={usersList} currentUser={currentUser} onOpenDetail={(t) => setSelectedTask(t)} onNavigateModule={(modId) => setActiveModule(modId)} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "ic_yazisma" ? (
          <InternalChatView chats={chats} setChats={setChats} currentUser={currentUser} usersList={usersList} tasks={tasks} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} onApproveUser={handleApproveUser} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Erişim Yetkiniz Bulunmamaktadır</h2></div>
        ) : activeModule === "detayli_rapor" ? (
          (currentUser.role === "admin" || currentUser.role === "moderator") ? <DetailedReportView tasks={tasks} usersList={usersList} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Erişim Yetkiniz Yok</h2></div>
        ) : (
          <KanbanBoardView
            activeModule={activeModule} tasks={tasks.filter((t) => t.module === activeModule)}
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
          onDeleteTask={handleDeleteTask} usersList={usersList}
        />
      )}

      {showPasswordModal && <ChangePasswordModal currentUser={currentUser} onClose={() => setShowPasswordModal(false)} onSaveUser={handleSaveUser} />}
      {showNotificationsModal && (
        <NotificationsModal notifications={myNotifications} onClose={() => setShowNotificationsModal(false)} onMarkAllRead={() => { setNotifications(prev => prev.map(n => (n.user === currentUser.name || (n.ekipUyeleri && n.ekipUyeleri.includes(currentUser.name))) ? { ...n, read: true } : n)); }} />
      )}
    </div>
  );
}

function DashboardView({ tasks, currentUser, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name || (t.ekipUyeleri && t.ekipUyeleri.includes(currentUser.name)));
  
  // Puan Hesaplama Algoritması
  const userPoints = useMemo(() => {
    let pts = 0;
    myTasks.forEach(t => {
      if (t.durum === "tamam") {
        if (t.bitisTarihi && t.vade && t.bitisTarihi <= t.vade) pts += 10;
        else pts += 2; // Gecikmeli tamamlanan
      } else {
        if (t.vade && t.vade < todayStr()) pts -= 5; // Vadesi geçmiş ama açık olanlar
      }
    });
    return pts;
  }, [myTasks]);

  const getRank = (pts) => {
    if (pts < 0) return { label: "Riskli Bölge", color: "#EF4444" };
    if (pts < 30) return { label: "Çırak / Gelişime Açık", color: "#94A3B8" };
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
      
      {/* OYUNLAŞTIRMA (GAMIFICATION) BANNER */}
      <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", borderRadius: 16, border: `1px solid ${currentRank.color}`, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>Hoş Geldin, {currentUser.name} <Flame size={24} color={currentRank.color} /></h1>
          <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 6 }}>Zamanında tamamlanan görevler (+10P), Geciken açık işler (-5P) şeklinde hesaplanır.</p>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>Performans Puanı</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: currentRank.color }}>{userPoints} <span style={{ fontSize: 16 }}>P</span></div>
          </div>
          <div style={{ width: 1, height: 40, background: "#334155" }}></div>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>Mevcut Seviye</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.3)", padding: "6px 12px", borderRadius: 10, marginTop: 4 }}>
              <Trophy size={18} color={currentRank.color} />
              <span style={{ fontSize: 14, fontWeight: 800, color: currentRank.color }}>{currentRank.label}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8" }}><div style={styles.dashCardTitle}>Üzerimdeki Toplam İş</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B" }}><div style={styles.dashCardTitle}>Aktif Bekleyenler</div><div style={styles.dashCardValue}>{myActive}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Tamamlanan</div><div style={styles.dashCardValue}>{myCompleted}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Geciken İşlerim</div><div style={{ fontSize: 24, fontWeight: 800, marginTop: 6, color: "#EF4444" }}>{delayedTasksList.length}</div></div>
      </div>

      {/* YAKLAŞAN GÖREVLER RADARI */}
      {approachingTasks.length > 0 && (
        <div style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px solid #F59E0B", borderRadius: 14, padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={18} /> Yaklaşan Görevler Radarı (Son 3 Gün)
          </h3>
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

      {/* MODÜL BAZLI DETAY LİSTELERİ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 10 }}>
        {MODULES.map(mod => {
          if (currentUser.role !== "admin" && !(currentUser.permissions || []).includes(mod.id)) return null;
          const Icon = mod.icon;
          const modTasks = myTasks.filter(t => t.module === mod.id && t.durum !== "tamam");
          if (modTasks.length === 0) return null; // Sadece açık görev olan başlıkları göster
          
          const bireyselTasks = modTasks.filter(t => t.gorevTipi === "bireysel");
          const ekipTasks = modTasks.filter(t => t.gorevTipi === "ekip");

          return (
            <div key={mod.id} style={{ background: "#1E293B", borderRadius: 14, border: "1px solid #334155", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "#161E2E", borderBottom: "1px solid #334155" }}>
                <Icon size={20} color={mod.color} />
                <span style={{ fontWeight: 800, fontSize: 16, color: mod.color }}>{mod.label}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, background: "rgba(245, 158, 11, 0.1)", color: "#F59E0B", padding: "4px 10px", borderRadius: 8, fontWeight: 700 }}>{modTasks.length} Açık Görev</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20 }}>
                {/* Bireysel İşlerim */}
                <div>
                  <h4 style={{ fontSize: 13, color: "#38BDF8", marginBottom: 12, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #334155", paddingBottom: 8 }}><User size={15} /> Bireysel İşlerim</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {bireyselTasks.length === 0 ? <div style={{ fontSize: 11, color: "#64748B", fontStyle: "italic", padding: 10, background: "#0F172A", borderRadius: 8 }}>Bu başlıkta bekleyen bireysel işiniz yok.</div> : bireyselTasks.map(t => (
                        <div key={t.id} style={{...styles.kanbanCard, cursor: "pointer"}} onClick={() => onOpenDetail(t)}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={styles.taskCodeBadge}>{t.kod}</span><span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B" }}>{t.durum.toUpperCase()}</span></div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>{t.baslik}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94A3B8" }}><span>Vade: {fmtDate(t.vade)}</span></div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Ekip İşleri */}
                <div>
                  <h4 style={{ fontSize: 13, color: "#F59E0B", marginBottom: 12, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #334155", paddingBottom: 8 }}><Users size={15} /> Ekip İşleri</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ekipTasks.length === 0 ? <div style={{ fontSize: 11, color: "#64748B", fontStyle: "italic", padding: 10, background: "#0F172A", borderRadius: 8 }}>Bu başlıkta bekleyen ekip işiniz yok.</div> : ekipTasks.map(t => (
                        <div key={t.id} style={{...styles.kanbanCard, cursor: "pointer"}} onClick={() => onOpenDetail(t)}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={styles.taskCodeBadge}>{t.kod}</span><span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B" }}>{t.durum.toUpperCase()}</span></div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>{t.baslik}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94A3B8" }}><span>Vade: {fmtDate(t.vade)}</span></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KanbanBoardView({ activeModule, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  
  const currentModObj = MODULES.find(m => m.id === activeModule) || MODULES[0];
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  // Görev Süzme İşlemi (Arama + Filtreleme)
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
          <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: 10, borderRadius: 12 }}><currentModObj.icon size={24} color={currentModObj.color} /></div>
          <div><h1 style={styles.viewTitle}>{currentModObj.label} Panosu</h1><p style={styles.viewSub}>Kanban akış yönetimi ve grup/görev takibi.</p></div>
        </div>
        {isAdminOrMod && <button style={styles.primaryActionBtn} onClick={() => setShowNewModal(true)}><Plus size={16} /> Yeni Görev Ekle</button>}
      </div>

      <div style={styles.filterToolbar}>
        <div style={styles.searchWrapper}>
          <Search size={15} color="#F59E0B" />
          <input style={styles.searchInput} placeholder="Görev veya Sorumlu Ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <select style={{ ...styles.selectInput, width: "auto" }} value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>
          <option value="all">Tüm Görevler</option>
          <option value="bireysel">👤 Bireysel Görevler</option>
          <option value="ekip">👥 Ekip Görevleri</option>
          <option value="yaklasan">⏳ Yaklaşanlar (Son 3 Gün)</option>
          <option value="geciken">🚨 Gecikenler</option>
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
                        {isLate && <AlertCircle size={14} color="#EF4444" title="Gecikmiş Görev" />}
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
      {showNewModal && <CreateTaskModal activeModule={activeModule} usersList={usersList} currentUser={currentUser} onClose={() => setShowNewModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function TodoListView({ todos, setTodos, currentUser }) {
  const [newTodoText, setNewTodoText] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [newSubtext, setNewSubtext] = useState("");
  const [newDevText, setNewDevText] = useState("");

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
  
  const handleAddSub = (todoId) => {
    if (!newSubtext.trim()) return;
    setTodos(todos.map(t => t.id !== todoId ? t : { ...t, subtasks: [...(t.subtasks || []), { id: uid(), text: newSubtext.trim(), done: false }] }));
    setNewSubtext("");
  };
  const handleToggleSub = (todoId, subId) => setTodos(todos.map(t => t.id !== todoId ? t : { ...t, subtasks: (t.subtasks || []).map(s => s.id === subId ? { ...s, done: !s.done } : s) }));
  const handleDeleteSub = (todoId, subId) => setTodos(todos.map(t => t.id !== todoId ? t : { ...t, subtasks: (t.subtasks || []).filter(s => s.id !== subId) }));
  const handleAddDev = (todoId) => {
    if (!newDevText.trim()) return;
    setTodos(todos.map(t => t.id !== todoId ? t : { ...t, developments: [...(t.developments || []), { id: uid(), date: todayStr(), text: newDevText.trim() }] }));
    setNewDevText("");
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Kişisel Yapılacaklar (To-Do List)</h1><p style={styles.viewSub}>Görev başlıklarına tıklayarak notlar ve alt adımlar (checklist) ekleyebilirsiniz.</p></div>
      </div>

      <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <form onSubmit={handleAddTodo} style={{ display: "flex", gap: 10 }}>
          <input style={{ ...styles.mainInput, flex: 3 }} placeholder="Yeni yapılacak iş veya not..." value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
          <select style={{ ...styles.selectInput, flex: 1 }} value={priority} onChange={(e) => setPriority(e.target.value)}><option value="Normal">Normal</option><option value="Yüksek">Yüksek ⚡</option><option value="Kritik">Kritik 🔥</option></select>
          <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Ekle</button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          {myTodos.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748B", padding: 30, fontSize: 13 }}>Henüz kişisel yapılacak işiniz bulunmuyor.</div>
          ) : (
            myTodos.map(t => {
              const isSelected = selectedTodoId === t.id;
              const subLen = (t.subtasks || []).length;
              const subDone = (t.subtasks || []).filter(s => s.done).length;
              const progress = subLen > 0 ? Math.round((subDone / subLen) * 100) : (t.done ? 100 : 0);

              return (
                <div key={t.id} style={{ background: isSelected ? "#0F172A" : "#161E2E", borderRadius: 10, border: isSelected ? "1px solid #F59E0B" : "1px solid #334155", overflow: "hidden", transition: "all 0.2s" }}>
                  
                  {/* Başlık Satırı */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer" }} onClick={() => setSelectedTodoId(isSelected ? null : t.id)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      <div onClick={(e) => { e.stopPropagation(); handleToggle(t.id); }}>{t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}</div>
                      <div style={{ flex: 1 }}>
                        <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 14, fontWeight: 600 }}>{t.text}</span>
                        {subLen > 0 && (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                            <div style={{ width: 100, height: 4, background: "#334155", borderRadius: 2 }}><div style={{ width: `${progress}%`, height: "100%", background: progress === 100 ? "#10B981" : "#F59E0B", borderRadius: 2 }} /></div>
                            <span style={{ fontSize: 10, color: "#94A3B8" }}>%{progress} İlerleme</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {t.priority !== "Normal" && <span style={{ fontSize: 10, color: t.priority==="Kritik" ? "#EF4444" : "#F59E0B", fontWeight: 700 }}>{t.priority}</span>}
                      {isSelected ? <ChevronDown size={18} color="#94A3B8" /> : <ChevronRight size={18} color="#94A3B8" />}
                    </div>
                  </div>

                  {/* Accordion İçerik Alanı */}
                  {isSelected && (
                    <div style={{ padding: "16px", borderTop: "1px solid #334155", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#1E293B" }}>
                      
                      {/* Alt Adımlar */}
                      <div>
                        <label style={styles.inputLabel}>Alt Adımlar (Checklist)</label>
                        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                          <input style={styles.mainInput} placeholder="Alt adım..." value={newSubtext} onChange={(e) => setNewSubtext(e.target.value)} />
                          <button style={styles.addInlineBtn} onClick={() => handleAddSub(t.id)}>Ekle</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {(t.subtasks || []).map(s => (
                            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0F172A", padding: "8px 12px", borderRadius: 6, fontSize: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => handleToggleSub(t.id, s.id)}>
                                {s.done ? <CheckSquare size={14} color="#10B981" /> : <Square size={14} color="#6B7280" />}
                                <span style={{ textDecoration: s.done ? "line-through" : "none", color: s.done ? "#64748B" : "#F8FAFC" }}>{s.text}</span>
                              </div>
                              <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => handleDeleteSub(t.id, s.id)} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notlar & Gelişmeler */}
                      <div>
                        <label style={styles.inputLabel}>Notlar & Gelişmeler</label>
                        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                          <input style={styles.mainInput} placeholder="Not yazın..." value={newDevText} onChange={(e) => setNewDevText(e.target.value)} />
                          <button style={styles.addInlineBtn} onClick={() => handleAddDev(t.id)}>Ekle</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {(t.developments || []).map(d => (
                            <div key={d.id} style={{ background: "#0F172A", padding: "8px 12px", borderRadius: 6, fontSize: 11, borderLeft: "3px solid #38BDF8" }}>
                              <div style={{ color: "#38BDF8", fontWeight: 700, marginBottom: 2 }}>{fmtDate(d.date)}</div>
                              <div>{d.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2", textAlign: "right", marginTop: 8, paddingTop: 12, borderTop: "1px dashed #334155" }}>
                        <button style={styles.deleteDangerBtn} onClick={() => { if(window.confirm("Görevi tamamen silmek istiyor musunuz?")) handleDelete(t.id); }}>Görevi Sil</button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function DetailedReportView({ tasks, usersList }) {
  const [filterModule, setFilterModule] = useState("all");
  const [filterSorumlu, setFilterSorumlu] = useState("all");
  const [filterDurum, setFilterDurum] = useState("all");

  const filtered = tasks.filter(t => {
    if (filterModule !== "all" && t.module !== filterModule) return false;
    if (filterSorumlu !== "all" && t.sorumlu !== filterSorumlu && !(t.ekipUyeleri && t.ekipUyeleri.includes(filterSorumlu))) return false;
    if (filterDurum !== "all" && t.durum !== filterDurum) return false;
    return true;
  });

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Detaylı Operasyonel Rapor</h1><p style={styles.viewSub}>Tüm görevlerin ve aksiyonların ayrıntılı dökümü, filtreleme ve analiz ekranı.</p></div>
        <button style={styles.printBtn} onClick={() => window.print()}><Printer size={15} /> Raporu Yazdır</button>
      </div>

      <div style={{ display: "flex", gap: 12, background: "#1E293B", padding: 14, borderRadius: 12, border: "1px solid #334155", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px" }}><label style={styles.inputLabel}>Modüle Göre</label><select style={styles.selectInput} value={filterModule} onChange={(e) => setFilterModule(e.target.value)}><option value="all">Tüm Modüller</option>{MODULES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select></div>
        <div style={{ flex: 1, minWidth: "200px" }}><label style={styles.inputLabel}>Sorumluya Göre</label><select style={styles.selectInput} value={filterSorumlu} onChange={(e) => setFilterSorumlu(e.target.value)}><option value="all">Tüm Personeller</option>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select></div>
        <div style={{ flex: 1, minWidth: "200px" }}><label style={styles.inputLabel}>Duruma Göre</label><select style={styles.selectInput} value={filterDurum} onChange={(e) => setFilterDurum(e.target.value)}><option value="all">Tüm Durumlar</option>{KANBAN_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
      </div>

      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Tür</th><th style={styles.th}>Modül</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Açılış</th><th style={styles.th}>Termin</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={8} style={{ textAlign: "center", padding: 30, color: "#64748B" }}>Kriterlere uygun kayıt bulunamadı.</td></tr> : filtered.map(t => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}><span style={styles.taskCodeBadge}>{t.kod}</span></td><td style={styles.tdTitle}>{t.baslik}</td>
                <td style={styles.td}>{t.gorevTipi === "ekip" ? "👥 Ekip" : "👤 Bireysel"}</td><td style={styles.td}>{t.module}</td>
                <td style={styles.td}>{t.sorumlu} {t.ekipUyeleri?.length > 0 && `(+${t.ekipUyeleri.length})`}</td><td style={styles.td}>{fmtDate(t.acilisTarihi)}</td>
                <td style={styles.td}>{fmtDate(t.vade)}</td><td style={styles.td}><span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "rgba(245, 158, 11, 0.2)", color: "#F59E0B" }}>{t.durum}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, onSaveUser, onDeleteUser, onApproveUser }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const pendingUsers = usersList.filter(u => u.status === "pending");
  const approvedUsers = usersList.filter(u => u.status === "approved" || !u.status);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Yetki & Üyelik Onay Matrisi</h1></div>
        <button style={styles.primaryActionBtn} onClick={() => { setEditingUser(null); setShowUserModal(true); }}><UserPlus size={16} /> Kullanıcı Ekle</button>
      </div>

      {pendingUsers.length > 0 && (
        <div style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid #F59E0B", borderRadius: 14, padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>⏳ Onay Bekleyen Üyelik Talepleri ({pendingUsers.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pendingUsers.map(u => (
              <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0F172A", padding: "10px 14px", borderRadius: 8, border: "1px solid #334155" }}>
                <div><div style={{ fontWeight: 700, fontSize: 13, color: "#F8FAFC" }}>{u.name} (@{u.username})</div><div style={{ fontSize: 10, color: "#94A3B8" }}>Kayıt Tipi: Standart Üye</div></div>
                <div style={{ display: "flex", gap: 8 }}><button style={styles.primaryActionBtn} onClick={() => onApproveUser(u.id)}><Check size={14} /> Onayla</button><button style={styles.deleteDangerBtn} onClick={() => onDeleteUser(u.id)}>Reddet</button></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#F59E0B" }}>Aktif Sistem Kullanıcıları</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı Soyadı</th><th style={styles.th}>Kullanıcı ID</th><th style={styles.th}>Rolü</th><th style={styles.th}>Durum</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>
            {approvedUsers.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.tdTitle}>{u.name}</td><td style={styles.td}>{u.username}</td><td style={styles.td}>{u.role}</td>
                <td style={styles.td}><span style={{ color: "#10B981", fontWeight: 700, fontSize: 11 }}>Aktif / Onaylı</span></td>
                <td style={styles.td}><div style={{ display: "flex", gap: 8 }}><button style={styles.editIconBtn} onClick={() => { setEditingUser(u); setShowUserModal(true); }}>Düzenle</button><button style={styles.deleteDangerBtn} onClick={() => { if(window.confirm("Silmek istediğinize emin misiniz?")) onDeleteUser(u.id); }}>Sil</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUserModal && <UserModal userToEdit={editingUser} onClose={() => setShowUserModal(false)} onSave={onSaveUser} />}
    </div>
  );
}

function UserModal({ userToEdit, onClose, onSave }) {
  const [name, setName] = useState(userToEdit ? userToEdit.name : "");
  const [username, setUsername] = useState(userToEdit ? userToEdit.username : "");
  const [password, setPassword] = useState(userToEdit ? userToEdit.password : "0000");
  const [role, setRole] = useState(userToEdit ? userToEdit.role : "user");
  const [permissions, setPermissions] = useState(userToEdit ? userToEdit.permissions || [] : MODULES.map(m=>m.id));

  const handleTogglePermission = (modId) => permissions.includes(modId) ? setPermissions(permissions.filter(p => p !== modId)) : setPermissions([...permissions, modId]);

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 500 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Kullanıcı Tanımla</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <form onSubmit={e => { e.preventDefault(); onSave({ id: userToEdit ? userToEdit.id : uid(), name, username, password, role, status: "approved", permissions }); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Adı Soyadı</label><input style={styles.mainInput} value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Kullanıcı ID</label><input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Şifre (Varsayılan 0000)</label><input type="password" style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} required /></div>
          <div><label style={styles.inputLabel}>Rol</label><select style={styles.selectInput} value={role} onChange={e => setRole(e.target.value)}><option value="user">Kullanıcı</option><option value="moderator">Moderatör</option><option value="admin">Admin</option></select></div>
          <div>
            <label style={styles.inputLabel}>Modül Yetkileri</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "#0F172A", padding: 12, borderRadius: 8, border: "1px solid #334155" }}>
              {MODULES.map(m => (
                <label key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#F8FAFC", cursor: "pointer" }}>
                  <input type="checkbox" checked={permissions.includes(m.id)} onChange={() => handleTogglePermission(m.id)} />{m.label}
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

function CreateTaskModal({ activeModule, usersList, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || usersList[0]?.name || "");
  const [vade, setVade] = useState(todayStr());
  const [module, setModule] = useState(activeModule);
  const [gorevTipi, setGorevTipi] = useState("bireysel");
  const [ekipUyeleri, setEkipUyeleri] = useState([]);

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 520 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Görev Oluştur</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Görev başlığı yazın..." /></div>
          <div><label style={styles.inputLabel}>İlgili Modül</label><select style={styles.selectInput} value={module} onChange={e => setModule(e.target.value)}>{MODULES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={styles.inputLabel}>Görev Tipi</label><select style={styles.selectInput} value={gorevTipi} onChange={e => setGorevTipi(e.target.value)}><option value="bireysel">👤 Bireysel Görev</option><option value="ekip">👥 Ekip Görevi</option></select></div>
            <div><label style={styles.inputLabel}>Sorumlu (Lider)</label><select style={styles.selectInput} value={sorumlu} onChange={e => setSorumlu(e.target.value)}>{usersList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}</select></div>
          </div>
          {gorevTipi === "ekip" && (
            <div style={{ background: "#0F172A", padding: 12, borderRadius: 10, border: "1px solid #334155" }}>
              <label style={{ ...styles.inputLabel, color: "#38BDF8", marginBottom: 8 }}>👥 Ekip Üyelerini Seçin</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxHeight: 130, overflowY: "auto" }}>
                {usersList.map(u => (
                  <label key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, cursor: "pointer", background: "#1E293B", padding: "6px 8px", borderRadius: 6 }}>
                    <input type="checkbox" checked={ekipUyeleri.includes(u.name)} onChange={() => ekipUyeleri.includes(u.name) ? setEkipUyeleri(ekipUyeleri.filter(e => e !== u.name)) : setEkipUyeleri([...ekipUyeleri, u.name])} />
                    <span>{u.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module, gorevTipi, ekipUyeleri }); onClose(); }}>Görevi Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, onClose, onAddSubtask, onToggleSubtask, onMoveStage, onDeleteTask, usersList }) {
  const [newSubtext, setNewSubtext] = useState("");
  const isAdminOrMod = currentUser.role === "admin" || currentUser.role === "moderator";

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={styles.drawerBody}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><h2 style={{ fontSize: 18, fontWeight: 800 }}>{task.baslik}</h2>{task.gorevTipi === "ekip" && <span style={{ fontSize: 10, background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>👥 Ekip Görevi</span>}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "#0F172A", padding: 12, borderRadius: 10 }}>
            <div><label style={styles.inputLabel}>Sorumlu</label><div>{task.sorumlu}</div></div>
            <div><label style={styles.inputLabel}>Aşama</label><select style={styles.selectInput} value={task.durum} onChange={e => onMoveStage(task.id, e.target.value)}>{KANBAN_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
          </div>
          {task.gorevTipi === "ekip" && task.ekipUyeleri?.length > 0 && <div style={{ background: "#0F172A", padding: 10, borderRadius: 8, fontSize: 12 }}><strong style={{ color: "#38BDF8" }}>Ekip Üyeleri:</strong> {task.ekipUyeleri.join(", ")}</div>}
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
        <div style={styles.drawerFooter}>{isAdminOrMod ? <button style={styles.deleteDangerBtn} onClick={() => onDeleteTask(task.id)}>Görevi Sil</button> : <div />}<button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
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
          <div style={{ marginTop: 8, background: "rgba(245, 158, 11, 0.1)", padding: "6px 10px", borderRadius: 8, fontSize: 11, color: "#F59E0B" }}>🔑 İlk Giriş Şifresi: <b>0000</b></div>
        </div>
        {error && <div style={styles.errorBar}>{error}</div>}
        <form onSubmit={e => { e.preventDefault(); onLogin(username, password); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={styles.inputLabel}>Kullanıcı Adı</label><input style={styles.mainInput} value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required /></div>
          <div><label style={styles.inputLabel}>Şifre</label><input type="password" style={styles.mainInput} value={password} onChange={e => setPassword(e.target.value)} placeholder="0000" required /></div>
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
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>İç Yazışmalar</h1><p style={styles.viewSub}>Sistem içi genel mesajlaşma modülü.</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, height: "62vh" }}>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 12, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", padding: "4px 8px" }}>AKTİF KANALLAR</div>
          {chats.map(c => {
            const isActive = c.id === activeChatId;
            return (
              <div key={c.id} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", background: isActive ? "rgba(245, 158, 11, 0.15)" : "#0F172A", border: isActive ? "1px solid #F59E0B" : "1px solid #334155" }} onClick={() => setActiveChatId(c.id)}>
                <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? "#F59E0B" : "#F8FAFC" }}>{c.title}</div>
                <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{c.messages.length} mesaj</div>
              </div>
            );
          })}
        </div>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: "1px solid #334155", paddingBottom: 10, marginBottom: 12 }}><h3 style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>{activeChat?.title}</h3></div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 8 }}>
            {activeChat?.messages.map(msg => {
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
            <input style={styles.mainInput} placeholder="Mesajınızı yazın..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button type="submit" style={styles.primaryActionBtn}><Send size={16} /> Gönder</button>
          </form>
        </div>
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
  userAvatarSm: { width: 28, height: 28, borderRadius: "50%", background: "#F59E0B", color: "#0F172A", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
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
  periodBtn: { background: "transparent", border: "none", color: "#94A3B8", padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" },
  periodBtnActive: { background: "#F59E0B", color: "#0F172A" },
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
  textareaInput: { width: "100%", background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#F8FAFC", fontSize: 12, outline: "none" },
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