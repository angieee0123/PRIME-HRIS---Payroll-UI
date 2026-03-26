import { useState } from 'react';

const TABS = [
  { id: 'profile',       label: 'Profile',        icon: '👤' },
  { id: 'security',      label: 'Security',        icon: '🔒' },
  { id: 'notifications', label: 'Notifications',   icon: '🔔' },
  { id: 'appearance',    label: 'Appearance',      icon: '🎨' },
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
        background: value ? '#8e1e18' : '#dddcf0', position: 'relative', transition: 'background 0.2s',
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
      <button onClick={handleSave} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: saved ? '#15803d' : '#8e1e18', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.2s' }}>
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
  const init = {
    firstName: 'Ana', lastName: 'R. Reyes',
    email: 'ana.reyes@pagsanjan.gov.ph', contact: '09181234567',
    empId: 'PGS-0115', position: 'Nurse II',
    dept: 'Municipal Health Office', empType: 'Permanent',
    dateHired: 'Jan 15, 2018',
  };
  const [form, setForm] = useState(init);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <Section title="Personal Information">
        <div style={{ padding: '20px 20px 4px' }}>
          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#8e1e18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700 }}>AR</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0b044d' }}>Ana R. Reyes</p>
              <p style={{ fontSize: 12, color: '#9999bb' }}>Nurse II · Municipal Health Office</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            {[['First Name', 'firstName'], ['Last Name', 'lastName'], ['Email Address', 'email'], ['Contact No.', 'contact']].map(([label, key]) => (
              <div key={key} className="form-field">
                <label style={{ fontSize: 12, fontWeight: 600, color: '#0b044d', display: 'block', marginBottom: 5 }}>{label}</label>
                <input value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e4e3f0', borderRadius: 9, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <SaveBar onSave={() => {}} onReset={() => setForm(init)} />
          <div style={{ height: 16 }} />
        </div>
      </Section>

      <Section title="Employment Details">
        {[
          ['Employee ID',    init.empId,    'Assigned by HR — not editable'],
          ['Position',       init.position, 'Assigned by HR — not editable'],
          ['Department',     init.dept,     'Assigned by HR — not editable'],
          ['Employment Type',init.empType,  'Assigned by HR — not editable'],
          ['Date Hired',     init.dateHired,'Assigned by HR — not editable'],
        ].map(([label, value, note]) => (
          <Row key={label} label={label} desc={note}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5a5888', background: '#f7f6ff', padding: '5px 12px', borderRadius: 7 }}>{value}</span>
          </Row>
        ))}
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
              <input type="password" value={pw[key]} onChange={e => set(key, e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e4e3f0', borderRadius: 9, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          {msg && <p style={{ fontSize: 12.5, color: msg.startsWith('✓') ? '#15803d' : '#8e1e18', marginBottom: 12 }}>{msg}</p>}
          <button onClick={handleChange} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: '#8e1e18', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
            Change Password
          </button>
        </div>
      </Section>

      <Section title="Login Security">
        <Row label="Two-Factor Authentication" desc="Require OTP on every login">
          <Toggle value={twoFA} onChange={setTwoFA} />
        </Row>
        <Row label="Session Timeout" desc="Auto-logout after inactivity">
          <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
            style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
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
  const init = { payslipReady: true, leaveStatus: true, dtrDeadline: true, attendanceAlert: false, emailDigest: true };
  const [prefs, setPrefs] = useState(init);
  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const items = [
    { key: 'payslipReady',    label: 'Payslip Available',    desc: 'Notify when your monthly payslip is ready' },
    { key: 'leaveStatus',     label: 'Leave Status Update',  desc: 'Notify when your leave request is approved or rejected' },
    { key: 'dtrDeadline',     label: 'DTR Deadline Reminder',desc: 'Remind before DTR submission deadline' },
    { key: 'attendanceAlert', label: 'Attendance Alert',     desc: 'Notify when a late or absent entry is recorded' },
  ];

  return (
    <div>
      <Section title="In-App Notifications">
        {items.map(item => (
          <Row key={item.key} label={item.label} desc={item.desc}>
            <Toggle value={prefs[item.key]} onChange={() => toggle(item.key)} />
          </Row>
        ))}
      </Section>
      <Section title="Email Notifications">
        <Row label="Email Digest" desc="Receive a daily summary of updates via email">
          <Toggle value={prefs.emailDigest} onChange={() => toggle('emailDigest')} />
        </Row>
        <div style={{ padding: '16px 20px' }}>
          <SaveBar onSave={() => {}} onReset={() => setPrefs(init)} />
        </div>
      </Section>
    </div>
  );
}

/* ── Appearance Tab ── */
function AppearanceTab() {
  const init = { darkMode: false, language: 'English', dateFormat: 'MM/DD/YYYY', fontSize: 'Medium' };
  const [cfg, setCfg] = useState(init);
  const set = (k, v) => setCfg(c => ({ ...c, [k]: v }));

  const sel = (key, options) => (
    <select value={cfg[key]} onChange={e => set(key, e.target.value)}
      style={{ padding: '7px 12px', border: '1.5px solid #e4e3f0', borderRadius: 8, fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#0b044d', outline: 'none' }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div>
      <Section title="Display">
        <Row label="Dark Mode" desc="Switch to dark theme (coming soon)">
          <Toggle value={cfg.darkMode} onChange={v => set('darkMode', v)} />
        </Row>
        <Row label="Font Size" desc="Adjust text size across the portal">
          {sel('fontSize', ['Small', 'Medium', 'Large'])}
        </Row>
      </Section>
      <Section title="Regional">
        <Row label="Language" desc="Portal display language">
          {sel('language', ['English', 'Filipino'])}
        </Row>
        <Row label="Date Format" desc="How dates are displayed">
          {sel('dateFormat', ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'])}
        </Row>
        <div style={{ padding: '16px 20px' }}>
          <SaveBar onSave={() => {}} onReset={() => setCfg(init)} />
        </div>
      </Section>
    </div>
  );
}

/* ── Main Employee Settings Page ── */
export default function EmployeeSettings() {
  const [tab, setTab] = useState('profile');

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1.5px solid #eceaf8', borderRadius: 12, padding: 5, marginBottom: 24 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '9px 14px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'Poppins, sans-serif',
              background: tab === t.id ? '#8e1e18' : 'transparent',
              color: tab === t.id ? '#fff' : '#6b6a8a',
              transition: 'all 0.18s',
            }}
          >
            <span style={{ fontSize: 15 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile'       && <ProfileTab />}
      {tab === 'security'      && <SecurityTab />}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'appearance'    && <AppearanceTab />}
    </div>
  );
}
