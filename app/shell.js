// Shared shell: icons, header, footer and the Contact Us tab.
// Body attributes: data-user="Saul Beck"  data-notify (red dot on Tasks)  data-nav="full" (desktop text nav)
(function () {
  const P = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    tasks: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5"/><circle cx="5" cy="18" r="1"/>',
    tasksbox: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 13l2 2 4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    chevdown: '<path d="M6 9l6 6 6-6"/>',
    chevup: '<path d="M6 15l6-6 6 6"/>',
    chevright: '<path d="M9 6l6 6-6 6"/>',
    chevleft: '<path d="M15 6l-6 6 6 6"/>',
    print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    fileplus: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M12 11v6M9 14h6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    userplus: '<circle cx="10" cy="8" r="4"/><path d="M2 21c0-4 4-6 8-6s8 2 8 6M19 8v6M16 11h6"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    kebab: '<circle cx="12" cy="5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="19" r="1.3" fill="currentColor"/>',
    arrowleft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowright: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" stroke-width="2.4"/>',
    grid: '<path d="M5 5h.01M12 5h.01M19 5h.01M5 12h.01M12 12h.01M19 12h.01M5 19h.01M12 19h.01M19 19h.01" stroke-width="3.2"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h4M14 13h3"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 20h6"/>',
    doc: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    org: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M5 17v-3h14v3"/>',
    split: '<path d="M12 21v-7M12 14L6 6M12 14l6-8M4 9V4h5M20 9V4h-5"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
    redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/>',
    bold: '<path d="M7 4h6a4 4 0 010 8H7zM7 12h7a4 4 0 010 8H7z" stroke-width="2.4"/>',
    italic: '<path d="M10 4h8M6 20h8M14 4l-4 16"/>',
    alignleft: '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
    aligncenter: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
    alignright: '<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
    justify: '<path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
    ul: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    ol: '<path d="M10 6h10M10 12h10M10 18h10M4 4.5l1-.5v4M3.5 10.5h2l-2 3h2M3.5 16h2v4h-2M3.5 18h2"/>',
    outdent: '<path d="M4 6h16M11 10h9M11 14h9M4 18h16M8 9l-3 3 3 3"/>',
    indent: '<path d="M4 6h16M11 10h9M11 14h9M4 18h16M5 9l3 3-3 3"/>',
    link: '<path d="M10 14a4 4 0 006 0l3-3a4 4 0 00-6-6l-1 1"/><path d="M14 10a4 4 0 00-6 0l-3 3a4 4 0 006 6l1-1"/>',
    contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    award: '<circle cx="12" cy="15" r="5"/><path d="M8.5 11.5L6 3h4l2 5 2-5h4l-2.5 8.5"/>',
    work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18 14.5c2 .6 3.5 2.4 3.5 5.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    report: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    clockface: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  const FILLED = {
    caret: '<path d="M6 9h12l-6 7z"/>',
    checkcircle: '<circle cx="12" cy="12" r="12"/><path d="M6.5 12.5l3.5 3.5 7.5-8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  window.icon = function (name, cls) {
    if (FILLED[name]) return `<svg class="ic fill ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${FILLED[name]}</svg>`;
    return `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;
  };
  const LOGO = '<svg class="logo" viewBox="0 0 28 32" aria-label="Workday logo"><path d="M4.5 12.5a9.5 9.5 0 0119 0" fill="none" stroke="#f38b00" stroke-width="3.4" stroke-linecap="round"/><path d="M3 15.5l4.2 13h2.6L14 18l4.2 10.5h2.6l4.2-13h-3.2l-2.6 8.6-3.8-9.6h-2.8l-3.8 9.6-2.6-8.6z" fill="#0b2a5b"/></svg>';
  window.LOGO = LOGO;

  function render() {
    document.querySelectorAll('i[data-i]').forEach(el => { el.outerHTML = icon(el.dataset.i, el.className); });
    const b = document.body;
    const user = b.dataset.user || 'Saul Beck';
    const nav = ['Statement of Work:report:1', 'Jobs:work:1', 'People:people:1', 'Work Orders:doc:0', 'Invoices:report:1', 'Timesheets:clockface:1', 'Dashboards:chart:0', 'Reports:report:1', 'More::1']
      .map(s => { const [t, ic, dd] = s.split(':'); return `<span>${ic ? icon(ic) : ''}${t}${dd === '1' ? icon('chevdown', 'chev') : ''}</span>`; }).join('');
    if (!b.hasAttribute('data-no-shell')) {
      b.insertAdjacentHTML('afterbegin', `
<header class="hdr" role="banner">
  <a class="burger" aria-label="Open menu">${icon('menu')}</a>
  <div class="brand">${LOGO}<span class="name">Workday VNDLY</span></div>
  <nav class="nav" aria-label="Main">${nav}</nav>
  <div class="right">
    <span class="tasks">${b.hasAttribute('data-tasks-box') ? icon('tasksbox') : icon('tasks')}${b.hasAttribute('data-notify') ? '<i class="dot"></i>' : ''}<span class="lbl">Tasks</span></span>
    <span class="user"><span class="avatar">${icon('user')}</span><span class="uname">${user}</span>${icon('chevdown', 'chev')}</span>
  </div>
</header>`);
      b.insertAdjacentHTML('beforeend', `
<footer class="ftr">
  <div class="brandline">${LOGO}<i class="bar"></i><span>Workday VNDLY</span></div>
  <div><a href="#">Privacy</a> © 2026 Workday, Inc. All rights reserved. Proprietary and Confidential - For Authorized Use Only</div>
  <div><a href="#">Workday VNDLY - Terms of Use</a></div>
</footer>
<a class="contact-tab" href="#"><span>Contact Us</span>${icon('contact')}</a>`);
    }
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { window.__ready = true; document.documentElement.dataset.ready = '1'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
