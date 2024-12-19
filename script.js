// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fields = {
        name: {
            element: document.getElementById('name'),
            validation: value => value.length >= 2,
            errorMessage: 'Name must be at least 2 characters long'
        },
        email: {
            element: document.getElementById('email'),
            validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: 'Please enter a valid email address'
        },
        phone: {
            element: document.getElementById('phone'),
            validation: value => {
                // Accepts formats: 123-456-7890, (123) 456-7890, 1234567890
                const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
                return phoneRegex.test(value);
            },
            errorMessage: 'Please enter a valid phone number'
        },
        subject: {
            element: document.getElementById('subject'),
            validation: value => value.length >= 4,
            errorMessage: 'Subject must be at least 4 characters long'
        },
        message: {
            element: document.getElementById('message'),
            validation: value => value.length >= 10,
            errorMessage: 'Message must be at least 10 characters long'
        }
    };

    // Format phone number as user types
    fields.phone.element.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0,3) + '-' + value.slice(3);
            } else {
                value = value.slice(0,3) + '-' + value.slice(3,6) + '-' + value.slice(6,10);
            }
            e.target.value = value;
        }
    });

    // Add input event listeners for real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        field.element.addEventListener('input', () => {
            validateField(fieldName, field);
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (!validateField(fieldName, field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Collect form data
            const formData = {
                name: fields.name.element.value,
                email: fields.email.element.value,
                phone: fields.phone.element.value,
                subject: fields.subject.element.value,
                message: fields.message.element.value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted successfully:', formData);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Clear any remaining error messages
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                clearError(field.element);
            });
        } else {
            // Add shake animation to form
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
        }
    });

    // Validate individual field
    function validateField(fieldName, field) {
        const value = field.element.value.trim();
        const isValid = field.validation(value);
        
        if (!isValid) {
            showError(field.element, field.errorMessage);
        } else {
            clearError(field.element);
        }
        
        return isValid;
    }

    // Show error message
    function showError(element, message) {
        element.classList.add('error');
        const errorElement = element.nextElementSibling;
        errorElement.textContent = message;
    }

    // Clear error message
    function clearError(element) {
        element.classList.remove('error');
        const errorElement = element.nextElementSibling;
        errorElement.textContent = '';
    }
});