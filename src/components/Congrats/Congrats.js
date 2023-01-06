import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { AiFillCopy } from "react-icons/ai";
import { useApi } from "../../utils/hooks";
import PageLayout, { SectionContainer } from '../../screens/Landing/partials/Layout'
import { AuthenticatedHeader, Header } from '../../screens/Landing/partials'
import './congrats.scss'
import useUserAccount from '../../hooks/useUserAccount';
import { USERDATA } from '../../utils/constants';


function Congrats() {
  const [user] = useSearchParams();
  const [userData, setUserData] = useState('')
  const UID = user.get('uid');
  console.log(UID)
  const  { data,refetch } =   useApi('post', `/v2/account/loginWithUID`, { type: 'ledger' },);
  console.log(data)
  const { authAccount,account } = useUserAccount();


 
  // console.log(data);
 
 
  
  useEffect(() => {  
    refetch({
      "uid" :UID
    })
    if(data){
       setUserData(data)
        console.log(data)
        console.log("userData...",userData)
        const { email, firstName, referlink,created_at: createdAt, ecosystem_uuid:ecosystemUuid } = data;
        USERDATA.userData = data
        if (ecosystemUuid) {
          authAccount(email, firstName, referlink, createdAt, ecosystemUuid);
          document.querySelector("#membermodal .close")?.click();
        }
        else {
          alert(data)
        }
      }
  },[])

  
return (
  <PageLayout>
       {(!account.ecosystem_uuid) &&
        <Header />
      }
      {(account.ecosystem_uuid) &&
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
                <div className='clipBox'>
                  <p className='clipText'>https://localhost/waiting-list/register?ref=ob1Ttsyl<AiFillCopy className='icons' /> </p>
                </div>
                <div className="social">

                  <img src="/assets/images/twitter-ref.svg" style={{backgroundColor:"rgb(25, 167, 223)"}} alt="" />
                  <img src="/assets/images/linkedin-ref.svg" style={{backgroundColor:"rgb(42, 58, 184)"}} alt="" />
                  <img src="/assets/images/facebook.svg" style={{backgroundColor:"rgb(19, 8, 243)"}}  alt="" />
                  <img src="/assets/images/whatsapp-ref.svg" style={{backgroundColor:"green"}}  alt="" />

                </div>
              </div>

            </div>
          </div>
        </div>

      </SectionContainer>


    </PageLayout>

  )
}

export default Congrats