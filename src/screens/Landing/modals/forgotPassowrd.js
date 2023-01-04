/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../../../utils/hooks';
import { showAlert } from '../../../utils/notifications';
import { MEMBER_MODAL } from './constants';

const handleAnalytics = () => {
    window.dotq = window.dotq || [];
    window.dotq.push({
        projectId: '10000',
        properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
    });
};

const ForgotPassword = ({ onChangeScreen }) => {
    const [form, setForm] = useState({
        email: ''
    });
    const {
        data,
        error,
        isLoading,
        refetch: submitData,
    } = useApi('post', '/v2/account/forgot_password_email', { type: 'ledger' });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        if (error) {
            const { message } = error;
            showAlert({ message, type: 'warning' });
        } else if (data) {
            if (data) {
                onChangeScreen(MEMBER_MODAL[2]);
            }
            else {
                alert(data)
            }
        }
    }, [data, error]);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        submitData({
            email: form.email
        });
        handleAnalytics();
    };
    return (
        <div className="form">
            <p className="header upper-case text-h1">Forgot Password ?</p>
            <form onSubmit={handleSubmitForm} id="confirm-phone-form" style={{ marginTop: '2.563rem' }}>
                <div className="form-group mb-4">
                    <input
                        name="email"
                        type="email"
                        className="form-control-input"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />

                    <label className="floating-label">Enter your email</label>
                </div>

                <button type="submit" className="w-100 btn btn-primary btn-wide" style={{ marginTop: 15 }}>
                    {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};
export default ForgotPassword;

ForgotPassword.propTypes = {
    onChangeScreen: PropTypes.func.isRequired,
};
