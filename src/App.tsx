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
const FABRIKA1_STAGES = ["Lift", "EOL", "Sürüş Testi", "EE Kontrol"];
const DEPO_STAGES = ["Sürüş Testi", "Sızdırmazlık Testi", "Final Kontrol", "EE Kontrol", "Serbestlik"];
const KONUM_META = { fabrika1: { label: "Fabrika 1", color: "#38BDF8" }, depo: { label: "Depo", color: "#F59E0B" } };

// KY.FR-17 E/E Kontrol Formu Balçık — Depo akışında 'EE Kontrol' aşamasındaki
// araçlara uygulanan gerçek kontrol maddeleri.
const EE_KONTROL_ITEMS = [
  "Sağ Sol Dönüş Sinyali",
  "Gündüz Farı Kontrol",
  "Licance Plate Kontrol",
  "Low Beam",
  "High Beam",
  "FOG Light",
  "Reverse Gear Light",
  "Reverse Radar",
  "Reverse Park Sensor",
  "Hand Brake",
  "Sağ Sol Cam Açma Kapama",
  "Sağ Sol Kapı Kilit Sistemi Kontrol",
  "Arka Bagaj Kilit Sistemi Kontrol",
  "Dashboard Dörtlü Sinyal Kontrol",
  "Dashboard Kilit Butonu Kontrol",
  "Wiper System Kontrol Speed 1 / Speed 2",
  "Washer system control",
  "HVAC Blower Kotnrol",
  "HVAC PTC Isıtıcı",
  "HVAC A/C Kontrol",
  "HVAC Kanal Değişimi Kontrol",
  "Vites Geçiş Kontrolleri (P/R/N/D)",
  "Vakum Pompası Vakum Booster Kontrol",
  "Speaker Kontrol",
  "Araç Şarj Testi",
  "Araç Sürüş Testi",
  "Regenerative Brake Testi On Off",
  "ECO SPORT Mode Geçiş Kontrol",
];

// KY.FR-19 Final Kalite Kontrol Formu — Depo akışında 'Final Kontrol'
// aşamasındaki araçlara uygulanan gerçek kontrol maddeleri, bölümlere göre.
const FINAL_KONTROL_SECTIONS = [
  { title: "KIMLIK & EVRAK", items: ["Şasi ve seri numarası okunaklı ve doğru", "Model ve versiyon etiketi doğru", "Sevkiyat evrakları, irsaliye ve teslim formu hazır", "Kullanım kılavuzu ve garanti dokümanı mevcut", "Anahtar, uzaktan kumanda ve aksesuar seti tam"] },
  { title: "DIŞ GÖRÜNÜŞ", items: ["Boya yüzeyi homojen, portakal kabuğu, akma ve kabarcık yok", "Çizik, göçük ve deformasyon yok", "Keskin kenar ve çapak yok", "Panel boşlukları dengeli ve simetrik", "Logolar ve etiketler düzgün yapışmış ve hizalı", "Cam ve pleksi yüzeylerde çatlak veya kırık yok", "Silecekler ve cam suyu sistemi tam fonksiyonlu çalışıyor", "Aynalar sorunsuz ayarlanabiliyor", "Far konumlandırması"] },
  { title: "KAPILAR", items: ["Kapılar düzgün kapanıyor ve açılıyor", "Cam açma ve kapama mekanizmaları sorunsuz çalışıyor", "Kapı menteşe bağlantıları sağlam ve gevşeklik yok", "Kapı kilit mekanizması çalışıyor", "Kapı fitilleri düzgün ve kopuk değil", "Kapı boşluk ve hiza uyumu standartlar dahilinde"] },
  { title: "İÇ DONANIM", items: ["Koltuklar sabit ve sağlam", "Emniyet kemerleri mevcut ve mekanizması çalışır durumda", "Trim parçalarında kırık ve çatlak yok", "Keskin kenar ve dışarı çıkan vida yok", "Klima ve havalandırma sistemi fonksiyonel çalışıyor", "Multimedya ve bilgi ekranları sorunsuz çalışıyor", "Pedallar, kollar ve mandallar serbest hareket ediyor"] },
  { title: "MEKANIK", items: ["Tekerlek bijonları sabit ve gevşeklik yok", "Lastiklerde hasar yok ve basınç seviyeleri uygun", "Süspansiyon bağlantılarında gevşeklik yok", "Direksiyon boşluğu standart limitler dahilinde", "Fren sistemi statik olarak çalışıyor", "Fren hortum ve hatlarında sıvı kaçağı yok", "Alt takımda sürtme ve temas izi yok"] },
  { title: "ELEKTRIK", items: ["Kontak ve ana güç sistemi çalışıyor", "Kısa ve uzun farlar çalışıyor", "Sağ ve sol sinyaller çalışıyor", "Stop lambaları çalışıyor", "Geri vites ikaz sistemi çalışıyor", "Korna ve dış uyarı sesi çalışıyor", "Gösterge paneli uyarı ışıkları eksiksiz çalışıyor", "Şarj soketi ve koruyucu kapağı sağlam"] },
  { title: "FONKSIYON", items: ["İleri ve geri hareket komutu doğru", "Hızlanma tepkisi standartlara uygun", "Rejeneratif ve elektronik frenleme normal", "Park freni sistemi çalışıyor"] },
  { title: "YOL TESTI", items: ["Düz yolda doğrusal ilerleme sağlanıyor", "Frenleme sırasında araca sapma etkisi yok", "Dönüşlerde anormal mekanik ses yok", "Titreşim ve rezonans değerleri standartlar dahilinde", "Sürüş sırasında panelde uyarı veya arıza ışığı yanmıyor"] },
  { title: "SEVKIYAT", items: ["Araç iç ve dış temizliği sevk standartlarına uygun", "Koruyucu ambalaj ve kaplama doğru uygulanmış", "Sevkiyat etiketi ve yönlendirme işaretleri uygun", "Şarj seviyesi son kullanıcı teslimatı için yeterli seviyede", "Odo Kontrol"] },
];
// Kanban görünümü için Fabrika 1 + Depo aşamalarının tamamı tek bir sıralı
// sütun listesi olarak — her sütun konum+aşama ikilisiyle tanımlanır çünkü
// "Sürüş Testi" ve "EE Kontrol" her iki konumda da var.
const ARAC_KANBAN_COLUMNS = [
  ...FABRIKA1_STAGES.map((asama) => ({ konum: "fabrika1", asama })),
  ...DEPO_STAGES.map((asama) => ({ konum: "depo", asama })),
];

// Sol menüdeki "Toplantı Yönetimi" grubunun altında toplanan modüller —
// bunlar hâlâ normal modül/Kanban sistemidir, sadece menüde tek bir açılır
// başlığın altında görünürler.
const TOPLANTI_MODULE_IDS = ["asakai", "iyilestirme", "kalite_kontrol", "tedarik_kalite"];

// Fabrika Kontrol / Depo Kontrol — form altyapısı henüz gelmedi, şimdilik
// menüde yer tutucu sayfalar olarak duruyorlar. Formlar geldiğinde bu
// listeler gerçek veri yapılarına dönüştürülecek.
const FABRIKA_KONTROL_ITEMS = [
  { id: "fk-istasyon-1", label: "İstasyon 1 — Şasi ve Komponent İzlenebilirliği" },
  { id: "fk-istasyon-2", label: "İstasyon 2 — İç Trim ve Yönlendirme" },
  { id: "fk-istasyon-3", label: "İstasyon 3 — Gövde İzolasyon ve Kilit" },
  { id: "fk-istasyon-4", label: "İstasyon 4 — Cam Montajı ve Sızdırmazlık" },
  { id: "fk-ee", label: "İstasyon 5 — EE Kontrolleri" },
  { id: "fk-istasyon-5", label: "İstasyon 6 — Görsel Kalite (Gap & Flush)" },
  { id: "fk-istasyon-6", label: "İstasyon 7 — Ön Montaj ve Hazırlık" },
  { id: "fk-suruş", label: "İstasyon 8 — EOL (Hat Sonu) ve Dinamik Testler" },
];
const DEPO_KONTROL_ITEMS = [
  { id: "dk-suruş", label: "Sürüş Testi" },
  { id: "dk-sizdirmazlik", label: "Sızdırmazlık Testi" },
  { id: "dk-ee", label: "EE Kontrol" },
  { id: "dk-final", label: "Final Kontrol" },
];

// KY.FR-18 E/E Kontrol Formu Şube — Fabrika 1 EE Kontrol aşamasındaki araç için
// bölümlere ayrılmış (Uygun/Uygun Değil değerlendirmeli) kontrol maddeleri.
const EE_KONTROL_SUBE_SECTIONS = [
  { title: "Kontrol Ünitesi", items: ["EPS (CAL) Güncellendi mi?", "VCU Domain SW Güncellendi mi?", "VCU GW SW Güncellendi mi?", "BMS SW Güncellendi mi?", "MCU SW Güncellendi mi?", "MHU SW Güncellendi mi?", "BCM SW Güncellendi mi?", "VCU VIN Güncellemesi Güncellendi mi?"] },
  { title: "Kontrol Edilecek", items: ["Sağ Sol Dönüş Sinyali", "Gündüz Farı Kontrol", "Licance Plate Kontrol", "Low Beam", "High Beam", "FOG Light", "Reverse Gear Light", "Reverse Radar", "Reverse Park Sensor", "Hand Brake", "Sağ Sol Cam Açma Kapama", "Sağ Sol Kapı Kilit Sistemi Kontrol", "Arka Bagaj Kilit Sistemi Kontrol", "Dashboard Dörtlü Sinyal Kontrol", "Dashboard Kilit Butonu Kontrol", "Wiper System Kontrol Speed 1 / Speed 2", "Washer system control", "HVAC Blower Kotnrol", "HVAC PTC Isıtıcı", "HVAC A/C Kontrol", "HVAC Kanal Değişimi Kontrol", "Vites Geçiş Kontrolleri (P/R/N/D)", "Vakum Pompası Vakum Booster Kontrol", "Speaker Kontrol", "Araç Şarj Testi", "Araç Sürüş Testi", "Regenerative Brake Testi On Off", "ECO SPORT Mode Geçiş Kontrol"] },
  { title: "Ground Resistance Ölçümü", items: ["MCU Ground Resistance (< 0.1 Ω @ ≥0.2A)", "e-Motor Ground Resistance (< 0.1 Ω @ ≥0.2A)", "3in1 Ground Resistance (< 0.1 Ω @ ≥0.2A)", "AC Ground Resistance (< 0.1 Ω @ ≥0.2A)", "HV Battery Ground Resistance (< 0.1 Ω @ ≥0.2A)"] },
  { title: "Connector Resistance Ölçümü", items: ["Battery Connector (+) (>500 Ω/V, Karea Fit: >50.000 Ω)", "Battery Connector (-) (>500 Ω/V, Karea Fit: >50.000 Ω)", "3 in 1 PTC Connector (+) (>500 Ω/V, Karea Fit: >50.000 Ω)", "3 in 1 PTC Connector (-) (>500 Ω/V, Karea Fit: >50.000 Ω)", "3 in 1 AC Connector (+) (>500 Ω/V, Karea Fit: >50.000 Ω)", "3 in 1 AC Connector (-) (>500 Ω/V, Karea Fit: >50.000 Ω)"] },
];

// KY.FR-13 EOL Sürüş Test Kartı — Fabrika 1 Sürüş Testi aşamasındaki araç için
// bölümlere ayrılmış (Uygun/Uygun Değil değerlendirmeli) kontrol maddeleri.
const SURUS_TEST_SECTIONS = [
  { title: "Soğuk Sıkma Testi", items: ["N'de aracı ittir — Anormal direnç var mı?", "D'de gaz ver — Araç normal hızlanıyor mu? Sıkma hissi veya anormal ses var mı?", "R'de gaz ver — Geri viteste normal hızlanıyor mu? Sıkma hissi veya anormal ses var mı?"] },
  { title: "BCM / EE Fonksiyon Kontrolü", items: ["Dış aydınlatma — Kısa, uzun, selektör, park, sis, sol/sağ sinyal, dörtlü, stop, geri vites lambası.", "Korna — Ses seviyesi ve çalışması normal mi?", "Camlar — Tüm camlar açılıp kapanıyor mu? Takılma, yavaşlık veya ses var mı?", "Merkezi kilit & kapılar — İçeriden ve anahtarla dışarıdan kilitle-aç. Her kapıda doğru çalışıyor mu?", "Aynalar & iç donanım — Aynalar, IP kapakları, emniyet kemeri kapakları, düğmeler ve trim parçaları normal mi?", "Emniyet kemerleri — Tokalar çalışıyor mu? Kemer düzgün sarıyor mu? Uyarı sesi/ikonu doğru mu?", "El freni (KRİTİK) — El frenini çek → hafif gaz ver → araç ilerlemeye çalışıyor mu? Kayma varsa video + SOC% + saat.", "Vites seçimi — P/R/N/D geçişlerinde gecikme, yanlış gösterim veya kararsızlık var mı?", "Ana ekran / menüler — Tüm menülerde düğmelere tek tek bas. Donma, sıfırlanma veya gecikme var mı?", "Geri görüş kamerası — R'ye alınca görüntü geliyor mu? Görüntü temiz mi?", "Klima & havalandırma — Fan 1-2-3, yüze/cama üfleme, iç hava dolaşımı, A/C, ısıtma/soğutma.", "Odometre — Sürüş öncesi değeri not et. Sürüş sonrası doğru sayıyor mu? Aracı kapatıp açınca kaldığı yerden devam ediyor mu?"] },
  { title: "Sürüş Testi (~3.500m Sabit Güzergah)", items: ["Düşük hız — 500m, 0→30 km/s. Titreme, silkelenme, anormal ses, çekişte kararsızlık var mı? Trim/tavan/torpido/kapı/cam sesi var mı?", "Fren — 30→0 x5 (~300m). Her frenlemede sağa/sola ekstrem çekme var mı? Anormal pedal, ses veya titreşim var mı?", "Sürekli frenleme — Dur-kalk min. 20x (~600m). Pedal sertleşmesi/boşalması, performans düşüşü veya koku var mı?", "Fren — 50→0 x5 (~400m). Her frenlemede sağa/sola ekstrem çekme var mı? Anormal pedal, ses, titreşim veya koku var mı?", "Fren — 90→0 / 80→0 / 70→0 (~500m). Her frenlemede sağa/sola ekstrem çekme var mı? Performans düşüşü veya koku var mı?", "Son hıza ulaşma (~600m) — ECO modda 90 km/s'ye ulaşıyor mu? SPORT modda 90 km/s'ye ulaşıyor mu?", "Yokuş çıkış + iniş (~400m) — Çıkışta geri kaçırma, çekiş düşmesi var mı? İnişte rejen açık/kapalı davranışı normal mi?", "Yokuş el freni (KRİTİK) — Yokuşta en az 6 kez kaydır-tut. El freni çek → hafif gaz → kayıyor mu? Kayma varsa video + SOC% + saat.", "N'de yokuş fren testi (~100m) — Yokuş aşağı N'de fren yap, bırak. Araç kendi kendine hareket ediyor mu?"] },
  { title: "Fren Onay", items: ["Düşük hız fren genel — 30→0 testlerinde tutarlı performans sağlandı mı?", "Orta hız fren genel — 50→0 testlerinde tutarlı performans sağlandı mı?", "Yüksek hız fren genel — 90/80/70→0 testlerinde tutarlı performans sağlandı mı?", "FRENLERDE SIKMA VAR MI? (KRİTİK) — Anormal direnç, tek taraflı ısınma, koku veya sürtünme hissi var mı? Varsa video + foto + saat.", "Nihai Fren Onayı — Tüm fren testleri tamamlandı, anormal bulgu yok mu?"] },
  { title: "Rot Onay", items: ["Rot ayarı — Düz/eğimsiz yolda direksiyonu bırak. Araç sola veya sağa çekiyor mu?", "Direksiyon merkezi — Düz gidişte direksiyon tam ortada mı? Belirgin sapma varsa foto + not al.", "Yüksek hızda kararlılık — 70-90 km/s'de araç düz gidiyor mu? Çekme veya titreşim var mı?"] },
  { title: "Sıcak Sıkma Testi (Sürüş Sonrası)", items: ["Sol ön disk — Elini yaklaştır (dokunma). Diğer disklere kıyasla belirgin sıcak mı? Sıcaksa sıkma şüphesi; foto + not al.", "Sağ ön disk — Aynı kontrol. Belirgin şekilde sıcak mı?", "Sol arka disk — Aynı kontrol. Belirgin şekilde sıcak mı?", "Sağ arka disk — Aynı kontrol. Belirgin şekilde sıcak mı?", "N'de aracı ittir — Soğuk teste kıyasla artan direnç var mı? Isınma ile kötüleşiyorsa sıkma kesindir."] },
  { title: "Mühendis & Kalite Kontrolü", items: ["Kapı / Kaput ayarı — Görsel kontrol. Fotoğraf ilet.", "Boya kalitesi — Görsel kontrol. Fotoğraf ilet.", "Trim & Bagaj — İç trim, dış trim düzgün mü? Bagaj yüksekliği doğru mu?", "Tam dönüş kontrolü — Düşük hızda tam sağ/sol manevra. Sürtme, vuruntu veya aks sesi var mı?", "DTC / Diyagnostik tarama — Aktif veya geçmiş hata varsa kayıt altına al. Tarama bitiş saatini not et.", "Mühendis Nihai Onayı"] },
];

// L6-L7 üretim hattı montaj istasyonları — kullanıcının paylaştığı teknik

// şartnameden işlendi. tip: 'check' (Uygun/Uygun Değil), 'tork' (Nm değeri +

// zorunlu Markalama onayı) veya 'metin' (serbest giriş, örn. VIN/barkod).

const ISTASYON_1_SASI_ITEMS = [
  { id: uid(), text: "Şasi (VIN) Numarası — manuel giriş / barkod ile doğrulama", tip: "metin", torkNm: null },
  { id: uid(), text: "Motor Numarası (komponent eşleştirme)", tip: "metin", torkNm: null },
  { id: uid(), text: "Batarya Numarası (komponent eşleştirme)", tip: "metin", torkNm: null },
  { id: uid(), text: "MCU Ünite Barkodu (komponent eşleştirme)", tip: "metin", torkNm: null },
  { id: uid(), text: "Chogori şarj kablosu bağlantısı yapıldı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Termal güvenlik kontrolü yapıldı mı?", tip: "check", torkNm: null },
];

const ISTASYON_2_TRIM_ITEMS = [
  { id: uid(), text: "Koltuk montajı öncesi oto servis kılıfları (imperteks/bez) takıldı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Kızak cıvataları standart torkla sıkıldı mı?", tip: "tork", torkNm: null },
  { id: uid(), text: "Direksiyon mili hizalaması yapıldı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Direksiyon mili kilitlendi mi?", tip: "check", torkNm: null },
];

const ISTASYON_3_GOVDE_ITEMS = [
  { id: uid(), text: "Tavan sacı çatlak önleyici Henkel yapıştırıcı standart spesifikasyona göre uygulandı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Kapı kilit montaj modifikasyonları tamamlandı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Kapı kilitleri test edildi mi?", tip: "check", torkNm: null },
];

const ISTASYON_4_CAM_ITEMS = [
  { id: uid(), text: "Yan cam E-mark sertifikasyon kodu (sisteme işlenecek)", tip: "metin", torkNm: null },
  { id: uid(), text: "Kelebek cam E-mark sertifikasyon kodu (sisteme işlenecek)", tip: "metin", torkNm: null },
  { id: uid(), text: "Cam fitilleri sızdırmazlık testine hazır mı? (görsel onay)", tip: "check", torkNm: null },
  { id: uid(), text: "Birleşim yerleri sızdırmazlık testine hazır mı? (görsel onay)", tip: "check", torkNm: null },
];

const ISTASYON_5_GORSEL_ITEMS = [
  { id: uid(), text: "Gap & Flush — kapı/çamurluk/bagaj kapağı boşluk ve yüzey ölçüm değerleri (kumpas)", tip: "metin", torkNm: null },
  { id: uid(), text: "Görsel kontrol — boya/kaporta çizik veya hata var mı? Rötuş onayı yapıldı mı?", tip: "check", torkNm: null },
];

const ISTASYON_6_ONMONTAJ_ITEMS = [
  { id: uid(), text: "Ön Destek Braketi: M8 cıvata/somun torklandı mı?", tip: "tork", torkNm: 20 },
  { id: uid(), text: "Akü Montajı: Akü kutup başı cıvataları torklanıp Molykote sürüldü mü?", tip: "tork", torkNm: 4 },
  { id: uid(), text: "Akü Montajı: Negatif (-) kablo lift için boşta bırakıldı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Klima Sistemi: Fan cıvataları torklandı mı?", tip: "tork", torkNm: 25 },
  { id: uid(), text: "Klima Sistemi: 250 gr gaz ve 0.10 ml PAG yağı dolumu yapılıp çıktı araca bantlandı mı?", tip: "check", torkNm: null },
  { id: uid(), text: "Ön Tampon & Kaput: Üst M8 cıvatalar torklandı mı?", tip: "tork", torkNm: 20 },
  { id: uid(), text: "Ön Tampon & Kaput: Alt/üst M6 cıvatalar torklandı mı?", tip: "tork", torkNm: 8 },
  { id: uid(), text: "Ön Tampon & Kaput: Kaput ayarı (Gap & Flush) yapılıp kilit mili sabitlendi mi?", tip: "check", torkNm: null },
  { id: uid(), text: "Silecek & Su Yolu: Silecek kilit somunları torklandı mı?", tip: "tork", torkNm: 15 },
  { id: uid(), text: "Silecek & Su Yolu: 9 adet sızdırmazlık keçesi takılıp nozullar kilitlendi mi?", tip: "check", torkNm: null },
  { id: uid(), text: "Davlumbaz & Tekerlek: Ön/arka davlumbaz vidaları torklandı mı?", tip: "tork", torkNm: 8 },
  { id: uid(), text: "Davlumbaz & Tekerlek: 4 bijon takılıp boşlukları alındı mı?", tip: "check", torkNm: null },
];

// Fabrika 1 EE Kontrol / Sürüş Testi araç bazlı kanban formuna taşındı
// (bkz. VehicleChecklistModal) — o iki istasyon burada yer almıyor.
// EOL Kontrol için doğru form henüz gelmedi, boş/düzenlenebilir kalıyor.
const STATION_SEED_TEMPLATES = {
  "fk-istasyon-1": ISTASYON_1_SASI_ITEMS,
  "fk-istasyon-2": ISTASYON_2_TRIM_ITEMS,
  "fk-istasyon-3": ISTASYON_3_GOVDE_ITEMS,
  "fk-istasyon-4": ISTASYON_4_CAM_ITEMS,
  "fk-istasyon-5": ISTASYON_5_GORSEL_ITEMS,
  "fk-istasyon-6": ISTASYON_6_ONMONTAJ_ITEMS,
};

// Yönetilebilir üyelik/izin sistemi — her sekme (nav öğesi) burada bir
// "sectionId" ile tanımlı. Admin, her kullanıcı için bu id'lerden hangisini
// görüp çalışabileceğini Admin Panel > İzinler'den seçer. Sabit olmayan
// gruplar (Kalite Güvence, Toplantı Yönetimi altındaki modüller) admin
// tarafından eklenip çıkarılabildiği için "modules" state'inden dinamik
// üretilir — bkz. getAllSectionIds / buildPermissionGroups.
const GENEL_SEKMELER = [
  { id: "dashboard", label: "Dashboard" },
  { id: "todo", label: "To-Do List" },
  { id: "raporlar", label: "Araç Akış Takibi" },
  { id: "grafik_yonetimi", label: "Grafik Yönetimi" },
  { id: "fabrika_kontrol_akis", label: "Fabrika Kontrol" },
];

// Uygunsuzluk Yönetimi — açılır grup, 3 alt sayfa.
const UYGUNSUZLUK_YONETIMI_ITEMS = [
  { id: "uygunsuzluk_liste", label: "Uygunsuzluk Listesi" },
  { id: "uygunsuzluk_hata_kodlari", label: "Hata Kodları" },
  { id: "uygunsuzluk_istatistik", label: "Uygunsuzlukların İstatistiği" },
];

const getAllSectionIds = (modules) => [
  ...GENEL_SEKMELER.map(s => s.id),
  ...modules.map(m => m.id),
  ...DEPO_KONTROL_ITEMS.map(i => i.id),
  ...UYGUNSUZLUK_YONETIMI_ITEMS.map(i => i.id),
];

const buildPermissionGroups = (modules) => [
  { title: "Genel", items: GENEL_SEKMELER },
  { title: "Modüller", items: modules.filter(m => !TOPLANTI_MODULE_IDS.includes(m.id)).map(m => ({ id: m.id, label: m.label })) },
  { title: "Toplantı Yönetimi", items: modules.filter(m => TOPLANTI_MODULE_IDS.includes(m.id)).map(m => ({ id: m.id, label: m.label })) },
  { title: "Depo Kontrol", items: DEPO_KONTROL_ITEMS },
  { title: "Uygunsuzluk Yönetimi", items: UYGUNSUZLUK_YONETIMI_ITEMS },
];

// Örnek/demo kullanıcılar (Ahmet Yılmaz, Selin Yıldız) kaldırıldı. Sistem
// artık sadece admin hesabıyla başlıyor; gerçek ekip üyeleri Admin
// Panel > "Kullanıcı Ekle" ile eklenmeli.
const INITIAL_USERS = [
  { id: "usr-admin", username: "admin", password: "0000", name: "Muharrem DELİKTAŞ", role: "admin", status: "approved" }
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
    id: "rpt-2026-08-25",
    seq: 36,
    baslik: "Gün Sonu Kalite Kontrol ve Araç Durum Raporu",
    tarih: "2026-08-25",
    hazirlayan: "Kalite Güvence Yönetimi (K-QN)",
    bolum: "Fabrika 1 & Depo Takip",
    sonDurumOzeti: "Yeni Eklenenler/Güncellenenler: #149, #151, #152, #153 şubeye eklendi.\\nHazır Durumdakiler: #148 ve #150 numaralı araçlar hazır.\\nDepoda Rework Devam Eden Araçlar: #136, #137, #138",
    araclar: [
      { id: "veh25-1", no: "140", konum: "fabrika1", asama: "Lift", detay: "Liftte.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-2", no: "141", konum: "fabrika1", asama: "EOL", detay: "Rot ayarı yapılacak. Spoiler darbeden dolayı boyahaneye girecek.", tarih: "2026-08-25", reworklar: [{ id: "rw-2", text: "Rework / Boya Bekliyor — spoiler darbe hasarı", tarih: "2026-08-25" }] },
      { id: "veh25-3", no: "142", konum: "fabrika1", asama: "EOL", detay: "Rot ayarı yapılacak. Direksiyon çerçeve çizik, yapıştırıcı taşması. Spoiler darbeden dolayı boyahaneye girecek.", tarih: "2026-08-25", reworklar: [{ id: "rw-3", text: "Rework / Boya Bekliyor — spoiler darbe hasarı, direksiyon çerçeve çizik", tarih: "2026-08-25" }] },
      { id: "veh25-4", no: "146", konum: "fabrika1", asama: "EOL", detay: "Rot ayarı ve frenleme motoru yapılacak.", tarih: "2026-08-25", reworklar: [{ id: "rw-4", text: "Rework — rot ayarı ve frenleme motoru", tarih: "2026-08-25" }] },
      { id: "veh25-5", no: "147", konum: "fabrika1", asama: "EOL", detay: "Rot ayarı yapılacak.", tarih: "2026-08-25", reworklar: [{ id: "rw-5", text: "Rework — rot ayarı", tarih: "2026-08-25" }] },
      { id: "veh25-6", no: "148", konum: "fabrika1", asama: "EE Kontrol", detay: "Araç hazır.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-7", no: "149", konum: "fabrika1", asama: "EOL", detay: "Rot ayarı yapılacak.", tarih: "2026-08-25", reworklar: [{ id: "rw-7", text: "Rework — rot ayarı", tarih: "2026-08-25" }] },
      { id: "veh25-8", no: "150", konum: "fabrika1", asama: "EE Kontrol", detay: "Araç hazır.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-9", no: "151", konum: "fabrika1", asama: "EOL", detay: "Şarj testi bekliyor, görsel kontrol yapılacak.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-10", no: "152", konum: "fabrika1", asama: "Sürüş Testi", detay: "Görsel kontrol yapıldı, sürüş testi yapılacak. Şarj testi bekliyor.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-11", no: "153", konum: "fabrika1", asama: "Lift", detay: "Araç liftte.", tarih: "2026-08-25", reworklar: [] },
      { id: "veh25-12", no: "136", konum: "depo", asama: "Final Kontrol", detay: "Final kontrol edildi. Sol fren park stop içi buharlaşma mevcut. Tamir işlemi bekliyor (Serbest bırakılmadı).", tarih: "2026-08-25", reworklar: [{ id: "rw-12", text: "Final Kontrol NOK — sol fren park stop içi buharlaşma", tarih: "2026-08-25" }] },
      { id: "veh25-13", no: "137", konum: "depo", asama: "Final Kontrol", detay: "Final kontrol edildi. Silecek ses yapıyor çalışırken. Tamir işlemi bekliyor (Serbest bırakılmadı).", tarih: "2026-08-25", reworklar: [{ id: "rw-13", text: "Final Kontrol NOK — silecek ses yapıyor", tarih: "2026-08-25" }] },
      { id: "veh25-14", no: "138", konum: "depo", asama: "Sızdırmazlık Testi", detay: "Bagaj su kaçağı giderildi. Sağ kapı üst tavan su kaçağı devam ediyor. Tamir işlemleri bekliyor.", tarih: "2026-08-25", reworklar: [{ id: "rw-14", text: "Sızdırmazlık NOK — sağ kapı üst tavan su kaçağı devam ediyor", tarih: "2026-08-25" }] },
      { id: "veh25-15", no: "135", konum: "depo", asama: "Serbestlik", detay: "Final kontrol edildi ve serbest bırakıldı.", tarih: "2026-08-24", reworklar: [] },
      { id: "veh25-16", no: "144", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri yapıldı ve serbest bırakıldı.", tarih: "2026-08-24", reworklar: [] },
      { id: "veh25-17", no: "145", konum: "depo", asama: "Serbestlik", detay: "Final kontrol edildi ve serbest bırakıldı.", tarih: "2026-08-24", reworklar: [] },
      { id: "veh25-18", no: "163", konum: "depo", asama: "Serbestlik", detay: "Final kontrol edildi ve serbest bırakıldı.", tarih: "2026-08-24", reworklar: [] },
      { id: "veh25-19", no: "133", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-20", no: "129", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-21", no: "134", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-22", no: "124", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-23", no: "128", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-24", no: "126", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-25", no: "143", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-26", no: "139", konum: "depo", asama: "Serbestlik", detay: "Final kontrolleri tamamlanarak serbest bırakıldı.", tarih: "2026-08-21", reworklar: [] },
      { id: "veh25-27", no: "130", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, final kontrol edildi ve serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh25-28", no: "131", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri yapıldı, final yapıldı ve serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh25-29", no: "118", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-20", reworklar: [] },
      { id: "veh25-30", no: "127", konum: "depo", asama: "Serbestlik", detay: "Tamir işlemleri tamamlandı, final kontrol yapıldı ve serbest bırakıldı.", tarih: "2026-08-19", reworklar: [] },
      { id: "veh25-31", no: "132", konum: "depo", asama: "Serbestlik", detay: "Kapı kilit tamir edildi, final kontrol yapıldı ve serbest bırakıldı.", tarih: "2026-08-19", reworklar: [] },
      { id: "veh25-32", no: "120", konum: "depo", asama: "Serbestlik", detay: "EMC test aracı olarak serbest bırakıldı.", tarih: "2026-08-18", reworklar: [] },
      { id: "veh25-33", no: "122", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, tüm kontroller tamamlanarak serbest bırakıldı.", tarih: "2026-08-18", reworklar: [] },
      { id: "veh25-34", no: "108", konum: "depo", asama: "Serbestlik", detay: "Ön sol çamurluk ve kapı ayarı tamir işlemleri tamamlandı.", tarih: "2026-08-17", reworklar: [] },
      { id: "veh25-35", no: "107", konum: "depo", asama: "Serbestlik", detay: "Harness düzeltildi, E/E & Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh25-36", no: "121", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık ve eksik parçalar tamamlandı, serbest bırakıldı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh25-37", no: "123", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, E/E Check ve Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh25-38", no: "125", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, trim ayarları, modül ve Final kontrolleri tamamlandı.", tarih: "2026-08-14", reworklar: [] },
      { id: "veh25-39", no: "110", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, final kontrol edildi, olumsuzluk yok.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh25-40", no: "117", konum: "depo", asama: "Serbestlik", detay: "Ön tampon ve cam açıklık işlemleri yapıldı, final kontrol OK.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh25-41", no: "119", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık testi OK, final kontrol yapıldı.", tarih: "2026-08-12", reworklar: [] },
      { id: "veh25-42", no: "106", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı.", tarih: "2026-08-11", reworklar: [] },
      { id: "veh25-43", no: "116", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, Final kontrolü ve E/E Testi tamamlandı. Depoya giriş/park yapıldı.", tarih: "2026-08-11", reworklar: [] },
      { id: "veh25-44", no: "111", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh25-45", no: "112", konum: "depo", asama: "Serbestlik", detay: "Sürüş, sızdırmazlık ve E/E Check kontrolleri tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh25-46", no: "113", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, ön ızgara/silecek ayarları ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh25-47", no: "114", konum: "depo", asama: "Serbestlik", detay: "Radyatör değişimi, sızdırmazlık ve E/E Check tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh25-48", no: "115", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık, kaput montajı ve E/E Check kontrolleri tamamlandı.", tarih: "2026-08-10", reworklar: [] },
      { id: "veh25-49", no: "098", konum: "depo", asama: "Serbestlik", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh25-50", no: "130", konum: "depo", asama: "Serbestlik", detay: "Şenol Bey tarafından şartlı onay verildi ve serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh25-51", no: "104", konum: "depo", asama: "Serbestlik", detay: "Kalite kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh25-52", no: "109", konum: "depo", asama: "Serbestlik", detay: "Fren körüğü kaynak kaçağı giderildi, EE Check tamamlandı.", tarih: "2026-08-06", reworklar: [] },
      { id: "veh25-53", no: "102 (eski 108)", konum: "depo", asama: "Serbestlik", detay: "Şenol Bey şartlı onay verildi ve serbest bırakıldı.", tarih: "2026-08-07", reworklar: [] },
      { id: "veh25-54", no: "103", konum: "depo", asama: "Serbestlik", detay: "Spoiler yapıştırma, sızdırmazlık ve EE Check kontrolleri tamamlandı.", tarih: "2026-08-04", reworklar: [] },
      { id: "veh25-55", no: "097", konum: "depo", asama: "Serbestlik", detay: "Sol ayna değişimi yapıldı. Ton farkı durumu onaylandı.", tarih: "2026-08-03", reworklar: [] },
      { id: "veh25-56", no: "091", konum: "depo", asama: "Serbestlik", detay: "Sızdırmazlık ve EE Check kontrolleri tamamlandı.", tarih: "2026-08-01", reworklar: [] },
      { id: "veh25-57", no: "096", konum: "depo", asama: "Serbestlik", detay: "Final yapıldı, EPS ayarı, silecek ses ve fıskiye ayarları tamamlandı.", tarih: "2026-08-01", reworklar: [] },
      { id: "veh25-58", no: "095", konum: "depo", asama: "Serbestlik", detay: "Tüm kalite ve test kontrolleri tamamlandı, serbest bırakıldı.", tarih: "2026-08-01", reworklar: [] },
    ]
  },
  {
    id: "rpt-2026-08-22",
    seq: 34,
    baslik: "Gün Sonu Kalite Kontrol ve Araç Durum Raporu",
    tarih: "2026-08-22",
    hazirlayan: "Kalite Güvence Yönetimi (K-QN)",
    bolum: "Fabrika 1 & Depo Takip",
    sonDurumOzeti: "Şubedeki Yeni/Güncel Durumlar: #141, #146, #148 ve #150 numaralı araçlar şube listesine işlendi.\nTesti İlerleyen Araçlar (Sızdırmazlık OK ➔ EE Bekleyen): #135, #136, #137, #145, #163\nEE Tamamlanıp Final Bekleyen Araçlar: #144\nRework Devam Eden Araçlar: #138 (Su kaçağı devam ediyor, sealler uygulandı)",
    araclar: [
      { id: "veh-1", no: "141", konum: "fabrika1", asama: "Lift", detay: "Lifte alındı.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-2", no: "146", konum: "fabrika1", asama: "Sürüş Testi", detay: "Açık maddeler tamamlandı, vakum pompası sorunu giderildi. Sadece sürüş testi kaldı.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-3", no: "148", konum: "fabrika1", asama: "Sürüş Testi", detay: "Şarj testi OK. Sürüş testi yapılacak, görsel kusurlar gideriliyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-4", no: "150", konum: "fabrika1", asama: "EOL", detay: "Şarj testine girdi.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-5", no: "144", konum: "depo", asama: "Final Kontrol", detay: "Bagaj iç sağ üst plastik deforme (derin çizik). Arka bagaj logo takıldı. EE testi yapıldı, final kontrol yapılacak.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-6", no: "135", konum: "depo", asama: "EE Kontrol", detay: "Ön logo takıldı. Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-7", no: "136", konum: "depo", asama: "EE Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-8", no: "137", konum: "depo", asama: "EE Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-9", no: "138", konum: "depo", asama: "Sızdırmazlık Testi", detay: "Bagaj kilit su kaçağı devam ediyor. Sağ kapı üst iç tavan su kaçağı tespit edildi. Sealler işlemleri yapıldı, sızdırmazlık testi yapılacak.", tarih: "2026-08-22", reworklar: [{ id: "rw-9", text: "Su kaçağı devam ediyor, sealler uygulandı.", tarih: "2026-08-22" }] },
      { id: "veh-10", no: "145", konum: "depo", asama: "EE Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
      { id: "veh-11", no: "163", konum: "depo", asama: "EE Kontrol", detay: "Sızdırmazlık testi OK. EE testi bekleniyor.", tarih: "2026-08-22", reworklar: [] },
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
const DATA_VERSION = 5;

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

function NavGroup({ label, icon: Icon, isOpen, onToggle, children }) {
  return (
    <div>
      <button style={styles.navGroupHeader} onClick={onToggle}>
        <Icon size={15} color="#94A3B8" />
        <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
        <ChevronDown size={13} color="#64748B" style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.15s" }} />
      </button>
      {isOpen && <div style={styles.navGroupBody}>{children}</div>}
    </div>
  );
}

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
  const [stationData, setStationData] = useState({});
  const [fabrikaAkisi, setFabrikaAkisi] = useState({ araclar: [] });
  const [uygunsuzluklar, setUygunsuzluklar] = useState([]);
  const [hataKodlari, setHataKodlari] = useState([]);
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
  const [navExpanded, setNavExpanded] = useState({ toplanti: false, fabrika: false, depo: false, uygunsuzluk: false });
  const toggleNavGroup = (key) => setNavExpanded(prev => ({ ...prev, [key]: !prev[key] }));
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
  //    ŞEMA GÖÇÜ: Sürüm numarası her yükseldiğinde SADECE o sürüme özgü
  //    düzeltme uygulanır — mevcut raporlar/görevler/modüller gibi canlı
  //    veriler korunur, toptan silinip başlangıç verisiyle değiştirilmez.
  //    v2: eski Araç Akış Takibi şemasından (subeHattan/depodaki/
  //        serbestBirakilan) kaynaklanan çökmeyi düzeltmek için bir kerelik
  //        tam sıfırlama (bu sürümün altındaki dokümanlar için).
  //    v3: sadece admin kaydının görünen adını düzeltir.
  //    v4: sadece eski aşama adlarını (Şarj Testi->EOL, Elektrik
  //        Kontrol->EE Kontrol) yeniden adlandırır, araç kayıtlarının
  //        geri kalanına dokunmaz.
  useEffect(() => {
    const unsub = onSnapshot(
      SHARED_DOC,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          isRemoteUpdate.current = true;
          const v = d.version || 0;

          let nextUsers = d.users || INITIAL_USERS;
          let nextTasks = d.tasks || INITIAL_TASKS;
          let nextModules = d.modules || INITIAL_MODULES;
          let nextReports = d.reports || INITIAL_REPORTS;

          if (v < 2) {
            // Kritik göç: eski rapor şeması çökmeye sebep oluyordu.
            nextUsers = INITIAL_USERS;
            nextTasks = INITIAL_TASKS;
            nextModules = INITIAL_MODULES;
            nextReports = INITIAL_REPORTS;
          }
          if (v < 3) {
            nextUsers = nextUsers.map(u => (u.username === "admin" && u.name === "Sistem Yöneticisi (Admin)") ? { ...u, name: "Muharrem DELİKTAŞ" } : u);
          }
          if (v < 4) {
            const renameStage = (s) => (s === "Şarj Testi" ? "EOL" : s === "Elektrik Kontrol" ? "EE Kontrol" : s);
            nextReports = nextReports.map(r => ({ ...r, araclar: (r.araclar || []).map(a => ({ ...a, asama: renameStage(a.asama) })) }));
          }
          if (v < 5) {
            // 25 Ağustos raporu (v36) eklendi. Sadece bu id mevcut değilse ekle —
            // kullanıcının o tarihten sonra kendi eklediği/düzenlediği veriyi
            // ezmez, sadece eksikse tamamlar.
            if (!nextReports.some(r => r.id === "rpt-2026-08-25")) {
              const seedReport25 = INITIAL_REPORTS.find(r => r.id === "rpt-2026-08-25");
              if (seedReport25) nextReports = [seedReport25, ...nextReports];
            }
          }

          const nextTodos = d.todos || INITIAL_TODOS;
          const nextChats = d.chats || INITIAL_CHATS;
          const nextNotifications = d.notifications || [];
          const nextContacts = d.contacts || [];
          const nextStationData = d.stationData || {};
          const nextUygunsuzluklar = d.uygunsuzluklar || [];
          const nextHataKodlari = d.hataKodlari || [];
          const nextFabrikaAkisi = d.fabrikaAkisi || { araclar: [] };

          setUsersList(nextUsers);
          setTasks(nextTasks);
          setTodos(nextTodos);
          setChats(nextChats);
          setNotifications(nextNotifications);
          setModules(nextModules);
          setReports(nextReports);
          setContacts(nextContacts);
          setStationData(nextStationData);
          setUygunsuzluklar(nextUygunsuzluklar);
          setHataKodlari(nextHataKodlari);
          setFabrikaAkisi(nextFabrikaAkisi);

          if (v < DATA_VERSION) {
            setDoc(SHARED_DOC, {
              users: nextUsers, tasks: nextTasks, todos: nextTodos, chats: nextChats,
              notifications: nextNotifications, modules: nextModules, reports: nextReports,
              contacts: nextContacts, stationData: nextStationData, uygunsuzluklar: nextUygunsuzluklar,
              hataKodlari: nextHataKodlari, fabrikaAkisi: nextFabrikaAkisi, version: DATA_VERSION,
            }).catch(() => {});
          }
        } else {
          setDoc(SHARED_DOC, { users: INITIAL_USERS, tasks: INITIAL_TASKS, todos: INITIAL_TODOS, chats: INITIAL_CHATS, notifications: [], modules: INITIAL_MODULES, reports: INITIAL_REPORTS, contacts: [], stationData: {}, uygunsuzluklar: [], hataKodlari: [], fabrikaAkisi: { araclar: [] }, version: DATA_VERSION }).catch(() => {});
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
    setDoc(SHARED_DOC, { users: usersList, tasks, todos, chats, notifications, modules, reports, contacts, stationData, uygunsuzluklar, hataKodlari, fabrikaAkisi, version: DATA_VERSION }, { merge: true }).catch((e) => setError("Kaydedilemedi: " + e.message));
  }, [usersList, tasks, todos, chats, notifications, modules, reports, contacts, stationData, uygunsuzluklar, hataKodlari, fabrikaAkisi, dataLoaded]);

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

  const updateStationData = (stationId, newData) => setStationData(prev => ({ ...prev, [stationId]: newData }));

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
  const hasAccess = (sectionId) => currentUser.role === "admin" || (currentUser.izinliSekmeler || getAllSectionIds(modules)).includes(sectionId);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  const myOpenTasks = tasks.filter(t => t.sorumlu === currentUser.name && t.durum !== "tamam");
  const myOverdue = myOpenTasks.filter(t => t.vade && t.vade < todayStr());
  const myUpcoming = myOpenTasks.filter(t => t.vade && t.vade >= todayStr() && t.vade <= new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10));

  return (
    <div style={styles.appShell}>
      <aside style={styles.sidebar} className="no-print">
        <div style={styles.sidebarBrand}>
          <div style={styles.logoIcon}><ShieldCheck size={22} color="#F59E0B" /></div>
          <div><div style={styles.brandName}>Karea Asistan</div><div style={styles.brandSub}>Süreç & Yetki Yönetimi</div></div>
        </div>

        <nav style={styles.navTabs}>
          {hasAccess("dashboard") && (
            <button style={{ ...styles.navTab, ...(activeModule === "dashboard" ? styles.navTabActive : {}) }} onClick={() => { setActiveModule("dashboard"); setDashboardFilter("all"); }}><LayoutDashboard size={15} color="#F59E0B" /><span>Dashboard</span></button>
          )}
          {hasAccess("todo") && (
            <button style={{ ...styles.navTab, ...(activeModule === "todo" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("todo")}><ListTodo size={15} color="#F59E0B" /><span>To-Do List</span></button>
          )}
          {hasAccess("raporlar") && (
            <button style={{ ...styles.navTab, ...(activeModule === "raporlar" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("raporlar")}><FileSpreadsheet size={15} color="#10B981" /><span>Araç Akış Takibi</span></button>
          )}
          <div style={styles.navDivider} />

          {/* Kalite Güvence tek başına üst seviyede */}
          {modules.filter(m => !TOPLANTI_MODULE_IDS.includes(m.id) && hasAccess(m.id)).map((m) => {
            const Icon = MODULE_META[m.id]?.icon || ShieldCheck;
            const modColor = MODULE_META[m.id]?.color || "#94A3B8";
            const isActive = activeModule === m.id;
            return (
              <button key={m.id} style={{ ...styles.navTab, ...(isActive ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}>
                <Icon size={15} color={isActive ? "#F59E0B" : modColor} /><span>{m.label}</span>
              </button>
            );
          })}

          {/* Toplantı Yönetimi — açılır grup */}
          {modules.some(m => TOPLANTI_MODULE_IDS.includes(m.id) && hasAccess(m.id)) && (
            <NavGroup label="Toplantı Yönetimi" icon={Users} isOpen={navExpanded.toplanti} onToggle={() => toggleNavGroup("toplanti")}>
              {modules.filter(m => TOPLANTI_MODULE_IDS.includes(m.id) && hasAccess(m.id)).map((m) => {
                const Icon = MODULE_META[m.id]?.icon || ShieldCheck;
                const modColor = MODULE_META[m.id]?.color || "#94A3B8";
                const isActive = activeModule === m.id;
                return (
                  <button key={m.id} style={{ ...styles.navSubTab, ...(isActive ? styles.navTabActive : {}) }} onClick={() => setActiveModule(m.id)}>
                    <Icon size={13} color={isActive ? "#F59E0B" : modColor} /><span>{m.label}</span>
                  </button>
                );
              })}
            </NavGroup>
          )}

          {/* Fabrika Kontrol — artık tek sayfa (8 istasyonlu akış kanban) */}
          {hasAccess("fabrika_kontrol_akis") && (
            <button style={{ ...styles.navTab, ...(activeModule === "fabrika_kontrol_akis" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("fabrika_kontrol_akis")}><Zap size={15} color="#38BDF8" /><span>Fabrika Kontrol</span></button>
          )}

          {/* Depo Kontrol — açılır grup */}
          {DEPO_KONTROL_ITEMS.some(i => hasAccess(i.id)) && (
            <NavGroup label="Depo Kontrol" icon={Truck} isOpen={navExpanded.depo} onToggle={() => toggleNavGroup("depo")}>
              {DEPO_KONTROL_ITEMS.filter(i => hasAccess(i.id)).map((item) => (
                <button key={item.id} style={{ ...styles.navSubTab, ...(activeModule === item.id ? styles.navTabActive : {}) }} onClick={() => setActiveModule(item.id)}>
                  <CheckSquare size={13} color={activeModule === item.id ? "#F59E0B" : "#94A3B8"} /><span>{item.label}</span>
                </button>
              ))}
            </NavGroup>
          )}

          <div style={styles.navDivider} />
          {hasAccess("grafik_yonetimi") && (
            <button style={{ ...styles.navTab, ...(activeModule === "grafik_yonetimi" ? styles.navTabActive : {}) }} onClick={() => setActiveModule("grafik_yonetimi")}><BarChart3 size={15} color="#38BDF8" /><span>Grafik Yönetimi</span></button>
          )}
          {UYGUNSUZLUK_YONETIMI_ITEMS.some(i => hasAccess(i.id)) && (
            <NavGroup label="Uygunsuzluk Yönetimi" icon={AlertTriangle} isOpen={navExpanded.uygunsuzluk} onToggle={() => toggleNavGroup("uygunsuzluk")}>
              {UYGUNSUZLUK_YONETIMI_ITEMS.filter(i => hasAccess(i.id)).map((item) => {
                const Icon = item.id === "uygunsuzluk_hata_kodlari" ? AlertCircle : item.id === "uygunsuzluk_istatistik" ? BarChart3 : AlertTriangle;
                return (
                  <button key={item.id} style={{ ...styles.navSubTab, ...(activeModule === item.id ? styles.navTabActive : {}) }} onClick={() => setActiveModule(item.id)}>
                    <Icon size={13} color={activeModule === item.id ? "#F59E0B" : "#94A3B8"} /><span>{item.label}</span>
                  </button>
                );
              })}
            </NavGroup>
          )}
          {currentUser.role === "admin" && (
            <button style={{ ...styles.navTab, ...(activeModule === "admin_panel" ? styles.navTabAdminActive : {}) }} onClick={() => setActiveModule("admin_panel")}><Lock size={15} color="#EF4444" /><span>Admin Panel</span></button>
          )}
        </nav>

        <div style={styles.sidebarFooter}>
          <button style={styles.notificationBellBtn} onClick={() => setShowNotificationsModal(true)} title="Bildirimler">
            <Bell size={16} color="#F59E0B" /> <span style={{ fontSize: 12 }}>Bildirimler</span>{unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
          </button>
          <div style={styles.userProfileBar}>
            <div style={styles.userAvatar}>{currentUser.name.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...styles.userName, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</div>
              <div style={styles.userRoleTag}>{currentUser.role === "admin" ? "🔑 Admin" : "👤 Kullanıcı"}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button style={styles.actionSmallBtn} onClick={() => setShowPasswordModal(true)} title="Şifre Değiştir"><Key size={14} color="#38BDF8" /></button>
                <button style={styles.actionSmallBtn} onClick={() => { setCurrentUser(null); setIsLocked(false); }} title="Çıkış Yap"><LogOut size={14} color="#EF4444" /></button>
            </div>
          </div>
        </div>
      </aside>

      <main style={styles.mainContent}>
        {getAllSectionIds(modules).includes(activeModule) && !hasAccess(activeModule) ? (
          <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Bu sekme için yetkiniz yok</h2><p style={{ fontSize: 12, color: "#64748B" }}>Erişim için admin ile görüşün.</p></div>
        ) : activeModule === "dashboard" ? (
          <DashboardView tasks={tasks} modules={modules} reports={reports} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} />
        ) : activeModule === "todo" ? (
          <TodoListView todos={todos} setTodos={setTodos} currentUser={currentUser} />
        ) : activeModule === "raporlar" ? (
          <ReportsView reports={reports} setReports={setReports} currentUser={currentUser} onAddUygunsuzluk={(u) => setUygunsuzluklar(prev => [u, ...prev])} />
        ) : activeModule === "grafik_yonetimi" ? (
          <GrafikYonetimiView tasks={tasks} />
        ) : activeModule === "uygunsuzluk_liste" ? (
          <UygunsuzlukTakipView uygunsuzluklar={uygunsuzluklar} setUygunsuzluklar={setUygunsuzluklar} currentUser={currentUser} hataKodlari={hataKodlari} />
        ) : activeModule === "uygunsuzluk_hata_kodlari" ? (
          <HataKodlariView hataKodlari={hataKodlari} setHataKodlari={setHataKodlari} />
        ) : activeModule === "uygunsuzluk_istatistik" ? (
          <UygunsuzlukIstatistikView uygunsuzluklar={uygunsuzluklar} />
        ) : activeModule === "admin_panel" ? (
          currentUser.role === "admin" ? <AdminPermissionsView usersList={usersList} setUsersList={setUsersList} modules={modules} setModules={setModules} contacts={contacts} setContacts={setContacts} /> : <div style={styles.unauthorizedBox}><Lock size={40} color="#EF4444" /><h2>Yetkiniz Yok</h2></div>
        ) : activeModule === "fabrika_kontrol_akis" ? (
          <FabrikaAkisiView fabrikaAkisi={fabrikaAkisi} onUpdate={setFabrikaAkisi} />
        ) : DEPO_KONTROL_ITEMS.some(i => i.id === activeModule) ? (
          <IstasyonAracView key={activeModule} stationId={activeModule} title={DEPO_KONTROL_ITEMS.find(i => i.id === activeModule).label} grup="Depo Kontrol" reports={reports} onNavigate={setActiveModule} />
        ) : modules.some(m => m.id === activeModule) ? (
          <KanbanBoardView activeModule={activeModule} modules={modules} tasks={tasks.filter((t) => t.module === activeModule)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentUser={currentUser} onOpenDetail={setSelectedTask} onMoveStage={(id, st) => setTasks(tasks.map(t => t.id === id ? {...t, durum: st, bitisTarihi: st === "tamam" ? todayStr() : t.bitisTarihi} : t))} onCreateTask={(tData) => {
            const newId = uid();
            const prefix = (tData.module || "ask").substring(0, 3).toUpperCase();
            const newTask = { id: newId, module: tData.module || "asakai", kod: `${prefix}-2026-${(tasks.length+1).toString().padStart(3,"0")}`, baslik: tData.baslik, sorumlu: tData.sorumlu || currentUser.name, gorevTipi: "bireysel", ekipUyeleri: tData.ekipUyeleri || [], acilisTarihi: todayStr(), vade: tData.vade || todayStr(), bitisTarihi: "", durum: "acik", oncelik: "Orta", subtasks: [] };
            setTasks(prev => [...prev, newTask]);
            addContactIfNew(newTask.sorumlu);
            newTask.ekipUyeleri.forEach(addContactIfNew);
            addNotification(newTask.sorumlu, `Yeni görev atandı: ${newTask.baslik}`);
          }} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} usersList={usersList} contacts={contacts} personOptions={personOptions} />
        ) : (
          <DashboardView tasks={tasks} modules={modules} reports={reports} currentUser={currentUser} dashboardFilter={dashboardFilter} setDashboardFilter={setDashboardFilter} onOpenDetail={setSelectedTask} onNavigateModule={setActiveModule} />
        )}
      </main>

      {/* Cubicl Tarzı Sabit Alt Köşe Sohbet Barı */}
      <ChatBar chats={chats} setChats={setChats} currentUser={currentUser} usersList={usersList} tasks={tasks} />

      {selectedTask && (
        <TaskDetailModal task={selectedTask} currentUser={currentUser} usersList={usersList} contacts={contacts} personOptions={personOptions} onClose={() => setSelectedTask(null)} onSaveTask={(updated) => { setTasks(tasks.map(t => t.id === updated.id ? updated : t)); addContactIfNew(updated.sorumlu); (updated.ekipUyeleri || []).forEach(addContactIfNew); }} onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))} />
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

        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 650, overflowY: "auto" }}>
          {myTodos.length === 0 ? <div style={{ color: "#64748B", textAlign: "center", padding: 30 }}>Henüz To-Do kaydınız yok.</div> : myTodos.map(t => {
            const isLate = t.dueDate && !t.done && t.dueDate < today;
            const isOpen = selectedId === t.id;
            return (
              <div key={t.id} style={{ background: "#0F172A", borderRadius: 10, border: isLate ? "1px solid #EF4444" : (isOpen ? "1px solid #F59E0B" : "1px solid #334155"), overflow: "hidden" }}>
                <div className="todo-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer" }} onClick={() => setSelectedId(isOpen ? null : t.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                    <span onClick={(e) => { e.stopPropagation(); setTodos(todos.map(x => x.id === t.id ? {...x, done: !x.done} : x)); }} style={{ display: "flex", padding: 4, margin: -4 }}>
                      {t.done ? <CheckSquare size={20} color="#10B981" /> : <Square size={20} color="#F59E0B" />}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "#64748B" : "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{t.text}</span>
                      <div style={{ display: "flex", gap: 8, marginTop: 3, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: priorityColor(t.priority) }}>{t.priority}</span>
                        {t.dueDate && <span style={{ fontSize: 10, color: isLate ? "#EF4444" : "#94A3B8" }}>📅 {fmtDate(t.dueDate)}{isLate ? " (gecikti)" : ""}</span>}
                        {(t.subtasks || []).length > 0 && <span style={{ fontSize: 10, color: "#64748B" }}>· {t.subtasks.filter(s => s.done).length}/{t.subtasks.length} alt adım</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                    {isOpen ? <ChevronDown size={16} color="#F59E0B" /> : <ChevronRight size={16} color="#64748B" />}
                    <Trash2 size={14} color="#EF4444" style={{ cursor: "pointer", padding: 4, margin: -4 }} onClick={(e) => { e.stopPropagation(); setTodos(todos.filter(x => x.id !== t.id)); }} />
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #1E293B", marginTop: 2, paddingTop: 14 }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <label style={styles.inputLabel}>Son Tarih</label>
                        <input type="date" style={styles.selectInput} value={t.dueDate || ""} onChange={e => setTodos(todos.map(x => x.id === t.id ? {...x, dueDate: e.target.value} : x))} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.inputLabel}>Öncelik</label>
                        <select style={styles.selectInput} value={t.priority} onChange={e => setTodos(todos.map(x => x.id === t.id ? {...x, priority: e.target.value} : x))}>
                          <option value="Normal">Normal</option>
                          <option value="Yüksek">Yüksek ⚡</option>
                          <option value="Kritik">Kritik 🔥</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: "#1E293B", padding: 12, borderRadius: 10 }}>
                      <label style={styles.inputLabel}>Alt Adımlar</label>
                      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                        <input style={styles.mainInput} placeholder="Alt adım..." value={subText} onChange={e => setSubText(e.target.value)} />
                        <button style={styles.addInlineBtn} onClick={() => { if(!subText.trim()) return; setTodos(todos.map(x => x.id === t.id ? {...x, subtasks: [...(x.subtasks||[]), {id: uid(), text: subText.trim(), done: false}]} : x)); setSubText(""); }}>Ekle</button>
                      </div>
                      {(t.subtasks || []).map(s => (
                        <div key={s.id} style={{ display: "flex", justifyContent: "space-between", background: "#0F172A", padding: "6px 8px", borderRadius: 6, fontSize: 12, marginBottom: 4 }}>
                          <span onClick={() => setTodos(todos.map(x => x.id === t.id ? {...x, subtasks: x.subtasks.map(s2 => s2.id === s.id ? {...s2, done: !s2.done} : s2)} : x))} style={{ textDecoration: s.done ? "line-through" : "none", cursor: "pointer" }}>{s.text}</span>
                          <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => setTodos(todos.map(x => x.id === t.id ? {...x, subtasks: x.subtasks.filter(s2 => s2.id !== s.id)} : x))} />
                        </div>
                      ))}
                    </div>

                    <div style={{ background: "#1E293B", padding: 12, borderRadius: 10 }}>
                      <label style={styles.inputLabel}>Gelişmeler (ilerleme notları)</label>
                      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                        <input style={styles.mainInput} placeholder="Bir ilerleme notu yazın..." value={devText} onChange={e => setDevText(e.target.value)} />
                        <button style={styles.addInlineBtn} onClick={() => {
                          if (!devText.trim()) return;
                          const entry = { id: uid(), text: devText.trim(), date: new Date().toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) };
                          setTodos(todos.map(x => x.id === t.id ? { ...x, developments: [entry, ...(x.developments || [])] } : x));
                          setDevText("");
                        }}>Ekle</button>
                      </div>
                      {(t.developments || []).length === 0 && <div style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>Henüz gelişme notu yok.</div>}
                      {(t.developments || []).map(d => (
                        <div key={d.id} style={{ background: "#0F172A", padding: "8px 10px", borderRadius: 6, fontSize: 12, marginBottom: 6 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <span style={{ flex: 1 }}>{d.text}</span>
                            <Trash2 size={12} color="#EF4444" style={{ cursor: "pointer", flexShrink: 0, marginTop: 2 }} onClick={() => setTodos(todos.map(x => x.id === t.id ? {...x, developments: x.developments.filter(d2 => d2.id !== d.id)} : x))} />
                          </div>
                          <div style={{ fontSize: 10, color: "#64748B", marginTop: 3 }}>{d.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- DİĞER EKRANLAR (DASHBOARD, KANBAN, RAPOR, ADMIN) ---
function DashboardView({ tasks, modules, reports, currentUser, dashboardFilter, setDashboardFilter, onOpenDetail, onNavigateModule }) {
  const myTasks = tasks.filter(t => t.sorumlu === currentUser.name || (t.ekipUyeleri || []).includes(currentUser.name));
  const [expandedModule, setExpandedModule] = useState(null);
  const today = todayStr();
  const overdueCount = myTasks.filter(t => t.durum !== "tamam" && t.vade && t.vade < today).length;
  const teamActive = tasks.filter(t => t.durum !== "tamam").length;
  const teamDone = tasks.filter(t => t.durum === "tamam").length;
  const canSeeReports = currentUser.role === "admin" || (currentUser.izinliSekmeler || getAllSectionIds(modules)).includes("raporlar");
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
        <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8" }}><div style={styles.dashCardTitle}>Toplam İşim</div><div style={styles.dashCardValue}>{myTasks.length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B" }}><div style={styles.dashCardTitle}>Aktif İşlerim</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum !== "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Tamamladığım</div><div style={styles.dashCardValue}>{myTasks.filter(t => t.durum === "tamam").length}</div></div>
        <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Geciken İşlerim</div><div style={styles.dashCardValue}>{overdueCount}</div></div>
      </div>

      {latestReport && (
        <div style={styles.yearEndTableCard} onClick={() => onNavigateModule("raporlar")} className="hover-lift">
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
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {modules.map(m => {
            const modTasks = tasks.filter(t => t.module === m.id);
            const modDone = modTasks.filter(t => t.durum === "tamam").length;
            const pct = modTasks.length ? Math.round((modDone / modTasks.length) * 100) : 0;
            const isExpanded = expandedModule === m.id;
            return (
              <div key={m.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "4px 0" }} onClick={() => setExpandedModule(isExpanded ? null : m.id)}>
                  <ChevronDown size={12} color="#64748B" style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.15s", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, width: 160, flexShrink: 0 }}>{m.label}</span>
                  <div style={{ flex: 1, background: "#0F172A", borderRadius: 6, height: 8, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: MODULE_META[m.id]?.color || "#F59E0B" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#94A3B8", width: 90, textAlign: "right" }}>{modDone}/{modTasks.length} tamam</span>
                </div>
                {isExpanded && (
                  <div style={{ marginLeft: 22, marginTop: 6, marginBottom: 10, padding: 12, background: "#0F172A", borderRadius: 8, border: "1px solid #334155" }}>
                    <div style={{ fontSize: 10, color: "#64748B", marginBottom: 8 }}>{m.label} — aşamaya göre tüm ekip dağılımı</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {KANBAN_STAGES.map(stage => {
                        const count = modTasks.filter(t => t.durum === stage.id).length;
                        return (
                          <div key={stage.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
                            <span style={{ color: stage.color, fontWeight: 600 }}>{stage.label}</span>
                            <span style={{ color: "#E2E8F0", fontWeight: 700 }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button style={{ ...styles.quickActionBtn, marginTop: 10, fontSize: 11, width: "100%", justifyContent: "center" }} onClick={() => onNavigateModule(m.id)}>Modüle Git <ArrowRight size={11} /></button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>İşlerim (Aşamaya Göre)</h3>
        <div style={{ ...styles.dashKanbanScroll, width: "100%" }}>
          {KANBAN_STAGES.map(stage => {
            const stageTasks = myTasks.filter(t => t.durum === stage.id);
            return (
              <div key={stage.id} style={styles.dashKanbanCol}>
                <div style={{ ...styles.aracKanbanColHeader, borderTopColor: stage.color }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: stage.color }}>{stage.label}</span>
                    <span style={styles.kanbanBadge}>{stageTasks.length}</span>
                  </div>
                </div>
                <div style={styles.aracKanbanColBody}>
                  {stageTasks.length === 0 && <div style={{ fontSize: 10, color: "#475569", fontStyle: "italic", textAlign: "center", padding: "10px 0" }}>Boş</div>}
                  {stageTasks.map(t => (
                    <div key={t.id} style={{ ...styles.aracVehCard, cursor: "pointer" }} className="hover-lift" onClick={() => onOpenDetail(t)}>
                      <span style={styles.taskCodeBadge}>{t.kod}</span>
                      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 5 }}>{t.baslik}</div>
                      {t.vade && <div style={{ fontSize: 10, color: t.durum !== "tamam" && t.vade < today ? "#EF4444" : "#64748B", marginTop: 4 }}>{t.durum !== "tamam" && t.vade < today ? "⚠ " : ""}{fmtDate(t.vade)}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KanbanBoardView({ activeModule, modules, tasks, searchQuery, setSearchQuery, currentUser, onOpenDetail, onMoveStage, onCreateTask, onDeleteTask, usersList, contacts, personOptions }) {
  const [showModal, setShowModal] = useState(false);
  const currentModObj = modules.find(m => m.id === activeModule) || modules[0];
  const CurrentModIcon = MODULE_META[currentModObj.id]?.icon || ShieldCheck;
  const currentModColor = MODULE_META[currentModObj.id]?.color || "#94A3B8";
  const filtered = tasks.filter(t =>
    t.baslik.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.etiketler || []).some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                    <div key={task.id} style={{ ...styles.kanbanCard, ...(isOverdue ? { borderColor: "#EF4444" } : {}) }} className="hover-lift" draggable onDragStart={e => e.dataTransfer.setData("text", task.id)}>
                      <div style={styles.cardHeaderRow}><span style={styles.taskCodeBadge}>{task.kod}</span><button style={styles.deleteIconBtn} onClick={() => onDeleteTask(task.id)}><Trash2 size={12} /></button></div>
                      <div style={styles.kanbanCardTitle} onClick={() => onOpenDetail(task)}>{task.baslik}</div>
                      {(task.etiketler || []).length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                          {task.etiketler.map(e => <span key={e} style={styles.keywordChip}>#{e}</span>)}
                        </div>
                      )}
                      <div style={styles.kanbanCardFooter}>
                        <span>👤 {task.sorumlu}{(task.ekipUyeleri || []).length > 0 ? ` +${task.ekipUyeleri.length}` : ""}</span>
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
      {showModal && <CreateTaskModal activeModule={activeModule} usersList={usersList} contacts={contacts} personOptions={personOptions} currentUser={currentUser} onClose={() => setShowModal(false)} onCreate={onCreateTask} />}
    </div>
  );
}

function TeamPicker({ usersList, contacts, selected, onChange, excludeName }) {
  const [tab, setTab] = useState("uyeler");
  const members = usersList.map(u => u.name).filter(n => n !== excludeName);
  const others = (contacts || []).filter(n => n !== excludeName);
  const list = tab === "uyeler" ? members : others;
  const toggle = (name) => {
    if (selected.includes(name)) onChange(selected.filter(n => n !== name));
    else onChange([...selected, name]);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <button type="button" style={{ ...styles.periodBtn, ...(tab === "uyeler" ? styles.periodBtnActive : {}) }} onClick={() => setTab("uyeler")}>Kayıtlı Üyeler</button>
        <button type="button" style={{ ...styles.periodBtn, ...(tab === "diger" ? styles.periodBtnActive : {}) }} onClick={() => setTab("diger")}>Kayıtlı Olmayanlar</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 110, overflowY: "auto" }}>
        {list.length === 0 && <span style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>{tab === "uyeler" ? "Başka kayıtlı üye yok." : "Henüz kayıtlı olmayan kişi yok."}</span>}
        {list.map(name => (
          <label key={name} style={{ ...styles.chip, cursor: "pointer", background: selected.includes(name) ? "rgba(245,158,11,0.15)" : "#0F172A", borderColor: selected.includes(name) ? "#F59E0B" : "#334155" }}>
            <input type="checkbox" checked={selected.includes(name)} onChange={() => toggle(name)} />
            {name}
          </label>
        ))}
      </div>
      {selected.length > 0 && <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 6 }}>Seçili: {selected.join(", ")}</div>}
    </div>
  );
}

function CreateTaskModal({ activeModule, usersList, contacts, personOptions, currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("");
  const [sorumlu, setSorumlu] = useState(currentUser?.name || "");
  const [vade, setVade] = useState(todayStr());
  const [ekip, setEkip] = useState([]);
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
          <div>
            <label style={styles.inputLabel}>Ek Kişiler (opsiyonel)</label>
            <TeamPicker usersList={usersList} contacts={contacts} selected={ekip} onChange={setEkip} excludeName={sorumlu} />
          </div>
          <div><label style={styles.inputLabel}>Vade</label><input type="date" style={styles.selectInput} value={vade} onChange={e => setVade(e.target.value)} /></div>
          <button style={styles.primaryActionBtn} onClick={() => { if(!baslik) return; onCreate({ baslik, sorumlu, vade, module: activeModule, ekipUyeleri: ekip }); onClose(); }}>Oluştur</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetailModal({ task, currentUser, usersList, contacts, personOptions, onClose, onSaveTask, onDeleteTask }) {
  const [subText, setSubText] = useState("");
  const [editTitle, setEditTitle] = useState(task.baslik);
  const [editSorumlu, setEditSorumlu] = useState(task.sorumlu);
  const [keywordText, setKeywordText] = useState("");
  const ekip = task.ekipUyeleri || [];
  const etiketler = task.etiketler || [];

  const addKeyword = () => {
    const k = keywordText.trim().replace(/^#/, "");
    if (!k || etiketler.some(e => e.toLowerCase() === k.toLowerCase())) { setKeywordText(""); return; }
    onSaveTask({ ...task, etiketler: [...etiketler, k] });
    setKeywordText("");
  };
  const removeKeyword = (k) => onSaveTask({ ...task, etiketler: etiketler.filter(e => e !== k) });

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
          <div>
            <label style={styles.inputLabel}>Ek Kişiler</label>
            <TeamPicker usersList={usersList} contacts={contacts} selected={ekip} onChange={(next) => onSaveTask({ ...task, ekipUyeleri: next })} excludeName={editSorumlu} />
          </div>
          <div>
            <label style={styles.inputLabel}>Anahtar Kelimeler</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: etiketler.length > 0 ? 8 : 0 }}>
              {etiketler.map(k => (
                <span key={k} style={styles.chip}>#{k} <X size={11} style={{ cursor: "pointer" }} onClick={() => removeKeyword(k)} /></span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={styles.mainInput} placeholder="Anahtar kelime yazıp Enter'a basın..." value={keywordText} onChange={e => setKeywordText(e.target.value)} onKeyDown={e => e.key === "Enter" && addKeyword()} />
              <button style={styles.addInlineBtn} onClick={addKeyword}>Ekle</button>
            </div>
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

function ReportsView({ reports, setReports, currentUser, onAddUygunsuzluk }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [filterText, setFilterText] = useState("");
  const sorted = [...reports]
    .filter(r => filterText.trim() === "" || `${r.baslik} ${r.hazirlayan} ${r.tarih}`.toLowerCase().includes(filterText.trim().toLowerCase()))
    .sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
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

      <div style={{ display: "grid", gridTemplateColumns: selected ? "200px 1fr" : "260px 1fr", gap: 16 }}>
        <div>
          <div style={{ position: "relative", marginBottom: 10 }}>
            <Search size={13} color="#64748B" style={{ position: "absolute", left: 9, top: 9 }} />
            <input style={{ ...styles.mainInput, paddingLeft: 28, fontSize: 12 }} placeholder="Rapor ara..." value={filterText} onChange={e => setFilterText(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: "78vh", overflowY: "auto" }}>
            {sorted.length === 0 && <div style={{ color: "#64748B", fontSize: 12, textAlign: "center", padding: 20 }}>{filterText ? "Sonuç yok." : "Henüz rapor eklenmedi."}</div>}
            {sorted.map(r => {
              const isSel = selectedId === r.id;
              const sCount = (r.araclar || []).filter(a => a.asama === "Serbestlik").length;
              const openCount = (r.araclar || []).length - sCount;
              return (
                <div key={r.id} style={{ background: isSel ? "#334155" : "#1E293B", border: isSel ? "1px solid #F59E0B" : "1px solid #334155", borderRadius: 8, padding: "9px 10px", cursor: "pointer" }} className="hover-lift" onClick={() => setSelectedId(r.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{fmtDate(r.tarih)}</span>
                    {canDelete(r) && <Trash2 size={11} color="#EF4444" style={{ cursor: "pointer", flexShrink: 0 }} onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }} />}
                  </div>
                  <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>v{r.seq} · {openCount} açık, {sCount} serbest</div>
                </div>
              );
            })}
          </div>
        </div>

        {selected && <ReportDetail report={selected} onUpdate={(upd) => setReports(reports.map(r => r.id === upd.id ? upd : r))} onClose={() => setSelectedId(null)} currentUser={currentUser} onAddUygunsuzluk={onAddUygunsuzluk} />}
      </div>

      {showNew && <NewReportModal currentUser={currentUser} onClose={() => setShowNew(false)} onCreate={createReport} />}
    </div>
  );
}

function NewReportModal({ currentUser, onClose, onCreate }) {
  const [baslik, setBaslik] = useState("Gün Sonu Kalite Kontrol ve Araç Durum Raporu");
  const [tarih, setTarih] = useState(todayStr());
  const [hazirlayan, setHazirlayan] = useState(currentUser.name);
  const [bolum, setBolum] = useState("Fabrika 1 & Depo Takip");
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

function EEKontrolModal({ vehicle, onClose, onSave }) {
  const existing = vehicle.formVerisi?.eeKontrol;
  const [header, setHeader] = useState({
    kontrolEden: existing?.kontrolEden || "",
    tarih: existing?.tarih || todayStr(),
    urunTanimi: existing?.urunTanimi || "",
    uretilecekRenk: existing?.uretilecekRenk || "",
    uretimIsEmriNo: existing?.uretimIsEmriNo || "",
    vinNo: existing?.vinNo || vehicle.no,
    motorNo: existing?.motorNo || "",
  });
  const [maddeler, setMaddeler] = useState(existing?.maddeler || EE_KONTROL_ITEMS.map(item => ({ item, sonuc: "", aciklama: "" })));

  const setSonuc = (idx, sonuc) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, sonuc } : m));
  const setAciklama = (idx, aciklama) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, aciklama } : m));

  const nokSayisi = maddeler.filter(m => m.sonuc === "NOK").length;
  const genelSonuc = maddeler.some(m => m.sonuc === "") ? "Devam Ediyor" : (nokSayisi > 0 ? "Kaldı" : "Geçti");

  const save = () => { onSave({ ...header, maddeler, nokSayisi, genelSonuc, doldu: true }); onClose(); };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 640, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={styles.drawerHeader}>
          <h2 style={styles.formTitle}>E/E Kontrol Formu — Araç #{vehicle.no}</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 14 }}>Form no: KY.FR-17 — E/E Kontrol Formu Balçık</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div><label style={styles.inputLabel}>Kontrol Eden</label><input style={styles.mainInput} value={header.kontrolEden} onChange={e => setHeader(h => ({ ...h, kontrolEden: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Tarih</label><input type="date" style={styles.selectInput} value={header.tarih} onChange={e => setHeader(h => ({ ...h, tarih: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Ürün Tanımlaması</label><input style={styles.mainInput} value={header.urunTanimi} onChange={e => setHeader(h => ({ ...h, urunTanimi: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Üretilecek Renk</label><input style={styles.mainInput} value={header.uretilecekRenk} onChange={e => setHeader(h => ({ ...h, uretilecekRenk: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Üretim İş Emri No</label><input style={styles.mainInput} value={header.uretimIsEmriNo} onChange={e => setHeader(h => ({ ...h, uretimIsEmriNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>VIN No</label><input style={styles.mainInput} value={header.vinNo} onChange={e => setHeader(h => ({ ...h, vinNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Motor Numarası</label><input style={styles.mainInput} value={header.motorNo} onChange={e => setHeader(h => ({ ...h, motorNo: e.target.value }))} /></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {maddeler.map((m, idx) => (
            <div key={idx} style={{ background: "#0F172A", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, flex: 1 }}>{idx + 1}. {m.item}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "OK" ? styles.resultPillOk : {}) }} onClick={() => setSonuc(idx, "OK")}>OK</button>
                  <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "NOK" ? styles.resultPillNok : {}) }} onClick={() => setSonuc(idx, "NOK")}>NOK</button>
                </div>
              </div>
              {m.sonuc === "NOK" && (
                <input style={{ ...styles.mainInput, fontSize: 11, marginTop: 6 }} placeholder="Açıklama..." value={m.aciklama} onChange={e => setAciklama(idx, e.target.value)} />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: 12, background: "#0F172A", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>NOK: <b style={{ color: "#EF4444" }}>{nokSayisi}</b> / {maddeler.length}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: genelSonuc === "Geçti" ? "#10B981" : genelSonuc === "Kaldı" ? "#EF4444" : "#F59E0B" }}>{genelSonuc}</span>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
          <button style={styles.primaryActionBtn} onClick={save}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

function FinalKontrolModal({ vehicle, onClose, onSave }) {
  const existing = vehicle.formVerisi?.finalKontrol;
  const [header, setHeader] = useState({
    vinNo: existing?.vinNo || vehicle.no,
    aracModeli: existing?.aracModeli || "",
    kontrolTarihi: existing?.kontrolTarihi || todayStr(),
    motorNo: existing?.motorNo || "",
    siparisNo: existing?.siparisNo || "",
    kontrolLokasyonu: existing?.kontrolLokasyonu || "",
    musteri: existing?.musteri || "",
    renkKodu: existing?.renkKodu || "",
    vardiya: existing?.vardiya || "",
    uretimIsEmriNo: existing?.uretimIsEmriNo || "",
    aracSeriNo: existing?.aracSeriNo || "",
    kontrolEden: existing?.kontrolEden || "",
  });
  const flatItems = FINAL_KONTROL_SECTIONS.flatMap(s => s.items.map(item => ({ section: s.title, item })));
  const [maddeler, setMaddeler] = useState(existing?.maddeler || flatItems.map(x => ({ ...x, sonuc: "", aciklama: "" })));
  const [duzeltmeYapildi, setDuzeltmeYapildi] = useState(existing?.duzeltmeYapildi || false);
  const [finalOnayImza, setFinalOnayImza] = useState(existing?.finalOnayImza || "");

  const setSonuc = (idx, sonuc) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, sonuc } : m));
  const setAciklama = (idx, aciklama) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, aciklama } : m));

  const nokSayisi = maddeler.filter(m => m.sonuc === "NOK").length;
  const genelSonuc = maddeler.some(m => m.sonuc === "") ? "Devam Ediyor" : (nokSayisi > 0 ? "Kaldı" : "Geçti");

  const save = () => { onSave({ ...header, maddeler, nokSayisi, genelSonuc, duzeltmeYapildi, finalOnayImza, doldu: true }); onClose(); };

  let runningIdx = -1;

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 700, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={styles.drawerHeader}>
          <h2 style={styles.formTitle}>Final Kalite Kontrol Formu — Araç #{vehicle.no}</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 14 }}>Form no: KY.FR-19</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
          <div><label style={styles.inputLabel}>VIN No</label><input style={styles.mainInput} value={header.vinNo} onChange={e => setHeader(h => ({ ...h, vinNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Araç Modeli</label><input style={styles.mainInput} value={header.aracModeli} onChange={e => setHeader(h => ({ ...h, aracModeli: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Kontrol Tarihi</label><input type="date" style={styles.selectInput} value={header.kontrolTarihi} onChange={e => setHeader(h => ({ ...h, kontrolTarihi: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Motor No</label><input style={styles.mainInput} value={header.motorNo} onChange={e => setHeader(h => ({ ...h, motorNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Sipariş No</label><input style={styles.mainInput} value={header.siparisNo} onChange={e => setHeader(h => ({ ...h, siparisNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Kontrol Lokasyonu</label><input style={styles.mainInput} value={header.kontrolLokasyonu} onChange={e => setHeader(h => ({ ...h, kontrolLokasyonu: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Müşteri</label><input style={styles.mainInput} value={header.musteri} onChange={e => setHeader(h => ({ ...h, musteri: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Renk Kodu</label><input style={styles.mainInput} value={header.renkKodu} onChange={e => setHeader(h => ({ ...h, renkKodu: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Vardiya</label><input style={styles.mainInput} value={header.vardiya} onChange={e => setHeader(h => ({ ...h, vardiya: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Üretim İş Emri No</label><input style={styles.mainInput} value={header.uretimIsEmriNo} onChange={e => setHeader(h => ({ ...h, uretimIsEmriNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Araç Seri No</label><input style={styles.mainInput} value={header.aracSeriNo} onChange={e => setHeader(h => ({ ...h, aracSeriNo: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Kontrol Eden (QA)</label><input style={styles.mainInput} value={header.kontrolEden} onChange={e => setHeader(h => ({ ...h, kontrolEden: e.target.value }))} /></div>
        </div>

        {FINAL_KONTROL_SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", marginBottom: 6 }}>▶ {section.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {section.items.map((itemText) => {
                runningIdx++;
                const idx = runningIdx;
                const m = maddeler[idx];
                return (
                  <div key={idx} style={{ background: "#0F172A", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, flex: 1 }}>{itemText}</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "OK" ? styles.resultPillOk : {}) }} onClick={() => setSonuc(idx, "OK")}>OK</button>
                        <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "NOK" ? styles.resultPillNok : {}) }} onClick={() => setSonuc(idx, "NOK")}>NOK</button>
                        <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "NA" ? styles.resultPillNa : {}) }} onClick={() => setSonuc(idx, "NA")}>N/A</button>
                      </div>
                    </div>
                    {m.sonuc === "NOK" && (
                      <input style={{ ...styles.mainInput, fontSize: 11, marginTop: 6 }} placeholder="Kusur / kusur yeri / aksiyon açıklaması..." value={m.aciklama} onChange={e => setAciklama(idx, e.target.value)} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8, padding: 12, background: "#0F172A", borderRadius: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12 }}>NOK: <b style={{ color: "#EF4444" }}>{nokSayisi}</b> / {maddeler.length}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: genelSonuc === "Geçti" ? "#10B981" : genelSonuc === "Kaldı" ? "#EF4444" : "#F59E0B" }}>{genelSonuc}</span>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={duzeltmeYapildi} onChange={e => setDuzeltmeYapildi(e.target.checked)} /> Düzeltme İşlemi Yapıldı mı?
          </label>
          <label style={styles.inputLabel}>Final Onay - Sevke Uygundur (İmza)</label>
          <input style={styles.mainInput} value={finalOnayImza} onChange={e => setFinalOnayImza(e.target.value)} placeholder="Ad Soyad" />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
          <button style={styles.primaryActionBtn} onClick={save}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

function VehicleChecklistModal({ vehicle, title, formNo, sections, headerFields, existing, onClose, onSave }) {
  const flatItems = sections.flatMap(s => s.items.map(item => ({ section: s.title, item })));
  const [header, setHeader] = useState(() => {
    const h = {};
    headerFields.forEach(f => { h[f.key] = existing?.[f.key] || (f.key === "vinNo" ? vehicle.no : f.default || ""); });
    return h;
  });
  const [maddeler, setMaddeler] = useState(existing?.maddeler || flatItems.map(x => ({ ...x, sonuc: "", aciklama: "" })));

  const setSonuc = (idx, sonuc) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, sonuc } : m));
  const setAciklama = (idx, aciklama) => setMaddeler(prev => prev.map((m, i) => i === idx ? { ...m, aciklama } : m));

  const nokSayisi = maddeler.filter(m => m.sonuc === "Uygun Değil").length;
  const genelSonuc = maddeler.some(m => m.sonuc === "") ? "Devam Ediyor" : (nokSayisi > 0 ? "Kaldı" : "Geçti");

  const save = () => { onSave({ ...header, maddeler, nokSayisi, genelSonuc, doldu: true }); onClose(); };

  let runningIdx = -1;

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 680, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={styles.drawerHeader}>
          <h2 style={styles.formTitle}>{title} — Araç #{vehicle.no}</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 14 }}>Form no: {formNo}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {headerFields.map(f => (
            <div key={f.key}>
              <label style={styles.inputLabel}>{f.label}</label>
              <input type={f.type || "text"} style={f.type === "date" || f.type === "time" ? styles.selectInput : styles.mainInput} value={header[f.key]} onChange={e => setHeader(h => ({ ...h, [f.key]: e.target.value }))} />
            </div>
          ))}
        </div>

        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", marginBottom: 6 }}>▶ {section.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {section.items.map((itemText) => {
                runningIdx++;
                const idx = runningIdx;
                const m = maddeler[idx];
                return (
                  <div key={idx} style={{ background: "#0F172A", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, flex: 1 }}>{itemText}</span>
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "Uygun" ? styles.resultPillOk : {}) }} onClick={() => setSonuc(idx, "Uygun")}>Uygun</button>
                        <button type="button" style={{ ...styles.resultPill, ...(m.sonuc === "Uygun Değil" ? styles.resultPillNok : {}) }} onClick={() => setSonuc(idx, "Uygun Değil")}>Uygun Değil</button>
                      </div>
                    </div>
                    {m.sonuc === "Uygun Değil" && (
                      <input style={{ ...styles.mainInput, fontSize: 11, marginTop: 6 }} placeholder="Neden? Açıklama yazın..." value={m.aciklama} onChange={e => setAciklama(idx, e.target.value)} autoFocus />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8, padding: 12, background: "#0F172A", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>Uygun Değil: <b style={{ color: "#EF4444" }}>{nokSayisi}</b> / {maddeler.length}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: genelSonuc === "Geçti" ? "#10B981" : genelSonuc === "Kaldı" ? "#EF4444" : "#F59E0B" }}>{genelSonuc}</span>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
          <button style={styles.primaryActionBtn} onClick={save}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

function ReworkModal({ vehicle, onClose, onSave }) {
  const [text, setText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 480;
        let width = img.width, height = img.height;
        if (width > height && width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
        else if (height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        setImageDataUrl(canvas.toDataURL("image/jpeg", 0.7));
        setProcessing(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const save = () => { if (!text.trim()) return; onSave({ text, gorsel: imageDataUrl }); };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 460 }}>
        <div style={styles.drawerHeader}>
          <h2 style={styles.formTitle}>Rework / Hata Bildir — Araç #{vehicle.no}</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          <div>
            <label style={styles.inputLabel}>Açıklama</label>
            <input style={styles.mainInput} placeholder="Hata / rework açıklaması..." value={text} onChange={e => setText(e.target.value)} autoFocus />
          </div>
          <div>
            <label style={styles.inputLabel}>Hata Görseli (opsiyonel)</label>
            {imageDataUrl ? (
              <div style={{ position: "relative", display: "inline-block", marginTop: 4 }}>
                <img src={imageDataUrl} alt="Hata görseli" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 8, border: "1px solid #334155", display: "block" }} />
                <button type="button" style={{ position: "absolute", top: 6, right: 6, background: "#EF4444", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setImageDataUrl(null)}><X size={13} color="#fff" /></button>
              </div>
            ) : (
              <button type="button" style={{ ...styles.ghostBtn, width: "100%", padding: "18px 0", borderStyle: "dashed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }} onClick={() => fileInputRef.current?.click()} disabled={processing}>
                <FileUp size={16} /> {processing ? "Yükleniyor..." : "Görsel Seç"}
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
          </div>
          <div style={{ fontSize: 10, color: "#64748B" }}>Bu kayıt görseliyle birlikte otomatik olarak Uygunsuzluk Takip listesine de eklenir.</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
            <button style={styles.primaryActionBtn} onClick={save}>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAdvanceInfo(v) {
  if (v.konum === "fabrika1") {
    const idx = FABRIKA1_STAGES.indexOf(v.asama);
    if (idx === -1) return null;
    if (idx < FABRIKA1_STAGES.length - 1) return { label: "Sonraki Aşama", next: { konum: "fabrika1", asama: FABRIKA1_STAGES[idx + 1] } };
    return { label: "Depoya Sevk Et", next: { konum: "depo", asama: DEPO_STAGES[0] } };
  }
  const idx = DEPO_STAGES.indexOf(v.asama);
  if (idx === -1 || idx >= DEPO_STAGES.length - 1) return null;
  const nextStage = DEPO_STAGES[idx + 1];
  return { label: nextStage === "Serbestlik" ? "Serbestliğe Sevk Et" : "Sonraki Aşama", next: { konum: "depo", asama: nextStage } };
}

function ReportDetail({ report, onUpdate, onClose, currentUser, onAddUygunsuzluk }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(report.baslik);
  const [addingTo, setAddingTo] = useState(null); // { konum, asama } | null
  const [vehForm, setVehForm] = useState({ no: "", detay: "", tarih: todayStr() });
  const [editingVehId, setEditingVehId] = useState(null);
  const [editForm, setEditForm] = useState({ no: "", asama: "", detay: "", tarih: "" });
  const [reworkModalFor, setReworkModalFor] = useState(null); // vehId | null
  const [formModalFor, setFormModalFor] = useState(null); // { vehId, tip: "ee" | "final" } | null

  const araclar = report.araclar || [];
  const fabrikaCount = araclar.filter(a => a.konum === "fabrika1").length;
  const depoCount = araclar.filter(a => a.konum === "depo" && a.asama !== "Serbestlik").length;
  const serbestCount = araclar.filter(a => a.asama === "Serbestlik").length;

  const saveTitle = () => {
    onUpdate({ ...report, baslik: titleDraft.trim() || report.baslik });
    setEditingTitle(false);
  };

  const updateMeta = (patch) => onUpdate({ ...report, ...patch });

  const openAddForm = (konum, asama) => {
    setVehForm({ no: "", detay: "", tarih: todayStr() });
    setAddingTo({ konum, asama });
    setEditingVehId(null);
  };

  const addVehicle = () => {
    if (!vehForm.no.trim() || !addingTo) return;
    const v = { id: uid(), no: vehForm.no.trim(), konum: addingTo.konum, asama: addingTo.asama, detay: vehForm.detay.trim(), tarih: vehForm.tarih, reworklar: [] };
    onUpdate({ ...report, araclar: [...araclar, v] });
    setAddingTo(null);
  };

  const openEditForm = (v) => {
    setEditForm({ no: v.no, asama: v.asama, detay: v.detay, tarih: v.tarih });
    setEditingVehId(v.id);
    setAddingTo(null);
  };

  const saveEdit = () => {
    onUpdate({ ...report, araclar: araclar.map(a => a.id === editingVehId ? { ...a, no: editForm.no.trim(), asama: editForm.asama, detay: editForm.detay.trim(), tarih: editForm.tarih } : a) });
    setEditingVehId(null);
  };

  const removeVehicle = (id) => onUpdate({ ...report, araclar: araclar.filter(a => a.id !== id) });

  const advanceVehicle = (v) => {
    const info = getAdvanceInfo(v);
    if (!info) return;
    onUpdate({ ...report, araclar: araclar.map(a => a.id === v.id ? { ...a, konum: info.next.konum, asama: info.next.asama, tarih: todayStr() } : a) });
  };

  // Çek-bırak: bir araç kartı herhangi bir sütuna sürüklenip bırakılabilir —
  // ileri VEYA geri (işlemi geri almak için). "Sonraki Aşama" butonuyla
  // aynı güncellemeyi yapar, sadece hedef aşamayı kullanıcı seçer.
  const moveVehicleToColumn = (vehId, konum, asama) => {
    onUpdate({ ...report, araclar: araclar.map(a => a.id === vehId ? { ...a, konum, asama, tarih: todayStr() } : a) });
  };

  const addRework = (vehId, { text, gorsel }) => {
    if (!text.trim()) return;
    const vehicle = araclar.find(a => a.id === vehId);
    const rwId = uid();
    onUpdate({ ...report, araclar: araclar.map(a => a.id === vehId ? { ...a, reworklar: [...(a.reworklar || []), { id: rwId, text: text.trim(), tarih: todayStr(), done: false, gorsel: gorsel || null }] } : a) });
    if (onAddUygunsuzluk && vehicle) {
      onAddUygunsuzluk({
        id: uid(),
        tarih: todayStr(),
        saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        yer: `${KONUM_META[vehicle.konum]?.label || vehicle.konum} — ${vehicle.asama}`,
        aracVin: vehicle.no,
        aciklama: text.trim(),
        tespitEden: currentUser?.name || "—",
        oncelik: "Orta",
        durum: "acik",
        aksiyon: "",
        kapatan: null,
        kapanmaTarihi: null,
        gorsel: gorsel || null,
        kaynakReworkId: rwId,
      });
    }
    setReworkModalFor(null);
  };

  const toggleRework = (vehId, rwId) => onUpdate({ ...report, araclar: araclar.map(a => a.id === vehId ? { ...a, reworklar: a.reworklar.map(r => r.id === rwId ? { ...r, done: !r.done } : r) } : a) });

  const removeRework = (vehId, rwId) => onUpdate({ ...report, araclar: araclar.map(a => a.id === vehId ? { ...a, reworklar: a.reworklar.filter(r => r.id !== rwId) } : a) });

  const FORM_KEY_MAP = { ee: "eeKontrol", final: "finalKontrol", "ee-fabrika": "eeKontrolFabrika", "suruş": "suruşTesti" };
  const FORM_TITLES = { ee: "Depo — EE Kontrol", final: "Depo — Final Kontrol", "ee-fabrika": "Fabrika 1 — EE Kontrol", "suruş": "Fabrika 1 — Sürüş Testi" };
  const isFail = (sonuc) => sonuc === "NOK" || sonuc === "Uygun Değil";

  const saveVehicleForm = (vehId, tip, data) => {
    const vehicle = araclar.find(a => a.id === vehId);
    const previousData = vehicle?.formVerisi?.[FORM_KEY_MAP[tip]];
    // Bir öncesinde de "başarısız" olan maddelerin index'lerini tutuyoruz ki
    // her yeniden kaydetmede aynı hata için tekrar tekrar uygunsuzluk kaydı
    // oluşturulmasın — sadece YENİ başarısız olan maddeler için kayıt açılır.
    const previousFailIdx = new Set(
      (previousData?.maddeler || []).map((m, i) => (isFail(m.sonuc) ? i : null)).filter(i => i !== null)
    );

    onUpdate({ ...report, araclar: araclar.map(a => a.id === vehId ? { ...a, formVerisi: { ...(a.formVerisi || {}), [FORM_KEY_MAP[tip]]: data } } : a) });

    if (onAddUygunsuzluk && vehicle) {
      (data.maddeler || []).forEach((m, i) => {
        if (isFail(m.sonuc) && !previousFailIdx.has(i)) {
          onAddUygunsuzluk({
            id: uid(),
            tarih: data.tarih || todayStr(),
            saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            yer: `${FORM_TITLES[tip]}${m.section ? " / " + m.section : ""}`,
            aracVin: vehicle.no,
            aciklama: `${m.item}${m.aciklama ? " — " + m.aciklama : ""}`,
            tespitEden: data.kontrolEden || currentUser?.name || "—",
            oncelik: "Orta",
            durum: "acik",
            aksiyon: "",
            kapatan: null,
            kapanmaTarihi: null,
            gorsel: null,
            kaynakForm: tip,
          });
        }
      });
    }
  };

  const exportPdf = () => {
    const prevTitle = document.title;
    document.title = `${report.tarih}_Kalite_Guvence_Gun_Ozet_Raporu_v${report.seq}`;
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 800);
  };

  const fabrikaAraclar = araclar.filter(a => a.konum === "fabrika1");
  const depoAraclar = araclar.filter(a => a.konum === "depo" && a.asama !== "Serbestlik");
  const serbestAraclar = araclar.filter(a => a.asama === "Serbestlik");

  const todayISO = todayStr();
  const startOfWeekISO = (() => {
    const d = new Date();
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diff);
    return monday.toISOString().slice(0, 10);
  })();
  const releasedToday = serbestAraclar.filter(a => a.tarih === todayISO).length;
  const releasedThisWeek = serbestAraclar.filter(a => a.tarih >= startOfWeekISO && a.tarih <= todayISO).length;

  const printGroup = (title, list, color, showDurum) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 6, borderBottom: "1px solid #ccc", paddingBottom: 4 }}>{title} ({list.length})</div>
      {list.length === 0 ? (
        <div style={{ fontSize: 11, fontStyle: "italic" }}>Kayıt yok.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Araç No</th>
              {showDurum ? <th style={styles.th}>Serbest Tarihi</th> : <th style={styles.th}>Mevcut Aşama</th>}
              <th style={styles.th}>Detay</th>
              {showDurum && <th style={styles.th}>Durum</th>}
            </tr>
          </thead>
          <tbody>
            {list.map(v => (
              <tr key={v.id} style={styles.tr}>
                <td style={styles.td}>Araç #{v.no}</td>
                {showDurum ? <td style={styles.td}>{fmtDate(v.tarih)}</td> : <td style={styles.td}>{v.asama}</td>}
                <td style={styles.td}>
                  {v.detay}
                  {(v.reworklar || []).length > 0 ? ` | Rework: ${v.reworklar.map(r => (r.done ? "[✓] " : "") + r.text).join("; ")}` : ""}
                  {v.formVerisi?.eeKontrol?.doldu ? ` | EE Kontrol: ${v.formVerisi.eeKontrol.genelSonuc} (${v.formVerisi.eeKontrol.nokSayisi} NOK)` : ""}
                  {v.formVerisi?.finalKontrol?.doldu ? ` | Final Kontrol: ${v.formVerisi.finalKontrol.genelSonuc} (${v.formVerisi.finalKontrol.nokSayisi} NOK)` : ""}
                </td>
                {showDurum && <td style={styles.td}>Serbest (OK)</td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderColumn = (col) => {
    const colVehicles = araclar.filter(a => a.konum === col.konum && a.asama === col.asama);
    const color = KONUM_META[col.konum].color;
    const colKey = `${col.konum}-${col.asama}`;
    return (
      <div
        key={colKey}
        style={styles.aracKanbanCol}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
        onDrop={(e) => { e.preventDefault(); const vehId = e.dataTransfer.getData("text"); if (vehId) moveVehicleToColumn(vehId, col.konum, col.asama); }}
      >
        <div style={{ ...styles.aracKanbanColHeader, borderTopColor: color }}>
          <div style={{ fontSize: 9, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{KONUM_META[col.konum].label}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color }}>{col.asama}</span>
            <span style={styles.kanbanBadge}>{colVehicles.length}</span>
          </div>
        </div>
        <div style={styles.aracKanbanColBody}>
          <button style={styles.aracAddColBtn} onClick={() => openAddForm(col.konum, col.asama)}><Plus size={11} /> Araç Ekle</button>
          {addingTo && addingTo.konum === col.konum && addingTo.asama === col.asama && (
            <div style={styles.aracVehCard}>
              <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px" }} placeholder="Araç No" value={vehForm.no} onChange={e => setVehForm(f => ({ ...f, no: e.target.value }))} autoFocus />
              <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} placeholder="Detay" value={vehForm.detay} onChange={e => setVehForm(f => ({ ...f, detay: e.target.value }))} />
              <input type="date" style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} value={vehForm.tarih} onChange={e => setVehForm(f => ({ ...f, tarih: e.target.value }))} />
              <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                <button style={{ ...styles.addInlineBtn, flex: 1, fontSize: 11 }} onClick={addVehicle}>Ekle</button>
                <button style={{ ...styles.ghostBtn, flex: 1, fontSize: 11, padding: "6px 0" }} onClick={() => setAddingTo(null)}>Vazgeç</button>
              </div>
            </div>
          )}
          {colVehicles.map(v => {
            const advance = getAdvanceInfo(v);
            return editingVehId === v.id ? (
              <div key={v.id} style={styles.aracVehCard}>
                <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px" }} value={editForm.no} onChange={e => setEditForm(f => ({ ...f, no: e.target.value }))} />
                <select style={{ ...styles.selectInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} value={editForm.asama} onChange={e => setEditForm(f => ({ ...f, asama: e.target.value }))}>
                  {(v.konum === "fabrika1" ? FABRIKA1_STAGES : DEPO_STAGES).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} placeholder="Detay" value={editForm.detay} onChange={e => setEditForm(f => ({ ...f, detay: e.target.value }))} />
                <input type="date" style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} value={editForm.tarih} onChange={e => setEditForm(f => ({ ...f, tarih: e.target.value }))} />
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  <button style={{ ...styles.addInlineBtn, flex: 1, fontSize: 11 }} onClick={saveEdit}>Kaydet</button>
                  <button style={{ ...styles.ghostBtn, flex: 1, fontSize: 11, padding: "6px 0" }} onClick={() => setEditingVehId(null)}>Vazgeç</button>
                </div>
              </div>
            ) : (
              <div
                key={v.id}
                style={styles.aracVehCard}
                className="hover-lift"
                draggable
                onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text", v.id); }}
                title="Başka bir aşamaya sürükleyip bırakabilirsiniz"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><GripVertical size={11} color="#475569" /><span style={styles.reportRowNo}>#{v.no}</span></span>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Edit2 size={11} color="#38BDF8" style={{ cursor: "pointer" }} onClick={() => openEditForm(v)} />
                    <Trash2 size={11} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeVehicle(v.id)} />
                  </div>
                </div>
                {v.detay && <div style={{ fontSize: 11, color: "#CBD5E1", marginTop: 4 }}>{v.detay}</div>}
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>{fmtDate(v.tarih)}</div>
                {(v.reworklar || []).map(rw => (
                  <div key={rw.id} style={{ fontSize: 10, marginTop: 4, display: "flex", alignItems: "flex-start", gap: 5, cursor: "pointer" }} onClick={() => toggleRework(v.id, rw.id)}>
                    {rw.done ? <CheckSquare size={11} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} /> : <Square size={11} color="#F87171" style={{ flexShrink: 0, marginTop: 1 }} />}
                    {rw.gorsel && <img src={rw.gorsel} alt="Hata görseli" style={{ width: 28, height: 28, objectFit: "cover", borderRadius: 4, border: "1px solid #334155", flexShrink: 0 }} />}
                    <span style={{ color: rw.done ? "#64748B" : "#FCA5A5", textDecoration: rw.done ? "line-through" : "none", flex: 1 }}>🔧 {rw.text}</span>
                    <X size={9} style={{ cursor: "pointer", flexShrink: 0, marginTop: 2 }} onClick={(e) => { e.stopPropagation(); removeRework(v.id, rw.id); }} />
                  </div>
                ))}
                <button style={styles.aracReworkBtn} onClick={() => setReworkModalFor(v.id)}>+ Rework / Hata Bildir</button>
                {advance && (
                  <button style={styles.aracAdvanceBtn} onClick={() => advanceVehicle(v)}>{advance.label} <ArrowRight size={11} /></button>
                )}
                {!advance && v.asama === "Serbestlik" && <div style={styles.aracServeBadge}>✓ Serbest — müşteriye gidebilir</div>}

                {col.konum === "depo" && col.asama === "EE Kontrol" && (
                  v.formVerisi?.eeKontrol?.doldu ? (
                    <button style={{ ...styles.formResultBadge, borderColor: v.formVerisi.eeKontrol.genelSonuc === "Geçti" ? "#10B981" : "#EF4444", color: v.formVerisi.eeKontrol.genelSonuc === "Geçti" ? "#10B981" : "#EF4444" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "ee" })}>
                      <FileText size={11} /> EE Kontrol: {v.formVerisi.eeKontrol.genelSonuc} ({v.formVerisi.eeKontrol.nokSayisi} NOK)
                    </button>
                  ) : (
                    <button style={{ ...styles.formResultBadge, borderColor: "#F59E0B", color: "#F59E0B" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "ee" })}>
                      <FileUp size={11} /> EE Kontrol Formunu Doldur
                    </button>
                  )
                )}
                {col.konum === "depo" && col.asama === "Final Kontrol" && (
                  v.formVerisi?.finalKontrol?.doldu ? (
                    <button style={{ ...styles.formResultBadge, borderColor: v.formVerisi.finalKontrol.genelSonuc === "Geçti" ? "#10B981" : "#EF4444", color: v.formVerisi.finalKontrol.genelSonuc === "Geçti" ? "#10B981" : "#EF4444" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "final" })}>
                      <FileText size={11} /> Final Kontrol: {v.formVerisi.finalKontrol.genelSonuc} ({v.formVerisi.finalKontrol.nokSayisi} NOK)
                    </button>
                  ) : (
                    <button style={{ ...styles.formResultBadge, borderColor: "#F59E0B", color: "#F59E0B" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "final" })}>
                      <FileUp size={11} /> Final Kontrol Formunu Doldur
                    </button>
                  )
                )}
                {col.konum === "fabrika1" && col.asama === "EE Kontrol" && (
                  v.formVerisi?.eeKontrolFabrika?.doldu ? (
                    <button style={{ ...styles.formResultBadge, borderColor: v.formVerisi.eeKontrolFabrika.genelSonuc === "Geçti" ? "#10B981" : "#EF4444", color: v.formVerisi.eeKontrolFabrika.genelSonuc === "Geçti" ? "#10B981" : "#EF4444" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "ee-fabrika" })}>
                      <FileText size={11} /> EE Kontrol: {v.formVerisi.eeKontrolFabrika.genelSonuc} ({v.formVerisi.eeKontrolFabrika.nokSayisi} Uygun Değil)
                    </button>
                  ) : (
                    <button style={{ ...styles.formResultBadge, borderColor: "#F59E0B", color: "#F59E0B" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "ee-fabrika" })}>
                      <FileUp size={11} /> EE Kontrol Formunu Doldur
                    </button>
                  )
                )}
                {col.konum === "fabrika1" && col.asama === "Sürüş Testi" && (
                  v.formVerisi?.suruşTesti?.doldu ? (
                    <button style={{ ...styles.formResultBadge, borderColor: v.formVerisi.suruşTesti.genelSonuc === "Geçti" ? "#10B981" : "#EF4444", color: v.formVerisi.suruşTesti.genelSonuc === "Geçti" ? "#10B981" : "#EF4444" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "suruş" })}>
                      <FileText size={11} /> Sürüş Testi: {v.formVerisi.suruşTesti.genelSonuc} ({v.formVerisi.suruşTesti.nokSayisi} Uygun Değil)
                    </button>
                  ) : (
                    <button style={{ ...styles.formResultBadge, borderColor: "#F59E0B", color: "#F59E0B" }} onClick={() => setFormModalFor({ vehId: v.id, tip: "suruş" })}>
                      <FileUp size={11} /> Sürüş Test Kartını Doldur
                    </button>
                  )
                )}
              </div>
            );
          })}
          {colVehicles.length === 0 && !(addingTo && addingTo.konum === col.konum && addingTo.asama === col.asama) && (
            <div style={{ fontSize: 10, color: "#475569", fontStyle: "italic", textAlign: "center", padding: "10px 0" }}>Boş</div>
          )}
        </div>
      </div>
    );
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

      <div style={{ marginBottom: 10 }} className="no-print">
        <label style={styles.inputLabel}>Son Durum Özeti</label>
        <textarea
          style={{ ...styles.mainInput, minHeight: 64, resize: "vertical", fontFamily: "inherit", padding: "8px 10px" }}
          placeholder="Örn: Yeni Eklenenler: #149, #151... | Hazır Durumdakiler: ... | Rework Devam Eden: ..."
          value={report.sonDurumOzeti || ""}
          onChange={e => updateMeta({ sonDurumOzeti: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", gap: 16 }} className="no-print">
        <div style={styles.vertStatRail}>
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#94A3B8" }} /><div><div style={styles.vertStatValue}>{araclar.length}</div><div style={styles.vertStatLabel}>Toplam Araç</div></div></div>
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#38BDF8" }} /><div><div style={styles.vertStatValue}>{fabrikaCount}</div><div style={styles.vertStatLabel}>Fabrika 1</div></div></div>
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#F59E0B" }} /><div><div style={styles.vertStatValue}>{depoCount}</div><div style={styles.vertStatLabel}>Depodaki</div></div></div>
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#10B981" }} /><div><div style={styles.vertStatValue}>{serbestCount}</div><div style={styles.vertStatLabel}>Serbest Kalan (Toplam)</div></div></div>
          <div style={{ borderTop: "1px solid #1E293B", margin: "2px 0" }} />
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#34D399" }} /><div><div style={styles.vertStatValue}>{releasedToday}</div><div style={styles.vertStatLabel}>Bugün Serbest Kalan</div></div></div>
          <div style={styles.vertStatItem}><div style={{ ...styles.vertStatDot, background: "#6EE7B7" }} /><div><div style={styles.vertStatValue}>{releasedThisWeek}</div><div style={styles.vertStatLabel}>Bu Hafta Serbest Kalan</div></div></div>
        </div>

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div style={styles.kanbanRowLabel}><span style={{ color: KONUM_META.fabrika1.color }}>●</span> Fabrika 1 (Şube)</div>
            <div style={styles.aracKanbanScroll}>
              {ARAC_KANBAN_COLUMNS.filter(c => c.konum === "fabrika1").map(renderColumn)}
            </div>
          </div>
          <div>
            <div style={styles.kanbanRowLabel}><span style={{ color: KONUM_META.depo.color }}>●</span> Depo</div>
            <div style={styles.aracKanbanScroll}>
              {ARAC_KANBAN_COLUMNS.filter(c => c.konum === "depo").map(renderColumn)}
            </div>
          </div>
        </div>
      </div>

      {/* Sadece yazdırırken görünen sade görünüm — orijinal PDF rapor
          yapısıyla (başlık + özet sayılar + akış satırı + 3 numaralı
          bölüm) birebir aynı. */}
      <div className="print-only">
        <div style={{ fontSize: 18, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>{report.baslik.toUpperCase()}</div>
        <div style={{ fontSize: 11, textAlign: "center", marginBottom: 14 }}>
          Tarih: {fmtDate(report.tarih)} | Hazırlayan: {report.hazirlayan} | Bölüm: {report.bolum}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 11, fontWeight: 700, marginBottom: 10, flexWrap: "wrap" }}>
          <span>FABRİKA 1: {fabrikaAraclar.length} Araç</span>
          <span>DEPO (İŞLEM/TEST/KONTROL): {depoAraclar.length} Araç</span>
          <span>SERBEST BIRAKILAN: {serbestAraclar.length} Araç</span>
          <span>TOPLAM TAKİP: {araclar.length} Araç</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 11, marginBottom: 10, flexWrap: "wrap" }}>
          <span>Bugün Serbest Kalan: {releasedToday} Araç</span>
          <span>Bu Hafta Serbest Kalan: {releasedThisWeek} Araç</span>
        </div>
        <div style={{ fontSize: 10, textAlign: "center", marginBottom: 18, fontStyle: "italic" }}>
          KALİTE KONTROL STANDART AKIŞI (Fabrika 1): {FABRIKA1_STAGES.join(" ➔ ")} ➔ Depoya Sevk<br />
          KALİTE KONTROL STANDART AKIŞI (Depo): {DEPO_STAGES.join(" ➔ ")}
        </div>
        {report.sonDurumOzeti && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Son Durum Özeti ({fmtDate(report.tarih)})</div>
            <div style={{ fontSize: 11, whiteSpace: "pre-line" }}>{report.sonDurumOzeti}</div>
          </div>
        )}
        {printGroup("1. Fabrika 1 Araçları", fabrikaAraclar, "#0369A1", false)}
        {printGroup("2. Depodaki Araçlar (İşlem ve Rework Sürecindekiler)", depoAraclar, "#B45309", false)}
        {printGroup("3. Serbest Bırakılan Araçlar", serbestAraclar, "#047857", true)}
      </div>

      {formModalFor && formModalFor.tip === "ee" && (
        <EEKontrolModal vehicle={araclar.find(a => a.id === formModalFor.vehId)} onClose={() => setFormModalFor(null)} onSave={(data) => saveVehicleForm(formModalFor.vehId, "ee", data)} />
      )}
      {formModalFor && formModalFor.tip === "final" && (
        <FinalKontrolModal vehicle={araclar.find(a => a.id === formModalFor.vehId)} onClose={() => setFormModalFor(null)} onSave={(data) => saveVehicleForm(formModalFor.vehId, "final", data)} />
      )}
      {formModalFor && formModalFor.tip === "ee-fabrika" && (
        <VehicleChecklistModal
          vehicle={araclar.find(a => a.id === formModalFor.vehId)}
          title="E/E Kontrol Formu (Fabrika 1 / Şube)"
          formNo="KY.FR-18"
          sections={EE_KONTROL_SUBE_SECTIONS}
          headerFields={[
            { key: "kontrolEden", label: "Kontrol Eden" },
            { key: "tarih", label: "Tarih", type: "date", default: todayStr() },
            { key: "vinNo", label: "VIN No" },
            { key: "uretimIsEmriNo", label: "Üretim İş Emri No" },
          ]}
          existing={araclar.find(a => a.id === formModalFor.vehId)?.formVerisi?.eeKontrolFabrika}
          onClose={() => setFormModalFor(null)}
          onSave={(data) => saveVehicleForm(formModalFor.vehId, "ee-fabrika", data)}
        />
      )}
      {formModalFor && formModalFor.tip === "suruş" && (
        <VehicleChecklistModal
          vehicle={araclar.find(a => a.id === formModalFor.vehId)}
          title="EOL Sürüş Test Kartı"
          formNo="KY.FR-13"
          sections={SURUS_TEST_SECTIONS}
          headerFields={[
            { key: "kontrolEden", label: "Sürücü" },
            { key: "tarih", label: "Tarih", type: "date", default: todayStr() },
            { key: "vinNo", label: "VIN / Plaka" },
            { key: "baslangicSaat", label: "Başlangıç Saat", type: "time" },
            { key: "bitisSaat", label: "Bitiş Saat", type: "time" },
            { key: "socBaslangic", label: "SOC Başlangıç (%)" },
            { key: "socBitis", label: "SOC Bitiş (%)" },
            { key: "odoBaslangic", label: "Odo Başlangıç (km)" },
            { key: "odoBitis", label: "Odo Bitiş (km)" },
          ]}
          existing={araclar.find(a => a.id === formModalFor.vehId)?.formVerisi?.suruşTesti}
          onClose={() => setFormModalFor(null)}
          onSave={(data) => saveVehicleForm(formModalFor.vehId, "suruş", data)}
        />
      )}
      {reworkModalFor && (
        <ReworkModal
          vehicle={araclar.find(a => a.id === reworkModalFor)}
          onClose={() => setReworkModalFor(null)}
          onSave={(data) => addRework(reworkModalFor, data)}
        />
      )}
    </div>
  );
}

// Fabrika Kontrol / Depo Kontrol istasyonlarından, mümkün olanlar Araç Akış
// Takibi'ndeki gerçek konum+aşama ile eşleştiriliyor — böylece o istasyona
// tıklayınca gerçekten o aşamadaki araçlar görünüyor. Eşleşmesi olmayan
// istasyonlar (henüz Araç Akış Takibi'nde ayrı bir aşama olarak izlenmeyen
// montaj istasyonları) için o konumdaki (Fabrika 1 / Depo) tüm araçlar
// gösterilir.
const STATION_ASAMA_MAP = {
  "fk-ee": { konum: "fabrika1", asama: "EE Kontrol" },
  "fk-suruş": { konum: "fabrika1", asama: "Sürüş Testi" },
  "dk-suruş": { konum: "depo", asama: "Sürüş Testi" },
  "dk-sizdirmazlik": { konum: "depo", asama: "Sızdırmazlık Testi" },
  "dk-ee": { konum: "depo", asama: "EE Kontrol" },
  "dk-final": { konum: "depo", asama: "Final Kontrol" },
};
const STATION_FORM_KEY_MAP = { "fk-ee": "eeKontrolFabrika", "fk-suruş": "suruşTesti", "dk-ee": "eeKontrol", "dk-final": "finalKontrol" };

function NoteQuickModal({ vehicleNo, onClose, onSave }) {
  const [text, setText] = useState("");
  const save = () => { if (text.trim()) onSave(text.trim()); };
  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 420 }}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Not / Sorun Ekle — Araç #{vehicleNo}</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          <input style={styles.mainInput} placeholder="Akışı aksatan sorunu yazın..." value={text} onChange={e => setText(e.target.value)} autoFocus onKeyDown={e => e.key === "Enter" && save()} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
            <button style={styles.primaryActionBtn} onClick={save}>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FabrikaAkisiView({ fabrikaAkisi, onUpdate }) {
  const [addingTo, setAddingTo] = useState(null);
  const [vehForm, setVehForm] = useState({ no: "", detay: "", tarih: todayStr() });
  const [editingVehId, setEditingVehId] = useState(null);
  const [editForm, setEditForm] = useState({ no: "", detay: "" });
  const [noteModalFor, setNoteModalFor] = useState(null);
  const [formModalFor, setFormModalFor] = useState(null);

  const araclar = fabrikaAkisi?.araclar || [];
  const stages = FABRIKA_KONTROL_ITEMS;
  const shortLabel = (label) => label.replace(/^İstasyon \d+ — /, "");

  const moveVehicle = (vehId, istasyonId) => onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === vehId ? { ...a, istasyonId, tarih: todayStr() } : a) });

  const addVehicle = () => {
    if (!vehForm.no.trim()) return;
    const yeni = { id: uid(), no: vehForm.no.trim(), istasyonId: addingTo, detay: vehForm.detay.trim(), tarih: vehForm.tarih, notlar: [], formVerisi: {} };
    onUpdate({ ...fabrikaAkisi, araclar: [...araclar, yeni] });
    setVehForm({ no: "", detay: "", tarih: todayStr() });
    setAddingTo(null);
  };
  const removeVehicle = (id) => onUpdate({ ...fabrikaAkisi, araclar: araclar.filter(a => a.id !== id) });
  const openEditForm = (v) => { setEditingVehId(v.id); setEditForm({ no: v.no, detay: v.detay }); };
  const saveEdit = () => { onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === editingVehId ? { ...a, ...editForm } : a) }); setEditingVehId(null); };

  const addNote = (vehId, text) => onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === vehId ? { ...a, notlar: [...(a.notlar || []), { id: uid(), text, tarih: todayStr(), done: false }] } : a) });
  const toggleNote = (vehId, noteId) => onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === vehId ? { ...a, notlar: a.notlar.map(n => n.id === noteId ? { ...n, done: !n.done } : n) } : a) });
  const removeNote = (vehId, noteId) => onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === vehId ? { ...a, notlar: a.notlar.filter(n => n.id !== noteId) } : a) });

  const saveVehicleForm = (vehId, tip, data) => onUpdate({ ...fabrikaAkisi, araclar: araclar.map(a => a.id === vehId ? { ...a, formVerisi: { ...(a.formVerisi || {}), [tip === "ee" ? "eeKontrolFabrika" : "suruşTesti"]: data } } : a) });

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Fabrika Kontrol — Fabrika Akışı</h1><p style={styles.viewSub}>İstasyon 1'den 8'e araç akışı — araçları sürükleyerek ilerletin, akışı aksatan bir sorun varsa not ekleyin.</p></div>
      </div>

      <div style={styles.aracKanbanScroll}>
        {stages.map((stage, idx) => {
          const stageVehicles = araclar.filter(a => a.istasyonId === stage.id);
          const nextStage = stages[idx + 1];
          const hasForm = stage.id === "fk-ee" || stage.id === "fk-suruş";
          const formKey = stage.id === "fk-ee" ? "eeKontrolFabrika" : "suruşTesti";
          const formTip = stage.id === "fk-ee" ? "ee-fabrika" : "suruş";
          return (
            <div key={stage.id} style={styles.aracKanbanCol} onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }} onDrop={e => { e.preventDefault(); const vehId = e.dataTransfer.getData("text"); if (vehId) moveVehicle(vehId, stage.id); }}>
              <div style={{ ...styles.aracKanbanColHeader, borderTopColor: "#38BDF8" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#38BDF8" }}>{stage.label}</span>
                <span style={styles.kanbanBadge}>{stageVehicles.length}</span>
              </div>
              <div style={styles.aracKanbanColBody}>
                <button style={styles.aracAddColBtn} onClick={() => setAddingTo(stage.id)}><Plus size={11} /> Araç Ekle</button>
                {addingTo === stage.id && (
                  <div style={styles.aracVehCard}>
                    <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px" }} placeholder="Araç No" value={vehForm.no} onChange={e => setVehForm(f => ({ ...f, no: e.target.value }))} autoFocus />
                    <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} placeholder="Detay" value={vehForm.detay} onChange={e => setVehForm(f => ({ ...f, detay: e.target.value }))} />
                    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                      <button style={{ ...styles.addInlineBtn, flex: 1, fontSize: 11 }} onClick={addVehicle}>Ekle</button>
                      <button style={{ ...styles.ghostBtn, flex: 1, fontSize: 11, padding: "6px 0" }} onClick={() => setAddingTo(null)}>Vazgeç</button>
                    </div>
                  </div>
                )}
                {stageVehicles.map(v => editingVehId === v.id ? (
                  <div key={v.id} style={styles.aracVehCard}>
                    <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px" }} value={editForm.no} onChange={e => setEditForm(f => ({ ...f, no: e.target.value }))} />
                    <input style={{ ...styles.mainInput, fontSize: 11, padding: "5px 8px", marginTop: 4 }} value={editForm.detay} onChange={e => setEditForm(f => ({ ...f, detay: e.target.value }))} />
                    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                      <button style={{ ...styles.addInlineBtn, flex: 1, fontSize: 11 }} onClick={saveEdit}>Kaydet</button>
                      <button style={{ ...styles.ghostBtn, flex: 1, fontSize: 11, padding: "6px 0" }} onClick={() => setEditingVehId(null)}>Vazgeç</button>
                    </div>
                  </div>
                ) : (
                  <div key={v.id} style={styles.aracVehCard} className="hover-lift" draggable onDragStart={e => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text", v.id); }} title="Başka bir istasyona sürükleyip bırakabilirsiniz">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><GripVertical size={11} color="#475569" /><span style={styles.reportRowNo}>#{v.no}</span></span>
                      <div style={{ display: "flex", gap: 5 }}>
                        <Edit2 size={11} color="#38BDF8" style={{ cursor: "pointer" }} onClick={() => openEditForm(v)} />
                        <Trash2 size={11} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeVehicle(v.id)} />
                      </div>
                    </div>
                    {v.detay && <div style={{ fontSize: 11, color: "#CBD5E1", marginTop: 4 }}>{v.detay}</div>}
                    <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>{fmtDate(v.tarih)}</div>
                    {(v.notlar || []).map(n => (
                      <div key={n.id} style={{ fontSize: 10, marginTop: 4, display: "flex", alignItems: "flex-start", gap: 5, cursor: "pointer" }} onClick={() => toggleNote(v.id, n.id)}>
                        {n.done ? <CheckSquare size={11} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} /> : <Square size={11} color="#F87171" style={{ flexShrink: 0, marginTop: 1 }} />}
                        <span style={{ color: n.done ? "#64748B" : "#FCA5A5", textDecoration: n.done ? "line-through" : "none", flex: 1 }}>⚠️ {n.text}</span>
                        <X size={9} style={{ cursor: "pointer", flexShrink: 0, marginTop: 2 }} onClick={(e) => { e.stopPropagation(); removeNote(v.id, n.id); }} />
                      </div>
                    ))}
                    <button style={styles.aracReworkBtn} onClick={() => setNoteModalFor(v.id)}>+ Not / Sorun Ekle</button>

                    {hasForm && (
                      v.formVerisi?.[formKey]?.doldu ? (
                        <button style={{ ...styles.formResultBadge, borderColor: v.formVerisi[formKey].genelSonuc === "Geçti" ? "#10B981" : "#EF4444", color: v.formVerisi[formKey].genelSonuc === "Geçti" ? "#10B981" : "#EF4444" }} onClick={() => setFormModalFor({ vehId: v.id, tip: formTip })}>
                          <FileText size={11} /> {formTip === "ee-fabrika" ? "EE Kontrol" : "Sürüş Testi"}: {v.formVerisi[formKey].genelSonuc}
                        </button>
                      ) : (
                        <button style={{ ...styles.formResultBadge, borderColor: "#F59E0B", color: "#F59E0B" }} onClick={() => setFormModalFor({ vehId: v.id, tip: formTip })}>
                          <FileUp size={11} /> Formu Doldur
                        </button>
                      )
                    )}

                    {nextStage && (
                      <button style={styles.aracAdvanceBtn} onClick={() => moveVehicle(v.id, nextStage.id)}>{shortLabel(nextStage.label)} <ArrowRight size={11} /></button>
                    )}
                    {!nextStage && <div style={styles.aracServeBadge}>✓ Hat sonu — 8 istasyon tamamlandı</div>}
                  </div>
                ))}
                {stageVehicles.length === 0 && addingTo !== stage.id && <div style={{ fontSize: 10, color: "#475569", fontStyle: "italic", textAlign: "center", padding: "10px 0" }}>Boş</div>}
              </div>
            </div>
          );
        })}
      </div>

      {noteModalFor && (
        <NoteQuickModal vehicleNo={araclar.find(a => a.id === noteModalFor)?.no} onClose={() => setNoteModalFor(null)} onSave={(text) => { addNote(noteModalFor, text); setNoteModalFor(null); }} />
      )}

      {formModalFor && formModalFor.tip === "ee-fabrika" && (
        <VehicleChecklistModal
          vehicle={araclar.find(a => a.id === formModalFor.vehId)}
          title="E/E Kontrol Formu (Fabrika 1 / Şube)"
          formNo="KY.FR-18"
          sections={EE_KONTROL_SUBE_SECTIONS}
          headerFields={[
            { key: "kontrolEden", label: "Kontrol Eden" },
            { key: "tarih", label: "Tarih", type: "date", default: todayStr() },
            { key: "vinNo", label: "VIN No" },
            { key: "uretimIsEmriNo", label: "Üretim İş Emri No" },
          ]}
          existing={araclar.find(a => a.id === formModalFor.vehId)?.formVerisi?.eeKontrolFabrika}
          onClose={() => setFormModalFor(null)}
          onSave={(data) => { saveVehicleForm(formModalFor.vehId, "ee", data); setFormModalFor(null); }}
        />
      )}
      {formModalFor && formModalFor.tip === "suruş" && (
        <VehicleChecklistModal
          vehicle={araclar.find(a => a.id === formModalFor.vehId)}
          title="EOL Sürüş Test Kartı"
          formNo="KY.FR-13"
          sections={SURUS_TEST_SECTIONS}
          headerFields={[
            { key: "kontrolEden", label: "Sürücü" },
            { key: "tarih", label: "Tarih", type: "date", default: todayStr() },
            { key: "vinNo", label: "VIN / Plaka" },
            { key: "baslangicSaat", label: "Başlangıç Saat", type: "time" },
            { key: "bitisSaat", label: "Bitiş Saat", type: "time" },
            { key: "socBaslangic", label: "SOC Başlangıç (%)" },
            { key: "socBitis", label: "SOC Bitiş (%)" },
            { key: "odoBaslangic", label: "Odo Başlangıç (km)" },
            { key: "odoBitis", label: "Odo Bitiş (km)" },
          ]}
          existing={araclar.find(a => a.id === formModalFor.vehId)?.formVerisi?.suruşTesti}
          onClose={() => setFormModalFor(null)}
          onSave={(data) => { saveVehicleForm(formModalFor.vehId, "suruş", data); setFormModalFor(null); }}
        />
      )}
    </div>
  );
}

function IstasyonAracView({ stationId, title, grup, reports, onNavigate }) {
  const map = STATION_ASAMA_MAP[stationId];
  const latestReport = reports.length > 0 ? [...reports].sort((a, b) => (a.tarih < b.tarih ? 1 : -1))[0] : null;
  const allVehicles = latestReport?.araclar || [];
  const fallbackKonum = stationId.startsWith("fk-") ? "fabrika1" : "depo";
  const vehicles = map
    ? allVehicles.filter(v => v.konum === map.konum && v.asama === map.asama)
    : allVehicles.filter(v => v.konum === fallbackKonum && v.asama !== "Serbestlik");

  const formKey = STATION_FORM_KEY_MAP[stationId];
  const doluSayisi = formKey ? vehicles.filter(v => v.formVerisi?.[formKey]?.doldu).length : null;
  const nokSayisi = formKey ? vehicles.filter(v => v.formVerisi?.[formKey]?.genelSonuc === "Kaldı").length : null;
  const reworkSayisi = vehicles.filter(v => (v.reworklar || []).some(r => !r.done)).length;

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div>
          <h1 style={styles.viewTitle}>{title}</h1>
          <p style={styles.viewSub}>{grup}{!map && " — Araç Akış Takibi'nde henüz ayrı bir aşama olarak izlenmiyor, bu yüzden bu konumdaki tüm araçlar gösteriliyor."}</p>
        </div>
        {latestReport && <button style={styles.printBtn} onClick={() => onNavigate("raporlar")}>Araç Akış Takibi'nde Aç</button>}
      </div>

      <div style={styles.dashboardCardGrid}>
        <div style={{ ...styles.dashCard, borderLeftColor: "#94A3B8" }}><div style={styles.dashCardTitle}>Bu İstasyondaki Araç</div><div style={styles.dashCardValue}>{vehicles.length}</div></div>
        {formKey && <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Form Dolduruldu</div><div style={styles.dashCardValue}>{doluSayisi}/{vehicles.length}</div></div>}
        {formKey && <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Kaldı (NOK)</div><div style={styles.dashCardValue}>{nokSayisi}</div></div>}
        <div style={{ ...styles.dashCard, borderLeftColor: "#F59E0B" }}><div style={styles.dashCardTitle}>Açık Rework</div><div style={styles.dashCardValue}>{reworkSayisi}</div></div>
      </div>

      <div style={styles.yearEndTableCard}>
        {!latestReport ? (
          <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic", textAlign: "center", padding: 30 }}>Henüz Araç Akış Takibi'nde rapor yok.</div>
        ) : vehicles.length === 0 ? (
          <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic", textAlign: "center", padding: 30 }}>Şu anda bu istasyonda araç yok.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Araç No</th>
                <th style={styles.th}>Aşama</th>
                <th style={styles.th}>Detay</th>
                <th style={styles.th}>Tarih</th>
                {formKey && <th style={styles.th}>Form Sonucu</th>}
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.id} style={styles.tr}>
                  <td style={styles.tdTitle}>#{v.no}</td>
                  <td style={styles.td}>{v.asama}</td>
                  <td style={styles.td}>{v.detay}</td>
                  <td style={styles.td}>{fmtDate(v.tarih)}</td>
                  {formKey && (
                    <td style={styles.td}>
                      {v.formVerisi?.[formKey]?.doldu
                        ? <span style={{ color: v.formVerisi[formKey].genelSonuc === "Geçti" ? "#10B981" : "#EF4444", fontWeight: 700 }}>{v.formVerisi[formKey].genelSonuc}</span>
                        : <span style={{ color: "#64748B" }}>Doldurulmadı</span>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function IstasyonKontrolView({ stationId, title, grup, data, onUpdate, currentUser }) {
  const [tab, setTab] = useState("checklist");
  const [newItemText, setNewItemText] = useState("");
  const [newItemTip, setNewItemTip] = useState("check");
  const seedTemplate = STATION_SEED_TEMPLATES[stationId] || [];
  const template = data?.checklistTemplate || seedTemplate;
  const kayitlar = data?.kayitlar || [];
  const hatalar = data?.hatalar || [];
  const today = todayStr();
  const todayKayit = kayitlar.find(k => k.tarih === today);
  // Eski kayıtlar sadece checkedIds tutuyordu (basit onay); yeni sistemde
  // her madde kendi "değer" nesnesini tutuyor (tork/metin/onay) — geriye
  // dönük uyum için checkedIds'i degerler formatına çeviriyoruz.
  const initialDegerler = todayKayit?.degerler || Object.fromEntries((todayKayit?.checkedIds || []).map(id => [id, { checked: true }]));
  const [degerler, setDegerler] = useState(initialDegerler);
  const [kontrolEden, setKontrolEden] = useState(todayKayit?.kontrolEden || currentUser?.name || "");
  const [not, setNot] = useState(todayKayit?.not || "");
  const [hataText, setHataText] = useState("");
  const bekleyenSayisi = kayitlar.filter(k => k.onayDurumu === "bekliyor").length;

  const isItemDone = (item, deg) => {
    const d = (deg || {})[item.id];
    if (!d) return false;
    if (item.tip === "tork") return !!d.torkDeger && !!d.markalama;
    if (item.tip === "metin") return !!(d.metin && d.metin.trim());
    return !!d.checked;
  };
  const countDone = (deg) => template.filter(item => isItemDone(item, deg)).length;
  const degerlerOf = (kayit) => kayit.degerler || Object.fromEntries((kayit.checkedIds || []).map(id => [id, { checked: true }]));

  const addItem = () => {
    const t = newItemText.trim();
    if (!t) return;
    onUpdate({ ...data, checklistTemplate: [...template, { id: uid(), text: t, tip: newItemTip, torkNm: null }] });
    setNewItemText("");
  };
  const removeItem = (id) => onUpdate({ ...data, checklistTemplate: template.filter(i => i.id !== id) });

  const setChecked = (id) => setDegerler(prev => ({ ...prev, [id]: { ...prev[id], checked: !prev[id]?.checked } }));
  const setTorkDeger = (id, val) => setDegerler(prev => ({ ...prev, [id]: { ...prev[id], torkDeger: val } }));
  const setMarkalama = (id) => setDegerler(prev => ({ ...prev, [id]: { ...prev[id], markalama: !prev[id]?.markalama } }));
  const setMetin = (id, val) => setDegerler(prev => ({ ...prev, [id]: { ...prev[id], metin: val } }));

  const saveToday = () => {
    const entry = { id: todayKayit?.id || uid(), tarih: today, kontrolEden: kontrolEden.trim() || "—", degerler, not: not.trim(), onayDurumu: todayKayit?.onayDurumu || "bekliyor", onaylayan: todayKayit?.onaylayan || null, onayTarihi: todayKayit?.onayTarihi || null, aktarildi: todayKayit?.aktarildi || false, aktarilmaTarihi: todayKayit?.aktarilmaTarihi || null };
    const nextKayitlar = todayKayit ? kayitlar.map(k => k.id === todayKayit.id ? entry : k) : [entry, ...kayitlar];
    onUpdate({ ...data, checklistTemplate: template, kayitlar: nextKayitlar });
  };

  const setOnay = (kayitId, durum) => onUpdate({ ...data, kayitlar: kayitlar.map(k => k.id === kayitId ? { ...k, onayDurumu: durum, onaylayan: currentUser.name, onayTarihi: todayStr() } : k) });
  const setAktarildi = (kayitId) => onUpdate({ ...data, kayitlar: kayitlar.map(k => k.id === kayitId ? { ...k, aktarildi: true, aktarilmaTarihi: todayStr() } : k) });

  const addHata = () => {
    const t = hataText.trim();
    if (!t) return;
    const kayit = { id: uid(), tarih: todayStr(), saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), aciklama: t, bildiren: currentUser?.name || "—", cozuldu: false };
    onUpdate({ ...data, hatalar: [kayit, ...hatalar] });
    setHataText("");
  };
  const toggleHataCozuldu = (id) => onUpdate({ ...data, hatalar: hatalar.map(h => h.id === id ? { ...h, cozuldu: !h.cozuldu } : h) });
  const acikHataSayisi = hatalar.filter(h => !h.cozuldu).length;

  const onayBadge = (durum) => durum === "onaylandi" ? { text: "✅ Onaylandı", color: "#10B981" } : durum === "reddedildi" ? { text: "❌ Reddedildi", color: "#EF4444" } : { text: "⏳ Onay Bekliyor", color: "#F59E0B" };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>{title}</h1><p style={styles.viewSub}>{grup}</p></div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={{ ...styles.periodBtn, ...(tab === "checklist" ? styles.periodBtnActive : {}) }} onClick={() => setTab("checklist")}>Checklist</button>
        <button style={{ ...styles.periodBtn, ...(tab === "hata" ? styles.periodBtnActive : {}), position: "relative" }} onClick={() => setTab("hata")}>
          Hata Bildirimi{acikHataSayisi > 0 && <span style={styles.notificationBadge}>{acikHataSayisi}</span>}
        </button>
        <button style={{ ...styles.periodBtn, ...(tab === "gecmis" ? styles.periodBtnActive : {}) }} onClick={() => setTab("gecmis")}>Kontrol Eden</button>
        <button style={{ ...styles.periodBtn, ...(tab === "onay" ? styles.periodBtnActive : {}), position: "relative" }} onClick={() => setTab("onay")}>
          Onay{bekleyenSayisi > 0 && <span style={styles.notificationBadge}>{bekleyenSayisi}</span>}
        </button>
      </div>

      {tab === "checklist" && (
        <div style={styles.yearEndTableCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>{fmtDate(today)} — Bugünkü Kontrol</span>
            {todayKayit && <span style={{ fontSize: 11, fontWeight: 700, color: onayBadge(todayKayit.onayDurumu).color }}>{onayBadge(todayKayit.onayDurumu).text}</span>}
          </div>

          {template.length === 0 && <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic", marginBottom: 12 }}>Henüz checklist maddesi eklenmedi — aşağıdan ekleyin.</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {template.map(item => {
              const d = degerler[item.id] || {};
              const tip = item.tip || "check";
              const done = isItemDone(item, degerler);
              const torkMissingMark = tip === "tork" && d.torkDeger && !d.markalama;
              return (
                <div key={item.id} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 12px", border: torkMissingMark ? "1px solid #EF4444" : "1px solid transparent" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    {tip === "check" && (
                      <span onClick={() => setChecked(item.id)} style={{ cursor: "pointer", display: "flex", marginTop: 1, flexShrink: 0 }}>
                        {d.checked ? <CheckSquare size={18} color="#10B981" /> : <Square size={18} color="#F59E0B" />}
                      </span>
                    )}
                    {tip !== "check" && (done ? <CheckSquare size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} /> : <Square size={18} color="#475569" style={{ flexShrink: 0, marginTop: 1 }} />)}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 13, textDecoration: (tip === "check" && d.checked) ? "line-through" : "none", color: (tip === "check" && d.checked) ? "#64748B" : "#F8FAFC" }}>{item.text}</span>

                      {tip === "tork" && (
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <input type="number" style={{ ...styles.mainInput, width: 90, padding: "5px 8px" }} placeholder={item.torkNm ? String(item.torkNm) : "Nm"} value={d.torkDeger || ""} onChange={e => setTorkDeger(item.id, e.target.value)} />
                            <span style={{ fontSize: 10, color: "#64748B" }}>Nm{item.torkNm ? ` (ref: ${item.torkNm} Nm)` : ""}</span>
                          </div>
                          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer", color: torkMissingMark ? "#EF4444" : "#94A3B8", fontWeight: torkMissingMark ? 700 : 500 }}>
                            <input type="checkbox" checked={!!d.markalama} onChange={() => setMarkalama(item.id)} />
                            Markalama Yapıldı mı?{torkMissingMark ? " (zorunlu)" : ""}
                          </label>
                        </div>
                      )}
                      {tip === "metin" && (
                        <input style={{ ...styles.mainInput, fontSize: 12, marginTop: 6 }} placeholder="Değer girin..." value={d.metin || ""} onChange={e => setMetin(item.id, e.target.value)} />
                      )}
                    </div>
                    <X size={13} color="#EF4444" style={{ cursor: "pointer", flexShrink: 0, marginTop: 2 }} onClick={() => removeItem(item.id)} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            <input style={{ ...styles.mainInput, flex: 1, minWidth: 160 }} placeholder="Yeni checklist maddesi..." value={newItemText} onChange={e => setNewItemText(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()} />
            <select style={{ ...styles.selectInput, maxWidth: 160 }} value={newItemTip} onChange={e => setNewItemTip(e.target.value)}>
              <option value="check">Onay (Uygun/Değil)</option>
              <option value="tork">Tork + Markalama</option>
              <option value="metin">Serbest Metin</option>
            </select>
            <button style={styles.addInlineBtn} onClick={addItem}>+ Ekle</button>
          </div>

          <div style={{ marginBottom: 12 }}><label style={styles.inputLabel}>Kontrol Eden</label><input style={styles.mainInput} value={kontrolEden} onChange={e => setKontrolEden(e.target.value)} placeholder="Operatör adı..." /></div>
          <div style={{ marginBottom: 16 }}><label style={styles.inputLabel}>Not (opsiyonel)</label><input style={styles.mainInput} value={not} onChange={e => setNot(e.target.value)} /></div>

          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 10 }}>{countDone(degerler)}/{template.length} madde tamamlandı</div>
          <button style={styles.primaryActionBtn} onClick={saveToday} disabled={template.length === 0}>Bugünkü Kontrolü Kaydet</button>
        </div>
      )}

      {tab === "hata" && (
        <div style={styles.yearEndTableCard}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            <input style={styles.mainInput} placeholder="Tespit edilen hatayı yazın..." value={hataText} onChange={e => setHataText(e.target.value)} onKeyDown={e => e.key === "Enter" && addHata()} />
            <button style={styles.primaryActionBtn} onClick={addHata}>Bildir</button>
          </div>
          {hatalar.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Bu istasyonda bildirilen hata yok.</div> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {hatalar.map(h => (
                <div key={h.id} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10, border: h.cozuldu ? "1px solid #334155" : "1px solid #EF4444" }}>
                  <span onClick={() => toggleHataCozuldu(h.id)} style={{ cursor: "pointer", flexShrink: 0, marginTop: 1 }}>
                    {h.cozuldu ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#EF4444" />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, textDecoration: h.cozuldu ? "line-through" : "none", color: h.cozuldu ? "#64748B" : "#F8FAFC" }}>{h.aciklama}</div>
                    <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>{fmtDate(h.tarih)} {h.saat} — {h.bildiren} {h.cozuldu ? "· Çözüldü" : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "gecmis" && (
        <div style={styles.yearEndTableCard}>
          {kayitlar.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz kayıt yok.</div> : (
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Tarih</th><th style={styles.th}>Kontrol Eden</th><th style={styles.th}>Tamamlanma</th><th style={styles.th}>Onay Durumu</th><th style={styles.th}>Aktarım</th></tr></thead>
              <tbody>
                {[...kayitlar].sort((a, b) => (a.tarih < b.tarih ? 1 : -1)).map(k => (
                  <tr key={k.id} style={styles.tr}>
                    <td style={styles.td}>{fmtDate(k.tarih)}</td>
                    <td style={styles.td}>{k.kontrolEden}</td>
                    <td style={styles.td}>{countDone(degerlerOf(k))}/{template.length}</td>
                    <td style={{ ...styles.td, color: onayBadge(k.onayDurumu).color, fontWeight: 700 }}>{onayBadge(k.onayDurumu).text}</td>
                    <td style={styles.td}>
                      {k.aktarildi ? (
                        <span style={{ color: "#10B981", fontWeight: 700 }}>✓ Aktarıldı ({fmtDate(k.aktarilmaTarihi)})</span>
                      ) : k.onayDurumu === "onaylandi" ? (
                        <button style={{ ...styles.editIconBtn, fontSize: 11 }} onClick={() => setAktarildi(k.id)}>Sonraki İstasyona Aktar</button>
                      ) : (
                        <span style={{ color: "#64748B" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "onay" && (
        <div style={styles.yearEndTableCard}>
          {kayitlar.filter(k => k.onayDurumu === "bekliyor").length === 0 ? (
            <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Onay bekleyen kayıt yok.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {kayitlar.filter(k => k.onayDurumu === "bekliyor").sort((a, b) => (a.tarih < b.tarih ? 1 : -1)).map(k => (
                <div key={k.id} style={{ background: "#0F172A", borderRadius: 10, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{fmtDate(k.tarih)} — {k.kontrolEden}</span>
                    <span style={{ fontSize: 12, color: "#94A3B8" }}>{countDone(degerlerOf(k))}/{template.length} madde</span>
                  </div>
                  {k.not && <div style={{ fontSize: 12, color: "#CBD5E1", marginBottom: 8 }}>Not: {k.not}</div>}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ ...styles.primaryActionBtn, background: "#10B981" }} onClick={() => setOnay(k.id, "onaylandi")}>Onayla</button>
                    <button style={styles.deleteDangerBtn} onClick={() => setOnay(k.id, "reddedildi")}>Reddet</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const UYGUNSUZLUK_DURUMLAR = [
  { id: "acik", label: "Açık", color: "#EF4444" },
  { id: "inceleniyor", label: "İnceleniyor", color: "#F59E0B" },
  { id: "kapatildi", label: "Kapatıldı", color: "#10B981" },
];
const UYGUNSUZLUK_ONCELIK = ["Düşük", "Orta", "Yüksek", "Kritik"];

function UygunsuzlukTakipView({ uygunsuzluklar, setUygunsuzluklar, currentUser, hataKodlari }) {
  const [showNew, setShowNew] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [vinFilter, setVinFilter] = useState("");
  const selected = uygunsuzluklar.find(u => u.id === selectedId);
  const filtered = vinFilter.trim() === "" ? uygunsuzluklar : uygunsuzluklar.filter(u => (u.aracVin || "").toLowerCase().includes(vinFilter.trim().toLowerCase()));

  const createRecord = (form) => {
    const kayit = { id: uid(), tarih: form.tarih, saat: form.saat, yer: form.yer, aracVin: form.aracVin, aciklama: form.aciklama, tespitEden: form.tespitEden, oncelik: form.oncelik, hataKodu: form.hataKodu || "", durum: "acik", aksiyon: "", kapatan: null, kapanmaTarihi: null };
    setUygunsuzluklar([kayit, ...uygunsuzluklar]);
    setShowNew(false);
  };

  const moveTo = (id, durum) => setUygunsuzluklar(uygunsuzluklar.map(u => u.id === id ? { ...u, durum, ...(durum === "kapatildi" ? { kapatan: currentUser.name, kapanmaTarihi: todayStr() } : {}) } : u));
  const updateRecord = (id, patch) => setUygunsuzluklar(uygunsuzluklar.map(u => u.id === id ? { ...u, ...patch } : u));
  const deleteRecord = (id) => { setUygunsuzluklar(uygunsuzluklar.filter(u => u.id !== id)); setSelectedId(null); };

  const oncelikColor = (o) => o === "Kritik" ? "#EF4444" : o === "Yüksek" ? "#F59E0B" : o === "Orta" ? "#38BDF8" : "#94A3B8";

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Uygunsuzluk Listesi</h1><p style={styles.viewSub}>Tespit edilen yer, saat ve araç VIN numarasıyla izlenebilir uygunsuzluk kaydı.</p></div>
        <button style={styles.primaryActionBtn} onClick={() => setShowNew(true)}><Plus size={16} /> Yeni Uygunsuzluk</button>
      </div>

      <div style={{ position: "relative", maxWidth: 280 }} className="no-print">
        <Search size={13} color="#64748B" style={{ position: "absolute", left: 9, top: 9 }} />
        <input style={{ ...styles.mainInput, paddingLeft: 28, fontSize: 12 }} placeholder="Araç VIN No ile filtrele..." value={vinFilter} onChange={e => setVinFilter(e.target.value)} />
      </div>

      <div style={styles.kanbanGrid}>
        {UYGUNSUZLUK_DURUMLAR.map(stage => {
          const list = filtered.filter(u => u.durum === stage.id);
          return (
            <div key={stage.id} style={styles.kanbanColumn} onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("text"); if (id) moveTo(id, stage.id); }}>
              <div style={{ ...styles.kanbanColumnHeader, borderTopColor: stage.color }}><span style={{ fontWeight: 800, fontSize: 13, color: stage.color }}>{stage.label}</span><span style={styles.kanbanBadge}>{list.length}</span></div>
              <div style={styles.kanbanCardsList}>
                {list.map(u => (
                  <div key={u.id} className="hover-lift" style={styles.kanbanCard} draggable onDragStart={e => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text", u.id); }} onClick={() => setSelectedId(u.id)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: oncelikColor(u.oncelik) }}>{u.oncelik}</span>
                      <span style={{ fontSize: 10, color: "#64748B" }}>{fmtDate(u.tarih)} {u.saat}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 4 }}>
                      {u.gorsel && <img src={u.gorsel} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6, border: "1px solid #334155", flexShrink: 0 }} />}
                      <div style={{ ...styles.kanbanCardTitle, marginTop: 0 }}>{u.hataKodu && <span style={{ color: "#F59E0B", fontFamily: "monospace" }}>[{u.hataKodu}] </span>}{u.aciklama}</div>
                    </div>
                    <div style={styles.kanbanCardFooter}>
                      <span>📍 {u.yer || "—"}</span>
                      {u.aracVin && <span>🚗 {u.aracVin}</span>}
                    </div>
                  </div>
                ))}
                {list.length === 0 && <div style={{ fontSize: 11, color: "#475569", fontStyle: "italic", textAlign: "center", padding: "12px 0" }}>Boş</div>}
              </div>
            </div>
          );
        })}
      </div>

      {showNew && <NewUygunsuzlukModal currentUser={currentUser} hataKodlari={hataKodlari} onClose={() => setShowNew(false)} onCreate={createRecord} />}
      {selected && <UygunsuzlukDetailModal record={selected} hataKodlari={hataKodlari} onClose={() => setSelectedId(null)} onUpdate={(patch) => updateRecord(selected.id, patch)} onDelete={() => deleteRecord(selected.id)} onMove={(durum) => moveTo(selected.id, durum)} />}
    </div>
  );
}

function NewUygunsuzlukModal({ currentUser, hataKodlari, onClose, onCreate }) {
  const now = new Date();
  const [form, setForm] = useState({
    tarih: todayStr(),
    saat: now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    yer: "",
    aracVin: "",
    aciklama: "",
    tespitEden: currentUser?.name || "",
    oncelik: "Orta",
    hataKodu: "",
  });
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.createModalContent}>
        <div style={styles.drawerHeader}><h2 style={styles.formTitle}>Yeni Uygunsuzluk Bildir</h2><button style={styles.closeBtn} onClick={onClose}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={styles.inputLabel}>Tarih</label><input type="date" style={styles.selectInput} value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} /></div>
            <div style={{ flex: 1 }}><label style={styles.inputLabel}>Saat</label><input type="time" style={styles.selectInput} value={form.saat} onChange={e => setForm(f => ({ ...f, saat: e.target.value }))} /></div>
          </div>
          <div><label style={styles.inputLabel}>Tespit Edilen Yer</label><input style={styles.mainInput} placeholder="Örn: EE Kontrol istasyonu, Depo..." value={form.yer} onChange={e => setForm(f => ({ ...f, yer: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Araç VIN No (varsa)</label><input style={styles.mainInput} value={form.aracVin} onChange={e => setForm(f => ({ ...f, aracVin: e.target.value }))} /></div>
          <div><label style={styles.inputLabel}>Açıklama</label><input style={styles.mainInput} placeholder="Uygunsuzluğu açıklayın..." value={form.aciklama} onChange={e => setForm(f => ({ ...f, aciklama: e.target.value }))} /></div>
          {hataKodlari && hataKodlari.length > 0 && (
            <div>
              <label style={styles.inputLabel}>Hata Kodu (opsiyonel)</label>
              <select style={styles.selectInput} value={form.hataKodu} onChange={e => setForm(f => ({ ...f, hataKodu: e.target.value }))}>
                <option value="">— Seçilmedi —</option>
                {hataKodlari.map(h => <option key={h.id} value={h.kod}>{h.kod} — {h.aciklama}</option>)}
              </select>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={styles.inputLabel}>Tespit Eden</label><input style={styles.mainInput} value={form.tespitEden} onChange={e => setForm(f => ({ ...f, tespitEden: e.target.value }))} /></div>
            <div style={{ flex: 1 }}>
              <label style={styles.inputLabel}>Öncelik</label>
              <select style={styles.selectInput} value={form.oncelik} onChange={e => setForm(f => ({ ...f, oncelik: e.target.value }))}>
                {UYGUNSUZLUK_ONCELIK.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
            <button style={styles.primaryActionBtn} onClick={() => { if (!form.aciklama.trim()) return; onCreate(form); }}>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UygunsuzlukDetailModal({ record, hataKodlari, onClose, onUpdate, onDelete, onMove }) {
  const [aksiyon, setAksiyon] = useState(record.aksiyon || "");
  const [hataKodu, setHataKodu] = useState(record.hataKodu || "");
  const stage = UYGUNSUZLUK_DURUMLAR.find(s => s.id === record.durum);
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerHeader}>
          <span style={{ fontSize: 11, fontWeight: 800, color: stage?.color }}>{stage?.label}</span>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={styles.drawerBody}>
          {record.gorsel && <img src={record.gorsel} alt="Uygunsuzluk görseli" style={{ maxWidth: "100%", maxHeight: 260, borderRadius: 8, border: "1px solid #334155" }} />}
          <div style={{ fontSize: 14, fontWeight: 700 }}>{record.aciklama}</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#94A3B8" }}>
            <span>📅 {fmtDate(record.tarih)} {record.saat}</span>
            <span>📍 {record.yer || "—"}</span>
            {record.aracVin && <span>🚗 VIN: {record.aracVin}</span>}
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8" }}>Tespit Eden: <b style={{ color: "#F8FAFC" }}>{record.tespitEden}</b> · Öncelik: <b style={{ color: "#F8FAFC" }}>{record.oncelik}</b></div>

          {hataKodlari && hataKodlari.length > 0 && (
            <div>
              <label style={styles.inputLabel}>Hata Kodu</label>
              <select style={styles.selectInput} value={hataKodu} onChange={e => { setHataKodu(e.target.value); onUpdate({ hataKodu: e.target.value }); }}>
                <option value="">— Seçilmedi —</option>
                {hataKodlari.map(h => <option key={h.id} value={h.kod}>{h.kod} — {h.aciklama}</option>)}
              </select>
            </div>
          )}

          <div>
            <label style={styles.inputLabel}>Aksiyon / Düzeltme</label>
            <input style={styles.mainInput} value={aksiyon} onChange={e => setAksiyon(e.target.value)} onBlur={() => onUpdate({ aksiyon })} placeholder="Yapılan/planlanan düzeltme..." />
          </div>

          {record.durum === "kapatildi" && (
            <div style={{ fontSize: 11, color: "#10B981" }}>✓ {record.kapatan} tarafından {fmtDate(record.kapanmaTarihi)} tarihinde kapatıldı.</div>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {UYGUNSUZLUK_DURUMLAR.filter(s => s.id !== record.durum).map(s => (
              <button key={s.id} style={{ ...styles.periodBtn, borderColor: s.color, color: s.color }} onClick={() => onMove(s.id)}>{s.label}'a Taşı</button>
            ))}
          </div>
        </div>
        <div style={styles.drawerFooter}><button style={styles.deleteDangerBtn} onClick={onDelete}>Sil</button><button style={styles.primaryActionBtn} onClick={onClose}>Kapat</button></div>
      </div>
    </div>
  );
}

function HataKodlariView({ hataKodlari, setHataKodlari }) {
  const [kod, setKod] = useState("");
  const [aciklama, setAciklama] = useState("");

  const addKod = () => {
    if (!kod.trim() || !aciklama.trim()) return;
    if (hataKodlari.some(h => h.kod.toLowerCase() === kod.trim().toLowerCase())) { window.alert("Bu kod zaten kayıtlı."); return; }
    setHataKodlari([...hataKodlari, { id: uid(), kod: kod.trim(), aciklama: aciklama.trim() }]);
    setKod(""); setAciklama("");
  };
  const removeKod = (id) => { if (window.confirm("Bu hata kodunu silmek istediğinize emin misiniz?")) setHataKodlari(hataKodlari.filter(h => h.id !== id)); };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Hata Kodları</h1><p style={styles.viewSub}>Uygunsuzluk kayıtlarında seçilebilecek standart hata kodu kataloğu.</p></div>
      </div>
      <div style={styles.yearEndTableCard}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <input style={{ ...styles.mainInput, maxWidth: 140 }} placeholder="Kod (örn: K-001)" value={kod} onChange={e => setKod(e.target.value)} onKeyDown={e => e.key === "Enter" && addKod()} />
          <input style={{ ...styles.mainInput, flex: 1, minWidth: 200 }} placeholder="Açıklama" value={aciklama} onChange={e => setAciklama(e.target.value)} onKeyDown={e => e.key === "Enter" && addKod()} />
          <button style={styles.primaryActionBtn} onClick={addKod}><Plus size={14} /> Ekle</button>
        </div>
        {hataKodlari.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz hata kodu tanımlanmadı.</div> : (
          <table style={styles.table}>
            <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Açıklama</th><th style={styles.th}></th></tr></thead>
            <tbody>
              {hataKodlari.map(h => (
                <tr key={h.id} style={styles.tr}>
                  <td style={{ ...styles.td, fontFamily: "monospace", fontWeight: 700, color: "#F59E0B" }}>{h.kod}</td>
                  <td style={styles.td}>{h.aciklama}</td>
                  <td style={styles.td}><Trash2 size={13} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeKod(h.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function UygunsuzlukIstatistikView({ uygunsuzluklar }) {
  const total = uygunsuzluklar.length;
  const durumData = UYGUNSUZLUK_DURUMLAR.map(s => ({ ...s, count: uygunsuzluklar.filter(u => u.durum === s.id).length }));
  const oncelikColors = { "Kritik": "#EF4444", "Yüksek": "#F59E0B", "Orta": "#38BDF8", "Düşük": "#94A3B8" };
  const oncelikData = UYGUNSUZLUK_ONCELIK.map(o => ({ label: o, color: oncelikColors[o], count: uygunsuzluklar.filter(u => u.oncelik === o).length }));

  const countBy = (key) => {
    const map = {};
    uygunsuzluklar.forEach(u => { const v = u[key] || "Belirtilmemiş"; map[v] = (map[v] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };
  const yerData = countBy("yer").slice(0, 8);
  const vinData = countBy("aracVin").slice(0, 8);
  const kodData = countBy("hataKodu").filter(([k]) => k !== "Belirtilmemiş").slice(0, 8);

  const kapatilanlar = uygunsuzluklar.filter(u => u.durum === "kapatildi" && u.kapanmaTarihi);
  const ortalamaGun = kapatilanlar.length > 0
    ? Math.round(kapatilanlar.reduce((sum, u) => sum + Math.max(0, (new Date(u.kapanmaTarihi) - new Date(u.tarih)) / 86400000), 0) / kapatilanlar.length)
    : null;

  const maxDurum = Math.max(1, ...durumData.map(d => d.count));
  const maxOncelik = Math.max(1, ...oncelikData.map(d => d.count));
  const maxYer = Math.max(1, ...yerData.map(([, c]) => c));
  const maxVin = Math.max(1, ...vinData.map(([, c]) => c));
  const maxKod = Math.max(1, ...kodData.map(([, c]) => c));

  const bar = (label, count, max, color) => (
    <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 11, width: 130, flexShrink: 0, color: "#CBD5E1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={label}>{label}</span>
      <div style={{ flex: 1, background: "#0F172A", borderRadius: 6, height: 14, overflow: "hidden" }}>
        <div style={{ width: `${(count / max) * 100}%`, height: "100%", background: color }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, width: 20, textAlign: "right" }}>{count}</span>
    </div>
  );

  const exportPdf = () => {
    const prevTitle = document.title;
    document.title = `${todayStr()}_Uygunsuzluk_Istatistik_Raporu`;
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 800);
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Uygunsuzlukların İstatistiği</h1><p style={styles.viewSub}>Yönetim için özet istatistik ve grafikler.</p></div>
        <button style={styles.printBtn} className="no-print" onClick={exportPdf}><Printer size={15} /> PDF Olarak İndir</button>
      </div>

      <div id="print-area">
        <div className="print-only" style={{ fontSize: 16, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>UYGUNSUZLUKLARIN İSTATİSTİK RAPORU</div>
        <div className="print-only" style={{ fontSize: 11, textAlign: "center", marginBottom: 16 }}>Rapor Tarihi: {fmtDate(todayStr())}</div>

        <div style={styles.dashboardCardGrid}>
          <div style={{ ...styles.dashCard, borderLeftColor: "#94A3B8" }}><div style={styles.dashCardTitle}>Toplam Kayıt</div><div style={styles.dashCardValue}>{total}</div></div>
          <div style={{ ...styles.dashCard, borderLeftColor: "#EF4444" }}><div style={styles.dashCardTitle}>Açık</div><div style={styles.dashCardValue}>{durumData.find(d => d.id === "acik")?.count || 0}</div></div>
          <div style={{ ...styles.dashCard, borderLeftColor: "#10B981" }}><div style={styles.dashCardTitle}>Kapatıldı</div><div style={styles.dashCardValue}>{durumData.find(d => d.id === "kapatildi")?.count || 0}</div></div>
          <div style={{ ...styles.dashCard, borderLeftColor: "#38BDF8" }}><div style={styles.dashCardTitle}>Ort. Kapanma Süresi</div><div style={styles.dashCardValue}>{ortalamaGun !== null ? `${ortalamaGun} gün` : "—"}</div></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: "#F59E0B", marginBottom: 14 }}>Duruma Göre Dağılım</h3>
            {total === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz veri yok.</div> : durumData.map(d => bar(d.label, d.count, maxDurum, d.color))}
          </div>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: "#F59E0B", marginBottom: 14 }}>Önceliğe Göre Dağılım</h3>
            {total === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz veri yok.</div> : oncelikData.map(d => bar(d.label, d.count, maxOncelik, d.color))}
          </div>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: "#38BDF8", marginBottom: 14 }}>Yere Göre Dağılım (İlk 8)</h3>
            {yerData.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz veri yok.</div> : yerData.map(([label, count]) => bar(label, count, maxYer, "#38BDF8"))}
          </div>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: "#B07FE0", marginBottom: 14 }}>Araç VIN'e Göre Dağılım (İlk 8)</h3>
            {vinData.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Henüz veri yok.</div> : vinData.map(([label, count]) => bar(`#${label}`, count, maxVin, "#B07FE0"))}
          </div>
          {kodData.length > 0 && (
            <div style={{ ...styles.yearEndTableCard, gridColumn: "1 / -1" }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#F87171", marginBottom: 14 }}>Hata Koduna Göre Dağılım (İlk 8)</h3>
              {kodData.map(([label, count]) => bar(label, count, maxKod, "#F87171"))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormPlaceholderView({ title, grup }) {
  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>{title}</h1><p style={styles.viewSub}>{grup}</p></div>
      </div>
      <div style={{ ...styles.yearEndTableCard, textAlign: "center", padding: "60px 20px" }}>
        <FileUp size={40} color="#475569" style={{ marginBottom: 14 }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: "#CBD5E1", marginBottom: 6 }}>Form altyapısı henüz eklenmedi</div>
        <div style={{ fontSize: 12, color: "#64748B", maxWidth: 380, margin: "0 auto" }}>
          "{title}" için kontrol formu yakında entegre edilecek. Menü yapısı hazır — form geldiğinde bu sayfa gerçek veri girişine dönüşecek.
        </div>
      </div>
    </div>
  );
}

function GrafikYonetimiView({ tasks }) {
  const people = Array.from(new Set(tasks.flatMap(t => [t.sorumlu, ...(t.ekipUyeleri || [])]).filter(Boolean))).sort();
  const [person, setPerson] = useState(people[0] || "");

  const bireysel = tasks.filter(t => t.sorumlu === person && (t.ekipUyeleri || []).length === 0);
  const grup = tasks.filter(t =>
    (t.sorumlu === person && (t.ekipUyeleri || []).length > 0) ||
    (t.ekipUyeleri || []).includes(person) ||
    (t.sorumlu !== person && (t.sorumlu || "").includes(person))
  );

  const chartData = (list) => KANBAN_STAGES.map(s => ({ ...s, count: list.filter(t => t.durum === s.id).length }));
  const bireyselData = chartData(bireysel);
  const grupData = chartData(grup);
  const maxCount = Math.max(1, ...bireyselData.map(d => d.count), ...grupData.map(d => d.count));

  const renderChart = (data, total) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map(d => (
        <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, width: 110, flexShrink: 0, color: d.color }}>{d.label}</span>
          <div style={{ flex: 1, background: "#0F172A", borderRadius: 6, height: 16, overflow: "hidden" }}>
            <div style={{ width: `${(d.count / maxCount) * 100}%`, height: "100%", background: d.color, transition: "width 0.2s" }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, width: 24, textAlign: "right" }}>{d.count}</span>
        </div>
      ))}
      <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>Toplam: {total} kayıt</div>
    </div>
  );

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}>
        <div><h1 style={styles.viewTitle}>Grafik Yönetimi</h1><p style={styles.viewSub}>Bir kişi seçin — bireysel ve grup çalışmaları ayrı grafiklerde görünsün.</p></div>
      </div>

      <select style={{ ...styles.selectInput, maxWidth: 280 }} value={person} onChange={e => setPerson(e.target.value)}>
        {people.length === 0 && <option value="">Kayıtlı kişi yok</option>}
        {people.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {person && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 4 }}>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 16 }}>Bireysel Çalışmaları</h3>
            {renderChart(bireyselData, bireysel.length)}
          </div>
          <div style={styles.yearEndTableCard}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#38BDF8", marginBottom: 16 }}>Grup Çalışmaları</h3>
            {renderChart(grupData, grup.length)}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailedReportView({ tasks, modules }) {
  const moduleLabel = (id) => modules.find(m => m.id === id)?.label || id;
  const [personFilter, setPersonFilter] = useState("hepsi");
  const [titleQuery, setTitleQuery] = useState("");
  const people = Array.from(new Set(tasks.map(t => t.sorumlu).filter(Boolean))).sort();

  const matchesTitle = (t) => titleQuery.trim() === "" || t.baslik.toLowerCase().includes(titleQuery.trim().toLowerCase());

  const renderRows = (list) => list.map(t => (
    <tr key={t.id} style={styles.tr}><td style={styles.td}>{t.kod}</td><td style={styles.tdTitle}>{t.baslik}</td><td style={styles.td}>{moduleLabel(t.module)}</td><td style={styles.td}>{t.sorumlu}</td><td style={styles.td}>{t.oncelik || "—"}</td><td style={styles.td}>{fmtDate(t.vade)}</td><td style={styles.td}>{KANBAN_STAGES.find(s => s.id === t.durum)?.label || t.durum}</td></tr>
  ));

  const tableHead = (
    <thead><tr><th style={styles.th}>Kod</th><th style={styles.th}>Başlık</th><th style={styles.th}>Modül</th><th style={styles.th}>Sorumlu</th><th style={styles.th}>Öncelik</th><th style={styles.th}>Vade</th><th style={styles.th}>Durum</th></tr></thead>
  );

  let content;
  if (personFilter === "hepsi") {
    const filtered = tasks.filter(matchesTitle);
    content = (
      <div style={styles.yearEndTableCard} id="print-area">
        <table style={styles.table}>{tableHead}<tbody>{renderRows(filtered)}</tbody></table>
      </div>
    );
  } else {
    // Bireysel: sorumlu alanı TAM OLARAK bu kişi. Kişilerle: sorumlu alanı
    // bu kişiyi içeriyor ama başka isim(ler)le birlikte (örn. verideki
    // birleşik "AhmetMehmet" gibi çoklu atamalar).
    const bireysel = tasks.filter(t => t.sorumlu === personFilter && matchesTitle(t));
    const kisilerle = tasks.filter(t => t.sorumlu !== personFilter && (t.sorumlu || "").includes(personFilter) && matchesTitle(t));
    content = (
      <div id="print-area">
        <div style={{ ...styles.yearEndTableCard, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>Bireysel Çalışmaları ({bireysel.length})</h3>
          {bireysel.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Bireysel kayıt yok.</div> : <table style={styles.table}>{tableHead}<tbody>{renderRows(bireysel)}</tbody></table>}
        </div>
        <div style={styles.yearEndTableCard}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#38BDF8", marginBottom: 12 }}>Kişilerle Olan Çalışmaları ({kisilerle.length})</h3>
          {kisilerle.length === 0 ? <div style={{ fontSize: 12, color: "#64748B", fontStyle: "italic" }}>Ortak çalışma kaydı yok.</div> : <table style={styles.table}>{tableHead}<tbody>{renderRows(kisilerle)}</tbody></table>}
        </div>
      </div>
    );
  }

  const totalShown = personFilter === "hepsi" ? tasks.filter(matchesTitle).length : tasks.filter(t => (t.sorumlu || "").includes(personFilter) && matchesTitle(t)).length;

  return (
    <div style={styles.viewContainer}>
      <div style={styles.yearEndHeader}><h1 style={styles.viewTitle}>Detaylı Rapor</h1><button style={styles.printBtn} className="no-print" onClick={() => window.print()}><Printer size={15} /> Yazdır</button></div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }} className="no-print">
        <select style={{ ...styles.selectInput, maxWidth: 220 }} value={personFilter} onChange={e => setPersonFilter(e.target.value)}>
          <option value="hepsi">Tüm Kişiler</option>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input style={{ ...styles.mainInput, maxWidth: 260 }} placeholder="Başlığa göre ara..." value={titleQuery} onChange={e => setTitleQuery(e.target.value)} />
        <span style={{ fontSize: 11, color: "#94A3B8", alignSelf: "center" }}>{totalShown} / {tasks.length} kayıt</span>
      </div>

      {content}
    </div>
  );
}

function AdminPermissionsView({ usersList, setUsersList, modules, setModules, contacts, setContacts }) {
  const [showModal, setShowModal] = useState(false);
  const [editingModules, setEditingModules] = useState(() => Object.fromEntries(modules.map(m => [m.id, m.label])));
  const [newModuleLabel, setNewModuleLabel] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [permModalFor, setPermModalFor] = useState(null);

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
          <thead><tr><th style={styles.th}>Adı</th><th style={styles.th}>ID</th><th style={styles.th}>Rol</th><th style={styles.th}>Sekme İzinleri</th><th style={styles.th}>İşlem</th></tr></thead>
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
                    <span style={{ fontSize: 11, color: "#5FAE7B" }}>Admin — her şeyi görür</span>
                  ) : (
                    <button style={styles.editIconBtn} onClick={() => setPermModalFor(u.id)}>
                      İzinleri Düzenle {u.izinliSekmeler ? `(${u.izinliSekmeler.length})` : "(Tümü)"}
                    </button>
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
      {permModalFor && (
        <PermissionsModal
          user={usersList.find(u => u.id === permModalFor)}
          modules={modules}
          onClose={() => setPermModalFor(null)}
          onSave={(izinliSekmeler) => setUsersList(usersList.map(x => x.id === permModalFor ? { ...x, izinliSekmeler } : x))}
        />
      )}
    </div>
  );
}

function PermissionsModal({ user, modules, onClose, onSave }) {
  const groups = buildPermissionGroups(modules);
  const allIds = getAllSectionIds(modules);
  const [selected, setSelected] = useState(user.izinliSekmeler || allIds);

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectAll = () => setSelected(allIds);
  const selectNone = () => setSelected([]);

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.createModalContent, maxWidth: 560, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={styles.drawerHeader}>
          <h2 style={styles.formTitle}>{user.name} — Sekme İzinleri</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
          <button style={styles.ghostBtn} onClick={selectAll}>Tümünü Seç</button>
          <button style={styles.ghostBtn} onClick={selectNone}>Tümünü Kaldır</button>
        </div>
        {groups.map(g => g.items.length > 0 && (
          <div key={g.title} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", marginBottom: 8 }}>{g.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.items.map(item => (
                <label key={item.id} style={{ ...styles.chip, cursor: "pointer", background: selected.includes(item.id) ? "rgba(245,158,11,0.15)" : "#0F172A", borderColor: selected.includes(item.id) ? "#F59E0B" : "#334155" }}>
                  <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button style={styles.ghostBtn} onClick={onClose}>Vazgeç</button>
          <button style={styles.primaryActionBtn} onClick={() => { onSave(selected); onClose(); }}>Kaydet</button>
        </div>
      </div>
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
  appShell: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "radial-gradient(circle at 15% 0%, #1a2440 0%, #0F172A 45%)", color: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "row" },
  header: { display: "flex", alignItems: "center", padding: "12px 24px", background: "linear-gradient(90deg, #1E293B 0%, #16202f 100%)", borderBottom: "2px solid #F59E0B", gap: 16, flexWrap: "wrap" },
  sidebar: { width: 232, minWidth: 232, background: "linear-gradient(180deg, #1E293B 0%, #131b28 100%)", borderRight: "2px solid #F59E0B", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0 },
  sidebarBrand: { display: "flex", alignItems: "center", gap: 10, padding: "20px 16px 16px" },
  navDivider: { height: 1, background: "#334155", margin: "8px 4px" },
  sidebarFooter: { padding: 12, borderTop: "1px solid #334155", display: "flex", flexDirection: "column", gap: 8 },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { background: "rgba(245, 158, 11, 0.15)", padding: 8, borderRadius: 10, display: "flex" },
  brandName: { fontWeight: 800, fontSize: 16, color: "#F59E0B" },
  brandSub: { fontSize: 10, color: "#94A3B8" },
  navTabs: { display: "flex", flexDirection: "column", gap: 4, padding: "0 12px", flex: 1, overflowY: "auto" },
  navTab: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#94A3B8", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", justifyContent: "flex-start", textAlign: "left" },
  navTabActive: { background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", border: "1px solid #F59E0B" },
  navTabAdminActive: { background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444" },
  navGroupHeader: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#94A3B8", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  navGroupBody: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 14, marginTop: 2, marginBottom: 4, borderLeft: "1px solid #334155" },
  navSubTab: { display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 6, border: "none", background: "transparent", color: "#94A3B8", fontSize: 12, fontWeight: 500, cursor: "pointer", width: "100%", justifyContent: "flex-start", textAlign: "left" },
  notificationBellBtn: { background: "#0F172A", border: "1px solid #334155", borderRadius: 8, padding: "8px 10px", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", gap: 8, color: "#F8FAFC", width: "100%" },
  notificationBadge: { position: "absolute", top: -4, right: -4, background: "#EF4444", color: "#FFF", fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: "50%" },
  userProfileBar: { display: "flex", alignItems: "center", gap: 8, background: "#0F172A", padding: "8px 10px", borderRadius: 10, border: "1px solid #334155" },
  userAvatar: { width: 30, height: 30, borderRadius: "50%", background: "#F59E0B", color: "#0F172A", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  userName: { fontSize: 12, fontWeight: 700 },
  userRoleTag: { fontSize: 10, color: "#F59E0B" },
  actionSmallBtn: { background: "transparent", border: "none", cursor: "pointer" },
  errorBar: { background: "rgba(239, 68, 68, 0.2)", padding: 8, color: "#FCA5A5", fontSize: 12, textAlign: "center", borderRadius: 6 },
  mainContent: { flex: 1, minWidth: 0, padding: "24px 28px", overflowY: "auto", height: "100vh" },
  viewContainer: { display: "flex", flexDirection: "column", gap: 20 },
  dashboardCardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 },
  dashCard: { background: "linear-gradient(155deg, #212f47 0%, #1A2536 60%)", border: "1px solid #334155", borderRadius: 12, padding: 16, borderLeft: "4px solid" },
  dashCardTitle: { fontSize: 11, color: "#94A3B8", fontWeight: 600 },
  dashCardValue: { fontSize: 24, fontWeight: 800, marginTop: 6, color: "#F59E0B", textShadow: "0 0 18px rgba(245, 158, 11, 0.35)" },
  periodBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" },
  periodBtnActive: { background: "#F59E0B", color: "#0F172A", border: "1px solid #F59E0B" },
  printBtn: { background: "#1E293B", color: "#38BDF8", border: "1px solid #38BDF8", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  reportRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#0F172A", borderRadius: 6, fontSize: 12 },
  reportRowNo: { fontFamily: "monospace", fontWeight: 800, color: "#F59E0B", flexShrink: 0, width: 44 },
  reportAddForm: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
  addChipBtnSolid: { display: "flex", alignItems: "center", gap: 4, background: "#212934", border: "1px solid #F59E0B", color: "#F59E0B", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  vertStatRail: { display: "flex", flexDirection: "column", gap: 14, minWidth: 170, flexShrink: 0, background: "#0F172A", border: "1px solid #334155", borderRadius: 12, padding: 16 },
  vertStatItem: { display: "flex", alignItems: "center", gap: 10 },
  vertStatDot: { width: 10, height: 10, borderRadius: 10, flexShrink: 0 },
  vertStatValue: { fontSize: 18, fontWeight: 800 },
  vertStatLabel: { fontSize: 10, color: "#94A3B8" },
  aracKanbanScroll: { display: "flex", gap: 18, overflowX: "auto", flex: 1, minWidth: 0, paddingBottom: 8 },
  aracKanbanCol: { background: "#0F172A", border: "1px solid #334155", borderRadius: 10, flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 240, display: "flex", flexDirection: "column", transition: "border-color 0.15s" },
  kanbanRowLabel: { fontSize: 11, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 },
  aracVehCard: { background: "#1E293B", border: "1px solid #334155", borderRadius: 8, padding: 8, cursor: "grab", transition: "transform 0.12s, border-color 0.12s, box-shadow 0.12s" },
  dashKanbanScroll: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 },
  dashKanbanCol: { background: "#0F172A", border: "1px solid #334155", borderRadius: 10, flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 220, display: "flex", flexDirection: "column", transition: "border-color 0.15s" },
  aracKanbanColHeader: { borderTop: "3px solid", padding: "8px 10px 6px" },
  aracKanbanColBody: { padding: 8, display: "flex", flexDirection: "column", gap: 6, maxHeight: 480, overflowY: "auto" },
  aracAddColBtn: { background: "transparent", border: "1px dashed #334155", color: "#94A3B8", borderRadius: 6, padding: "5px 0", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 },
  aracReworkBtn: { background: "transparent", border: "none", color: "#F59E0B", fontSize: 10, cursor: "pointer", padding: "4px 0", textAlign: "left" },
  aracAdvanceBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%", marginTop: 6, background: "#212934", border: "1px solid #10B981", color: "#10B981", borderRadius: 6, padding: "5px 0", fontSize: 10, fontWeight: 700, cursor: "pointer" },
  aracServeBadge: { marginTop: 6, fontSize: 10, color: "#10B981", fontWeight: 700, textAlign: "center" },
  resultPill: { background: "#1E293B", border: "1px solid #334155", color: "#94A3B8", borderRadius: 6, padding: "4px 9px", fontSize: 10, fontWeight: 700, cursor: "pointer" },
  resultPillOk: { background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10B981", color: "#10B981" },
  resultPillNok: { background: "rgba(239, 68, 68, 0.2)", border: "1px solid #EF4444", color: "#EF4444" },
  resultPillNa: { background: "rgba(148, 163, 184, 0.2)", border: "1px solid #94A3B8", color: "#CBD5E1" },
  formResultBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%", marginTop: 6, borderRadius: 6, padding: "5px 0", fontSize: 10, fontWeight: 700, cursor: "pointer", border: "1px solid" },
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
  keywordChip: { background: "rgba(56, 189, 248, 0.12)", border: "1px solid #38BDF8", color: "#38BDF8", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 600 },
  filterToolbar: { display: "flex", gap: 12 },
  searchWrapper: { display: "flex", alignItems: "center", gap: 8, background: "#1E293B", padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", flex: 1 },
  searchInput: { background: "transparent", border: "none", color: "#F8FAFC", fontSize: 12, outline: "none", width: "100%" },
  primaryActionBtn: { background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)", color: "#0F172A", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", boxShadow: "0 2px 10px rgba(245, 158, 11, 0.25)" },
  ghostBtn: { background: "transparent", border: "1px solid #334155", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer" },
  yearEndHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  viewTitle: { fontSize: 20, fontWeight: 800 },
  viewSub: { fontSize: 11, color: "#94A3B8" },
  yearEndTableCard: { background: "linear-gradient(160deg, #1E293B 0%, #182233 100%)", border: "1px solid #334155", borderRadius: 14, padding: 20, overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" },
  th: { borderBottom: "1px solid #334155", padding: "10px 12px", color: "#F59E0B", fontWeight: 700 },
  tr: { borderBottom: "1px solid #0F172A" },
  td: { padding: "10px 12px" },
  tdTitle: { padding: "10px 12px", fontWeight: 700 },
  deleteIconBtn: { background: "transparent", border: "none", color: "#EF4444", cursor: "pointer" },
  editIconBtn: { background: "transparent", border: "none", color: "#F59E0B", cursor: "pointer", fontWeight: 600, fontSize: 11 },
  loginOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 20%, #1c2947 0%, #0F172A 55%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 1000 },
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
  unauthorizedBox: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "80px 20px", color: "#94A3B8", textAlign: "center" },
  subtaskSection: { background: "#0F172A", padding: 12, borderRadius: 10 },
  subtaskRowInteractive: { display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer" },
  addInlineBtn: { background: "#F59E0B", color: "#0F172A", border: "none", padding: "6px 12px", borderRadius: 6, fontWeight: 700, cursor: "pointer" },
  drawerFooter: { display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #334155" },
  deleteDangerBtn: { background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer" },
  formTitle: { fontSize: 16, fontWeight: 800, color: "#F59E0B" }
};