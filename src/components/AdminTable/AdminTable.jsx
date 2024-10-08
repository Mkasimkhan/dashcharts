import React, { useState, useEffect, useCallback } from 'react'

// Components
import { API_ENDPOINT } from "../../constant/constant"
import DataTable from 'react-data-table-component'
import { SecondaryButton } from '../DeleteButton/DeleteButton'
import { config, getBankData } from "../../utils/bankRole"

// Library
import axios from 'axios'


const AdminTable = () => {

    const [userData, setUserData] = useState([])


    const getUsers = useCallback(() => {
        axios.get(`${API_ENDPOINT}/get-admins`, config)
        .then((response) => {
            // console.log(response.data);
            setUserData(response.data.newAdmins);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    useEffect(() => {
        getUsers()
    }, [])


    const columns = [
        {
            name: "Unique Id",
            selector: (row) => row?.bankUniqueId,
            sortable: true
        },
        {
            name: "User Name",
            selector: (row) => row?.name,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row?.email,
            sortable: true
        },
        {
            name: "Contact Number",
            selector: (row) => row?.contactNumber || "No Contact Number",
            sortable: true
        },
        {
            name: "Role",
            selector: (row) => row?.role,
            sortable: true
        },

    ]

    const deleteUser = () => {
        axios.delete(`${API_ENDPOINT}/admin/delete-user/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("authToken")}`

            }
        })
            .then((response) => {
                toast.success("User deleted successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }

    return(
        <>
                    <DataTable
                        data={userData}
                        columns={columns}
                        pagination
                        fixedHeader
                        selectableRow
                        selectableRowHightlight
                        hightlightOnHover
                        sortable
                        actions={
                            <SecondaryButton
                                title="Add Admin"
                                redirect="/register"
                            />
                        }
                        
                    />
        </>
    )
}

export default AdminTable