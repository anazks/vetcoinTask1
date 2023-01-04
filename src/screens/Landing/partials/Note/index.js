import React from 'react';
import { isMobile } from 'react-device-detect';
import Fade from 'react-reveal/Fade';

import { SectionContainer } from '../Layout';

const Note = () => (
  <SectionContainer>
    <div
      className={`note-layout ${isMobile ? '' : 'mx-auto'}`}
      style={{
        marginTop: isMobile ? '5rem' : '6.5rem',
        marginBottom: isMobile ? '5rem' : '6.5rem',
      }}>
      <Fade>
        <p className="fs-f5 mb-5">
          *Subject to eligibility conditions, including country of residence and availability.
          Entering the waiting list does not mean you will receive a VetCard. It does not in any
          event constitute a commitment to deliver the VetCard or a commitment on the features that
          will be offered by the VetCard. The VetCard and its features are provided to you by
          Sentinel Digital Inc and partners, not by Ledger. By filling out this form, you consent to
          Sentinel Digital Inc collecting your information. Sentinel Digital Inc will add you to the
          waiting list and transfer your data to Vetcoin HQ which will send you news and updates
          about the VetCard.
        </p>
        <p className="fs-f5 mb-5">
          *The VetCard and its features are provided by Sentinel Digital Inc and Partners.
        </p>
      </Fade>
    </div>
  </SectionContainer>
);

export default Note;
