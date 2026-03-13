import React, { useState, useEffect } from 'react';
import { BookOpen, PenTool, Users, Layout, Sparkles, ArrowRight, CheckCircle2, ChevronUp, Target, Zap, Shield, FileText, Download, BookType, MessageCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
      <PenTool className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      <span>
        Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif">ESC</span>ritor
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/30 dark:selection:text-indigo-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#problema" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">O Problema</a>
            <a href="#recursos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Recursos</a>
            <a href="#planos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Assinar</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/" className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Acessar Sistema
            </a>
            <a href="#planos" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Garantir Vaga
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>O fim do bloqueio criativo e da desorganização</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Escreva seu best-seller <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
              sem perder o controle da história
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor é o ecossistema definitivo focado em transformar ideias soltas em manuscritos finalizados. Planeje, escreva e organize tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#planos" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
              Quero Assinar Agora <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Junte-se a centenas de autores que já transformaram sua rotina de escrita.</p>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="problema" className="py-20 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escrever um livro não deveria ser um caos</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Você já passou por alguma destas situações?</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Anotações Espalhadas</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Ideias no bloco de notas do celular, sinopses no Word e fichas de personagens em cadernos que você sempre perde.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Falta de Foco</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Você senta para escrever, mas acaba se distraindo com formatação de texto, abas do navegador e redes sociais.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Furos no Enredo</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Esquecer a cor dos olhos do protagonista no capítulo 12 ou perder o controle de quem estava em qual cena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-4 sm:px-6 -mt-12 relative z-10 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-950">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-900 relative flex items-center justify-center overflow-hidden p-4 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 dark:from-indigo-500/10 dark:to-violet-500/10"></div>
              {/* Abstract representation of the app */}
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex overflow-hidden relative z-10">
                <div className="hidden sm:block w-1/4 border-r border-slate-100 dark:border-slate-800 p-4 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
                  <div className="h-8 bg-indigo-50 dark:bg-indigo-900/20 rounded"></div>
                  <div className="h-8 bg-slate-50 dark:bg-slate-900 rounded"></div>
                  <div className="h-8 bg-slate-50 dark:bg-slate-900 rounded"></div>
                </div>
                <div className="flex-1 p-4 sm:p-8 flex flex-col">
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-8"></div>
                  <div className="space-y-4 flex-1">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que você precisa da Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Nós entendemos que a escrita exige organização e foco. Construímos as ferramentas exatas para você não travar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
              <div>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Organização de Projetos</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Mantenha todos os seus livros organizados. Crie capítulos, defina sinopses e acompanhe seu progresso diário de escrita com metas visuais.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bíblia de Personagens</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Crie fichas detalhadas para seus personagens com avatares, papéis na história e descrições profundas. Nunca mais esqueça um detalhe crucial.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modo Foco Imersivo</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Escreva sem distrações. Nosso editor limpo e minimalista esconde todos os menus e permite que você mergulhe na sua história sem interrupções.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <BookType className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diagramação Automática</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Organize e diagrame seu livro sozinho. Capítulos, sumário e formatação profissional gerados automaticamente, sem precisar contratar um designer.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exportação PDF e ePub</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Seu livro pronto para o mundo. Exporte seu manuscrito formatado em PDF para impressão ou em ePub para publicar direto na Amazon Kindle.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comunidade de Autores</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Não escreva sozinho. Conecte-se com outros escritores, troque feedbacks, participe de desafios e evolua junto com uma comunidade apaixonada.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acesso em Qualquer Lugar</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Comece a escrever no computador de casa, revise no notebook durante a viagem e anote ideias no celular. Tudo sincronizado em tempo real.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Segurança na Nuvem</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Seus textos são salvos automaticamente na nuvem. Nunca mais perca um capítulo inteiro porque o computador travou ou o arquivo corrompeu.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="md:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Notas Rápidas</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Teve uma ideia brilhante no meio da noite? Anote rapidamente no sistema de notas integrado antes que ela fuja da sua mente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A diferença entre tentar e conseguir</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Veja como a Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor transforma a sua rotina.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/30">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 font-bold">X</span>
                </div>
                Sem a Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">✗</span>
                  Arquivos espalhados pelo computador e celular
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">✗</span>
                  Distrações constantes com redes sociais e formatação
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">✗</span>
                  Esquecimento de detalhes cruciais de personagens
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">✗</span>
                  Falta de motivação por não ver o progresso diário
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">✗</span>
                  Risco de perder tudo se o computador quebrar
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                Com a Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  Tudo em um único lugar, organizado e acessível
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  Modo Foco que bloqueia distrações e imerge na história
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  Bíblia de personagens integrada ao seu alcance
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  Gamificação e metas diárias que mantêm você motivado
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  Backup automático e seguro na nuvem
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Export Section */}
      <section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1455390582262-044cdead2708?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Escritor focado" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <p className="font-medium text-lg">"A comunidade me ajudou a sair de um bloqueio criativo de meses."</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Muito mais que um editor de texto</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  A Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor foi pensada para acompanhar você desde a primeira ideia até a publicação.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comunidade Engajada</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Faça parte de um grupo exclusivo de autores. Troque experiências, receba feedback construtivo e participe de mentorias e workshops com profissionais do mercado.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Exportação Profissional</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Terminou seu livro? Exporte seu manuscrito com um clique nos formatos padrão da indústria: PDF para leitura e revisão, ou ePub e Mobi para publicação digital.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                    <Layout className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Diagramação Automática</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Não gaste com diagramadores antes da hora. Nosso sistema organiza e formata seu livro automaticamente, pronto para ser lido em qualquer dispositivo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing (Waitlist / Subscription Push) */}
      <section id="planos" className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Invista na sua carreira de autor</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Quanto vale terminar aquele livro que está na gaveta há anos? Escolha o plano ideal e comece a escrever de verdade.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full flex items-center relative">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10 ${!isAnnual ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10 flex items-center gap-2 ${isAnnual ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Anual
                <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  -16%
                </span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="shimmer-wrapper rounded-3xl h-full"
            >
              <div className="shimmer-content liquid-glass p-8 flex flex-col h-full rounded-3xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-2">Iniciante</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 min-h-[48px]">Para quem está dando os primeiros passos na escrita.</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">Grátis</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> 1 Projeto ativo
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Editor de texto básico
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Até 5 personagens
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">-</span> Sem Modo Foco
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">-</span> Sem Exportação
                  </li>
                </ul>
                <a href="/" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors text-center">
                  Começar Grátis
                </a>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shimmer-wrapper pro rounded-3xl h-[calc(100%+2rem)] transform lg:-translate-y-4"
            >
              <div className="shimmer-content liquid-glass p-8 relative overflow-hidden flex flex-col text-white rounded-3xl border border-indigo-500/50 h-full">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/50 text-indigo-100 font-semibold text-xs mb-4 tracking-wide uppercase w-max border border-indigo-400/30">
                    Mais Popular
                  </span>
                  <h3 className="text-2xl font-bold mb-2 text-indigo-900 dark:text-white">Autor Pro</h3>
                  <p className="text-indigo-700 dark:text-indigo-200 mb-6 min-h-[48px]">O ecossistema completo para escrever e organizar.</p>
                  <div className="mb-8 flex items-end gap-1">
                    <span className="text-4xl font-bold text-indigo-900 dark:text-white">R$ {isAnnual ? '24,90' : '29,90'}</span>
                    <span className="text-indigo-700 dark:text-indigo-200 mb-1">/mês</span>
                  </div>
                  {isAnnual && (
                    <p className="text-indigo-700 dark:text-indigo-200 text-sm -mt-6 mb-6">Cobrado R$ 298,80 anualmente</p>
                  )}
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center gap-3 text-indigo-900 dark:text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300 shrink-0" /> Projetos ilimitados
                    </li>
                    <li className="flex items-center gap-3 text-indigo-900 dark:text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300 shrink-0" /> Modo Foco Imersivo
                    </li>
                    <li className="flex items-center gap-3 text-indigo-900 dark:text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300 shrink-0" /> Personagens ilimitados
                    </li>
                    <li className="flex items-center gap-3 text-indigo-900 dark:text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300 shrink-0" /> Exportação básica (PDF)
                    </li>
                    <li className="flex items-center gap-3 text-indigo-900 dark:text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-300 shrink-0" /> Acesso à Comunidade
                    </li>
                  </ul>
                  <a href="/" className="w-full bg-indigo-600 dark:bg-white text-white dark:text-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors text-center shadow-lg">
                    Assinar o Pro
                  </a>
                  <p className="text-center text-indigo-700 dark:text-indigo-200 text-xs mt-4">Cancele quando quiser. 7 dias grátis.</p>
                </div>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="shimmer-wrapper premium rounded-3xl h-full"
            >
              <div className="shimmer-content liquid-glass p-8 flex flex-col text-slate-900 dark:text-white h-full relative overflow-hidden rounded-3xl border border-slate-300 dark:border-slate-700">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Mestre das Letras <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">Para autores que querem publicar com qualidade profissional.</p>
                <div className="mb-8 flex items-end gap-1">
                  <span className="text-4xl font-bold">R$ {isAnnual ? '39,90' : '49,90'}</span>
                  <span className="text-slate-600 dark:text-slate-400 mb-1">/mês</span>
                </div>
                {isAnnual && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm -mt-6 mb-6">Cobrado R$ 478,80 anualmente</p>
                )}
                <ul className="space-y-4 mb-8 flex-1 relative z-10">
                  <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" /> Tudo do plano Autor Pro
                  </li>
                  <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" /> Exportação avançada (ePub, Mobi)
                  </li>
                  <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" /> Diagramação Profissional Automática
                  </li>
                  <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" /> Múltiplos pseudônimos
                  </li>
                  <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" /> Acesso VIP na Comunidade (Mentorias e Workshops)
                  </li>
                </ul>
                <a href="/" className="w-full bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-colors text-center relative z-10">
                  Assinar Mestre das Letras
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif font-bold">ESC</span>ritor. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contato</a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
