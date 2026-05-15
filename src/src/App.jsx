import { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Fraunces:ital,wght@0,300;0,600;0,900;1,300;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F5F0E8;
    --bark: #2C1F0E;
    --moss: #3D5A3E;
    --moss-light: #5A7D5B;
    --amber: #C4862A;
    --amber-light: #E8A84A;
    --rust: #A63D2F;
    --mist: #E8EDE8;
    --ink: #1A1A1A;
    --zen: #4A7C7E;
    --momentum: #7E4A6A;
    --elixir: #7E6A2A;
  }

  body { background: var(--cream); color: var(--bark); font-family: 'DM Mono', monospace; min-height: 100vh; }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  .header {
    background: var(--bark); padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
  }
  .header-brand { display: flex; align-items: baseline; gap: 12px; }
  .header-logo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; color: var(--amber-light); letter-spacing: -0.5px; }
  .header-sub { font-size: 10px; color: #8a7a6a; letter-spacing: 2px; text-transform: uppercase; }
  .header-week { font-size: 11px; color: #8a7a6a; letter-spacing: 1px; }

  .nav {
    background: var(--bark); border-top: 1px solid #3d2e1a;
    display: flex; overflow-x: auto; gap: 0; scrollbar-width: none;
  }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn {
    flex: 0 0 auto; padding: 10px 16px;
    font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    color: #8a7a6a; background: none; border: none; cursor: pointer;
    border-bottom: 2px solid transparent; transition: all 0.15s; white-space: nowrap;
  }
  .nav-btn.active { color: var(--amber-light); border-bottom-color: var(--amber-light); }
  .nav-btn:hover:not(.active) { color: var(--cream); }

  .main { flex: 1; padding: 20px 16px; max-width: 680px; margin: 0 auto; width: 100%; }

  .section-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: var(--bark); margin-bottom: 4px; line-height: 1.1; }
  .section-sub { font-size: 11px; color: #7a6a5a; letter-spacing: 1px; margin-bottom: 24px; }

  .card { background: white; border-radius: 12px; padding: 18px; margin-bottom: 14px; border: 1px solid #e8e0d0; box-shadow: 0 1px 4px rgba(44,31,14,0.06); }
  .card-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7a6a5a; margin-bottom: 14px; }

  .tank-row { margin-bottom: 14px; }
  .tank-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .tank-name { font-size: 13px; font-weight: 500; }
  .tank-liters { font-size: 12px; color: #7a6a5a; }
  .tank-bar-bg { height: 10px; background: var(--mist); border-radius: 6px; overflow: hidden; }
  .tank-bar-fill { height: 100%; border-radius: 6px; transition: width 0.4s ease; }
  .tank-bar-fill.zen { background: var(--zen); }
  .tank-bar-fill.momentum { background: var(--momentum); }
  .tank-bar-fill.elixir { background: var(--elixir); }
  .tank-alert { font-size: 10px; color: var(--rust); margin-top: 3px; letter-spacing: 0.5px; }

  .stock-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .stock-pill { background: var(--mist); border-radius: 10px; padding: 12px 10px; text-align: center; border: 2px solid transparent; transition: border-color 0.2s; }
  .stock-pill.zen { border-color: var(--zen); }
  .stock-pill.momentum { border-color: var(--momentum); }
  .stock-pill.elixir { border-color: var(--elixir); }
  .stock-pill-num { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; line-height: 1; }
  .stock-pill-num.zen { color: var(--zen); }
  .stock-pill-num.momentum { color: var(--momentum); }
  .stock-pill-num.elixir { color: var(--elixir); }
  .stock-pill-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a6a5a; margin-top: 4px; }

  .input-group { margin-bottom: 12px; }
  .input-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a6a5a; margin-bottom: 5px; display: block; }
  .input-field {
    width: 100%; padding: 10px 12px; font-family: 'DM Mono', monospace; font-size: 13px;
    background: var(--mist); border: 1px solid #d8d0c0; border-radius: 8px;
    color: var(--bark); outline: none; transition: border-color 0.15s;
  }
  .input-field:focus { border-color: var(--amber); }
  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  select.input-field { appearance: none; cursor: pointer; }

  .btn {
    padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
    transition: all 0.15s; font-weight: 500;
  }
  .btn-primary { background: var(--moss); color: white; }
  .btn-primary:hover { background: var(--moss-light); }
  .btn-secondary { background: var(--mist); color: var(--bark); border: 1px solid #d8d0c0; }
  .btn-secondary:hover { background: #ddd8c8; }
  .btn-amber { background: var(--amber); color: white; }
  .btn-amber:hover { background: var(--amber-light); color: var(--bark); }
  .btn-full { width: 100%; margin-top: 4px; padding: 12px; }
  .btn-sm { padding: 6px 12px; font-size: 10px; }

  .inner-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .inner-tab {
    padding: 6px 14px; border-radius: 20px; border: 1px solid #d8d0c0;
    font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer; background: white; color: #7a6a5a; transition: all 0.15s;
  }
  .inner-tab.active { background: var(--bark); color: var(--amber-light); border-color: var(--bark); }

  .list-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f0e8d8; }
  .list-item:last-child { border-bottom: none; }
  .list-item-main { font-size: 12px; color: var(--bark); flex: 1; }
  .list-item-meta { font-size: 10px; color: #9a8a7a; margin-top: 2px; }
  .list-item-right { text-align: right; flex-shrink: 0; margin-left: 12px; }
  .list-item-value { font-size: 13px; font-weight: 500; color: var(--moss); }
  .list-item-date { font-size: 10px; color: #9a8a7a; }

  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
  .badge-zen { background: #e0eeef; color: var(--zen); }
  .badge-momentum { background: #ede0ea; color: var(--momentum); }
  .badge-elixir { background: #edeae0; color: #6a5420; }
  .badge-general { background: var(--mist); color: #5a5a4a; }
  .badge-insumo { background: #e8f0e8; color: var(--moss); }
  .badge-equipo { background: #f0e8e8; color: var(--rust); }
  .badge-mantención { background: #f0ece0; color: var(--amber); }
  .badge-limpieza { background: #e8eef0; color: var(--zen); }
  .badge-otro { background: var(--mist); color: #5a5a4a; }

  .report-block { background: var(--bark); border-radius: 12px; padding: 20px; margin-bottom: 14px; color: var(--cream); }
  .report-block-title { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--amber-light); margin-bottom: 12px; }
  .report-stat { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #3d2e1a; }
  .report-stat:last-child { border-bottom: none; }
  .report-stat-label { font-size: 11px; color: #b0a090; }
  .report-stat-value { font-size: 12px; font-weight: 500; color: var(--cream); }
  .report-highlight { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 600; color: var(--amber-light); line-height: 1; }
  .report-highlight-label { font-size: 10px; color: #8a7a6a; letter-spacing: 1px; margin-top: 4px; }

  .empty-state { text-align: center; padding: 32px 16px; color: #9a8a7a; font-size: 12px; }
  .empty-icon { font-size: 32px; margin-bottom: 8px; }

  .success-toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--moss); color: white; padding: 10px 20px; border-radius: 8px;
    font-size: 11px; letter-spacing: 1px; z-index: 999; animation: fadeInUp 0.2s ease;
  }
  @keyframes fadeInUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  .insumo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .insumo-card { background: var(--mist); border-radius: 10px; padding: 14px; border-left: 3px solid var(--moss); }
  .insumo-card.low { border-left-color: var(--rust); }
  .insumo-name { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #7a6a5a; margin-bottom: 4px; }
  .insumo-qty { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: var(--bark); line-height: 1; }
  .insumo-unit { font-size: 10px; color: #9a8a7a; }

  textarea.input-field { resize: vertical; min-height: 72px; }
`;

const KEY = { tanks: "biloba_tanks", bodega: "biloba_bodega", bodegaLog: "biloba_bodega_log", insumos: "biloba_insumos", compras: "biloba_compras", actividades: "biloba_actividades" };
const SABORES = ["Zen", "Momentum", "Elixir"];
const TANK_MAX = { Zen: 2000, Momentum: 2000, Elixir: 2000 };
const INSUMO_LIST = [
  { id: "te", name: "Té", unit: "kg" }, { id: "azucar", name: "Azúcar", unit: "kg" },
  { id: "botellas", name: "Botellas", unit: "un" }, { id: "tapas", name: "Tapas", unit: "un" },
  { id: "etiquetas", name: "Etiquetas", unit: "un" }, { id: "cajas", name: "Cajas", unit: "un" },
];
const COMPRA_CATS = ["Insumo", "Equipo", "Mantención", "Limpieza", "Otro"];
const AREAS = ["Fermentación", "Saborización", "Embotellado", "Mantención", "Limpieza", "Despacho", "Compras", "Otro"];
const USUARIOS = ["Fuyen", "Crecho", "Abner"];

function getWeekLabel() {
  const now = new Date();
  const day = now.getDay();
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const mon = new Date(now); mon.setDate(now.getDate() + diffToMon);
  const fri = new Date(mon); fri.setDate(mon.getDate() + 4);
  const fmt = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
  return `Semana ${fmt(mon)} – ${fmt(fri)}`;
}

function getWeekDates() {
  const now = new Date();
  const day = now.getDay();
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const mon = new Date(now); mon.setDate(now.getDate() + diffToMon);
  const fri = new Date(mon); fri.setDate(mon.getDate() + 4);
  const fmt = (d) => d.toISOString().split("T")[0];
  return { start: fmt(mon), end: fmt(fri) };
}

function today() { return new Date().toISOString().split("T")[0]; }
function fmtDate(iso) { if (!iso) return ""; const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; }
function fmtPesos(n) { return "$" + Number(n).toLocaleString("es-CL"); }

function lsGet(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } }
function lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error(e); } }

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [tanks, setTanks] = useState(() => lsGet(KEY.tanks, { Zen: 0, Momentum: 0, Elixir: 0 }));
  const [bodega, setBodega] = useState(() => lsGet(KEY.bodega, { Zen: 0, Momentum: 0, Elixir: 0 }));
  const [bodegaLog, setBodegaLog] = useState(() => lsGet(KEY.bodegaLog, []));
  const [insumos, setInsumos] = useState(() => lsGet(KEY.insumos, { te: 0, azucar: 0, botellas: 0, tapas: 0, etiquetas: 0, cajas: 0 }));
  const [compras, setCompras] = useState(() => lsGet(KEY.compras, []));
  const [actividades, setActividades] = useState(() => lsGet(KEY.actividades, []));
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const saveTanks = (v) => { setTanks(v); lsSet(KEY.tanks, v); };
  const saveBodega = (b, log) => { setBodega(b); setBodegaLog(log); lsSet(KEY.bodega, b); lsSet(KEY.bodegaLog, log); };
  const saveInsumos = (v) => { setInsumos(v); lsSet(KEY.insumos, v); };
  const saveCompras = (v) => { setCompras(v); lsSet(KEY.compras, v); };
  const saveActividades = (v) => { setActividades(v); lsSet(KEY.actividades, v); };

  const TABS = [
    { id: "dashboard", label: "Dashboard" }, { id: "bodega", label: "Bodega Fría" },
    { id: "tanques", label: "Tanques" }, { id: "insumos", label: "Insumos" },
    { id: "compras", label: "Compras" }, { id: "actividades", label: "Actividades" },
    { id: "reporte", label: "Reporte" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <header className="header">
          <div className="header-brand">
            <span className="header-logo">Biloba</span>
            <span className="header-sub">Planta</span>
          </div>
          <span className="header-week">{getWeekLabel()}</span>
        </header>
        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </nav>
        <main className="main">
          {tab === "dashboard" && <Dashboard tanks={tanks} bodega={bodega} insumos={insumos} compras={compras} actividades={actividades} />}
          {tab === "bodega" && <BodegaFria bodega={bodega} bodegaLog={bodegaLog} onSave={saveBodega} toast={showToast} />}
          {tab === "tanques" && <Tanques tanks={tanks} onSave={saveTanks} toast={showToast} />}
          {tab === "insumos" && <Insumos insumos={insumos} onSave={saveInsumos} toast={showToast} />}
          {tab === "compras" && <Compras compras={compras} onSave={saveCompras} insumos={insumos} onSaveInsumos={saveInsumos} toast={showToast} />}
          {tab === "actividades" && <Actividades actividades={actividades} onSave={saveActividades} toast={showToast} />}
          {tab === "reporte" && <Reporte tanks={tanks} bodega={bodega} bodegaLog={bodegaLog} insumos={insumos} compras={compras} actividades={actividades} />}
        </main>
        {toast && <div className="success-toast">{toast}</div>}
      </div>
    </>
  );
}

function Dashboard({ tanks, bodega, insumos, compras, actividades }) {
  const thisWeek = getWeekDates();
  const weekCompras = compras.filter(c => c.fecha >= thisWeek.start && c.fecha <= thisWeek.end);
  const weekActs = actividades.filter(a => a.fecha >= thisWeek.start && a.fecha <= thisWeek.end);
  const totalGasto = weekCompras.reduce((s, c) => s + Number(c.monto || 0), 0);
  const totalBotellas = SABORES.reduce((s, f) => s + (bodega?.[f] || 0), 0);

  return (
    <div>
      <div className="section-title">Dashboard</div>
      <div className="section-sub">{getWeekLabel()}</div>
      <div className="card">
        <div className="card-title">Bodega Fría — Stock actual</div>
        <div className="stock-grid">
          {SABORES.map(s => (
            <div key={s} className={`stock-pill ${s.toLowerCase()}`}>
              <div className={`stock-pill-num ${s.toLowerCase()}`}>{bodega?.[s] || 0}</div>
              <div className="stock-pill-label">{s}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#7a6a5a", marginTop: 4 }}>Total: <strong>{totalBotellas}</strong> botellas</div>
      </div>
      <div className="card">
        <div className="card-title">Tanques de Saborización</div>
        {SABORES.map(s => {
          const litros = tanks?.[s] || 0;
          const pct = Math.min((litros / TANK_MAX[s]) * 100, 100);
          return (
            <div key={s} className="tank-row">
              <div className="tank-header"><span className="tank-name">{s}</span><span className="tank-liters">{litros} L</span></div>
              <div className="tank-bar-bg"><div className={`tank-bar-fill ${s.toLowerCase()}`} style={{ width: `${pct}%` }} /></div>
              {pct < 25 && <div className="tank-alert">⚠ Nivel bajo — considerar rellenar</div>}
            </div>
          );
        })}
      </div>
      <div className="card">
        <div className="card-title">Esta semana</div>
        <div className="report-stat"><span className="list-item-meta">Actividades registradas</span><span style={{ fontSize: 13, fontWeight: 500 }}>{weekActs.length}</span></div>
        <div className="report-stat"><span className="list-item-meta">Compras realizadas</span><span style={{ fontSize: 13, fontWeight: 500 }}>{weekCompras.length}</span></div>
        <div className="report-stat"><span className="list-item-meta">Gasto total</span><span style={{ fontSize: 13, fontWeight: 500, color: "var(--rust)" }}>{fmtPesos(totalGasto)}</span></div>
      </div>
      <div className="card">
        <div className="card-title">Insumos críticos</div>
        {INSUMO_LIST.filter(i => (insumos?.[i.id] || 0) === 0).length === 0
          ? <div style={{ fontSize: 11, color: "var(--moss)" }}>✓ Sin alertas críticas</div>
          : INSUMO_LIST.filter(i => (insumos?.[i.id] || 0) === 0).map(i => (
              <div key={i.id} style={{ fontSize: 12, color: "var(--rust)", padding: "3px 0" }}>⚠ {i.name}: sin stock</div>
            ))
        }
      </div>
    </div>
  );
}

function BodegaFria({ bodega, bodegaLog, onSave, toast }) {
  const [innerTab, setInnerTab] = useState("entrada");
  const [form, setForm] = useState({ sabor: "Zen", cantidad: "", usuario: "Abner", nota: "" });
  const [salForm, setSalForm] = useState({ zen12: 0, zen24: 0, mom12: 0, mom24: 0, eli12: 0, eli24: 0, mix12: 0, mix24: 0 });

  const handleEntrada = () => {
    if (!form.cantidad || isNaN(form.cantidad) || Number(form.cantidad) <= 0) return;
    const newBodega = { ...bodega, [form.sabor]: (bodega[form.sabor] || 0) + Number(form.cantidad) };
    const entry = { id: Date.now(), tipo: "entrada", sabor: form.sabor, cantidad: Number(form.cantidad), usuario: form.usuario, nota: form.nota, fecha: today() };
    onSave(newBodega, [entry, ...bodegaLog]);
    setForm({ sabor: "Zen", cantidad: "", usuario: "Abner", nota: "" });
    toast("Entrada registrada ✓");
  };

  const handleSalida = () => {
    const botSalida = {
      Zen: Number(salForm.zen12)*12 + Number(salForm.zen24)*24 + Number(salForm.mix12)*4 + Number(salForm.mix24)*8,
      Momentum: Number(salForm.mom12)*12 + Number(salForm.mom24)*24 + Number(salForm.mix12)*4 + Number(salForm.mix24)*8,
      Elixir: Number(salForm.eli12)*12 + Number(salForm.eli24)*24 + Number(salForm.mix12)*4 + Number(salForm.mix24)*8,
    };
    for (const s of SABORES) { if (botSalida[s] > (bodega[s] || 0)) { toast(`Sin stock suficiente de ${s}`); return; } }
    const newBodega = { Zen: (bodega.Zen||0) - botSalida.Zen, Momentum: (bodega.Momentum||0) - botSalida.Momentum, Elixir: (bodega.Elixir||0) - botSalida.Elixir };
    const entry = { id: Date.now(), tipo: "salida", detalle: { ...salForm }, botSalida, fecha: today(), usuario: "Fuyen" };
    onSave(newBodega, [entry, ...bodegaLog]);
    setSalForm({ zen12: 0, zen24: 0, mom12: 0, mom24: 0, eli12: 0, eli24: 0, mix12: 0, mix24: 0 });
    toast("Despacho registrado ✓");
  };

  return (
    <div>
      <div className="section-title">Bodega Fría</div>
      <div className="section-sub">Inventario de botellas terminadas</div>
      <div className="card">
        <div className="card-title">Stock actual</div>
        <div className="stock-grid">
          {SABORES.map(s => (
            <div key={s} className={`stock-pill ${s.toLowerCase()}`}>
              <div className={`stock-pill-num ${s.toLowerCase()}`}>{bodega?.[s] || 0}</div>
              <div className="stock-pill-label">{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="inner-tabs">
        {["entrada", "salida", "historial"].map(t => (
          <button key={t} className={`inner-tab ${innerTab === t ? "active" : ""}`} onClick={() => setInnerTab(t)}>
            {t === "entrada" ? "Entrada botellas" : t === "salida" ? "Armar despacho" : "Historial"}
          </button>
        ))}
      </div>
      {innerTab === "entrada" && (
        <div className="card">
          <div className="card-title">Registrar botellas embotelladas</div>
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Sabor</label>
              <select className="input-field" value={form.sabor} onChange={e => setForm({ ...form, sabor: e.target.value })}>
                {SABORES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Cantidad</label>
              <input className="input-field" type="number" min="1" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} placeholder="0" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Registra</label>
              <select className="input-field" value={form.usuario} onChange={e => setForm({ ...form, usuario: e.target.value })}>
                {USUARIOS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Nota (opcional)</label>
              <input className="input-field" type="text" value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} placeholder="..." />
            </div>
          </div>
          <button className="btn btn-primary btn-full" onClick={handleEntrada}>Registrar entrada</button>
        </div>
      )}
      {innerTab === "salida" && (
        <div className="card">
          <div className="card-title">Armar despacho — cajas por SKU</div>
          <div style={{ fontSize: 10, color: "#7a6a5a", marginBottom: 12 }}>Mix 12 = 4 de cada sabor · Mix 24 = 8 de cada sabor</div>
          {[
            { label: "Zen 12", key: "zen12" }, { label: "Zen 24", key: "zen24" },
            { label: "Momentum 12", key: "mom12" }, { label: "Momentum 24", key: "mom24" },
            { label: "Elixir 12", key: "eli12" }, { label: "Elixir 24", key: "eli24" },
            { label: "Mix 12", key: "mix12" }, { label: "Mix 24", key: "mix24" },
          ].map(({ label, key }) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0e8d8" }}>
              <span style={{ fontSize: 12 }}>{label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSalForm(f => ({ ...f, [key]: Math.max(0, Number(f[key]) - 1) }))}>−</button>
                <span style={{ fontSize: 14, fontWeight: 500, minWidth: 24, textAlign: "center" }}>{salForm[key]}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => setSalForm(f => ({ ...f, [key]: Number(f[key]) + 1 }))}>+</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: 10, background: "var(--mist)", borderRadius: 8, fontSize: 11 }}>
            {SABORES.map(s => {
              const n = s === "Zen" ? Number(salForm.zen12)*12+Number(salForm.zen24)*24+Number(salForm.mix12)*4+Number(salForm.mix24)*8
                : s === "Momentum" ? Number(salForm.mom12)*12+Number(salForm.mom24)*24+Number(salForm.mix12)*4+Number(salForm.mix24)*8
                : Number(salForm.eli12)*12+Number(salForm.eli24)*24+Number(salForm.mix12)*4+Number(salForm.mix24)*8;
              return <div key={s} style={{ marginBottom: 2 }}>{s}: <strong>{n}</strong> botellas (stock: {bodega?.[s]||0})</div>;
            })}
          </div>
          <button className="btn btn-amber btn-full" onClick={handleSalida}>Confirmar despacho</button>
        </div>
      )}
      {innerTab === "historial" && (
        <div className="card">
          <div className="card-title">Historial</div>
          {bodegaLog.length === 0 ? <div className="empty-state"><div className="empty-icon">📦</div>Sin movimientos aún</div>
            : bodegaLog.slice(0, 40).map(e => (
              <div key={e.id} className="list-item">
                <div className="list-item-main">
                  {e.tipo === "entrada"
                    ? <><span className={`badge badge-${e.sabor?.toLowerCase()}`}>{e.sabor}</span> <strong>+{e.cantidad}</strong> botellas</>
                    : <><span className="badge badge-general">Despacho</span> {SABORES.map(s => `${s}: ${e.botSalida?.[s]||0}`).join(" · ")}</>
                  }
                  <div className="list-item-meta">{e.usuario}{e.nota ? ` · ${e.nota}` : ""}</div>
                </div>
                <div className="list-item-right"><div className="list-item-date">{fmtDate(e.fecha)}</div></div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

function Tanques({ tanks, onSave, toast }) {
  const [form, setForm] = useState({ sabor: "Zen", accion: "actualizar", litros: "" });
  const handleSave = () => {
    const n = Number(form.litros);
    if (isNaN(n) || n < 0) return;
    let newVal = form.accion === "actualizar" ? n : form.accion === "agregar" ? (tanks[form.sabor]||0)+n : Math.max(0,(tanks[form.sabor]||0)-n);
    onSave({ ...tanks, [form.sabor]: newVal });
    setForm({ sabor: "Zen", accion: "actualizar", litros: "" });
    toast("Tanque actualizado ✓");
  };
  return (
    <div>
      <div className="section-title">Tanques</div>
      <div className="section-sub">Litros en tanques de saborización</div>
      <div className="card">
        {SABORES.map(s => {
          const litros = tanks?.[s] || 0;
          const pct = Math.min((litros / TANK_MAX[s]) * 100, 100);
          return (
            <div key={s} className="tank-row">
              <div className="tank-header"><span className="tank-name">{s}</span><span className="tank-liters">{litros} L / {TANK_MAX[s]} L</span></div>
              <div className="tank-bar-bg"><div className={`tank-bar-fill ${s.toLowerCase()}`} style={{ width: `${pct}%` }} /></div>
              {pct < 25 && <div className="tank-alert">⚠ Nivel bajo</div>}
            </div>
          );
        })}
      </div>
      <div className="card">
        <div className="card-title">Actualizar tanque</div>
        <div className="input-group">
          <label className="input-label">Sabor</label>
          <select className="input-field" value={form.sabor} onChange={e => setForm({ ...form, sabor: e.target.value })}>
            {SABORES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Acción</label>
            <select className="input-field" value={form.accion} onChange={e => setForm({ ...form, accion: e.target.value })}>
              <option value="actualizar">Fijar a</option>
              <option value="agregar">Agregar litros</option>
              <option value="restar">Restar litros</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Litros</label>
            <input className="input-field" type="number" min="0" value={form.litros} onChange={e => setForm({ ...form, litros: e.target.value })} placeholder="0" />
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={handleSave}>Actualizar</button>
      </div>
    </div>
  );
}

function Insumos({ insumos, onSave, toast }) {
  const [form, setForm] = useState({ id: "te", accion: "fijar", cantidad: "" });
  const handleSave = () => {
    const n = Number(form.cantidad);
    if (isNaN(n) || n < 0) return;
    let newVal = form.accion === "fijar" ? n : form.accion === "agregar" ? (insumos[form.id]||0)+n : Math.max(0,(insumos[form.id]||0)-n);
    onSave({ ...insumos, [form.id]: newVal });
    setForm({ id: "te", accion: "fijar", cantidad: "" });
    toast("Insumo actualizado ✓");
  };
  return (
    <div>
      <div className="section-title">Insumos</div>
      <div className="section-sub">Stock de materias primas y materiales</div>
      <div className="card">
        <div className="card-title">Stock actual</div>
        <div className="insumo-grid">
          {INSUMO_LIST.map(i => {
            const qty = insumos?.[i.id] || 0;
            return (
              <div key={i.id} className={`insumo-card ${qty === 0 ? "low" : ""}`}>
                <div className="insumo-name">{i.name}</div>
                <div className="insumo-qty">{qty}</div>
                <div className="insumo-unit">{i.unit}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <div className="card-title">Actualizar insumo</div>
        <div className="input-group">
          <label className="input-label">Insumo</label>
          <select className="input-field" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })}>
            {INSUMO_LIST.map(i => <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>)}
          </select>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Acción</label>
            <select className="input-field" value={form.accion} onChange={e => setForm({ ...form, accion: e.target.value })}>
              <option value="fijar">Fijar a</option>
              <option value="agregar">Agregar</option>
              <option value="restar">Restar (uso)</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Cantidad</label>
            <input className="input-field" type="number" min="0" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} placeholder="0" />
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={handleSave}>Actualizar</button>
      </div>
    </div>
  );
}

function Compras({ compras, onSave, insumos, onSaveInsumos, toast }) {
  const [form, setForm] = useState({ fecha: today(), categoria: "Insumo", descripcion: "", monto: "", usuario: "Fuyen", insumoId: "", insumoCant: "" });
  const handleSave = () => {
    if (!form.descripcion || !form.monto) return;
    const entry = { id: Date.now(), ...form, monto: Number(form.monto) };
    const newCompras = [entry, ...compras];
    onSave(newCompras);
    if (form.categoria === "Insumo" && form.insumoId && form.insumoCant) {
      onSaveInsumos({ ...insumos, [form.insumoId]: (insumos[form.insumoId]||0) + Number(form.insumoCant) });
    }
    setForm({ fecha: today(), categoria: "Insumo", descripcion: "", monto: "", usuario: "Fuyen", insumoId: "", insumoCant: "" });
    toast("Compra registrada ✓");
  };
  const thisWeek = getWeekDates();
  const weekCompras = compras.filter(c => c.fecha >= thisWeek.start && c.fecha <= thisWeek.end);
  const weekTotal = weekCompras.reduce((s, c) => s + c.monto, 0);
  return (
    <div>
      <div className="section-title">Compras</div>
      <div className="section-sub">Registro de gastos y adquisiciones</div>
      <div className="card">
        <div className="card-title">Esta semana</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><div className="report-highlight">{fmtPesos(weekTotal)}</div><div className="report-highlight-label">Gasto acumulado</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 22, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{weekCompras.length}</div><div className="report-highlight-label">Compras</div></div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Registrar compra</div>
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Fecha</label>
            <input className="input-field" type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Registra</label>
            <select className="input-field" value={form.usuario} onChange={e => setForm({ ...form, usuario: e.target.value })}>
              {USUARIOS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Categoría</label>
            <select className="input-field" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
              {COMPRA_CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Monto ($)</label>
            <input className="input-field" type="number" min="0" value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} placeholder="0" />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Descripción</label>
          <input className="input-field" type="text" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Qué se compró..." />
        </div>
        {form.categoria === "Insumo" && (
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Actualizar insumo</label>
              <select className="input-field" value={form.insumoId} onChange={e => setForm({ ...form, insumoId: e.target.value })}>
                <option value="">No actualizar</option>
                {INSUMO_LIST.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
            {form.insumoId && (
              <div className="input-group">
                <label className="input-label">Cantidad recibida</label>
                <input className="input-field" type="number" min="0" value={form.insumoCant} onChange={e => setForm({ ...form, insumoCant: e.target.value })} placeholder="0" />
              </div>
            )}
          </div>
        )}
        <button className="btn btn-primary btn-full" onClick={handleSave}>Registrar compra</button>
      </div>
      <div className="card">
        <div className="card-title">Historial</div>
        {compras.length === 0 ? <div className="empty-state"><div className="empty-icon">🧾</div>Sin compras registradas</div>
          : compras.slice(0, 40).map(c => (
            <div key={c.id} className="list-item">
              <div className="list-item-main">
                <span className={`badge badge-${c.categoria?.toLowerCase()}`}>{c.categoria}</span>
                <span style={{ marginLeft: 6 }}>{c.descripcion}</span>
                <div className="list-item-meta">{c.usuario}</div>
              </div>
              <div className="list-item-right">
                <div className="list-item-value">{fmtPesos(c.monto)}</div>
                <div className="list-item-date">{fmtDate(c.fecha)}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function Actividades({ actividades, onSave, toast }) {
  const [form, setForm] = useState({ fecha: today(), area: "Fermentación", descripcion: "", usuario: "Fuyen" });
  const handleSave = () => {
    if (!form.descripcion) return;
    onSave([{ id: Date.now(), ...form }, ...actividades]);
    setForm({ fecha: today(), area: "Fermentación", descripcion: "", usuario: "Fuyen" });
    toast("Actividad registrada ✓");
  };
  const thisWeek = getWeekDates();
  const weekActs = actividades.filter(a => a.fecha >= thisWeek.start && a.fecha <= thisWeek.end);
  const byArea = AREAS.reduce((acc, a) => { acc[a] = weekActs.filter(x => x.area === a); return acc; }, {});
  return (
    <div>
      <div className="section-title">Actividades</div>
      <div className="section-sub">Avances por área — {getWeekLabel()}</div>
      <div className="card">
        <div className="card-title">Registrar actividad</div>
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Fecha</label>
            <input className="input-field" type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Registra</label>
            <select className="input-field" value={form.usuario} onChange={e => setForm({ ...form, usuario: e.target.value })}>
              {USUARIOS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Área</label>
          <select className="input-field" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}>
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Descripción</label>
          <textarea className="input-field" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Qué se hizo..." />
        </div>
        <button className="btn btn-primary btn-full" onClick={handleSave}>Registrar</button>
      </div>
      {AREAS.map(a => byArea[a].length > 0 && (
        <div key={a} className="card">
          <div className="card-title">{a}</div>
          {byArea[a].map(act => (
            <div key={act.id} className="list-item">
              <div className="list-item-main">{act.descripcion}<div className="list-item-meta">{act.usuario}</div></div>
              <div className="list-item-right"><div className="list-item-date">{fmtDate(act.fecha)}</div></div>
            </div>
          ))}
        </div>
      ))}
      {weekActs.length === 0 && <div className="empty-state"><div className="empty-icon">📝</div>Sin actividades esta semana</div>}
    </div>
  );
}

function Reporte({ tanks, bodega, bodegaLog, insumos, compras, actividades }) {
  const [mode, setMode] = useState("semanal");
  const thisWeek = getWeekDates();
  const weekCompras = compras.filter(c => c.fecha >= thisWeek.start && c.fecha <= thisWeek.end);
  const weekActs = actividades.filter(a => a.fecha >= thisWeek.start && a.fecha <= thisWeek.end);
  const weekEntradas = bodegaLog.filter(e => e.tipo === "entrada" && e.fecha >= thisWeek.start && e.fecha <= thisWeek.end);
  const weekDespachos = bodegaLog.filter(e => e.tipo === "salida" && e.fecha >= thisWeek.start && e.fecha <= thisWeek.end);
  const totalGasto = weekCompras.reduce((s, c) => s + c.monto, 0);
  const botEmb = SABORES.reduce((acc, s) => { acc[s] = weekEntradas.filter(e => e.sabor === s).reduce((sum, e) => sum + e.cantidad, 0); return acc; }, {});
  const totalEmb = Object.values(botEmb).reduce((a, b) => a + b, 0);
  const comprasByCat = COMPRA_CATS.reduce((acc, c) => { const sum = weekCompras.filter(x => x.categoria === c).reduce((s,x)=>s+x.monto,0); if(sum>0) acc[c]=sum; return acc; }, {});
  const byArea = AREAS.reduce((acc, a) => { const items = weekActs.filter(x => x.area === a); if(items.length>0) acc[a]=items; return acc; }, {});

  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-01`;
  const monthCompras = compras.filter(c => c.fecha >= monthStart);
  const monthEntradas = bodegaLog.filter(e => e.tipo === "entrada" && e.fecha >= monthStart);
  const monthDespachos = bodegaLog.filter(e => e.tipo === "salida" && e.fecha >= monthStart);
  const monthGasto = monthCompras.reduce((s,c)=>s+c.monto,0);
  const monthEmb = SABORES.reduce((acc,s)=>{ acc[s]=monthEntradas.filter(e=>e.sabor===s).reduce((sum,e)=>sum+e.cantidad,0); return acc; },{});

  return (
    <div>
      <div className="section-title">Reporte</div>
      <div className="section-sub">Resumen ejecutivo para directorio</div>
      <div className="inner-tabs">
        <button className={`inner-tab ${mode==="semanal"?"active":""}`} onClick={()=>setMode("semanal")}>Semanal</button>
        <button className={`inner-tab ${mode==="mensual"?"active":""}`} onClick={()=>setMode("mensual")}>Mensual</button>
      </div>
      {mode === "semanal" && <>
        <div className="report-block">
          <div className="report-block-title">Producción — {getWeekLabel()}</div>
          <div className="report-stat"><span className="report-stat-label">Botellas embotelladas</span><span className="report-stat-value">{totalEmb}</span></div>
          {SABORES.map(s => <div key={s} className="report-stat"><span className="report-stat-label">&nbsp;&nbsp;↳ {s}</span><span className="report-stat-value">{botEmb[s]}</span></div>)}
          <div className="report-stat"><span className="report-stat-label">Despachos realizados</span><span className="report-stat-value">{weekDespachos.length}</span></div>
        </div>
        <div className="report-block">
          <div className="report-block-title">Estado Bodega Fría</div>
          {SABORES.map(s => <div key={s} className="report-stat"><span className="report-stat-label">{s}</span><span className="report-stat-value">{bodega?.[s]||0} botellas</span></div>)}
        </div>
        <div className="report-block">
          <div className="report-block-title">Gastos — {getWeekLabel()}</div>
          <div className="report-stat"><span className="report-stat-label">Total semana</span><span className="report-stat-value">{fmtPesos(totalGasto)}</span></div>
          {Object.entries(comprasByCat).map(([cat,val]) => <div key={cat} className="report-stat"><span className="report-stat-label">&nbsp;&nbsp;↳ {cat}</span><span className="report-stat-value">{fmtPesos(val)}</span></div>)}
          {weekCompras.length > 0 && <div style={{ marginTop: 12 }}>{weekCompras.map(c => <div key={c.id} style={{ fontSize: 10, color: "#b0a090", padding: "2px 0" }}>{fmtDate(c.fecha)} · {c.descripcion} · {fmtPesos(c.monto)}</div>)}</div>}
        </div>
        <div className="report-block">
          <div className="report-block-title">Actividades por área</div>
          {Object.keys(byArea).length === 0
            ? <div style={{ fontSize: 11, color: "#8a7a6a" }}>Sin actividades registradas</div>
            : Object.entries(byArea).map(([area, items]) => (
                <div key={area} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: "var(--amber-light)", letterSpacing: 1, marginBottom: 4 }}>{area.toUpperCase()}</div>
                  {items.map(i => <div key={i.id} style={{ fontSize: 11, color: "#d0c0b0", padding: "2px 0" }}>· {i.descripcion}</div>)}
                </div>
              ))
          }
        </div>
      </>}
      {mode === "mensual" && <>
        <div className="report-block">
          <div className="report-block-title">Producción del mes</div>
          {SABORES.map(s => <div key={s} className="report-stat"><span className="report-stat-label">{s}</span><span className="report-stat-value">{monthEmb[s]} botellas</span></div>)}
          <div className="report-stat"><span className="report-stat-label">Total embotellado</span><span className="report-stat-value">{Object.values(monthEmb).reduce((a,b)=>a+b,0)} botellas</span></div>
          <div className="report-stat"><span className="report-stat-label">Despachos</span><span className="report-stat-value">{monthDespachos.length}</span></div>
        </div>
        <div className="report-block">
          <div className="report-block-title">Gastos del mes</div>
          <div className="report-stat"><span className="report-stat-label">Total</span><span className="report-stat-value">{fmtPesos(monthGasto)}</span></div>
          {COMPRA_CATS.map(cat => { const sum = monthCompras.filter(c=>c.categoria===cat).reduce((s,c)=>s+c.monto,0); return sum>0 ? <div key={cat} className="report-stat"><span className="report-stat-label">&nbsp;&nbsp;↳ {cat}</span><span className="report-stat-value">{fmtPesos(sum)}</span></div> : null; })}
        </div>
        <div className="report-block">
          <div className="report-block-title">Despachos del mes — triangular con Bsale</div>
          {monthDespachos.length === 0
            ? <div style={{ fontSize: 11, color: "#8a7a6a" }}>Sin despachos este mes</div>
            : monthDespachos.map((d,i) => (
                <div key={d.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: "var(--amber-light)", marginBottom: 3 }}>Despacho {i+1} — {fmtDate(d.fecha)}</div>
                  {SABORES.map(s => <div key={s} style={{ fontSize: 11, color: "#d0c0b0" }}>· {s}: {d.botSalida?.[s]||0} botellas</div>)}
                </div>
              ))
          }
        </div>
      </>}
    </div>
  );
}
