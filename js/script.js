/* ============================================================
   Safari Trails – script.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   CONTACT FORM VALIDATION
   ---------------------------------------------------------- */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Clear previous feedback
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    // Helper to mark a field invalid
    function invalidate(field, message) {
      field.classList.add('is-invalid');
      const msg = document.createElement('div');
      msg.className = 'invalid-feedback';
      msg.textContent = message;
      field.insertAdjacentElement('afterend', msg);
      valid = false;
    }

    const name     = form.querySelector('#fullName');
    const email    = form.querySelector('#email');
    const interest = form.querySelector('#tripInterest');
    const message  = form.querySelector('#message');

    if (!name.value.trim()) {
      invalidate(name, 'Please enter your full name.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      invalidate(email, 'Please enter your email address.');
    } else if (!emailRegex.test(email.value.trim())) {
      invalidate(email, 'Please enter a valid email address.');
    }

    if (!interest.value) {
      invalidate(interest, 'Please select a trip interest.');
    }

    if (!message.value.trim()) {
      invalidate(message, 'Please tell us a little about your trip.');
    }

    if (valid) {
      form.innerHTML = `
        <div class="alert alert-success py-4 text-center" role="alert">
          <h4 class="alert-heading mb-2">Enquiry sent!</h4>
          <p class="mb-0">Thanks, ${name.value.trim().split(' ')[0]}. We'll be in touch within one business day.</p>
        </div>`;
    }
  });
})();