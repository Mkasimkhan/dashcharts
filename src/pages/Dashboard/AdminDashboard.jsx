import React from 'react'
import Layout from '../../layout/Layout';
import { Header, Statistic, AdminTable} from '../../components/index'

const AdminDashboad = () => {
    return (
        <>
            <Layout>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-md bg-[#f7f7f7]">
                    <Header category="Page" title="Dashboard" />
                    <Statistic />
                    <AdminTable />
                </div>
            </Layout>
        </>
    )
}

export default AdminDashboad