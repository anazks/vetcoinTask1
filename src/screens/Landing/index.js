import React, {
  useState,
  useEffect,
  useRef
} from "react";
import { useSearchParams } from "react-router-dom";
import SubscribeModal from "./modals";
import AlreadyMemberModal from "./modals/alreadyMemberModal";
import ChangePasswordModal from "./modals/changePasswordModal";
import RankModal from './modals/rankModal';
import {
  MODAL_SCREENS,
  MEMBER_MODAL,
  PASSWORD_MODAL,
  RANK_MODAL
} from "./modals/constants";
import SubscribeForm from "./modals/subscribeForm";
import AlreadyMember from "./modals/alreadyMember";
import MailedSuccess from "./modals/mailedSuccess";
import ForgotPassowrd from "./modals/forgotPassowrd";
import ResetPasswordModal from "./modals/reset-password-modal";
import RankContent from './modals/rankContent';
// Nick - Remove Login Success Modal
import ChangePassword from "./modals/changePassword";
import ChangePasswordSuccess from "./modals/changePasswordSuccess";
import Success from "./modals/success";
import FaqModal from "./modals/faq";
// import Congrats from "../../components/Congrats/Congrats";
import {
  TermsConditions,
  Cover,
  Header,
  AuthenticatedHeader,
  Card,
  Features,
  Note,
  Footer
} from "./partials";
import PageLayout from "./partials/Layout";


// Nick - add hooks for account state
import useUserAccount from "../../hooks/useUserAccount";

const Landing = () => {
  const [currentScreen, setCurrentScreen] = useState(MODAL_SCREENS[0]);
  const [memberScreen, setMemberScreen] = useState(MEMBER_MODAL[0]);
  const [passwordModal, setPasswordModal] = useState(PASSWORD_MODAL[0]);
  const [rankContent, setRankContent] = useState(RANK_MODAL[0]);

  const [searchParams] = useSearchParams();

  const { account } = useUserAccount();
  // const [userData, setUserData] = useState(null);

  // const [status, setStatus] = useState(0);
  // setStatus(1);

  const resetPasswordModalRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    resetPasswordModalRef.current = new bootstrap.Modal(document.getElementById("reset-pwd-modal"));

    const resetToken = searchParams.get("token");

    if (resetToken) {
      resetPasswordModalRef.current?.toggle();
    }
  });

  const resetPwdToken = searchParams.get("token");
  const userName = searchParams.get("name");

  return (
    <PageLayout>
      {(!account.ecosystem_uuid) &&
        <Header />
      }
      {(!!account.ecosystem_uuid) &&
        <AuthenticatedHeader />
      }
      <Cover />
      <Card />
      <Features />
      <Note />
      <Footer />
      
      <SubscribeModal
        screens={MODAL_SCREENS}
        currentScreen={currentScreen}>
        <SubscribeForm onChangeScreen={setCurrentScreen} />
        <Success onChangeScreen={setCurrentScreen} />
      </SubscribeModal>
      <AlreadyMemberModal
        screens={MEMBER_MODAL}
        currentScreen={memberScreen}
        changeScreen={setMemberScreen}>
        <AlreadyMember onChangeScreen={setMemberScreen} />
        <ForgotPassowrd onChangeScreen={setMemberScreen} />
        <MailedSuccess onChangeScreen={setMemberScreen} />
        <ChangePassword onChangeScreen={setMemberScreen} />
        <ChangePassword onChangeScreen={setMemberScreen} />
      </AlreadyMemberModal>
      <ChangePasswordModal
        screens={PASSWORD_MODAL}
        currentScreen={passwordModal}
        changeScreen={setPasswordModal}>
        <ChangePassword onChangeScreen={setPasswordModal} />
        <ChangePasswordSuccess onChangeScreen={setPasswordModal} />
      </ChangePasswordModal>
      {/* Nick - Add Reset Password Modal */}
      <ResetPasswordModal resetToken={resetPwdToken} userName={userName} />
      <RankModal screens={RANK_MODAL} currentScreen={rankContent}>
        <RankContent onChangeScreen={setRankContent} />
      </RankModal>
      <TermsConditions />
      <FaqModal />
    </PageLayout>
  );
};

export default Landing;
