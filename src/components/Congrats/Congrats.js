import React, { useEffect,useState,useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { useApi } from "../../utils/hooks";
import PageLayout, { SectionContainer } from '../../screens/Landing/partials/Layout'
import { AuthenticatedHeader, Header } from '../../screens/Landing/partials'
import './congrats.scss'
import useUserAccount from '../../hooks/useUserAccount';
import { BASENAME, USERDATA } from '../../utils/constants';
// import changePasswordSuccess from '../../screens/Landing/modals/changePasswordSuccess';
import ChangePasswordModal from '../../screens/Landing/modals/changePasswordModal';
import ChangePassword from '../../screens/Landing/modals/changePassword';
import { PASSWORD_MODAL, RANK_MODAL } from '../../screens/Landing/modals/constants';
import RankModal from '../../screens/Landing/modals/rankModal';
import RankContent from '../../screens/Landing/modals/rankContent';
// import { MEMBER_MODAL } from '../../screens/Landing/modals/constants';


const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const BASE_ASSETS = process.env.REACT_APP_IS_TEST_BUILD ? '.' : '';
const referralLink = IS_DEV ? `${window.location.hostname}:3000${BASENAME}` : `cl-cards.com/waiting-list`;
const SHARING_MESSAGE =
  "I've just joined the waitlist of the VetCard, powered by @Sentinel Digital.";
const HASHTAG = 'yourcryptoyourlife';
function Congrats() {
  const [copied, setCopied] = useState(false);
  const [passwordModal, setPasswordModal] = useState(PASSWORD_MODAL[0]);
  const [rankContent, setRankContent] = useState(RANK_MODAL[0]);

 
  

  const [user] = useSearchParams();
  const UID = user.get('uid');
  console.log(UID)
  
  const { authAccount,account } = useUserAccount();
  const  { data,refetch } =   useApi('post', `/v2/account/loginWithUID`, { type: 'ledger' },);
  const singleRef = useRef(true);
  

  

 useEffect(() => {  
  if(UID){
    if(!data){
      refetch({uid:UID})  
    }
    if(data && singleRef.current){
      console.log("data",data)
      USERDATA.userData = data
      const { email, firstName, referlink,created_at: createdAt, ecosystem_uuid:ecosystemUuid } = data;
       authAccount(email, firstName, referlink, createdAt, ecosystemUuid);
       singleRef.current=false;
      //  onChangeScreen(MEMBER_MODAL[3]);

        // Nick - Update to close modal instead of open success modal
        document.querySelector("#membermodal .close")?.click();
    }  
      
  } 
  },[data])


const refLink = `https://${referralLink}/register?ref=${account.referlink}`;
const handleCopyClick = () => {
  navigator.clipboard.writeText(refLink);
  setCopied(true);
};

return (
  <PageLayout>
     
       {(!account.ecosystem_uuid) &&
        <Header />
      }
      {(!!account.ecosystem_uuid) &&
        <AuthenticatedHeader />
      }
    
      <SectionContainer className="bg-dark">
        <div className="bg-dark wl-cover">
          <div className="mb-4 pb-3">
            <img
              src="/assets/images/vetcoin.png"
              alt="Ledger"
              className="img-fluid"
              style={{ maxWidth: 150 }}
            />
            <div className='mainBox'>
              <div className='box'>
                <img src="/assets/images/reward.svg" alt="" />
              </div>
              <div className='box'>
                <p>Invite your friends to get member benefite immediatly !
                  Get reward when they join with your unique referel link
                </p>
                <p className='smallText'>Move up the waitinglist when others join uisng your referral link</p>
                <div className='clipBox' style={{display:"flex"}}>

                  <p className='clipText'>https://localhost/waiting-list/register?ref=ob1Ttsyl</p>
                  <div onClick={handleCopyClick} aria-hidden="true" className="copy float-end m-0 clipText">
                    <img
                      src={`${BASE_ASSETS}/assets/images/${copied ? 'check-icon' : 'copy'}.svg`}
                      alt="copy" className='copyImg' style={{width:"20px",height:"auto"}}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row social-media-container social" >
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
          </div>
        </div>

      </SectionContainer>

      <ChangePasswordModal
        screens={PASSWORD_MODAL}
        currentScreen={passwordModal}
        changeScreen={setPasswordModal}>
        <ChangePassword onChangeScreen={setPasswordModal} />
        <changePasswordSuccess onChangeScreen={setPasswordModal} />
      </ChangePasswordModal>

      <RankModal screens={RANK_MODAL} currentScreen={rankContent}>
        <RankContent onChangeScreen={setRankContent} />
      </RankModal>
    </PageLayout>


  )
}

export default Congrats