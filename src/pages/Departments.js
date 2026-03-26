import { useState } from 'react';

const departments = [
  { code: 'OM',     name: 'Office of the Mayor',                       head: 'Hon. Mayor',               personnel: 42, status: 'Active' },
  { code: 'OVM',    name: 'Office of the Vice Mayor',                  head: 'Hon. Vice Mayor',          personnel: 18, status: 'Active' },
  { code: 'SB',     name: 'Sangguniang Bayan',                         head: 'SB Secretary',             personnel: 24, status: 'Active' },
  { code: 'MTO',    name: 'Office of the Municipal Treasurer',         head: 'Municipal Treasurer',      personnel: 31, status: 'Active' },
  { code: 'MAO',    name: "Municipal Assessor's Office",               head: 'Municipal Assessor',       personnel: 14, status: 'Active' },
  { code: 'MCR',    name: 'Municipal Civil Registrar',                 head: 'Civil Registrar',          personnel: 12, status: 'Active' },
  { code: 'MHO',    name: 'Municipal Health Office',                   head: 'Municipal Health Officer', personnel: 38, status: 'Active' },
  { code: 'MSWD',   name: 'MSWD – Pagsanjan',                          head: 'MSWD Officer',             personnel: 27, status: 'Active' },
  { code: 'MPDO',   name: "Municipal Planning & Dev't Office",         head: 'MPDO Officer',             personnel: 16, status: 'Active' },
  { code: 'MEO',    name: 'Office of the Mun. Engineer',               head: 'Municipal Engineer',       personnel: 22, status: 'Active' },
  { code: 'MAGO',   name: 'Office of the Mun. Agriculturist',          head: 'Municipal Agriculturist',  personnel: 19, status: 'Active' },
  { code: 'MENRO',  name: 'Municipal Environment & Natural Resources', head: 'MENRO Officer',            personnel: 11, status: 'Active' },
  { code: 'MBDO',   name: "Municipal Business & Dev't Office",         head: 'MBDO Officer',             personnel: 9,  status: 'Active' },
  { code: 'HRMO',   name: 'Human Resource Management Office',          head: 'HRMO Officer',             personnel: 8,  status: 'Active' },
  { code: 'MDRRMO', name: 'Municipal Disaster Risk Reduction & Mgmt',  head: 'MDRRMO Officer',           personnel: 15, status: 'Active' },
  { code: 'MBO',    name: 'Office of the Mun. Budget',                 head: 'Municipal Budget Officer', personnel: 7,  status: 'Active' },
  { code: 'MCTC',   name: 'Municipal Circuit Trial Court',             head: 'Presiding Judge',          personnel: 6,  status: 'Active' },
];

const avatarColors = ['#0b044d','#8e1e18','#1a0f6e','#5a0f0b','#2d1a8e','#0b044d','#3b1a6e','#6b0f0b'];

export default function Departments({ searchQuery = '' }) {
  const [selected, setSelected] = useState(null);

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content">
      {/* Summary bar */}
      <div className="dept-summary-bar">
        <div className="dept-summary-item">
          <span className="dept-summary-val">{departments.length}</span>
          <span className="dept-summary-label">Total Departments</span>
        </div>
        <div className="dept-summary-divider" />
        <div className="dept-summary-item">
          <span className="dept-summary-val">{departments.reduce((s, d) => s + d.personnel, 0)}</span>
          <span className="dept-summary-label">Total Personnel</span>
        </div>
        <div className="dept-summary-divider" />
        <div className="dept-summary-item">
          <span className="dept-summary-val">{departments.filter(d => d.status === 'Active').length}</span>
          <span className="dept-summary-label">Active Offices</span>
        </div>
      </div>

      {/* Table */}
      <section className="table-section">
        <div className="table-header">
          <div>
            <h3 className="table-title">Departments & Offices</h3>
            <p className="table-sub">Municipal Government of Pagsanjan · Province of Laguna · {filtered.length} offices</p>
          </div>
          <button className="btn-export">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>

        <div className="table-wrapper">
          <table className="payroll-table">
            <thead>
              <tr>
                <th>Department / Office</th>
                <th>Code</th>
                <th>Department Head</th>
                <th>Personnel</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dept, i) => (
                <tr key={dept.code}>
                  <td>
                    <div className="emp-cell">
                      <div className="emp-avatar" style={{ background: avatarColors[i % avatarColors.length], fontSize: 11 }}>
                        {dept.code.slice(0, 2)}
                      </div>
                      <p className="emp-name">{dept.name}</p>
                    </div>
                  </td>
                  <td><span className="dept-tag">{dept.code}</span></td>
                  <td className="position-cell">{dept.head}</td>
                  <td className="pay-cell">{dept.personnel}</td>
                  <td><span className="badge-status processed">{dept.status}</span></td>
                  <td>
                    <button className="btn-view" onClick={() => setSelected(dept)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <p>Showing <strong>{filtered.length}</strong> of <strong>{departments.length}</strong> offices</p>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">DEPARTMENT DETAIL</span>
                <h3 className="modal-title">{selected.name}</h3>
                <p className="modal-sub">Municipal Government of Pagsanjan</p>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-section-label">OFFICE INFORMATION</div>
              <div className="modal-row"><span>Office Code</span><strong>{selected.code}</strong></div>
              <div className="modal-row"><span>Department Head</span><strong>{selected.head}</strong></div>
              <div className="modal-row"><span>Total Personnel</span><strong>{selected.personnel}</strong></div>
              <div className="modal-row"><span>Status</span><span className="badge-status processed">{selected.status}</span></div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
