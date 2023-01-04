import React, {
  useEffect,
  useState
} from "react";
import { isMobile } from 'react-device-detect';
import PropTypes from "prop-types";
import { useApi } from "../../../utils/hooks";
import { showAlert } from "../../../utils/notifications";
import { BASENAME } from '../../../utils/constants';

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const referralLink = IS_DEV ? `${window.location.hostname}:3000${BASENAME}` : `cl-cards.com/waiting-list`;

// Nick - New modal for reset password
const ResetPasswordModal = ({ resetToken, userName }) => {

  const [
    newPassword,
    setNewPassword
  ] = useState("");
  const [
    resetSuccess,
    setResetSuccess
  ] = useState(false);

  const {
    data,
    error,
    isLoading,
    refetch: submitData,
  } = useApi('post', '/v2/account/reset_password', { type: 'ledger' });

  const handleChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    submitData({
      token: resetToken,
      password: newPassword
    })
  };

  useEffect(() => {
    if (error) {
      const { message } = error;
      showAlert({ message, type: 'warning' });
    } else if (data) {
      setResetSuccess(true);
    }
  }, [data, error]);

  return (
    <div className="modal fade" id="reset-pwd-modal" tabIndex="-1" role="dialog">
      <div
        className={`modal-dialog ${isMobile ? '' : 'modal-dialog-centered'}`}
        style={{ minHeight: '100vh' }}
        role="document">
        <div className="modal-content" style={{ minHeight: isMobile ? '100vh' : '' }}>
          {
            !resetSuccess ? (
              <span
                aria-hidden="true"
                type="button"
                className="close d-block w-100 text-end pe-3"
                data-dismiss="modal"
                aria-label="Close">
                <img alt="Close" src="/assets/images/close.svg" className="p-2" />
              </span>
            ) : (
              <></>
            )
          }
          <div className="modal-body">
            <div className="form">
              {userName !== null ? (
                <>
                  <p className="header upper-case text-h1">{`Welcome! ${userName}`} </p>
                  {
                    !resetSuccess ? (
                      <p className="header text-h2">Please change your Password </p>
                    ) :
                      <p className="header upper-case text-h1"> </p>
                  }
                </>
              ) :
                <p className="header upper-case text-h1">Reset Password </p>
              }
              {
                !resetSuccess ? (
                  <form onSubmit={handleSubmitForm} id="reset-pwd-form" style={{ marginTop: '2.563rem' }}>
                    <div className="form-group mb-4">
                      <input
                        value={newPassword}
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
                ) : (
                  <>
                    <div>Your password has been changed successfully. You can login into your VetVault now from Already a member.</div>
                    <button type="submit" className="w-100 btn btn-primary btn-wide" style={{ marginTop: 50 }} >
                      <a href={`http://${referralLink}`}>
                        Close
                      </a>
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ResetPasswordModal;

ResetPasswordModal.propTypes = {
  resetToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};
