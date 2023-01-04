/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { PASSWORD_MODAL } from "./constants";

const ChangePasswordModal = ({ screens, currentScreen, changeScreen, children }) => (
    <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog">
        <div
            className={`modal-dialog ${isMobile ? '' : 'modal-dialog-centered'}`}
            style={{ minHeight: '100vh' }}
            role="document">
            <div className="modal-content" style={{ minHeight: isMobile ? '100vh' : '' }}>
                <span
                    aria-hidden="true"
                    onClick={() => { changeScreen(PASSWORD_MODAL[0]) }}
                    type="button"
                    className="close d-block w-100 text-end pe-3"
                    data-dismiss="modal"
                    aria-label="Close">
                    <img alt="Close" src="/assets/images/close.svg" className="p-2" />
                </span>
                <div className="modal-body">{children[screens.indexOf(currentScreen)]}</div>
            </div>
        </div>
    </div>
);


ChangePasswordModal.propTypes = {
    children: PropTypes.array.isRequired,
    currentScreen: PropTypes.string.isRequired,
    screens: PropTypes.array.isRequired,
    changeScreen: PropTypes.func.isRequired
};

export default ChangePasswordModal;
