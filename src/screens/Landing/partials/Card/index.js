import React from 'react';
import { isMobile } from 'react-device-detect';
import Fade from 'react-reveal/Fade';

import useUserAccount from "../../../../hooks/useUserAccount";

import { SectionContainer } from '../Layout';

const Card = () => {

  const { account } = useUserAccount();

  return (
    <SectionContainer>
      <div className="card-layout">
        <div className="row">
          <div className="col-xl-6 col-12 text-xl-start p-0">
            <img src="/assets/images/Vetcoin_Card_body.png" alt="Ledger card body" />
          </div>

          <div className="col-xl-6 col-12 my-auto text-xl-start">
            <Fade bottom>
              <div className={`d-block ${isMobile ? 'text-center' : 'text-left'}`}>
                <p className={`${!isMobile ? 'mt-0' : ''} mb-0`}>
                  The VetCard allows users to move assets quickly, seamlessly and securely between
                  their wallet and the debit card, using the VETCoin app. Whilst on the waitlist,
                  connect 3 debit cards and earn Vet Loyalty on every day spending - Enter the
                  VetVault Member&apos;s area now!
                </p>
                <p className="mt-2" style={{ fontSize: '16px', color: '#717070' }}>
                  Be first in line to get your virtual VetCard and early access to the VetVault member&apos;s
                  area, powered by Sentinel Digital.
                </p>

                {
                  !account.ecosystem_uuid && (
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#modal">
                      Join the waitlist
                    </button>
                  )
                }
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
};

export default Card;
