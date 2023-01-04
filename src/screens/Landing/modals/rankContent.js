/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import { isMobile } from 'react-device-detect';
import { BASENAME } from '../../../utils/constants';
import { useApi } from '../../../utils/hooks';
// import { useUrlQuery } from '../../../utils/router';
import useUserAccount from "../../../hooks/useUserAccount";

const SHARING_MESSAGE =
    "I've just joined the waitlist of the VetCard, powered by @Sentinel Digital. ";
const HASHTAG = 'yourcryptoyourlife';

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const BASE_ASSETS = process.env.REACT_APP_IS_TEST_BUILD ? '.' : '';

// eslint-disable-next-line no-restricted-globals
const referralLink = IS_DEV ? `${location.hostname}${BASENAME}` : `cl-cards.com/waiting-list`;
const RankContent = () => {
    // const query = useUrlQuery();
    // const ref = query.get('ref');
    const { account } = useUserAccount();

    const refLink = `https://${referralLink}/register?ref=${account.referlink}`;
    const [copied, setCopied] = useState(false);

    const { data: userPosition, refetch } = useApi('get', `/v2/waiting_list/rank?email=${account.email}`, {
        type: 'ledger',
    });


    const handleCopyClick = () => {
        navigator.clipboard.writeText(refLink);
        setCopied(true);
    };

    // useEffect(refetch, []);

     useEffect(() => {
         if (account.email) {
             console.log("email", account.email);
             refetch();
         }
     }, [account]);


    /*  useEffect(() => {
        // eslint-disable-next-line no-undef
        $('#rankModal').on('shown.bs.modal', () => {
            refetch();
        });
    }, []);
    */

    return (
        <div className="referral-page" style={{ minHeight: '100vh' }}>
            <div className="referral">
                <div className="py-6">
                    <img
                        src={`${BASE_ASSETS}/assets/images/vetcoin-small.png`}
                        alt="Ledger"
                        className="m-auto d-block" style={{ width: 180 }}
                    />
                </div>
                <div>
                    {/* <div className="header text-uppercase">
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
                    </div> */}
                    {/* <div
                        className={`subtext ${isMobile ? 'mt-3 pb-0' : 'mt-4'} pt-0 `}
                        style={{ marginBottom: '4rem' }}>
                        Congratulations, you have entered the VetVault members area and joined the waitlist for the VetCard.
                    </div> */}
                </div>
                <div className="reward-container">
                    <div className="reward-wrapper">
                        {/* <div className="image-container">
                            <img
                                src={`${BASE_ASSETS}/assets/images/reward.svg`}
                                alt="reward"
                                className="d-block m-auto reward-image"
                            />
                        </div> */}
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

                                {/* <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}> Your temporary password to access Members Area is </p>
                                <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}><b>{ref}</b></p>
                                <p className={`text-f5 mt-2 ${isMobile ? 'px-0 pb-0' : ''} mb-0 subtext text-start text-center`}>
                                    <button type="submit" className="w-60 btn btn-primary text-center" style={{ marginTop: 15 }}>
                                        <a href={refLink}>
                                            Go to Members Area</a>
                                    </button></p>
                                <br /> */}
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

export default RankContent;








// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable camelcase */
// import React, { useEffect, useState } from 'react';
// import { useApi } from '../../../utils/hooks';
// import { showAlert } from '../../../utils/notifications';
// import { USERDATA } from '../../../utils/constants';

// const handleAnalytics = () => {
//     window.dotq = window.dotq || [];
//     window.dotq.push({
//         projectId: '10000',
//         properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
//     });
// };

// const RankContent = () => {
//     const [form, setForm] = useState({
//         email: '',
//         password: '',
//         newPassword: ''
//     });
//     const {
//         data,
//         error,
//         isLoading,
//         refetch: submitData,
//     } = useApi('post', '/v2/account/update', { type: 'ledger' });

//     const handleChange = (e) => {
//         const { value, name } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     useEffect(() => {
//         if (error) {
//             const { message } = error;
//             showAlert({ message, type: 'warning' });
//         } else if (data) {
//             const { ecosystem_uuid } = data;
//             USERDATA.userData = data
//             // alert(JSON.stringify(data));
//             // const { email, name, referlink, created_at, ecosystem_uuid } = data;
//             if (ecosystem_uuid) {
//                 // onChangeScreen(PASSWORD_MODAL[1]);
//                 window.location.reload(true);
//             }
//             else {
//                 alert(data)
//             }
//         }
//     }, [data, error]);

//     const handleSubmitForm = (e) => {
//         e.preventDefault();
//         submitData({
//             email: form.email,
//             password: form.password,
//             newPassword: form.newPassword
//         });
//         handleAnalytics();
//     };
//     return (
//         <div className="form">
//             <p className="header upper-case text-h1">Change Password</p>
//             <form onSubmit={handleSubmitForm} id="confirm-phone-form" style={{ marginTop: '2.563rem' }}>
//                 <div className="form-group mb-4">
//                     <input
//                         name="email"
//                         type="email"
//                         className="form-control-input"
//                         placeholder="Your email"
//                         onChange={handleChange}
//                         required
//                     />
//                     <label className="floating-label">Your email</label>
//                 </div>

//                 <div className="form-group mb-4">
//                     <input
//                         name="password"
//                         type="password"
//                         className="form-control-input"
//                         placeholder="Current Password"
//                         onChange={handleChange}
//                         required
//                     />
//                     <label className="floating-label">Current Password</label>
//                 </div>

//                 <div className="form-group mb-4">
//                     <input
//                         name="newPassword"
//                         type="password"
//                         className="form-control-input"
//                         placeholder="New Password"
//                         onChange={handleChange}
//                         required
//                     />
//                     <label className="floating-label">New Password</label>
//                 </div>

//                 <button type="submit" className="w-100 btn btn-primary btn-wide">
//                     {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Proceed'}
//                 </button>
//             </form>
//         </div>
//     );
// };
// export default RankContent;
