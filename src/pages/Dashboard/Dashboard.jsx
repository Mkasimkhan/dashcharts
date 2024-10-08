import React, { useState, useEffect } from 'react'

// Components
import Layout from '../../layout/Layout';
import { Header, Statistic, AdminTable} from '../../components/index'
import { getBankData } from "../../utils/bankRole.js"
import AdminDashboard from './AdminDashboard.jsx';
import BankDashboard from "./BankDashboard.jsx"

const Dashboard = () => {

    const [bank, setBank] = useState(null);
    useEffect(() => {
        const bankInfo = getBankData();
        setBank(bankInfo);
    }, []);

    return (
        <>
           {
                bank?.role === "admin" ? (
                    <AdminDashboard />
                ) : (
                    <BankDashboard />
                )
            }

        </>
    )
}

export default Dashboard

/**
 * 
 * <Layout>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-md bg-[#f7f7f7]">
                    <Header category="Page" title="Dashboard" />
                    <Statistic />
                    <AdminTable />
                </div>
            </Layout>
 */