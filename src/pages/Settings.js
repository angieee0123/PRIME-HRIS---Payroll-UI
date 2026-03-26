import { useState } from 'react';

const TABS = [
  { id: 'profile',       label: 'Profile',          icon: '👤' },
  { id: 'system',        label: 'System',            icon: '⚙' },
  { id: 'security',      label: 'Security',          icon: '🔒' },
  { id: 'notifications', label: 'Notifications',     icon: '🔔' },
  { id: 'requests',      label: 'Account Requests',  icon: '📋' },
];

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5, color: '#9999bb', textTransform: 'uppercase', marginBottom: 14 }}>{title}</p>
      <div style={{ background: '#fff', border: '1.5px solid #eceaf8', borderRadius: 12, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, desc, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f4f3ff', gap: 16 }}>
      <div>
        <p style={{ fontSize: 13.5, fontWeight: 600, color: '#0b044d', marginBottom: 2 }}>{label}</p>
        {desc && <p style={{ fontSize: 12, color: '#9999bb' }}>{desc}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: value ? '#0b044d' : '#dddcf0', position: 'relative', transition: 'background 0.2s',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function SaveBar({ onSave, onReset }) {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
      <button onClick={onReset} style={{ padding: '9px 18px', borderRadius: 9, border: '1.5px solid #dddcf0', background: '#fff', fontSize: 13, fontWeight: 600, color: '#6b6a8a', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
        Reset
      </button>
      <button onClick={handleSave} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: saved ? '#15803d' : '#0b044d', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.2s' }}>
        {saved
          ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Saved!</>
          : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Changes</>
        }
      </button>
    </div>
  );
}

/* ── Profile Tab ── */
function ProfileTab() {
  const init = { firstName: 'Admin', lastName: 'User', email: 'admin@pagsanjan.gov.ph', contact: '09171234567', role: 'HR Staff', dept: 'Human Resource Management Office' };
  const [form, setForm] = useState(init);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <Section title="Account Information">
        <div style={{ padding: '20px 20px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0b044d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700 }}>AD</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0b044d' }}>Admin User</p>
              <p style={{ fontSize: 12, color: '#9999bb' }}>HR Staff · Human Resource Management Office</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            {[['First Name', 'firstName'], ['Last Name', 'lastName'], ['Email Address', 'email'], ['Contact No.', 'contact']].map(([label, key]) => (
              <div key={key} className="form-field">
                <label style={{ fontSize: 12, fontWeight: 600, color: '#0b044d', display: 'block', marginBottom: 5 }}>{label}</label>
                <input value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e4e3f0', borderRadius: 9, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div className="form-field" style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#0b044d', display: 'block', marginBottom: 5 }}>Department / Office</label>
              <input value={form.dept} onChange={e => set('dept', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e4e3f0', borderRadius: 9, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <SaveBar onSave={() => {}} onReset={() => setForm(init)} />
          <div style={{ height: 16 }} />
        </div>
      </Section>
    </div>
  );
}

/* ── System Tab ── */
function SystemTab() {
  const init = { fiscalYear: '2025', payPeriod: 'Monthly', currency: 'PHP', dateFormat: 'MM/DD/YYYY', timezone: 'Asia/Manila', darkMode: false };
  const [cfg, setCfg] = useState(init);
  const set = (k, v) => setCfg(c => ({ ...c, [k]: v }));

  return (
    <div>
      <Section title="General">
        <Row label="Fiscal Year" desc="Current active fiscal year">
          <select value={cfg.fiscalYear} onChange={e => set('fiscalYear', e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
            <option>2024</option><option>2025</option><option>2026</option>
          </select>
        </Row>
        <Row label="Pay Period" desc="Default payroll cycle">
          <select value={cfg.payPeriod} onChange={e => set('payPeriod', e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
            <option>Monthly</option><option>Semi-Monthly</option><option>Weekly</option>
          </select>
        </Row>
        <Row label="Currency" desc="Display currency for payroll">
          <select value={cfg.currency} onChange={e => set('currency', e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
            <option>PHP</option><option>USD</option>
          </select>
        </Row>
        <Row label="Date Format" desc="How dates are displayed">
          <select value={cfg.dateFormat} onChange={e => set('dateFormat', e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
            <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
          </select>
        </Row>
        <div style={{ padding: '16px 20px' }}>
          <SaveBar onSave={() => {}} onReset={() => setCfg(init)} />
        </div>
      </Section>

      <Section title="Appearance">
        <Row label="Dark Mode" desc="Switch to dark theme (coming soon)">
          <Toggle value={cfg.darkMode} onChange={v => set('darkMode', v)} />
        </Row>
      </Section>
    </div>
  );
}

/* ── Security Tab ── */
function SecurityTab() {
  const init = { current: '', newPw: '', confirm: '' };
  const [pw, setPw] = useState(init);
  const [twoFA, setTwoFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [msg, setMsg] = useState('');
  const set = (k, v) => setPw(p => ({ ...p, [k]: v }));

  const handleChange = () => {
    if (!pw.current || !pw.newPw || !pw.confirm) { setMsg('Please fill in all fields.'); return; }
    if (pw.newPw !== pw.confirm) { setMsg('New passwords do not match.'); return; }
    if (pw.newPw.length < 8) { setMsg('Password must be at least 8 characters.'); return; }
    setMsg('✓ Password changed successfully.');
    setPw(init);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <Section title="Change Password">
        <div style={{ padding: '20px 20px 4px' }}>
          {['current', 'newPw', 'confirm'].map((key, i) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#0b044d', display: 'block', marginBottom: 5 }}>
                {['Current Password', 'New Password', 'Confirm New Password'][i]}
              </label>
              <input type="password" value={pw[key]} onChange={e => set(key, e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e4e3f0', borderRadius: 9, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          {msg && <p style={{ fontSize: 12.5, color: msg.startsWith('✓') ? '#15803d' : '#8e1e18', marginBottom: 12 }}>{msg}</p>}
          <button onClick={handleChange} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: '#0b044d', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Change Password
          </button>
        </div>
      </Section>

      <Section title="Access Control">
        <Row label="Two-Factor Authentication" desc="Require OTP on login">
          <Toggle value={twoFA} onChange={setTwoFA} />
        </Row>
        <Row label="Session Timeout" desc="Auto-logout after inactivity">
          <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </Row>
      </Section>
    </div>
  );
}

/* ── Notifications Tab ── */
function NotificationsTab() {
  const init = { payrollApproval: true, leaveRequest: true, newEmployee: true, dtrDeadline: true, systemAlert: false, emailDigest: true };
  const [prefs, setPrefs] = useState(init);
  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const items = [
    { key: 'payrollApproval', label: 'Payroll Approval',    desc: 'Notify when payroll records need approval' },
    { key: 'leaveRequest',    label: 'Leave Requests',      desc: 'Notify when employees file leave requests' },
    { key: 'newEmployee',     label: 'New Employee',        desc: 'Notify when a new employee account is created' },
    { key: 'dtrDeadline',     label: 'DTR Deadline',        desc: 'Remind before DTR submission deadline' },
    { key: 'systemAlert',     label: 'System Alerts',       desc: 'Critical system and security alerts' },
    { key: 'emailDigest',     label: 'Email Digest',        desc: 'Receive a daily summary via email' },
  ];

  return (
    <div>
      <Section title="In-App Notifications">
        {items.slice(0, 5).map(item => (
          <Row key={item.key} label={item.label} desc={item.desc}>
            <Toggle value={prefs[item.key]} onChange={() => toggle(item.key)} />
          </Row>
        ))}
      </Section>
      <Section title="Email Notifications">
        <Row label={items[5].label} desc={items[5].desc}>
          <Toggle value={prefs.emailDigest} onChange={() => toggle('emailDigest')} />
        </Row>
        <div style={{ padding: '16px 20px' }}>
          <SaveBar onSave={() => {}} onReset={() => setPrefs(init)} />
        </div>
      </Section>
    </div>
  );
}

/* ── Account Requests Tab ── */
function RequestsTab({ requests, onApprove, onReject }) {
  const pending  = requests.filter(r => r.status === 'pending');
  const resolved = requests.filter(r => r.status !== 'pending');

  const typeLabel = t => t === 'employee' ? 'Permanent' : t === 'job-order' ? 'Job Order' : 'Admin';
  const typeColor = t => t === 'employee' ? '#8e1e18' : t === 'job-order' ? '#1a6e3c' : '#0b044d';

  const Card = ({ r }) => (
    <div style={{ background: '#fff', border: '1.5px solid #eceaf8', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: typeColor(r.type), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
        {r.firstName[0]}{r.lastName[0]}
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0b044d', marginBottom: 2 }}>{r.name}</p>
        <p style={{ fontSize: 12, color: '#9999bb', marginBottom: 4 }}>{r.position} · {r.email}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20, background: typeColor(r.type) + '15', color: typeColor(r.type) }}>{typeLabel(r.type)}</span>
          <span style={{ fontSize: 11, color: '#aaa8cc' }}>{r.employeeId}</span>
          <span style={{ fontSize: 11, color: '#aaa8cc' }}>Submitted {r.date}</span>
        </div>
      </div>
      {r.status === 'pending' ? (
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={() => onReject(r.id)} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #f5d0ce', background: '#fdf0ef', color: '#8e1e18', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>Reject</button>
          <button onClick={() => onApprove(r.id)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#0b044d', color: '#fff', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>Approve</button>
        </div>
      ) : (
        <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20, background: r.status === 'approved' ? '#e8f9ef' : '#fdf0ef', color: r.status === 'approved' ? '#15803d' : '#8e1e18' }}>
          {r.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
        </span>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5, color: '#9999bb', textTransform: 'uppercase', marginBottom: 14 }}>
          Pending Requests {pending.length > 0 && <span style={{ background: '#8e1e18', color: '#fff', borderRadius: 20, padding: '1px 8px', fontSize: 10, marginLeft: 6 }}>{pending.length}</span>}
        </p>
        {pending.length === 0 ? (
          <div style={{ background: '#fff', border: '1.5px solid #eceaf8', borderRadius: 12, padding: '32px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 28, marginBottom: 8 }}>✅</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0b044d', marginBottom: 4 }}>All caught up!</p>
            <p style={{ fontSize: 13, color: '#9999bb' }}>No pending account requests at this time.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map(r => <Card key={r.id} r={r} />)}
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <div>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5, color: '#9999bb', textTransform: 'uppercase', marginBottom: 14 }}>Resolved</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {resolved.map(r => <Card key={r.id} r={r} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Settings Page ── */
export default function Settings({ requests = [], onApprove, onReject }) {
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const [tab, setTab] = useState('profile');

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1.5px solid #eceaf8', borderRadius: 12, padding: 5, marginBottom: 24, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '9px 14px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'Poppins, sans-serif',
              background: tab === t.id ? '#0b044d' : 'transparent',
              color: tab === t.id ? '#fff' : '#6b6a8a',
              transition: 'all 0.18s',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 15 }}>{t.icon}</span>
            {t.label}
            {t.id === 'requests' && pendingCount > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 4, background: '#8e1e18', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'profile'       && <ProfileTab />}
      {tab === 'system'        && <SystemTab />}
      {tab === 'security'      && <SecurityTab />}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'requests'      && <RequestsTab requests={requests} onApprove={onApprove} onReject={onReject} />}
    </div>
  );
}
