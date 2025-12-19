// contact.js - MongoDB Backend Integration

// Backend API URL - Change this to your deployed backend URL
const API_URL = 'http://localhost:5000/api/contact';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !message) {
                showError('Please fill in all required fields.');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            // Prepare form data
            const formData = {
                name,
                email,
                subject: subject || 'No subject',
                message
            };

            // Submit to backend
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Success
                    contactForm.reset();
                    document.getElementById('char-count').textContent = '0';
                    showSuccess('Thank you! Your message has been sent successfully.');

                    console.log('Contact submitted:', data.data);
                } else {
                    // Error from backend
                    showError(data.error || 'Failed to send message. Please try again.');
                }

            } catch (error) {
                console.error('Error submitting contact form:', error);
                showError('Network error. Please check if the backend server is running.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showSuccess(message) {
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.classList.add('show');
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            alert(message);
        }
    }

    function showError(message) {
        alert(message);
    }
});
