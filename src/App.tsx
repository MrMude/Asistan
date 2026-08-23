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
  { id: "tamam", label: "Tamamlandı", color: "#10B981" },
  { id: "iptal", label: "İptal Edildi", color: "#6B7280" }
];

// Araç Akış Takibi — kullanıcının tanımladığı gerçek üretim akışı.
// Bir araç ya Fabrika 1'de ya da Depo'da olur; her konumun kendi sabit
// aşama sırası vardır. Depo'da "Serbestlik" son aşamadır. Rework/tamir
// gerekiyorsa aracın "reworklar" listesine ayrı kayıt eklenir, ana akış
// aşamasını değiştirmeden.
const FABRIKA1_STAGES = ["Lift", "EOL", "Şarj Testi", "Sürüş Testi"];
const DEPO_STAGES = ["Sürüş Testi", "Sızdırmazlık Testi", "Final Kontrol", "Elektrik Kontrol", "Serbestlik"];
const KONUM_META = { fabrika1: { label: "Fabrika 1", color: "#38BDF8" }, depo: { label: "Depo", color: "#F59E0B" } };


// Örnek/demo kullanıcılar (Ahmet Yılmaz, Selin Yıldız) kaldırıldı. Sistem
// artık sadece admin hesabıyla başlıyor; gerçek ekip üyeleri Admin
// Panel > "Kullanıcı Ekle" ile eklenmeli.
const INITIAL_USERS = [
  { id: "usr-admin", username: "admin", password: "0000", name: "Muharrem DELİKTAŞ", role: "admin", status: "approved", canViewReports: true }
];

// Demo/örnek veri kasıtlı olarak boş bırakıldı — sistem gerçek kullanım
// için sıfırdan başlıyor. Yeni bir üye giriş yaptığında da görev/to-do
// listesi boş gelir, sadece kendi eklediklerini görür.
// Kullanıcının 'Kalite İş Takibi' Excel/ODS dosyasından aktarılan gerçek
// görev geçmişi — Kalite Güvence modülüne entegre edildi (82 kayıt).
const KIT_TASKS = [
  { id: "kit-1", module: "kalite_guvence", kod: "KIT-2026-001", baslik: "QC Etiketleri", sorumlu: "Atanmadı", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-01", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-1-st1", text: "01.06.2026 tarihinde sipariş verilecektir.", done: true }] },
  { id: "kit-2", module: "kalite_guvence", kod: "KIT-2026-002", baslik: "İstasyon Kontrol & Quality Gate oluşturulması", sorumlu: "Kahan YILMAZMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "2026-06-26", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-2-st1", text: "Kahan Beyde çalıştırma oluşturdu. İlk hafta kullanımı gözlemlenecektir.", done: true }, { id: "kit-2-st2", text: "Doğukanın oluşturduğu istasyon talimatları sisteme eklenecektir.( Eklendi )", done: true }, { id: "kit-2-st3", text: "Kontrol formları kontrol edilecektir ve işleme alınacaktır.", done: true }] },
  { id: "kit-3", module: "kalite_guvence", kod: "KIT-2026-003", baslik: "Kormetal ( Jant Tedarikçi Firması )", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-3-st1", text: "02.06.2026 tarihinde mail atılacaktır. Akış hakkında bilgi alınacaktır.", done: true }, { id: "kit-3-st2", text: "02.06.2026 Tarihinde hatırlatma maili atıldı.", done: true }, { id: "kit-3-st3", text: "Etiket konusu ve görsel kontrol kriterleri belirlendi.", done: true }] },
  { id: "kit-4", module: "kalite_guvence", kod: "KIT-2026-004", baslik: "Kompanent Test Masası", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "2026-06-26", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-4-st1", text: "Kompanent test masası balçığa gönderilecektir.", done: true }, { id: "kit-4-st2", text: "İdari işler grubuna yazalım ve kamyon gelince dürtelim", done: true }] },
  { id: "kit-5", module: "kalite_guvence", kod: "KIT-2026-005", baslik: "Boyahane süreci geliştirmesi", sorumlu: "Şenol ÖZCANLI", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-5-st1", text: "Şenol Bey'le kontrol kriterleri belirlenecektir.", done: true }, { id: "kit-5-st2", text: "Boyahaneye dair tüm dokümantasyonlar oluşturulmalı. Görselli talimatlar, vs.Şenol süreci ilerlettiğinde tekrar açılacaktır.", done: true }] },
  { id: "kit-6", module: "kalite_guvence", kod: "KIT-2026-006", baslik: "Aylin Hanım ( Yapıştırma Mühendisi )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-6-st1", text: "Uçak bileti alınacaktır. 08.06.2026 tekrar görüşülecektir.", done: true }] },
  { id: "kit-7", module: "kalite_guvence", kod: "KIT-2026-007", baslik: "Basf Eftec İle görüşülecektir.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-7-st1", text: "Yapıştırmalar hakkında bilgi alınacaktır. Saklama şartları vb.", done: true }, { id: "kit-7-st2", text: "Abdulsamet Bey'le görüşme sağlandı. Firma ziyareti organize edilecektir.", done: true }, { id: "kit-7-st3", text: "Astarlı test plakası numunesi hazırlanacaktır.", done: true }, { id: "kit-7-st4", text: "09.06.2026 tarihinde ziyarete gelecektir.", done: true }] },
  { id: "kit-8", module: "kalite_guvence", kod: "KIT-2026-008", baslik: "Kalite Güvence Geliştirmesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-27", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-8-st1", text: "23. Hafta araç kontrol formları sisteme eklenecektir. İlk çıkan araçların formları taranıp klasörü belirlenecektir.23. Hafta Kalite Kontrol24. Hafta Satınalma - Lojistik24. Hafta Planlama ve Depolama25. Hafta Üretim26. Hafta Satış - Pazarlama - Satış Sonrası Hizmetler27. Hafta Mühendislik", done: true }] },
  { id: "kit-9", module: "kalite_guvence", kod: "KIT-2026-009", baslik: "ERP İzinlerin Girişi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-01", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-9-st1", text: "İzinli personellerin izin girişleri yapılacaktır.", done: true }] },
  { id: "kit-10", module: "kalite_guvence", kod: "KIT-2026-010", baslik: "COP Evrakları Hk.", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "2026-06-26", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-10-st1", text: "Onur Bey'e yazıldı. Süreç ilerledikçe bilgi verilecektir.", done: true }, { id: "kit-10-st2", text: "Onur Bey inceleyip dönüş sağlayacak. Haftaya tekrar hatırlatılacaktır.COP Eğitimi planlanabilir.Aşağıda güncel konular açılmıştır. 07.07.2026", done: true }] },
  { id: "kit-11", module: "kalite_guvence", kod: "KIT-2026-011", baslik: "Asil Kataforez Ziyareti Hk.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-01", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-11-st1", text: "• Kataforez kaplama süreci ile ilgili ziyaret yapılacaktır.• Ziyaret gerçekleştirildi. Aksiyon uygulama maili gelecektir.", done: true }, { id: "kit-11-st2", text: "Üretim çıktıları beklenmektedir.", done: true }] },
  { id: "kit-12", module: "kalite_guvence", kod: "KIT-2026-012", baslik: "Boyahane, End Of Line, Balçık Depo Süreç Takibi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-01", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-12-st1", text: "Taslak oluşturuldu. Günlük mail atılacaktır.", done: true }, { id: "kit-12-st2", text: "02.06.2026 toplantısı yapıldıı, bu şekilde devam edecektir.", done: true }] },
  { id: "kit-13", module: "kalite_guvence", kod: "KIT-2026-013", baslik: "Gapster (SSH)", sorumlu: "Atanmadı", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-01", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-13-st1", text: "Servis süreçlerinin takibi için adım eklenecektir. Birçim ve satış sonrası ekibiyle görüşülecektir.", done: true }] },
  { id: "kit-14", module: "kalite_guvence", kod: "KIT-2026-014", baslik: "Uygunsuzluk Takibi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-01", vade: "", bitisTarihi: "2026-06-02", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-14-st1", text: "54 No'lu aracın sağ arka fren borusu ve fren hortumu birleşim yerinden hidrolik kaçağı tespit edildi. Şasi montajında ya tam değerlerde torklama işlemi yapılmadı ya da boruda deforme mevcut kontrol edilip bilgi verilecek.", done: true }, { id: "kit-14-st2", text: "Murat Bey'le görüşme sağlanmıştır.", done: true }] },
  { id: "kit-15", module: "kalite_guvence", kod: "KIT-2026-015", baslik: "Atık Kutusu", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-02", vade: "2026-06-26", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-15-st1", text: "https://teknikkonteyner.com.tr/urun/240-lt-pedalli-plastik-cop-konteyneri-40", done: true }, { id: "kit-15-st2", text: "2 Adet sipariş verilecektir.Burak Bey ve Ömer Bey'e mail atılmıştır. Burak Bey şubeye geldiğinde bakılacaktır. ( Chimerecten fiyat teklifi alındı dönüş beklenmektedir.)", done: true }] },
  { id: "kit-16", module: "kalite_guvence", kod: "KIT-2026-016", baslik: "Kimyasal ve Son Kullanım Tarihi Olan Ürünler", sorumlu: "Sennur Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-02", vade: "2026-06-26", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-16-st1", text: "Ürünlere ait liste oluşturulacaktır.", done: true }, { id: "kit-16-st2", text: "Sennur Hanım ve Ozan Bey'den liste istenmiştir.", done: true }, { id: "kit-16-st3", text: "Dolap siparişi için Ömer'e mail atıldı.", done: true }] },
  { id: "kit-17", module: "kalite_guvence", kod: "KIT-2026-017", baslik: "Sibop Montajı", sorumlu: "-", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-03", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-17-st1", text: "Kormetalden gelecek jantlarda sibop montajı ve testleri belirlenmelidir.", done: true }, { id: "kit-17-st2", text: "Aletlerin siparişi verilmiştir. Teslimatı beklenmektedir.", done: true }] },
  { id: "kit-18", module: "kalite_guvence", kod: "KIT-2026-018", baslik: "Şasi Kritik Bölge Formu", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-03", vade: "", bitisTarihi: "2026-06-10", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-18-st1", text: "Cemre Hanım'la görüşülerek form oluşturulacaktır.", done: true }, { id: "kit-18-st2", text: "Murat Bey formu oluşturdu sisteme eklenecektir.Form Hikmet Ustaya teslim edildi.", done: true }] },
  { id: "kit-19", module: "kalite_guvence", kod: "KIT-2026-019", baslik: "Cam Serigrafi Hatası", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-03", vade: "2026-06-26", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-19-st1", text: "Tedarikçiye mail atılmıştır.", done: true }, { id: "kit-19-st2", text: "Dönüş beklenmektedir.Dönüş gelmediği için iptal edilmiştir.", done: true }] },
  { id: "kit-20", module: "kalite_guvence", kod: "KIT-2026-020", baslik: "Müşteri Hata Bildirimi – Analiz Formu", sorumlu: "Emir KÜÇÜKMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-03", vade: "", bitisTarihi: "2026-06-04", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-20-st1", text: "N7V1K1SA1TK000043 hata analiz formu açıldı. Yasir Beylerle görüşüp doldurulacaktır.", done: true }, { id: "kit-20-st2", text: "Gökhan Bey formu doldurdu", done: true }] },
  { id: "kit-21", module: "kalite_guvence", kod: "KIT-2026-021", baslik: "Bounder Eğitimi Hk.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-03", vade: "", bitisTarihi: "2026-06-04", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-21-st1", text: "Kiwaya mail atıldı. Dönüş beklenmektedir.", done: true }, { id: "kit-21-st2", text: "Firma ziyareti gerçekleştirildi.", done: true }] },
  { id: "kit-22", module: "kalite_guvence", kod: "KIT-2026-022", baslik: "Kilit Testi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-04", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-22-st1", text: "Kapı Kilit Modülleri Test edilecektir.", done: true }, { id: "kit-22-st2", text: "Cihazda 4 adet test edildi. Cihaz kitlediği için kendini test edemiyoruz.", done: true }] },
  { id: "kit-23", module: "kalite_guvence", kod: "KIT-2026-023", baslik: "Yapıştırma Testi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-04", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-23-st1", text: "60 numaralı araçta cam maskelenerek yapıştırılmıştır. 7,5mm genişlik.61 numaralı araçta cam maskelenerek yapıştırılacaktır. 6 mm genişlik", done: true }, { id: "kit-23-st2", text: "Camlardan kaçırma gözlemlenmemiştir.", done: true }] },
  { id: "kit-24", module: "kalite_guvence", kod: "KIT-2026-024", baslik: "Ürün Ömür Testi", sorumlu: "Gökhan KONUK", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-05", vade: "", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-24-st1", text: "Ürünlerin ömür testi için fiyat teklifi alınacaktır.", done: true }, { id: "kit-24-st2", text: "Gökhan Bey teklif alacaktır.Cemre Hanım'a mail atıldı.", done: true }] },
  { id: "kit-25", module: "kalite_guvence", kod: "KIT-2026-025", baslik: "Yapıştırma Alanı", sorumlu: "Atanmadı", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-05", vade: "", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-25-st1", text: "Yapıştırma alanı yaratılması hakkında mail atılacaktır.", done: true }, { id: "kit-25-st2", text: "Ömer Bey'in ilettiği aksiyonlar öncelikli olarak yapılacaktır.", done: true }] },
  { id: "kit-26", module: "kalite_guvence", kod: "KIT-2026-026", baslik: "Mühendislik Değişiklik Yönetimi", sorumlu: "Doğukan TOKAYAdem YILMAZZOBU", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-05", vade: "", bitisTarihi: "2026-06-05", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-26-st1", text: "Süreç için form hazırlanacaktır.", done: true }, { id: "kit-26-st2", text: "Form mail atıldı.", done: true }] },
  { id: "kit-27", module: "kalite_guvence", kod: "KIT-2026-027", baslik: "Yapıştırma İyileştirmeleri", sorumlu: "Muharrem DELİKTAŞDoğukan TOKAYAdem YILMAZZOBU", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-27-st1", text: "Ömer Beyden gelen dönüş yandaki gibidir.", done: true }, { id: "kit-27-st2", text: "Plastik – Plastik yapışma yüzeylerine astar uygulamak ( Uygulama bugünden itibaren devreye alındı, yüzey gerilimleri kontrol edilmesi gerekecektir. )", done: true }, { id: "kit-27-st3", text: "Henkele ilgili parçalardan numune verip, yapışma testlerini gerçekleştirmesini sağlamak, ( Firma temsilcimizi öğrendikten sonra süreci orayla da devam ettirebiliriz ? )", done: true }, { id: "kit-27-st4", text: "Primerin kullanımdan önce çalkalanması operatörün insiyatifine bırakılıyor. Primer çalkalanmazsa büyük risk. Çalkalanmasını sağlayacak basit bir shaker alınması ( Murat Bey’le görüşüldü çalışmasını yürütüyor. )", done: true }, { id: "kit-27-st5", text: "Yapıştırma alanı çok pis. Alanın kapatılması öncesinde alandaki kimyasalların, atıkları, yapıştırma alanının temizlenmesini sağlamak ve operatörlerin düzenli çalışmasını sağlamak, 5S yapmak bence öncelikli,( Alan temizliği için Kahan Bey’le görüşüldü. Kimyasal atıkları için şu an firmamızda atık toplama yeri temin edemiyoruz, çözüm için bir yol bulmaya çalışacağız. )", done: true }, { id: "kit-27-st6", text: "Yüzey gerilimini ölçen sıvıların aralıklı olarak günlük operasyonda, operatörler tarafından tanımlı adetlerde uygulanmasını sağlamak. ( Astar çalışması için gerektiğinden devreye alınacaktır. )", done: true }, { id: "kit-27-st7", text: "Yapışma sonrası ilgili tutma kuvvetinin parçanın özellikle tutunmanın en zor olduğu kısımlarında (uçlarda) sağlandığından emin olmak ( Süreç içerisinde iyileştirme çalışmalarıyla raporlanarak ilerletilecektir. )", done: true }, { id: "kit-27-st8", text: "Yapıştırma fisktürlerinin ergonomisi ve yapışma yüzeylerini tutmasından emin olmak, ( Süreç içerisinde uzun gözlemler sonucu raporlanarak iletilecektir. )", done: true }] },
  { id: "kit-28", module: "kalite_guvence", kod: "KIT-2026-028", baslik: "Başkent Cam Çalışma Süreci", sorumlu: "Orkun ERDOĞAN", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-09", vade: "2026-06-30", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-28-st1", text: "Orkun Bey firma ile görüşme sağlayacaktır.", done: true }, { id: "kit-28-st2", text: "Mail adresleri ve telefonları iletildi.", done: true }, { id: "kit-28-st3", text: "19.06 teklif dönüş hedef tarihi.", done: true }, { id: "kit-28-st4", text: "22.06 Teklif karşılaştırma ve direction seçimi yapılması ( Telefon edildi süreç devam ediyor..)07.07.2026 güncel konu açılmıştır.", done: true }] },
  { id: "kit-29", module: "kalite_guvence", kod: "KIT-2026-029", baslik: "Basf Eftect Test Numunesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-08", vade: "2026-07-08", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-29-st1", text: "2 farklı astardan numune hazırlanarak Eftect firmasına gönderilecektir.", done: true }, { id: "kit-29-st2", text: "Test numuneleri teslim edilmiştir.Firmaya mail atılacaktır.Hatırlatma yapıldı.(20.07.2026)Test sonuçları gelmiştir.", done: true }] },
  { id: "kit-30", module: "kalite_guvence", kod: "KIT-2026-030", baslik: "Henkel Yapıştırıcı Çalışmaları", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-16", vade: "2026-06-26", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-30-st1", text: "Teroson PU 8590 ve Teroson PU 8599 test numunesi hazırlanarak tedarikçiye test için verilecektir.", done: true }, { id: "kit-30-st2", text: "Firma ziyareti beklenmektedir.18.06.2026 tarihinde gelecekler.Detaylar mail atıldı.", done: true }] },
  { id: "kit-31", module: "kalite_guvence", kod: "KIT-2026-031", baslik: "38 Numaralı Araç Tamiri", sorumlu: "Muharrem DELİKTAŞÜretim", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-10", vade: "", bitisTarihi: "2026-06-12", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-31-st1", text: "Aracın tavanının sökülmesi hakkında çalışma yapılacaktır.Cam sökümü yapılacaktır.", done: true }, { id: "kit-31-st2", text: "Ortalama yarım günde sökme işlemleri tamamlanmıştır. Aracın temizliği de ortalama yarım gün sürmektedir.", done: true }] },
  { id: "kit-32", module: "kalite_guvence", kod: "KIT-2026-032", baslik: "Kormetal Numune Üretimi", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-15", vade: "2026-06-19", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-32-st1", text: "1.Black2.Gunmetal Gray3.Gunmetal Diamond", done: true }, { id: "kit-32-st2", text: "3 araçlık 3 farklı renkte numune çalışılacaktır.19.06.2026 tarihinde jantlar geldi.Pazarlama ekibinden dönüş beklenmektedir.", done: true }] },
  { id: "kit-33", module: "kalite_guvence", kod: "KIT-2026-033", baslik: "Tavan Test Numunesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-15", vade: "2026-06-23", bitisTarihi: "2026-06-19", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-33-st1", text: "Yapıştırıcı ince çekilerek numune hazırlanmıştır.", done: true }, { id: "kit-33-st2", text: "Test için kürlenmesi beklenmektedir. ( Araç şasine test yazıldı, evlendirildiğinde bakılacaktır. )Bu aksiyon kapatıldı. \" Süreç Henkel Yapıştırma İyileştirmeleri \" içerisinde devam edecektir.", done: true }] },
  { id: "kit-34", module: "kalite_guvence", kod: "KIT-2026-034", baslik: "Bodylerin Taranması", sorumlu: "Hüseyin YILDIRIM", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-15", vade: "", bitisTarihi: "2026-06-16", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-34-st1", text: "Tarama firmasıyla Cemre Hanım görüşme sağladı.", done: true }, { id: "kit-34-st2", text: "Pazartesi - Salı günü firmanın gelmesi beklenmektedir.Raporlar incelenecektir.", done: true }] },
  { id: "kit-35", module: "kalite_guvence", kod: "KIT-2026-035", baslik: "Şahit Numune Bölgesi", sorumlu: "Şenol ÖZCANLI", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "2026-06-26", bitisTarihi: "2026-06-23", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-35-st1", text: "Plastik Enejksiyon tarafında raf olacaktır.", done: true }, { id: "kit-35-st2", text: "Süreci Şenol takip ediyor.Raf yaptırıldı, ürünler orada stoklanacaktır.", done: true }] },
  { id: "kit-36", module: "kalite_guvence", kod: "KIT-2026-036", baslik: "Boyahane ve EOL Takip - Raporlama", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-12", vade: "", bitisTarihi: "2026-06-12", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-36-st1", text: "Form yeniden düzenlenecektir.", done: true }, { id: "kit-36-st2", text: "Tamamlanmıştır.", done: true }] },
  { id: "kit-37", module: "kalite_guvence", kod: "KIT-2026-037", baslik: "Tavan İyileştirme Çalışması", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-15", vade: "", bitisTarihi: "2026-06-16", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-37-st1", text: "Klipsler iptal edilerek, yapıştırma işlemi yapılacaktır. Araç numaraları için liste oluşturuldu.Klipsler söküldü, süreç izlenecektir.", done: true }, { id: "kit-37-st2", text: "Mühendislik değişiklik formu oluşturuldu. Sisteme eklendi.", done: true }] },
  { id: "kit-38", module: "kalite_guvence", kod: "KIT-2026-038", baslik: "Araç Kontrol Dosyaları", sorumlu: "Hüseyin YILDIRIM", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-22", vade: "2026-06-26", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-38-st1", text: "Araç kontrol dosyaları Hüseyin'de onlar ay ay klasörlenerek arşivlenecektir.", done: true }, { id: "kit-38-st2", text: "Hüseyin dosyaları temize çekiyormuş. 22sinde ondan teslim alınarak işlemlere başlanacaktır.Dönüş alınamadı.", done: true }] },
  { id: "kit-39", module: "kalite_guvence", kod: "KIT-2026-039", baslik: "Final kontrol formu güncellenecektir.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-17", vade: "2026-06-17", bitisTarihi: "2026-06-17", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-39-st1", text: "Üzerinde çalışmalara başlanmıştır.", done: true }] },
  { id: "kit-40", module: "kalite_guvence", kod: "KIT-2026-040", baslik: "HENKEL Yapıştırma İyileştirme Çalışmaları", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-19", vade: "2026-07-01", bitisTarihi: "2026-08-31", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-40-st1", text: "• Cam - Metal• Tavan - Metal ( 26.06.2026 tarihinde uygulama yapıldı. )• Plastik - Plastik• Plastik - Cam", done: true }, { id: "kit-40-st2", text: "İlk başlangıç tavan metal ile olacaktır. Numune ürünler \" 19.06.2026 \" tarihinde teslim edilecektir.Numuneler test için teslim edildi. 25.06.2026 sonuçlar çıkacaktır.", done: true }] },
  { id: "kit-41", module: "kalite_guvence", kod: "KIT-2026-041", baslik: "Kapı Vidaları Hk.", sorumlu: "Doğukan TOKAYAdem YILMAZZOBA", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-23", vade: "2026-06-30", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-41-st1", text: "Kapı iç montajında kullanılan vidaların paslanmaz çelik veya galvaniz kaplı gibi korozyon direnci yüksek malzemelerle değiştirilmesi gerekmektedir.", done: true }, { id: "kit-41-st2", text: "Doğukan ve Adem'e mail atıldı.", done: true }, { id: "kit-41-st3", text: "Tekrar sorulacaktır ( 02.07.2026 )", done: true }] },
  { id: "kit-42", module: "kalite_guvence", kod: "KIT-2026-042", baslik: "Su Testi Kabini", sorumlu: "Alp ERGENÇMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-23", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-42-st1", text: "Alp hocayla birlikte su testi kabini incelenecektir.", done: true }, { id: "kit-42-st2", text: "Test kabini şubeye alınacaktır, burada yeniden kurulum sürecinde bakılacaktır.", done: true }] },
  { id: "kit-43", module: "kalite_guvence", kod: "KIT-2026-043", baslik: "Fren Servosu ve Bıw Birleşimi", sorumlu: "Muharrem DELİKTAŞHikmet ŞAHİN", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-23", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-43-st1", text: "Servonun bodyle birleştiği yerdeki contalar ve fren pedalının üstündeki conta kontrol edilecektir.", done: true }, { id: "kit-43-st2", text: "Kontroller sağlandı, operatörler süreci doğru uygulamaktadır.", done: true }] },
  { id: "kit-44", module: "kalite_guvence", kod: "KIT-2026-044", baslik: "Sentil Ölçümleri Hk.", sorumlu: "Hüseyin YILDIRIM", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-06-26", vade: "", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-44-st1", text: "Sentil çakısı ile araçlar final kontrolde ölçülecek ve tolerans değerleri belirlenecektir.", done: true }, { id: "kit-44-st2", text: "Süreçle ilgili veri gelmedi.", done: true }] },
  { id: "kit-45", module: "kalite_guvence", kod: "KIT-2026-045", baslik: "Henkel Test İlerlemesi Hk.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-02", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-45-st1", text: "Taha Bey'le görüşme sağlanacaktır. • Yaşlandırma testleri yapılabilir mi ?• Tavan sökme / yapıştırma süreci ne zaman yapılacaktır ?", done: true }, { id: "kit-45-st2", text: "Test için Taha Bey teklif alıp dönecektir.20.07.2026 - 31.07.2026 tarihleri arasında hem tavan sökülecektir hemde yeni ürünler test edilecektir.Tavan sökme sürecine başlanmıştır. ( 22.07.2026 )Tavan sökme süreci tamamlanmıştır. Testler bağımsız dış firmada yapılabilmektedir.", done: true }] },
  { id: "kit-46", module: "kalite_guvence", kod: "KIT-2026-046", baslik: "Yerlileştirme Projesi ( Cam Çalışması )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-06", vade: "2026-07-06", bitisTarihi: "2026-07-06", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-46-st1", text: "• Başkent Cam ziyaret edilecektir. ( 06.07.2026 )", done: true }, { id: "kit-46-st2", text: "Rapor sonucu mail atılmıştır.", done: true }] },
  { id: "kit-47", module: "kalite_guvence", kod: "KIT-2026-047", baslik: "Yerlileştirme Projesi ( Batarya Paketi )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-47-st1", text: "• Cw enerji ile görüşülecektir.• Imecar ile görüşülecektir.", done: true }] },
  { id: "kit-48", module: "kalite_guvence", kod: "KIT-2026-048", baslik: "Yerlileştirme Projesi ( Metal Karkas )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-48-st1", text: "Maenso ekibi tarafından yönetilecektir.", done: true }] },
  { id: "kit-49", module: "kalite_guvence", kod: "KIT-2026-049", baslik: "Yerlileştirme Projesi ( Koltuk )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-49-st1", text: "Pilot koltuk ile görüşülecektir.", done: true }] },
  { id: "kit-50", module: "kalite_guvence", kod: "KIT-2026-050", baslik: "Yerlileştirme Projesi ( Korna )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-16", vade: "2026-07-31", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-50-st1", text: "Seger firmasından temin edilecekitir.Kalite dokümanları hakkında görüşmek için mail atıldı.21.07.2026 Toplantı yapılacaktır. ( SOR dosyasında teknik bilgiler incelenecektir. )Teknik resim onayı beklemektedir. ( 10.08.2026 )", done: true }, { id: "kit-50-st2", text: "PPAP Hazırlığı: Seviye 3 (Level 3) PPAP dosyalarının hazırlanması,", done: true }, { id: "kit-50-st3", text: "Sertifikasyon: Minimum ISO 9001 kalite belgesinin sunulması,", done: true }, { id: "kit-50-st4", text: "Paketleme: Paketleme şartnamesinin oluşturularak tarafımıza iletilmesi,", done: true }, { id: "kit-50-st5", text: "Etiketleme: Sistemlerimize uyumlu etiket formatının netleştirilmesi,", done: true }, { id: "kit-50-st6", text: "Şahit Numune: Karşılıklı olarak 1'er adet şahit numune belirlenmesi,", done: true }, { id: "kit-50-st7", text: "Sevkiyat Dokümantasyonu: Her sevkiyatta malzeme sertifikası ve ölçüm raporlarının paylaşılması,", done: true }, { id: "kit-50-st8", text: "Firma Ziyareti / Denetimi: Tarafımızca gerçekleştirilecek süreç denetimi. (17-28 Ağustos )", done: true }, { id: "kit-50-st9", text: "Teknik resim onaylanıp, firmaya iletilecektir.", done: true }] },
  { id: "kit-51", module: "kalite_guvence", kod: "KIT-2026-051", baslik: "Yerlileştirme Projesi ( Ayna )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-16", vade: "2026-07-31", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-51-st1", text: "Eraynadan temin edilecektir.Hatırlatma maili atılmıştır.", done: true }, { id: "kit-51-st2", text: "Kalite evrakları ile ilgili mail atılmıştır. ( 20.07.2026 Hatırlatma atıldı. )17-28 Ağustos arasında ziyaret yapılacaktır, fakat firma üretimi Yozgattadır.", done: true }] },
  { id: "kit-52", module: "kalite_guvence", kod: "KIT-2026-052", baslik: "Homologasyon", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-08", vade: "2026-07-10", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-52-st1", text: "Dokümanlar okunup incelenecektir.", done: true }] },
  { id: "kit-53", module: "kalite_guvence", kod: "KIT-2026-053", baslik: "COP", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-08", vade: "2026-07-10", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-53-st1", text: "Dokümanlar okunup incelenecektir.KYS kurulumu yapılacaktır. ( Yeni arkadaş gelince başlanacaktır. )", done: true }] },
  { id: "kit-54", module: "kalite_guvence", kod: "KIT-2026-054", baslik: "Tip Onayı Genişletme", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "2026-07-29", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-54-st1", text: "Toplantı yapılacaktır.", done: true }, { id: "kit-54-st2", text: "Görüşme yapıldı, Cemre Hanım takip ediyor notlarını paykaşacak.", done: true }] },
  { id: "kit-55", module: "kalite_guvence", kod: "KIT-2026-055", baslik: "Bostancı Şube Tamir", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-09", vade: "2026-07-09", bitisTarihi: "2026-07-09", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-55-st1", text: "Araç kaputu kalkmaktadır. Perşembe günü yerinde tamir olacaktır", done: true }, { id: "kit-55-st2", text: "Tamir yapılmıştır.", done: true }] },
  { id: "kit-56", module: "kalite_guvence", kod: "KIT-2026-056", baslik: "Araç Fotoğraf Takip Sistemi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-07", vade: "2026-07-10", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-56-st1", text: "Birçin Hanım'dan fotoğraf yükleme alanı için dönüş beklenmektedir.", done: true }, { id: "kit-56-st2", text: "Ozan Beye mail atıldı, sistemin uygulanması bekleniyor.Ozan Bey'ler sevk edilen araçların fotoğraflarını yüklemeye başlamıştır.", done: true }] },
  { id: "kit-57", module: "kalite_guvence", kod: "KIT-2026-057", baslik: "Araç Değişiklik Matrisi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-06", vade: "2026-07-07", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-57-st1", text: "Matris tamamlanıp ilgili kişilere mail atılacaktır.", done: true }, { id: "kit-57-st2", text: "Dönüş olursa toplantı düzenlenecektir.", done: true }] },
  { id: "kit-58", module: "kalite_guvence", kod: "KIT-2026-058", baslik: "Cam Tedarikçi Bilgileri Raporu", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-08", vade: "2026-07-10", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-58-st1", text: "Cemre Hanım, ilgili kısımları dolduracaktır.", done: true }, { id: "kit-58-st2", text: "Dönüş beklenmektedir.", done: true }] },
  { id: "kit-59", module: "kalite_guvence", kod: "KIT-2026-059", baslik: "Yapıştırma Testi ( Kaput )", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-10", vade: "2026-07-10", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-59-st1", text: "Yüzey skoçlanarak deneme yapılan ürünler uygunsuzdur.Yüzey pürmüzlenerek denenen ürünlerde yüzeyden ayrılma gözlemlenmedi, yapıştırıcıdan ayrılma gözlemlendi.", done: true }] },
  { id: "kit-60", module: "kalite_guvence", kod: "KIT-2026-060", baslik: "Balata Değişimi Yapılacaktır.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-13", vade: "", bitisTarihi: "", durum: "iptal", oncelik: "Orta", subtasks: [{ id: "kit-60-st1", text: "Balata değişiminden sonra 500-1000-2000 km kontrolleri ve incelemeleri yapılacaktır.", done: true }] },
  { id: "kit-61", module: "kalite_guvence", kod: "KIT-2026-061", baslik: "Yolcu camlarının contası ölçülecektir.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-13", vade: "2026-07-13", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-61-st1", text: "Yolcu camlarının shore değerleri kontrol edilecektir.", done: true }, { id: "kit-61-st2", text: "Conta 75 shore gelmektedir.Tan kauçuk üretim standartında 65 -5 shore olması gerektiği yazıyor. Konu iyileştirme toplantısında konuşulacaktır.", done: true }] },
  { id: "kit-62", module: "kalite_guvence", kod: "KIT-2026-062", baslik: "İtac Görüşme", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-16", vade: "2026-07-23", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-62-st1", text: "Yerlileştirme projelerimiz kapsamında bazı komponentlerde tedarikçi değişikliğine gidiyoruz. Bu değişikliklerin tip onayına etkilerini değerlendirmek üzere sizinle iş birliği yapmak istiyoruz.Bu doğrultuda; süreç adımları (test aracı hazırlığı, dokümantasyon vb.) ve ücretlendirme detayları (komponent bazlı mı yoksa paket fiyat mı) hakkında bilgi paylaşabilir misiniz?", done: true }, { id: "kit-62-st2", text: "Cemre Hanım mail attı, dönüş beklenmektedir.Cemre Hanım, toplantı için görüşecektir.Toplantı yapılmıştır, detaylarla ilgili Cemre Hanım not paylaşacaktır.", done: true }] },
  { id: "kit-63", module: "kalite_guvence", kod: "KIT-2026-063", baslik: "Cam Numuneleri Hk.", sorumlu: "Doğukan TOKAYAdem YILMAZZOBAMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-63-st1", text: "Başkent Cam: Numuneler geldi.", done: true }, { id: "kit-63-st2", text: "30.07.2026 Tarihinde denemesi yapılacaktır.Denemesi yapıldı. tedarikçiye mail atıldı.", done: true }] },
  { id: "kit-64", module: "kalite_guvence", kod: "KIT-2026-064", baslik: "Cam Numuneleri Hk.", sorumlu: "Doğukan TOKAYAdem YILMAZZOBAMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-64-st1", text: "Olimpia Cam: 31.07.2026 Tarihinde denemesi yapılacaktır.", done: true }, { id: "kit-64-st2", text: "Deneme bekliyor.", done: true }] },
  { id: "kit-65", module: "kalite_guvence", kod: "KIT-2026-065", baslik: "Tedarikçi Yönetimi Dokümanlarının Kurulması", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-20", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-65-st1", text: "Hem mevcut tedarikçilerle yaşanan süreçlerde aksaklıkları önlemek hem de yeni yerli tedarikçilerden alım yapmadan önce sistemi standart hale getirmek", done: true }, { id: "kit-65-st2", text: "Tedarikçi El Kitabı ( Tamamlandı 29.07.2026 )", done: true }] },
  { id: "kit-66", module: "kalite_guvence", kod: "KIT-2026-066", baslik: "2 Adet tablet siparişi açılacaktır.", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-22", vade: "2026-07-31", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-66-st1", text: "Ozan Beyle birlikte tablet siparişi girilecektir.", done: true }] },
  { id: "kit-67", module: "kalite_guvence", kod: "KIT-2026-067", baslik: "Henkel Müşteri Ziyaretleri / Araç Yorumları", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-23", vade: "2026-07-23", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-67-st1", text: "Pazarlama ve ilgili ekiplerle paylaşılacaktır.", done: true }] },
  { id: "kit-68", module: "kalite_guvence", kod: "KIT-2026-068", baslik: "COP Denetimi Hazırlıkları", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-07-29", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-68-st1", text: "Furkan Bey'den gelen soru listesine göre çalışmalar yapılacaktır.", done: true }, { id: "kit-68-st2", text: "Soru listesi çıkarıldı. Çalışma planı yapılacaktır.Giriş Kalite Kontrol ProsedürüGiriş Kalite Kontrol FormuProses Kontrol ProsedürüProses Kontrol Formu Final Kontrol ProsedürüFinal Kontrol FormuDepolama ProsedürüSevkiyat Prosedürü", done: true }] },
  { id: "kit-69", module: "kalite_guvence", kod: "KIT-2026-069", baslik: "Karea COP Test planlaması ve teklif isteği", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-69-st1", text: "Teklif bekliyoruz.", done: true }] },
  { id: "kit-70", module: "kalite_guvence", kod: "KIT-2026-070", baslik: "Test Aracı Üretimi", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-70-st1", text: "Test süreci için araç üretimi yapılacaktır.", done: true }, { id: "kit-70-st2", text: "120 Numaralı araç test için üretilmiştir.", done: true }] },
  { id: "kit-71", module: "kalite_guvence", kod: "KIT-2026-071", baslik: "Hurda Yönetim Süreci", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-71-st1", text: "Hurda ürünler için karantina alanı belirlenecektir.Hurda ürünlerin ayrıştırılması belirlenecektir.", done: true }] },
  { id: "kit-72", module: "kalite_guvence", kod: "KIT-2026-072", baslik: "Kalibrasyon Takip Listesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-72-st1", text: "Karea bünyesindeki tüm aletler listeye eklenecektir ve kalibrasyona gönderilecektir.", done: true }, { id: "kit-72-st2", text: "Kalibrasyon talimatı yazılacaktır.Doğrulama formu yazılacaktır.", done: true }] },
  { id: "kit-73", module: "kalite_guvence", kod: "KIT-2026-073", baslik: "Mühendislik Değişiklik Yönetimi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-11", vade: "2026-08-14", bitisTarihi: "2026-08-13", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-73-st1", text: "Mühendislik değişiklik formlarının takibinin yapılacağı genel bir excel yapacağız.", done: true }] },
  { id: "kit-74", module: "kalite_guvence", kod: "KIT-2026-074", baslik: "Uygunluk Belgesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-11", vade: "2026-08-14", bitisTarihi: "2026-08-13", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-74-st1", text: "İlyas Bey: Şasi numaralarına göre açılan klasörlere uygunluk belgelerinin eksiksiz yüklendiğini kontrol et.Birçim Hanım: Devir öncesi araçlara ait evrakların durumunu teyit et, gerekiyorsa eksik belgelerin yüklenmesine destek ol.Kontrol (14.08.2026 Cuma): Tüm şasilerin belgelerinin klasörlerde hazır olduğunu doğrula.", done: true }] },
  { id: "kit-75", module: "kalite_guvence", kod: "KIT-2026-075", baslik: "Denetim Eksiklikleri", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "devam", oncelik: "Orta", subtasks: [{ id: "kit-75-st1", text: "Giriş Kalite Kontrol Kayıtları dosyasının daha kalabalıklaşması iyi olacaktır. Orkun + Sennur / Abdurrahman ile görüşülebilir, bilgi içeriği için.Mal Kabul girdi formu. Batarya checklistleri örnek olarak gösterilebilir. Ayrıca Emark olan ürünlere dair emark kontrol formu oluşturulabilir: Lastik, aydınlatmalar, korna, aynalar, emniyet kemeri, camlar, kedigözü.Orkun'un tedarikçilerden final kontrol raporlarını istemesi. (Cemre)8.3.2 Hangi ekipmanların hangi periyotlarda bakım yapılması. Kahan'la görüşülecek. Ekipman listesi var mı?8.3.5 EOL'daki testlerin sonuç değerlerinin oradaki bilgisayardan çekilmesi ve anlamlı bir grafik oluşturması. Sapmaların yönetimi için de ekip toplantısı yapılarak tekil konu sahibi belirlenir. Ömer - Hasan Basri8.3.7 - COP denetim günü etraftaki petlas'ları saklayıp haida'ları getirelim - en bariz komponent o olduğu için. Daha fazla hangi komponent göze çarpabilir? 8.3.8 - Şasi / motor / batarya dışında seri no takibi hangi komponentlerin olmalı? 3in1 ya da VCU? Gökhan ve Furkan'larla tartışalım.8.3.9 - Emarklı ürünlerin soft ve hard emark işaretlemelerinin doğruluğu kontrolü için kontrol formu oluştur. (Cemre)8.3.10 - COC belgelerini tedarikçilerden isteyelim. (Orkun + Cemre)", done: true }] },
  { id: "kit-76", module: "kalite_guvence", kod: "KIT-2026-076", baslik: "Talimat Düzenlemesi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-17", vade: "2026-08-17", bitisTarihi: "2026-08-17", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-76-st1", text: "Gökhan ve Orkun Bey'den gelen talimatları düzenleyip sisteme ekleyeceğiz.", done: true }] },
  { id: "kit-77", module: "kalite_guvence", kod: "KIT-2026-077", baslik: "İSG Dolabı ve Malzemeler", sorumlu: "Burak KIZMAZ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-77-st1", text: "İSG Dolabı ve koruyucu ekipmanlar alınarak gelen kişilere sunulması gerekmektedir.", done: true }] },
  { id: "kit-78", module: "kalite_guvence", kod: "KIT-2026-078", baslik: "EMC Test Labarotuvar Seçimi", sorumlu: "Cemre ABLAYRefik DİRİ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-78-st1", text: "Refik Bey'den dönüş beklenmektedir.", done: true }] },
  { id: "kit-79", module: "kalite_guvence", kod: "KIT-2026-079", baslik: "Tavan Sökmeden Tamir Yönteminin Belirlenmesi", sorumlu: "MühendislikMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-21", vade: "2026-08-21", bitisTarihi: "2026-08-21", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-79-st1", text: "Tamir yöntemi sabitlenecektir.", done: true }] },
  { id: "kit-80", module: "kalite_guvence", kod: "KIT-2026-080", baslik: "IMDS Sisteminin oluşturulması", sorumlu: "Cemre ABLAYMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [] },
  { id: "kit-81", module: "kalite_guvence", kod: "KIT-2026-081", baslik: "Uyarı Panosu", sorumlu: "MühendislikMuharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "", vade: "", bitisTarihi: "", durum: "beklemede", oncelik: "Orta", subtasks: [{ id: "kit-81-st1", text: "Benim genel bir önerim olacak. Araçlarla fiziki teması olan herkes, yüzük,kolye,künye,saat, kalem, kemer,kemer tokası, düğme gibi malzemelerden arınmış olmalı.( Talimat belki de vardır. )", done: true }] },
  { id: "kit-82", module: "kalite_guvence", kod: "KIT-2026-082", baslik: "Araç İzlenebilirlik Sistemi", sorumlu: "Muharrem DELİKTAŞ", gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: "2026-08-12", vade: "2026-08-21", bitisTarihi: "2026-08-21", durum: "tamam", oncelik: "Orta", subtasks: [{ id: "kit-82-st1", text: "Araçlara ait dosyaların düzenlenmesi,Batarya, motor formlarının sisteme işlenmesi", done: true }] },
];

const INITIAL_TASKS = KIT_TASKS;

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
    seq: 34,
    baslik: "Gün Sonu Kalite Kontrol ve Araç Durum Raporu",
    tarih: "2026-08-22",
    hazirlayan: "Kalite Güvence Yönetimi (K-QN)",
    bolum: "Şube & Depo Takip",
    araclar: [
      { id: "veh-1", no: "141", konum: "fabrika1", asama: "Lift", detay: "Lifte alındı.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-2", no: "146", konum: "fabrika1", asama: "Sürüş Testi", detay: "Açık maddeler tamamlandı, vakum pompası sorunu giderildi. Sadece sürüş testi kaldı.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-3", no: "148", konum: "fabrika1", asama: "Sürüş Testi", detay: "Şarj testi OK. Sürüş testi yapılacak, görsel kusurlar gideriliyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-4", no: "150", konum: "fabrika1", asama: "Şarj Testi", detay: "Şarj testine girdi.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-5", no: "144", konum: "depo", asama: "Final Kontrol", detay: "Bagaj iç sağ üst plastik deforme (derin çizik). Arka bagaj logo takıldı. EE testi yapıldı, final kontrol yapılacak.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-6", no: "135", konum: "depo", asama: "Elektrik Kontrol", detay: "Ön logo takıldı. Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-7", no: "136", konum: "depo", asama: "Elektrik Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-8", no: "137", konum: "depo", asama: "Elektrik Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-9", no: "138", konum: "depo", asama: "Sızdırmazlık Testi", detay: "Bagaj kilit su kaçağı devam ediyor. Sağ kapı üst iç tavan su kaçağı tespit edildi. Sealler işlemleri yapıldı, sızdırmazlık testi yapılacak.", tarih: "2026-08-22", reworklar: [{ id: "rw-9", text: "Su kaçağı devam ediyor, sealler uygulandı.", tarih: "2026-08-22" }] },
      { id: "veh-10", no: "145", konum: "depo", asama: "Elektrik Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-11", no: "163", konum: "depo", asama: "Elektrik Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-12", no: "133", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-13", no: "129", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-14", no: "134", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-15", no: "124", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-16", no: "128", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-17", no: "126", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-18", no: "143", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-19", no: "139", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh-20", no: "130", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, final kontrol edildi ve serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh-21", no: "131", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri yapıldı, final yapıldı ve serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh-22", no: "118", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh-23", no: "127", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, final kontrol yapıldı ve serbest bırakıldı.", tarih: "2026-08-19", reworklar: [] },
      { id: "veh-24", no: "132", konum: "depo", asama: "Serbestlik", detay: "Kapı kilit tamir edildi, final kontrol yapıldı ve serbest bırakıldı.", tarih: "2026-08-19", reworklar: [] },
      { id: "veh-25", no: "120", konum: "depo", asama: "Serbestlik", detay: "EMC test aracı olarak serbest bırakıldı.", tarih: "2026-08-18", reworklar: [] },
      { id: "veh-26", no: "122", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, tüm kontroller tamamlanarak serbest bırakıldı.", tarih: "2026-08-18", reworklar: [] },
      { id: "veh-27", no: "108", konum: "depo", asama: "Serbestlik", detay: "Ön sol çamurluk ve kapı ayarı tamir işlemleri tamamlandı.", tarih: "2026-08-17", reworklar: [] },
      { id: "veh-28", no: "107", konum: "depo", asama: "Serbestlik", detay: "Harness düzeltildi, E/E & Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh-29", no: "121", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık ve eksik parçalar tamamlandı, serbest bırakıldı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh-30", no: "123", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, E/E Check ve Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh-31", no: "125", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, trim ayarları, modül ve Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh-32", no: "110", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, final kontrol edildi, olumsuzluk yok.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh-33", no: "117", konum: "depo", asama: "Serbestlik", detay: "Ön tampon ve cam açıklık işlemleri yapıldı, final kontrol OK.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh-34", no: "119", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, final kontrol yapıldı.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh-35", no: "106", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı.", tarih: "2026-08-11", reworklar: [] },
      { id: "veh-36", no: "116", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı. Depoya giriş/park yapıldı.", tarih: "2026-08-11", reworklar: [] },
      { id: "veh-37", no: "111", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh-38", no: "112", konum: "depo", asama: "Serbestlik", detay: "Sürüş, sızdırmazlık ve E/E Check kontrolleri tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh-39", no: "113", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh-40", no: "114", konum: "depo", asama: "Serbestlik", detay: "Radyatör değişimi, sızdırmazlık ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh-41", no: "115", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, kaput montajı ve E/E Check kontrolleri tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh-42", no: "098", konum: "depo", asama: "Serbestlik", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh-43", no: "130", konum: "depo", asama: "Serbestlik", detay: "Şenol Bey tarafından şartlı onay verildi ve serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh-44", no: "104", konum: "depo", asama: "Serbestlik", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh-45", no: "109", konum: "depo", asama: "Serbestlik", detay: "Fren körüğü kaynak kaçağı giderildi, EE Check tamamlandı.", tarih: "2026-08-06", reworklar: [] },
      { id: "veh-46", no: "102 (eski 108)", konum: "depo", asama: "Serbestlik", detay: "Şenol Bey şartlı onay verildi ve serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh-47", no: "103", konum: "depo", asama: "Serbestlik", detay: "Spoiler yapıştırma, sızdırmazlık ve EE Check kontrolleri tamamlandı.", tarih: "2026-08-04", reworklar: [] },
      { id: "veh-48", no: "097", konum: "depo", asama: "Serbestlik", detay: "Sol ayna değişimi yapıldı. Ton farkı durumu onaylandı.", tarih: "2026-08-03", reworklar: [] },
      { id: "veh-49", no: "091", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık ve EE Check kontrolleri tamamlandı.", tarih: "2026-08-01", reworklar: [] },
      { id: "veh-50", no: "096", konum: "depo", asama: "Serbestlik", detay: "Final yapıldı, EPS ayarı, silecek ses ve fıskiye ayarları tamamlandı.", tarih: "2026-08-01", reworklar: [] },
      { id: "veh-51", no: "095", konum: "depo", asama: "Serbestlik", detay: "Tüm kalite ve test kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-01", reworklar: [] },
    ]
  }
];

const SHARED_DOC = doc(db, "app_data", "shared");

// Firestore'daki veri şemasının sürümü. Bu sayı yükseltildiğinde, eski
// sürümdeki paylaşımlı dokümanlar users/tasks/reports/modules alanları
// yeni INITIAL_* verisiyle değiştirilerek otomatik göç ediliyor (bkz.
// aşağıdaki onSnapshot). Şema uyumsuz bir değişiklik yapılmadıkça bu
// sayıyı artırmaya gerek yok.
const DATA_VERSION = 3;

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
  const [contacts, setContacts] = useState([]);
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
  //    verisiyle oluştur.
  //
  //    ŞEMA GÖÇÜ: Araç Akış Takibi'nin veri yapısı değişti (subeHattan/
  //    depodaki/serbestBirakilan -> araclar) ve gerçek görev/kullanıcı
  //    verisi güncellendi. Firestore'da DATA_VERSION'dan eski bir kayıt
  //    varsa, users/tasks/reports/modules alanlarını yeni başlangıç
  //    verisiyle DEĞİŞTİRİP sürümü yükseltiyoruz — bu sayede eski şemadan
  //    kaynaklanan çökme (report.araclar undefined) bir daha olmuyor ve
  //    yeni eklenen 82 Kalite Güvence görevi ile araç akışı verisi gerçekten
  //    Firestore'a yazılıyor. todos/chats/notifications/contacts kullanıcı
  //    verisi olduğu için dokunulmadan korunuyor.
  useEffect(() => {
    const unsub = onSnapshot(
      SHARED_DOC,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          isRemoteUpdate.current = true;

          if (!d.version || d.version < DATA_VERSION) {
            setUsersList(INITIAL_USERS);
            setTasks(INITIAL_TASKS);
            setTodos(d.todos || INITIAL_TODOS);
            setChats(d.chats || INITIAL_CHATS);
            setNotifications(d.notifications || []);
            setModules(INITIAL_MODULES);
            setReports(INITIAL_REPORTS);
            setContacts(d.contacts || []);
            setDoc(SHARED_DOC, {
              users: INITIAL_USERS,
              tasks: INITIAL_TASKS,
              todos: d.todos || INITIAL_TODOS,
              chats: d.chats || INITIAL_CHATS,
              notifications: d.notifications || [],
              modules: INITIAL_MODULES,
              reports: INITIAL_REPORTS,
              contacts: d.contacts || [],
              version: DATA_VERSION,
            }).catch(() => {});
          } else {
            setUsersList(d.users || INITIAL_USERS);
            setTasks(d.tasks || INITIAL_TASKS);
            setTodos(d.todos || INITIAL_TODOS);
            setChats(d.chats || INITIAL_CHATS);
            setNotifications(d.notifications || []);
            setModules(d.modules || INITIAL_MODULES);
            setReports(d.reports || INITIAL_REPORTS);
            setContacts(d.contacts || []);
          }
        } else {
          setDoc(SHARED_DOC, { users: INITIAL_USERS, tasks: INITIAL_TASKS, todos: INITIAL_TODOS, chats: INITIAL_CHATS, notifications: [], modules: INITIAL_MODULES, reports: INITIAL_REPORTS, contacts: [], version: DATA_VERSION }).catch(() => {});
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
    setDoc(SHARED_DOC, { users: usersList, tasks, todos, chats, notifications, modules, reports, contacts, version: DATA_VERSION }, { merge: true }).catch((e) => setError("Kaydedilemedi: " + e.message));
  }, [usersList, tasks, todos, chats, notifications, modules, reports, contacts, dataLoaded]);

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

  // Bir göreve, kayıtlı kullanıcı olmayan biri sorumlu yapıldığında adını
  // "Kişiler" listesine ekler — böylece bir daha yazılırken öneri olarak
  // çıkar ve Admin Panel'den yönetilebilir. Üye eklemeye gerek kalmadan
  // iş yerindeki herkesi görev takibine dahil edebilmek için.
  const addContactIfNew = (name) => {
    const n = (name || "").trim();
    if (!n) return;
    const knownUser = usersList.some(u => u.name === n);
    const knownContact = contacts.includes(n);
    if (!knownUser && !knownContact) setContacts(prev => [...prev, n]);
  };

  const personOptions = Array.from(new Set([...usersList.map(u => u.name), ...contacts])).sort();

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
          <div><div style={styles.brandName}>Karea Asistan</div><div style={styles.brandSub}>Süreç & Yetki Yönetim Paneli</div></div>
        </div>

        <nav style={styles.navTabs}>
          <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} color="#F59E0B" /><span>Dashboard</span></button>
          <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} color="#F59E0B" /><span>To-Do List</span></button>
          {(currentUser.role === "admin" || currentUser.canViewReports) && (
            <button style={{ ...styles.navTab, ...(activeModule === "raporlar" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("raporlar")}><FileSpreadsheet size={15} color="#10B981" /><span>Araç Akış Takibi</span></button>
          )}
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
          <DashboardView tasks={tasks} modules={modules} reports={reports} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "raporlar" ? (
          (currentUser.role === "admin" || currentUser.canViewReports) ? <ReportsView reports={reports} setReports={setReports} currentUser={currentUser} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : activeModule === "detayli_rapor" ? (
          <DetailedReportView tasks={tasks} usersList={usersList} modules={modules} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} setUsersList={setUsersList} modules={modules} setModules={setModules} contacts={contacts} setContacts={setContacts} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : (
          <KanbanBoardView activeModule={activeModule} modules={modules} tasks={tasks.filter((t) => t.module === activeModule)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser} onOpenDetail={setSelectedTask} onMoveStage={(id, st) => setTasks(tasks.map(t => t.id === id ? {...t, durum: st, bitisTarihi: st === "tamam" ? todayStr() : t.bitisTarihi} : t))} onCreateTask={(tData) => {
            const newId = uid();
            const prefix = (tData.module || "ask").substring(0, 3).toUpperCase();
            const newTask = { id: newId, module: tData.module || "asakai", kod: `${prefix}-2026-${(tasks.length+1).toString().padStart(3,"0")}`, baslik: tData.baslik, sorumlu: tData.sorumlu || currentUser.name, gorevTipi: "bireysel", ekipUyeleri: [], acilisTarihi: todayStr(), vade: tData.vade || todayStr(), bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] };
            setTasks(prev => [...prev, newTask]);
            addContactIfNew(newTask.sorumlu);
            addNotification(newTask.sorumlu, `Yeni görev atandı: ${newTask.baslik}`);
          }} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} usersList={usersList} personOptions={personOptions} />
        )}
      </main>

      {/* Cubicl Tarzı Sabit Alt Köşe Sohbet Barı */}
      <ChatBar chats={chats} setChats={setChats} currentUser={currentUser} usersList={usersList} tasks={tasks} />

      {selectedTask && (
        <TaskDetailModal task={selectedTask} currentUser={currentUser} personOptions={personOptions} onClose={() => setSelectedTask(null)} onSaveTask={(updated) => { setTasks(tasks.map(t => t.id === updated.id ? updated : t)); addContactIfNew(updated.sorumlu); }} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} />
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
function DashboardView({ tasks, modules, reports, currentUser, dashboardFilter, setDashboardFilter, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name);
  const filtered = myTasks.filter(t => dashboardFilter === "aktif" ? t.durum !== "tamam" : dashboardFilter === "tamamlanan" ? t.durum === "tamam" : true);
  const today = todayStr();
  const overdueCount = myTasks.filter(t => t.durum !== "tamam" && t.vade && t.vade < today).length;
  const teamActive = tasks.filter(t => t.durum !== "tamam").length;
  const teamDone = tasks.filter(t => t.durum === "tamam").length;
  const canSeeReports = currentUser.role === "admin" || currentUser.canViewReports;
  const latestReport = canSeeReports && reports && reports.length > 0 ? [...reports].sort((a, b) => (a.tarih < b.tarih ? 1 : -1))[0] : null;

  return (
    <div style={styles.viewContainer} id="print-area">
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Dashboard</h1><p style={styles.viewSub}>Hoş geldiniz, {currentUser.name}. — {fmtDate(today)}</p></div>
        <button style={styles.printBtn} className="no-print" onClick={() => window.print()}><Printer size={15} /> Yazdır</button>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }} className="no-print">
        <button style={styles.quickActionBtn} onClick={() => onNavigateModule("todo")}><ListTodo size={13} /> To-Do Ekle</button>
        {canSeeReports && <button style={styles.quickActionBtn} onClick={() => onNavigateModule("raporlar")}><FileSpreadsheet size={13} /> Araç Akış Takibi</button>}
        <button style={styles.quickActionBtn} onClick={() => onNavigateModule("detayli_rapor")}><FileText size={13} /> Detaylı Rapor</button>
      </div>

      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8", cursor: "pointer" }} onClick={() => setDashboardFilter("all")}><div style={styles.dashCardTitle}>Toplam İşim</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B", cursor: "pointer" }} onClick={() => setDashboardFilter("aktif")}><div style={styles.dashCardTitle}>Aktif İşlerim</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum !== "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981", cursor: "pointer" }} onClick={() => setDashboardFilter("tamamlanan")}><div style={styles.dashCardTitle}>Tamamladığım</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Geciken İşlerim</div><div style={styles.dashCardValue}>{overdueCount}</div></div>
      </div>

      {latestReport && (
        <div style={styles.yearEndTableCard} onClick={() => onNavigateModule("raporlar")} className="clickable-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B" }}>Son Araç Akışı Raporu — {fmtDate(latestReport.tarih)}</h3>
            <ArrowRight size={16} color="#94A3B8" />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 12 }}>
            <span style={{ color: "#38BDF8" }}>{(latestReport.araclar || []).filter(a => a.konum === "fabrika1").length} Fabrika 1</span>
            <span style={{ color: "#F59E0B" }}>{(latestReport.araclar || []).filter(a => a.konum === "depo" && a.asama !== "Serbestlik").length} Depo</span>
            <span style={{ color: "#10B981" }}>{(latestReport.araclar || []).filter(a => a.asama === "Serbestlik").length} Serbest</span>
          </div>
        </div>
      )}

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
        {filtered.length === 0 && <div style={{ color: "#64748B", fontSize: 12 }}>Bu filtrede iş yok.</div>}
        {filtered.map(t => (
          <div key={t.id} style={styles.personalTaskCard} onClick={() => onOpenDetail(t)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={styles.taskCodeBadge}>{t.kod}</span><span style={{ fontSize: 10, color: "#F59E0B" }}>{KANBAN_STAGES.find(s => s.id === t.durum)?.label || t.durum}</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{t.baslik}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoardView({ activeModule, modules, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList, personOptions }) {
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
      {showModal && <CreateTaskModal activeModule={activeModule} usersList={usersList} personOptions={personOptions} currentUser={currentUser} onClose={() => setShowModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function CreateTaskModal({ activeModule, usersList, personOptions, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || "");
  const [vade, setVade] = useState(todayStr());
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Görev</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Başlık</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Görev yazın..." required /></div>
          <div>
            <label style={styles.inputLabel}>Sorumlu (üye olmayan biri de yazılabilir)</label>
            <input style={styles.mainInput} list="kisi-listesi-yeni" value={sorumlu} onChange={e => setSorumlu(e.target.value)} placeholder="İsim yazın..." />
            <datalist id="kisi-listesi-yeni">{(personOptions || []).map(p => <option key={p} value={p} />)}</datalist>
          </div>
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module: activeModule }); onClose(); }}>Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, personOptions, onClose, onSaveTask, onDeleteTask }) {
  const [subText, setSubText] = useState("");
  const [editTitle, setEditTitle] = useState(task.baslik);
  const [editSorumlu, setEditSorumlu] = useState(task.sorumlu);
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={styles.drawerBody}>
          <input style={styles.mainInput} value={editTitle} onChange={e => setEditTitle(e.target.value)} onBlur={() => onSaveTask({...task, baslik: editTitle})} />
          <div>
            <label style={styles.inputLabel}>Sorumlu (üye olmayan biri de yazılabilir)</label>
            <input style={styles.mainInput} list="kisi-listesi-detay" value={editSorumlu} onChange={e => setEditSorumlu(e.target.value)} onBlur={() => onSaveTask({...task, sorumlu: editSorumlu})} />
            <datalist id="kisi-listesi-detay">{(personOptions || []).map(p => <option key={p} value={p} />)}</datalist>
          </div>
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

  const nextSeq = () => reports.length ? Math.max(...reports.map(r => r.seq || 0)) + 1 : 1;

  const createReport = (form) => {
    const newReport = { id: uid(), seq: nextSeq(), baslik: form.baslik, tarih: form.tarih, hazirlayan: form.hazirlayan, bolum: form.bolum, araclar: [] };
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
        <div><h1 style={styles.viewTitle}>Araç Akış Takibi</h1><p style={styles.viewSub}>Fabrika 1 ve Depo akışındaki araçlar — herkes yeni rapor ekleyebilir.</p></div>
        <button style={styles.primaryActionBtn} onClick={() => setShowNew(true)}><Plus size={16} /> Yeni Rapor</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "300px 1fr" : "1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: selected ? "80vh" : "none", overflowY: selected ? "auto" : "visible" }}>
          {sorted.length === 0 && <div style={{ color: "#64748B", textAlign: "center", padding: 30 }}>Henüz rapor eklenmedi.</div>}
          {sorted.map(r => {
            const fCount = (r.araclar || []).filter(a => a.konum === "fabrika1").length;
            const dCount = (r.araclar || []).filter(a => a.konum === "depo" && a.asama !== "Serbestlik").length;
            const sCount = (r.araclar || []).filter(a => a.asama === "Serbestlik").length;
            return (
              <div key={r.id} style={{ background: selectedId === r.id ? "#334155" : "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: 14, cursor: "pointer" }} onClick={() => setSelectedId(r.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{fmtDate(r.tarih)}</span>
                  {canDelete(r) && <Trash2 size={13} color="#EF4444" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }} />}
                </div>
                <div style={{ fontSize: 12, color: "#E2E8F0", marginTop: 4, fontWeight: 600 }}>{r.baslik}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{r.hazirlayan} · v{r.seq}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 11 }}>
                  <span style={{ color: "#38BDF8" }}>{fCount} Fabrika 1</span>
                  <span style={{ color: "#F59E0B" }}>{dCount} Depo</span>
                  <span style={{ color: "#10B981" }}>{sCount} Serbest</span>
                </div>
              </div>
            );
          })}
        </div>

        {selected && <ReportDetail report={selected} onUpdate={(upd) => setReports(reports.map(r => r.id === upd.id ? upd : r))} onClose={() => setSelectedId(null)} />}
      </div>

      {showNew && <NewReportModal currentUser={currentUser} onClose={() => setShowNew(false)} onCreate={createReport} />}
    </div>
  );
}

function NewReportModal({ currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("Gün Sonu Kalite Kontrol ve Araç Durum Raporu");
  const [tarih, setTarih] = useState(todayStr());
  const [hazirlayan, setHazirlayan] = useState(currentUser.name);
  const [bolum, setBolum] = useState("Şube & Depo Takip");
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <h2 style={styles.formTitle}>Yeni Rapor</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          <div><label style={styles.inputLabel}>Rapor Adı</label><input style={styles.mainInput} value={baslik} onChange={e => setBaslik(e.target.value)} /></div>
          <div><label style={styles.inputLabel}>Tarih</label><input type="date" style={styles.selectInput} value={tarih} onChange={e => setTarih(e.target.value)} /></div>
          <div><label style={styles.inputLabel}>Hazırlayan</label><input style={styles.mainInput} value={hazirlayan} onChange={e => setHazirlayan(e.target.value)} /></div>
          <div><label style={styles.inputLabel}>Bölüm</label><input style={styles.mainInput} value={bolum} onChange={e => setBolum(e.target.value)} /></div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
            <button style={styles.primaryActionBtn} onClick={() => onCreate({ baslik, tarih, hazirlayan, bolum })}>Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportDetail({ report, onUpdate, onClose }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(report.baslik);
  const [addingTo, setAddingTo] = useState(null); // "fabrika1" | "depo" | null
  const [vehForm, setVehForm] = useState({ no: "", asama: "", detay: "", tarih: todayStr() });
  const [editingVehId, setEditingVehId] = useState(null);
  const [reworkFormFor, setReworkFormFor] = useState(null);
  const [reworkText, setReworkText] = useState("");

  const fabrikaAraclar = (report.araclar || []).filter(a => a.konum === "fabrika1");
  const depoAraclar = (report.araclar || []).filter(a => a.konum === "depo");
  const serbestCount = (report.araclar || []).filter(a => a.asama === "Serbestlik").length;

  const saveTitle = () => {
    onUpdate({ ...report, baslik: titleDraft.trim() || report.baslik });
    setEditingTitle(false);
  };

  const updateMeta = (patch) => onUpdate({ ...report, ...patch });

  const openAddForm = (konum) => {
    const stages = konum === "fabrika1" ? FABRIKA1_STAGES : DEPO_STAGES;
    setVehForm({ no: "", asama: stages[0], detay: "", tarih: todayStr() });
    setAddingTo(konum);
    setEditingVehId(null);
  };

  const addVehicle = () => {
    if (!vehForm.no.trim()) return;
    const v = { id: uid(), no: vehForm.no.trim(), konum: addingTo, asama: vehForm.asama, detay: vehForm.detay.trim(), tarih: vehForm.tarih, reworklar: [] };
    onUpdate({ ...report, araclar: [...(report.araclar || []), v] });
    setAddingTo(null);
  };

  const openEditForm = (v) => {
    setVehForm({ no: v.no, asama: v.asama, detay: v.detay, tarih: v.tarih });
    setEditingVehId(v.id);
    setAddingTo(null);
  };

  const saveEdit = () => {
    onUpdate({ ...report, araclar: (report.araclar || []).map(a => a.id === editingVehId ? { ...a, no: vehForm.no.trim(), asama: vehForm.asama, detay: vehForm.detay.trim(), tarih: vehForm.tarih } : a) });
    setEditingVehId(null);
  };

  const removeVehicle = (id) => onUpdate({ ...report, araclar: (report.araclar || []).filter(a => a.id !== id) });

  const addRework = (vehId) => {
    if (!reworkText.trim()) return;
    onUpdate({ ...report, araclar: (report.araclar || []).map(a => a.id === vehId ? { ...a, reworklar: [...(a.reworklar || []), { id: uid(), text: reworkText.trim(), tarih: todayStr() }] } : a) });
    setReworkText("");
    setReworkFormFor(null);
  };

  const removeRework = (vehId, rwId) => onUpdate({ ...report, araclar: (report.araclar || []).map(a => a.id === vehId ? { ...a, reworklar: a.reworklar.filter(r => r.id !== rwId) } : a) });

  const exportPdf = () => {
    const prevTitle = document.title;
    document.title = `${report.tarih}_Kalite_Guvence_Gun_Ozet_Raporu_v${report.seq}`;
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 800);
  };

  return (
    <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: 20 }} id="print-area">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          {editingTitle ? (
            <input autoFocus style={{ ...styles.mainInput, fontSize: 16, fontWeight: 800 }} value={titleDraft} onChange={e => setTitleDraft(e.target.value)} onBlur={saveTitle} onKeyDown={e => e.key === "Enter" && saveTitle()} />
          ) : (
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#F59E0B", cursor: "pointer" }} onClick={() => { setTitleDraft(report.baslik); setEditingTitle(true); }} title="Düzenlemek için tıklayın">{report.baslik} <Edit3 size={13} className="no-print" style={{ opacity: 0.6 }} /></h2>
          )}
          <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap" }} className="no-print">
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Tarih: <input type="date" style={{ ...styles.selectInput, padding: "3px 6px", fontSize: 11, width: 130 }} value={report.tarih} onChange={e => updateMeta({ tarih: e.target.value })} /></span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Hazırlayan: <input style={{ ...styles.selectInput, padding: "3px 6px", fontSize: 11, width: 160 }} value={report.hazirlayan} onChange={e => updateMeta({ hazirlayan: e.target.value })} /></span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Bölüm: <input style={{ ...styles.selectInput, padding: "3px 6px", fontSize: 11, width: 140 }} value={report.bolum} onChange={e => updateMeta({ bolum: e.target.value })} /></span>
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{fmtDate(report.tarih)} — v{report.seq}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }} className="no-print">
          <button style={styles.printBtn} onClick={exportPdf}><Printer size={14} /> PDF Olarak İndir</button>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, margin: "16px 0", flexWrap: "wrap" }}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8", flex: "1 1 120px" }}><div style={styles.dashCardTitle}>Fabrika 1</div><div style={styles.dashCardValue}>{fabrikaAraclar.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B", flex: "1 1 120px" }}><div style={styles.dashCardTitle}>Depo (İşlemde)</div><div style={styles.dashCardValue}>{depoAraclar.length - serbestCount}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981", flex: "1 1 120px" }}><div style={styles.dashCardTitle}>Serbest Bırakılan</div><div style={styles.dashCardValue}>{serbestCount}</div></div>
      </div>

      <VehicleLocationSection
        title="Fabrika 1" color="#38BDF8" konum="fabrika1" stages={FABRIKA1_STAGES}
        araclar={fabrikaAraclar} addingTo={addingTo} vehForm={vehForm} setVehForm={setVehForm}
        editingVehId={editingVehId} reworkFormFor={reworkFormFor} setReworkFormFor={setReworkFormFor}
        reworkText={reworkText} setReworkText={setReworkText}
        onOpenAdd={() => openAddForm("fabrika1")} onCancelAdd={() => setAddingTo(null)} onAdd={addVehicle}
        onOpenEdit={openEditForm} onCancelEdit={() => setEditingVehId(null)} onSaveEdit={saveEdit}
        onRemove={removeVehicle} onAddRework={addRework} onRemoveRework={removeRework}
      />

      <VehicleLocationSection
        title="Depo" color="#F59E0B" konum="depo" stages={DEPO_STAGES}
        araclar={depoAraclar} addingTo={addingTo} vehForm={vehForm} setVehForm={setVehForm}
        editingVehId={editingVehId} reworkFormFor={reworkFormFor} setReworkFormFor={setReworkFormFor}
        reworkText={reworkText} setReworkText={setReworkText}
        onOpenAdd={() => openAddForm("depo")} onCancelAdd={() => setAddingTo(null)} onAdd={addVehicle}
        onOpenEdit={openEditForm} onCancelEdit={() => setEditingVehId(null)} onSaveEdit={saveEdit}
        onRemove={removeVehicle} onAddRework={addRework} onRemoveRework={removeRework}
      />
    </div>
  );
}

function VehicleLocationSection({ title, color, konum, stages, araclar, addingTo, vehForm, setVehForm, editingVehId, reworkFormFor, setReworkFormFor, reworkText, setReworkText, onOpenAdd, onCancelAdd, onAdd, onOpenEdit, onCancelEdit, onSaveEdit, onRemove, onAddRework, onRemoveRework }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color }}>{title} ({araclar.length})</span>
        <button style={styles.addChipBtnSolid} className="no-print" onClick={onOpenAdd}><Plus size={12} /> Araç Ekle</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {araclar.length === 0 && <div style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>Bu konumda kayıtlı araç yok.</div>}
        {araclar.map(v => (
          editingVehId === v.id ? (
            <div key={v.id} style={styles.reportAddForm} className="no-print">
              <input style={{ ...styles.mainInput, maxWidth: 80 }} value={vehForm.no} onChange={e => setVehForm(f => ({ ...f, no: e.target.value }))} />
              <select style={{ ...styles.selectInput, maxWidth: 160 }} value={vehForm.asama} onChange={e => setVehForm(f => ({ ...f, asama: e.target.value }))}>
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input style={styles.mainInput} placeholder="Detay" value={vehForm.detay} onChange={e => setVehForm(f => ({ ...f, detay: e.target.value }))} />
              <input type="date" style={{ ...styles.mainInput, maxWidth: 140 }} value={vehForm.tarih} onChange={e => setVehForm(f => ({ ...f, tarih: e.target.value }))} />
              <button style={styles.addInlineBtn} onClick={onSaveEdit}>Kaydet</button>
              <button style={styles.ghostBtn} onClick={onCancelEdit}>Vazgeç</button>
            </div>
          ) : (
            <div key={v.id}>
              <div style={styles.reportRow}>
                <span style={styles.reportRowNo}>#{v.no}</span>
                <span style={{ fontSize: 11, color, whiteSpace: "nowrap", fontWeight: 700 }}>{v.asama}</span>
                <span style={{ flex: 1 }}>{v.detay}</span>
                <span style={{ fontSize: 11, color: "#94A3B8", whiteSpace: "nowrap" }}>{fmtDate(v.tarih)}</span>
                <div className="no-print" style={{ display: "flex", gap: 6 }}>
                  <Edit2 size={12} color="#38BDF8" style={{ cursor: "pointer" }} onClick={() => onOpenEdit(v)} />
                  <button style={{ ...styles.editIconBtn, fontSize: 10, padding: 0 }} onClick={() => setReworkFormFor(reworkFormFor === v.id ? null : v.id)}>Rework</button>
                  <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => onRemove(v.id)} />
                </div>
              </div>
              {(v.reworklar || []).length > 0 && (
                <div style={{ marginLeft: 54, marginTop: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                  {v.reworklar.map(rw => (
                    <div key={rw.id} style={{ fontSize: 11, color: "#FCA5A5", display: "flex", gap: 6, alignItems: "center" }}>
                      🔧 {rw.text} <span style={{ color: "#64748B" }}>({fmtDate(rw.tarih)})</span>
                      <X size={10} className="no-print" style={{ cursor: "pointer" }} onClick={() => onRemoveRework(v.id, rw.id)} />
                    </div>
                  ))}
                </div>
              )}
              {reworkFormFor === v.id && (
                <div style={{ marginLeft: 54, marginTop: 4, display: "flex", gap: 6 }} className="no-print">
                  <input style={{ ...styles.mainInput, fontSize: 11 }} placeholder="Rework / tamir açıklaması" value={reworkText} onChange={e => setReworkText(e.target.value)} />
                  <button style={styles.addInlineBtn} onClick={() => onAddRework(v.id)}>Ekle</button>
                </div>
              )}
            </div>
          )
        ))}

        {addingTo === konum && (
          <div style={styles.reportAddForm} className="no-print">
            <input style={{ ...styles.mainInput, maxWidth: 80 }} placeholder="Araç No" value={vehForm.no} onChange={e => setVehForm(f => ({ ...f, no: e.target.value }))} />
            <select style={{ ...styles.selectInput, maxWidth: 160 }} value={vehForm.asama} onChange={e => setVehForm(f => ({ ...f, asama: e.target.value }))}>
              {stages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input style={styles.mainInput} placeholder="Detay" value={vehForm.detay} onChange={e => setVehForm(f => ({ ...f, detay: e.target.value }))} />
            <input type="date" style={{ ...styles.mainInput, maxWidth: 140 }} value={vehForm.tarih} onChange={e => setVehForm(f => ({ ...f, tarih: e.target.value }))} />
            <button style={styles.addInlineBtn} onClick={onAdd}>Ekle</button>
            <button style={styles.ghostBtn} onClick={onCancelAdd}>Vazgeç</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailedReportView({ tasks, modules }) {
  const moduleLabel = (id) => modules.find(m => m.id === id)?.label || id;
  const [personFilter, setPersonFilter] = useState("hepsi");
  const [titleQuery, setTitleQuery] = useState("");
  const people = Array.from(new Set(tasks.map(t => t.sorumlu).filter(Boolean))).sort();
  const filtered = tasks.filter(t =>
    (personFilter === "hepsi" || t.sorumlu === personFilter) &&
    (titleQuery.trim() === "" || t.baslik.toLowerCase().includes(titleQuery.trim().toLowerCase()))
  );

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Detaylı Rapor</h1><button style={styles.printBtn} className="no-print" onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }} className="no-print">
        <select style={{ ...styles.selectInput, maxWidth: 220 }} value={personFilter} onChange={e => setPersonFilter(e.target.value)}>
          <option value="hepsi">Tüm Kişiler</option>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input style={{ ...styles.mainInput, maxWidth: 260 }} placeholder="Başlığa göre ara..." value={titleQuery} onChange={e => setTitleQuery(e.target.value)} />
        <span style={{ fontSize: 11, color: "#94A3B8", alignSelf: "center" }}>{filtered.length} / {tasks.length} kayıt</span>
      </div>

      <div style={styles.yearEndTableCard} id="print-area">
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Modül</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Öncelik</th><th style={styles.th}>Vade</th><th style={styles.th}>Durum</th></tr></thead>
          <tbody>{filtered.map(t => (<tr key={t.id} style={styles.tr}><td style={styles.td}>{t.kod}</td><td style={styles.tdTitle}>{t.baslik}</td><td style={styles.td}>{moduleLabel(t.module)}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.oncelik || "—"}</td><td style={styles.td}>{fmtDate(t.vade)}</td><td style={styles.td}>{KANBAN_STAGES.find(s => s.id === t.durum)?.label || t.durum}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPermissionsView({ usersList, setUsersList, modules, setModules, contacts, setContacts }) {
  const [showModal, setShowModal] = useState(false);
  const [editingModules, setEditingModules] = useState(() => Object.fromEntries(modules.map(m => [m.id, m.label])));
  const [newModuleLabel, setNewModuleLabel] = useState("");
  const [newContactName, setNewContactName] = useState("");

  const saveModuleLabel = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, label: (editingModules[id] || m.label).trim() || m.label } : m));
  };

  const slugify = (s) => {
    const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
    let out = s.split("").map(ch => map[ch] || ch).join("").toLowerCase();
    out = out.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return out || "modul";
  };

  const addModule = () => {
    const label = newModuleLabel.trim();
    if (!label) return;
    let id = slugify(label);
    let n = 2;
    while (modules.some(m => m.id === id)) { id = `${slugify(label)}_${n}`; n++; }
    setModules([...modules, { id, label }]);
    setNewModuleLabel("");
  };

  const removeModule = (id) => {
    if (modules.length <= 1) { window.alert("En az bir modül kalmalı."); return; }
    if (window.confirm("Bu modülü silmek istediğinize emin misiniz? Modüldeki mevcut görevler silinmez ama nav'dan erişilemez hale gelir.")) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const addContact = () => {
    const n = newContactName.trim();
    if (!n) return;
    if (usersList.some(u => u.name === n) || contacts.includes(n)) { window.alert("Bu isim zaten kayıtlı."); return; }
    setContacts([...contacts, n]);
    setNewContactName("");
  };

  const removeContact = (n) => {
    if (window.confirm(`"${n}" adını kişi listesinden silmek istediğinize emin misiniz? Bu kişiye daha önce atanmış görevler etkilenmez, sadece öneri listesinden kalkar.`)) {
      setContacts(contacts.filter(c => c !== n));
    }
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Admin Paneli</h1><button style={styles.primaryActionBtn} onClick={() => setShowModal(true)}>Kullanıcı Ekle</button></div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 4 }}>Kişiler (Üye Olmayan)</h3>
        <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 12 }}>Sisteme giriş yapamayan ama görev atayabileceğiniz iş arkadaşlarınız. Bir görev formunda yeni bir isim yazdığınızda buraya otomatik eklenir.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {contacts.length === 0 && <span style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>Henüz kişi yok.</span>}
          {contacts.map(c => (
            <span key={c} style={styles.chip}>{c} <X size={11} style={{ cursor: "pointer" }} onClick={() => removeContact(c)} /></span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...styles.mainInput, flex: 1 }} placeholder="Yeni kişi adı..." value={newContactName} onChange={(e) => setNewContactName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addContact()} />
          <button style={styles.addInlineBtn} onClick={addContact}>+ Ekle</button>
        </div>
      </div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Modüller</h3>
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
                <Trash2 size={14} color="#EF4444" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => removeModule(m.id)} />
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <input style={{ ...styles.mainInput, flex: 1 }} placeholder="Yeni modül adı..." value={newModuleLabel} onChange={(e) => setNewModuleLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addModule()} />
            <button style={styles.addInlineBtn} onClick={addModule}>+ Ekle</button>
          </div>
        </div>
      </div>

      <div style={styles.yearEndTableCard}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Üyelik Yönetimi</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Adı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>Araç Akış Takibi</th><th style={styles.th}>İşlem</th></tr></thead>
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
                  {u.role === "admin" ? (
                    <span style={{ fontSize: 11, color: "#5FAE7B" }}>Admin (her zaman görür)</span>
                  ) : (
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer" }}>
                      <input type="checkbox" checked={!!u.canViewReports} onChange={(e) => setUsersList(usersList.map(x => x.id === u.id ? { ...x, canViewReports: e.target.checked } : x))} />
                      Görebilir
                    </label>
                  )}
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
        <form onSubmit={e => { e.preventDefault(); onSave({ id: uid(), name, username, password, role, status: "approved", canViewReports: false }); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
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
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: "#F59E0B" }}>Karea Asistan</h1>
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
  addChipBtnSolid: { display: "flex", alignItems: "center", gap: 4, background: "#212934", border: "1px solid #F59E0B", color: "#F59E0B", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  quickActionBtn: { display: "flex", alignItems: "center", gap: 6, background: "#1E293B", border: "1px solid #334155", color: "#CBD5E1", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
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
  chip: { background: "#0F172A", border: "1px solid #334155", borderRadius: 20, padding: "4px 8px 4px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 },
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