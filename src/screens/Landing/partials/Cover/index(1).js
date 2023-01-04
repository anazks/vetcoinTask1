import React from 'react';
import { isMobile } from 'react-device-detect';
import Fade from 'react-reveal/Fade';
import { USERDATA } from '../../../../utils/constants';
import { SectionContainer } from '../Layout';

const Cover = () => (
  <SectionContainer className="bg-dark">
    <div className="bg-dark wl-cover">
      <div className="mb-4 pb-3">
        <img
          src="/assets/images/vetcoin.png"
          alt="Ledger"
          className="img-fluid"
          style={{ maxWidth: 150 }}
        />
      </div>
      <Fade bottom>
        <div>
          <h1 className="text-white fs-hero hero m-0">CONNECT. ENABLE. TRANSFORM.</h1>
        </div>
      </Fade>
      <Fade bottom delay={300}>
        <div className="wl-image-container">
          <img
            className={`${isMobile ? 'w-100' : ''}`}
            src="/assets/images/Vetcoin_Card_Promo.png"
            alt="Card promo"
          />
        </div>
      </Fade>
      <Fade bottom delay={600}>
        <div className={`mt-5 pt-2 ${isMobile ? 'w-100 px-3' : 'col-6'} mx-auto`}>
          <p className="text-white fs-f5 m-0">
            Be one of the first to get your hands on the new virtual VetCard, powered by Sentinel
            Digital*. Can’t wait? To move up the line and get the chance to get a FREE VetCard* and
            other perks, just share the personal referral link we’ll give you when you register.
          </p>
          <p className="mt-3" style={{ fontSize: '12px', color: '#717070' }}>
            *The VetCard and its features are provided by Sentinel Digital Inc and Partners
          </p>
        </div>
      </Fade>
      {USERDATA.userData == null &&
        <div className="mt-4 pt-3">
          <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modal">
            Join the waitlist
          </button>
        </div>
      }

    </div>
  </SectionContainer>
);

export default Cover;
