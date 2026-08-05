/* ==========================================================
   رويال موتورز دبي - ملف الجافاسكريبت
   Royal Motors Dubai - JavaScript File
   ========================================================== */

// ====== 1. شاشة التحميل ======
window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hide');
    }, 2000);
});

// ====== 2. مؤشر الماوس المخصص ======
var cursor = document.getElementById('cursor-glow');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

var clickableElements = document.querySelectorAll('a, button, .btn, .car-card, .faq-item, .filter-group input, .filter-group select, .gallery-item, .service-card, .feature-card, .financing-card');

clickableElements.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        cursor.style.width = '60px';
        cursor.style.height = '60px';
    });
    el.addEventListener('mouseleave', function() {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
    });
});

// ====== 3. شريط التقدم أثناء التمرير ======
window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollY / height) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    
    // زر العودة للأعلى
    var backTop = document.getElementById('back-top');
    if (scrollY > 500) {
        backTop.classList.add('show');
    } else {
        backTop.classList.remove('show');
    }
});

// ====== 4. زر العودة للأعلى ======
document.getElementById('back-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====== 5. Scroll Reveal (ظهور العناصر عند التمرير) ======
var revealElements = document.querySelectorAll('.reveal');

var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(function(el) {
    revealObserver.observe(el);
});

// ====== 6. الأسئلة الشائعة (FAQ) - Toggle ======
var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    var icon = question.querySelector('i');
    
    question.addEventListener('click', function() {
        // إغلاق جميع الأسئلة المفتوحة الأخرى
        faqItems.forEach(function(otherItem) {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                var otherIcon = otherItem.querySelector('.faq-question i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-plus';
                }
            }
        });
        
        // تبديل حالة السؤال الحالي
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            icon.className = 'fas fa-minus';
        } else {
            icon.className = 'fas fa-plus';
        }
    });
});

// ====== 7. بيانات السيارات (7 سيارات - من غير ماكلارين) ======
var carsData = [
    {
        id: 1,
        name: 'فيراري SF90',
        brand: 'فيراري',
        price: 524000,
        hp: 986,
        year: 2025,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 2,
        name: 'لامبورغيني Revuelto',
        brand: 'لامبورغيني',
        price: 608000,
        hp: 1015,
        year: 2025,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 3,
        name: 'رولز رويس Spectre',
        brand: 'رولز رويس',
        price: 422000,
        hp: 577,
        year: 2024,
        image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 4,
        name: 'مرسيدس AMG GT',
        brand: 'مرسيدس',
        price: 175000,
        hp: 577,
        year: 2025,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 5,
        name: 'بي إم دبليو M8',
        brand: 'بي إم دبليو',
        price: 135000,
        hp: 617,
        year: 2024,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 6,
        name: 'بورش 911 Turbo S',
        brand: 'بورش',
        price: 230000,
        hp: 640,
        year: 2025,
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=350&fit=crop&crop=center'
    },
    {
        id: 7,
        name: 'بنتلي Continental GT',
        brand: 'بنتلي',
        price: 238000,
        hp: 550,
        year: 2025,
        image: 'https://images.unsplash.com/photo-1607100562486-6db3c0c4689c?w=600&h=350&fit=crop&crop=center'
    }
];

// ====== 8. عرض السيارات في الشبكة ======
var carGrid = document.getElementById('car-grid');

function renderCars(cars) {
    if (cars.length === 0) {
        carGrid.innerHTML = 
            '<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.03); border-radius: 24px; border: 1px solid rgba(230,57,70,0.1);">' +
            '<i class="fas fa-search" style="font-size: 3rem; color: #E63946; display: block; margin-bottom: 20px;"></i>' +
            '<h3 style="font-family: Orbitron, sans-serif; margin-bottom: 10px;">لا توجد سيارات</h3>' +
            '<p style="color: #C0C0C0;">حاول تغيير خيارات البحث أو التصفية</p>' +
            '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        var priceFormatted = car.price.toLocaleString();
        html += 
            '<div class="car-card" data-brand="' + car.brand + '" data-price="' + car.price + '">' +
            '<img src="' + car.image + '" alt="' + car.name + '" class="car-image">' +
            '<h3>' + car.name + '</h3>' +
            '<div class="price">$' + priceFormatted + '</div>' +
            '<div class="specs">' +
            '<span><i class="fas fa-tachometer-alt"></i> ' + car.hp + ' HP</span>' +
            '<span><i class="fas fa-calendar-alt"></i> ' + car.year + '</span>' +
            '</div>' +
            '<button class="btn-detail" onclick="showCarDetails(\'' + car.name + '\', \'' + car.brand + '\', ' + car.price + ', ' + car.hp + ', ' + car.year + ')">' +
            '<i class="fas fa-eye"></i> عرض التفاصيل' +
            '</button>' +
            '</div>';
    }
    carGrid.innerHTML = html;
}

// ====== 9. عرض تفاصيل السيارة ======
function showCarDetails(name, brand, price, hp, year) {
    var priceFormatted = price.toLocaleString();
    alert(
        '🚗 ' + name + '\n' +
        '🏷️ الماركة: ' + brand + '\n' +
        '💰 السعر: $' + priceFormatted + '\n' +
        '⚡ القوة: ' + hp + ' حصان\n' +
        '📅 السنة: ' + year + '\n\n' +
        'للحصول على معلومات أكثر، يرجى التواصل معنا.'
    );
}

// ====== 10. فلترة وبحث السيارات ======
var searchInput = document.getElementById('search-input');
var brandFilter = document.getElementById('brand-filter');
var priceFilter = document.getElementById('price-filter');
var resetButton = document.getElementById('reset-filters');

function filterCars() {
    var searchTerm = searchInput.value.trim().toLowerCase();
    var brandValue = brandFilter.value;
    var priceValue = priceFilter.value;
    
    var filtered = [];
    for (var i = 0; i < carsData.length; i++) {
        var car = carsData[i];
        
        // فلترة حسب البحث
        var matchesSearch = car.name.includes(searchTerm) || car.brand.includes(searchTerm);
        
        // فلترة حسب الماركة
        var matchesBrand = (brandValue === 'all' || car.brand === brandValue);
        
        // فلترة حسب السعر
        var matchesPrice = true;
        if (priceValue === 'low') {
            matchesPrice = car.price < 200000;
        } else if (priceValue === 'mid') {
            matchesPrice = car.price >= 200000 && car.price <= 500000;
        } else if (priceValue === 'high') {
            matchesPrice = car.price > 500000;
        }
        
        if (matchesSearch && matchesBrand && matchesPrice) {
            filtered.push(car);
        }
    }
    
    renderCars(filtered);
}

// ====== 11. أحداث الفلترة ======
searchInput.addEventListener('input', filterCars);
brandFilter.addEventListener('change', filterCars);
priceFilter.addEventListener('change', filterCars);

// ====== 12. إعادة تعيين الفلترة ======
resetButton.addEventListener('click', function() {
    searchInput.value = '';
    brandFilter.value = 'all';
    priceFilter.value = 'all';
    filterCars();
});

// عرض جميع السيارات عند تحميل الصفحة
renderCars(carsData);

// ====== 13. تحريك الأرقام ======
function animateNumbers() {
    var numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(function(num) {
        var target = parseInt(num.getAttribute('data-target'));
        var duration = 2000;
        var startTime = performance.now();
        
        function updateNumber(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            num.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                num.textContent = target;
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

setTimeout(animateNumbers, 3000);

// ====== 14. الجسيمات (خلفية الهيدر) ======
var canvas = document.getElementById('particles-canvas');
var ctx = canvas.getContext('2d');
var particles = [];
var animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', function() {
    resizeCanvas();
});

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.6 + 0.2;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
};

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230, 57, 70, ' + this.opacity + ')';
    ctx.shadowColor = '#E63946';
    ctx.shadowBlur = 5;
    ctx.fill();
};

function initParticles() {
    var count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 8000));
    particles = [];
    for (var i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    animationId = requestAnimationFrame(animateParticles);
}

animateParticles();

// ====== 15. نموذج الاتصال - التحقق ======
var contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var name = document.getElementById('full-name').value.trim();
    var email = document.getElementById('email-address').value.trim();
    var phone = document.getElementById('phone-number').value.trim();
    var message = document.getElementById('message-text').value.trim();
    
    var errors = [];
    
    if (name === '') {
        errors.push('الاسم الكامل مطلوب');
    }
    
    if (email === '') {
        errors.push('البريد الإلكتروني مطلوب');
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        errors.push('البريد الإلكتروني غير صحيح');
    }
    
    if (phone === '') {
        errors.push('رقم الهاتف مطلوب');
    } else if (phone.length < 10) {
        errors.push('رقم الهاتف قصير جداً');
    }
    
    if (message === '') {
        errors.push('الرسالة مطلوبة');
    }
    
    if (errors.length > 0) {
        alert('❌ يرجى تصحيح الأخطاء التالية:\n\n' + errors.join('\n'));
        return;
    }
    
    var submitButton = contactForm.querySelector('button[type="submit"]');
    var originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitButton.disabled = true;
    
    setTimeout(function() {
        alert('✅ تم إرسال طلبك بنجاح!\n\nسنتواصل معك قريباً.');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// ====== 16. النشرة البريدية ======
var newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input.value.trim();
        
        if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            alert('❌ يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        var button = form.querySelector('button');
        var originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(function() {
            alert('✅ تم الاشتراك في النشرة البريدية بنجاح!');
            input.value = '';
            button.innerHTML = originalText;
        }, 1000);
    });
});

// ====== 17. إعادة تحميل الجسيمات عند تغيير حجم النافذة ======
var resizeTimer = null;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        resizeCanvas();
        initParticles();
    }, 500);
});

// ====== 18. رسالة ترحيبية في Console ======
console.log('%c🏎️ رويال موتورز دبي', 'font-size: 24px; font-weight: bold; color: #E63946;');
console.log('%cحيث الفخامة تلتقي بالأداء الأسطوري', 'font-size: 14px; color: #C0C0C0;');
console.log('%c© 2026 - جميع الحقوق محفوظة', 'font-size: 12px; color: #666;');

// ====== 19. منع النقر بزر الماوس الأيمن (اختياري) ======
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// ====== 20. تحسين الأداء - تقليل استخدام الـ scroll events ======
var scrollTimeout = null;

window.addEventListener('scroll', function() {
    if (scrollTimeout !== null) {
        return;
    }
    scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
    }, 100);
});

// ====== نهاية ملف الجافاسكريبت ======