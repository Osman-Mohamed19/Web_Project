/* ============================================================
   Safari Trails – script.js
   Main JavaScript file for form validation and interactivity
   ============================================================ */

'use strict'; // catches common coding mistakes and unsafe actions

/* ----------------------------------------------------------
   CONTACT FORM VALIDATION
   Checks all fields before the form is submitted
   ---------------------------------------------------------- */
(function initContactForm() {

  // Find the contact form on the page
  const form = document.querySelector('.contact-form');

  // If there is no form on this page, stop here
  if (!form) return;

  // Listen for when the user clicks the submit button
  form.addEventListener('submit', function (e) {

    // Stop the form from reloading the page
    e.preventDefault();

    // Assume the form is valid until a problem is found
    let valid = true;

    // Clear any error messages from a previous submit attempt
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    // Helper function — marks a field red and shows an error message below it
    function invalidate(field, message) {
      field.classList.add('is-invalid');       // adds red border
      const msg = document.createElement('div');
      msg.className = 'invalid-feedback';      // Bootstrap error text style
      msg.textContent = message;
      field.insertAdjacentElement('afterend', msg); // places message below the field
      valid = false;                           // marks the form as invalid
    }

    // Grab each form field by its ID
    const name     = form.querySelector('#fullName');
    const email    = form.querySelector('#email');
    const interest = form.querySelector('#tripInterest');
    const message  = form.querySelector('#message');

    // Check 1: Name must not be empty
    if (!name.value.trim()) {
      invalidate(name, 'Please enter your full name.');
    }

    // Check 2: Email must not be empty and must match a valid email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email format check
    if (!email.value.trim()) {
      invalidate(email, 'Please enter your email address.');
    } else if (!emailRegex.test(email.value.trim())) {
      invalidate(email, 'Please enter a valid email address.');
    }

    // Check 3: User must pick a trip interest from the dropdown
    if (!interest.value) {
      invalidate(interest, 'Please select a trip interest.');
    }

    // Check 4: Message field must not be empty
    if (!message.value.trim()) {
      invalidate(message, 'Please tell us a little about your trip.');
    }

    // If all checks passed, replace the form with a success message
    if (valid) {
      form.innerHTML = `
        <div class="alert alert-success py-4 text-center" role="alert">
          <h4 class="alert-heading mb-2">Enquiry sent!</h4>
          <p class="mb-0">Thanks, ${name.value.trim().split(' ')[0]}. We'll be in touch within one business day.</p>
        </div>`;
    }

  });

})(); // runs the function immediately when the script loads