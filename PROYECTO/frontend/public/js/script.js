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


// --- LÓGICA DE COMERCIO, CARRITO Y CHECKOUT ---


// Datos Simulados de Productos (Basado en tab_Productos)
const productsData = [
    { id: 1, name: "Rolex Submariner", price: 8500.00, stock: 5, category: "Relojes", brand: "Rolex", img: 'https://via.placeholder.com/280x250/B8860B/FFFFFF?text=Rolex+Submariner', badge: 'Lujo' },
    { id: 2, name: "Correa Cuero Clásico 20mm", price: 55.00, stock: 20, category: "Accesorios", brand: "Citizen", img: 'https://via.placeholder.com/280x250/556b2f/FFFFFF?text=Correa+20mm', badge: 'Nuevo' },
    { id: 3, name: "Omega Speedmaster Moonwatch", price: 6200.00, stock: 2, category: "Relojes", brand: "Omega", img: 'https://via.placeholder.com/280x250/1a1a1a/D4AF37?text=Omega+Speedmaster', badge: 'Vendido' },
    { id: 4, name: "Kit de Herramientas Básico", price: 120.00, stock: 15, category: "Repuestos", brand: "Otro", img: 'https://via.placeholder.com/280x250/333/FFFFFF?text=Kit+Herramientas', badge: '' },
    { id: 5, name: "Engranaje Calibre 1570", price: 250.00, stock: 10, category: "Repuestos", brand: "Rolex", img: 'https://via.placeholder.com/280x250/996515/FFFFFF?text=Engranaje+1570', badge: 'Escaso' },
    { id: 6, name: "Citizen Eco-Drive Elegance", price: 350.00, stock: 12, category: "Relojes", brand: "Citizen", img: 'https://via.placeholder.com/280x250/666/FFFFFF?text=Citizen+Eco', badge: '' },
];

let cart = JSON.parse(localStorage.getItem('rdwatch_cart')) || [];
const SHIPPING_COST = 15.00; // Costo de envío fijo


// --- UTILIDADES ---

/**
 * Función para formatear precios.
 * @param {number} amount
 * @returns {string} Precio formateado.
 */
function formatPrice(amount) {
    return amount.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'USD' // Usamos USD como ejemplo. Cambiar a COP si es necesario.
    });
}


// --- LÓGICA DE PRODUCTOS ---

/**
 * Carga y renderiza los productos en la cuadrícula.
 * @param {Array} products Lista de productos a renderizar.
 */
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}">
            <div class="product-image-container">
                <img src="${product.img}" alt="${product.name}" class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-details">
                <p class="product-category">${product.category} - ${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <div class="product-actions">
                    <button class="button button-primary" onclick="addToCart(${product.id}, 1)">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                    <a href="#" class="button button-outline"><i class="fas fa-search"></i> Ver</a>
                </div>
                <p style="font-size:0.8rem; color:var(--text-light); margin-top:10px;">Stock: ${product.stock > 0 ? product.stock : 'Agotado'}</p>
            </div>
        </div>
    `).join('');
}

// Lógica de filtrado (simulada)
function applyFilters() {
    const activeCategory = document.querySelector('#category-filters .active').getAttribute('data-filter');
    const selectedBrand = document.getElementById('brand-filter').value;
    const maxPrice = parseFloat(document.getElementById('price-range').value);
    const sortOrder = document.getElementById('sort-order').value;
    
    let filtered = productsData.filter(product => {
        const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
        const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && brandMatch && priceMatch;
    });
    
    // Simular ordenamiento
    filtered.sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
    });

    renderProducts(filtered);
    // Simular contador de productos
    document.querySelector('.sort-bar p').textContent = `Mostrando ${filtered.length} de ${productsData.length} productos`;

    showNotification(`Filtros aplicados. Resultados: ${filtered.length}`, false);
}

// Event Listeners para filtros
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la lista de productos
    if (document.getElementById('product-list')) {
        renderProducts(productsData);

        // Lógica de rango de precio
        const priceRange = document.getElementById('price-range');
        const priceValue = document.getElementById('price-value');
        if (priceRange) {
            priceRange.addEventListener('input', () => {
                priceValue.textContent = priceRange.value;
            });
            priceRange.addEventListener('change', applyFilters); // Aplicar al soltar
        }

        // Lógica de categorías
        document.querySelectorAll('#category-filters a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('#category-filters a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                applyFilters();
            });
        });
        
        // Lógica de ordenamiento y marcas
        document.getElementById('brand-filter')?.addEventListener('change', applyFilters);
        document.getElementById('sort-order')?.addEventListener('change', applyFilters);

        updateCartDisplay(); // Cargar el carrito al iniciar
    }
});


// --- LÓGICA DEL CARRITO ---

/**
 * Añade un producto al carrito.
 * @param {number} productId ID del producto.
 * @param {number} quantity Cantidad a añadir.
 */
function addToCart(productId, quantity) {
    const product = productsData.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
        showNotification('Stock insuficiente o producto no encontrado.', true);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        // Validación de stock antes de actualizar
        if (cartItem.quantity + quantity > product.stock) {
            showNotification(`Solo quedan ${product.stock} unidades en stock.`, true);
            return;
        }
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: quantity,
            stock: product.stock // Almacenar stock máximo
        });
    }

    // Guarda y actualiza la vista
    saveCart();
    updateCartDisplay();
    showNotification(`"${product.name}" añadido al carrito.`, false);
}

/**
 * Elimina completamente un ítem del carrito.
 * @param {number} productId ID del producto a eliminar.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('Producto eliminado del carrito.', false);
}

/**
 * Actualiza la cantidad de un ítem en el carrito.
 * @param {number} productId ID del producto.
 * @param {number} newQuantity Nueva cantidad.
 */
function updateCartItemQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.id === productId);
    const product = productsData.find(p => p.id === productId);

    if (cartItem && product) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity < 1) newQuantity = 1;
        if (newQuantity > product.stock) newQuantity = product.stock;

        cartItem.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

/**
 * Guarda el carrito en localStorage.
 */
function saveCart() {
    localStorage.setItem('rdwatch_cart', JSON.stringify(cart));
}

/**
 * Abre o cierra la barra lateral del carrito.
 */
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }
}

/**
 * Renderiza el contenido del carrito (ítems, totales y contadores).
 */
function updateCartDisplay() {
    const list = document.getElementById('cart-items-list');
    const countSpan = document.getElementById('cart-item-count');
    const subtotalSpan = document.getElementById('cart-subtotal');
    const totalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('btn-procede-checkout');
    
    if (!list || !countSpan) return;

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Renderizar lista de ítems
    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-cart-message">El carrito está vacío.</p>';
        checkoutBtn.disabled = true;
    } else {
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="${item.stock}" 
                                onchange="updateCartItemQuantity(${item.id}, this.value)">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Actualizar resumen y contador
    countSpan.textContent = totalItems;
    subtotalSpan.textContent = formatPrice(subtotal);
    totalSpan.textContent = formatPrice(subtotal + SHIPPING_COST);
}


// --- LÓGICA DE CHECKOUT Y PAGO (SIMULACIÓN) ---

/**
 * Oculta el carrito y muestra la sección de checkout.
 */
function procedeToCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío.', true);
        return;
    }

    toggleCart(); // Cierra el carrito
    document.querySelector('.shop-section').classList.add('hidden-section');
    document.getElementById('checkout-section').classList.remove('hidden-section');
    document.getElementById('floating-cart-btn').style.display = 'none';
    
    updateCheckoutSummary(); // Actualiza el resumen final
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir al inicio de la página

}

/**
 * Vuelve de la pasarela de pago al carrito (cierra checkout y abre el carrito).
 */
function backToCart() {
    document.getElementById('checkout-section').classList.add('hidden-section');
    document.querySelector('.shop-section').classList.remove('hidden-section');
    document.getElementById('floating-cart-btn').style.display = 'flex';
    toggleCart(); // Abre el carrito
}

/**
 * Actualiza el resumen de la orden en la página de Checkout.
 */
function updateCheckoutSummary() {
    const summaryList = document.getElementById('checkout-order-summary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalConEnvio = subtotal + SHIPPING_COST;

    // Actualizar lista de ítems
    summaryList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
        </div>
    `).join('');

    // Actualizar totales
    document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkout-shipping').textContent = formatPrice(SHIPPING_COST);
    document.getElementById('checkout-final-total').textContent = formatPrice(totalConEnvio);
    document.getElementById('payment-amount').textContent = formatPrice(totalConEnvio);
}

/**
 * Simulación de procesamiento de pago.
 */
document.getElementById('payment-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulación del botón de carga
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    btnText.style.opacity = '0';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;

    // Simular llamada a pasarela de pago y backend
    setTimeout(() => {
        btnText.style.opacity = '1';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        // Simular éxito
        const totalPagado = document.getElementById('checkout-final-total').textContent;
        showNotification(`✅ Pago de ${totalPagado} procesado con éxito. ¡Tu orden ha sido confirmada!`);
        
        // Limpiar carrito y resetear vista
        cart = [];
        saveCart();
        updateCartDisplay();

        // Ocultar checkout y mostrar tienda
        document.getElementById('checkout-section').classList.add('hidden-section');
        document.querySelector('.shop-section').classList.remove('hidden-section');
        document.getElementById('floating-cart-btn').style.display = 'flex';

    }, 3000);
});
