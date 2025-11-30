// Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // EmailJS Configuration
    const SERVICE_ID = "service_wjnqhds";
    const TEMPLATE_ID = "template_ujzunzb";

    // Test EmailJS initialization
    function testEmailJS() {
      console.log('🔧 Testing EmailJS Configuration:');
      console.log('Service ID:', SERVICE_ID);
      console.log('Template ID:', TEMPLATE_ID);
      console.log('EmailJS initialized:', typeof emailjs !== 'undefined');

      if (typeof emailjs !== 'undefined') {
        showMessage('✅ EmailJS est chargé correctement', 'info');
        setTimeout(() => {
          document.getElementById('form-message').style.display = 'none';
        }, 3000);
      }
    }

    // Enhanced EmailJS Handler
    async function handleSubmit(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const btnText = document.getElementById('btn-text');
      const btnLoading = document.getElementById('btn-loading');

      // Get form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const messageContent = document.getElementById('message').value.trim();

      const formData = {
        // Champs obligatoires pour EmailJS
        from_name: name,
        from_email: email,
        message: messageContent,
        reply_to: email,

        // Variables SPÉCIFIQUES pour votre template
        name: name,           // {{name}} dans le template
        email: email,         // {{email}} dans le template - NOUVEAU
        time: new Date().toLocaleString('fr-FR'), // {{time}} dans le template  
        message: messageContent // {{message}} dans le template
      };
      // Validation
      if (!formData.from_name || !formData.from_email || !formData.message) {
        showMessage('❌ Veuillez remplir tous les champs', 'error');
        return;
      }

      if (!isValidEmail(formData.from_email)) {
        showMessage('❌ Veuillez entrer un email valide', 'error');
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';

      try {
        console.log('🔄 Envoi du message...', formData);

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData);

        console.log('✅ Succès:', response);
        showMessage('🎉 Votre message a été envoyé avec succès! Nous vous répondrons rapidement.', 'success');
        document.getElementById('contact-form').reset();

      } catch (error) {
        console.error('❌ Erreur EmailJS:', error);

        let errorMessage = '❌ Erreur lors de l\'envoi. ';

        if (error.text) {
          console.log('Détails de l\'erreur:', error.text);

          if (error.text.includes('Invalid user id')) {
            errorMessage += 'Clé publique EmailJS incorrecte. ';
          } else if (error.text.includes('Service not found')) {
            errorMessage += 'Service ID incorrect. ';
          } else if (error.text.includes('Template not found')) {
            errorMessage += 'Template ID incorrect. ';
          } else if (error.text.includes('Forbidden')) {
            errorMessage += 'Accès refusé. Vérifiez vos identifiants. ';
          }
        }

        errorMessage += 'Vérifiez votre configuration EmailJS.';
        showMessage(errorMessage, 'error');

      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showMessage(text, type) {
      const formMessage = document.getElementById('form-message');
      formMessage.textContent = text;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = 'block';

      // Auto-hide success messages after 5 seconds
      if (type === 'success' || type === 'info') {
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function () {
      // Test EmailJS on load
      setTimeout(testEmailJS, 1000);

      // Add form submit handler
      document.getElementById('contact-form').addEventListener('submit', handleSubmit);

      // Add scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      // Observe elements for animation
      document.querySelectorAll('.about-card, .card, .skill-item, .contact-form').forEach(el => {
        observer.observe(el);
      });

      // Mobile menu toggle
      const mobileToggle = document.querySelector('.mobile-toggle');
      const navLinks = document.querySelector('.nav-links');

      if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
          navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
      }
    });

    // Alternative fallback function
    function sendEmailFallback(formData) {
      // This is a fallback that shows what data would be sent
      console.log('Fallback - Données du formulaire:', formData);
      showMessage('⚠️ Mode démo: Ce message serait normalement envoyé. Vérifiez votre configuration EmailJS.', 'info');
      return Promise.resolve({ status: 200, text: 'Demo mode' });
    }