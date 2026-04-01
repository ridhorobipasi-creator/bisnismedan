import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  Search, Users, Home, Briefcase, MapPin, 
  Instagram, Facebook, Clock, Filter, ChevronRight, 
  Phone, Globe, Coffee, MonitorPlay, ShoppingBag, 
  Building, GraduationCap, Car, Wheat, HelpCircle,
  Calendar, Info, Megaphone, Target, Star, Handshake, CheckCircle2,
  Download, ArrowRight, Verified, Share2, Mail, Video, ChevronLeft,
  Gavel, Eye as Visibility, Users as Diversity3, ShieldCheck as FactCheck, UserPlus as PersonAdd,
  Heart, Sparkles, UserCircle, Store, ExternalLink, MessageCircle,
  Lock, ShieldCheck, AlertCircle, RefreshCw
} from 'lucide-react';
import { membersData, statsData, eventsData, opportunitiesData } from './data';
import AdminPanel from './AdminPanel';

const categories = [
  { name: "Semua", icon: <Filter size={16} /> },
  { name: "F&B", icon: <Coffee size={16} /> },
  { name: "Retail & Grosir", icon: <ShoppingBag size={16} /> },
  { name: "Jasa & Sewa", icon: <HelpCircle size={16} /> },
  { name: "Agensi & IT", icon: <MonitorPlay size={16} /> },
  { name: "Properti & Konstruksi", icon: <Building size={16} /> },
  { name: "Pendidikan", icon: <GraduationCap size={16} /> },
  { name: "Otomotif", icon: <Car size={16} /> },
  { name: "Pertanian & Peternakan", icon: <Wheat size={16} /> }
];

const COMMUNITY_WHATSAPP = '62812000000';
const buildWhatsAppLink = (text) => `https://wa.me/${COMMUNITY_WHATSAPP}?text=${encodeURIComponent(text)}`;

// --- Profile Pages ---
const ProfileImage = ({ src, fallback, className }) => (
  src ? <img src={src} alt={fallback} className={className} /> : <div className="text-primary font-black text-[6rem] select-none opacity-30">{fallback}</div>
);

const PersonalProfilePage = ({ members }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = useMemo(() => members.find(m => String(m.id) === id), [id, members]);

  if (!profile) return <div className="p-20 text-center">Profil pribadi tidak ditemukan.</div>;

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto px-6 sm:px-8 py-16">
      <button onClick={() => navigate('/members')} className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all">
        <ChevronLeft size={20} /> Kembali ke Direktori Anggota
      </button>
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] p-8 border border-outline-variant/20 shadow-lg text-center">
            <div className="w-48 h-48 mx-auto rounded-full border-4 border-surface-container-high overflow-hidden bg-surface-container-low flex items-center justify-center mb-6">
              <ProfileImage src={profile.profilePhoto} fallback={profile.name[0]} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tight">{profile.name}</h1>
            <p className="text-on-surface-variant font-bold mt-2">{profile.role || 'Professional Member'}</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href={`https://wa.me/${profile.contact}`} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest">WhatsApp</a>
              <a href={`https://instagram.com/${profile.ig}`} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-pink-100 text-pink-700 font-black text-xs uppercase tracking-widest">Instagram</a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-outline-variant/20 shadow-sm">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Biodata Pribadi</h3>
            <p className="text-on-surface-variant leading-relaxed font-medium">{profile.personalBio || 'Profil pribadi akan ditampilkan setelah biodata diisi oleh admin.'}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-7 border border-outline-variant/20 shadow-sm">
              <h4 className="text-xs font-black text-outline uppercase tracking-widest mb-4">Informasi</h4>
              <div className="space-y-3 text-sm font-semibold text-on-surface-variant">
                <p>Usia: {profile.age || '-'}</p>
                <p>Lokasi: {profile.location || '-'}</p>
                <p>Alamat: {profile.address || '-'}</p>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-7 border border-outline-variant/20 shadow-sm">
              <h4 className="text-xs font-black text-outline uppercase tracking-widest mb-4">Unit Bisnis</h4>
              <p className="font-black text-primary text-lg">{profile.business}</p>
              <p className="text-sm text-on-surface-variant mt-2">Kategori: {profile.category}</p>
              <button onClick={() => navigate(`/profile/business/${profile.id}`)} className="mt-5 px-5 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all">
                Lihat Profil Bisnis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessProfilePage = ({ members }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = useMemo(() => members.find(m => String(m.id) === id), [id, members]);

  if (!profile) return <div className="p-20 text-center">Profil bisnis tidak ditemukan.</div>;

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto px-6 sm:px-8 py-16">
      <button onClick={() => navigate('/business')} className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all">
        <ChevronLeft size={20} /> Kembali ke Katalog Bisnis
      </button>
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-surface-container-low border border-outline-variant/20 shadow-lg flex items-center justify-center">
            <ProfileImage src={profile.businessPhoto || profile.profilePhoto} fallback={profile.business?.[0] || profile.name[0]} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-outline-variant/20 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">{profile.category}</span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-lg text-[10px] font-black uppercase tracking-widest">Verified Member</span>
            </div>
            <h1 className="text-4xl font-black text-primary tracking-tight mb-4">{profile.business}</h1>
            <p className="text-on-surface-variant font-medium leading-relaxed">{profile.businessBio || profile.description || 'Profil bisnis akan ditampilkan setelah data lengkap diisi admin.'}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-7 border border-outline-variant/20 shadow-sm">
              <h4 className="text-xs font-black text-outline uppercase tracking-widest mb-4">Layanan Utama</h4>
              <ul className="space-y-2">
                {(profile.services || ['Konsultasi Bisnis', 'Layanan Profesional']).map((svc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-semibold text-primary"><CheckCircle2 size={16} /> {svc}</li>
                ))}
              </ul>
            </div>
            <div className="bg-primary rounded-[2rem] p-7 text-white shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-white/70">Kontak & Operasional</h4>
              <div className="space-y-3 text-sm font-semibold">
                <p className="flex items-center gap-2"><MapPin size={16} /> {profile.address || profile.location || '-'}</p>
                <p className="flex items-center gap-2"><Clock size={16} /> {profile.duration || '-'} Beroperasi</p>
                <p className="flex items-center gap-2"><UserCircle size={16} /> PIC: {profile.name}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={buildWhatsAppLink(`Halo Tim Medan Business, saya tertarik kolaborasi dengan ${profile.business}. Mohon info detailnya.`)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all">Hubungi untuk Kolaborasi</a>
            <button onClick={() => navigate(`/profile/personal/${profile.id}`)} className="px-6 py-3 rounded-xl border border-primary/20 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all">Lihat Profil Pribadi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Quote = ({ className, size }) => (
    <div className={className}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H2.017V21H5.017Z" />
        </svg>
    </div>
);

// --- Existing Sub-components (Pages) ---

const HomePage = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-700">
    <section className="relative px-6 sm:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-5">KEANGGOTAAN EKSKLUSIF</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-[1.02] tracking-tight mb-6">
            Kurasi koneksi profesional, lebih terarah dan berdampak.
          </h1>
          <p className="text-on-surface-variant text-base lg:text-lg max-w-xl mb-10 leading-relaxed opacity-80">
            Selamat datang di sanctuary bagi para profesional berimpact tinggi dan pemilik bisnis di Medan. Sebuah ekosistem kurasi yang dirancang sebagai pameran profesional eksklusif.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('/business')}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-base hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-primary/20 shadow-lg flex items-center gap-3"
            >
              Katalog Bisnis <Store size={24} />
            </button>
            <button 
              onClick={() => onNavigate('/members')}
              className="bg-white text-primary border-2 border-primary/10 px-8 py-4 rounded-2xl font-black text-base hover:bg-primary-container/5 transition-all shadow-sm flex items-center gap-3"
            >
              Kenali Anggota <Users size={24} />
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-[0_40px_80px_-30px_rgba(0,50,125,0.25)] border-[10px] border-white">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop" alt="The Workspace" />
          </div>
          <div className="absolute -bottom-8 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-outline-variant/25">
            <p className="text-primary font-bold leading-relaxed text-sm sm:text-base">"Kami tidak sekadar membangun jaringan, kami mengkurasi kualitas kolaborasi."</p>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] hover:bg-primary group transition-all duration-500 shadow-sm hover:shadow-3xl hover:-translate-y-2 border border-outline-variant/10">
            <div className="bg-primary-container/10 p-4 rounded-xl w-fit mb-6 group-hover:bg-white/20 transition-colors">
              <Verified className="text-primary group-hover:text-white" size={48} />
            </div>
            <h3 className="text-5xl font-black text-primary group-hover:text-white mb-2 tracking-tight">100+</h3>
            <p className="text-on-surface-variant group-hover:text-white/80 font-bold uppercase tracking-widest text-[10px] mb-6">Profil Terkurasi</p>
            <p className="text-sm text-slate-400 group-hover:text-white/60 leading-relaxed font-medium">Hanya individu dengan integritas tinggi yang bergabung dalam eksibisi kami.</p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] hover:bg-primary-container group transition-all duration-500 shadow-sm hover:shadow-3xl hover:-translate-y-2 border border-outline-variant/10">
            <div className="bg-primary-container/10 p-4 rounded-xl w-fit mb-6 group-hover:bg-white/20 transition-colors">
              <Handshake className="text-primary group-hover:text-white" size={48} />
            </div>
            <h3 className="text-5xl font-black text-primary group-hover:text-white mb-2 tracking-tight">1,2K</h3>
            <p className="text-on-surface-variant group-hover:text-white/80 font-bold uppercase tracking-widest text-[10px] mb-6">Koneksi Strategis</p>
            <p className="text-sm text-slate-400 group-hover:text-white/60 leading-relaxed font-medium">Menghubungkan ekosistem dari berbagai sektor fundamental pertumbuhan ekonomi.</p>
          </div>
          <div className="bg-secondary p-10 rounded-[2rem] relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-6 leading-tight">Siap Untuk Dikurasi?</h3>
              <p className="text-white/75 mb-10 leading-relaxed font-medium text-sm">Ajukan aplikasi Anda untuk menjadi bagian dari direktori paling eksklusif di kota.</p>
              <button 
                onClick={() => onNavigate('join')}
                className="bg-white text-secondary px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:gap-5 transition-all shadow-xl shadow-black/20"
              >
                Mulai Pendaftaran <ArrowRight size={24} />
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10">
              <Users className="text-white" size={400} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const MembersPersonalPage = ({ searchTerm, setSearchTerm, filteredMembers, onSelectProfile }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-16">
  <header className="mb-16 text-center max-w-4xl mx-auto">
        <span className="inline-block px-5 py-2 bg-secondary/10 text-secondary font-black text-[10px] tracking-[0.4em] uppercase mb-8">TALENTA TERBAIK</span>
    <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight mb-6 leading-tight">Jejaring Eksklusif Anggota</h1>
    <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed opacity-80 font-medium">Mengenal lebih dekat sosok-sosok di balik kemajuan ekonomi kota. Profil personal pengusaha dan profesional terkurasi.</p>
    </header>

  <div className="max-w-3xl mx-auto mb-14">
        <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-primary" size={24} />
            <input 
                type="text" 
                placeholder="Cari berdasarkan nama anggota atau keahlian..."
        className="w-full pl-18 pr-8 py-5 bg-white rounded-2xl border border-outline-variant/30 focus:ring-4 focus:ring-primary/20 text-base font-bold placeholder:text-outline shadow-lg transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map(member => (
      <div key={member.id} className="group relative bg-white p-8 rounded-[2rem] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.18)] transition-all duration-500 border border-outline-variant/10 hover:-translate-y-2 text-center overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Verified className="text-primary" size={32} />
                </div>
                <div className="w-28 h-28 rounded-full mx-auto mb-7 border-4 border-surface-container-high bg-primary-container shadow-lg flex items-center justify-center overflow-hidden scale-100 group-hover:scale-105 transition-transform duration-500">
                    {member.profilePhoto ? (
                      <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-primary font-black text-4xl select-none">{member.name[0]}</div>
                    )}
                </div>
        <h3 className="text-2xl font-black text-primary mb-2 tracking-tight group-hover:text-secondary transition-colors leading-none">{member.name}</h3>
        <p className="text-on-surface-variant font-black text-[10px] uppercase tracking-[0.3em] mb-7 opacity-50">{member.age !== '-' ? `${member.age} TAHUN` : 'ANGGOTA AKTIF'}</p>
                
        <div className="flex flex-col gap-3 text-left p-6 bg-surface-container-low rounded-2xl mb-8">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-outline uppercase tracking-widest">Pengalaman</span>
                        <span className="text-sm font-black text-primary">{member.duration}</span>
                    </div>
                    <div className="w-full h-px bg-outline-variant/30"></div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-outline uppercase tracking-widest">Kepemilikan</span>
                        <span className="text-md font-black text-on-surface line-clamp-1">{member.business}</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => onSelectProfile(member.id)}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all shadow-xl shadow-primary/20"
                    >
                        Lihat Profil Pribadi
                    </button>
                </div>
            </div>
        ))}
    </div>
  </div>
);

const BusinessCatalogPage = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredMembers, onSelectProfile }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-16">
    <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
        <div className="max-w-2xl">
            <span className="inline-block px-5 py-2 bg-primary/10 text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-8">SHOWCASE UNIT BISNIS</span>
            <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight mb-5 leading-tight">Katalog Terkurasi</h1>
            <p className="text-base sm:text-lg text-on-surface-variant font-medium opacity-80 leading-relaxed">Etalase eksklusif untuk mengeksplorasi ragam produk dan jasa terbaik dari ekosistem bisnis Medan.</p>
        </div>
        <div className="bg-primary/5 p-3 rounded-full flex items-center gap-2 border border-primary/10">
             <Store className="text-primary ml-4" size={24} />
             <span className="bg-white px-5 py-2 rounded-full font-black text-primary shadow-sm text-xs uppercase tracking-widest">{filteredMembers.length} Unit Bisnis Aktif</span>
        </div>
    </div>

    {/* Modern Filters */}
    <div className="sticky top-30 z-40 bg-background/85 backdrop-blur-2xl py-5 rounded-[2rem] shadow-xl shadow-primary/5 border border-outline-variant/10 px-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="relative flex-grow w-full">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-primary" size={24} />
                <input 
                    type="text" 
                    placeholder="Apa yang sedang Anda cari? Pengadaan, F&B, Jasa..."
            className="w-full pl-18 pr-8 py-4 bg-white rounded-2xl border border-outline-variant/30 focus:ring-4 focus:ring-primary/20 text-base font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-3 overflow-x-auto w-full lg:w-auto pb-2 scrollbar-hide">
                {categories.map((cat, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shadow-sm ${selectedCategory === cat.name ? 'bg-primary text-white scale-105 shadow-xl shadow-primary/20' : 'bg-white text-on-surface hover:bg-primary/5 border border-outline-variant/20'}`}
                    >
                        {cat.icon}
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    </div>

    {/* Business Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map(member => (
        <article key={member.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-500 border border-outline-variant/10 flex flex-col hover:-translate-y-2">
          <div className="h-52 bg-surface-container-high relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-35 group-hover:scale-110 transition-transform duration-1000"></div>
            {(member.businessPhoto || member.profilePhoto) && <img src={member.businessPhoto || member.profilePhoto} alt={member.business} className="absolute inset-0 w-full h-full object-cover" />}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-all duration-700">
                        {React.cloneElement(categories.find(c => c.name === member.category)?.icon || <Briefcase />, { size: 180 })}
                    </div>
            <div className="absolute top-6 left-6">
                        <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl">{member.category}</span>
                    </div>
                </div>
          <div className="p-8 relative flex-grow flex flex-col">
            <h3 className="text-2xl font-black text-primary mb-2 tracking-tight group-hover:text-secondary transition-colors leading-tight">{member.business}</h3>
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm mb-10">
                        <MapPin size={16} className="text-primary" />
                        <span>{member.location}</span>
                    </div>

            <div className="p-6 bg-surface-container-low rounded-2xl mb-8 flex-grow">
                        <p className="text-sm font-medium leading-relaxed opacity-60 italic mb-6 line-clamp-2">
                            {member.description || "Layanan berkualitas dengan integritas yang terjaga melalui kurasi komunitas."}
                        </p>
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                {member.name[0]}
                             </div>
                             <div>
                                <span className="text-[10px] font-black text-outline uppercase tracking-widest block">Owner</span>
                                <span className="text-sm font-black text-on-surface">{member.name}</span>
                             </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => onSelectProfile(member.id)}
                          className="flex-grow py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                            Lihat Profil Bisnis <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </article>
        ))}
    </div>
  </div>
);


const AboutPage = () => (
  <div className="animate-in fade-in duration-700 max-w-7xl mx-auto px-6 sm:px-8 py-16 space-y-10">
    <section className="relative overflow-hidden rounded-[2.5rem] section-frame bg-white/85 p-10 sm:p-14">
      <div className="absolute inset-0 opacity-25">
        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" alt="Medan Business Atmosphere" />
      </div>
      <div className="relative z-10 max-w-3xl">
        <span className="inline-block px-4 py-2 mb-6 rounded-full bg-secondary/10 text-secondary font-black text-[10px] tracking-[0.35em] uppercase">Visi Kami</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight mb-6">Kurasi profesional dengan standar yang lebih tinggi.</h1>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed font-medium opacity-85">Kami membangun ekosistem bisnis Medan yang lebih sehat: terhubung, terverifikasi, dan punya peluang kolaborasi nyata.</p>
      </div>
    </section>

    <section className="grid lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-7 bg-white rounded-[2rem] border border-outline-variant/20 p-8 sm:p-10 shadow-sm">
        <h2 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-6">Misi yang fokus pada dampak</h2>
        <p className="text-on-surface-variant leading-relaxed font-medium mb-8">MEDAN BUSINESS bukan sekadar wadah berkumpul. Komunitas ini dirancang sebagai akselerator untuk membuka koneksi, peluang proyek, dan pertumbuhan jangka panjang.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/25">
            <Verified className="text-primary mb-3" size={26} />
            <p className="text-sm font-black text-primary mb-1">Kurasi Ketat</p>
            <p className="text-xs text-on-surface-variant font-medium">Validasi rekam jejak anggota.</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/25">
            <Handshake className="text-primary mb-3" size={26} />
            <p className="text-sm font-black text-primary mb-1">Kolaborasi Nyata</p>
            <p className="text-xs text-on-surface-variant font-medium">Mendorong kerja sama lintas sektor.</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/25">
            <Target className="text-primary mb-3" size={26} />
            <p className="text-sm font-black text-primary mb-1">Pertumbuhan Terukur</p>
            <p className="text-xs text-on-surface-variant font-medium">Arah bisnis lebih tajam dan sehat.</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-sm min-h-[320px]">
        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop" alt="Collaboration" />
      </div>
    </section>
  </div>
);

const ResourcesPage = () => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-16 space-y-8">
    <section className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 sm:p-12 text-white shadow-2xl">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.35em] mb-6">Pusat Pengetahuan</span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">Sumber daya siap pakai untuk pertumbuhan bisnis.</h1>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 font-medium">Akses template legal, modul operasional, dan dokumen strategi yang dirancang praktis untuk kebutuhan harian anggota.</p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-primary px-7 py-3 rounded-xl font-black text-sm hover:shadow-xl transition-all">Unduh Paket Populer</button>
          <button className="bg-transparent border border-white/30 text-white px-7 py-3 rounded-xl font-black text-sm hover:bg-white/10 transition-all">Ajukan Resource Baru</button>
        </div>
      </div>
      <div className="absolute -right-32 -bottom-32 w-[420px] h-[420px] bg-secondary/30 rounded-full blur-[120px]"></div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: "Panduan Dasar Bisnis", format: "PDF", size: "12.4 MB", desc: "Kerangka kerja komprehensif membangun fondasi bisnis kuat.", icon: <Download />, color: "bg-red-50 text-red-600" },
                { title: "Template Proyeksi Finansial", format: "XLSX", size: "2.1 MB", desc: "Model spreadsheet siap pakai untuk hitung runway pendapatan.", icon: <Download />, color: "bg-green-50 text-green-600" },
                { title: "Draft NDA Standar Komunitas", format: "DOCX", size: "450 KB", desc: "Dokumen hukum dasar proteksi kekayaan intelektual.", icon: <Gavel />, color: "bg-blue-50 text-blue-600" },
                { title: "Dek Pitch Investor Sukses", format: "PPTX", size: "18.2 MB", desc: "Koleksi slide presentasi berhasil raih pendanaan.", icon: <Video />, color: "bg-purple-50 text-purple-600" },
                { title: "SOP Operasional Retail", format: "DOCX", size: "3.5 MB", desc: "Standard Operating Procedure untuk bisnis ritel modern.", icon: <Briefcase />, color: "bg-orange-50 text-orange-600" },
                { title: "Strategi Digital Marketing", format: "PDF", size: "8.9 MB", desc: "Panduan pemasaran di era digital kota besar.", icon: <Target />, color: "bg-indigo-50 text-indigo-600" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white p-7 rounded-[1.5rem] border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-5">
                  <div className={`${item.color} p-4 rounded-xl shadow-inner`}>
                            {React.cloneElement(item.icon, { size: 40 })}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{item.format}</span>
                    </div>
                <h3 className="text-xl font-black text-primary mb-3 tracking-tight group-hover:text-secondary transition-colors">{item.title}</h3>
                <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-7 opacity-70">{item.desc}</p>
                <div className="flex justify-between items-center pt-5 border-t border-outline-variant/20">
                        <span className="text-xs font-black opacity-30 tracking-widest">{item.size}</span>
                  <button className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider hover:gap-3 transition-all">
                    Unduh <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const JoinPage = () => (
  <div className="animate-in slide-in-from-bottom-10 duration-700 max-w-6xl mx-auto px-6 sm:px-8 py-16">
    <header className="text-center mb-12 max-w-4xl mx-auto">
      <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-black text-[10px] tracking-[0.35em] uppercase mb-6">AKSES EKSKLUSIF</span>
      <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight mb-5 leading-tight">Gabung komunitas bisnis yang lebih terkurasi.</h1>
      <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed opacity-80 font-medium">Isi data Anda singkat, lalu lanjutkan proses verifikasi lewat admin. Kami fokus pada kualitas member dan kolaborasi jangka panjang.</p>
    </header>

    <div className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.2)] p-8 sm:p-12 border border-outline-variant/30 flex flex-col items-center">
       <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mb-8 animate-pulse">
                <Sparkles size={48} />
             </div>
       <h2 className="text-3xl font-black text-primary mb-4 tracking-tight text-center">Permintaan Verifikasi Keanggotaan</h2>
       <p className="text-sm sm:text-base text-on-surface-variant text-center mb-10 opacity-70 max-w-2xl">Aplikasi Anda akan ditinjau manual oleh tim pengurus. Pastikan biodata dan profil bisnis diisi dengan jelas.</p>
             
       <form className="w-full max-w-3xl space-y-5">
         <div className="grid md:grid-cols-2 gap-4">
          <input className="w-full bg-surface-container-low border border-outline-variant/25 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 text-base font-bold transition-all" placeholder="Nama Lengkap" />
          <input className="w-full bg-surface-container-low border border-outline-variant/25 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 text-base font-bold transition-all" placeholder="Bidang Keahlian" />
                 </div>
         <input className="w-full bg-surface-container-low border border-outline-variant/25 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 text-base font-bold transition-all" placeholder="Link Profil Instagram / LinkedIn" />
         <textarea className="w-full bg-surface-container-low border border-outline-variant/25 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 text-base font-bold transition-all min-h-[180px]" placeholder="Deskripsikan nilai yang ingin Anda tawarkan kepada komunitas..." />
                  <a
                    href={buildWhatsAppLink('Halo Tim Medan Business, saya ingin mengajukan aplikasi keanggotaan. Mohon panduannya.')}
                    target="_blank"
                    rel="noreferrer"
          className="w-full inline-flex justify-center bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary hover:shadow-xl transition-all shadow-lg"
                  >
                    Ajukan Aplikasi Keanggotaan
                  </a>
             </form>
        </div>
    </div>
);

const EventsPage = ({ events }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-16">
    <header className="mb-10 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight mb-4">Kopdar & Agenda</h1>
      <p className="text-base sm:text-lg text-on-surface-variant font-medium opacity-75">Sinergi terbaik lahir dari pertemuan rutin. Pilih agenda yang relevan untuk bisnis Anda.</p>
    </header>

    <div className="grid gap-6">
            {events.map(event => (
        <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/20 flex flex-col lg:flex-row group hover:shadow-xl transition-all duration-300">
          <div className="w-full lg:w-44 bg-primary p-7 flex lg:flex-col items-center justify-center text-white shrink-0 group-hover:bg-secondary transition-colors duration-300 gap-3">
            <span className="text-xs font-black uppercase tracking-[0.35em] opacity-70">{event.month}</span>
            <span className="text-5xl font-black leading-none">{event.day}</span>
                    </div>
          <div className="p-7 sm:p-8 flex-grow flex flex-col justify-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">{event.type}</span>
            <h3 className="text-2xl sm:text-3xl font-black text-primary mb-3 tracking-tight leading-tight group-hover:text-secondary transition-colors">{event.title}</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium leading-relaxed opacity-70 mb-6 max-w-3xl">{event.desc}</p>
            <div className="flex flex-wrap gap-6 pt-6 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface/80">
                <MapPin size={18} className="text-primary" /> {event.location}
                            </div>
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface/80">
                <Clock size={18} className="text-primary" /> 19.30 WIB - Selesai
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const OpportunitiesPage = ({ opportunities }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-16">
    <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-5">
      <div className="text-center md:text-left max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight mb-4 leading-tight">Peluang & Sinergi Bisnis</h1>
        <p className="text-base sm:text-lg text-on-surface-variant font-medium opacity-75">Ruang kolaborasi strategis bagi anggota untuk berbagi kebutuhan suplai, proyek, dan kemitraan.</p>
            </div>
            <a
              href={buildWhatsAppLink('Halo Tim Medan Business, saya ingin posting peluang kolaborasi bisnis di komunitas.')}
              target="_blank"
              rel="noreferrer"
        className="bg-primary text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl transition-all shadow-lg flex items-center gap-3"
            >
        <Megaphone size={18} /> Posting Peluang
            </a>
        </div>

    <div className="grid gap-5">
            {opportunities.map(opp => (
        <div key={opp.id} className="bg-white p-6 sm:p-7 rounded-[2rem] border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-20 h-20 bg-primary-container/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-inner group">
                        {opp.icon === 'car' ? <Car size={64} /> : 
                         opp.icon === 'video' ? <Video size={64} /> : 
                         opp.icon === 'star' ? <Star size={64} /> : 
                         <ShoppingBag size={64} />}
                    </div>
                    <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{opp.type}</span>
                            <span className="text-xs font-bold text-outline uppercase tracking-widest opacity-50 ml-auto">PIC: {opp.postedBy}</span>
                        </div>
            <h3 className="text-2xl sm:text-3xl font-black text-primary mb-3 tracking-tight leading-tight">{opp.title}</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium leading-relaxed opacity-70 mb-0">{opp.desc}</p>
                    </div>
                    <div className="shrink-0">
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-lg">
                            Ambil Peluang
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


// --- ADMIN LOGIN PAGE ---

const AdminLoginPage = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === 'admin123') { // Simple hardcoded password
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-8">
      <div className="bg-white p-16 rounded-[4rem] shadow-4xl border border-outline-variant/10 w-full max-w-md animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-10">
          <Lock size={40} />
        </div>
        <h2 className="text-4xl font-black text-primary tracking-tighter text-center mb-4">Akses Terbatas</h2>
        <p className="text-on-surface-variant font-medium text-center opacity-60 mb-12">Hanya untuk pengurus komunitas.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            placeholder="Masukkan Kode Akses" 
            className={`w-full p-6 bg-surface-container-low border-none rounded-2xl font-black text-center tracking-[0.5em] transition-all ${error ? 'ring-4 ring-red-500/20 text-red-500' : 'focus:ring-8 focus:ring-primary/10'}`}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {error && <p className="text-center text-red-500 text-[10px] font-black uppercase tracking-widest animate-bounce">Kode Salah!</p>}
          <button type="submit" className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl">
            Verifikasi Sesi
          </button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // --- DATA STATE (CRUD) with Persistence ---
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('medan_community_data');
    if (saved) return JSON.parse(saved);
    return {
      members: membersData,
      stats: statsData,
      events: eventsData,
      opportunities: opportunitiesData
    };
  });

  useEffect(() => {
    localStorage.setItem('medan_community_data', JSON.stringify(appData));
  }, [appData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const filteredMembers = useMemo(() => {
    return appData.members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            member.business.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || member.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, appData.members]);

  const handleSelectProfile = (id, mode = 'business') => {
    navigate(`/profile/${mode}/${id}`);
  };

  // Skip rendering the full layout for Admin routes
  if (location.pathname.startsWith('/admin')) {
    return isAdminAuthenticated ? (
        <AdminPanel data={appData} onUpdate={setAppData} onBack={() => { setIsAdminAuthenticated(false); navigate('/'); }} />
    ) : (
        <AdminLoginPage onLogin={() => setIsAdminAuthenticated(true)} />
    );
  }

  return (
    <div className="app-shell min-h-screen text-on-surface font-body selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* --- TopNavBar Component --- */}
      <nav className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-700">
        <div className="glass-panel max-w-7xl mx-auto rounded-3xl px-6 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
          <Link 
            to="/"
            className="text-3xl font-black text-primary font-headline tracking-tighter cursor-pointer group flex items-center gap-4"
          >
            <div className="bg-primary p-3 rounded-2xl group-hover:rotate-12 transition-transform shadow-2xl shadow-primary/30">
                <Briefcase size={28} className="text-white" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">MEDAN BUSINESS</span>
          </Link>
          <div className="hidden xl:flex items-center space-x-2">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/members', label: 'Anggota', icon: <UserCircle size={16} /> },
              { path: '/business', label: 'Bisnis', icon: <Store size={16} /> },
              { path: '/events', label: 'Agenda' },
              { path: '/opportunities', label: 'Peluang' },
              { path: '/resources', label: 'Sumber Daya' },
              { path: '/about', label: 'Visi' }
            ].map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={`px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 ${location.pathname === item.path ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-105' : 'text-slate-600 hover:bg-primary/5 hover:text-primary'}`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <Link 
              to="/join"
              className="bg-primary text-white px-7 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-secondary hover:shadow-4xl transition-all duration-500 shadow-2xl shadow-primary/20"
            >
              Join Us
            </Link>
          </div>
        </div>

        <div className="xl:hidden max-w-7xl mx-auto mt-3 px-1">
          <div className="glass-panel rounded-2xl px-2 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/members', label: 'Anggota' },
              { path: '/business', label: 'Bisnis' },
              { path: '/events', label: 'Agenda' },
              { path: '/opportunities', label: 'Peluang' },
              { path: '/resources', label: 'Resource' },
              { path: '/about', label: 'Visi' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.18em] transition-all mr-1 ${location.pathname === item.path ? 'bg-primary text-white' : 'text-slate-600 hover:bg-primary/10 hover:text-primary'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="min-h-screen pt-44 xl:pt-36">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={navigate} />} />
          <Route path="/members" element={<MembersPersonalPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredMembers={filteredMembers} onSelectProfile={(id) => handleSelectProfile(id, 'personal')} />} />
          <Route path="/business" element={
            <BusinessCatalogPage 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredMembers={filteredMembers}
                    onSelectProfile={(id) => handleSelectProfile(id, 'business')}
            />
          } />
                  <Route path="/profile/personal/:id" element={<PersonalProfilePage members={appData.members} />} />
                  <Route path="/profile/business/:id" element={<BusinessProfilePage members={appData.members} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/events" element={<EventsPage events={appData.events} />} />
          <Route path="/opportunities" element={<OpportunitiesPage opportunities={appData.opportunities} />} />
        </Routes>
      </main>

      {/* --- Footer Component --- */}
      <footer className="pt-24 pb-16 px-4 sm:px-8 lg:px-10 mt-32">
        <div className="max-w-7xl mx-auto bg-white/85 backdrop-blur-2xl rounded-[2.75rem] section-frame px-8 sm:px-12 lg:px-16 py-16 sm:py-20 flex flex-col lg:flex-row justify-between items-start gap-20">
          <div className="space-y-12 max-w-md">
            <div className="text-5xl font-black text-primary font-headline tracking-tighter leading-none">MEDAN <br/>BUSINESS GROUP</div>
            <p className="text-2xl text-on-surface-variant leading-relaxed font-medium opacity-60">Kurasi profesional paling eksklusif untuk membangun masa depan industri Kota Medan melalui kolaborasi berkualitas.</p>
            <div className="flex gap-6">
              <a href="#" className="w-16 h-16 rounded-[2rem] bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                <Instagram size={32} />
              </a>
              <a href="#" className="w-16 h-16 rounded-[2rem] bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                <Facebook size={32} />
              </a>
              <a href={buildWhatsAppLink('Halo Medan Business, saya ingin terhubung dan mendapatkan info komunitas.')} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-[2rem] bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                <Share2 size={32} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-40">
            <div className="space-y-10">
              <h4 className="font-black text-primary uppercase text-xs tracking-[0.5em] opacity-40">PROFIL</h4>
              <div className="flex flex-col gap-6">
                <Link to="/members" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Anggota</Link>
                <Link to="/business" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Unit Bisnis</Link>
                <Link to="/about" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Visi & Misi</Link>
              </div>
            </div>
            <div className="space-y-10">
               <h4 className="font-black text-primary uppercase text-xs tracking-[0.5em] opacity-40">JARINGAN</h4>
               <div className="flex flex-col gap-6">
                <Link to="/events" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Agenda Kopdar</Link>
                <Link to="/opportunities" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Peluang Bisnis</Link>
                <Link to="/resources" className="text-on-surface-variant hover:text-primary text-left text-xl font-black transition-colors">Sumber Daya</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 px-2 flex flex-col md:flex-row justify-between items-center gap-8 text-outline text-[10px] font-black uppercase tracking-[0.25em] opacity-60">
          <span>© 2024 MEDAN COMMUNITY BUSINESS. PREMIUM CURATION.</span>
          <div className="flex gap-12">
            <Link to="/admin" className="hover:text-primary transition-colors cursor-pointer">ADMIN CMS</Link>
            <a href="#" className="hover:text-primary transition-colors">LEGAL</a>
            <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
          </div>
        </div>
      </footer>

      <a
        href={buildWhatsAppLink('Halo Tim Medan Business, saya ingin konsultasi cepat terkait keanggotaan dan kolaborasi.')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-[80] group"
        aria-label="Hubungi via WhatsApp"
      >
        <div className="flex items-center gap-3 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3 shadow-[0_18px_40px_-18px_rgba(37,211,102,0.8)] hover:scale-105 transition-all">
          <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={22} />
          </span>
          <div className="hidden sm:block leading-none">
            <p className="text-[10px] uppercase font-black tracking-widest opacity-80">CTWA</p>
            <p className="text-sm font-black">Chat WhatsApp</p>
          </div>
        </div>
      </a>
    </div>
  );
}
