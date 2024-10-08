import React from 'react'
import Layout from '../../layout/Layout'
import { Table, Header } from "../../components/index" 
import { tableColumns, tableData } from "../../data/dummy"

const TransactionType = () => {
  return (
    <>
        <Layout>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
        <Header category="Transaction Detail" title="Transaction Types" />
        <Table 
            columns={tableColumns} data={tableData} itemsPerPage={10}
        />
        </div>
        </Layout>
    </>
  )
}

export default TransactionType