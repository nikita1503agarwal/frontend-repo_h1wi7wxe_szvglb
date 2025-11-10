import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ShieldCheck, ChartLine, Wallet, FileText, Sparkles, ArrowRight } from 'lucide-react'

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/30 px-3 py-1 rounded-full text-xs text-slate-700">
      {children}
    </span>
  )
}

function Feature({ icon: Icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-11 w-11 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-3">
        <Icon size={22} />
      </div>
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{description}</div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <div className="sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600" />
              <span className="font-semibold">Finexus</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              <a href="#features" className="hover:text-slate-900">Features</a>
              <a href="#how" className="hover:text-slate-900">How it works</a>
              <a href="#faq" className="hover:text-slate-900">FAQ</a>
            </div>
            <div className="flex items-center gap-2">
              <a href="/test" className="hidden md:inline-flex h-9 items-center rounded-xl border border-slate-200 px-3 text-sm hover:bg-white">Check API</a>
              <a href="/app" className="inline-flex h-9 items-center rounded-xl bg-blue-600 px-4 text-white text-sm font-medium hover:bg-blue-700">Open App</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <Pill>
              <Sparkles size={14} /> Smart finance, one dashboard
            </Pill>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight"
            >
              See your entire financial life at a glance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-slate-700"
            >
              Track assets, traditional investments, crypto, wills, and income tax in a beautiful, glassmorphic workspace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <a href="/app" className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-white font-medium hover:bg-blue-700">
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#features" className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white/70 backdrop-blur px-4 text-slate-800 hover:bg-white">
                Learn more
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['Accounts unified', '5+'],
            ['Data points tracked', '1k+'],
            ['Avg. setup time', '~2 min'],
            ['Satisfaction', '98%'],
          ].map(([label, value]) => (
            <div key={label} className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30">
              <div className="text-sm text-slate-600">{label}</div>
              <div className="text-2xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        <div className="max-w-2xl">
          <div className="text-sm font-medium text-blue-700">Features</div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-1">Everything you need to manage wealth</h2>
          <p className="text-slate-600 mt-2">A single command center for assets, investments, crypto, estate planning, and taxes—all privacy-first.</p>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Feature icon={Wallet} title="Unified assets" description="Track physical and digital assets with values, notes, and categories." />
          <Feature icon={ChartLine} title="Investments & crypto" description="Monitor traditional portfolios and coins side-by-side, with instant totals." />
          <Feature icon={FileText} title="Wills & taxes" description="Keep estate documents and tax filings organized and accessible." />
          <Feature icon={ShieldCheck} title="Secure by design" description="Data persists in your database; designed with privacy in mind." />
          <Feature icon={Sparkles} title="Modern UI" description="Glassmorphism, subtle motion, and an immersive 3D hero experience." />
          <Feature icon={ArrowRight} title="Fast start" description="Be up and running in minutes—no spreadsheets required." />
        </div>
      </div>

      {/* How it works */}
      <div id="how" className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-white/80 text-sm">How it works</div>
              <h3 className="text-2xl md:text-3xl font-semibold mt-1">Connect, add, and see your net worth</h3>
              <ul className="mt-4 space-y-2 text-white/90 text-sm">
                <li>• Add assets, investments, and crypto balances</li>
                <li>• Attach will and tax documents for quick reference</li>
                <li>• Totals and insights update instantly</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a href="/app" className="inline-flex h-10 items-center rounded-xl bg-white text-blue-700 px-4 font-medium">Open the dashboard</a>
                <a href="/test" className="inline-flex h-10 items-center rounded-xl border border-white/40 px-4">Check connectivity</a>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/20 p-4">
                  <div className="text-white/80">Assets</div>
                  <div className="text-2xl font-semibold">+$18,000</div>
                </div>
                <div className="rounded-xl bg-white/20 p-4">
                  <div className="text-white/80">Investments</div>
                  <div className="text-2xl font-semibold">+$62,450</div>
                </div>
                <div className="rounded-xl bg-white/20 p-4">
                  <div className="text-white/80">Crypto</div>
                  <div className="text-2xl font-semibold">+$15,220</div>
                </div>
                <div className="rounded-xl bg-white/20 p-4">
                  <div className="text-white/80">Tax Status</div>
                  <div className="text-2xl font-semibold">On track</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="mx-auto max-w-4xl px-4 md:px-8 py-10">
        <h3 className="text-2xl font-semibold">FAQs</h3>
        <div className="mt-4 divide-y divide-slate-200/70">
          {[
            ['Is my data persistent?', 'Yes. Entries are stored in the connected database so they stick around.'],
            ['Can I bring my own backend?', 'Absolutely. Set a custom API base URL via an environment variable.'],
            ['Can I export my data?', 'We can add CSV export/import on request.'],
          ].map(([q, a]) => (
            <div key={q} className="py-4">
              <div className="font-medium">{q}</div>
              <div className="text-sm text-slate-600 mt-1">{a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex items-center justify-between text-sm text-slate-600">
          <div>© {new Date().getFullYear()} Finexus</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </div>
        </div>
      </div>
    </div>
  )
}
