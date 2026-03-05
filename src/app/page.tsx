"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SparklesCore } from "@/components/ui/sparkles";
import { Typewriter } from "@/components/ui/typewriter";
import { ShaderPlane } from "@/components/ui/background-paper-shaders";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { FeatureSteps } from "@/components/ui/feature-section";
import { FloatingPaths } from "@/components/ui/background-paths";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { 
  Github, Linkedin, Mail, Code2, Database, Layout, Server, Cpu, 
  Wrench, Send, Twitter, Trophy, Zap, Shield, Flame, Terminal, Star, 
  BrainCircuit, Award, Code, ExternalLink, Lightbulb, Box, FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------
// DATA SOURCES
// ---------------------------------------------------------
const skills = [
  { category: "Languages", items: "C, Java, Python, JavaScript", icon: <Code2 className="w-6 h-6 mb-4 text-emerald-400" /> },
  { category: "Backend", items: "Node.js, Express.js, FastAPI, REST APIs, JWT, Microservices", icon: <Server className="w-6 h-6 mb-4 text-blue-400" /> },
  { category: "Databases", items: "MongoDB, SQLite, Qdrant, ANN Indexing", icon: <Database className="w-6 h-6 mb-4 text-purple-400" /> },
  { category: "AI / Machine Learning", items: "CLIP (ViT-B-32), Multi-Modal Embeddings", icon: <BrainCircuit className="w-6 h-6 mb-4 text-rose-400" /> },
  { category: "Frontend", items: "React, HTML, CSS, Tailwind", icon: <Layout className="w-6 h-6 mb-4 text-pink-400" /> },
  { category: "DevOps & Tools", items: "Docker, Git, GitHub, Linux, Postman", icon: <Wrench className="w-6 h-6 mb-4 text-orange-400" /> },
  { category: "Core Concepts", items: "DSA, OOP, DBMS, OS, Distributed Systems", icon: <Cpu className="w-6 h-6 mb-4 text-yellow-400" /> },
];

const educationFeatures = [
  {
    step: "01",
    title: "B.Tech Electrical Engineering",
    content: "IIEST Shibpur (2023–2027) • Current CGPA: 8.00. Focus on core engineering, algorithms, and scalable full-stack system architecture.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
  }
];

const orbitalTimelineData = [
  { id: 1, title: "Ideation", date: "Jan 2024", content: "Conceptualizing resilient systems and multi-modal architectures.", category: "Planning", icon: Lightbulb, relatedIds: [2], status: "completed" as const, energy: 100 },
  { id: 2, title: "Architecture", date: "Feb 2024", content: "Designing offline-first databases and vector search indexes.", category: "Design", icon: Database, relatedIds: [1, 3], status: "completed" as const, energy: 90 },
  { id: 3, title: "Development", date: "Mar-Jul 2024", content: "Building REST APIs, ML pipelines, and client-side queues.", category: "Development", icon: Code, relatedIds: [2, 4], status: "completed" as const, energy: 85 },
  { id: 4, title: "Hackathon", date: "Aug 2025", content: "IIEST-UCO Bank Hackathon Finals. Stress testing the architecture.", category: "Testing", icon: Trophy, relatedIds: [3, 5], status: "completed" as const, energy: 100 },
  { id: 5, title: "Deployment", date: "Present", content: "Live systems deployed on Vercel and scalable infrastructure.", category: "Release", icon: Server, relatedIds: [4], status: "in-progress" as const, energy: 70 },
];

export default function PortfolioHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500 selection:text-white font-sans w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <DottedSurface className="w-full h-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_100%)] pointer-events-none z-10" />
        
        <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-8 mt-10">
          <div className="space-y-4">
            <h2 className="text-emerald-400 font-mono tracking-wider uppercase text-sm md:text-base font-semibold">
              Full Stack Developer & Competitive Programmer
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-[family-name:var(--font-orbitron)]">
              Srinadh <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Shaik</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Aspiring Backend Engineer. Passionate about building scalable web applications and optimizing ML solutions.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <LiquidButton onClick={() => window.open('https://github.com/srinadh-shaik', '_blank')}>
              <Github className="w-5 h-5 mr-2" /> GitHub
            </LiquidButton>
            <LiquidButton variant="secondary" onClick={() => window.open('mailto:srinadhshaik768@gmail.com', '_blank')}>
              <Mail className="w-5 h-5 mr-2" /> Email
            </LiquidButton>
            <LiquidButton variant="outline" onClick={() => window.open('https://www.linkedin.com/in/srinadh-shaik-742a81282/', '_blank')}>
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </LiquidButton>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="relative h-[30rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden border-t border-slate-900 cursor-crosshair">
        <div className="w-full absolute inset-0">
          <SparklesCore id="tsparticlescolorful" background="transparent" minSize={0.6} maxSize={1.5} particleDensity={100} className="w-full h-full" particleColor="#4ade80" speed={0.5} />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-300">
            As an engineer, I am driven to <br className="hidden md:block my-2" />
            <Typewriter text={["build offline-first ecosystems.", "solve complex algorithmic challenges.", "architect highly scalable backends."]} speed={60} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400" waitTime={2000} deleteSpeed={30} cursorChar="_" />
          </h2>
        </div>
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(600px_300px_at_center,transparent_20%,white)] pointer-events-none"></div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section className="py-24 bg-slate-950 relative z-30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white font-[family-name:var(--font-orbitron)] tracking-wide">
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 transition-colors duration-300 group">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-orbitron)]">{skill.category}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC JOURNEY (Scroll Reveal) */}
      <section className="py-24 relative overflow-hidden z-30 border-t border-slate-900 bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-40">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-10 backdrop-blur-sm"
        >
          <FeatureSteps 
            features={educationFeatures} 
            title="Academic Journey" 
            autoPlayInterval={5000} 
            imageHeight="h-[400px]" 
          />
        </motion.div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="py-32 relative overflow-hidden z-30 border-y border-slate-900 bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen">
          <Canvas camera={{ position: [0, 0, 1.5] }}>
            <ShaderPlane position={[0, 0, 0]} color1="#020617" color2="#1e1b4b" />
          </Canvas>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-sm font-bold tracking-[0.3em] uppercase mb-2 block">Architecture & Code</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-orbitron)] drop-shadow-2xl">
              Featured Work
            </h2>
          </div>

          {/* Project Timeline Tracker */}
          <div className="mb-20">
            <RadialOrbitalTimeline timelineData={orbitalTimelineData} />
          </div>
          
          {/* Custom Project Cards matching the Database API graphic */}
          <div className="grid grid-cols-1 gap-12">
            
            {/* Project 1: PayX */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl"
            >
              <div className="flex-1 space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-bold tracking-widest uppercase">Legendary Project</span>
                <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-orbitron)] text-white">PayX Offline-First</h3>
                <p className="text-slate-300 leading-relaxed text-lg">Architected a distributed offline-first transaction system resilient to server downtime. Built durable client-side queues with reconciliation microservices, successfully reducing offline transaction failures by 70%.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["React", "Node.js", "Express", "SQLite", "JWT"].map(t => <span key={t} className="text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1 rounded-md">{t}</span>)}
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://secure-bank-dun.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/30"><ExternalLink className="w-4 h-4" /> Live Demo</a>
                  <a href="https://github.com/srinadh-shaik/SecureBank" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600"><Github className="w-4 h-4" /> Source Code</a>
                </div>
              </div>
              <div className="flex-1 flex justify-center w-full">
                <DatabaseWithRestApi title="Offline Sync & Queue DB" circleText="SQL" buttonTexts={{first: "Client DB", second: "Server"}} badgeTexts={{first: "SYNC", second: "QUEUE", third: "RETRY", fourth: "FAIL"}} lightColor="#10b981" />
              </div>
            </motion.div>

            {/* Project 2: Semantic Video */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row-reverse items-center gap-12 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl"
            >
              <div className="flex-1 space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-purple-950 border border-purple-500/50 text-purple-400 text-xs font-bold tracking-widest uppercase">Epic Project</span>
                <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-orbitron)] text-white">Semantic Video Search</h3>
                <p className="text-slate-300 leading-relaxed text-lg">Built an end-to-end multi-modal retrieval system. Engineered a scalable vector embedding pipeline for automated 1080p frame indexing. Integrated Qdrant for high-dimensional similarity search optimizing retrieval to sub-second latency.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Python", "FastAPI", "Qdrant", "CLIP", "Docker"].map(t => <span key={t} className="text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1 rounded-md">{t}</span>)}
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/srinadh-shaik/videoSearchEngine" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600"><Github className="w-4 h-4" /> Source Code</a>
                </div>
              </div>
              <div className="flex-1 flex justify-center w-full">
                <DatabaseWithRestApi title="Vector Search API" circleText="VDB" buttonTexts={{first: "Qdrant", second: "Models"}} badgeTexts={{first: "EMBED", second: "SEARCH", third: "INDEX", fourth: "FETCH"}} lightColor="#a855f7" />
              </div>
            </motion.div>

            {/* Project 3: Hackathon Blogging */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl"
            >
              <div className="flex-1 space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 text-xs font-bold tracking-widest uppercase">Rare Project</span>
                <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-orbitron)] text-white">Hackathon Blogging Hub</h3>
                <p className="text-slate-300 leading-relaxed text-lg">A full-stack, highly optimized MDX-based blogging platform built to document hackathon experiences, system design choices, and deep-dive algorithmic approaches.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Next.js", "MDX", "Tailwind", "Vercel"].map(t => <span key={t} className="text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1 rounded-md">{t}</span>)}
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/srinadh-shaik/hackathon_blogging" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600"><Github className="w-4 h-4" /> Source Code</a>
                  <a href="https://hackathon-blogging.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/30"><ExternalLink className="w-4 h-4" /> Live Demo</a>
                </div>
              </div>
              <div className="flex-1 flex justify-center w-full">
                <DatabaseWithRestApi title="Content Delivery Network" circleText="MDX" buttonTexts={{first: "Next.js", second: "Vercel"}} badgeTexts={{first: "GET", second: "POST", third: "PUT", fourth: "DEL"}} lightColor="#3b82f6" />
              </div>
              
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. ACHIEVEMENTS SECTION (Glowing Effect Grid) */}
      <section className="py-32 bg-black relative z-30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm font-bold tracking-[0.3em] uppercase mb-2 block">Competitive & Global</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-orbitron)]">
              Milestones Unlocked
            </h2>
          </div>
          
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[44rem] xl:grid-rows-3">
            {/* Item 1: Rank 68 */}
            <li className="min-h-[14rem] list-none md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="white" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-orange-950/30 p-3 text-orange-500">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Global Rank 68</h3>
                    <p className="text-sm text-slate-400">Top global rank in rated round. Secured Rank 68 in Codeforces Round 1077 (Div 2).</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Item 2: 1764 Rating */}
            <li className="min-h-[14rem] list-none md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="default" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-purple-950/30 p-3 text-purple-400">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-purple-400">1764 Rating</h3>
                    <p className="text-sm text-slate-400">Consistent LeetCode Contest Rating depicts high-speed algorithmic problem-solving, I do deep dry run of logics.</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Item 3: Hackathon Finalist */}
            <li className="min-h-[14rem] list-none md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="white" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-yellow-950/30 p-3 text-yellow-400">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-yellow-400">Hackathon Finalist</h3>
                    <p className="text-sm text-slate-400">Emerged as a Finalist at the prestigious IIEST-UCO Bank Hackathon 2025.</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Item 4: 200+ Solved */}
            <li className="min-h-[14rem] list-none md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/7]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="default" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="flex justify-between items-start">
                    <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-emerald-950/30 p-3 text-emerald-400">
                      <Zap className="h-6 w-6" />
                    </div>
                    <a href="https://leetcode.com/srinadh-shaik" target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-slate-300 hover:text-white"><ExternalLink size={12}/> View Profile</a>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-white">200+ DSA Solved</h3>
                    <p className="text-sm text-slate-400">Successfully solved and heavily optimized over 200 complex Data Structures and Algorithms problems across various judges.</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Item 5: Gaabesu Scholar */}
            <li className="min-h-[14rem] list-none md:[grid-area:3/1/4/7] xl:[grid-area:2/7/3/13]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="white" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-blue-950/30 p-3 text-blue-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-white">Gaabesu Scholar</h3>
                    <p className="text-sm text-slate-400">Recipient of the prestigious Gaabesu Scholar Merit scholarship (2025) for academic and technical excellence.</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Item 6: HackerRank Certified */}
            <li className="min-h-[14rem] list-none md:[grid-area:3/7/4/13] xl:[grid-area:3/1/4/13]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="default" />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-950/80 p-6 shadow-sm md:p-6">
                  <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-800 p-3 text-slate-200">
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-white">HackerRank Certified</h3>
                    <p className="text-sm text-slate-400">Earned the HackerRank Intermediate Certification for Problem Solving and Data Structures, validating core CS fundamentals.</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 z-0">
          <WebGLShader /> 
        </div>
        <div className="relative z-10 border border-[#27272a] bg-black/60 backdrop-blur-md p-2 w-[90%] md:w-full mx-auto max-w-4xl mt-24 mb-24 rounded-2xl shadow-2xl">
          <div className="relative border border-[#27272a] py-16 px-6 overflow-hidden flex flex-col items-center rounded-xl">
            <h1 className="mb-4 text-white text-center text-4xl font-extrabold tracking-tighter md:text-6xl font-[family-name:var(--font-orbitron)]">
              Let's Build Something
            </h1>
            <p className="text-white/70 max-w-xl text-center text-sm md:text-lg">
              Whether you have an opportunity, an idea, or just want to talk about algorithms and system design—my inbox is always open.
            </p>
            
            <div className="my-10 flex items-center justify-center gap-3 bg-emerald-950/30 px-5 py-2.5 rounded-full border border-emerald-500/30">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-sm text-emerald-400 font-semibold tracking-wide uppercase">Available for full-time roles & projects</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full"> 
              <LiquidButton onClick={() => window.location.href = 'mailto:srinadhshaik768@gmail.com'} className="text-white border-slate-700 rounded-full w-full sm:w-auto" size="xl">
                <Send className="w-5 h-5 mr-2" />
                Write a Message
              </LiquidButton>
              
              <div className="flex items-center gap-4">
                <a href="https://github.com/srinadh-shaik" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 text-white shadow-lg">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/srinadh-shaik-742a81282/" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 text-white shadow-lg">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-all duration-300 text-white shadow-lg">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div> 
          </div>
        </div>
      </section>

    </main>
  );
}
