const API_BASE = 'http://localhost/RD_WATCH/backend/api';

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
            // Usar 'show' para consistencia con el CSS
            backToTopBtn.classList.add('show');
        } else {
            // Usar 'show' para consistencia con el CSS
            backToTopBtn.classList.remove('show');
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
        
        // ⬇️ LOGIN REAL CON BACKEND + ROLES
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
                const submitBtn = this.querySelector('.btn-login');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
                
                fetch('../../backend/api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                .then(res => res.json())
                .then(data => {
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    
                    if (!data.ok) {
                        showNotification(data.msg || 'Credenciales inválidas', true);
                        return;
                    }
                    
                    showNotification('¡Inicio de sesión exitoso!');
                    
                    // Redirección por rol
                    if (data.user && data.user.rol === 'admin') {
                        window.location.href = '/RD_WATCH/admin/admin.html';
                    } else {
                        window.location.href = '/RD_WATCH/frontend/public/user.html';
                    }
                    
                    closeModal();
                    loginForm.reset();
                    
                    // Resetear clases de validación
                    loginEmail.classList.remove('valid', 'invalid');
                    loginPassword.classList.remove('valid', 'invalid');
                })
                .catch(err => {
                    console.error(err);
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    showNotification('Error al conectar con el servidor', true);
                });
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
        
        // ⬇️ REGISTRO REAL CON BACKEND
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
                const submitBtn = this.querySelector('.btn-signup');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
                
                fetch('../../backend/api/signup.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: name,
                        email: email,
                        telefono: phone,
                        password: password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    
                    if (!data.ok) {
                        showNotification(data.msg || 'No se pudo completar el registro', true);
                        return;
                    }
                    
                    showNotification('¡Registro exitoso! Ahora puedes iniciar sesión.');
                    closeModal();
                    signupForm.reset();
                    
                    // Resetear clases de validación
                    signupName.classList.remove('valid', 'invalid');
                    signupEmail.classList.remove('valid', 'invalid');
                    signupPhone.classList.remove('valid', 'invalid');
                    signupPassword.classList.remove('valid', 'invalid');
                    signupPasswordConfirm.classList.remove('valid', 'invalid');
                    
                    // Cambiar a formulario de login
                    const switcherLogin = document.querySelector('.switcher-login');
                    if (switcherLogin) switcherLogin.click();
                })
                .catch(err => {
                    console.error(err);
                    btnText.style.opacity = '1';
                    btnLoader.style.display = 'none';
                    showNotification('Error al conectar con el servidor', true);
                });
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

    // --- Lógica del Banner de Política de Cookies ---
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const COOKIE_STORAGE_KEY = 'cookiesAccepted';

    function checkCookieConsent() {
        // Verificar si la clave de aceptación existe en localStorage
        if (!localStorage.getItem(COOKIE_STORAGE_KEY)) {
            // Si no existe, mostrar el banner
            cookieBanner.classList.add('show');
        } else {
            // Si existe, asegurarse de que esté oculto
            cookieBanner.classList.remove('show');
        }
    }

    function acceptCookies() {
        // Establecer la clave en localStorage para recordar la preferencia del usuario
        localStorage.setItem(COOKIE_STORAGE_KEY, 'true');
        
        // Ocultar el banner
        cookieBanner.classList.remove('show');
    }

    // Inicializar la verificación del consentimiento de cookies
    checkCookieConsent();

    // Event listener para el botón de aceptar
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', acceptCookies);
    }
    // --- Fin Lógica del Banner de Política de Cookies ---
});


// =========================================================
// --- LÓGICA DE COMERCIO, CARRITO Y CHECKOUT (CORREGIDO) ---
// =========================================================

// Configuración API
const API_BASE_SHOP = 'http://localhost/RD_WATCH/backend/api'; 

// Estado Global
let productsData = []; 
let cart = [];         

// --- UTILIDADES ---
function formatPrice(amount) {
    return Number(amount).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// ==============================================
// 1. FUNCIONES GLOBALES (Para que el HTML las vea)
// ==============================================

// Hacemos las funciones accesibles globalmente asignándolas a 'window'
window.addToCart = async function(productId, quantity) {
    // 1. Validar stock localmente antes de llamar a la API
    const product = productsData.find(p => p.id === productId);
    if (product && product.stock < quantity) {
        showNotification('Stock insuficiente', true);
        return;
    }

    try {
        const res = await fetch(`${API_BASE_SHOP}/carrito.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_producto: productId, cantidad: quantity })
        });

        // Si no está logueado (401)
        if (res.status === 401) {
            showNotification('🔒 Inicia sesión para comprar', true);
            // Abrir modal de login (si existe la lógica en tu script.js)
            const loginSwitcher = document.querySelector('.switcher-login');
            const authModal = document.getElementById('auth-modal');
            if(authModal) {
                authModal.style.display = 'flex'; // Forzar display flex
                authModal.classList.add('show');  // Clase de animación
            }
            if(loginSwitcher) loginSwitcher.click();
            return;
        }

        const data = await res.json();

        if (data.ok) {
            showNotification('Producto agregado al carrito');
            await loadCart(); // Recargar carrito
            window.toggleCart(true); // Abrir sidebar
        } else {
            showNotification(data.msg || 'Error al agregar', true);
        }
    } catch (error) {
        console.error(error);
        showNotification('Error de conexión', true);
    }
};

window.removeFromCart = async function(productId) {
    if(!confirm("¿Eliminar este producto?")) return;
    try {
        const res = await fetch(`${API_BASE_SHOP}/carrito.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_producto: productId })
        });
        const data = await res.json();
        if (data.ok) {
            showNotification('Eliminado');
            loadCart();
        }
    } catch (error) { console.error(error); }
};

window.updateCartQuantity = async function(productId, newQuantity) {
    if (newQuantity < 1) return;
    try {
        const res = await fetch(`${API_BASE_SHOP}/carrito.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_producto: productId, cantidad: newQuantity })
        });
        const data = await res.json();
        if (data.ok) loadCart();
        else showNotification(data.msg, true);
    } catch (error) { console.error(error); }
};

window.toggleCart = function(forceOpen = false) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar && overlay) {
        if (forceOpen) {
            sidebar.classList.add('active');
            overlay.style.display = 'block';
        } else {
            sidebar.classList.toggle('active');
            overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        }
        
        // Si se abre, recargamos datos por si acaso
        if(sidebar.classList.contains('active')) loadCart();
    }
};

window.procedeToCheckout = function() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', true);
        return;
    }
    window.toggleCart(false); // Cerrar sidebar
    
    const shopSection = document.querySelector('.shop-section');
    const checkoutSection = document.getElementById('checkout-section');
    
    if(shopSection) shopSection.classList.add('hidden-section');
    if(checkoutSection) checkoutSection.classList.remove('hidden-section');
    
    // Ocultar botón flotante
    const floatBtn = document.getElementById('floating-cart-btn');
    if(floatBtn) floatBtn.style.display = 'none';

    updateCheckoutSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.backToCart = function() {
    const shopSection = document.querySelector('.shop-section');
    const checkoutSection = document.getElementById('checkout-section');
    
    if(checkoutSection) checkoutSection.classList.add('hidden-section');
    if(shopSection) shopSection.classList.remove('hidden-section');
    
    const floatBtn = document.getElementById('floating-cart-btn');
    if(floatBtn) floatBtn.style.display = 'flex';
    
    window.toggleCart(true);
};

window.applyFilters = function() {
    if(productsData.length === 0) return;

    // Obtener valores
    const activeCategoryLink = document.querySelector('#category-filters .active');
    // Normalizamos texto (minúsculas y sin espacios extra) para comparar mejor
    const activeCategory = activeCategoryLink ? activeCategoryLink.getAttribute('data-filter').toLowerCase() : 'all';
    
    const brandSelect = document.getElementById('brand-filter');
    const selectedBrand = brandSelect ? brandSelect.value.toLowerCase() : 'all';
    
    const priceRange = document.getElementById('price-range');
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 10000000;
    
    const sortOrderSelect = document.getElementById('sort-order');
    const sortOrder = sortOrderSelect ? sortOrderSelect.value : 'default';

    // Filtrar
    let filtered = productsData.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        
        // Comparación flexible
        const matchCat = activeCategory === 'all' || cat.includes(activeCategory);
        const matchBrand = selectedBrand === 'all' || brand === selectedBrand;
        const matchPrice = p.price <= maxPrice;
        
        return matchCat && matchBrand && matchPrice;
    });

    // Ordenar
    filtered.sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
        return 0; 
    });

    renderProducts(filtered);
    
    // Actualizar contadores
    const sortInfo = document.querySelector('.sort-bar p');
    if(sortInfo) sortInfo.textContent = `Mostrando ${filtered.length} productos`;
    
    // Actualizar etiqueta de precio
    const priceValue = document.getElementById('price-value');
    if(priceValue) priceValue.textContent = maxPrice;
};

// ==============================================
// 2. LÓGICA INTERNA (Carga de datos)
// ==============================================

async function loadProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    try {
        productList.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
        
        const res = await fetch(`${API_BASE_SHOP}/productos.php`);
        const data = await res.json();

        if (data.ok) {
            productsData = data.productos.map(p => ({
                id: p.id_producto,
                name: p.nom_producto,
                price: parseFloat(p.precio),
                stock: parseInt(p.stock),
                // Aseguramos que siempre haya string para evitar error en toLowerCase
                category: String(p.nom_categoria || 'General'), 
                brand: String(p.nom_marca || 'General'),
                img: p.url_imagen || 'images/default-watch.png',
                badge: (p.stock < 5 && p.stock > 0) ? '¡Pocas Unidades!' : ''
            }));
            
            // Llenar el filtro de marcas dinámicamente con lo que hay en BD
            populateBrandFilter(productsData);
            
            // Renderizar inicial
            renderProducts(productsData);
            
            const sortInfo = document.querySelector('.sort-bar p');
            if(sortInfo) sortInfo.textContent = `Mostrando ${productsData.length} productos`;
        } else {
            productList.innerHTML = '<p style="grid-column:1/-1;text-align:center">No se pudo cargar el catálogo.</p>';
        }
    } catch (error) {
        console.error(error);
        productList.innerHTML = '<p style="grid-column:1/-1;text-align:center">Error de conexión.</p>';
    }
}

// Función auxiliar para llenar el select de marcas automáticamente
function populateBrandFilter(products) {
    const brandSelect = document.getElementById('brand-filter');
    if (!brandSelect) return;

    // Obtener marcas únicas
    const brands = [...new Set(products.map(p => p.brand))].sort();
    
    // Mantener la opción "Todas" y agregar las demás
    brandSelect.innerHTML = '<option value="all">Todas las Marcas</option>';
    
    brands.forEach(b => {
        const option = document.createElement('option');
        option.value = b; // El valor será el nombre exacto
        option.textContent = b;
        brandSelect.appendChild(option);
    });
}

function renderProducts(list) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    if (list.length === 0) {
        productList.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:20px;">No se encontraron productos.</p>';
        return;
    }

    productList.innerHTML = list.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.img}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/280x250?text=Sin+Imagen'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-details">
                <p class="product-category">${product.brand} - ${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                
                <div class="product-actions">
                    ${product.stock > 0 
                        ? `<button class="button button-primary" onclick="window.addToCart(${product.id}, 1)">
                             <i class="fas fa-cart-plus"></i> Añadir
                           </button>`
                        : `<button class="button button-secondary" disabled style="background:#ccc; cursor:not-allowed">
                             Agotado
                           </button>`
                    }
                    <button class="button button-outline"><i class="fas fa-search"></i> Ver</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function loadCart() {
    try {
        const res = await fetch(`${API_BASE_SHOP}/carrito.php`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await res.json();

        if (data.ok) {
            cart = data.items.map(item => ({
                id: item.id_producto,
                name: item.nom_producto,
                price: parseFloat(item.precio),
                img: item.url_imagen || 'https://via.placeholder.com/80',
                quantity: item.cantidad,
                stock: item.stock
            }));
            updateCartDisplay();
        }
    } catch (error) { console.error(error); }
}

function updateCartDisplay() {
    const list = document.getElementById('cart-items-list');
    const countSpan = document.getElementById('cart-item-count');
    const totalSpan = document.getElementById('cart-total');
    const subtotalSpan = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('btn-procede-checkout');
    
    if (!list) return;

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const SHIPPING = 15.00;

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-cart-message">Carrito vacío</p>';
        if(checkoutBtn) checkoutBtn.disabled = true;
        if(countSpan) countSpan.textContent = '0';
        if(totalSpan) totalSpan.textContent = formatPrice(0);
    } else {
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/80'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button onclick="window.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="window.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="window.removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
        
        if(checkoutBtn) checkoutBtn.disabled = false;
        if(countSpan) countSpan.textContent = totalItems;
        if(subtotalSpan) subtotalSpan.textContent = formatPrice(subtotal);
        if(totalSpan) totalSpan.textContent = formatPrice(subtotal + SHIPPING);
    }
}

function updateCheckoutSummary() {
    const list = document.getElementById('checkout-order-summary');
    if(!list) return;
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const SHIPPING = 15.00;
    
    list.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/80'">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
        </div>
    `).join('');
    
    document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkout-final-total').textContent = formatPrice(subtotal + SHIPPING);
    document.getElementById('payment-amount').textContent = formatPrice(subtotal + SHIPPING);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    // Cargar si estamos en comercio
    if(document.getElementById('product-list')) {
        loadProducts();
        
        // Listeners Filtros
        document.getElementById('brand-filter').addEventListener('change', window.applyFilters);
        document.getElementById('price-range').addEventListener('input', window.applyFilters);
        document.getElementById('sort-order').addEventListener('change', window.applyFilters);
        
        const catLinks = document.querySelectorAll('#category-filters a');
        catLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                catLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                window.applyFilters();
            });
        });
    }
    
    // Cargar carrito siempre
    loadCart();
});