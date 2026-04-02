import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, Megaphone, Database, LogOut,
  Plus, Edit3, Trash2, X, Save, Search, Download, Upload,
  ShieldCheck, CheckCircle2, TrendingUp, Bell, Menu, ChevronDown,
  ChevronRight, Eye, Lock, AlertCircle, RefreshCw, Star, Award,
  MapPin, Phone, Instagram, Coffee, ShoppingBag, Building, Car,
  GraduationCap, Wheat, HelpCircle, MonitorPlay, Briefcase, Clock,
  Filter, BarChart3, PieChart, Activity, UserPlus, Zap, Target,
  Package, ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react';
import { membersData, eventsData, opportunitiesData, statsData } from './data';

// ─── DATA HOOK (localStorage persistence) ───────────────────────────
function useAppData() {
  const [appData, setAppData] = useState(() => {
    try {
      const saved = localStorage.getItem('medan_community_data');
      if (saved) return JSON.parse(saved);
    } catch {
      return { members: membersData, events: eventsData, opportunities: opportunitiesData, stats: statsData };
    }
    return { members: membersData, events: eventsData, opportunities: opportunitiesData, stats: statsData };
  });

  useEffect(() => {
    localStorage.setItem('medan_community_data', JSON.stringify(appData));
  }, [appData]);

  const update = (patch) => setAppData(prev => ({ ...prev, ...patch }));
  return [appData, update, setAppData];
}

// ─── CATEGORIES ──────────────────────────────────────────────────────
const CATEGORIES = [
  'F&B', 'Retail & Grosir', 'Jasa & Sewa', 'Agensi & IT',
  'Properti & Konstruksi', 'Pendidikan', 'Otomotif', 'Pertanian & Peternakan'
];

const catColors = {
  'F&B': 'background: rgba(249,115,22,0.12); color: #f97316; border: 1px solid rgba(249,115,22,0.2);',
  'Retail & Grosir': 'background: rgba(59,130,246,0.12); color: #3b82f6; border: 1px solid rgba(59,130,246,0.2);',
  'Jasa & Sewa': 'background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.2);',
  'Agensi & IT': 'background: rgba(168,85,247,0.12); color: #a855f7; border: 1px solid rgba(168,85,247,0.2);',
  'Properti & Konstruksi': 'background: rgba(234,179,8,0.12); color: #eab308; border: 1px solid rgba(234,179,8,0.2);',
  'Pendidikan': 'background: rgba(20,184,166,0.12); color: #14b8a6; border: 1px solid rgba(20,184,166,0.2);',
  'Otomotif': 'background: rgba(239,68,68,0.12); color: #ef4444; border: 1px solid rgba(239,68,68,0.2);',
  'Pertanian & Peternakan': 'background: rgba(132,204,22,0.12); color: #84cc16; border: 1px solid rgba(132,204,22,0.2);',
};

// ─── NOTIFICATION SYSTEM ──────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed top-8 right-8 z-[9999] flex items-center gap-3 px-8 py-5 rounded-[2rem] shadow-2xl text-white font-bold text-sm animate-in slide-in-from-right-8 duration-500 border border-white/10 ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-rose-500' : 'bg-blue-500'}`}>
    {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
    {msg}
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity"><X size={18} /></button>
  </div>
);

// ─── MODAL FORM ────────────────────────────────────────────────────────
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
    <div className="surface-card w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500 border border-white/5 bg-surface-2 shadow-2xl">
      <div className="flex items-center justify-between p-10 border-b border-white/5">
        <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface">{title}</h3>
        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all"><X size={24} /></button>
      </div>
      <div className="overflow-y-auto flex-1 p-10 lg:p-12 scrollbar-hide">{children}</div>
    </div>
  </div>
);

// ─── FORM FIELD ────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input {...props} className="input-field w-full px-6 py-4 rounded-2xl font-bold text-sm transition-all border border-white/5 bg-surface-3 focus:border-primary-container focus:ring-4 focus:ring-primary/10" />
);

const Textarea = (props) => (
  <textarea {...props} className="input-field w-full px-6 py-4 rounded-2xl font-bold text-sm transition-all resize-none border border-white/5 bg-surface-3 focus:border-primary-container focus:ring-4 focus:ring-primary/10" />
);

const Select = ({ value, onChange, name, options }) => (
  <select name={name} value={value} onChange={onChange} className="input-field w-full px-6 py-4 rounded-2xl font-bold text-sm transition-all border border-white/5 bg-surface-3 focus:border-primary-container focus:ring-4 focus:ring-primary/10 appearance-none">
    {options.map(o => <option key={o.value ?? o} value={o.value ?? o} className="bg-surface-3 text-on-surface">{o.label ?? o}</option>)}
  </select>
);

// ─── MEMBER FORM ──────────────────────────────────────────────────────
const MemberForm = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: '', business: '', category: 'F&B', location: '', address: '',
    description: '', businessBio: '', aboutMe: '', role: '', duration: '', contact: '', ig: '',
    profilePhoto: '', businessPhoto: '', services: ['', '', ''], age: '',
    ...item
  });

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSvc = (i, v) => {
    const s = [...(form.services || ['', '', ''])];
    s[i] = v; setForm(p => ({ ...p, services: s }));
  };

  const submit = () => {
    if (!form.name.trim() || !form.business.trim()) return alert('Nama dan Bisnis wajib diisi!');
    const cleaned = {
      ...form,
      description: form.businessBio || form.description,
      services: (form.services || []).filter(Boolean)
    };
    onSave(cleaned);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Nama Lengkap *">
          <Input name="name" value={form.name} onChange={handle} placeholder="ex: Taufik Rahman" />
        </Field>
        <Field label="Nama Bisnis *">
          <Input name="business" value={form.business} onChange={handle} placeholder="ex: Sewa Kipas Blower" />
        </Field>
        <Field label="Kategori">
          <Select name="category" value={form.category} onChange={handle} options={CATEGORIES} />
        </Field>
        <Field label="Usia">
          <Input name="age" value={form.age} onChange={handle} placeholder="ex: 35" />
        </Field>
        <Field label="Peran / Jabatan">
          <Input name="role" value={form.role} onChange={handle} placeholder="ex: Founder / CEO" />
        </Field>
        <Field label="Lokasi / Kecamatan">
          <Input name="location" value={form.location} onChange={handle} placeholder="ex: Medan Johor" />
        </Field>
        <Field label="Lama Beroperasi">
          <Input name="duration" value={form.duration} onChange={handle} placeholder="ex: 5 Tahun" />
        </Field>
        <Field label="Alamat Lengkap">
          <Input name="address" value={form.address} onChange={handle} placeholder="ex: Jl. Kapten Muslim No.12" />
        </Field>
        <Field label="WhatsApp (628...)">
          <Input name="contact" value={form.contact} onChange={handle} placeholder="6281234567890" />
        </Field>
        <Field label="Instagram (tanpa @)">
          <Input name="ig" value={form.ig} onChange={handle} placeholder="username.ig" />
        </Field>
        <Field label="URL Foto Profil Pribadi">
          <Input name="profilePhoto" value={form.profilePhoto} onChange={handle} placeholder="https://..." />
        </Field>
        <Field label="URL Foto Bisnis">
          <Input name="businessPhoto" value={form.businessPhoto} onChange={handle} placeholder="https://..." />
        </Field>
        <div className="md:col-span-2">
          <Field label="Profil Pribadi (About Me)">
            <Textarea name="aboutMe" value={form.aboutMe} onChange={handle} rows={3} placeholder="Ceritakan profil pribadi, pengalaman, dan fokus profesional..." />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Profil / Bio Bisnis">
            <Textarea name="businessBio" value={form.businessBio || form.description} onChange={handle} rows={3} placeholder="Jelaskan bisnis, layanan utama, dan nilai unggulan..." />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Layanan Utama (maks 3)">
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map(i => (
                <Input key={i} value={(form.services || ['', '', ''])[i] || ''} onChange={e => handleSvc(i, e.target.value)} placeholder={`Layanan ${i + 1}`} />
              ))}
            </div>
          </Field>
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button onClick={submit} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-wide text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
          <Save size={18} /> Simpan Anggota
        </button>
        <button onClick={onClose} className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all">Batal</button>
      </div>
    </>
  );
};

// ─── EVENT FORM ───────────────────────────────────────────────────────
const EventForm = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({ title: '', day: '', month: '', type: 'Offline Event', location: '', desc: '', ...item });
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <Field label="Judul Agenda *">
            <Input name="title" value={form.title} onChange={handle} placeholder="ex: Kopdar Bulanan #7" />
          </Field>
        </div>
        <Field label="Tanggal">
          <Input name="day" value={form.day} onChange={handle} placeholder="ex: 15" />
        </Field>
        <Field label="Bulan (Singkatan)">
          <Input name="month" value={form.month} onChange={handle} placeholder="ex: APR" />
        </Field>
        <Field label="Tipe Acara">
          <Select name="type" value={form.type} onChange={handle} options={['Offline Event', 'Online Session', 'Hybrid Event', 'Workshop', 'Networking']} />
        </Field>
        <Field label="Lokasi Acara">
          <Input name="location" value={form.location} onChange={handle} placeholder="ex: Café Xchange / Zoom" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Deskripsi">
            <Textarea name="desc" value={form.desc} onChange={handle} rows={3} placeholder="Deskripsi singkat agenda..." />
          </Field>
        </div>
      </div>
      <div className="flex gap-4 mt-12">
        <button onClick={() => { if (!form.title.trim()) return alert('Judul wajib diisi!'); onSave(form); }} className="btn-primary flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl flex items-center justify-center gap-3">
          <Save size={18} /> Simpan Agenda
        </button>
        <button onClick={onClose} className="px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all border border-white/5">Batal</button>
      </div>
    </>
  );
};

// ─── OPPORTUNITY FORM ─────────────────────────────────────────────────
const OpportunityForm = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({ title: '', desc: '', type: 'Supply Order', postedBy: '', icon: 'shopping-bag', ...item });
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Field label="Judul Peluang *">
            <Input name="title" value={form.title} onChange={handle} placeholder="ex: Suplai Beras Skala Besar" />
          </Field>
        </div>
        <Field label="Tipe Kolaborasi">
          <Select name="type" value={form.type} onChange={handle} options={['Supply Order', 'Kolaborasi Properti', 'Community Event', 'Partnership', 'Investment']} />
        </Field>
        <Field label="PIC / Diposting Oleh">
          <Input name="postedBy" value={form.postedBy} onChange={handle} placeholder="Nama anggota" />
        </Field>
        <Field label="Icon">
          <Select name="icon" value={form.icon} onChange={handle} options={[
            { value: 'shopping-bag', label: '🛍 Shopping Bag (Grosir/Suplai)' },
            { value: 'car', label: '🚗 Car (Otomotif/Properti)' },
            { value: 'star', label: '⭐ Star (Umum)' },
            { value: 'video', label: '🎥 Video (Media/Dokumentasi)' },
            { value: 'tool', label: '🔧 Tool (Konstruksi)' },
          ]} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Deskripsi Kebutuhan">
            <Textarea name="desc" value={form.desc} onChange={handle} rows={4} placeholder="Jelaskan kebutuhan atau peluang bisnis..." />
          </Field>
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button onClick={() => { if (!form.title.trim()) return alert('Judul wajib diisi!'); onSave(form); }} className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black uppercase tracking-wide text-sm transition-all shadow-lg flex items-center justify-center gap-2">
          <Save size={18} /> Simpan Peluang
        </button>
        <button onClick={onClose} className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all">Batal</button>
      </div>
    </>
  );
};

// ─── DASHBOARD TAB ─────────────────────────────────────────────────────
const Dashboard = ({ data }) => {
  const { members, events, opportunities } = data;
  const sectors = [...new Set(members.map(m => m.category))].length;
  const recentMembers = [...members].reverse().slice(0, 5);

  const stats = [
    { label: 'Total Anggota', value: members.length, icon: <Users size={22} />, color: 'bg-blue-500', change: '+3 bln ini' },
    { label: 'Total Agenda', value: events.length, icon: <Calendar size={22} />, color: 'bg-purple-500', change: `${events.length} aktif` },
    { label: 'Peluang Bisnis', value: opportunities.length, icon: <Megaphone size={22} />, color: 'bg-emerald-500', change: 'Realtime' },
    { label: 'Sektor Bisnis', value: sectors, icon: <PieChart size={22} />, color: 'bg-orange-500', change: 'Terdiversifikasi' },
  ];

  const catCount = CATEGORIES.map(c => ({ cat: c, count: members.filter(m => m.category === c).length })).filter(x => x.count > 0).sort((a, b) => b.count - a.count);
  const maxCount = catCount[0]?.count || 1;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-label tracking-[0.3em] uppercase text-[10px] mb-3 block text-primary-container">Operations Center</span>
          <h2 className="font-headline text-5xl font-bold tracking-tight text-on-surface">Dashboard</h2>
          <p className="text-lg opacity-60 mt-2 text-on-surface-variant">Ringkasan realtime ekosistem Medan Business Community</p>
        </div>
        <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/5">
           <Activity size={20} className="text-emerald-400 animate-pulse" />
           <span className="text-xs font-bold uppercase tracking-widest text-on-surface">System Optimal</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="glass-card rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className={`${s.color} w-11 h-11 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-500/10`}>{s.icon}</div>
            <div className="text-3xl font-black mb-1" style={{ color: 'var(--clr-on-surface)' }}>{s.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--clr-outline-variant)' }}>{s.label}</div>
            <div className="text-xs font-bold" style={{ color: '#22c55e' }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="glass-card rounded-3xl p-7 shadow-sm">
          <h3 className="font-black mb-6 flex items-center gap-2" style={{ color: 'var(--clr-on-surface)' }}><BarChart3 size={18} /> Distribusi Sektor</h3>
          <div className="space-y-4">
            {catCount.map(({ cat, count }) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs font-bold w-32 shrink-0 truncate" style={{ color: 'var(--clr-on-surface-variant)' }}>{cat}</span>
                <div className="flex-1 rounded-full h-2.5" style={{ background: 'var(--clr-surface-2)' }}>
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-700" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="text-sm font-black w-6 text-right" style={{ color: 'var(--clr-on-surface)' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Members */}
        <div className="glass-card rounded-3xl p-7 shadow-sm">
          <h3 className="font-black mb-6 flex items-center gap-2" style={{ color: 'var(--clr-on-surface)' }}><UserPlus size={18} /> Anggota Terbaru</h3>
          <div className="space-y-4">
            {recentMembers.map(m => (
              <div key={m.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 overflow-hidden" 
                     style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)' }}>
                  {m.profilePhoto ? <img src={m.profilePhoto} alt={m.name} className="w-full h-full object-cover" /> : m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: 'var(--clr-on-surface)' }}>{m.name}</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--clr-on-surface-variant)' }}>{m.business}</div>
                </div>
                <span className="text-[10px] font-black px-2 py-1 rounded-lg" style={{ cssText: catColors[m.category] || 'background: var(--clr-surface-2); color: var(--clr-on-surface-variant);' }}>
                  {m.category.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Activity */}
      <div className="glass-card rounded-3xl p-7 shadow-sm">
        <h3 className="font-black mb-5 flex items-center gap-2" style={{ color: 'var(--clr-on-surface)' }}><Activity size={18} /> Status Sistem</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Database localStorage', status: 'Aktif & Tersinkron', ok: true },
            { label: 'Total Data Terekam', status: `${members.length + events.length + opportunities.length} entri`, ok: true },
            { label: 'Sesi Admin', status: new Date().toLocaleTimeString('id-ID'), ok: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)' }}>
              <div className={`w-2.5 h-2.5 rounded-full ${s.ok ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>{s.label}</div>
                <div className="text-sm font-black" style={{ color: 'var(--clr-on-surface)' }}>{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MEMBERS TAB ────────────────────────────────────────────────────────
const MembersTab = ({ data, update, notify }) => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Semua');
  const [modal, setModal] = useState(null); // null | 'add' | member object

  const filtered = useMemo(() => {
    return data.members.filter(m => {
      const q = search.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.business.toLowerCase().includes(q) || m.location?.toLowerCase().includes(q);
      const matchCat = catFilter === 'Semua' || m.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [data.members, search, catFilter]);

  const handleSave = (form) => {
    if (form.id) {
      update({ members: data.members.map(m => m.id === form.id ? form : m) });
      notify('Anggota berhasil diperbarui!', 'success');
    } else {
      const newId = data.members.length > 0 ? Math.max(...data.members.map(m => m.id)) + 1 : 1;
      update({ members: [{ ...form, id: newId }, ...data.members] });
      notify('Anggota baru berhasil ditambahkan!', 'success');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Yakin hapus anggota ini?')) return;
    update({ members: data.members.filter(m => m.id !== id) });
    notify('Anggota dihapus.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black" style={{ color: 'var(--clr-on-surface)' }}>Manajemen Anggota</h2>
          <p className="font-medium" style={{ color: 'var(--clr-on-surface-variant)' }}>{data.members.length} anggota terdaftar • {filtered.length} ditampilkan</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          <UserPlus size={20} /> Tambah Anggota
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--clr-outline-variant)' }} size={18} />
          <input type="text" placeholder="Cari nama, bisnis, lokasi..." value={search} onChange={e => setSearch(e.target.value)}
            className="input-field w-full pl-12 pr-4 py-3 rounded-xl font-semibold" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="input-field px-4 py-3 rounded-xl font-semibold appearance-none bg-surface" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}>
          <option>Semua</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Members Table */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>Anggota</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>Kategori</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>Lokasi</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>Kontak</th>
                <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--clr-outline-variant)' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--clr-border)' }}>
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 overflow-hidden"
                           style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)' }}>
                        {m.profilePhoto ? <img src={m.profilePhoto} alt={m.name} className="w-full h-full object-cover" /> : m.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm" style={{ color: 'var(--clr-on-surface)' }}>{m.name}</div>
                        <div className="text-[11px]" style={{ color: 'var(--clr-on-surface-variant)' }}>{m.business}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg" style={{ cssText: catColors[m.category] || 'background: var(--clr-surface-2);' }}>{m.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium" style={{ color: 'var(--clr-on-surface-variant)' }}>{m.location || '-'}</td>
                  <td className="px-6 py-4">
                    {m.contact && (
                      <a href={`https://wa.me/${m.contact}`} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1" style={{ color: 'var(--clr-primary)' }}>
                        WhatsApp <ArrowUpRight size={12} />
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setModal(m)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors" style={{ color: 'var(--clr-primary)' }} title="Edit"><Edit3 size={15} /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" style={{ color: '#ef4444' }} title="Hapus"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Users size={40} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--clr-on-surface)' }} />
              <p className="font-bold text-sm" style={{ color: 'var(--clr-outline-variant)' }}>Tidak ada anggota ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={modal === 'add' ? '➕ Tambah Anggota Baru' : `✏️ Edit: ${modal.name}`} onClose={() => setModal(null)}>
          <MemberForm item={modal === 'add' ? {} : modal} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
};

// ─── EVENTS TAB ────────────────────────────────────────────────────────
const EventsTab = ({ data, update, notify }) => {
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      update({ events: data.events.map(e => e.id === form.id ? form : e) });
      notify('Agenda diperbarui!', 'success');
    } else {
      const newId = data.events.length > 0 ? Math.max(...data.events.map(e => e.id)) + 1 : 1;
      update({ events: [{ ...form, id: newId }, ...data.events] });
      notify('Agenda baru ditambahkan!', 'success');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Hapus agenda ini?')) return;
    update({ events: data.events.filter(e => e.id !== id) });
    notify('Agenda dihapus.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black" style={{ color: 'var(--clr-on-surface)' }}>Manajemen Agenda</h2>
          <p className="font-medium" style={{ color: 'var(--clr-on-surface-variant)' }}>{data.events.length} agenda terdaftar</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-purple-500/20" style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)' }}>
          <Plus size={20} /> Tambah Agenda
        </button>
      </div>

      <div className="grid gap-4">
        {data.events.map(ev => (
          <div key={ev.id} className="glass-card rounded-3xl overflow-hidden p-6 flex items-start gap-5 hover:shadow-md transition-all group">
            <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-[10px] font-black uppercase tracking-wider opacity-70">{ev.month}</span>
              <span className="text-3xl font-black leading-none">{ev.day}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-black px-2 py-1 rounded-lg" style={{ background: 'var(--clr-surface-2)', color: 'var(--clr-on-surface-variant)', border: '1px solid var(--clr-border)' }}>{ev.type}</span>
                <span className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--clr-outline-variant)' }}><MapPin size={11} />{ev.location}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-1 truncate" style={{ color: 'var(--clr-on-surface)' }}>{ev.title}</h3>
              <p className="text-sm line-clamp-2" style={{ color: 'var(--clr-on-surface-variant)' }}>{ev.desc}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => setModal(ev)} className="p-2 hover:bg-primary/10 rounded-lg" style={{ color: 'var(--clr-primary)' }}><Edit3 size={15} /></button>
              <button onClick={() => handleDelete(ev.id)} className="p-2 hover:bg-red-500/10 rounded-lg" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {data.events.length === 0 && (
          <div className="py-20 text-center glass-card rounded-3xl">
            <Calendar size={40} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--clr-on-surface)' }} />
            <p className="font-bold text-sm" style={{ color: 'var(--clr-outline-variant)' }}>Belum ada agenda. Tambah yang pertama!</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? '📅 Tambah Agenda Baru' : `✏️ Edit: ${modal.title}`} onClose={() => setModal(null)}>
          <EventForm item={modal === 'add' ? {} : modal} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
};

// ─── OPPORTUNITIES TAB ────────────────────────────────────────────────
const OpportunitiesTab = ({ data, update, notify }) => {
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      update({ opportunities: data.opportunities.map(o => o.id === form.id ? form : o) });
      notify('Peluang diperbarui!', 'success');
    } else {
      const newId = data.opportunities.length > 0 ? Math.max(...data.opportunities.map(o => o.id)) + 1 : 1;
      update({ opportunities: [{ ...form, id: newId }, ...data.opportunities] });
      notify('Peluang baru ditambahkan!', 'success');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Hapus peluang ini?')) return;
    update({ opportunities: data.opportunities.filter(o => o.id !== id) });
    notify('Peluang dihapus.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black" style={{ color: 'var(--clr-on-surface)' }}>Manajemen Peluang</h2>
          <p className="font-medium" style={{ color: 'var(--clr-on-surface-variant)' }}>{data.opportunities.length} peluang aktif</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-500/20" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
          <Plus size={20} /> Tambah Peluang
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.opportunities.map(opp => (
          <div key={opp.id} className="glass-card rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black px-2 py-1 rounded-lg" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>{opp.type}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModal(opp)} className="p-1.5 hover:bg-emerald-500/10 rounded-lg" style={{ color: '#10b981' }}><Edit3 size={15} /></button>
                <button onClick={() => handleDelete(opp.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight mb-2" style={{ color: 'var(--clr-on-surface)' }}>{opp.title}</h3>
              <p className="text-sm line-clamp-3" style={{ color: 'var(--clr-on-surface-variant)' }}>{opp.desc}</p>
            </div>
            <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--clr-border)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black" style={{ background: 'var(--clr-surface-2)', color: 'var(--clr-primary)', border: '1px solid var(--clr-border)' }}>{opp.postedBy?.[0] || 'A'}</div>
              <span className="text-xs font-bold" style={{ color: 'var(--clr-outline-variant)' }}>PIC: {opp.postedBy}</span>
            </div>
          </div>
        ))}
        {data.opportunities.length === 0 && (
          <div className="md:col-span-2 py-20 text-center glass-card rounded-3xl">
            <Megaphone size={40} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--clr-on-surface)' }} />
            <p className="font-bold text-sm" style={{ color: 'var(--clr-outline-variant)' }}>Belum ada peluang. Tambah sekarang!</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? '💡 Tambah Peluang Baru' : `✏️ Edit: ${modal.title}`} onClose={() => setModal(null)}>
          <OpportunityForm item={modal === 'add' ? {} : modal} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
};

// ─── SYSTEM TAB ────────────────────────────────────────────────────────
const SystemTab = ({ data }) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `medan_business_backup_${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Nama', 'Bisnis', 'Kategori', 'Lokasi', 'Durasi', 'Kontak', 'Instagram'];
    const rows = data.members.map(m => [m.id, m.name, m.business, m.category, m.location, m.duration, m.contact, m.ig]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `anggota_medan_business.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (!window.confirm('Reset semua data ke default? Perubahan Anda akan HILANG!')) return;
    localStorage.removeItem('medan_community_data');
    window.location.reload();
  };

  const dataSize = JSON.stringify(data).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black" style={{ color: 'var(--clr-on-surface)' }}>Sistem & Data</h2>
        <p className="font-medium" style={{ color: 'var(--clr-on-surface-variant)' }}>Kelola backup, ekspor, dan konfigurasi sistem</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="glass-card rounded-3xl p-7 shadow-sm">
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--clr-on-surface)' }}><Download size={18} /> Ekspor Data</h3>
          <div className="space-y-3">
            <button onClick={exportJSON} className="w-full py-4 rounded-xl font-bold flex items-center gap-3 px-5 transition-all" 
                    style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', color: 'var(--clr-primary)' }}>
              <Database size={20} /> Ekspor JSON (Full Backup)
            </button>
            <button onClick={exportCSV} className="w-full py-4 rounded-xl font-bold flex items-center gap-3 px-5 transition-all"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}>
              <Package size={20} /> Ekspor CSV Anggota
            </button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-7 shadow-sm">
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--clr-on-surface)' }}><Activity size={18} /> Info Database</h3>
          <div className="space-y-3">
            {[
              { l: 'Penyimpanan', v: 'localStorage Browser' },
              { l: 'Total Anggota', v: data.members.length },
              { l: 'Total Events', v: data.events.length },
              { l: 'Total Peluang', v: data.opportunities.length },
              { l: 'Ukuran Data', v: `${(dataSize / 1024).toFixed(1)} KB` },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'var(--clr-border)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--clr-outline-variant)' }}>{s.l}</span>
                <span className="text-sm font-black" style={{ color: 'var(--clr-on-surface)' }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-7" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <h3 className="font-black mb-2" style={{ color: '#ef4444' }}>⚠️ Danger Zone</h3>
        <p className="text-sm mb-5" style={{ color: '#f87171' }}>Reset akan mengembalikan semua data ke bawaan aplikasi. Aksi ini tidak bisa dibatalkan.</p>
        <button onClick={resetData} className="py-3 px-7 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">Reset ke Default</button>
      </div>
    </div>
  );
};

// ─── LOGIN PAGE ────────────────────────────────────────────────────────
const AdminLogin = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pass === 'admin123') { onLogin(); }
      else { setError(true); setLoading(false); setTimeout(() => setError(false), 2500); }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--clr-surface)' }}>
      <div className="orb w-[500px] h-[500px] bg-primary/10 -top-40 -left-20 animate-float" />
      <div className="orb w-[400px] h-[400px] bg-secondary/10 bottom-0 right-0 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-700">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl" style={{ background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-container))' }}>
            <ShieldCheck size={40} className="text-on-primary" />
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tighter mb-4 text-on-surface">Admin Portal</h1>
          <p className="font-medium text-sm text-on-surface-variant opacity-60">Medan Business Community CMS</p>
        </div>

        <div className="surface-card rounded-[3rem] p-12 shadow-2xl border border-white/5 bg-surface-2">
          <form onSubmit={submit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] block text-on-surface-variant opacity-50 ml-1">Access Credentials</label>
              <div className="relative">
                <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="password" value={pass} onChange={e => setPass(e.target.value)}
                  className={`w-full pl-16 pr-8 py-6 bg-surface-3 border rounded-[2rem] font-black tracking-[0.8em] text-center text-xl transition-all focus:ring-8 focus:ring-primary/5 ${error ? 'border-rose-500' : 'border-white/5'}`}
                  placeholder="••••"
                />
              </div>
              {error && <p className="text-rose-400 text-[10px] font-bold uppercase tracking-widest text-center mt-4 animate-pulse">Unauthorized: Invalid Security Code</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-6 rounded-[2rem] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95">
              {loading ? <RefreshCw size={24} className="animate-spin" /> : <><Zap size={24} /> Initialize Access</>}
            </button>
          </form>
          <p className="text-center text-[10px] font-bold uppercase tracking-widest mt-10 text-on-surface-variant opacity-30">Protected by MedanPro Security</p>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN PANEL ────────────────────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [appData, update] = useAppData();

  const notify = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const login = () => { sessionStorage.setItem('admin_authed', '1'); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem('admin_authed'); navigate('/'); };

  if (!authed) return <AdminLogin onLogin={login} />;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'members', label: 'Anggota', icon: <Users size={20} />, count: appData.members.length },
    { id: 'events', label: 'Agenda', icon: <Calendar size={20} />, count: appData.events.length },
    { id: 'opportunities', label: 'Peluang', icon: <Megaphone size={20} />, count: appData.opportunities.length },
    { id: 'system', label: 'Sistem', icon: <Database size={20} /> },
  ];

  return (
    <div className="min-h-screen flex selection:bg-primary/30" style={{ background: 'var(--clr-surface)' }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-28'} shrink-0 flex flex-col transition-all duration-500 fixed h-full z-50`} 
             style={{ background: 'var(--clr-surface-2)', borderRight: '1px solid var(--clr-outline-variant)' }}>
        {/* Logo */}
        <div className="flex items-center gap-4 px-8 py-12 border-b border-white/5">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-container))' }}>
            <ShieldCheck size={24} className="text-on-primary" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="font-headline font-bold text-2xl leading-tight tracking-tight text-on-surface">MEDANPRO</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Admin Access</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-10 space-y-3 px-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-4 px-5 py-5 rounded-[1.5rem] transition-all text-left group ${activeTab === t.id ? 'bg-primary-container text-on-primary-container shadow-2xl' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'}`}
            >
              <span className={`shrink-0 transition-transform duration-300 ${activeTab === t.id ? 'text-on-primary-container scale-110' : 'opacity-50 group-hover:opacity-100 group-hover:scale-110'}`}>{t.icon}</span>
              {sidebarOpen && <>
                <span className="font-bold text-sm tracking-tight flex-1">{t.label}</span>
                {t.count !== undefined && <span className={`text-[10px] font-black px-2.5 py-1 rounded-full transition-colors ${activeTab === t.id ? 'bg-on-primary-container text-primary-container' : 'bg-surface-3 text-on-surface-variant'}`}>{t.count}</span>}
              </>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 space-y-3">
          <button onClick={() => navigate('/')} className={`w-full flex items-center gap-4 px-5 py-5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-[1.5rem] transition-all group ${!sidebarOpen && 'justify-center'}`}>
            <ChevronRight size={22} className="rotate-180 opacity-40 group-hover:opacity-100 -translate-x-1" />
            {sidebarOpen && <span className="font-bold text-sm tracking-tight">Main Network</span>}
          </button>
          <button onClick={logout} className={`w-full flex items-center gap-4 px-5 py-5 text-rose-400 hover:bg-rose-400/10 rounded-[1.5rem] transition-all ${!sidebarOpen && 'justify-center'}`}>
            <LogOut size={22} />
            {sidebarOpen && <span className="font-bold text-sm tracking-tight">Terminate Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-80' : 'ml-28'} transition-all duration-500 min-h-screen`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 backdrop-blur-3xl border-b px-12 py-8 flex items-center justify-between" 
                style={{ background: 'rgba(11, 19, 38, 0.85)', borderColor: 'var(--clr-outline-variant)' }}>
          <div className="flex items-center gap-6">
             <button onClick={() => setSidebarOpen(p => !p)} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-on-surface-variant lg:hidden">
              <Menu size={24} />
            </button>
            <span style={{ color: 'var(--clr-outline-variant)' }} className="text-lg opacity-40">/</span>
            <span className="font-headline font-bold text-base uppercase tracking-[0.3em] text-on-surface">{tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-400/5 border border-emerald-400/10 text-emerald-400">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.5)]" /> Node Optimized
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-40">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-12 lg:p-16 max-w-[1700px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTab === 'dashboard' && <Dashboard data={appData} />}
          {activeTab === 'members' && <MembersTab data={appData} update={update} notify={notify} />}
          {activeTab === 'events' && <EventsTab data={appData} update={update} notify={notify} />}
          {activeTab === 'opportunities' && <OpportunitiesTab data={appData} update={update} notify={notify} />}
          {activeTab === 'system' && <SystemTab data={appData} />}
        </main>
      </div>
    </div>
  );
}
