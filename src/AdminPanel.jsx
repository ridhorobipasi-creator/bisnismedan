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
  'F&B': 'bg-orange-100 text-orange-700',
  'Retail & Grosir': 'bg-blue-100 text-blue-700',
  'Jasa & Sewa': 'bg-green-100 text-green-700',
  'Agensi & IT': 'bg-purple-100 text-purple-700',
  'Properti & Konstruksi': 'bg-yellow-100 text-yellow-700',
  'Pendidikan': 'bg-teal-100 text-teal-700',
  'Otomotif': 'bg-red-100 text-red-700',
  'Pertanian & Peternakan': 'bg-lime-100 text-lime-700',
};

// ─── NOTIFICATION SYSTEM ──────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed top-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm animate-in slide-in-from-right-8 duration-300 ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
    {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
    {msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={16} /></button>
  </div>
);

// ─── MODAL FORM ────────────────────────────────────────────────────────
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between p-8 border-b border-gray-100">
        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={22} /></button>
      </div>
      <div className="overflow-y-auto flex-1 p-8">{children}</div>
    </div>
  </div>
);

// ─── FORM FIELD ────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-gray-400" />
);

const Textarea = (props) => (
  <textarea {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-gray-400 resize-none" />
);

const Select = ({ value, onChange, name, options }) => (
  <select name={name} value={value} onChange={onChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all">
    {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
  </select>
);

// ─── MEMBER FORM ──────────────────────────────────────────────────────
const MemberForm = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: '', business: '', category: 'F&B', location: '', address: '',
    description: '', businessBio: '', personalBio: '', role: '', duration: '', contact: '', ig: '',
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
      services: form.services.filter(Boolean)
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
          <Field label="Biodata Pribadi">
            <Textarea name="personalBio" value={form.personalBio} onChange={handle} rows={3} placeholder="Ceritakan profil pribadi, pengalaman, dan fokus profesional..." />
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
      <div className="grid md:grid-cols-2 gap-5">
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
      <div className="flex gap-3 mt-8">
        <button onClick={() => { if (!form.title.trim()) return alert('Judul wajib diisi!'); onSave(form); }} className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black uppercase tracking-wide text-sm transition-all shadow-lg flex items-center justify-center gap-2">
          <Save size={18} /> Simpan Agenda
        </button>
        <button onClick={onClose} className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all">Batal</button>
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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900">Dashboard</h2>
        <p className="text-gray-400 font-medium mt-1">Ringkasan realtime ekosistem Medan Business Community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className={`${s.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>{s.icon}</div>
            <div className="text-3xl font-black text-gray-900 mb-1">{s.value}</div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</div>
            <div className="text-xs text-emerald-500 font-bold">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2"><BarChart3 size={18} /> Distribusi Sektor</h3>
          <div className="space-y-4">
            {catCount.map(({ cat, count }) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-32 shrink-0 truncate">{cat}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full transition-all duration-700" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="text-sm font-black text-gray-700 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Members */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2"><UserPlus size={18} /> Anggota Terbaru</h3>
          <div className="space-y-4">
            {recentMembers.map(m => (
              <div key={m.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm shrink-0 overflow-hidden">
                  {m.profilePhoto ? <img src={m.profilePhoto} alt={m.name} className="w-full h-full object-cover" /> : m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 truncate">{m.name}</div>
                  <div className="text-xs text-gray-400 truncate">{m.business}</div>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${catColors[m.category] || 'bg-gray-100 text-gray-600'}`}>{m.category.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Activity */}
      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Activity size={18} /> Status Sistem</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Database localStorage', status: 'Aktif & Tersinkron', ok: true },
            { label: 'Total Data Terekam', status: `${members.length + events.length + opportunities.length} entri`, ok: true },
            { label: 'Sesi Admin', status: new Date().toLocaleTimeString('id-ID'), ok: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${s.ok ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
              <div>
                <div className="text-xs text-gray-400 font-bold">{s.label}</div>
                <div className="text-sm font-black text-gray-700">{s.status}</div>
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Manajemen Anggota</h2>
          <p className="text-gray-400 font-medium">{data.members.length} anggota terdaftar • {filtered.length} ditampilkan</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
          <UserPlus size={20} /> Tambah Anggota
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Cari nama, bisnis, lokasi..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-semibold" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30">
          <option>Semua</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Anggota</th>
                <th className="text-left px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="text-left px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Lokasi</th>
                <th className="text-left px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Kontak</th>
                <th className="text-right px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 overflow-hidden">
                        {m.profilePhoto ? <img src={m.profilePhoto} alt={m.name} className="w-full h-full object-cover" /> : m.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{m.name}</div>
                        <div className="text-xs text-gray-400 font-medium">{m.business}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${catColors[m.category] || 'bg-gray-100 text-gray-600'}`}>{m.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{m.location || '-'}</td>
                  <td className="px-6 py-4">
                    {m.contact && m.contact !== '62812000000' && (
                      <a href={`https://wa.me/${m.contact}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1">
                        WA <ArrowUpRight size={12} />
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setModal(m)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Edit"><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold">Tidak ada anggota ditemukan.</p>
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

  const typeColors = {
    'Offline Event': 'bg-blue-100 text-blue-700',
    'Online Session': 'bg-purple-100 text-purple-700',
    'Hybrid Event': 'bg-teal-100 text-teal-700',
    'Workshop': 'bg-orange-100 text-orange-700',
    'Networking': 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Manajemen Agenda</h2>
          <p className="text-gray-400 font-medium">{data.events.length} agenda terdaftar</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all active:scale-95">
          <Plus size={20} /> Tambah Agenda
        </button>
      </div>

      <div className="grid gap-4">
        {data.events.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-5 hover:border-purple-200 hover:shadow-md transition-all group">
            <div className="w-20 h-20 bg-purple-600 rounded-2xl flex flex-col items-center justify-center text-white shrink-0">
              <span className="text-xs font-black uppercase tracking-wider opacity-70">{ev.month}</span>
              <span className="text-4xl font-black leading-none">{ev.day}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${typeColors[ev.type] || 'bg-gray-100 text-gray-600'}`}>{ev.type}</span>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1"><MapPin size={11} />{ev.location}</span>
              </div>
              <h3 className="font-black text-gray-900 text-lg leading-tight mb-1 truncate">{ev.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{ev.desc}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => setModal(ev)} className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg"><Edit3 size={16} /></button>
              <button onClick={() => handleDelete(ev.id)} className="p-2 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {data.events.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
            <Calendar size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold">Belum ada agenda. Tambah yang pertama!</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Manajemen Peluang</h2>
          <p className="text-gray-400 font-medium">{data.opportunities.length} peluang aktif</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          <Plus size={20} /> Tambah Peluang
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.opportunities.map(opp => (
          <div key={opp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:border-emerald-200 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">{opp.type}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModal(opp)} className="p-1.5 hover:bg-emerald-100 text-emerald-600 rounded-lg"><Edit3 size={15} /></button>
                <button onClick={() => handleDelete(opp.id)} className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg leading-tight mb-2">{opp.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3">{opp.desc}</p>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-black">{opp.postedBy?.[0] || 'A'}</div>
              <span className="text-xs font-bold text-gray-500">PIC: {opp.postedBy}</span>
            </div>
          </div>
        ))}
        {data.opportunities.length === 0 && (
          <div className="md:col-span-2 py-16 text-center bg-white rounded-2xl border border-gray-100">
            <Megaphone size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold">Belum ada peluang. Tambah sekarang!</p>
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-gray-900">Sistem & Data</h2>
        <p className="text-gray-400 font-medium">Kelola backup, ekspor, dan konfigurasi sistem</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2"><Download size={18} /> Ekspor Data</h3>
          <div className="space-y-3">
            <button onClick={exportJSON} className="w-full py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold flex items-center gap-3 px-5 transition-all">
              <Database size={20} /> Ekspor JSON (Full Backup)
            </button>
            <button onClick={exportCSV} className="w-full py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold flex items-center gap-3 px-5 transition-all">
              <Package size={20} /> Ekspor CSV Anggota
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2"><Activity size={18} /> Info Database</h3>
          <div className="space-y-3">
            {[
              { l: 'Penyimpanan', v: 'localStorage Browser' },
              { l: 'Total Anggota', v: data.members.length },
              { l: 'Total Events', v: data.events.length },
              { l: 'Total Peluang', v: data.opportunities.length },
              { l: 'Ukuran Data', v: `${(dataSize / 1024).toFixed(1)} KB` },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-400 font-medium">{s.l}</span>
                <span className="text-sm font-black text-gray-700">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
        <h3 className="font-black text-red-700 mb-2">⚠️ Danger Zone</h3>
        <p className="text-sm text-red-500 mb-5">Reset akan mengembalikan semua data ke bawaan aplikasi. Aksi ini tidak bisa dibatalkan.</p>
        <button onClick={resetData} className="py-3 px-7 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all">Reset ke Default</button>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-blue-500/5" style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px`, top: `${-50 + i * 30}%`, left: `${-20 + i * 25}%` }} />
        ))}
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Admin Portal</h1>
          <p className="text-blue-300/70 font-medium">Medan Business Community CMS</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs font-black text-blue-300 uppercase tracking-widest mb-2 block">Kode Akses Admin</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="password" value={pass} onChange={e => setPass(e.target.value)}
                  className={`w-full pl-12 pr-5 py-4 bg-white/10 border rounded-xl text-white font-bold tracking-[0.3em] text-center placeholder:text-white/20 placeholder:tracking-normal focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-400 ring-2 ring-red-500/30 bg-red-500/10' : 'border-white/20 focus:border-blue-400 focus:ring-blue-500/30'}`}
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-400 text-xs font-bold mt-2 text-center animate-shake">Kode akses salah. Coba lagi.</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2">
              {loading ? <RefreshCw size={20} className="animate-spin" /> : <><Zap size={20} /> Masuk ke CMS</>}
            </button>
          </form>
          <p className="text-center text-white/20 text-xs mt-6 font-medium">Hanya untuk pengurus komunitas</p>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ADMIN PANEL ── (Exported as Page Component via /admin route)
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
    <div className="min-h-screen bg-gray-50 flex">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} shrink-0 bg-slate-900 text-white flex flex-col transition-all duration-300 fixed h-full z-50`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <ShieldCheck size={22} />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="font-black text-sm leading-tight">MEDAN BUSINESS</div>
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Admin CMS</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(p => !p)} className="ml-auto p-1 hover:bg-white/10 rounded-lg transition-colors">
            <Menu size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-3">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              <span className="shrink-0">{t.icon}</span>
              {sidebarOpen && <>
                <span className="font-bold text-sm flex-1">{t.label}</span>
                {t.count !== undefined && <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>{t.count}</span>}
              </>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button onClick={() => navigate('/')} className={`w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/10 hover:text-white rounded-xl transition-all mb-1 ${!sidebarOpen && 'justify-center'}`}>
            <ChevronRight size={18} className="rotate-180" />
            {sidebarOpen && <span className="font-bold text-sm">Ke Website</span>}
          </button>
          <button onClick={logout} className={`w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all ${!sidebarOpen && 'justify-center'}`}>
            <LogOut size={18} />
            {sidebarOpen && <span className="font-bold text-sm">Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">/</span>
            <span className="font-black text-gray-700 text-sm uppercase tracking-widest">{tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1.5 rounded-xl text-xs font-bold">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Realtime
            </div>
            <div className="text-sm text-gray-400 font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
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
