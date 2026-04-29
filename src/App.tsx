/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  ChevronRight, 
  Menu, 
  X, 
  Palette, 
  BookOpen, 
  BarChart3, 
  Truck, 
  ArrowUpRight,
  Globe,
  MapPin,
  FlaskConical,
  MessageCircle,
  Send,
  User,
  Shield,
  Zap,
  Settings,
  Cpu,
  Star
} from 'lucide-react';

// --- Types ---

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  creator: string;
  images: string[];
  icon: React.ReactNode;
  color: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  fullText: string;
  author: string;
  date: string;
}

interface Comment {
  id: string;
  articleId: string;
  user: string;
  text: string;
  timestamp: Date;
}

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`glass-bubble rounded-[2.5rem] p-6 transition-all duration-500 hover:scale-[1.02] ${className}`}>
    {children}
  </div>
);

const Navbar = ({ activeSection, onNavClick }: { activeSection: string, onNavClick: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'historias', label: 'Historias', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'arte', label: 'Arte', icon: <Palette className="w-4 h-4" /> },
    { id: 'science', label: 'Ciencia', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'gear', label: 'Equipamiento', icon: <Cpu className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'go', label: 'Go', icon: <Truck className="w-4 h-4" /> },
    { id: 'contacto', label: 'Contacto', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 glass-bubble rounded-full hover:scale-110 transition-transform active:scale-95"
          id="menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed top-24 right-6 z-50 flex flex-col gap-3"
            id="nav-menu"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: -10, scale: 1.05 }}
                onClick={() => {
                  onNavClick(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-6 py-4 rounded-3xl glass-bubble transition-all font-bubble ${
                  activeSection === item.id ? 'bg-white/60 border-white shadow-lg' : 'hover:bg-white/30'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ImageMosaic = ({ images }: { images: string[] }) => (
  <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full aspect-square md:aspect-[4/5]">
    {images.map((img, i) => (
      <motion.div 
        key={i}
        whileHover={{ scale: 0.98, rotate: i % 2 === 0 ? 1 : -1 }}
        className={`relative overflow-hidden rounded-[2rem] border-4 border-white/40 shadow-xl ${
          i === 0 ? 'row-span-2' : ''
        }`}
      >
        <img 
          src={img} 
          alt={`Gallery ${i}`} 
          className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>
    ))}
  </div>
);

const ScientificSection = ({ articles, comments, onAddComment }: { 
  articles: Article[], 
  comments: Comment[],
  onAddComment: (articleId: string, text: string) => void
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0]);
  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (selectedArticle && newComment.trim()) {
      onAddComment(selectedArticle.id, newComment);
      setNewComment("");
    }
  };

  return (
    <section id="science" className="min-h-screen py-24 px-6 flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Article Selector & Content */}
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-purple-500 font-bubble">
              <FlaskConical className="w-5 h-5" />
              <span>Exploración Científica</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bubble font-bold text-neutral-800 leading-tight">
              Kido Science: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 italic">Insights</span>
            </h2>
          </header>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {articles.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bubble text-sm transition-all ${
                  selectedArticle?.id === art.id 
                  ? 'bg-neutral-900 text-white shadow-xl shadow-purple-200' 
                  : 'bg-white/50 hover:bg-white text-neutral-500'
                }`}
              >
                {art.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedArticle && (
              <motion.div
                key={selectedArticle.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-bubble p-8 rounded-[3.5rem] space-y-6 border-purple-200"
              >
                <div className="flex justify-between items-center text-xs text-neutral-400 uppercase tracking-widest font-bubble font-bold">
                  <span className="flex items-center gap-2 text-purple-400"><Zap className="w-3 h-3" /> {selectedArticle.author}</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <h3 className="text-3xl font-bubble text-neutral-800 tracking-tight">{selectedArticle.title}</h3>
                <p className="text-neutral-600 leading-relaxed font-light text-lg">
                  {selectedArticle.fullText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Discussion / Comments */}
        <div className="space-y-6">
          <h4 className="font-bubble text-2xl text-neutral-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-red-400" /> Opiniones
          </h4>
          
          <div className="glass-neutral p-6 rounded-[2.5rem] h-[500px] flex flex-col border-white/40">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
              {comments
                .filter(c => c.articleId === selectedArticle?.id)
                .map((comment) => (
                  <div key={comment.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bubble text-neutral-400">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-red-400 p-[1px]">
                        <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      {comment.user}
                    </div>
                    <div className="p-4 bg-white/10 rounded-3xl rounded-tl-none text-sm text-neutral-200 font-light border border-white/5">
                      {comment.text}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Discutir hallazgo..."
                className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-bubble"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
                title="Enviar"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const PortfolioSection = ({ section, isReversed }: { section: Section, isReversed: boolean }) => {
  return (
    <section 
      id={section.id} 
      className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative"
    >
      <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`space-y-8 ${isReversed ? 'lg:order-2' : ''}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-500 font-bubble text-lg">
              {section.icon}
              <span className="italic">{section.subtitle}</span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-bubble font-bold tracking-tight leading-tight text-neutral-800">
              {section.title}
            </h2>
          </div>
          
          <p className="text-lg text-neutral-600 leading-relaxed max-w-lg font-light">
            {section.description}
          </p>

          <footer className="pt-8 border-t border-white/40">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bubble font-semibold">
              Creado por: <span className="text-neutral-700">{section.creator}</span>
            </p>
          </footer>

          <motion.button 
            whileHover={{ x: 10, scale: 1.05 }}
            style={{ backgroundColor: section.color }}
            className="flex items-center gap-3 text-sm font-bubble font-bold tracking-widest uppercase py-4 group px-6 rounded-full glass-bubble "
          >
            Ver Colección <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Mosaic Image Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`${isReversed ? 'lg:order-1' : ''}`}
        >
          <ImageMosaic images={section.images} />
        </motion.div>

      </div>
    </section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('historias');
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', articleId: 'art-1', user: 'LogiMaster', text: 'Impresionante análisis sobre la optimización en zonas cálidas.', timestamp: new Date() }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['historias', 'gear', 'arte', 'science', 'insights', 'go', 'contacto'];
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addComment = (articleId: string, text: string) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      articleId,
      user: 'Usuario Kido',
      text,
      timestamp: new Date()
    };
    setComments(prev => [...prev, newComment]);
  };

  const sections: Section[] = [
    {
      id: 'historias',
      title: 'Narrativa Visual',
      subtitle: 'Kido Historias',
      description: 'Mosaico de paneles de manga y bocetos de "C5". La esencia de la narrativa moderna concentrada en capturas rítmicas.',
      creator: 'División Narrativa',
      images: [
        'https://picsum.photos/seed/manga1/600/800',
        'https://picsum.photos/seed/manga2/600/800',
        'https://picsum.photos/seed/manga3/600/800'
      ],
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      color: 'rgba(200, 180, 150, 0.2)'
    },
    {
      id: 'gear',
      title: 'Kido Gear: Equipamiento',
      subtitle: 'División Técnica',
      description: 'Ingeniería de vanguardia y diseño de gadgets tácticos. Donde la utilidad se encuentra con la precisión estética en tonos de poder.',
      creator: 'Ingeniería Kido',
      images: [
        'https://picsum.photos/seed/tech1/600/800',
        'https://picsum.photos/seed/tech2/600/800',
        'https://picsum.photos/seed/tech3/600/800'
      ],
      icon: <Shield className="w-5 h-5 text-red-500" />,
      color: 'rgba(239, 68, 68, 0.1)'
    },
    {
      id: 'arte',
      title: 'Mosaico de Identidad',
      subtitle: 'Kido Arte',
      description: 'Detalles de branding y micro-texturas inspiradas en el Cacao Blanco. Un ensamble de pureza y herencia visual.',
      creator: 'División de Identidad',
      images: [
        'https://picsum.photos/seed/art1/600/800',
        'https://picsum.photos/seed/art2/600/800',
        'https://picsum.photos/seed/art3/600/800'
      ],
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      color: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'insights',
      title: 'Malla Operativa',
      subtitle: 'Kido Insights',
      description: 'Fragmentos de inteligencia de mercado. De la data cruda a la visualización artística de tendencias.',
      creator: 'Inteligencia de Negocios',
      images: [
        'https://picsum.photos/seed/data1/600/800',
        'https://picsum.photos/seed/data2/600/800',
        'https://picsum.photos/seed/data3/600/800'
      ],
      icon: <BarChart3 className="w-5 h-5 text-indigo-400" />,
      color: 'rgba(180, 200, 220, 0.2)'
    },
    {
      id: 'go',
      title: 'Kido Go: Dinámica',
      subtitle: 'Logística & Tech',
      description: 'Flujo constante y precisión de entrega. Una estética de movimiento neutral vestida de verde vibrante y naranja activo.',
      creator: 'División Logística',
      images: [
        'https://picsum.photos/seed/go1/600/800',
        'https://picsum.photos/seed/go2/600/800',
        'https://picsum.photos/seed/go3/600/800'
      ],
      icon: <Truck className="w-5 h-5 text-green-500" />,
      color: 'rgba(34, 197, 94, 0.1)'
    }
  ];

  const scientificArticles: Article[] = [
    {
      id: 'art-1',
      title: 'Logística Térmica: Cacao Blanco',
      excerpt: 'Un estudio sobre la preservación molecular del cacao en tránsito.',
      author: 'Dr. Kido Research',
      date: 'Mayo 2026',
      fullText: 'La logística del cacao blanco en zonas costeras requiere un control de humedad del 12.5%. Nuestro estudio demuestra que los contenedores "Liquid Glass" reducen la oxidación térmica en un 40%, manteniendo la pureza original del grano desde Guayaquil hasta el destino final.'
    },
    {
      id: 'art-2',
      title: 'Psicología del Color Rosa Soft',
      excerpt: 'Impacto visual de los tonos pastel en la retención del espectador.',
      author: 'Dra. Chroma Kido',
      date: 'Abril 2026',
      fullText: 'El uso de mallas de degradado en interfaces reduce la fatiga visual en un 22%. La estética "Bubble" fomenta una conexión emocional de seguridad y accesibilidad, ideal para plataformas de alto impacto colaborativo.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Dynamic Background Mesh elements - Subtle and Dark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 0], x: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full bg-purple-900/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1.4, 1, 1.4], rotate: [0, -180, 0], x: [0, -100, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-orange-900/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-100, 100, -100] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full bg-green-900/5 blur-[120px]" 
        />
      </div>

      <Navbar activeSection={activeSection} onNavClick={scrollTo} />

      {/* Hero / Intro */}
      <header className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bubble font-bold">Kido Universe</span>
          </div>
          <h1 className="font-bubble font-black tracking-tighter leading-[0.9] text-white relative text-center">
            <span className="text-6xl md:text-8xl block text-neutral-600 opacity-30 mb-2">Galería</span>
            <div className="relative inline-block mt-4">
              {/* Massive 3D Bubble Text - Solid and Clear */}
              <div className="relative z-10 text-[10rem] md:text-[16rem] font-black leading-none py-6 px-12 drop-shadow-[0_20px_50px_rgba(168,85,247,0.3)]">
                Kido
              </div>
              
              {/* 3 High-Visibility Glowing Stars - Final Placement */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 90, 0],
                  filter: ["drop-shadow(0 0 30px rgba(251,146,60,1))"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -right-20 md:-top-32 md:-right-48 z-20 pointer-events-none"
              >
                <Star className="w-20 h-20 md:w-56 md:h-56 text-orange-400 fill-orange-400" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [0.9, 1.25, 0.9],
                  rotate: [0, -45, 0],
                  filter: ["drop-shadow(0 0 30px rgba(168,85,247,1))"]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-24 -left-20 md:-bottom-48 md:-left-48 z-20 pointer-events-none"
              >
                <Star className="w-16 h-16 md:w-44 md:h-44 text-purple-500 fill-purple-500" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [0.8, 1.15, 0.8],
                  rotate: [0, 180, 0],
                  filter: ["drop-shadow(0 0 30px rgba(34,197,94,1))"]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute top-1/2 -left-28 md:top-1/2 md:-left-72 z-20 pointer-events-none -translate-y-1/2"
              >
                <Star className="w-12 h-12 md:w-36 md:h-36 text-green-500 fill-green-500" />
              </motion.div>
            </div>
          </h1>
          <p className="max-w-md mx-auto text-neutral-500 font-bubble text-xl leading-relaxed">
            Arte, ciencia y logística <br /> en un flujo <span className="text-purple-500 font-bold px-2 py-1 glass-bubble rounded-full">dinámico</span>.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-10 h-16 border-2 border-neutral-300 rounded-full flex justify-center p-2">
            <motion.div 
              animate={{ height: ["20%", "60%", "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 bg-indigo-300 rounded-full"
            />
          </div>
        </motion.div>
      </header>

      {/* Portfolio Sections (Mosaics) */}
      <main>
        {sections.map((section, index) => (
          <div key={section.id}>
            <PortfolioSection 
              section={section} 
              isReversed={index % 2 !== 0} 
            />
          </div>
        ))}

        {/* Scientific Section */}
        <ScientificSection 
          articles={scientificArticles} 
          comments={comments} 
          onAddComment={addComment} 
        />
      </main>

      {/* Contact Section */}
      <section id="contacto" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="max-w-4xl w-full text-center space-y-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-6xl md:text-8xl font-bubble font-bold tracking-tighter text-neutral-800">¿Hablamos?</h2>
            <p className="text-neutral-500 max-w-lg mx-auto font-bubble text-lg">
              Sin vueltas. Solo tu visión y la ejecución maestra de Kido Corp.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            <GlassCard className="flex flex-col items-center gap-4 group min-w-[240px]">
              <div className="p-4 bg-indigo-100 rounded-full">
                <Mail className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="text-center font-bubble">
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Email</div>
                <div className="text-sm font-semibold">albankevine845@gmail.com</div>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col items-center gap-4 group min-w-[240px]">
               <div className="p-4 bg-pink-100 rounded-full">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
              <div className="text-center font-bubble">
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Instagram</div>
                <div className="text-sm font-semibold">@kido_stories</div>
              </div>
            </GlassCard>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            className="px-14 py-6 bg-neutral-900 text-white rounded-full font-bubble text-xl flex items-center gap-4 mx-auto shadow-2xl hover:shadow-indigo-200/50 transition-all"
          >
            Pulsa para Empezar 
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/40 px-6 glass-bubble rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 glass-bubble rounded-full flex items-center justify-center font-bubble text-3xl font-bold text-indigo-500">K</div>
             <div className="font-bubble">
               <div className="text-xl font-bold tracking-tight">Kido Corp</div>
               <div className="text-xs text-neutral-400">Prisma Equinoccial © 2026</div>
             </div>
          </div>
          <div className="flex gap-12">
            <div className="space-y-3 font-bubble">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400">Origen</div>
              <div className="text-sm flex items-center gap-2 font-medium">
                <MapPin className="w-3 h-3 text-red-400" /> Guayaquil, EC
              </div>
            </div>
            <div className="space-y-3 font-bubble">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400">Status</div>
              <div className="text-sm font-bold text-green-500 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Operativo
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
