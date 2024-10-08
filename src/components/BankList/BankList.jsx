import React, { useState, useEffect, useCallback } from 'react';

// Component
import { Header, MuiTable, Table } from '../../components/index';
import { API_ENDPOINT } from "../../constant/constant"
import { bankListColumns } from "../../data/dummy"
import { config  } from "../../utils/bankRole"

// Libarary
import axios from 'axios'


const BankList = () => {
    const [bankData, setBankData] = useState([]);
   
    const fetchBankData = useCallback(() => {
        axios
            .get(`${API_ENDPOINT}/get-banks`, config)
            .then((response) => {
                setBankData(response?.data?.bankUser);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        fetchBankData();
    }, [fetchBankData]);

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
                <Header category="Bank" title="All Banks" />
                <Table
                    columns={bankListColumns} data={bankData} itemsPerPage={10} bankTable={true}
                />
            </div>
        </>
    );
};
export default BankList;