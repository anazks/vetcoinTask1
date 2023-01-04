import React from "react";
import PageLayout, { SectionContainer } from "../Landing/partials/Layout";
import {
  AuthenticatedHeader,
  Footer
} from "../Landing/partials";

import useUserAccount from "../../hooks/useUserAccount";
import { links } from "../../utils/constants";

const MemberAreaPage = () => {

  const { account } = useUserAccount();

  const frameSrc = links.MembersArea + account.ecosystem_uuid;

  return (
    <PageLayout>
      <AuthenticatedHeader />

      <div>
        <SectionContainer>
          <iframe
            style={ {
              width : "100%",
              height : "80vh"
            } }
            id="member-area-iframe"
            src={ frameSrc }
            title="Member Area" />
        </SectionContainer>
      </div>

      <Footer />
    </PageLayout>
  )
};

export default MemberAreaPage;
