import React from 'react';
import { isBrowser } from 'react-device-detect';
import Fade from 'react-reveal/Fade';

import { SectionContainer } from '../Layout';

const Features = () => (
  <SectionContainer>
    <div className="features-layout">
      <div className="row">
        <div className="col-xl-6 col-12">
          <Fade>
            <div className="features-item" style={{ marginBottom: '5rem' }}>
              <span className="img-container">
                <img
                  className="position-absolute top-50 start-50 translate-middle"
                  src="/assets/images/top_up.svg"
                  alt="top_up"
                />
              </span>

              <span>
                <p className="features-title">
                  Top-up & manage your card easily and securely through VETCoin app
                </p>
                <p className="features-description">
                  Built to be compatible with your VETCoin wallet.
                </p>
              </span>
            </div>
          </Fade>
        </div>
        <div className="col-xl-6 col-12">
          <Fade>
            <div className="features-item" style={{ marginBottom: '5rem' }}>
              <span className="img-container">
                <img
                  className="position-absolute top-50 start-50 translate-middle"
                  src="/assets/images/access.svg"
                  alt="access"
                />
              </span>

              <span>
                <p className="features-title">
                  Get access to liquidity using your crypto as collateral*
                </p>
                <p className="features-description">
                  Open a line of credit to spend on your card, using crypto as collateral, instantly.
                </p>
                <div
                  className={`col-12 note features-text-caption ${isBrowser ? 'text-left' : ''}`}>
                  *Feature availability depending on your region of residence.
                </div>
              </span>
            </div>
          </Fade>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-12">
          <Fade>
            <div className="features-item" style={{ marginBottom: '5rem' }}>
              <span className="img-container">
                <img
                  className="position-absolute top-50 start-50 translate-middle"
                  src="/assets/images/convert_to_fiat.svg"
                  alt="convert_to_fiat"
                />
              </span>

              <span>
                <p className="features-title">Convert to fiat at time of purchase</p>
                <p className="features-description">
                  Link your crypto wallets to the card in priority order for seamless spending. Only
                  sell crypto you need to cover each transaction.
                </p>
                <div
                  className={`col-12 note features-text-caption ${isBrowser ? 'text-left' : ''}`}>
                  *Feature availability depending on your region of residence.
                </div>
              </span>
            </div>
          </Fade>
        </div>
        <div className="col-xl-6 col-12">
          <Fade>
            <div className="features-item" style={{ marginBottom: '6.5rem' }}>
              <span className="img-container">
                <img
                  className="position-absolute top-50 start-50 translate-middle"
                  src="/assets/images/paycheck.svg"
                  alt="paycheck"
                />
              </span>

              <span>
                <p className="features-title">Earn monthly rewards, cashback and loyalty*</p>
                <p className="features-description">
                  Shop online or in-store with your VetCard and earn cashback/rewards/digital assets
                  every month.
                </p>
              </span>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  </SectionContainer>
);

export default Features;
