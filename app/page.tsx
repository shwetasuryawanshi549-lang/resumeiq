'use client'

import { useRef, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  FileText,
  MessageCircle,
  Send,
  UserRound,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from 'lucide-react'

const skills = ['Python', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow', 'Pandas', 'Data Visualization']
const roles = [
  { name: 'Data Scientist', score: 87, color: 'bg-primary' },
  { name: 'Machine Learning Engineer', score: 74, color: 'bg-accent' },
  { name: 'Data Analyst', score: 68, color: 'bg-muted-foreground' },
]
const companies = [
  { name: 'Spotify', initials: 'S', tone: 'bg-[#d8f5e5] text-[#16734a]', score: 94, skills: ['Python', 'SQL', 'Machine Learning'], missing: 'Spark' },
  { name: 'Notion', initials: 'N', tone: 'bg-[#e8e5ff] text-[#5146b7]', score: 89, skills: ['Python', 'Statistics', 'Pandas'], missing: 'A/B Testing' },
  { name: 'Airbnb', initials: 'A', tone: 'bg-[#ffe1e8] text-[#bd3151]', score: 82, skills: ['SQL', 'TensorFlow', 'Visualization'], missing: 'Spark' },
]

export default function Page() {
  const [stage, setStage] = useState<'idle' | 'analyzing' | 'results'>('idle')
  const [fileName, setFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function analyze(name = 'demo-resume.txt') {
    setFileName(name)
    setStage('analyzing')
    window.setTimeout(() => setStage('results'), 1700)
  }

  function handleFile(file?: File) {
    if (!file) return
    analyze(file.name)
  }

  if (stage === 'results') {
    return <Results fileName={fileName} onReset={() => { setStage('idle'); setFileName('') }} />
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <button className="flex items-center gap-2" onClick={() => setStage('idle')} aria-label="ResumeIQ home">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Sparkles size={18} /></span>
          <span className="text-lg font-semibold tracking-tight">Resume<span className="text-primary">IQ</span></span>
        </button>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="hidden rounded-full border border-border bg-card px-3 py-1.5 sm:inline-flex">100% local & private</span>
          <button className="rounded-lg p-2 transition hover:bg-muted" aria-label="Help"><CircleHelp size={19} /></button>
        </div>
      </header>

      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-14 text-center lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute -top-16 left-1/2 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary"><WandSparkles size={14} /> Your career, decoded locally</div>
        <h1 className="relative z-10 mt-7 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">Your next role is already<br /><span className="text-primary">in your resume.</span></h1>
        <p className="relative z-10 mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Upload your resume and discover the roles, companies, and skills that match your experience. No accounts. No data leaves your device.</p>

        <div className="relative z-10 mt-11 w-full max-w-2xl">
          {stage === 'analyzing' ? <Analyzing fileName={fileName} /> : <div
            className="group cursor-pointer rounded-3xl border border-dashed border-primary/35 bg-card/80 p-2 shadow-[0_20px_70px_-35px_hsl(var(--primary)/0.35)] transition hover:border-primary/70 hover:shadow-[0_24px_80px_-35px_hsl(var(--primary)/0.5)]"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
          >
            <div className="flex min-h-64 flex-col items-center justify-center rounded-[1.25rem] bg-muted/45 px-6 py-12">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition group-hover:-translate-y-1"><Upload size={23} /></span>
              <h2 className="mt-5 text-lg font-semibold">Drop your resume here</h2>
              <p className="mt-2 text-sm text-muted-foreground">or click to browse · PDF, DOCX, TXT</p>
              <input ref={inputRef} className="sr-only" type="file" accept=".pdf,.docx,.txt" onChange={(e) => handleFile(e.target.files?.[0])} />
            </div>
          </div>}
          <div className="mt-5 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
            <span className="text-muted-foreground">Just exploring?</span>
            <button onClick={() => analyze()} className="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3">Try with a demo resume <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <ResumeAssistant />

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-7 text-xs text-muted-foreground sm:flex-row lg:px-8">
        <div className="flex items-center gap-2"><LockKeyhole size={14} /> Your resume stays on your device</div>
        <div className="flex items-center gap-5"><span>Demo Mode · Local analysis</span><span className="hidden sm:inline">Built for curious careers</span></div>
      </footer>
    </main>
  )
}

function ResumeAssistant() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi, I’m Querry. Ask me anything about your resume, role matches, or next career move.' },
  ])

  const suggestions = ['Why am I a strong Data Scientist match?', 'What skill should I learn next?', 'Which companies fit me best?']

  function ask(text = message) {
    const trimmed = text.trim()
    if (!trimmed) return
    const answer = trimmed.toLowerCase().includes('skill')
      ? 'Your highest-leverage next skill is Spark. It appears across your strongest company matches and complements your Python and SQL foundation.'
      : trimmed.toLowerCase().includes('company')
        ? 'Spotify is your strongest demo match at 94%, followed by Notion at 89% and Airbnb at 82%.'
        : 'Your profile maps most strongly to Data Scientist, with an 87% match. Your Python, SQL, and machine learning experience are doing the heavy lifting.'
    setMessages((current) => [...current, { role: 'user', text: trimmed }, { role: 'assistant', text: answer }])
    setMessage('')
  }

  return <>
    {open && <section className="fixed bottom-24 right-5 z-30 flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/15" aria-label="Querry ResumeIQ assistant">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-primary-foreground/15"><Sparkles size={15} /></span><div><p className="text-sm font-semibold">Querry</p><p className="text-[11px] text-primary-foreground/70">ResumeIQ assistant · Demo Mode</p></div></div><button onClick={() => setOpen(false)} className="rounded-md p-1.5 transition hover:bg-primary-foreground/10" aria-label="Close Querry"><X size={16} /></button></div>
      <div className="max-h-80 space-y-3 overflow-y-auto p-4">{messages.map((item, index) => <div key={`${item.role}-${index}`} className={`flex gap-2 ${item.role === 'user' ? 'justify-end' : ''}`}><span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${item.role === 'user' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>{item.role === 'user' ? <UserRound size={13} /> : <Sparkles size={13} />}</span><p className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-5 ${item.role === 'user' ? 'bg-muted text-foreground' : 'bg-primary/8 text-foreground'}`}>{item.text}</p></div>)}</div>
      <div className="border-t border-border p-3"><div className="mb-2 flex flex-wrap gap-1.5">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-primary">{suggestion}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); ask() }} className="flex items-center gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Querry anything…" aria-label="Ask Querry" className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /><button type="submit" className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90" aria-label="Send message"><Send size={15} /></button></form></div>
    </section>}
    <button onClick={() => setOpen((current) => !current)} className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5" aria-label="Open Querry assistant"><MessageCircle size={17} /> Querry</button>
  </>
}

function Analyzing({ fileName }: { fileName: string }) {
  return <div className="rounded-3xl border border-border bg-card p-8 text-left shadow-sm sm:p-10"><div className="flex items-center gap-4"><div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary"><FileText size={22} /></div><div><p className="font-medium">{fileName}</p><p className="text-sm text-muted-foreground">Reading locally in your browser</p></div></div><div className="mt-10 space-y-5"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/3 animate-progress rounded-full bg-primary" /></div><div className="flex justify-between text-xs text-muted-foreground"><span className="animate-pulse">Extracting skills and experience…</span><span>Demo Mode</span></div></div></div>
}

function Results({ fileName, onReset }: { fileName: string; onReset: () => void }) {
  return <main className="min-h-screen bg-background text-foreground"><header className="border-b border-border bg-card/70"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles size={18} /></span><span className="text-lg font-semibold tracking-tight">Resume<span className="text-primary">IQ</span></span></div><div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary sm:inline-flex"><LockKeyhole size={13} /> Demo Mode · local data</span><button onClick={onReset} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"><RotateCcw size={15} /> Analyze again</button></div></div></header><div className="mx-auto max-w-6xl px-6 py-10 lg:px-8"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-primary">Analysis complete</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Here&apos;s your career signal.</h1><p className="mt-3 text-sm text-muted-foreground">Based on <span className="font-medium text-foreground">{fileName}</span> · processed locally</p></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><Check size={16} className="text-primary" /> No data uploaded</div></div><div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><section className="rounded-3xl bg-primary p-7 text-primary-foreground shadow-xl shadow-primary/15 sm:p-9"><div className="flex items-start justify-between"><div><p className="text-sm text-primary-foreground/70">Top predicted role</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Data Scientist</h2><p className="mt-2 max-w-sm text-sm leading-6 text-primary-foreground/75">Your resume shows a strong foundation in turning complex data into useful decisions.</p></div><div className="grid size-20 place-items-center rounded-full border-4 border-primary-foreground/20 text-center"><span className="text-2xl font-semibold">87</span></div></div><div className="mt-9 flex items-center justify-between border-t border-primary-foreground/15 pt-5 text-sm"><span className="text-primary-foreground/70">Confidence score</span><span className="font-medium">Very strong match</span></div></section><section className="rounded-3xl border border-border bg-card p-7 sm:p-9"><div className="flex items-center justify-between"><h2 className="font-semibold">Role alternatives</h2><BriefcaseBusiness size={18} className="text-muted-foreground" /></div><div className="mt-6 space-y-5">{roles.slice(1).map((role) => <div key={role.name}><div className="mb-2 flex justify-between text-sm"><span>{role.name}</span><span className="font-medium">{role.score}%</span></div><div className="h-2 rounded-full bg-muted"><div className={`h-full rounded-full ${role.color}`} style={{ width: `${role.score}%` }} /></div></div>)}</div></section></div><div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><section className="rounded-3xl border border-border bg-card p-7 sm:p-9"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Detected skills</p><h2 className="mt-2 text-2xl font-semibold">Your toolkit</h2></div><span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">7 signals</span></div><div className="mt-7 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-sm text-primary">{skill}</span>)}</div><div className="mt-8 rounded-2xl bg-muted/60 p-5"><div className="flex items-center gap-3"><Sparkles size={17} className="text-primary" /><p className="text-sm font-medium">A pattern worth noticing</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">You combine technical depth with analytical thinking — a profile that travels well across data teams.</p></div></section><section className="rounded-3xl border border-border bg-card p-7 sm:p-9"><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Profile score</p><div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-tight">82</span><span className="pb-2 text-sm text-muted-foreground">/ 100</span></div><div className="mt-5 h-2 rounded-full bg-muted"><div className="h-full w-[82%] rounded-full bg-primary" /></div><div className="mt-6 space-y-3 text-sm">{[['Technical skills', 'Strong'], ['Experience clarity', 'Good'], ['Impact language', 'Room to grow']].map(([a,b]) => <div key={a} className="flex justify-between"><span className="text-muted-foreground">{a}</span><span className={b === 'Room to grow' ? 'text-accent' : 'font-medium'}>{b}</span></div>)}</div></section></div><section className="mt-5 rounded-3xl border border-border bg-card p-7 sm:p-9"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Where you could thrive</p><h2 className="mt-2 text-2xl font-semibold">Company matches</h2></div><p className="text-sm text-muted-foreground">Based on role fit and skill overlap</p></div><div className="mt-7 grid gap-4 md:grid-cols-3">{companies.map((company) => <div key={company.name} className="rounded-2xl border border-border p-5 transition hover:border-primary/40 hover:shadow-sm"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-xl text-sm font-semibold ${company.tone}`}>{company.initials}</span><span className="font-semibold">{company.name}</span></div><span className="text-lg font-semibold text-primary">{company.score}%</span></div><div className="mt-5 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${company.score}%` }} /></div><p className="mt-5 text-xs text-muted-foreground">Matched skills</p><div className="mt-2 flex flex-wrap gap-1.5">{company.skills.map(s => <span key={s} className="rounded-md bg-muted px-2 py-1 text-xs">{s}</span>)}</div><p className="mt-4 text-xs text-muted-foreground">Next skill: <span className="text-foreground">{company.missing}</span></p></div>)}</div></section></div></main>
}
