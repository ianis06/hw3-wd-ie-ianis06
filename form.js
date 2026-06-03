
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-form');
  const submissionArea = document.getElementById('submission-area');

  function clearErrors() {
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  }

  function showError(input, message) {
    const errId = (input.id || input.name) + '-error';
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function validate() {
    clearErrors();
    const data = new FormData(form);
    const errors = {};

    const name = data.get('name')?.trim();
    if (!name) errors.name = 'Please enter your name.';

    const email = data.get('email')?.trim();
    if (!email) errors.email = 'Please enter your email.';
    else {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) errors.email = 'Please enter a valid email address.';
    }

    const msg = data.get('message')?.trim();
    if (!msg) errors.msg = 'Please add a message describing the project.';

    const website = data.get('website')?.trim();
    if (website) {
      try {
        new URL(website);
      } catch (e) {
        errors.website = 'Please enter a valid URL (include https://).';
      }
    }

    return errors;
  }

  function createTableRow(table, values) {
    const tr = document.createElement('tr');
    values.forEach(v => {
      const td = document.createElement('td');
      td.textContent = v;
      tr.appendChild(td);
    });
    table.querySelector('tbody').appendChild(tr);
  }

  function ensureTable() {
    let table = document.getElementById('submission-table');
    if (table) return table;

    table = document.createElement('table');
    table.id = 'submission-table';
    table.className = 'submission-table';
    table.innerHTML = `
      <caption>Submitted project requests</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Website</th>
          <th scope="col">Message</th>
          <th scope="col">Preferred contact</th>
          <th scope="col">Subscribe</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    submissionArea.appendChild(table);
    table.tabIndex = 0;
    return table;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      for (const [k, msg] of Object.entries(errors)) {
        const input = document.getElementById(k) || form.querySelector(`[name="${k}"]`);
        if (input) showError(input, msg);
      }
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const website = fd.get('website') || '';
    const message = fd.get('message') || '';
    const contact = fd.get('contact-method') || '';
    const subscribe = fd.get('subscribe') ? 'Yes' : 'No';

    const table = ensureTable();
    createTableRow(table, [name, email, website, message, contact, subscribe]);

    form.reset();
    clearErrors();
    submissionArea.setAttribute('aria-hidden', 'false');
    submissionArea.querySelector('table').focus();
  });
});
