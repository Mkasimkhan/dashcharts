import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from './contexts/ContextProvider';
import { Toaster } from "react-hot-toast";
import { ProtectedRoutes } from './Container/Routing/index'
import { LoginScreen, ForgotPasswordScreen, ResetPasswordScreen, VerifyScreen} from './Container/Screens/index';
import { 
  Blog, Blogs, Dashboard, 
  EditBlog, BlogDetail, NotFound,
  UploadPage, RegisterPage, 
  Criteria, AccountPage, ProfilePage,
  TransactionType, AddBankPage, Banks,
  EditBankPage,FaqPage
} from './pages';




const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

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

        <ToastContainer />
        <Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            {/* <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} />} />
            <Route path="/add-blogs" element={<ProtectedRoutes Component={Blog} />} />
            <Route path="/all-blogs" element={<ProtectedRoutes Component={Blogs} />} />
            <Route path="/edit-blog/:id" element={<ProtectedRoutes Component={EditBlog} />} />
            <Route path="/single-blog/:id" element={<ProtectedRoutes Component={BlogDetail} />} />
            <Route path="/register" element={<ProtectedRoutes Component={RegisterScreen} />} /> */}

            {/* <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} /> */}
            <Route path="/dashboard" element={<Dashboard/> } />
            <Route path="/upload-files" element={<UploadPage />} />
            <Route path="/transaction-type" element={<TransactionType />} />
            <Route path="/add-bank" element={<AddBankPage />} />
            <Route path="/bank-list/:id" element={<EditBankPage />} />
            <Route path="/bank-list" element={<Banks />} />
            <Route path="/criteria" element={<Criteria />} />
            <Route path="/add-blogs" element={<Blog />} />
            <Route path="/all-blogs" element={<Blogs />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/single-blog/:id" element={<BlogDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account-setting" element={<AccountPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} />} />
            <Route path="/upload-files" element={<ProtectedRoutes Component={UploadPage} />} />
            <Route path="/transaction-type" element={<ProtectedRoutes Component={TransactionType} />} />
            <Route path="/add-bank" element={<ProtectedRoutes Component={AddBankPage} />} />
            <Route path="/bank-list/:id" element={<ProtectedRoutes Component={EditBankPage} />} />
            <Route path="/bank-list" element={<ProtectedRoutes Component={Banks} />} />
            <Route path="/criteria" element={<ProtectedRoutes Component={Criteria} />} />
            <Route path="/add-blogs" element={<ProtectedRoutes Component={Blog} />} />
            <Route path="/all-blogs" element={<ProtectedRoutes Component={Blogs} />} />
            <Route path="/edit-blog/:id" element={<ProtectedRoutes Component={EditBlog} />} />
            <Route path="/single-blog/:id" element={<ProtectedRoutes Component={BlogDetail} />} />
            <Route path="/register" element={<ProtectedRoutes Component={RegisterPage} />} />
            <Route path="/profile" element={<ProtectedRoutes Component={ProfilePage} />} />
            <Route path="/account-setting" element={<ProtectedRoutes Component={AccountPage} />} /> */}


            <Route path="/" element={<LoginScreen />} />
            <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
            <Route path='/verify-screen/:token' element={<VerifyScreen />} />
            <Route path='/resetpassword/:id' element={<ResetPasswordScreen />} />
            <Route path='*' element={<NotFound />} />

          </Routes>

        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
