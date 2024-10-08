import React from 'react'
import './SettingInput.css';
import { useStateContext } from '../../contexts/ContextProvider';

const SettingInput = ({ label, value, icon, margin, borderColor }) => {

    const { currentColor, currentMode } = useStateContext();

    return (
        <>
            <div className='hidden-input-container' style={{ margin, border: `3px solid ${currentColor}` }}>
                <span className="hidden-input-text" style={{ backgroundColor: currentMode === 'Dark' ? 'RGB(32, 35, 42)' : 'white' }}>{label}</span>
                <input type="text" value={value} readOnly style={{ backgroundColor: currentMode === 'Dark' ? 'transparent' : 'white',color:currentMode === 'Dark' ? 'white' : 'black' }} />
                {
                    icon ?
                        <IoIosCloseCircle fontSize={30} color='lightgrey' style={{ margin: 5 }} />
                        :
                        ''
                }
            </div>
        </>
    )
}

export default SettingInput