import React from 'react';
import { links } from '../../../../utils/constants';
import { SectionContainer } from '../Layout';

const Header = () => (
  <>
    <SectionContainer className="bg-dark">
      <div className="wl-header py-4">
        <a href={links.sntnl} target="_blank" rel="noreferrer">
          <img
            src="/assets/images/logo.png"
            className="img-fluid"
            alt="VETCOIN"
            style={{ maxWidth: 220 }}
          />
        </a>
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
            className="btn btn-responsive"
            type="button"
            data-toggle="modal"
            data-target="#modal">
            Join waitlist
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn" type="button">
            Actions Centre
          </button>
          <div className="dropdown-content ">
            <a href="https://google.com" target="_blank" rel="noreferrer">Members Area</a>
            <a href="/">Check Your Rank</a>
            <a href="/">Change Password</a>
          </div>
        </div>
      </div>
    </SectionContainer>
    <div className="wl-header-hr" />
  </>
);

export default Header;
