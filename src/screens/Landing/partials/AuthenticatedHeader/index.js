import React from "react";
import { Link } from "react-router-dom";

import {
  links
} from "../../../../utils/constants";
import { SectionContainer } from "../Layout";
import useUserAccount from "../../../../hooks/useUserAccount";
import { invalidateAccount } from "../../../../models/user-account";

const LoggedHeader = () => {
  const [
    menuActive,
    setMenuActive
  ] = React.useState(false);
  const { account } = useUserAccount();

  const toggleMenu = () => {
    setMenuActive(prevState => !prevState);
  };

  const logout = () => {
    invalidateAccount();
  }

  return (
    <>
      <SectionContainer className="bg-dark">
        <div className="wl-header py-4">
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              className="img-fluid"
              alt="VETCOIN"
              style={{ maxWidth: 170 }}
            />
          </Link>
          <div className={`dropdown ${menuActive ? "active" : ""}`}>
            <button
              className="dropbtn dropdown-toggle d-none d-lg-block"
              type="button">
              {`Welcome! ${account.firstName}`}
            </button>
            <div
              role="button"
              aria-hidden="true"
              className="mobile-dropbtn d-block d-lg-none"
              onClick={() => toggleMenu()}>
              <svg
                width="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
                  fill="#FFFFFF" />
                <path
                  d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                  fill="#FFFFFF" />
                <path
                  d="M11 11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H11Z"
                  fill="#FFFFFF" />
              </svg>
            </div>
            <div className="dropdown-content-container">
              <div className="dropdown-content">
                <div className="dropdown-toggle__content-header d-block d-lg-none">
                  <span>{`Welcome! ${account.firstName}`}</span>

                  <div aria-hidden="true" className="dropdown-toggle__content-header-close" onClick={() => toggleMenu()}>
                    <svg
                      version="1.1"
                      viewBox="0 0 512 512"
                      width="30"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink">
                      <path fill="currentColor" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                    </svg>
                  </div>
                </div>
                <div className="dropdown-toggle__item-list">
                  {/* <Link
                  to="/member-area"
                  className="dropdown-toggle__item d-flex align-items-center">
                  <span className="dropdown-toogle__item-icon">
                    <svg
                      version="1.2"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g>
                        <path
                          fill="currentColor"
                          d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z" />
                        <path
                          fill="currentColor"
                          d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z" />
                        <path
                          fill="currentColor"
                          d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z" />
                        <path
                          fill="currentColor"
                          d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z" />
                      </g>
                    </svg>
                  </span>
                  <span className="dropdown-toggle__item-name">Members Area</span>
                </Link> */}

                  <a
                    className="dropdown-toggle__item d-flex align-items-center"
                    href={links.MembersArea + account.ecosystem_uuid}
                    target="_blank"
                    rel="noreferrer">
                    <span className="dropdown-toogle__item-icon">
                      <svg
                        version="1.2"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                          <path
                            fill="currentColor"
                            d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z" />
                          <path
                            fill="currentColor"
                            d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z" />
                          <path
                            fill="currentColor"
                            d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z" />
                          <path
                            fill="currentColor"
                            d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z" />
                        </g>
                      </svg>
                    </span>
                    <span className="dropdown-toggle__item-name">Loyality Program</span>
                  </a>

                  {/* <a
                  className="dropdown-toggle__item d-flex align-items-center"
                  href={links.ReferLink + account.referlink}
                  target="_blank"
                  rel="noreferrer">
                  <span className="dropdown-toogle__item-icon">
                    <svg
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        fill="none"
                        height="256"
                        width="256" />
                      <circle
                        fill="currentColor"
                        cx="128"
                        cy="96"
                        r="56" />
                      <path
                        fill="currentColor"
                        d="M128,8A87.9,87.9,0,0,0,72,163.8V240a7.9,7.9,0,0,0,3.8,6.8,8,8,0,0,0,7.8.4L128,224.9l44.4,22.3a9.4,9.4,0,0,0,3.6.8,8,8,0,0,0,8-8V163.8A87.9,87.9,0,0,0,128,8Zm0,160a72,72,0,1,1,72-72A72.1,72.1,0,0,1,128,168Z" />
                    </svg>
                  </span>
                  <span className="dropdown-toggle__item-name">Check Your Rank</span>
                </a> */}

                  <div
                    data-toggle="modal"
                    data-target="#rankModal"
                    className="dropdown-toggle__item d-flex align-items-center">
                    <span className="dropdown-toogle__item-icon">
                      <svg
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          fill="none"
                          height="256"
                          width="256" />
                        <circle
                          fill="currentColor"
                          cx="128"
                          cy="96"
                          r="56" />
                        <path
                          fill="currentColor"
                          d="M128,8A87.9,87.9,0,0,0,72,163.8V240a7.9,7.9,0,0,0,3.8,6.8,8,8,0,0,0,7.8.4L128,224.9l44.4,22.3a9.4,9.4,0,0,0,3.6.8,8,8,0,0,0,8-8V163.8A87.9,87.9,0,0,0,128,8Zm0,160a72,72,0,1,1,72-72A72.1,72.1,0,0,1,128,168Z" />
                      </svg>
                    </span>
                    <span className="dropdown-toggle__item-name">Check Your Rank</span>
                  </div>

                  <div
                    data-toggle="modal"
                    data-target="#changePasswordModal"
                    className="dropdown-toggle__item d-flex align-items-center">
                    <span className="dropdown-toogle__item-icon">
                      <svg
                        version="1.1"
                        viewBox="0 0 30 30"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path
                          fill="none"
                          d="M21,12  H9V9c0-3.314,2.686-6,6-6h0c3.314,0,6,2.686,6,6V12z"
                          stroke="currentColor"
                          strokeWidth="2" />
                        <path
                          fill="currentColor"
                          d="M24,11H6c-1.105,0-2,0.895-2,2v12c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V13C26,11.895,25.105,11,24,11z M15,21  c-1.105,0-2-0.896-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C17,20.104,16.105,21,15,21z M21,21c-1.105,0-2-0.896-2-2  c0-1.105,0.895-2,2-2s2,0.895,2,2C23,20.104,22.105,21,21,21z M9,21c-1.105,0-2-0.896-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2  C11,20.104,10.105,21,9,21z" />
                      </svg>
                    </span>
                    <span className="dropdown-toggle__item-name">Change Password</span>
                  </div>

                  
                  <a
                    className="dropdown-toggle__item d-flex align-items-center"
                    href={links.Refaral + account.ecosystem_uuid}
                    target="_blank"
                    rel="noreferrer">
                    <span className="dropdown-toogle__item-icon">
                      <svg
                        version="1.2"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                          <path
                            fill="currentColor"
                            d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z" />
                          <path
                            fill="currentColor"
                            d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z" />
                          <path
                            fill="currentColor"
                            d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z" />
                          <path
                            fill="currentColor"
                            d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z" />
                        </g>
                      </svg>
                    </span>
                    <span className="dropdown-toggle__item-name">Invite Your Friends</span>
                  </a>

                  <Link
                    to="/"
                    onClick={logout}
                    className="dropdown-toggle__item d-flex align-items-center">
                    <span className="dropdown-toogle__item-icon">
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 1H9V5H4L4 11H9V15H1V1Z"
                          fill="currentColor" />
                        <path
                          d="M11 7V4H12L16 8L12 12H11V9H6V7L11 7Z"
                          fill="currentColor" />
                      </svg>
                    </span>
                    <span className="dropdown-toggle__item-name">Log Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <div className="wl-header-hr" />
    </>
  );
};

export default LoggedHeader;
