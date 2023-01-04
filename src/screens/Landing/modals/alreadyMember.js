/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../../../utils/hooks';
import { showAlert } from '../../../utils/notifications';
import { MEMBER_MODAL } from './constants';
import { USERDATA } from '../../../utils/constants'
import useUserAccount from "../../../hooks/useUserAccount";


const handleAnalytics = () => {
  window.dotq = window.dotq || [];
  window.dotq.push({
    projectId: '10000',
    properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
  });
};

const AlreadyMember = ({ onChangeScreen }) => {
  const [form, setForm] = useState({
    email: '',
    password: null
  });
  const {
    data,
    error,
    isLoading,
    refetch: submitData,
  } = useApi('post', '/v2/account/login', { type: 'ledger' });
  // console.log("hallow---------------",data);
  const { authAccount } = useUserAccount();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (error) {
      const { message } = error;
      showAlert({ message, type: 'warning' });
    } else if (data) {
      const { email, firstName, referlink, created_at, ecosystem_uuid } = data;
      USERDATA.userData = data

      // const { email, name, referlink, created_at, ecosystem_uuid } = data;
      if (ecosystem_uuid) {
        authAccount(email, firstName, referlink, created_at, ecosystem_uuid);
        onChangeScreen(MEMBER_MODAL[3]);

        // Nick - Update to close modal instead of open success modal
        document.querySelector("#membermodal .close")?.click();
      }
      else {
        alert(data)
      }
    }
  }, [data, error]);

  function forgotPassword() {
    onChangeScreen(MEMBER_MODAL[1]);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    submitData({
      email: form.email,
      password: form.password,
    });
    handleAnalytics();
  };
  return (
    <div className="form">
      <p className="header upper-case text-h1">LOG INTO VETVAULT</p>
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
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <label className="floating-label">Enter your password</label>
        </div>
        <div style={{ fontSize: '0.75rem', paddingBottom: 50 }}>
          <text type='button' className="floating-label" onClick={forgotPassword} style={{ color: 'red', fontSize: 15 }}>forgot password?</text>
        </div>

        <button type="submit" className="w-100 btn btn-primary btn-wide">
          {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Proceed'}
        </button>
      </form>
    </div>
  );
};
export default AlreadyMember;

AlreadyMember.propTypes = {
  onChangeScreen: PropTypes.func.isRequired,
};
