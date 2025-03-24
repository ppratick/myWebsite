document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

window.addEventListener('load', () => {
    document.querySelector('nav ul li a[href="#home"]').classList.add('active');
});

document.querySelector('#contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_zpxoshs';
    const templateID = 'template_9dtkn18';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Message sent successfully!');
        }, (err) => {
            alert('Failed to send message. Please try again later.');
            console.error('Error:', err);
        });
});
