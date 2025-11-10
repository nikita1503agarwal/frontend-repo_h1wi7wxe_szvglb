import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Tabs } from '@radix-ui/themes'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
    </div>
  )
}

function AddForm({ fields, onSubmit, cta = 'Add' }) {
  const [form, setForm] = useState({})
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
        setForm({})
      }}
      className="grid md:grid-cols-4 gap-3"
    >
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col">
          <label className="text-xs text-slate-600 mb-1">{f.label}</label>
          <input
            value={form[f.name] ?? ''}
            onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
            type={f.type || 'text'}
            placeholder={f.placeholder}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button className="h-10 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mt-6">
        {cta}
      </button>
    </form>
  )
}

function Section({ title, description, columns = [], addConfig }) {
  const [items, setItems] = useState([])
  const total = useMemo(() => items.reduce((a, b) => a + (b.value || b.value_usd || 0), 0), [items])

  const load = async () => {
    const res = await fetch(`${API_BASE}${addConfig.list}`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleAdd = async (payload) => {
    await fetch(`${API_BASE}${addConfig.add}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <StatCard title="Total" value={`$${total.toLocaleString()}`} />
      </div>

      {addConfig?.fields && <AddForm fields={addConfig.fields} onSubmit={handleAdd} cta={addConfig.cta} />}

      <div className="grid md:grid-cols-3 gap-3">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-4">
            <div className="text-slate-900 font-medium">{columns.map((c) => c.key === 'value' && typeof it[c.key] === 'number' ? `${c.label}: $${it[c.key].toLocaleString()}` : null)}</div>
            <div className="text-slate-700">
              {columns.map((c) => (
                <div key={c.key} className="text-sm">
                  {c.key !== 'value' && (
                    <>
                      <span className="text-slate-500">{c.label}: </span>
                      <span>{String(it[c.key] ?? '')}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const tabs = [
    {
      value: 'assets',
      label: 'Assets',
      component: (
        <Section
          title="Assets"
          description="Track physical and digital assets."
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { key: 'value', label: 'Value' },
          ]}
          addConfig={{
            list: '/assets',
            add: '/assets',
            cta: 'Add Asset',
            fields: [
              { name: 'name', label: 'Name', placeholder: 'MacBook Pro' },
              { name: 'category', label: 'Category', placeholder: 'physical | digital' },
              { name: 'value', label: 'Value', type: 'number', placeholder: '1800' },
              { name: 'notes', label: 'Notes', placeholder: 'optional' },
            ],
          }}
        />
      ),
    },
    {
      value: 'investments',
      label: 'Investments',
      component: (
        <Section
          title="Investments"
          description="Stocks, bonds, funds and real estate."
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'kind', label: 'Type' },
            { key: 'institution', label: 'Institution' },
            { key: 'value', label: 'Value' },
          ]}
          addConfig={{
            list: '/investments',
            add: '/investments',
            cta: 'Add Investment',
            fields: [
              { name: 'name', label: 'Name/Ticker', placeholder: 'AAPL' },
              { name: 'kind', label: 'Type', placeholder: 'stock | bond | fund | real_estate | other' },
              { name: 'institution', label: 'Institution', placeholder: 'Broker' },
              { name: 'value', label: 'Value', type: 'number', placeholder: '5000' },
            ],
          }}
        />
      ),
    },
    {
      value: 'crypto',
      label: 'Crypto',
      component: (
        <Section
          title="Crypto"
          description="Manage your crypto holdings."
          columns={[
            { key: 'symbol', label: 'Symbol' },
            { key: 'amount', label: 'Amount' },
            { key: 'exchange', label: 'Exchange' },
            { key: 'value_usd', label: 'Value (USD)' },
          ]}
          addConfig={{
            list: '/crypto',
            add: '/crypto',
            cta: 'Add Crypto',
            fields: [
              { name: 'symbol', label: 'Symbol', placeholder: 'BTC' },
              { name: 'amount', label: 'Amount', type: 'number', placeholder: '0.5' },
              { name: 'exchange', label: 'Exchange/Wallet', placeholder: 'Coinbase' },
              { name: 'value_usd', label: 'Value (optional)', type: 'number', placeholder: '15000' },
            ],
          }}
        />
      ),
    },
    {
      value: 'wills',
      label: 'Wills',
      component: (
        <Section
          title="Wills & Estate"
          description="Store and track will documents and beneficiaries."
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'executor_name', label: 'Executor' },
            { key: 'beneficiaries', label: 'Beneficiaries' },
            { key: 'file_url', label: 'File URL' },
          ]}
          addConfig={{
            list: '/wills',
            add: '/wills',
            cta: 'Add Will',
            fields: [
              { name: 'title', label: 'Title', placeholder: 'Family Will' },
              { name: 'executor_name', label: 'Executor', placeholder: 'Full name' },
              { name: 'beneficiaries', label: 'Beneficiaries (comma separated)', placeholder: 'Alice, Bob' },
              { name: 'file_url', label: 'File URL', placeholder: 'https://...' },
            ],
          }}
        />
      ),
    },
    {
      value: 'tax',
      label: 'Income Tax',
      component: (
        <Section
          title="Income Tax"
          description="Plan and track annual tax filings."
          columns={[
            { key: 'year', label: 'Year' },
            { key: 'status', label: 'Status' },
            { key: 'filed_on', label: 'Filed On' },
            { key: 'file_url', label: 'File URL' },
          ]}
          addConfig={{
            list: '/tax',
            add: '/tax',
            cta: 'Add Filing',
            fields: [
              { name: 'year', label: 'Year', type: 'number', placeholder: '2024' },
              { name: 'status', label: 'Status', placeholder: 'planned | in_progress | filed | refunded | due' },
              { name: 'filed_on', label: 'Filed On (YYYY-MM-DD)', placeholder: '2025-04-15' },
              { name: 'file_url', label: 'File URL', placeholder: 'https://...' },
            ],
          }}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero with Spline */}
      <div className="relative h-[380px] md:h-[480px] rounded-b-[36px] overflow-hidden">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/30 px-3 py-1 rounded-full text-xs text-slate-700 mb-3">
              Smart finance, one dashboard
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900">Unified Finance Dashboard</h1>
            <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
              Track assets, investments, crypto, wills and income tax in one modern, glassmorphic workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        <div className="grid md:grid-cols-4 gap-3">
          <StatCard title="Net Worth" value="$—" subtitle="Sum of all categories" />
          <StatCard title="Investments" value="$—" />
          <StatCard title="Crypto" value="$—" />
          <StatCard title="Tax Status" value="On track" />
        </div>

        <Tabs.Root defaultValue="assets">
          <Tabs.List className="flex gap-2 border-b border-slate-200">
            {tabs.map((t) => (
              <Tabs.Trigger key={t.value} value={t.value} className="px-4 py-2 rounded-t-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200 text-slate-700">
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabs.map((t) => (
            <Tabs.Content key={t.value} value={t.value} className="pt-6">
              {t.component}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </div>
  )
}

export default App
