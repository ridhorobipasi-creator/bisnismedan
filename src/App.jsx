import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Search, Users, Briefcase, MapPin,
  Instagram, Facebook, Clock, Filter,
  Coffee, MonitorPlay, ShoppingBag,
  Building, GraduationCap, Car, Wheat, HelpCircle,
  Megaphone, Target, Star, Handshake, CheckCircle2,
  Download, ArrowRight, Verified, Share2, Video, ChevronLeft,
  Gavel, Sparkles, UserCircle, Store, MessageCircle,
  Lock, Sun, Moon
} from 'lucide-react';
import { membersData, statsData, eventsData, opportunitiesData } from './data';
import AdminPanel from './AdminPanel';

const categories = [
  { name: "Semua", icon: <Filter size={16} /> },
  { name: "F&B", icon: "restaurant" },
  { name: "Retail & Grosir", icon: "shopping_bag" },
  { name: "Jasa & Sewa", icon: "handyman" },
  { name: "Agensi & IT", icon: "computer" },
  { name: "Properti & Konstruksi", icon: "apartment" },
  { name: "Pendidikan", icon: "school" },
  { name: "Otomotif", icon: "directions_car" },
  { name: "Pertanian & Peternakan", icon: "agriculture" }
];

const COMMUNITY_WHATSAPP = '62812000000';
const buildWhatsAppLink = (text) => `https://wa.me/${COMMUNITY_WHATSAPP}?text=${encodeURIComponent(text)}`;



const Quote = ({ className, size }) => (
    <div className={className}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H2.017V21H5.017Z" />
        </svg>
    </div>
);

// --- Existing Sub-components (Pages) ---

const HomePage = ({ onNavigate, opportunities }) => (
  <div className="animate-in fade-in duration-700">
    {/* HERO */}
    <section className="relative px-6 sm:px-8 py-24 lg:py-36 overflow-hidden">
      <div className="orb w-[500px] h-[500px] animate-float" style={{background:'rgba(77,142,255,0.1)',top:'-200px',left:'-150px',animationDelay:'0s'}}></div>
      <div className="orb w-[400px] h-[400px] animate-float" style={{background:'rgba(78,222,163,0.07)',top:'-100px',right:'-100px',animationDelay:'2.5s'}}></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
        <div>
          <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-8" style={{color:'var(--clr-on-surface)'}}>
            Perkumpulan pebisnis Medan yang saling <span className="gradient-text">berbagi peluang.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-12 leading-relaxed" style={{color:'var(--clr-on-surface-variant)'}}>
            Ekosistem bisnis terkurasi untuk profesional berimpact tinggi. Platform kolaborasi eksklusif di Kota Medan dan Sumatera Utara.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('/business')}
              className="btn-primary px-8 py-4 rounded-3xl font-bold text-base flex items-center gap-3"
            >
              Explore Network <ArrowRight size={20} />
            </button>
            <button onClick={() => onNavigate('/about')}
              className="btn-outline px-8 py-4 rounded-3xl font-bold text-base flex items-center gap-3"
            >
              Visi Kami
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border" style={{aspectRatio:'4/5',borderColor:'var(--clr-border-strong)'}}>
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
              alt="Modern Office Medan"
            />
            <div className="absolute inset-0" style={{background:'linear-gradient(to top, var(--clr-bg) 0%, transparent 40%)',opacity:0.6}}></div>
          </div>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{background:'rgba(77,142,255,0.1)',filter:'blur(80px)'}}></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full" style={{background:'rgba(78,222,163,0.08)',filter:'blur(80px)'}}></div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 px-6 sm:px-8 stats-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="stat-card p-10 rounded-3xl cursor-default">
            <div className="text-5xl font-headline font-bold mb-2" style={{color:'var(--clr-primary-container)'}}>100+</div>
            <div className="font-label tracking-widest uppercase text-xs mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Curated Profiles</div>
            <p className="text-sm leading-relaxed" style={{color:'var(--clr-on-surface-variant)',opacity:0.7}}>Proses seleksi ketat memastikan hanya profesional paling berdedikasi yang bergabung.</p>
          </div>
          <div className="stat-card p-10 rounded-3xl cursor-default">
            <div className="text-5xl font-headline font-bold mb-2" style={{color:'var(--clr-tertiary)'}}>1.2K</div>
            <div className="font-label tracking-widest uppercase text-xs mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Strategic Connections</div>
            <p className="text-sm leading-relaxed" style={{color:'var(--clr-on-surface-variant)',opacity:0.7}}>Jembatan aktif antar sektor mendorong inovasi dan pertumbuhan ekonomi regional.</p>
          </div>
          <div className="stat-card p-10 rounded-3xl cursor-default">
            <div className="text-5xl font-headline font-bold mb-2" style={{color:'var(--clr-on-surface)'}}>94%</div>
            <div className="font-label tracking-widest uppercase text-xs mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Retention Rate</div>
            <p className="text-sm leading-relaxed" style={{color:'var(--clr-on-surface-variant)',opacity:0.7}}>Anggota terus menemukan nilai melalui wawasan bersama dan intelijen regional eksklusif.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Opportunities */}
    <section className="px-6 sm:px-8 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="font-label tracking-[0.3em] uppercase text-xs mb-4 block" style={{color:'var(--clr-tertiary)'}}>Marketplace</span>
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight" style={{color:'var(--clr-on-surface)'}}>Featured Business Opportunities</h2>
          </div>
          <button onClick={() => onNavigate('/opportunities')}
            className="text-sm font-medium flex items-center gap-2 hover:underline transition-all" style={{color:'var(--clr-primary-container)'}}>
            Lihat Semua Peluang <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
            cat:'F&B Hospitality', title:'Premium Boutique Café',
            desc:'Peluang ekspansi konsep F&B yang sudah terbukti di kawasan residensial Medan Utara.',
            sub:'Investasi: Kolektif'
          },{
            img:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
            cat:'Infrastructure', title:'Logistic Center Development',
            desc:'Kemitraan gudang berkelanjutan 15.000 m² dekat Pelabuhan Belawan.',
            sub:'Joint Venture'
          },{
            img:'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=600&q=80',
            cat:'Digital Solution', title:'Agri-Tech Supply Chain SaaS',
            desc:'Mencari mitra Series A untuk platform supply chain lokal yang melayani petani Sumut.',
            sub:'Equity Funding'
          }].map((opp,i) => (
            <div key={i} className="surface-card group rounded-3xl overflow-hidden shadow-xl cursor-pointer" onClick={() => onNavigate('/opportunities')}>
              <div className="h-48 overflow-hidden relative">
                <img src={opp.img} alt={opp.cat}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="cat-tag mb-6">{opp.cat}</div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors" style={{color:'var(--clr-on-surface)'}}>{opp.title}</h3>
                <p className="text-sm leading-relaxed mb-8" style={{color:'var(--clr-on-surface-variant)'}}>{opp.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{color:'var(--clr-on-surface)'}}>{opp.sub}</span>
                  <div className="p-2 rounded-full transition-all bg-primary/10 group-hover:bg-primary group-hover:text-white" style={{color:'var(--clr-primary-container)'}}>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 sm:px-8 py-20">
      <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center border relative overflow-hidden cta-pattern"
        style={{background:'linear-gradient(135deg, rgba(77,142,255,0.12) 0%, var(--clr-surface-3) 100%)', borderColor:'rgba(77,142,255,0.15)'}}>
        <div className="absolute" style={{width:300,height:300,background:'rgba(78,222,163,0.06)',filter:'blur(100px)',borderRadius:'50%',top:-50,right:-50}}></div>
        <div className="relative z-10">
          <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-6" style={{color:'var(--clr-on-surface)'}}>Siap Berbagi Peluang?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{color:'var(--clr-on-surface-variant)'}}>
            Tingkatkan trajektori profesional Anda. Bergabunglah dengan jaringan di mana peluang tidak hanya ditemukan, tapi diciptakan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('/join')}
              className="btn-primary px-10 py-4 rounded-2xl font-bold text-base">
              Daftar Keanggotaan
            </button>
            <button onClick={() => onNavigate('/about')}
              className="btn-outline px-10 py-4 rounded-2xl font-bold text-base">
              Bicara dengan Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const MembersPersonalPage = ({ searchTerm, setSearchTerm, filteredMembers, onSelectProfile }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
    <header className="mb-16 text-center max-w-3xl mx-auto">
      <span className="font-label tracking-[0.3em] uppercase text-xs mb-4 block" style={{color:'var(--clr-tertiary)'}}>Talenta Terkurasi</span>
      <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{color:'var(--clr-on-surface)'}}>
        Jejaring Eksklusif <span className="gradient-text">Anggota</span>
      </h1>
      <p className="text-lg leading-relaxed" style={{color:'var(--clr-on-surface-variant)'}}>Mengenal lebih dekat sosok-sosok di balik kemajuan ekonomi Medan.</p>
    </header>

    <div className="max-w-2xl mx-auto mb-20">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2" size={20} style={{color:'var(--clr-primary-container)'}} />
        <input
          type="text"
          placeholder="Cari nama anggota atau keahlian..."
          className="input-field w-full pl-16 pr-6 py-5 rounded-3xl text-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredMembers.map(member => (
        <div key={member.id} className="member-card p-10 rounded-[2.5rem] group text-center cursor-pointer" onClick={() => onSelectProfile(member.id)}>
          <div className="w-28 h-28 rounded-3xl mx-auto mb-8 overflow-hidden flex items-center justify-center p-1" style={{border:'2px solid var(--clr-border-strong)', background:'var(--clr-surface-3)'}}>
             <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-surface-2">
              {member.profilePhoto
                ? <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                : <span className="font-headline font-bold text-4xl select-none" style={{color:'var(--clr-primary)'}}>{member.name[0]}</span>
              }
             </div>
          </div>
          <h3 className="font-headline text-2xl font-bold mb-2 tracking-tight transition-colors group-hover:text-primary-container" style={{color:'var(--clr-on-surface)'}}>{member.name}</h3>
          <p className="font-label text-[10px] font-bold uppercase tracking-widest mb-8" style={{color:'var(--clr-primary)'}}>
            {member.age !== '-' ? `${member.age} Tahun` : 'Anggota Aktif'}
          </p>
          <div className="p-6 rounded-3xl mb-8 text-left space-y-4" style={{background:'var(--clr-surface-3)', border:'1px solid var(--clr-border)'}}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50" style={{color:'var(--clr-on-surface-variant)'}}>Bisnis</span>
              <span className="text-base font-bold line-clamp-1" style={{color:'var(--clr-on-surface)'}}>{member.business}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{color:'var(--clr-on-surface-variant)'}}>Experience</span>
              <span className="text-sm font-bold" style={{color:'var(--clr-tertiary)'}}>{member.duration}</span>
            </div>
          </div>
          <button
            onClick={() => onSelectProfile(member.id)}
            className="btn-primary w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest"
          >
            Lihat Profil
          </button>
        </div>
      ))}
    </div>
  </div>
);

const BusinessCatalogPage = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredMembers, onSelectProfile }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <span className="font-label tracking-[0.3em] uppercase text-xs mb-4 block" style={{color:'var(--clr-primary-container)'}}>Unit Bisnis Terverifikasi</span>
        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{color:'var(--clr-on-surface)'}}>
          Katalog <span className="gradient-text">Terkurasi</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{color:'var(--clr-on-surface-variant)'}}>Etalase eksklusif ragam produk dan jasa terbaik dari ekosistem bisnis Medan.</p>
      </div>
      <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-3 shrink-0">
        <Store size={22} style={{color:'var(--clr-primary-container)'}} />
        <span className="font-bold text-lg" style={{color:'var(--clr-on-surface)'}}>{filteredMembers.length} <span className="text-sm opacity-50 block font-normal">Unit Aktif</span></span>
      </div>
    </div>

    {/* Filters */}
    <div className="sticky top-28 z-40 glass-nav py-4 rounded-[2rem] px-5 mb-14 border border-white/5">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2" size={18} style={{color:'var(--clr-primary-container)'}} />
          <input
            type="text"
            placeholder="Cari F&B, Jasa, IT..."
            className="input-field w-full pl-14 pr-6 py-4 rounded-2xl text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-hide">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              className="flex items-center gap-2 px-5 py-3 rounded-[1.25rem] font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all"
              style={selectedCategory === cat.name
                ? {background:'var(--clr-primary-container)', color:'var(--clr-on-primary-container)', boxShadow:'0 8px 32px rgba(77,142,255,0.3)'}
                : {background:'var(--clr-surface-3)', color:'var(--clr-on-surface-variant)', border:'1px solid var(--clr-border)'}}
            >
              {typeof cat.icon === 'string' ? <span className="material-symbols-outlined text-[16px]">{cat.icon}</span> : cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Business Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredMembers.map(member => (
        <article key={member.id} onClick={() => onSelectProfile(member.id)} className="surface-card rounded-[2.5rem] overflow-hidden flex flex-col group border border-white/5 bg-surface-2 shadow-2xl cursor-pointer">
          <div className="h-56 relative overflow-hidden">
            <img src={member.businessPhoto || member.profilePhoto || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600"} 
              alt={member.business} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent opacity-80"></div>
            <div className="absolute top-5 left-5">
              <div className="cat-tag">{member.category}</div>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <h3 className="font-headline text-2xl font-bold mb-2 tracking-tight group-hover:text-primary-container transition-colors" style={{color:'var(--clr-on-surface)'}}>{member.business}</h3>
            <div className="flex items-center gap-2 text-sm mb-6 opacity-60" style={{color:'var(--clr-on-surface-variant)'}}>
              <MapPin size={16} style={{color:'var(--clr-primary-container)'}} />
              <span>{member.location}</span>
            </div>
            <div className="p-6 rounded-3xl mb-8 flex-grow" style={{background:'var(--clr-surface-3)', border:'1px solid var(--clr-border)'}}>
              <p className="text-sm leading-relaxed italic mb-6 opacity-70" style={{color:'var(--clr-on-surface-variant)'}}>
                "{member.description || 'Layanan berkualitas dengan integritas yang terjaga melalui kurasi komunitas.'}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-white" style={{background:'var(--clr-primary-container)'}}>{member.name[0]}</div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block opacity-50" style={{color:'var(--clr-on-surface-variant)'}}>Owner</span>
                  <span className="text-base font-bold" style={{color:'var(--clr-on-surface)'}}>{member.name}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onSelectProfile(member.id)}
              className="btn-primary w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3"
            >
              Lihat Profil Bisnis <ArrowRight size={18} />
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="animate-in fade-in duration-700 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32 space-y-16">
    <section className="relative overflow-hidden rounded-[3rem] p-12 sm:p-20 border border-white/5" style={{background:'linear-gradient(135deg, rgba(77,142,255,0.1) 0%, var(--clr-surface-3) 100%)'}}>
      <div className="orb w-[500px] h-[500px] bg-primary/10 -top-40 -right-40" style={{filter:'blur(100px)'}}></div>
      <div className="relative z-10 max-w-3xl">
        <span className="font-label tracking-[0.3em] uppercase text-xs mb-6 block" style={{color:'var(--clr-primary-container)'}}>Visi Kami</span>
        <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8" style={{color:'var(--clr-on-surface)'}}>
          Kurasi profesional <span className="gradient-text">dengan standar </span> lebih tinggi.
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed" style={{color:'var(--clr-on-surface-variant)'}}>Kami membangun ekosistem bisnis Medan yang lebih sehat: terhubung, terverifikasi, dan memiliki akses eksklusif ke intelijen bisnis daerah.</p>
      </div>
    </section>

    <section className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-12 surface-card rounded-[3rem] p-12 sm:p-16 border border-white/5">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-6" style={{color:'var(--clr-on-surface)'}}>Misi yang fokus pada dampak jangka panjang</h2>
        <p className="leading-relaxed mb-12 text-lg max-w-4xl" style={{color:'var(--clr-on-surface-variant)'}}>MEDAN BUSINESS PRO dirancang sebagai akselerator bagi pemilik bisnis untuk menjalin kerja sama strategis, berbagi peluang proyek, dan memperkuat basis ekonomi lokal.</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: 'verified_user', title: 'Kurasi Ketat', desc: 'Hanya individu dengan rekam jejak integritas tinggi yang tergabung.' },
            { icon: 'handshake', title: 'Kolaborasi Nyata', desc: 'Kami tidak hanya networking, kami mengeksekusi proyek bersama.' },
            { icon: 'track_changes', title: 'Pertumbuhan Terukur', desc: 'Membantu member naik level melalui wawasan bisnis regional.' }
          ].map((item,i) => (
            <div key={i} className="rounded-3xl p-8 transition-colors border border-white/5" style={{background:'var(--clr-surface-3)'}}>
              <div className="mb-6" style={{color:'var(--clr-primary-container)'}}>
                 <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
              </div>
              <p className="font-headline text-xl font-bold mb-3" style={{color:'var(--clr-on-surface)'}}>{item.title}</p>
              <p className="text-sm leading-relaxed" style={{color:'var(--clr-on-surface-variant)'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ResourcesPage = () => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32 space-y-16">
    <section className="relative overflow-hidden rounded-[3rem] p-12 sm:p-20 border border-white/5" style={{background:'linear-gradient(135deg, rgba(78,222,163,0.1) 0%, var(--clr-surface-3) 100%)'}}>
      <div className="orb w-[400px] h-[400px] bg-tertiary/10 -right-32 -bottom-32" style={{filter:'blur(80px)'}}></div>
      <div className="relative z-10 max-w-3xl">
        <span className="font-label tracking-[0.3em] uppercase text-xs mb-6 block" style={{color:'var(--clr-tertiary)'}}>Pusat Pengetahuan</span>
        <h1 className="font-headline text-5xl sm:text-6xl font-bold tracking-tight mb-8 leading-[1.1]" style={{color:'var(--clr-on-surface)'}}>Sumber daya eksklusif untuk <span className="gradient-text">pertumbuhan bisnis</span> Anda.</h1>
        <p className="text-lg leading-relaxed mb-10 opacity-80" style={{color:'var(--clr-on-surface-variant)'}}>Akses template legal, modul operasional, dan dokumen strategi rahasia yang dirancang khusus untuk pasar lokal.</p>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary px-10 py-4 rounded-2xl">Unduh Paket Emas</button>
          <button className="btn-outline px-10 py-4 rounded-2xl">Ajukan Request</button>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: 'Panduan Dasar Bisnis', format: 'PDF', size: '12.4 MB', desc: 'Kerangka kerja komprehensif membangun fondasi bisnis yang sehat.', clr: 'var(--clr-error)' },
        { title: 'Template Proyeksi Finansial', format: 'XLSX', size: '2.1 MB', desc: 'Model spreadsheet untuk menghitung runway dan profitabilitas.', clr: 'var(--clr-tertiary)' },
        { title: 'Draft NDA Standar Komunitas', format: 'DOCX', size: '450 KB', desc: 'Dokumen hukum dasar untuk melindungi kekayaan intelektual.', clr: 'var(--clr-primary-container)' },
        { title: 'Pitch Deck Success Model', format: 'PPTX', size: '18.2 MB', desc: 'Slide presentasi untuk memenangkan pendanaan investor.', clr: '#a855f7' },
        { title: 'SOP Operasional Retail', format: 'DOCX', size: '3.5 MB', desc: 'Standard Operating Procedure untuk otomasi bisnis ritel.', clr: '#f97316' },
        { title: 'Strategi Digital Lokasi Lokal', format: 'PDF', size: '8.9 MB', desc: 'Panduan pemasaran digital spesifik untuk market Sumatera Utara.', clr: 'var(--clr-primary)' }
      ].map((item, idx) => (
        <div key={idx} className="surface-card p-10 rounded-[2.5rem] group border border-white/5 bg-surface-2 shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 rounded-2xl" style={{background:`${item.clr}15`, border:`1px solid ${item.clr}30`}}>
              <span className="material-symbols-outlined text-[28px]" style={{color:item.clr}}>download</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60" style={{color:item.clr}}>{item.format}</span>
          </div>
          <h3 className="font-headline text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors" style={{color:'var(--clr-on-surface)'}}>{item.title}</h3>
          <p className="text-sm leading-relaxed mb-10 opacity-70" style={{color:'var(--clr-on-surface-variant)'}}>{item.desc}</p>
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <span className="text-xs font-bold opacity-40" style={{color:'var(--clr-on-surface-variant)'}}>{item.size}</span>
            <button className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all" style={{color:'var(--clr-primary-container)'}}>Unduh <ArrowRight size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const JoinPage = () => (
  <div className="animate-in slide-in-from-bottom-10 duration-1000 max-w-4xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
    <header className="text-center mb-20 max-w-3xl mx-auto">
      <span className="font-label tracking-[0.3em] uppercase text-xs mb-6 block" style={{color:'var(--clr-primary-container)'}}>Aplikasi Keanggotaan</span>
      <h1 className="font-headline text-5xl sm:text-6xl font-bold tracking-tight mb-8 leading-[1.1]" style={{color:'var(--clr-on-surface)'}}>
        Gabung komunitas bisnis <span className="gradient-text">paling terkurasi.</span>
      </h1>
      <p className="text-lg leading-relaxed opacity-80" style={{color:'var(--clr-on-surface-variant)'}}>Aplikasi Anda akan ditinjau manual oleh tim pengurus untuk menjaga kualitas ekosistem.</p>
    </header>
    <div className="surface-card rounded-[3rem] p-12 sm:p-16 flex flex-col items-center border border-white/5 bg-surface-2 shadow-2xl">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-xl" style={{background:'linear-gradient(135deg, var(--clr-primary-container), var(--clr-inverse-primary))'}}>
         <span className="material-symbols-outlined text-[36px] text-white">verified</span>
      </div>
      <h2 className="font-headline text-3xl font-bold mb-3 text-center" style={{color:'var(--clr-on-surface)'}}>Permintaan Verifikasi</h2>
      <p className="text-center mb-12 text-base max-w-lg opacity-60" style={{color:'var(--clr-on-surface-variant)'}}>Isi data singkat berikut, tim kami akan memverifikasi dalam 1-2 hari kerja.</p>
      <form className="w-full space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2">Nama Lengkap</label>
            <input className="input-field w-full rounded-2xl p-5 text-base" placeholder="Contoh: Ridho Robi" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2">Bidang Keahlian / Industri</label>
            <input className="input-field w-full rounded-2xl p-5 text-base" placeholder="F&B, Agensi, Properti..." />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2">Link Profil Bisnis (IG/LinkedIn/Web)</label>
          <input className="input-field w-full rounded-2xl p-5 text-base" placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2">Visi Bergabung (Singkat)</label>
          <textarea className="input-field w-full rounded-2xl p-5 text-base min-h-[160px]" placeholder="Apa yang ingin Anda dapatkan dan tawarkan di ekosistem ini?" />
        </div>
        <a
          href={buildWhatsAppLink('Halo Medan Business Pro, saya ingin mengajukan aplikasi keanggotaan. Mohon panduannya.')}
          target="_blank" rel="noreferrer"
          className="btn-primary w-full inline-flex justify-center items-center py-5 rounded-2xl font-bold text-sm uppercase tracking-widest gap-3 mt-4"
        >
          Submit & Lanjut ke WhatsApp
        </a>
      </form>
    </div>
  </div>
);

const EventsPage = ({ events }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
    <header className="mb-20 text-center max-w-3xl mx-auto">
      <span className="font-label tracking-[0.3em] uppercase text-xs mb-4 block" style={{color:'var(--clr-primary-container)'}}>Agenda Komunitas</span>
      <h1 className="font-headline text-5xl sm:text-6xl font-bold tracking-tight mb-8" style={{color:'var(--clr-on-surface)'}}>Kopdar & <span className="gradient-text">Agenda</span></h1>
      <p className="text-lg leading-relaxed opacity-80" style={{color:'var(--clr-on-surface-variant)'}}>Pertemuan rutin untuk mempererat sinergi dan kolaborasi antar member MedanPro.</p>
    </header>
    <div className="grid gap-10">
      {events.map(event => (
        <div key={event.id} className="surface-card rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row group border border-white/5 shadow-2xl">
          <div className="w-full lg:w-48 p-10 flex lg:flex-col items-center justify-center text-on-primary-container shrink-0 gap-3" style={{background:'var(--gradient-primary-btn)'}}>
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">{event.month}</span>
            <span className="text-7xl font-headline font-bold leading-none">{event.day}</span>
          </div>
          <div className="p-10 flex-grow flex flex-col justify-center">
            <span className="cat-tag mb-6 w-fit">{event.type}</span>
            <h3 className="font-headline text-3xl font-bold mb-4 tracking-tight group-hover:text-primary-container transition-colors" style={{color:'var(--clr-on-surface)'}}>{event.title}</h3>
            <p className="text-base leading-relaxed mb-8 max-w-3xl opacity-70" style={{color:'var(--clr-on-surface-variant)'}}>{event.desc}</p>
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm font-bold" style={{color:'var(--clr-on-surface)'}}>  
                <MapPin size={18} style={{color:'var(--clr-primary-container)'}} /> {event.location}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold" style={{color:'var(--clr-on-surface)'}}>
                <Clock size={18} style={{color:'var(--clr-primary-container)'}} /> 19.30 WIB - Selesai
              </div>
              <a 
                href={buildWhatsAppLink(`Halo MedanPro, saya ingin konfirmasi kehadiran untuk agenda: ${event.title}.`)}
                target="_blank" rel="noreferrer"
                className="lg:ml-auto text-xs font-bold uppercase tracking-widest overflow-hidden relative group/btn py-2 px-1 hover:text-primary transition-colors"
              >
                Konfirmasi Kehadiran
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-container group-hover/btn:w-full transition-all"></div>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OpportunitiesPage = ({ opportunities }) => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
    <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8">
      <div className="max-w-2xl">
        <span className="font-label tracking-[0.3em] uppercase text-xs mb-4 block" style={{color:'var(--clr-tertiary)'}}>Peluang Eksklusif</span>
        <h1 className="font-headline text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]" style={{color:'var(--clr-on-surface)'}}>
          Sinergi <span className="gradient-text">& Kolaborasi</span>
        </h1>
        <p className="text-lg leading-relaxed opacity-80" style={{color:'var(--clr-on-surface-variant)'}}>Ruang strategis bagi member untuk berbagi kebutuhan project, supply chain, dan kemitraan modal.</p>
      </div>
      <a href={buildWhatsAppLink('Halo MedanPro, saya ingin posting peluang kolaborasi.')}
        target="_blank" rel="noreferrer"
        className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 shrink-0">
        <span className="material-symbols-outlined text-[20px]">add_circle</span> Posting Peluang
      </a>
    </div>
    <div className="grid gap-6">
      {opportunities.map(opp => (
        <div key={opp.id} className="surface-card p-8 sm:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start md:items-center border border-white/5 bg-surface-2 shadow-xl">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg" style={{background:'rgba(77,142,255,0.08)', border:'1px solid rgba(77,142,255,0.15)', color:'var(--clr-primary-container)'}}>
            <span className="material-symbols-outlined text-[36px]">
              {opp.icon === 'car' ? 'directions_car' : opp.icon === 'video' ? 'videocam' : opp.icon === 'star' ? 'auto_awesome' : 'business_center'}
            </span>
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="cat-tag">{opp.type}</div>
              <span className="text-[10px] ml-auto font-bold uppercase tracking-widest opacity-40 font-label" style={{color:'var(--clr-on-surface-variant)'}}>PIC: {opp.postedBy}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors" style={{color:'var(--clr-on-surface)'}}>{opp.title}</h3>
            <p className="text-base leading-relaxed opacity-70" style={{color:'var(--clr-on-surface-variant)'}}>{opp.desc}</p>
          </div>
          <a 
            href={buildWhatsAppLink(`Halo MedanPro, saya tertarik untuk kolaborasi mengenai peluang: ${opp.title}. Mohon informasikan langkah selanjutnya.`)}
            target="_blank" rel="noreferrer"
            className="btn-primary shrink-0 px-8 py-4 rounded-2xl flex items-center gap-2 group-hover:translate-x-1 transition-transform"
          >
            Ambil Opportunity <ArrowRight size={16} />
          </a>
        </div>
      ))}
    </div>
  </div>
);

const PersonalProfilePage = ({ members }) => {
  const { id } = useParams();
  const member = members.find(m => m.id === parseInt(id));
  if (!member) return <div className="py-32 text-center font-headline text-2xl font-bold">Member tidak ditemukan</div>;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-5xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
      <div className="surface-card rounded-[3rem] overflow-hidden border border-white/5 bg-surface-2 shadow-2xl">
        <div className="h-64 relative overflow-hidden" style={{background:'var(--gradient-primary-btn)'}}>
           <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'40px 40px'}}></div>
           <div className="absolute -bottom-20 left-12 w-48 h-48 rounded-full border-[8px] border-surface-2 overflow-hidden shadow-2xl bg-surface-3">
              {member.profilePhoto 
                ? <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center font-headline font-bold text-6xl" style={{color:'var(--clr-primary-container)'}}>{member.name[0]}</div>
              }
           </div>
        </div>
        <div className="pt-32 pb-16 px-12">
           <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="max-w-2xl">
                 <h1 className="font-headline text-5xl font-bold tracking-tight mb-3" style={{color:'var(--clr-on-surface)'}}>{member.name}</h1>
                 <p className="font-label text-sm font-bold uppercase tracking-[0.2em] mb-8" style={{color:'var(--clr-primary-container)'}}>{member.age} Tahun • {member.duration} Experience</p>
                 <div className="space-y-10">
                    <section>
                       <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Profil Profesional</h4>
                       <p className="text-xl leading-relaxed font-medium" style={{color:'var(--clr-on-surface)'}}>{member.aboutMe || "Seorang profesional berdedikasi yang berfokus pada kolaborasi dan integritas dalam membangun ekosistem bisnis."}</p>
                    </section>
                    <div className="grid sm:grid-cols-2 gap-10">
                       <section>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Bisnis Utama</h4>
                          <Link to={`/profile/business/${member.id}`} className="block p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors" style={{background:'var(--clr-surface-3)'}}>
                             <p className="font-bold text-lg" style={{color:'var(--clr-on-surface)'}}>{member.business}</p>
                             <p className="text-xs opacity-60" style={{color:'var(--clr-on-surface-variant)'}}>{member.category} • {member.location}</p>
                          </Link>
                       </section>
                       <section>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Keahlian Spesifik</h4>
                          <div className="flex flex-wrap gap-2">
                             {(member.expertise || "Business Strategy, Leadership").split(',').map((e,i) => (
                                <span key={i} className="px-5 py-2.5 rounded-full text-xs font-bold border border-white/5" style={{background:'var(--clr-surface-3)', color:'var(--clr-on-surface)'}}>{e.trim()}</span>
                             ))}
                          </div>
                       </section>
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-auto shrink-0 space-y-4">
                 <a href={buildWhatsAppLink(`Halo ${member.name}, saya ingin berdiskusi mengenai bisnis Anda.`)} target="_blank" rel="noreferrer" className="btn-primary w-full py-4 px-10 rounded-2xl flex items-center justify-center gap-3">
                    Hubungi Member <MessageCircle size={18} />
                 </a>
                 <Link to="/members" className="btn-outline w-full py-4 px-10 rounded-2xl flex items-center justify-center gap-3">
                    Kembali ke Direktori
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BusinessProfilePage = ({ members }) => {
  const { id } = useParams();
  const member = members.find(m => m.id === parseInt(id));
  if (!member) return <div className="py-32 text-center font-headline text-2xl font-bold">Unit Bisnis tidak ditemukan</div>;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-6xl mx-auto px-6 sm:px-8 py-24 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <div className="surface-card rounded-[3rem] overflow-hidden border border-white/5 bg-surface-2 shadow-2xl">
              <div className="h-80 relative">
                 <img src={member.businessPhoto || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200"} className="w-full h-full object-cover opacity-60" alt={member.business} />
                 <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent"></div>
                 <div className="absolute bottom-8 left-10">
                    <div className="cat-tag mb-4">{member.category}</div>
                    <h1 className="font-headline text-5xl font-bold tracking-tight text-white">{member.business}</h1>
                 </div>
              </div>
              <div className="p-10 lg:p-12 space-y-12">
                 <section>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6" style={{color:'var(--clr-on-surface-variant)'}}>Visi Bisnis & Deskripsi</h4>
                    <p className="text-xl leading-relaxed font-medium" style={{color:'var(--clr-on-surface)'}}>{member.description || "Menyediakan layanan berkualitas dengan standar profesionalisme tinggi yang telah terkurasi oleh komunitas MedanPro."}</p>
                 </section>
                 <div className="grid sm:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2rem] border border-white/5" style={{background:'var(--clr-surface-3)'}}>
                       <span className="material-symbols-outlined text-[24px] mb-4" style={{color:'var(--clr-primary-container)'}}>location_on</span>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1" style={{color:'var(--clr-on-surface-variant)'}}>Lokasi Operasional</p>
                       <p className="font-bold text-lg" style={{color:'var(--clr-on-surface)'}}>{member.location}</p>
                    </div>
                    <div className="p-8 rounded-[2rem] border border-white/5" style={{background:'var(--clr-surface-3)'}}>
                       <span className="material-symbols-outlined text-[24px] mb-4" style={{color:'var(--clr-tertiary)'}}>stars</span>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1" style={{color:'var(--clr-on-surface-variant)'}}>Status Verifikasi</p>
                       <p className="font-bold text-lg" style={{color:'var(--clr-on-surface)'}}>Business Pro Member</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="surface-card p-10 rounded-[3rem] border border-white/5 bg-surface-2 shadow-2xl">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-8 text-center" style={{color:'var(--clr-on-surface-variant)'}}>Business Owner</h4>
              <div className="text-center mb-10">
                 <div className="w-24 h-24 rounded-3xl mx-auto mb-6 border-2 border-white/10 overflow-hidden shadow-xl" style={{background:'var(--clr-surface-3)'}}>
                    {member.profilePhoto 
                      ? <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center font-headline font-bold text-4xl" style={{color:'var(--clr-primary-container)'}}>{member.name[0]}</div>
                    }
                 </div>
                 <h3 className="font-headline text-2xl font-bold tracking-tight mb-2" style={{color:'var(--clr-on-surface)'}}>{member.name}</h3>
                 <p className="text-xs font-bold opacity-60" style={{color:'var(--clr-on-surface-variant)'}}>{member.duration} Experience</p>
              </div>
              <Link to={`/profile/personal/${member.id}`} className="btn-outline w-full py-4 rounded-2xl flex items-center justify-center gap-3 mb-4">
                 Lihat Profil Owner
              </Link>
              <a href={buildWhatsAppLink(`Halo, saya tertarik dengan unit bisnis ${member.business}. Bisakah berdiskusi?`)} target="_blank" rel="noreferrer" className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3">
                 Diskusi Bisnis <ArrowRight size={18} />
              </a>
           </div>
           
           <div className="p-10 rounded-[3rem] border border-white/5" style={{background:'var(--clr-surface-3)'}}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4" style={{color:'var(--clr-on-surface-variant)'}}>Catatan Komunitas</p>
              <div className="flex items-start gap-4">
                 <span className="material-symbols-outlined text-[20px] mt-1" style={{color:'var(--clr-tertiary)'}}>info</span>
                 <p className="text-xs leading-relaxed opacity-60" style={{color:'var(--clr-on-surface-variant)'}}>Unit bisnis ini telah melewati tahap kurasi administrasi dan verifikasi tatap muka oleh dewan pengurus MedanPro.</p>
              </div>
           </div>
        </div>
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


  // --- THEME ---
  const [theme, setTheme] = useState(() => localStorage.getItem('mb_theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mb_theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // --- DATA STATE (CRUD) with Persistence ---
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('medan_community_data');
    if (saved) return JSON.parse(saved);
    return { members: membersData, stats: statsData, events: eventsData, opportunities: opportunitiesData };
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
    return <AdminPanel />;
  }

  return (
    <div className="app-shell overflow-x-hidden min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-headline font-bold text-2xl tracking-tighter transition-all group-hover:scale-105" style={{color:'var(--clr-primary-container)'}}>MedanPro</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/members', label: 'Anggota' },
              { path: '/business', label: 'Bisnis' },
              { path: '/events', label: 'Agenda' },
              { path: '/opportunities', label: 'Peluang' }
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link font-label hover:text-white transition-colors py-1 ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
             <div className="hidden sm:flex gap-4 opacity-70">
                <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[24px]">notifications</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[24px]">account_circle</span>
             </div>
             <Link
              to="/join"
              className="bg-gradient-to-br from-primary-fixed-dim to-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-bold text-sm scale-95 active:scale-90 transition-transform"
            >
              Join Us
            </Link>
             <button
              onClick={toggleTheme}
              className="theme-toggle w-10 h-10 rounded-xl flex lg:hidden items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Overlay (Scrollable Bar) */}
        <div className="lg:hidden px-3 pb-3">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3 px-2 bg-white/5 rounded-2xl border border-white/5">
            {[
              { path: '/', label: 'Home' },
              { path: '/members', label: 'Anggota' },
              { path: '/business', label: 'Bisnis' },
              { path: '/events', label: 'Agenda' },
              { path: '/opportunities', label: 'Peluang' },
              { path: '/resources', label: 'Docs' },
              { path: '/about', label: 'Visi' }
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-mobile px-4 py-2.5 whitespace-nowrap ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 lg:pt-24 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={navigate} opportunities={appData.opportunities} />} />
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

      {/* FOOTER */}
      <footer className="w-full py-16 px-8 mt-24 border-t" style={{backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)'}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
          <div>
            <div className="font-headline font-bold text-3xl mb-4 tracking-tighter" style={{color:'var(--clr-primary-container)'}}>MedanPro</div>
            <p className="font-label text-sm max-w-xs leading-loose" style={{color: 'var(--clr-on-surface-variant)'}}>
              © 2025 MedanPro. All Rights Reserved. Private network eksklusif bagi pengusaha dan profesional terkemuka di Sumatera Utara.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-on-surface font-bold text-sm tracking-tight">Network</span>
              <Link to="/members" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Anggota</Link>
              <Link to="/business" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Bisnis</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-on-surface font-bold text-sm tracking-tight">Ecosystem</span>
              <Link to="/opportunities" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Peluang</Link>
              <Link to="/resources" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Resources</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-on-surface font-bold text-sm tracking-tight">Legal</span>
              <a href="#" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Privacy Policy</a>
              <a href="#" className="text-on-surface-variant text-xs hover:text-primary transition-colors hover:underline">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-on-surface font-bold text-sm tracking-tight">Connect</span>
              <button onClick={toggleTheme} className="text-left text-on-surface-variant text-xs hover:text-primary transition-colors uppercase tracking-widest font-bold">
                 {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <div className="flex gap-3 mt-1">
                 <a href="https://instagram.com/medanpro" target="_blank" rel="noreferrer" className="opacity-60 cursor-pointer hover:opacity-100 hover:text-primary transition-all">
                    <Instagram size={16} />
                 </a>
                 <a href="https://facebook.com/medanpro" target="_blank" rel="noreferrer" className="opacity-60 cursor-pointer hover:opacity-100 hover:text-primary transition-all">
                    <Facebook size={16} />
                 </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold" style={{color: 'var(--clr-on-surface-variant)', opacity:0.5}}>
          <span>Designed for North Sumatra Business Leaders</span>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-primary">Admin Access</Link>
          </div>
        </div>
      </footer>

      {/* Floating Action */}
      <a 
        href={buildWhatsAppLink('Halo MedanPro, saya ingin informasi lebih lanjut.')} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-primary-container rounded-3xl flex items-center justify-center text-on-primary-container shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={26} />
        <span className="absolute right-full mr-4 bg-white text-on-secondary-fixed px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Chat with Admin</span>
      </a>
    </div>
  );
}
