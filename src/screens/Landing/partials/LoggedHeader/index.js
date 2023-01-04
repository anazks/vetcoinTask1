import React from 'react';
import { links, USERDATA } from '../../../../utils/constants';
import { SectionContainer } from '../Layout';

function clearUserData() {
    USERDATA.userData = null;
}

const LoggedHeader = () => (
    <SectionContainer className="bg-dark">
        <div className="wl-header py-4">
            <a href={links.sntnl} target="_blank" rel="noreferrer">
                <img
                    src="/assets/images/logo.png"
                    className="img-fluid"
                    alt="VETCOIN"
                    style={{ maxWidth: 220 }}
                />
            </a>
            <div className="dropdown">
                <button className="dropbtn" type="button">
                    {`Welcome! ${USERDATA.userData.firstName}`}
                </button>
                <div className="dropdown-content ">
                    <button
                        type="button"
                        style={{ width: '100%', backgroundColor: '#02d1ae', borderWidth: 0, padding: 0 }} >
                        <a href={links.MembersArea + USERDATA.userData.ecosystem_uuid} target="_blank" rel="noreferrer" >Loyality Program</a>
                    </button>

                    <button type="button" style={{ width: '100%', backgroundColor: '#02d1ae', borderWidth: 0, padding: 0 }}>
                        <a href={links.ReferLink + USERDATA.userData.referlink} target="_blank" rel="noreferrer" >Check Your Rank</a>
                    </button>

                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#changePasswordModal"
                        style={{ width: '100%', backgroundColor: '#02d1ae', borderWidth: 0, padding: 0 }} >
                        <span className='span-btn'>Change Password</span>
                    </button>

                    <button
                        type="button"
                        style={{ width: '100%', backgroundColor: '#02d1ae', borderWidth: 0, padding: 0 }}
                        onClick={clearUserData} >
                        <a href="/" >Log Out</a>
                    </button>


                </div>
            </div>
        </div>
    </SectionContainer>
);

export default LoggedHeader;
