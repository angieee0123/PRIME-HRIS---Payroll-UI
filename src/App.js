import { useState, useRef, useEffect } from 'react';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Personnel from './pages/Personnel';
import Payroll from './pages/Payroll';
import Attendance from './pages/Attendance';
import LeaveAndBenefits from './pages/LeaveAndBenefits';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MyPayslip from './pages/MyPayslip';
import MyAttendance from './pages/MyAttendance';
import MyLeaveAndBenefits from './pages/MyLeaveAndBenefits';
import EmployeeSettings from './pages/EmployeeSettings';
import Departments from './pages/Departments';

const NavIcon = ({ id, role }) => {
  const s = { width: 17, height: 17, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    departments: <svg {...s} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    dashboard:  <svg {...s} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    personnel:  <svg {...s} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    payroll:    role === 'employee'
      ? <svg {...s} viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      : <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    attendance: <svg {...s} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
    leave:      <svg {...s} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    reports:    <svg {...s} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    settings:   <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  };
  return icons[id] || null;
};

const adminNavItems = [
  { label: 'Dashboard',        id: 'dashboard' },
  { label: 'Personnel',        id: 'personnel' },
  { label: 'Payroll',          id: 'payroll' },
  { label: 'Attendance',       id: 'attendance' },
  { label: 'Leave & Benefits', id: 'leave' },
  { label: 'Departments',       id: 'departments' },
  { label: 'Reports',          id: 'reports' },
  { label: 'Settings',         id: 'settings' },
];

const employeeNavItems = [
  { label: 'Dashboard',        id: 'dashboard' },
  { label: 'My Payslip',       id: 'payroll' },
  { label: 'My Attendance',    id: 'attendance' },
  { label: 'Leave & Benefits', id: 'leave' },
  { label: 'Settings',         id: 'settings' },
];

const jobOrderNavItems = [
  { label: 'Dashboard',     id: 'dashboard' },
  { label: 'My Payslip',    id: 'payroll' },
  { label: 'My Attendance', id: 'attendance' },
  { label: 'Settings',      id: 'settings' },
];

const stats = [
  { label: 'Total Personnel',   value: '348',        sub: '+6 this month',        accent: '#0b044d',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Semi-Monthly Payroll', value: '₱2,436,300', sub: '+1.8% vs last period', accent: '#8e1e18',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: 'Pending Approvals', value: '12',         sub: '4 urgent',             accent: '#d9bb00',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'Next Pay Date',     value: 'Jun 30',     sub: '5 days remaining',     accent: '#0b044d',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
];

const payrollData = [
  { id: 'PGS-0041', name: 'Maria B. Santos',   position: 'Administrative Officer IV',   dept: 'Office of the Mayor',          basic: '₱21,079.50', deductions: '₱4,215.50', net: '₱16,864.00', status: 'Processed', gsis: '₱1,897', philhealth: '₱525',   pagibig: '₱50', tax: '₱1,743.50' },
  { id: 'PGS-0082', name: 'Juan P. dela Cruz', position: 'Municipal Engineer II',        dept: 'Office of the Mun. Engineer',  basic: '₱19,042.50', deductions: '₱3,809.00', net: '₱15,233.50', status: 'Processed', gsis: '₱1,714', philhealth: '₱475',   pagibig: '₱50', tax: '₱1,569.50' },
  { id: 'PGS-0115', name: 'Ana R. Reyes',      position: 'Nurse II',                    dept: 'Municipal Health Office',      basic: '₱16,921.50', deductions: '₱3,384.00', net: '₱13,537.50', status: 'Pending',   gsis: '₱1,523', philhealth: '₱425',   pagibig: '₱50', tax: '₱1,386' },
  { id: 'PGS-0203', name: 'Carlos M. Mendoza', position: 'Municipal Treasurer III',     dept: 'Office of the Mun. Treasurer', basic: '₱23,627.50', deductions: '₱4,725.50', net: '₱18,902.00', status: 'Processed', gsis: '₱2,126.50', philhealth: '₱575', pagibig: '₱50', tax: '₱1,974' },
  { id: 'PGS-0267', name: 'Liza G. Gomez',     position: 'Social Welfare Officer II',   dept: 'MSWD – Pagsanjan',             basic: '₱17,548.50', deductions: '₱3,509.50', net: '₱14,039.00', status: 'On Hold',   gsis: '₱1,579.50', philhealth: '₱437.50', pagibig: '₱50', tax: '₱1,442.50' },
  { id: 'PGS-0310', name: 'Roberto T. Flores', position: 'Municipal Civil Registrar I', dept: 'Municipal Civil Registrar',    basic: '₱15,265.50', deductions: '₱3,053.00', net: '₱12,212.50', status: 'Processed', gsis: '₱1,374', philhealth: '₱387.50', pagibig: '₱50', tax: '₱1,241.50' },
];

const adminNotifications = [
  { id: 1, type: 'urgent',  title: 'Payroll Approval Required',    desc: '4 payroll records need your approval before Jun 30.',        time: '2 hrs ago',  read: false },
  { id: 2, type: 'warning', title: 'Leave Request Pending',         desc: 'Carlos M. Mendoza filed a 3-day sick leave request.',        time: '4 hrs ago',  read: false },
  { id: 3, type: 'info',    title: 'New Employee Onboarded',        desc: 'Roberto T. Flores (PGS-0310) completed onboarding.',         time: 'Yesterday',  read: false },
  { id: 4, type: 'warning', title: 'Incomplete DTR Records',        desc: '3 employees have missing DTR entries for June 2025.',        time: 'Yesterday',  read: false },
  { id: 5, type: 'info',    title: 'DTR Submission Deadline',       desc: 'June 2025 DTR submission closes on June 28 for all staff.',  time: '2 days ago', read: true  },
  { id: 6, type: 'info',    title: 'Payroll Period Opening',        desc: 'June 2025 payroll period is now open for processing.',       time: '3 days ago', read: true  },
];

const employeeNotifications = [
  { id: 1, type: 'info',    title: 'Jun 16–30 Payslip Ready',       desc: 'Your payslip for Jun 16–30, 2025 is now available. Net pay: ₱13,537.50.', time: '2 hrs ago',  read: false },
  { id: 2, type: 'warning', title: 'DTR Submission Deadline',        desc: 'Please submit your June 2025 DTR before June 28, 2025.',                  time: '5 hrs ago',  read: false },
  { id: 3, type: 'info',    title: 'Leave Request Approved',         desc: 'Your Vacation Leave (Jun 10–11, 2 days) has been approved.',               time: '3 days ago', read: false },
  { id: 4, type: 'warning', title: 'Pending Leave Application',      desc: 'Your Vacation Leave request (Jul 7–9) is awaiting approval.',              time: '4 days ago', read: true  },
  { id: 5, type: 'info',    title: 'Attendance Recorded',            desc: 'Your attendance for June 24, 2025 has been logged.',                      time: '5 days ago', read: true  },
];

const jobOrderNotifications = [
  { id: 1, type: 'info',    title: 'Jun 16–30 Payslip Ready',       desc: 'Your payslip for Jun 16–30, 2025 is now available. Net pay: ₱11,250.00.', time: '2 hrs ago',  read: false },
  { id: 2, type: 'warning', title: 'DTR Submission Deadline',        desc: 'Please submit your June 2025 DTR before June 28, 2025.',                  time: '5 hrs ago',  read: false },
  { id: 3, type: 'info',    title: 'Contract Renewal Notice',        desc: 'Your Job Order contract is due for renewal on July 1, 2025.',             time: '2 days ago', read: false },
  { id: 4, type: 'info',    title: 'Attendance Recorded',            desc: 'Your attendance for June 24, 2025 has been logged.',                      time: '3 days ago', read: true  },
  { id: 5, type: 'warning', title: 'Incomplete DTR Entry',           desc: 'Missing time-out entry detected for June 20, 2025.',                      time: '5 days ago', read: true  },
];

const initials = name => name.split(' ').filter(n => /^[A-Z]/.test(n)).map(n => n[0]).join('').slice(0, 2).toUpperCase();
const avatarColors = ['#0b044d', '#8e1e18', '#1a0f6e', '#5a0f0b', '#2d1a8e', '#0b044d'];

/* ── Payroll Detail Modal ── */
function PayrollModal({ row, idx, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">PAYROLL DETAIL · JUNE 2025</span>
            <h3 className="modal-title">{row.name}</h3>
            <p className="modal-sub">{row.position} · {row.dept}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-emp-row">
            <div className="emp-avatar lg" style={{ background: avatarColors[idx % avatarColors.length] }}>
              {initials(row.name)}
            </div>
            <div>
              <p className="modal-emp-id">{row.id}</p>
              <span className={`badge-status ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span>
            </div>
          </div>

          <div className="modal-section-label">EARNINGS</div>
          <div className="modal-row">
            <span>Basic Pay</span>
            <strong>{row.basic}</strong>
          </div>

          <div className="modal-section-label" style={{ marginTop: 16 }}>DEDUCTIONS</div>
          <div className="modal-row"><span>GSIS Premium</span><span className="modal-deduct">{row.gsis}</span></div>
          <div className="modal-row"><span>PhilHealth</span><span className="modal-deduct">{row.philhealth}</span></div>
          <div className="modal-row"><span>Pag-IBIG</span><span className="modal-deduct">{row.pagibig}</span></div>
          <div className="modal-row"><span>Withholding Tax</span><span className="modal-deduct">{row.tax}</span></div>
          <div className="modal-row total">
            <span>Total Deductions</span>
            <span className="modal-deduct">{row.deductions}</span>
          </div>

          <div className="modal-net-row">
            <span>NET PAY</span>
            <strong>{row.net}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-ghost" onClick={onClose}>Close</button>
          <button className="modal-btn-primary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Payslip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Process Payroll Confirm Modal ── */
function PayrollConfirmModal({ onClose, onConfirm }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">PAYROLL PROCESSING</span>
            <h3 className="modal-title">Process June 2025 Payroll?</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-confirm-info">
            <div className="modal-row"><span>Pay Period</span><strong>June 1–30, 2025</strong></div>
            <div className="modal-row"><span>Total Personnel</span><strong>348</strong></div>
            <div className="modal-row"><span>Gross Payroll</span><strong>₱4,872,600</strong></div>
            <div className="modal-row"><span>Pay Date</span><strong>June 30, 2025</strong></div>
          </div>
          <p className="modal-warn">
            ⚠ This action will finalize payroll for all 348 employees. Make sure all DTR and leave records are updated before proceeding.
          </p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="modal-btn-primary" onClick={onConfirm}>Confirm & Process</button>
        </div>
      </div>
    </div>
  );
}

/* ── Payroll Success Modal ── */
function PayrollSuccessModal({ onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className="modal-body" style={{ textAlign: 'center' }}>
          <h3 className="modal-title" style={{ marginBottom: 8 }}>Payroll Processed!</h3>
          <p style={{ fontSize: 13.5, color: '#6b6a8a', marginBottom: 16 }}>
            June 2025 payroll for <strong>348 employees</strong> has been successfully processed. Payslips will be available on June 30, 2025.
          </p>
          <div className="modal-confirm-info">
            <div className="modal-row"><span>Reference No.</span><strong>PAY-2025-06-001</strong></div>
            <div className="modal-row"><span>Processed by</span><strong>Admin User</strong></div>
            <div className="modal-row"><span>Date & Time</span><strong>Jun 25, 2025 · 10:42 AM</strong></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

/* ── Notifications Dropdown ── */
function NotifDropdown({ notifs, onClose, onMarkRead }) {
  const ref = useRef();
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div className="notif-dropdown" ref={ref}>
      <div className="notif-drop-header">
        <span className="notif-drop-title">Notifications</span>
        <button className="notif-mark-all" onClick={onMarkRead}>Mark all read</button>
      </div>
      <div className="notif-list">
        {notifs.map(n => (
          <div key={n.id} className={`notif-item ${n.read ? 'read' : ''} ${n.type}`}>
            <div className={`notif-dot ${n.type}`} />
            <div className="notif-content">
              <p className="notif-item-title">{n.title}</p>
              <p className="notif-item-desc">{n.desc}</p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Real-time clock ── */
function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function formatTopbarDate(d) {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · Fiscal Year ${d.getFullYear()}`;
}

/* ── Main App ── */
function App() {
  const now                         = useNow();
  const [view, setView]             = useState('landing');
  const [role, setRole]             = useState('admin');
  const [active, setActive]         = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showPayrollConfirm, setShowPayrollConfirm] = useState(false);
  const [showPayrollSuccess, setShowPayrollSuccess] = useState(false);
  const [showNotif, setShowNotif]   = useState(false);
  const [notifs, setNotifs]         = useState(adminNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRegs, setPendingRegs]   = useState([]);
  const [accounts, setAccounts]         = useState({
    'admin@gmail.com':     { role: 'admin',     password: 'pass' },
    'permanent@gmail.com': { role: 'employee',  password: 'pass' },
    'joborder@gmail.com':  { role: 'job-order', password: 'pass' },
  });

  useEffect(() => {
    setNotifs(role === 'admin' ? adminNotifications : role === 'job-order' ? jobOrderNotifications : employeeNotifications);
    setShowNotif(false);
    setSearchQuery('');
  }, [role]);

  useEffect(() => {
    setSearchQuery('');
  }, [active]);

  const unreadCount = notifs.filter(n => !n.read).length;

  const handleConfirmPayroll = () => {
    setShowPayrollConfirm(false);
    setShowPayrollSuccess(true);
  };

  const navItems = role === 'admin' ? adminNavItems : role === 'job-order' ? jobOrderNavItems : employeeNavItems;

  const handleLogin = (email, password) => {
    const account = accounts[email];
    if (!account || account.password !== password) return 'invalid';
    setRole(account.role);
    setActive('dashboard');
    setView('dashboard');
    return 'ok';
  };

  const handleApprove = id => {
    const reg = pendingRegs.find(r => r.id === id);
    if (!reg) return;
    setAccounts(prev => ({ ...prev, [reg.email]: { role: reg.type, password: reg.password } }));
    setPendingRegs(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setNotifs(prev => [{ id: Date.now(), type: 'info', title: 'Account Approved', desc: `${reg.name}'s account has been approved and is now active.`, time: 'Just now', read: false }, ...prev]);
  };

  const handleReject = id => {
    const reg = pendingRegs.find(r => r.id === id);
    setPendingRegs(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    if (reg) setNotifs(prev => [{ id: Date.now(), type: 'warning', title: 'Account Rejected', desc: `${reg.name}'s account request has been rejected.`, time: 'Just now', read: false }, ...prev]);
  };

  const handleSubmitRequest = reg => {
    setPendingRegs(prev => [...prev, reg]);
    if (role === 'admin') {
      setNotifs(prev => [{ id: Date.now(), type: 'warning', title: 'New Account Request', desc: `${reg.name} submitted a registration request.`, time: 'Just now', read: false }, ...prev]);
    }
  };

  if (view === 'landing') return <Landing onLogin={() => setView('login')} />;
  if (view === 'login')   return <Login   onLogin={handleLogin} onBack={() => setView('landing')} onSignup={() => setView('signup')} />;
  if (view === 'signup')  return <Signup  onLogin={() => setView('login')} onBack={() => setView('landing')} onSubmitRequest={handleSubmitRequest} />;

  return (
    <div className="app-layout">

      {/* ── Modals ── */}
      {selectedRow && (
        <PayrollModal
          row={selectedRow}
          idx={selectedIdx}
          onClose={() => { setSelectedRow(null); setSelectedIdx(null); }}
        />
      )}
      {showPayrollConfirm && (
        <PayrollConfirmModal
          onClose={() => setShowPayrollConfirm(false)}
          onConfirm={handleConfirmPayroll}
        />
      )}
      {showPayrollSuccess && (
        <PayrollSuccessModal onClose={() => setShowPayrollSuccess(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-mark">
              <img src="/municipal-of-pagsanjan-logo.jpg" alt="Pagsanjan Logo" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            {sidebarOpen && (
              <div className="logo-text-wrap">
                <span className="logo-text">PRIME HRIS</span>
                <span className="logo-sub">Pagsanjan, Laguna</span>
              </div>
            )}
          </div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        {sidebarOpen && <p className="nav-section-label">NAVIGATION</p>}

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="nav-icon"><NavIcon id={item.id} role={role} /></span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
              {sidebarOpen && active === item.id && <span className="nav-active-bar" />}
            </button>
          ))}
        </nav>

        <div className={`sidebar-footer ${!sidebarOpen ? 'collapsed-footer' : ''}`}>
          <div className="user-avatar-wrap">
            <div className="user-avatar" style={{ background: role === 'employee' ? '#8e1e18' : role === 'job-order' ? '#1a6e3c' : undefined }}>
              {role === 'employee' ? 'AR' : role === 'job-order' ? 'JO' : 'AD'}
            </div>
            <span className="user-status-dot" />
          </div>
          {sidebarOpen && (
            <div className="user-info">
              <p className="user-name">{role === 'employee' ? 'Ana R. Reyes' : role === 'job-order' ? 'Juan D. Cruz' : 'Admin User'}</p>
              <p className="user-role">{role === 'employee' ? 'Permanent · PGS-0115' : role === 'job-order' ? 'Job Order · JO-0042' : 'HR Staff'}</p>
            </div>
          )}
          {sidebarOpen && (
            <button className="logout-btn" onClick={() => setView('landing')} title="Logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">{navItems.find(n => n.id === active)?.label}</h1>
            <p className="page-subtitle">{formatTopbarDate(now)}</p>
          </div>
          <div className="topbar-right">
{!['dashboard','settings','reports'].includes(active) && (
              <div className="search-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9999bb" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  type="text"
                  placeholder={
                    (role === 'employee' || role === 'job-order')
                      ? active === 'payroll'    ? 'Search by period or status...'
                      : active === 'attendance' ? 'Search by date or status...'
                      : active === 'leave'      ? 'Search by type, reason, status...'
                      : 'Search...'
                      : active === 'personnel'    ? 'Search name, ID, position...'
                      : active === 'payroll'      ? 'Search name or ID...'
                      : active === 'attendance'   ? 'Search name or ID...'
                      : active === 'leave'        ? 'Search name or ID...'
                      : active === 'departments'  ? 'Search department or code...'
                      : 'Search...'
                  }
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" title="Notifications" onClick={() => setShowNotif(v => !v)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </button>
              {showNotif && (
                <NotifDropdown
                  notifs={notifs}
                  onClose={() => setShowNotif(false)}
                  onMarkRead={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
                />
              )}
            </div>

            {role === 'admin' && (
              <button className="btn-run-payroll" onClick={() => setShowPayrollConfirm(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Process Payroll
              </button>
            )}
          </div>
        </header>

        {/* ── Dashboard Content ── */}
        {active === 'dashboard' && (role === 'employee' || role === 'job-order') && <EmployeeDashboard role={role} notifs={notifs} setNotifs={setNotifs} />}
        {active === 'dashboard' && role === 'admin' && (
          <>
            {/* Welcome Banner */}
            <div className="welcome-banner">
              <div className="banner-left">
                <div className="banner-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d9bb00" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div>
                  <h2>Municipal Government of Pagsanjan</h2>
                  <p>Human Resource Management Office · Province of Laguna</p>
                </div>
              </div>
              <div className="banner-right">
                <div className="banner-badge">
                  <span className="banner-badge-dot" />
                  Jun 16–30, 2025 Payroll Active
                </div>
                <div className="banner-badge outline">Pay Date: Jun 30</div>
              </div>
            </div>

            {/* Stats */}
            <section className="stats-grid">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-top">
                    <p className="stat-label">{s.label}</p>
                    <div className="stat-icon-wrap" style={{ background: s.accent + '15' }}>
                      {s.icon}
                    </div>
                  </div>
                  <h2 className="stat-value">{s.value}</h2>
                  <div className="stat-footer">
                    <span className="stat-dot" style={{ background: s.accent }} />
                    <p className="stat-sub">{s.sub}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Payroll Table */}
            <section className="table-section">
              <div className="table-header">
                <div>
                  <h3 className="table-title">Payroll Register — Jun 16–30, 2025</h3>
                  <p className="table-sub">Municipal Government of Pagsanjan · Pay Date: Jun 30, 2025 · Showing 6 of 348 personnel</p>
                </div>
                <div className="table-actions">
                  <select className="filter-select">
                    <option>All Departments</option>
                    <option>Office of the Mayor</option>
                    <option>Office of the Vice Mayor</option>
                    <option>Sangguniang Bayan</option>
                    <option>Office of the Mun. Treasurer</option>
                    <option>Municipal Assessor's Office</option>
                    <option>Municipal Civil Registrar</option>
                    <option>Municipal Health Office</option>
                    <option>MSWD – Pagsanjan</option>
                    <option>Municipal Planning &amp; Dev't Office</option>
                    <option>Office of the Mun. Engineer</option>
                    <option>Office of the Mun. Agriculturist</option>
                    <option>Municipal Environment &amp; Natural Resources</option>
                    <option>Municipal Business &amp; Dev't Office</option>
                    <option>Human Resource Management Office</option>
                    <option>Municipal Disaster Risk Reduction &amp; Mgmt</option>
                    <option>Office of the Mun. Budget</option>
                    <option>Municipal Circuit Trial Court</option>
                  </select>
                  <select className="filter-select">
                    <option>June 2025</option>
                    <option>May 2025</option>
                    <option>April 2025</option>
                  </select>
                  <button className="btn-export">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="payroll-table">
                  <thead>
                    <tr>
                      <th>Personnel</th>
                      <th>Position</th>
                      <th>Department / Office</th>
                      <th>Basic Pay</th>
                      <th>Deductions</th>
                      <th>Net Pay</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((row, i) => (
                      <tr key={row.id}>
                        <td>
                          <div className="emp-cell">
                            <div className="emp-avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                              {initials(row.name)}
                            </div>
                            <div>
                              <p className="emp-name">{row.name}</p>
                              <p className="emp-id">{row.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="position-cell">{row.position}</td>
                        <td><span className="dept-tag">{row.dept}</span></td>
                        <td className="pay-cell">{row.basic}</td>
                        <td className="deduction">{row.deductions}</td>
                        <td className="net-pay">{row.net}</td>
                        <td><span className={`badge-status ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                        <td>
                          <button className="btn-view" onClick={() => { setSelectedRow(row); setSelectedIdx(i); }}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <p>Showing <strong>6</strong> of <strong>348</strong> records</p>
                <div className="pagination">
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn">›</button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Personnel ── */}
        {active === 'personnel' && <Personnel searchQuery={searchQuery} />}

        {/* ── Payroll ── */}
        {active === 'payroll' && role === 'admin' && <Payroll searchQuery={searchQuery} />}
        {active === 'payroll' && (role === 'employee' || role === 'job-order') && <MyPayslip role={role} searchQuery={searchQuery} />}

        {/* ── Attendance ── */}
        {active === 'attendance' && role === 'admin'    && <Attendance searchQuery={searchQuery} />}
        {active === 'attendance' && (role === 'employee' || role === 'job-order') && <MyAttendance role={role} searchQuery={searchQuery} />}

        {/* ── Leave & Benefits ── */}
        {active === 'leave' && role === 'admin'    && <LeaveAndBenefits searchQuery={searchQuery} />}
        {active === 'leave' && role === 'employee' && <MyLeaveAndBenefits searchQuery={searchQuery} />}
        {active === 'leave' && role === 'job-order' && (
          <div className="placeholder-section">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚫</div>
            <h2 className="placeholder-title">Not Available</h2>
            <p className="placeholder-desc">Leave & Benefits are not applicable for Job Order personnel.</p>
          </div>
        )}

        {/* ── Departments ── */}
        {active === 'departments' && role === 'admin' && <Departments searchQuery={searchQuery} />}

        {/* ── Reports ── */}
        {active === 'reports' && <Reports />}

        {/* ── Settings ── */}
        {active === 'settings' && role === 'admin'    && <Settings requests={pendingRegs} onApprove={handleApprove} onReject={handleReject} />}
        {active === 'settings' && (role === 'employee' || role === 'job-order') && <EmployeeSettings role={role} />}

        {/* ── Other Sections (placeholder) ── */}
        {active !== 'dashboard' && active !== 'personnel' && active !== 'payroll' && active !== 'attendance' && active !== 'leave' && active !== 'departments' && active !== 'reports' && active !== 'settings' && (
          <div className="placeholder-section">
            <div className="placeholder-icon">{navItems.find(n => n.id === active)?.icon}</div>
            <h2 className="placeholder-title">{navItems.find(n => n.id === active)?.label}</h2>
            <p className="placeholder-desc">This module is under development for the prototype.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
