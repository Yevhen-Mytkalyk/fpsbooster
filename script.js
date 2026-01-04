// Smooth scroll to download section
function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    downloadSection.scrollIntoView({ behavior: 'smooth' });
}

// Download file handler with actual file download
function downloadFile(os) {
    let filename = '';
    let message = '';
    let filepath = '';

    // Для локального файлу используємо відносний шлях
    switch(os) {
        case 'windows':
            filename = 'FPS_Booster_3000.exe';
            filepath = './dist/main.exe';
            message = 'Завантаження FPS Booster для Windows...';
            break;
        case 'mac':
            filename = 'FPS_Booster_3000_MacOS.dmg';
            message = 'На жаль, версія для MacOS ще не готова';
            alert('На жаль, версія для MacOS ще не готова');
            return;
        case 'linux':
            filename = 'FPS_Booster_3000_Linux.tar.gz';
            message = 'На жаль, версія для Linux ще не готова';
            alert('На жаль, версія для Linux ще не готова');
            return;
    }

    showNotification(message, 'success');
    
    // Для Windows - створюємо посилання для завантаження
    if (os === 'windows') {
        const link = document.createElement('a');
        link.href = filepath;
        link.download = filename;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    console.log('Downloading:', filename, 'from:', filepath);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;
    
    // Validate
    if (!name || !email || !message) {
        showNotification('Будь ласка, заповніть всі поля', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Будь ласка, введіть правильну email адресу', 'error');
        return;
    }
    
    // Show success message
    showNotification('Спасибі за ваше повідомлення! Ми скоро з вами зв\'яжемось.', 'success');
    
    // Clear form
    form.reset();
    
    // In production, send data to server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, message })
    // });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background-color: #4CAF50; color: white;' : ''}
        ${type === 'error' ? 'background-color: #f44336; color: white;' : ''}
        ${type === 'info' ? 'background-color: #2196F3; color: white;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animation for elements
function observeElements() {
    const elements = document.querySelectorAll('.feature-card, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(element);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    console.log('FPS Booster 3000 website loaded successfully!');
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Version check (in production)
function checkLatestVersion() {
    console.log('Current version: 3.0.0');
    // In production: fetch('/api/version')
}

checkLatestVersion();
