import React, {useState, useEffect} from 'react';
// Component
import SettingInput from '../SettingInput/SettingInput';
import { useStateContext } from '../../contexts/ContextProvider';
import { getBankData  } from "../../utils/bankRole"
import { Logo } from "../../assets/index";

// CSS
import './Profile.css';

const ProfileSetting = () => {

    const { currentColor, currentMode } = useStateContext();
    const [bank, setBank] = useState(null);
    useEffect(() => {
        const bankInfo = getBankData();
        setBank(bankInfo);
    }, []);

    return (
        <>
            <div className="profile-setting-container">
                <div className="background-image"></div>

                <div className="profile-details-container">
                    <div className="profile-setting-header">
                        <div className='profile-setting-header-content'>
                            {/* <img style={{border:`5px solid ${currentColor}`}} className='m-5' src="https://media.istockphoto.com/id/1316604492/photo/profile-portrait-of-middle-aged-man-over-grey-background.jpg?s=612x612&w=0&k=20&c=m_9Xg7mIqE8E4Zx2bVd_n1DMu2b2OvD97GhNQsJmQeE=" alt="profile-img" /> */}
                            <img className='m-5' src= {bank?.bankLogo || Logo} alt="profile-img" />
                            <div>
                                <h2 style={{ color: currentMode === 'Dark' ? 'white' : 'black'}}><b>
                                    {bank?.name}
                                </b></h2>
                                <h3 style={{ color: 'gray' }}>{bank?.email}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="profile-setting-body">
                        <SettingInput
                            label={'Bank Unique ID'}
                            value={`${bank?.bankUniqueId}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={'Name'}
                            value={`${bank?.name}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={'Email'}
                            value={`${bank?.email}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={"Country"}
                            value={`${bank?.country}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={'Platform'}
                            value={`${bank?.platform}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={'Contact Number'}
                            value={`${bank?.contactNumber || null}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                        <SettingInput
                            label={'Bank Status'}
                            value={`${bank?.status?.toUpperCase()}`}
                            icon={false}
                            margin={'20px 10px'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSetting