document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Simular carga de contenido
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#auth-modal') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal de autenticación
    const modal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const switchers = document.querySelectorAll('.switcher');
    
    function openModal() {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    loginBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cambiar entre formularios de login/registro
    switchers.forEach(switcher => {
        switcher.addEventListener('click', function() {
            const parent = this.parentElement;
            
            document.querySelectorAll('.form-wrapper').forEach(wrapper => {
                wrapper.classList.remove('is-active');
            });
            
            parent.classList.add('is-active');
            
            // Actualizar clases activas en los switchers
            switchers.forEach(s => s.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
    
    // Validación de formularios
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Función para mostrar notificación
    function showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification';
        
        if (isError) {
            notification.classList.add('error');
            notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        } else {
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Validación de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Validación de contraseña
    function validatePassword(password) {
        // Al menos 8 caracteres
        if (password.length < 8) {
            return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
        }
        
        // Al menos una letra mayúscula
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'La contraseña debe contener al menos una letra mayúscula' };
        }
        
        // Al menos una letra minúscula
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'La contraseña debe contener al menos una letra minúscula' };
        }
        
        // Al menos un número
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'La contraseña debe contener al menos un número' };
        }
        
        // Al menos un carácter especial
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { valid: false, message: 'La contraseña debe contener al menos un carácter especial' };
        }
        
        return { valid: true, message: 'Contraseña válida' };
    }
    
    // Mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Indicador de fuerza de contraseña
    const passwordInput = document.getElementById('signup-password');
    const strengthText = document.getElementById('strength-text');
    const strengthBars = document.querySelectorAll('.strength-bar');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Resetear clases
            this.parentElement.parentElement.classList.remove(
                'password-weak', 'password-medium', 'password-strong', 'password-very-strong'
            );
            
            // Aplicar clases según la fuerza
            if (password.length > 0) {
                this.parentElement.parentElement.classList.add(`password-${strength.level}`);
                strengthText.textContent = strength.text;
            } else {
                strengthText.textContent = 'Débil';
            }
        });
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Longitud
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Caracteres mezclados
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength <= 2) {
            return { level: 'weak', text: 'Débil' };
        } else if (strength <= 4) {
            return { level: 'medium', text: 'Media' };
        } else if (strength <= 6) {
            return { level: 'strong', text: 'Fuerte' };
        } else {
            return { level: 'very-strong', text: 'Muy fuerte' };
        }
    }
    
    // Validación en tiempo real para formulario de login
    if (loginForm) {
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');
        
        loginEmail.addEventListener('input', function() {
            const errorElement = this.nextElementSibling;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (!validateEmail(this.value.trim())) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'Por favor ingresa un correo electrónico válido';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        loginPassword.addEventListener('input', function() {
            const errorElement = this.parentElement.nextElementSibling;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (this.value.length < 8) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();
            let isValid = true;
            
            // Validar email
            if (email === '') {
                loginEmail.classList.add('invalid');
                loginEmail.nextElementSibling.textContent = 'El correo electrónico es requerido';
                loginEmail.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (!validateEmail(email)) {
                loginEmail.classList.add('invalid');
                loginEmail.nextElementSibling.textContent = 'Por favor ingresa un correo electrónico válido';
                loginEmail.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar contraseña
            if (password === '') {
                loginPassword.classList.add('invalid');
                loginPassword.parentElement.nextElementSibling.textContent = 'La contraseña es requerida';
                loginPassword.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (password.length < 8) {
                loginPassword.classList.add('invalid');
                loginPassword.parentElement.nextElementSibling.textContent = 'La contraseña debe tener al menos 8 caracteres';
                loginPassword.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío del formulario
                const submitBtn = this.querySelector('.btn-login');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
                
                setTimeout(() => {
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    
                    showNotification('¡Inicio de sesión exitoso!');
                    closeModal();
                    loginForm.reset();
                    
                    // Resetear clases de validación
                    loginEmail.classList.remove('valid', 'invalid');
                    loginPassword.classList.remove('valid', 'invalid');
                }, 2000);
            }
        });
    }
    
    // Validación para formulario de registro
    if (signupForm) {
        const signupName = document.getElementById('signup-name');
        const signupEmail = document.getElementById('signup-email');
        const signupPhone = document.getElementById('signup-phone');
        const signupPassword = document.getElementById('signup-password');
        const signupPasswordConfirm = document.getElementById('signup-password-confirm');
        
        // Validación en tiempo real
        signupName.addEventListener('input', function() {
            const errorElement = this.nextElementSibling;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (this.value.trim().length < 3) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'El nombre debe tener al menos 3 caracteres';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        signupEmail.addEventListener('input', function() {
            const errorElement = this.nextElementSibling;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (!validateEmail(this.value.trim())) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'Por favor ingresa un correo electrónico válido';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        signupPhone.addEventListener('input', function() {
            // Validación básica de teléfono
            const errorElement = this.nextElementSibling;
            const phoneRegex = /^[0-9\s+-]+$/;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (!phoneRegex.test(this.value.trim())) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'Por favor ingresa un número de teléfono válido';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        signupPassword.addEventListener('input', function() {
            const errorElement = this.parentElement.nextElementSibling;
            const validation = validatePassword(this.value.trim());
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (!validation.valid) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = validation.message;
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        signupPasswordConfirm.addEventListener('input', function() {
            const errorElement = this.parentElement.nextElementSibling;
            
            if (this.value.trim() === '') {
                this.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            } else if (this.value.trim() !== signupPassword.value.trim()) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = 'Las contraseñas no coinciden';
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        });
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = signupName.value.trim();
            const email = signupEmail.value.trim();
            const phone = signupPhone.value.trim();
            const password = signupPassword.value.trim();
            const passwordConfirm = signupPasswordConfirm.value.trim();
            let isValid = true;
            
            // Validar nombre
            if (name === '') {
                signupName.classList.add('invalid');
                signupName.nextElementSibling.textContent = 'El nombre completo es requerido';
                signupName.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (name.length < 3) {
                signupName.classList.add('invalid');
                signupName.nextElementSibling.textContent = 'El nombre debe tener al menos 3 caracteres';
                signupName.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar email
            if (email === '') {
                signupEmail.classList.add('invalid');
                signupEmail.nextElementSibling.textContent = 'El correo electrónico es requerido';
                signupEmail.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (!validateEmail(email)) {
                signupEmail.classList.add('invalid');
                signupEmail.nextElementSibling.textContent = 'Por favor ingresa un correo electrónico válido';
                signupEmail.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar teléfono (opcional)
            if (phone !== '' && !/^[0-9\s+-]+$/.test(phone)) {
                signupPhone.classList.add('invalid');
                signupPhone.nextElementSibling.textContent = 'Por favor ingresa un número de teléfono válido';
                signupPhone.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar contraseña
            const passwordValidation = validatePassword(password);
            if (password === '') {
                signupPassword.classList.add('invalid');
                signupPassword.parentElement.nextElementSibling.textContent = 'La contraseña es requerida';
                signupPassword.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (!passwordValidation.valid) {
                signupPassword.classList.add('invalid');
                signupPassword.parentElement.nextElementSibling.textContent = passwordValidation.message;
                signupPassword.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar confirmación de contraseña
            if (passwordConfirm === '') {
                signupPasswordConfirm.classList.add('invalid');
                signupPasswordConfirm.parentElement.nextElementSibling.textContent = 'Por favor confirma tu contraseña';
                signupPasswordConfirm.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (passwordConfirm !== password) {
                signupPasswordConfirm.classList.add('invalid');
                signupPasswordConfirm.parentElement.nextElementSibling.textContent = 'Las contraseñas no coinciden';
                signupPasswordConfirm.parentElement.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validar términos y condiciones
            const termsCheckbox = this.querySelector('input[type="checkbox"]');
            if (!termsCheckbox.checked) {
                showNotification('Debes aceptar los términos y condiciones', true);
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío del formulario
                const submitBtn = this.querySelector('.btn-signup');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
                
                setTimeout(() => {
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    
                    showNotification('¡Registro exitoso! Por favor verifica tu correo electrónico');
                    closeModal();
                    signupForm.reset();
                    
                    // Resetear clases de validación
                    signupName.classList.remove('valid', 'invalid');
                    signupEmail.classList.remove('valid', 'invalid');
                    signupPhone.classList.remove('valid', 'invalid');
                    signupPassword.classList.remove('valid', 'invalid');
                    signupPasswordConfirm.classList.remove('valid', 'invalid');
                    
                    // Cambiar a formulario de login
                    document.querySelector('.switcher-login').click();
                }, 2000);
            }
        });
    }
    
    // Animación de números en estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    const duration = 2000; // Duración en milisegundos
                    const step = Math.floor(duration / count);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += Math.ceil(count / (duration / 100));
                        if (current >= count) {
                            current = count;
                            clearInterval(timer);
                        }
                        target.textContent = current;
                    }, 10);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Galería interactiva
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryDots = document.querySelector('.gallery-dots');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    if (galleryItems.length > 0) {
        // Crear puntos de navegación
        galleryItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            galleryDots.appendChild(dot);
        });
        
        let currentIndex = 0;
        const dots = document.querySelectorAll('.gallery-dot');
        
        function goToSlide(index) {
            // Asegurarse de que el índice esté dentro de los límites
            if (index < 0) {
                index = galleryItems.length - 1;
            } else if (index >= galleryItems.length) {
                index = 0;
            }
            
            // Actualizar índice actual
            currentIndex = index;
            
            // Mover el slider
            document.querySelector('.gallery-grid').style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar puntos activos
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Event listeners para botones de navegación
        if (galleryPrev && galleryNext) {
            galleryPrev.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
            
            galleryNext.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }
        
        // Autoplay para la galería
        let autoplay = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Pausar autoplay al interactuar
        const galleryContainer = document.querySelector('.gallery-grid').parentElement;
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            // Validar campos requeridos
            requiredFields.forEach(field => {
                const errorElement = field.nextElementSibling;
                
                if (field.value.trim() === '') {
                    field.classList.add('invalid');
                    errorElement.textContent = 'Este campo es requerido';
                    errorElement.style.display = 'block';
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                    errorElement.style.display = 'none';
                }
            });
            
            // Validar email si está presente
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim() !== '' && !validateEmail(emailField.value.trim())) {
                emailField.classList.add('invalid');
                emailField.nextElementSibling.textContent = 'Por favor ingresa un correo electrónico válido';
                emailField.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
                
                // Simular envío del formulario
                setTimeout(() => {
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    
                    showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                    
                    // Resetear clases de validación
                    requiredFields.forEach(field => {
                        field.classList.remove('valid', 'invalid');
                    });
                }, 2000);
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                showNotification('Por favor ingresa tu correo electrónico', true);
            } else if (!validateEmail(emailInput.value.trim())) {
                showNotification('Por favor ingresa un correo electrónico válido', true);
            } else {
                showNotification('¡Gracias por suscribirte a nuestro newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`Redirigiendo a inicio de sesión con ${platform}...`);
        });
    });
});