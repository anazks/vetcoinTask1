import React from 'react';
import { Link } from "react-router-dom";
import { SectionContainer } from '../Layout';

const Header = () => (
  <>
    <SectionContainer className="bg-dark">
      <div className="wl-header py-4">
        <Link to="/">
          <img
            src="/assets/images/logo.png"
            className="img-fluid  header-logo"
            alt="VETCOIN"
            style={{ width: 170 }}
          />
        </Link>
        <div>
          <button
            className="btn btn-responsive"
            type="button"
            data-toggle="modal"
            data-target="#membermodal">
            Already a member
          </button>
        </div>
        <div>
          <button
            className="btn btn-responsive header-btn-small"
            type="button"
            data-toggle="modal"
            data-target="#modal">
            Join waitlist
          </button>
        </div>
      </div>
    </SectionContainer>
    <div className="wl-header-hr" />
  </>
);

export default Header;
