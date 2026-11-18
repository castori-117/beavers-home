/* Sends a form without a backend of our own: to PUBLIC_FORM_ENDPOINT when set (the form's action),
   otherwise it opens an email to us with the fields already written. */
export async function sendForm(form: HTMLFormElement): Promise<boolean> {
  const action = form.getAttribute('action') || '';
  const data = new FormData(form);
  if (/^https?:\/\//.test(action)) {
    try {
      const response = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      return response.ok;
    } catch {
      return false;
    }
  }
  if (action.startsWith('mailto:')) {
    const lines = [...data.entries()].filter(([key]) => !['form', 'lang'].includes(key)).map(([key, value]) => `${key}: ${value}`);
    const subject = form.dataset.subject || '';
    window.location.href = `${action}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    return true;
  }
  return false;
}
