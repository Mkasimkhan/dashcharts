import React, { useEffect, useState } from 'react'

// Component
import { useStateContext } from '../contexts/ContextProvider';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components/index';
import { getBankData } from "../utils/bankRole.js"

// Icons
import { FiSettings } from 'react-icons/fi';

const Layout = ({ children }) => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

    const [bank, setBank] = useState(null);
    useEffect(() => {
        const bankInfo = getBankData();
        setBank(bankInfo);
    }, []);
    
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);
    return (
        <>

            <div className={currentMode === 'Dark' ? 'dark' : ''}>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                            <button
                                type="button"
                                onClick={() => setThemeSettings(true)}
                                style={{ background: currentColor, borderRadius: '50%' }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                <FiSettings />
                            </button>                        
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                            <Sidebar userRole = {bank?.role}/>
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar userRole = {bank?.role} />
                        </div>
                    )}
                    <div
                        className={
                            activeMenu
                                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        }
                    >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>
                        <div>
                            {themeSettings && (<ThemeSettings />)}

                            {children}

                        </div>
                        <Footer />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Layout