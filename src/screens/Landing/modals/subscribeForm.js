/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import SelectCountryDropdown from '../../../components/SelectCountryDropdown';
import { useApi } from '../../../utils/hooks';
import { showAlert } from '../../../utils/notifications';
import { useUrlQuery } from '../../../utils/router';
import { MODAL_SCREENS } from './constants';

   const KEY = '6LfmcGQjAAAAAJidG3LADv9c9D-ujq_ILJKQB24-';
// const KEY='6Lf5ncYjAAAAAGv5cxh9rEosnFLX9OcHaPDI9Cbv'
const handleAnalytics = () => {
  window.dotq = window.dotq || [];
  window.dotq.push({
    projectId: '10000',
    properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
  });
};

const SubscribeForm = ({ onChangeScreen }) => {
  const recaptchaRef = useRef();
  const query = useUrlQuery();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: '',
    selectedCountry: null,
    withNano: false,
  });
  const {
    data,
    error,
    isLoading,
    refetch: submitData,
  } = useApi('post', '/v2/waiting_list', { type: 'ledger' });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (error) {
      const { message } = error;
      showAlert({ message, type: 'warning' });
    } else if (data) {
      const { alreadyAdded, status, message } = data;
      if (alreadyAdded) {
        showAlert({ message: 'Email was already added', type: 'danger' });
      } else if (status >= 400) {
        showAlert({ message, type: 'warning' });
      } else {
        onChangeScreen(MODAL_SCREENS[1]);
      }
    }
  }, [data, error]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // const recaptchaValue = recaptchaRef.current.getValue();
    // if (recaptchaValue === '') {
    //   alert("Please verify Captcha")
    //   return false;
    // }

    submitData({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      countryId: form.selectedCountry.id,
      sourceReferralCode: query.get('ref') || null,
      withNano: form.withNano,
      utm_source: query.get('utm_source') || null,
      utm_medium: query.get('utm_medium') || null,
      utm_campaign: query.get('utm_campaign') || null,
      utm_content: query.get('utm_content') || null,
       // recaptchaValue,
    });
    handleAnalytics();
    return null;
  };
  return (
    <div className="form">
      <p className="header upper-case text-h1">Join the waitlist</p>
      <div>
        {/* <p className="text-f5">
          Refer your friends and be first in line for a free physical card and early access. The
          more people you refer, the more you move up in line.
        </p> */}
        <p className="text-f5">Join the waitlist to get your exclusive referral link.</p>
        <p className="text-f5">
          <i>
            To receive your reward, you need to enter the email address you’ll use for creating your
            card account.
          </i>
        </p>
      </div>
      <form onSubmit={handleSubmitForm} id="confirm-phone-form" style={{ marginTop: '2.563rem' }}>
        <div className="form-group mb-4">
          <input
            name="firstName"
            type="text"
            className="form-control-input"
            placeholder="Enter your first name"
            onChange={handleChange}
            required
          />

          <label className="floating-label">Enter your first name</label>
        </div>

        <div className="form-group mb-4">
          <input
            name="lastName"
            type="text"
            className="form-control-input"
            placeholder="Enter your last name"
            onChange={handleChange}
            required
          />

          <label className="floating-label">Enter your last name</label>
        </div>

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

        <div className="select-group">
          {form.selectedCountry && (
            <label style={{ fontSize: '0.75rem', color: '#c3c3c3' }}>
              Enter your country of residence
            </label>
          )}
          <SelectCountryDropdown
            name="selectedCountry"
            value={form.selectedCountry}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          {/* <p>Are you VetCoin MetaVerse Member?</p>
          <div className="d-flex flex-row align-items-center justify-content-start">
            <label className="w-50 d-flex flex-row align-items-center">
              <input
                onChange={() => handleChange({ target: { value: true, name: 'withNano' } })}
                checked={form.withNano === true}
                className="me-2 form-check-input"
                type="radio"
              />
              <span>Yes</span>
            </label>
            <label className="w-50 d-flex flex-row align-items-center">
              <input
                onChange={() => handleChange({ target: { value: false, name: 'withNano' } })}
                checked={form.withNano === false}
                className="me-2 form-check-input"
                type="radio"
              />
              <span>No</span>
            </label>
          </div> */}
          <div className="mt-4">
            <ReCAPTCHA ref={recaptchaRef} sitekey={KEY} theme="dark" />
          </div>
        </div>
        <button type="submit" className="w-100 btn btn-primary btn-wide">
          {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Join'}
        </button>
        <p className="text-text-shadow" style={{ marginTop: '2.563rem', fontSize: '0.75rem' }}>
          *By Joining, I agree to
          <a href="/"> Terms & Conditions</a> and <a href="/"> Privacy Poilcy</a>.
        </p>
        {/* <p className="text-text-shadow" style={{ marginTop: '2.563rem', fontSize: '0.75rem' }}>
          Subject to eligibility conditions, including country of residence and availability.
          Entering the waiting list does not mean you will receive a CL Card. It does not in any
          event constitute a commitment to deliver the CL Card or a commitment on the features that
          will be offered by the CL Card. The CL Card and its features are provided to you solely by
          Baanx Group Ltd, UK, Baanx US Corp, United States and Frozen Time UNIPESSOAL LDA, EU and
          not by Ledger. By filling out this form, you consent to Baanx collecting your information.
          Baanx Group Ltd, UK, Baanx US Corp, United States and Frozen Time UNIPESSOAL LDA, EU will
          add you to the waiting list and transfer your data to Ledger which will send you news and
          updates about the CL card.
        </p> */}
      </form>
    </div>
  );
};
export default SubscribeForm;

SubscribeForm.propTypes = {
  onChangeScreen: PropTypes.func.isRequired,
};
