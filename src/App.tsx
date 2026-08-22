// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from "react";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
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
  { id: "asakai", label: "Asakai Toplantısı" },
  { id: "iyilestirme", label: "İyileştirme Toplantısı" },
  { id: "kalite_guvence", label: "Kalite Güvence" },
  { id: "kalite_kontrol", label: "Kalite Kontrol" },
  { id: "tedarik_kalite", label: "Tedarik Kalite" }
];

// İkon ve renk, modül id'sine göre burada sabit tutulur (Firestore'a
// fonksiyon/component kaydedilemez). Değiştirilebilen tek şey "label"
// (başlık metni) — o, INITIAL_MODULES'ten gelip Firestore'da saklanır.
const MODULE_META = {
  asakai: { icon: Zap, color: "#F59E0B" },
  iyilestirme: { icon: RefreshCw, color: "#38BDF8" },
  kalite_guvence: { icon: ShieldCheck, color: "#10B981" },
  kalite_kontrol: { icon: CheckSquare, color: "#A855F7" },
  tedarik_kalite: { icon: Truck, color: "#EC4899" }
};

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

// Demo/örnek veri kasıtlı olarak boş bırakıldı — sistem gerçek kullanım
// için sıfırdan başlıyor. Yeni bir üye giriş yaptığında da görev/to-do
// listesi boş gelir, sadece kendi eklediklerini görür.
const INITIAL_TASKS = [];

const INITIAL_TODOS = [];

const INITIAL_CHATS = [
  { id: "chat-genel", type: "general", title: "Genel Ekip Sohbeti", participants: [], messages: [] }
];

// Kullanıcının yüklediği gerçek "Gün Sonu Kalite Kontrol ve Araç Durum
// Raporu" (22 Ağustos 2026) buraya işlendi — Raporlar modülünün ilk
// gerçek kaydı. Yeni raporlar buna eklenecek, bu silinip
// değiştirilebilir.
const INITIAL_REPORTS = [
  {
    id: "rpt-2026-08-22",
    tarih: "2026-08-22",
    hazirlayan: "Kalite Güvence Yönetimi (K-QN)",
    bolum: "Şube & Depo Takip",
    subeHattan: [
      { id: uid(), no: "141", renk: "-", detay: "Lifte alındı.", durum: "Liftte / İşlemde" },
      { id: uid(), no: "146", renk: "Yeşil", detay: "Açık maddeler tamamlandı, vakum pompası sorunu giderildi. Sadece sürüş testi kaldı.", durum: "Sürüş Bekliyor" },
      { id: uid(), no: "148", renk: "-", detay: "Şarj testi OK. Sürüş testi yapılacak, görsel kusurlar gideriliyor.", durum: "Sürüş Bekliyor" },
      { id: uid(), no: "150", renk: "-", detay: "Şarj testine girdi.", durum: "Şarj Testinde" }
    ],
    depodaki: [
      { id: uid(), no: "144", testAkis: "Sızdırmazlık OK ➔ EE OK", detay: "Bagaj iç sağ üst plastik deforme (derin çizik). Arka bagaj logo takıldı. EE testi yapıldı, final kontrol yapılacak.", asama: "Final Kontrol Bekliyor" },
      { id: uid(), no: "135", testAkis: "Sürüş OK ➔ Sızdırmazlık OK", detay: "Ön logo takıldı. Sızdırmazlık testi OK. EE testi bekleniyor.", asama: "EE Testi Bekliyor" },
      { id: uid(), no: "136", testAkis: "Sürüş OK ➔ Sızdırmazlık OK", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", asama: "EE Testi Bekliyor" },
      { id: uid(), no: "137", testAkis: "Sürüş OK ➔ Sızdırmazlık OK", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", asama: "EE Testi Bekliyor" },
      { id: uid(), no: "138", testAkis: "Sürüş OK ➔ Sızdırmazlık NOK", detay: "Bagaj kilit su kaçağı devam ediyor. Sağ kapı üst iç tavan su kaçağı tespit edildi. Sealler işlemleri yapıldı, sızdırmazlık testi yapılacak.", asama: "Sızdırmazlık Bekliyor" },
      { id: uid(), no: "145", testAkis: "Sürüş OK ➔ Sızdırmazlık OK", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", asama: "EE Testi Bekliyor" },
      { id: uid(), no: "163", testAkis: "Sürüş OK ➔ Sızdırmazlık OK", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", asama: "EE Testi Bekliyor" }
    ],
    serbestBirakilan: [
      { id: uid(), no: "133", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "129", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "134", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "124", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "128", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "126", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "143", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "139", tarih: "2026-08-21", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "130", tarih: "2026-08-20", detay: "Tamir işlemleri tamamlandı, final kontrol edildi ve serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "131", tarih: "2026-08-20", detay: "Tamir işlemleri yapıldı, final yapıldı ve serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "118", tarih: "2026-08-20", detay: "Tamir işlemleri tamamlandı, serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "127", tarih: "2026-08-19", detay: "Tamir işlemleri tamamlandı, final kontrol yapıldı ve serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "132", tarih: "2026-08-19", detay: "Kapı kilit tamir edildi, final kontrol yapıldı ve serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "120", tarih: "2026-08-18", detay: "EMC test aracı olarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "122", tarih: "2026-08-18", detay: "Sızdırmazlık testi OK, tüm kontroller tamamlanarak serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "108", tarih: "2026-08-17", detay: "Ön sol çamurluk ve kapı ayarı tamir işlemleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "107", tarih: "2026-08-14", detay: "Harness düzeltildi, E/E & Final kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "121", tarih: "2026-08-14", detay: "Sızdırmazlık ve eksik parçalar tamamlandı, serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "123", tarih: "2026-08-14", detay: "Sızdırmazlık, E/E Check ve Final kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "125", tarih: "2026-08-14", detay: "Sızdırmazlık, trim ayarları, modül ve Final kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "110", tarih: "2026-08-12", detay: "Sızdırmazlık testi OK, final kontrol edildi, olumsuzluk yok.", durum: "Serbest (OK)" },
      { id: uid(), no: "117", tarih: "2026-08-12", detay: "Ön tampon ve cam açıklık işlemleri yapıldı, final kontrol OK.", durum: "Serbest (OK)" },
      { id: uid(), no: "119", tarih: "2026-08-12", detay: "Sızdırmazlık testi OK, final kontrol yapıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "106", tarih: "2026-08-11", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "116", tarih: "2026-08-11", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı. Depoya giriş/park yapıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "111", tarih: "2026-08-10", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "112", tarih: "2026-08-10", detay: "Sürüş, sızdırmazlık ve E/E Check kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "113", tarih: "2026-08-10", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "114", tarih: "2026-08-10", detay: "Radyatör değişimi, sızdırmazlık ve E/E Check tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "115", tarih: "2026-08-10", detay: "Sızdırmazlık, kaput montajı ve E/E Check kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "098", tarih: "2026-08-07", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "130", tarih: "2026-08-07", detay: "Şenol Bey tarafından şartlı onay verildi ve serbest bırakıldı.", durum: "Serbest (Şartlı OK)" },
      { id: uid(), no: "104", tarih: "2026-08-07", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", durum: "Serbest (OK)" },
      { id: uid(), no: "109", tarih: "2026-08-06", detay: "Fren körüğü kaynak kaçağı giderildi, EE Check tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "102 (eski 108)", tarih: "2026-08-07", detay: "Şenol Bey şartlı onay verildi ve serbest bırakıldı.", durum: "Serbest (Şartlı OK)" },
      { id: uid(), no: "103", tarih: "2026-08-04", detay: "Spoiler yapıştırma, sızdırmazlık ve EE Check kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "097", tarih: "2026-08-03", detay: "Sol ayna değişimi yapıldı. Ton farkı durumu onaylandı.", durum: "Serbest (Şartlı OK)" },
      { id: uid(), no: "091", tarih: "2026-08-01", detay: "Sızdırmazlık ve EE Check kontrolleri tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "096", tarih: "2026-08-01", detay: "Final yapıldı, EPS ayarı, silecek ses ve fıskiye ayarları tamamlandı.", durum: "Serbest (OK)" },
      { id: uid(), no: "095", tarih: "2026-08-01", detay: "Tüm kalite ve test kontrolleri tamamlandı, serbest bırakıldı.", durum: "Serbest (OK)" }
    ]
  }
];

const SHARED_DOC = doc(db, "app_data", "shared");

// Günün sözü — herkes aynı gün aynı sözü görsün diye yılın gününe göre
// deterministik seçiliyor (rastgele değil). Kalite/ekip/disiplin temalı,
// kısa ve öz.
const DAILY_QUOTES = [
  "Kalite, kimse bakmadığında da doğru işi yapmaktır.",
  "Küçük bir hatayı bugün bulmak, yarın büyük bir sorunu önler.",
  "İyi bir ekip, birbirinin açığını değil elini görür.",
  "Ölçmediğin şeyi yönetemezsin — bugün de not almayı unutma.",
  "Bir günü iyi planlamak, bir haftayı kurtarır.",
  "Sorunu gizlemek değil, kök nedenini bulmak çözer.",
  "En iyi kontrol, hatayı üretmeden önce yakalayandır.",
  "Bugün attığın küçük bir adım, yarının standardı olur.",
  "Sürdürülebilir kalite, sabırla kurulan bir alışkanlıktır.",
  "Doğru soru sormak, yarı çözümdür.",
  "Disiplin, motivasyon bittiğinde de işi bitirmektir.",
  "Bir ekip, en yavaş adımı kadar hızlı yürür — birlikte ilerleyin.",
  "Bugün iyi bir gün olacak, çünkü siz onu öyle yapacaksınız.",
  "Detaylara gösterdiğin özen, işinin imzasıdır.",
  "Zor günler, iyi alışkanlıkların sınandığı günlerdir."
];

const timeGreeting = () => {
  const h = new Date().getHours();
  if (h < 5) return "İyi geceler";
  if (h < 11) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
};

const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
};

export default function App() {
  // Bu beş liste artık ekibin TAMAMI arasında paylaşılıyor: hepsi tek bir
  // Firestore dokümanında (app_data/shared) tutuluyor ve onSnapshot ile
  // gerçek zamanlı senkronize ediliyor. Kim bir görev/mesaj eklerse,
  // uygulaması açık olan herkeste anında görünür.
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [notifications, setNotifications] = useState([]);
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [dataLoaded, setDataLoaded] = useState(false);
  const isRemoteUpdate = useRef(false);

  // currentUser / isLocked kasıtlı olarak localStorage'da kalıyor — bu,
  // paylaşımlı veri değil, sadece "bu tarayıcıda kim oturum açmış" bilgisi.
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

  // 1) Firestore'u dinle: doküman değiştiğinde (biri veri eklediğinde/
  //    değiştirdiğinde, ya da başka bir cihazdan giriş yapıldığında) yerel
  //    state'i güncelle. Doküman hiç yoksa (ilk kurulum) başlangıç
  //    verisiyle oluştur. Doküman VARSA ama bazı alanlar eksikse (örn.
  //    "reports" yeni eklendi), o alanları tamamlayıp geri yazar.
  useEffect(() => {
    const unsub = onSnapshot(
      SHARED_DOC,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          isRemoteUpdate.current = true;
          const nextModules = d.modules || INITIAL_MODULES;
          const nextReports = d.reports || INITIAL_REPORTS;
          setUsersList(d.users || INITIAL_USERS);
          setTasks(d.tasks || INITIAL_TASKS);
          setTodos(d.todos || INITIAL_TODOS);
          setChats(d.chats || INITIAL_CHATS);
          setNotifications(d.notifications || []);
          setModules(nextModules);
          setReports(nextReports);
          const missing = {};
          if (!d.modules) missing.modules = nextModules;
          if (!d.reports) missing.reports = nextReports;
          if (Object.keys(missing).length > 0) setDoc(SHARED_DOC, missing, { merge: true }).catch(() => {});
        } else {
          setDoc(SHARED_DOC, { users: INITIAL_USERS, tasks: INITIAL_TASKS, todos: INITIAL_TODOS, chats: INITIAL_CHATS, notifications: [], modules: INITIAL_MODULES, reports: INITIAL_REPORTS }).catch(() => {});
        }
        setDataLoaded(true);
      },
      (err) => {
        setError("Veritabanına bağlanılamadı: " + err.message);
        setDataLoaded(true);
      }
    );
    return () => unsub();
  }, []);

  // 2) Yerel bir değişiklik (görev eklendi, durum değişti, mesaj gönderildi
  //    vb.) olduğunda Firestore'a yaz. isRemoteUpdate bayrağı, Firestore'dan
  //    az önce gelen veriyi tekrar Firestore'a yazıp gereksiz bir döngü
  //    oluşturmamızı engelliyor.
  useEffect(() => {
    if (!dataLoaded) return;
    if (isRemoteUpdate.current) { isRemoteUpdate.current = false; return; }
    setDoc(SHARED_DOC, { users: usersList, tasks, todos, chats, notifications, modules, reports }, { merge: true }).catch((e) => setError("Kaydedilemedi: " + e.message));
  }, [usersList, tasks, todos, chats, notifications, modules, reports, dataLoaded]);

  useEffect(() => {
    try {
      if (currentUser && !isLocked) localStorage.setItem("dva_current_user_v4", JSON.stringify(currentUser));
      else if (!currentUser) localStorage.removeItem("dva_current_user_v4");
    } catch(e) {}
  }, [currentUser, isLocked]);

  // Günün ilk girişinde bir kez gösterilecek karşılama ekranı. Hook
  // kurallarını bozmamak için erken return'lerden ÖNCE tanımlanmalı;
  // currentUser henüz yokken içeride kontrol ediyoruz.
  const [showDailyBriefing, setShowDailyBriefing] = useState(false);
  useEffect(() => {
    if (!dataLoaded || !currentUser || isLocked) return;
    const key = `dva_daily_seen_${currentUser.username}_${todayStr()}`;
    try {
      if (!localStorage.getItem(key)) {
        setShowDailyBriefing(true);
        localStorage.setItem(key, "1");
      }
    } catch (e) {}
  }, [dataLoaded, currentUser, isLocked]);

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

  const myOpenTasks = tasks.filter(t => t.sorumlu === currentUser.name && t.durum !== "tamam");
  const myOverdue = myOpenTasks.filter(t => t.vade && t.vade < todayStr());
  const myUpcoming = myOpenTasks.filter(t => t.vade && t.vade >= todayStr() && t.vade <= new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10));

  return (
    <div style={styles.appShell}>
      <header style={styles.header} className="no-print">
        <div style={styles.brand}>
          <div style={styles.logoIcon}><ShieldCheck size={24} color="#F59E0B" /></div>
          <div><div style={styles.brandName}>Dva • Kalite OS</div><div style={styles.brandSub}>Süreç & Yetki Yönetim Paneli</div></div>
        </div>

        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} color="#F59E0B" /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} color="#F59E0B" /><span>To-Do List</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "raporlar" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("raporlar")}><FileSpreadsheet size={15} color="#10B981" /><span>Raporlar</span></button>
          {modules.map((m) => {
            const Icon = MODULE_META[m.id]?.icon || ShieldCheck;
            const modColor = MODULE_META[m.id]?.color || "#94A3B8";
            const isActive = activeModule === m.id;
            return (
              <button key={m.id} style={{ ...styles.navTab, ...(isActive ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}>
                <Icon size={15} color={isActive ? "#F59E0B" : modColor} /><span>{m.label}</span>
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
          <DashboardView tasks={tasks} modules={modules} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "raporlar" ? (
          <ReportsView reports={reports} setReports={setReports} currentUser={currentUser} />
        ) : activeModule === "detayli_rapor" ? (
          <DetailedReportView tasks={tasks} usersList={usersList} modules={modules} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} setUsersList={setUsersList} modules={modules} setModules={setModules} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : (
          <KanbanBoardView activeModule={activeModule} modules={modules} tasks={tasks.filter((t) => t.module === activeModule)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser} onOpenDetail={setSelectedTask} onMoveStage={(id, st) => setTasks(tasks.map(t => t.id === id ? {...t, durum: st, bitisTarihi: st === "tamam" ? todayStr() : t.bitisTarihi} : t))} onCreateTask={(tData) => {
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
      {showDailyBriefing && <DailyBriefingModal currentUser={currentUser} overdue={myOverdue} upcoming={myUpcoming} onClose={() => setShowDailyBriefing(false)} />}
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
          className="no-print"
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
        <div className="no-print" style={{ position: "fixed", bottom: 20, right: 20, width: 360, height: 480, background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", zIndex: 1001, overflow: "hidden" }}>
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
  const [dueDate, setDueDate] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [subText, setSubText] = useState("");
  const [devText, setDevText] = useState("");

  const myTodos = todos.filter(t => t.user === currentUser.name);
  const activeTodo = myTodos.find(t => t.id === selectedId);
  const today = todayStr();

  const priorityColor = (p) => p === "Kritik" ? "#EF4444" : p === "Yüksek" ? "#F59E0B" : "#94A3B8";

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const item = { id: uid(), user: currentUser.name, text: newText.trim(), done: false, priority, dueDate: dueDate || "", subtasks: [], developments: [] };
    setTodos([item, ...todos]);
    setNewText("");
    setDueDate("");
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Kişisel Yapılacaklar (To-Do List)</h1><p style={styles.viewSub}>Notlarınızı, son tarihlerinizi ve ilerleme kayıtlarınızı buradan yönetin.</p></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedId ? "1.2fr 1fr" : "1fr", gap: 20 }}>
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <form onSubmit={handleAddTodo} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input style={{ ...styles.mainInput, flex: 3, minWidth: 160 }} placeholder="Yeni yapılacak iş..." value={newText} onChange={e => setNewText(e.target.value)} />
            <input type="date" style={{ ...styles.selectInput, flex: 1, minWidth: 130 }} value={dueDate} onChange={e => setDueDate(e.target.value)} title="Son tarih (opsiyonel)" />
            <select style={{ ...styles.selectInput, flex: 1, minWidth: 110 }} value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Yüksek">Yüksek ⚡</option>
              <option value="Kritik">Kritik 🔥</option>
            </select>
            <button type="submit" style={styles.primaryActionBtn}><Plus size={16} /> Ekle</button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 450, overflowY: "auto" }}>
            {myTodos.length === 0 ? <div style={{ color: "#64748B", textAlign: "center", padding: 30 }}>Henüz To-Do kaydınız yok.</div> : myTodos.map(t => {
              const isLate = t.dueDate && !t.done && t.dueDate < today;
              return (
                <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: selectedId === t.id ? "#334155" : "#0F172A", padding: "12px 16px", borderRadius: 10, border: isLate ? "1px solid #EF4444" : "1px solid #334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flex: 1, minWidth: 0 }} onClick={() => setTodos(todos.map(x => x.id === t.id ? {...x, done: !x.done} : x))}>
                    {t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}
                    <div style={{ minWidth: 0 }}>
                      <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{t.text}</span>
                      <div style={{ display: "flex", gap: 8, marginTop: 3, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: priorityColor(t.priority) }}>{t.priority}</span>
                        {t.dueDate && <span style={{ fontSize: 10, color: isLate ? "#EF4444" : "#94A3B8" }}>📅 {fmtDate(t.dueDate)}{isLate ? " (gecikti)" : ""}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button style={styles.editIconBtn} onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}>{selectedId === t.id ? "Kapat" : "Detay"}</button>
                    <button style={styles.deleteIconBtn} onClick={() => setTodos(todos.filter(x => x.id !== t.id))}><Trash2 size={14} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {activeTodo && (
          <div style={{ background: "#1E293B", border: "1px solid #F59E0B", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>To-Do Detayı</h3>
              <button style={styles.closeBtn} onClick={() => setSelectedId(null)}><X size={16} /></button>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={styles.inputLabel}>Son Tarih</label>
                <input type="date" style={styles.selectInput} value={activeTodo.dueDate || ""} onChange={e => setTodos(todos.map(t => t.id === activeTodo.id ? {...t, dueDate: e.target.value} : t))} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.inputLabel}>Öncelik</label>
                <select style={styles.selectInput} value={activeTodo.priority} onChange={e => setTodos(todos.map(t => t.id === activeTodo.id ? {...t, priority: e.target.value} : t))}>
                  <option value="Normal">Normal</option>
                  <option value="Yüksek">Yüksek ⚡</option>
                  <option value="Kritik">Kritik 🔥</option>
                </select>
              </div>
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

            <div style={{ background: "#0F172A", padding: 12, borderRadius: 10 }}>
              <label style={styles.inputLabel}>Gelişmeler (ilerleme notları)</label>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <input style={styles.mainInput} placeholder="Bir ilerleme notu yazın..." value={devText} onChange={e => setDevText(e.target.value)} />
                <button style={styles.addInlineBtn} onClick={() => {
                  if (!devText.trim()) return;
                  const entry = { id: uid(), text: devText.trim(), date: new Date().toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) };
                  setTodos(todos.map(t => t.id === activeTodo.id ? { ...t, developments: [entry, ...(t.developments || [])] } : t));
                  setDevText("");
                }}>Ekle</button>
              </div>
              {(activeTodo.developments || []).length === 0 && <div style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>Henüz gelişme notu yok.</div>}
              {(activeTodo.developments || []).map(d => (
                <div key={d.id} style={{ background: "#1E293B", padding: "8px 10px", borderRadius: 6, fontSize: 12, marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ flex: 1 }}>{d.text}</span>
                    <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer", flexShrink: 0, marginTop: 2 }} onClick={() => setTodos(todos.map(t => t.id === activeTodo.id ? {...t, developments: t.developments.filter(x => x.id !== d.id)} : t))} />
                  </div>
                  <div style={{ fontSize: 10, color: "#64748B", marginTop: 3 }}>{d.date}</div>
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
function DashboardView({ tasks, modules, currentUser, dashboardFilter, setDashboardFilter, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name);
  const filtered = myTasks.filter(t => dashboardFilter === "aktif" ? t.durum !== "tamam" : dashboardFilter === "tamamlanan" ? t.durum === "tamam" : true);
  const today = todayStr();
  const overdueCount = myTasks.filter(t => t.durum !== "tamam" && t.vade && t.vade < today).length;
  const teamActive = tasks.filter(t => t.durum !== "tamam").length;
  const teamDone = tasks.filter(t => t.durum === "tamam").length;

  return (
    <div style={styles.viewContainer} id="print-area">
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Dashboard</h1><p style={styles.viewSub}>Hoş geldiniz, {currentUser.name}. — {fmtDate(today)}</p></div>
        <button style={styles.printBtn} className="no-print" onClick={() => window.print()}><Printer size={15} /> Yazdır</button>
      </div>
      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8", cursor: "pointer" }} onClick={() => setDashboardFilter("all")}><div style={styles.dashCardTitle}>Toplam İşim</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B", cursor: "pointer" }} onClick={() => setDashboardFilter("aktif")}><div style={styles.dashCardTitle}>Aktif İşlerim</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum !== "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981", cursor: "pointer" }} onClick={() => setDashboardFilter("tamamlanan")}><div style={styles.dashCardTitle}>Tamamladığım</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Geciken İşlerim</div><div style={styles.dashCardValue}>{overdueCount}</div></div>
      </div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Ekip Geneli Durum</h3>
        <div style={{ display: "flex", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
          <div><div style={{ fontSize: 11, color: "#94A3B8" }}>Toplam İş</div><div style={{ fontSize: 20, fontWeight: 800 }}>{tasks.length}</div></div>
          <div><div style={{ fontSize: 11, color: "#94A3B8" }}>Aktif</div><div style={{ fontSize: 20, fontWeight: 800, color: "#F59E0B" }}>{teamActive}</div></div>
          <div><div style={{ fontSize: 11, color: "#94A3B8" }}>Tamamlanan</div><div style={{ fontSize: 20, fontWeight: 800, color: "#10B981" }}>{teamDone}</div></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {modules.map(m => {
            const modTasks = tasks.filter(t => t.module === m.id);
            const modDone = modTasks.filter(t => t.durum === "tamam").length;
            const pct = modTasks.length ? Math.round((modDone / modTasks.length) * 100) : 0;
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNavigateModule(m.id)}>
                <span style={{ fontSize: 12, width: 170, flexShrink: 0 }}>{m.label}</span>
                <div style={{ flex: 1, background: "#0F172A", borderRadius: 6, height: 8, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: MODULE_META[m.id]?.color || "#F59E0B" }} />
                </div>
                <span style={{ fontSize: 11, color: "#94A3B8", width: 90, textAlign: "right" }}>{modDone}/{modTasks.length} tamam</span>
              </div>
            );
          })}
        </div>
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

function KanbanBoardView({ activeModule, modules, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList }) {
  const [showModal, setShowModal] = useState(false);
  const currentModObj = modules.find(m => m.id === activeModule) || modules[0];
  const CurrentModIcon = MODULE_META[currentModObj.id]?.icon || ShieldCheck;
  const currentModColor = MODULE_META[currentModObj.id]?.color || "#94A3B8";
  const filtered = tasks.filter(t => t.baslik.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><CurrentModIcon size={24} color={currentModColor} /><h1 style={styles.viewTitle}>{currentModObj.label}</h1></div>
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
                {stageTasks.map(task => {
                  const isOverdue = task.durum !== "tamam" && task.vade && task.vade < todayStr();
                  return (
                    <div key={task.id} style={{ ...styles.kanbanCard, ...(isOverdue ? { borderColor: "#EF4444" } : {}) }} draggable onDragStart={e => e.dataTransfer.setData("text", task.id)}>
                      <div style={styles.cardHeaderRow}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.deleteIconBtn} onClick={() => onDeleteTask(task.id)}><Trash2 size={12} /></button></div>
                      <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(task)}>{task.baslik}</div>
                      <div style={styles.kanbanCardFooter}>
                        <span>👤 {task.sorumlu}</span>
                        <span style={isOverdue ? { color: "#EF4444", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 } : {}}>{isOverdue && <AlertTriangle size={11} />} 📅 {fmtDate(task.vade)}</span>
                      </div>
                    </div>
                  );
                })}
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

function ReportsView({ reports, setReports, currentUser }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const sorted = [...reports].sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
  const selected = reports.find(r => r.id === selectedId);

  const createReport = (form) => {
    const newReport = { id: uid(), tarih: form.tarih, hazirlayan: form.hazirlayan, bolum: form.bolum, subeHattan: [], depodaki: [], serbestBirakilan: [] };
    setReports([newReport, ...reports]);
    setSelectedId(newReport.id);
    setShowNew(false);
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const canDelete = (r) => currentUser.role === "admin" || r.hazirlayan === currentUser.name;

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Raporlar</h1><p style={styles.viewSub}>Araç durum raporları — herkes yeni rapor ekleyebilir.</p></div>
        <button style={styles.primaryActionBtn} onClick={() => setShowNew(true)}><Plus size={16} /> Yeni Rapor</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "300px 1fr" : "1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: selected ? "75vh" : "none", overflowY: selected ? "auto" : "visible" }}>
          {sorted.length === 0 && <div style={{ color: "#64748B", textAlign: "center", padding: 30 }}>Henüz rapor eklenmedi.</div>}
          {sorted.map(r => (
            <div key={r.id} style={{ background: selectedId === r.id ? "#334155" : "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: 14, cursor: "pointer" }} onClick={() => setSelectedId(r.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{fmtDate(r.tarih)}</span>
                {canDelete(r) && <Trash2 size={13} color="#EF4444" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }} />}
              </div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>{r.hazirlayan}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 11 }}>
                <span style={{ color: "#38BDF8" }}>{r.subeHattan.length} şube</span>
                <span style={{ color: "#F59E0B" }}>{r.depodaki.length} depoda</span>
                <span style={{ color: "#10B981" }}>{r.serbestBirakilan.length} serbest</span>
              </div>
            </div>
          ))}
        </div>

        {selected && <ReportDetail report={selected} onUpdate={(upd) => setReports(reports.map(r => r.id === upd.id ? upd : r))} onClose={() => setSelectedId(null)} />}
      </div>

      {showNew && <NewReportModal currentUser={currentUser} onClose={() => setShowNew(false)} onCreate={createReport} />}
    </div>
  );
}

function NewReportModal({ currentUser, onClose, onCreate }) {
  const [tarih, setTarih] = useState(todayStr());
  const [hazirlayan, setHazirlayan] = useState(currentUser.name);
  const [bolum, setBolum] = useState("Şube & Depo Takip");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <h2 style={styles.formTitle}>Yeni Rapor</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Tarih</label><input type="date" style={styles.selectInput} value={tarih} onChange={e => setTarih(e.target.value)} /></div>
          <div><label style={styles.inputLabel}>Hazırlayan</label><input style={styles.mainInput} value={hazirlayan} onChange={e => setHazirlayan(e.target.value)} /></div>
          <div><label style={styles.inputLabel}>Bölüm</label><input style={styles.mainInput} value={bolum} onChange={e => setBolum(e.target.value)} /></div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
            <button style={styles.primaryActionBtn} onClick={() => onCreate({ tarih, hazirlayan, bolum })}>Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportDetail({ report, onUpdate, onClose }) {
  const [subeForm, setSubeForm] = useState({ no: "", renk: "", detay: "", durum: "" });
  const [depoForm, setDepoForm] = useState({ no: "", testAkis: "", detay: "", asama: "" });
  const [serbestForm, setSerbestForm] = useState({ no: "", tarih: todayStr(), detay: "", durum: "Serbest (OK)" });

  const addRow = (key, form, setForm, resetTo) => {
    if (!form.no.trim()) return;
    onUpdate({ ...report, [key]: [...report[key], { id: uid(), ...form }] });
    setForm(resetTo);
  };
  const removeRow = (key, id) => onUpdate({ ...report, [key]: report[key].filter(r => r.id !== id) });

  return (
    <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20 }} id="print-area">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#F59E0B" }}>{fmtDate(report.tarih)} — {report.bolum}</h2>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Hazırlayan: {report.hazirlayan}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }} className="no-print">
          <button style={styles.printBtn} onClick={() => window.print()}><Printer size={14} /> Yazdır</button>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
      </div>

      <ReportSection title={`Şube / Hattan İnenler (${report.subeHattan.length})`} color="#38BDF8">
        {report.subeHattan.map(r => (
          <div key={r.id} style={styles.reportRow}>
            <span style={styles.reportRowNo}>#{r.no}</span>
            <span style={{ flex: 1 }}>{r.detay}</span>
            <span style={{ fontSize: 11, color: "#F59E0B", whiteSpace: "nowrap" }}>{r.durum}</span>
            <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} className="no-print" onClick={() => removeRow("subeHattan", r.id)} />
          </div>
        ))}
        <div style={styles.reportAddForm} className="no-print">
          <input style={{ ...styles.mainInput, maxWidth: 80 }} placeholder="Araç No" value={subeForm.no} onChange={e => setSubeForm(f => ({ ...f, no: e.target.value }))} />
          <input style={styles.mainInput} placeholder="Detay" value={subeForm.detay} onChange={e => setSubeForm(f => ({ ...f, detay: e.target.value }))} />
          <input style={{ ...styles.mainInput, maxWidth: 150 }} placeholder="Durum" value={subeForm.durum} onChange={e => setSubeForm(f => ({ ...f, durum: e.target.value }))} />
          <button style={styles.addInlineBtn} onClick={() => addRow("subeHattan", subeForm, setSubeForm, { no: "", renk: "", detay: "", durum: "" })}>Ekle</button>
        </div>
      </ReportSection>

      <ReportSection title={`Depodaki Araçlar (${report.depodaki.length})`} color="#F59E0B">
        {report.depodaki.map(r => (
          <div key={r.id} style={styles.reportRow}>
            <span style={styles.reportRowNo}>#{r.no}</span>
            <span style={{ fontSize: 11, color: "#94A3B8", whiteSpace: "nowrap" }}>{r.testAkis}</span>
            <span style={{ flex: 1 }}>{r.detay}</span>
            <span style={{ fontSize: 11, color: "#F59E0B", whiteSpace: "nowrap" }}>{r.asama}</span>
            <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} className="no-print" onClick={() => removeRow("depodaki", r.id)} />
          </div>
        ))}
        <div style={styles.reportAddForm} className="no-print">
          <input style={{ ...styles.mainInput, maxWidth: 80 }} placeholder="Araç No" value={depoForm.no} onChange={e => setDepoForm(f => ({ ...f, no: e.target.value }))} />
          <input style={{ ...styles.mainInput, maxWidth: 160 }} placeholder="Test Akışı" value={depoForm.testAkis} onChange={e => setDepoForm(f => ({ ...f, testAkis: e.target.value }))} />
          <input style={styles.mainInput} placeholder="Detay" value={depoForm.detay} onChange={e => setDepoForm(f => ({ ...f, detay: e.target.value }))} />
          <input style={{ ...styles.mainInput, maxWidth: 150 }} placeholder="Aşama" value={depoForm.asama} onChange={e => setDepoForm(f => ({ ...f, asama: e.target.value }))} />
          <button style={styles.addInlineBtn} onClick={() => addRow("depodaki", depoForm, setDepoForm, { no: "", testAkis: "", detay: "", asama: "" })}>Ekle</button>
        </div>
      </ReportSection>

      <ReportSection title={`Serbest Bırakılanlar (${report.serbestBirakilan.length})`} color="#10B981">
        {report.serbestBirakilan.map(r => (
          <div key={r.id} style={styles.reportRow}>
            <span style={styles.reportRowNo}>#{r.no}</span>
            <span style={{ fontSize: 11, color: "#94A3B8", whiteSpace: "nowrap" }}>{fmtDate(r.tarih)}</span>
            <span style={{ flex: 1 }}>{r.detay}</span>
            <span style={{ fontSize: 11, color: "#10B981", whiteSpace: "nowrap" }}>{r.durum}</span>
            <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} className="no-print" onClick={() => removeRow("serbestBirakilan", r.id)} />
          </div>
        ))}
        <div style={styles.reportAddForm} className="no-print">
          <input style={{ ...styles.mainInput, maxWidth: 80 }} placeholder="Araç No" value={serbestForm.no} onChange={e => setSerbestForm(f => ({ ...f, no: e.target.value }))} />
          <input type="date" style={{ ...styles.mainInput, maxWidth: 140 }} value={serbestForm.tarih} onChange={e => setSerbestForm(f => ({ ...f, tarih: e.target.value }))} />
          <input style={styles.mainInput} placeholder="Detay" value={serbestForm.detay} onChange={e => setSerbestForm(f => ({ ...f, detay: e.target.value }))} />
          <input style={{ ...styles.mainInput, maxWidth: 150 }} placeholder="Durum" value={serbestForm.durum} onChange={e => setSerbestForm(f => ({ ...f, durum: e.target.value }))} />
          <button style={styles.addInlineBtn} onClick={() => addRow("serbestBirakilan", serbestForm, setSerbestForm, { no: "", tarih: todayStr(), detay: "", durum: "Serbest (OK)" })}>Ekle</button>
        </div>
      </ReportSection>
    </div>
  );
}

function ReportSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 8, borderBottom: "1px solid #334155", paddingBottom: 6 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>
    </div>
  );
}

function DetailedReportView({ tasks, modules }) {
  const moduleLabel = (id) => modules.find(m => m.id === id)?.label || id;
  return (
    <div style={styles.viewContainer} id="print-area">
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Detaylı Rapor</h1><button style={styles.printBtn} className="no-print" onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>
      <div style={styles.yearEndTableCard}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Modül</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Öncelik</th><th style={styles.th}>Vade</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>{tasks.map(t => (<tr key={t.id} style={styles.tr}><td style={styles.td}>{t.kod}</td><td style={styles.tdTitle}>{t.baslik}</td><td style={styles.td}>{moduleLabel(t.module)}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.oncelik || "—"}</td><td style={styles.td}>{fmtDate(t.vade)}</td><td style={styles.td}>{KANBAN_STAGES.find(s => s.id === t.durum)?.label || t.durum}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, setUsersList, modules, setModules }) {
  const [showModal, setShowModal] = useState(false);
  const [editingModules, setEditingModules] = useState(() => Object.fromEntries(modules.map(m => [m.id, m.label])));

  const saveModuleLabel = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, label: (editingModules[id] || m.label).trim() || m.label } : m));
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Admin Paneli</h1><button style={styles.primaryActionBtn} onClick={() => setShowModal(true)}>Kullanıcı Ekle</button></div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Modül Başlıkları</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {modules.map(m => {
            const Icon = MODULE_META[m.id]?.icon || ShieldCheck;
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={16} color={MODULE_META[m.id]?.color || "#94A3B8"} />
                <input
                  style={{ ...styles.mainInput, flex: 1 }}
                  value={editingModules[m.id] ?? m.label}
                  onChange={(e) => setEditingModules(prev => ({ ...prev, [m.id]: e.target.value }))}
                  onBlur={() => saveModuleLabel(m.id)}
                  onKeyDown={(e) => { if (e.key === "Enter") { saveModuleLabel(m.id); e.currentTarget.blur(); } }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Üyelik Yönetimi</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>İşlem</th></tr></thead>
          <tbody>
            {usersList.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.tdTitle}>{u.name}</td>
                <td style={styles.td}>{u.username}</td>
                <td style={styles.td}>
                  <select style={{ ...styles.selectInput, padding: "4px 8px", fontSize: 11 }} value={u.role} onChange={(e) => setUsersList(usersList.map(x => x.id === u.id ? { ...x, role: e.target.value } : x))}>
                    <option value="user">Kullanıcı</option>
                    <option value="moderator">Moderatör</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={styles.editIconBtn} title="Şifreyi 0000 olarak sıfırlar, kullanıcı sonraki girişte yeni şifre belirler" onClick={() => { if (window.confirm(`${u.name} kullanıcısının şifresini sıfırlamak istediğinize emin misiniz?`)) setUsersList(usersList.map(x => x.id === u.id ? { ...x, password: "0000" } : x)); }}>Şifre Sıfırla</button>
                    <button style={styles.deleteDangerBtn} onClick={() => { if (window.confirm(`${u.name} kullanıcısını silmek istediğinize emin misiniz?`)) setUsersList(usersList.filter(x => x.id !== u.id)); }}>Sil</button>
                  </div>
                </td>
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

function DailyBriefingModal({ currentUser, overdue, upcoming, onClose }) {
  const quote = DAILY_QUOTES[dayOfYear() % DAILY_QUOTES.length];
  const greeting = timeGreeting();
  const todayLabel = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 28 }}>☀️</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#F59E0B", marginTop: 6 }}>{greeting}, {currentUser.name.split(" ")[0]}!</h2>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{todayLabel}</div>
        </div>

        <div style={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 10, padding: 14, margin: "16px 0", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontStyle: "italic", color: "#E2E8F0", lineHeight: 1.5 }}>"{quote}"</div>
        </div>

        {overdue.length > 0 && (
          <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid #EF4444", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#EF4444", fontWeight: 800, fontSize: 12, marginBottom: 6 }}>
              <AlertTriangle size={14} /> {overdue.length} işiniz gecikti
            </div>
            {overdue.slice(0, 4).map(t => (
              <div key={t.id} style={{ fontSize: 12, color: "#FCA5A5", padding: "2px 0" }}>• {t.baslik} <span style={{ color: "#94A3B8" }}>({fmtDate(t.vade)})</span></div>
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <div style={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#F59E0B", fontWeight: 800, fontSize: 12, marginBottom: 6 }}>
              <Clock size={14} /> Önümüzdeki 3 günde vadesi gelecek {upcoming.length} iş
            </div>
            {upcoming.slice(0, 4).map(t => (
              <div key={t.id} style={{ fontSize: 12, color: "#CBD5E1", padding: "2px 0" }}>• {t.baslik} <span style={{ color: "#94A3B8" }}>({fmtDate(t.vade)})</span></div>
            ))}
          </div>
        )}

        {overdue.length === 0 && upcoming.length === 0 && (
          <div style={{ textAlign: "center", color: "#94A3B8", fontSize: 12, marginBottom: 12 }}>Yaklaşan ya da geciken bir işiniz yok — pano temiz! 🎉</div>
        )}

        <button style={{ ...styles.primaryActionBtn, width: "100%" }} onClick={onClose}>Güne Başla</button>
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
  reportRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#0F172A", borderRadius: 6, fontSize: 12 },
  reportRowNo: { fontFamily: "monospace", fontWeight: 800, color: "#F59E0B", flexShrink: 0, width: 44 },
  reportAddForm: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
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