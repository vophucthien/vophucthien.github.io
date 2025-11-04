document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  const noteTextarea = document.getElementById('note-content');
  const notesList = document.getElementById('notes-list');
  const noteFeedback = document.getElementById('note-feedback');

  if (noteForm && noteTextarea && notesList && noteFeedback) {
    noteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const noteText = noteTextarea.value.trim();

      if (!noteText) {
        noteFeedback.textContent = 'Please enter a note before clicking "Add Note".';
        noteTextarea.focus();
        return;
      }

      const noteItem = document.createElement('li');
      noteItem.className = 'note-item';

      const noteBody = document.createElement('p');
      noteBody.textContent = noteText;

      const noteMeta = document.createElement('span');
      noteMeta.className = 'note-meta';
      noteMeta.textContent = `Added on ${new Date().toLocaleString()}`;

      noteItem.append(noteBody, noteMeta);
      notesList.prepend(noteItem);

      noteTextarea.value = '';
      noteTextarea.focus();
      noteFeedback.textContent = 'Note added!';
      window.setTimeout(() => {
        noteFeedback.textContent = '';
      }, 2000);
    });
  }

  const contactForm = document.getElementById('contact-form');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm && contactName && contactEmail && contactMessage && contactFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = contactName.value.trim();
      const email = contactEmail.value.trim();
      const message = contactMessage.value.trim();

      if (!name || !email || !message) {
        contactFeedback.textContent = 'Please fill out all fields before sending.';
        return;
      }

      contactFeedback.textContent = `Thanks, ${name}! I'll get back to you soon.`;
      contactForm.reset();
      window.setTimeout(() => {
        contactFeedback.textContent = '';
      }, 3000);
    });
  }
});
