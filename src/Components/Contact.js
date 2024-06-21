import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../cssfiles/VideoUpload.css';

const Contact = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email.';
            }
        } else if (!value.trim()) {
            error = 'This field is required.';
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formValid = true;
        let newErrors = {};

        // Validate form fields
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (!formData[field].trim()) {
                formValid = false;
                newErrors[field] = 'This field is required.';
            }
        });

        if (formValid) {
            try {
                // Send email using Email.js
                const emailParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                };
                const serviceId = 'service_v1786bs'; // Replace with your Email.js service ID
                const templateId = 'template_cavtrlg'; // Replace with your Email.js template ID
                const userId = '3NQW95XFCjHuG4uZl'; // Replace with your Email.js user ID

                const response = await emailjs.send(serviceId, templateId, emailParams, userId);
                console.log('Email sent successfully:', response);

                // Clear form data and errors on successful submission
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
                setErrors({});
                onSubmit && onSubmit(); // Optional callback function after successful submission
            } catch (error) {
                console.error('Email sending failed:', error);
            }
        } else {
            setErrors(newErrors);
            console.log('Please fix the errors before submitting.');
        }
    };

    return (
        <div className='uploadform'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="form-container">
                            <h1>Help us improve with your valuable feedback.</h1>
                            <form onSubmit={handleSubmit}>
                                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                                    <label htmlFor="message">Message/Feedback:</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Enter your message or feedback"
                                        required
                                    ></textarea>
                                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                </div>
                                <button type="submit" className="button">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
