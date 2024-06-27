import React, { useState } from 'react';
import axios from 'axios';
import '../cssfiles/play.css';

const Form = ({ onSubmit, videoResponses }) => { 
    const [formData, setFormData] = useState({
        childName: '',
        age: '',
        gender: '',
        fathersName: '',
        fathersContact: '',
        fathersEmail: '',
        mothersName: '',
        mothersContact: '',
        mothersEmail: '',
        message: '',
    });

    const instance = axios.create({
        baseURL: 'http://localhost:5000/api',
        timeout: 10000,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'fathersEmail' || name === 'mothersEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email.';
            }
        } else if (name.includes('Contact')) {
            const contactRegex = /^\d{10}$/;
            if (!contactRegex.test(value)) {
                error = 'Please enter a valid 10-digit contact number.';
            }
        } else if (name === 'age') {
            if (value <= 0) {
                error = 'Please enter a valid age.';
            }
        } else if (!value.trim()) {
            error = 'This field is required.';
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formValid = true;

        
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (errors[field]) {
                formValid = false;
            }
        });

        if (formValid) {
            console.log('Form data:', formData);

            try {
                const combinedData = { ...formData, videoResponses };
                console.log('Combined data:', combinedData);

                const response = await instance.post('/submitFormData', combinedData);

                console.log('Success:', response.data);
                onSubmit(combinedData);  
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            console.log('Please fix the errors before submitting.');
        }
    };

    return (
        <div className='uploadform'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-9">
                        <div className="form-container">
                            <h1>Please fill out the form with your child's information.</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="childName">Name of the Child:</label>
                                    <input
                                        type="text"
                                        id="childName"
                                        name="childName"
                                        className={`form-control ${errors.childName ? 'is-invalid' : ''}`}
                                        value={formData.childName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your child's name"
                                        required
                                    />
                                    {errors.childName && <div className="invalid-feedback">{errors.childName}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age:</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Enter your child's age"
                                        required
                                    />
                                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                                </div>
                                <div className="form-group gender-group">
                                    <label>Gender:</label>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="Male"
                                            className="form-check-input"
                                            checked={formData.gender === 'Male'}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="Female"
                                            className="form-check-input"
                                            checked={formData.gender === 'Female'}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fathersName">Father's Name:</label>
                                    <input
                                        type="text"
                                        id="fathersName"
                                        name="fathersName"
                                        className={`form-control ${errors.fathersName ? 'is-invalid' : ''}`}
                                        value={formData.fathersName}
                                        onChange={handleInputChange}
                                        placeholder="Enter father's name"
                                        required
                                    />
                                    {errors.fathersName && <div className="invalid-feedback">{errors.fathersName}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fathersContact">Father's Contact Number:</label>
                                    <input
                                        type="tel"
                                        id="fathersContact"
                                        name="fathersContact"
                                        className={`form-control ${errors.fathersContact ? 'is-invalid' : ''}`}
                                        value={formData.fathersContact}
                                        onChange={handleInputChange}
                                        placeholder="+91 Enter father's contact number"
                                        required
                                    />
                                    {errors.fathersContact && <div className="invalid-feedback">{errors.fathersContact}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fathersEmail">Father's Email ID:</label>
                                    <input
                                        type="email"
                                        id="fathersEmail"
                                        name="fathersEmail"
                                        className={`form-control ${errors.fathersEmail ? 'is-invalid' : ''}`}
                                        value={formData.fathersEmail}
                                        onChange={handleInputChange}
                                        placeholder="Enter father's email"
                                        required
                                    />
                                    {errors.fathersEmail && <div className="invalid-feedback">{errors.fathersEmail}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mothersName">Mother's Name:</label>
                                    <input
                                        type="text"
                                        id="mothersName"
                                        name="mothersName"
                                        className={`form-control ${errors.mothersName ? 'is-invalid' : ''}`}
                                        value={formData.mothersName}
                                        onChange={handleInputChange}
                                        placeholder="Enter mother's name"
                                        required
                                    />
                                    {errors.mothersName && <div className="invalid-feedback">{errors.mothersName}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mothersContact">Mother's Contact Number:</label>
                                    <input
                                        type="tel"
                                        id="mothersContact"
                                        name="mothersContact"
                                        className={`form-control ${errors.mothersContact ? 'is-invalid' : ''}`}
                                        value={formData.mothersContact}
                                        onChange={handleInputChange}
                                        placeholder="+91 Enter mother's contact number"
                                        required
                                    />
                                    {errors.mothersContact && <div className="invalid-feedback">{errors.mothersContact}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mothersEmail">Mother's Email ID:</label>
                                    <input
                                        type="email"
                                        id="mothersEmail"
                                        name="mothersEmail"
                                        className={`form-control ${errors.mothersEmail ? 'is-invalid' : ''}`}
                                        value={formData.mothersEmail}
                                        onChange={handleInputChange}
                                        placeholder="Enter mother's email"
                                    />
                                    {errors.mothersEmail && <div className="invalid-feedback">{errors.mothersEmail}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message/Feedback:</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        className="form-control"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Enter your message or feedback"
                                    ></textarea>
                                </div>

                                <button type="submit" className="button">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Form;