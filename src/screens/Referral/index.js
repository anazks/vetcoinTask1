/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { isMobile } from 'react-device-detect';
import { BASENAME } from '../../utils/constants';
import { useApi } from '../../utils/hooks';
import { useUrlQuery } from '../../utils/router';

const SHARING_MESSAGE =
  "I've just joined the waitlist of the VetCard, powered by @Sentinel Digital.";
const HASHTAG = 'yourcryptoyourlife';

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const BASE_ASSETS = process.env.REACT_APP_IS_TEST_BUILD ? '.' : '';

// eslint-disable-next-line no-restricted-globals
const referralLink = IS_DEV ? `${window.location.hostname}:3000${BASENAME}` : `cl-cards.com/waiting-list`;

const Referral = () => {
  const query = useUrlQuery();
  const ref = query.get('ref');
  const uid = query.get('uid');
  const name = query.get('name');
  const token = query.get('token');
  const isPwdReset = query.get('is_pwd_reset');

  const refLink = `https://${referralLink}/register?ref=${ref}`;
  const resetLink = `http://${referralLink}/reset-password?token=${token}&name=${name}&is_pwd_reset=${isPwdReset}`;
  const [copied, setCopied] = useState(false);
  const ecosystemLink = `https://vetcoin-members.sentinel-digital.com/?uid=${uid}`;

  const { data: userPosition, refetch } = useApi('get', `/v2/waiting_list/position?ref=${ref}`, {
    type: 'ledger',
  });

  const handleCopyClick = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
  };

  useEffect(refetch, []);

  return (
    <div className="referral-page" style={{ minHeight: '100vh' }}>
      <div className="referral">
        <div className="py-5">
          <img
            src={`${BASE_ASSETS}/assets/images/vetcoin-small.png`}
            alt="Vetcoin"
            className="m-auto d-block"
            style={{ width: 170 }}
          />
        </div>
        <div>
          <div className="header text-uppercase">
            <span>
              You are{' '}
              <span className="reward-header" style={{ fontFamily: 'Inter' }}>
                №
              </span>
            </span>
            {` `}
            {(!userPosition?.position ||
              userPosition?.position === null ||
              userPosition?.position === '' ||
              userPosition?.position === undefined) && (
                <div
                  className="position-relative d-inline-block"
                  style={{ width: '3rem', height: '2.25rem', top: '0.438rem' }}>
                  <span className="dot-flashing-loader position-absolute top-50 start-50 translate-middle" />
                </div>
              )}
            {userPosition?.position &&
              userPosition?.position !== null &&
              userPosition?.position !== '' &&
              userPosition?.position !== undefined && <span>{userPosition?.position}</span>}
            <span>{` `}on the waitlist</span>
          </div>
          <div
            className={`subtext ${isMobile ? 'mt-3 pb-0' : 'mt-4'} pt-0 `}
            style={{ marginBottom: '4rem' }}>
            Congratulations, you have entered the VetVault members area and joined the waitlist for the VetCard.
          </div>
        </div>
        <div className="reward-container">
          <div className="reward-wrapper">
            <div className="image-container">
              <img
                src={`${BASE_ASSETS}/assets/images/reward.svg`}
                alt="reward"
                className="d-block m-auto reward-image"
              />
            </div>
            <div className="content-container">
              <div className="reward-header">
                You are ranked as №{` `}
                {(!userPosition?.rank ||
                  userPosition?.rank === null ||
                  userPosition?.rank === '' ||
                  userPosition?.rank === undefined) && (
                    <div
                      className="position-relative d-inline-block"
                      style={{ width: '3rem', height: '2.25rem', top: '0.438rem' }}>
                      <span className="dot-flashing-loader position-absolute top-50 start-50 translate-middle" />
                    </div>
                  )}
                {userPosition?.rank &&
                  userPosition?.rank !== null &&
                  userPosition?.rank !== '' &&
                  userPosition?.rank !== undefined && <span>{userPosition?.rank}</span>}

                <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}> Congratulations and Enjoy the VetVault members area !! </p>
                {/* <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}><b>{ref}</b></p> */}
                <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}>
                  <button type="submit" className="w-60 btn btn-primary text-center" style={{ marginTop: 15 }}>
                    <a href={ecosystemLink} target="_blank" rel="noreferrer">
                      Go to Loyalty Program</a>
                  </button></p>
                <br />

                <p className={`text-f6 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}> Your temporary password to access Members Area is <b>{ref}</b></p>
                <p className={`text-f6 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}>
                  <a href={resetLink} target="_blank" rel="noreferrer"><u>Click here to Reset Password</u></a>
                </p>
                <br />

                <p
                  className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start`}>
                  Invite your friends to get members benefits immediately! Get rewarded when they join the waitlist with your unique referral link.
                </p>
              </div>
              <div className="reflink mt-5">
                <div className="label mb-1">
                  Move up the waitlist when others join using your referral link:
                </div>
                <div className="link-container w-100 pb-2 clearfix position-relative">
                  <div
                    className="link float-start m-0 position-absolute start-0 top-0"
                    style={{ width: 'calc(100% - 1.313rem)' }}>
                    {refLink}
                  </div>
                  <div onClick={handleCopyClick} aria-hidden="true" className="copy float-end m-0">
                    <img
                      src={`${BASE_ASSETS}/assets/images/${copied ? 'check-icon' : 'copy'}.svg`}
                      alt="copy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row" style={{ marginTop: '2.5rem' }}>
            <div className="spacer" />
            <div className="d-flex flex-row social-media-container">
              <TwitterShareButton url={refLink} title={SHARING_MESSAGE} hashtags={[HASHTAG]}>
                <div className="twitter-background social-media-link ms-0 m-2">
                  <img
                    src={`${BASE_ASSETS}/assets/images/twitter-ref.svg`}
                    alt="Twitter"
                    className="social-media-icon"
                  />
                </div>
              </TwitterShareButton>
              <LinkedinShareButton url={refLink} title={`${SHARING_MESSAGE}\n\n${HASHTAG}`}>
                <div className="linkedin-background social-media-link m-2">
                  <img
                    src={`${BASE_ASSETS}/assets/images/linkedin-ref.svg`}
                    alt="Linkedin"
                    className="social-media-icon"
                  />
                </div>
              </LinkedinShareButton>
              <FacebookShareButton url={refLink} quote={SHARING_MESSAGE} hashtag={HASHTAG}>
                <div className="facebook-background social-media-link m-2">
                  <img
                    src={`${BASE_ASSETS}/assets/images/facebook-ref.svg`}
                    alt="Facebook"
                    className="social-media-icon"
                  />
                </div>
              </FacebookShareButton>
              <WhatsappShareButton url={refLink} title={SHARING_MESSAGE} separator={'\n'}>
                <div className="whatsapp-background social-media-link m-2">
                  <img
                    src={`${BASE_ASSETS}/assets/images/whatsapp-ref.svg`}
                    alt="Whatsapp"
                    className="social-media-icon"
                  />
                </div>
              </WhatsappShareButton>
            </div>
          </div>
        </div>
        <div className="asterix mt-4 pb-5">
          *Subject to eligibility conditions, including country of residence and availability.
        </div>
      </div>
    </div>
  );
};

export default Referral;
