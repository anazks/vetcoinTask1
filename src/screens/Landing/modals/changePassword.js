/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../../../utils/hooks';
import { showAlert } from '../../../utils/notifications';
import { PASSWORD_MODAL } from './constants';
import { USERDATA } from '../../../utils/constants';

const handleAnalytics = () => {
    window.dotq = window.dotq || [];
    window.dotq.push({
        projectId: '10000',
        properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
    });
};

const ChangePassword = ({ onChangeScreen }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        newPassword: ''
    });
    const {
        data,
        error,
        isLoading,
        refetch: submitData,
    } = useApi('post', '/v2/account/update', { type: 'ledger' });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        if (error) {
            const { message } = error;
            showAlert({ message, type: 'warning' });
        } else if (data) {
            const { ecosystem_uuid } = data;
            USERDATA.userData = data
            // alert(JSON.stringify(data));
            // const { email, name, referlink, created_at, ecosystem_uuid } = data;
            if (ecosystem_uuid) {
                onChangeScreen(PASSWORD_MODAL[1]);
            }
            else {
                alert(data)
            }
        }
    }, [data, error]);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        submitData({
            email: form.email,
            password: form.password,
            newPassword: form.newPassword
        });
        handleAnalytics();
    };
    return (
        <div className="form">
            <p className="header upper-case text-h1">Enter your email</p>
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

                <div className="form-group mb-4">
                    <input
                        name="password"
                        type="password"
                        className="form-control-input"
                        placeholder="Current password"
                        onChange={handleChange}
                        required
                    />
                    <label className="floating-label">Current password</label>
                </div>

                <div className="form-group mb-4">
                    <input
                        name="newPassword"
                        type="password"
                        className="form-control-input"
                        placeholder="New password"
                        onChange={handleChange}
                        required
                    />
                    <label className="floating-label">New password</label>
                </div>

                <button type="submit" className="w-100 btn btn-primary btn-wide">
                    {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Proceed'}
                </button>
            </form>
        </div>
    );
};
export default ChangePassword;

ChangePassword.propTypes = {
    onChangeScreen: PropTypes.func.isRequired,
};
