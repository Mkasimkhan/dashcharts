import React from 'react';
import { FiCreditCard, FiBook } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';
import { MdDashboard, MdOutlineCloudUpload, MdOutlineMailOutline   } from 'react-icons/md';
import { FaRegUser, FaWpforms } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiBank } from "react-icons/gi";


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        display: "Dashboard",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: 'Transaction Type',
    links: [
      {
        name: 'transaction-type',
        display: "Transaction Types",
        icon: <AiOutlineTransaction />,
      },
    ],
  },
  {
    title: 'Bank',
    links: [
      {
        name: 'add-bank',
        display: "Add Bank",
        icon: <GiBank />,
      },
      {
        name: 'bank-list',
        display: "Banks",
        icon: <BsBank />,
      },
    ],
  },
  {
    title: "Analytical",
    links: [
      {
        name: 'upload-files',
        display: "Upload File",
        icon: <MdOutlineCloudUpload/>
      },
      {
        name: 'criteria',
        display: "Criteria",
        icon: <FiBook/>
      },
      {
        name: 'all-blogs',
        display: "Blogs",
        icon: <FiBook/>
      },
    ]
  },
  {
    title: "Account Information",
    links: [
      {
        name: 'profile',
        display: "My Profile",
        icon: <FaRegCircleUser/>
      },
      {
        name: 'account-setting',
        display: "Account Setting",
        icon: <IoSettingsOutline/>
      }

    ]
  },
];


export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#53AD68',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    color: '#F3C164',
    name: 'yellow-theme',
  },
  {
    color: '#172542',
    name: 'hover-theme',
  },
];

export const statsCard = [
  {
    id: 1,
    icon: <BsBank />,
    name: "Total No. of Banks",
    total: "42+"
  },
  {
    id: 2,
    icon: <MdOutlineCloudUpload/>,
    name: "Total Files Uplaod",
    total: 34
  },
  {
    id: 3,
    icon: <MdOutlineMailOutline />,
    name: "Total Email Received",
    total: 34
  },
  {
    id: 4,
    icon: <FaRegUser />,
    name: "Total Admin & Moderator",
    total: 34
  },
]

// Table
export const tableColumns = [
  {header: "ID", key: "ID"}, 
  {header: "Criteria", key: "Criteria"}, 
  {header: "Description", key: "Description"}
]
export const tableData = [
  {
    ID: "1",
    Criteria: "A",
    Description: "High-risk transaction"
  },
  {
    ID: "2",
    Criteria: "B",
    Description: "National from a high-risk jurisdiction",
  },
  {
    ID: "3",
    Criteria: "C",
    Description: "Cash Lodgements",
  },
  {
    ID: "4",
    Criteria: "D",
    Description: "EFT Lodgements",
  },
  {
    ID: "5",
    Criteria: "E",
    Description: "Minor Account Lodgements",
  },
  {
    ID: "6",
    Criteria: "F",
    Description: "Sub-office Lodgements",
  },
  {
    ID: "7",
    Criteria: "G",
    Description: "Counter New Member Lodgements",
  },
  {
    ID: "8",
    Criteria: "H",
    Description: "Online New Member Lodgements",
  },
  {
    ID: "9",
    Criteria: "I",
    Description: "Self Employed Lodgements",
  },
  {
    ID: "10",
    Criteria: "J",
    Description: "Unemployed Lodgements",
  },
  {
    ID: "11",
    Criteria: "K",
    Description: "Large Cash Withdrawals",
  },
  {
    ID: "12",
    Criteria: "L",
    Description: "Multiple Large Cash Transactions",
  },
  {
    ID: "13",
    Criteria: "M",
    Description: "High-Value Wire Transfers",
  },
  {
    ID: "14",
    Criteria: "N",
    Description: "Foreign Exchange Transactions",
  },
  {
    ID: "15",
    Criteria: "O",
    Description: "High-Frequency Trading Activity",
  },
  {
    ID: "16",
    Criteria: "P",
    Description: "Third-Party Payments",
  },
  {
    ID: "17",
    Criteria: "Q",
    Description: "Large Inbound Transactions",
  },
  {
    ID: "18",
    Criteria: "R",
    Description: "Non-Profit Organization Deposits",
  },
  {
    ID: "19",
    Criteria: "S",
    Description: "Corporate Account Deposits",
  },
  {
    ID: "20",
    Criteria: "T",
    Description: "Trust Account Transactions",
  },
  {
    ID: "21",
    Criteria: "U",
    Description: "Government Grants or Subsidies",
  },
  {
    ID: "22",
    Criteria: "V",
    Description: "Large Cash Transactions with No Apparent Purpose",
  },
  {
    ID: "23",
    Criteria: "W",
    Description: "Suspicious Activity Patterns",
  },
  {
    ID: "24",
    Criteria: "X",
    Description: "Unusually Large ATM Withdrawals",
  },
  {
    ID: "25",
    Criteria: "Y",
    Description: "Overseas Transactions from High-Risk Countries",
  },
  {
    ID: "26",
    Criteria: "Z",
    Description: "Politically Exposed Person (PEP) Transactions",
  }
]

export const bankListColumns = [
    { header: "Id", key: "bankUniqueId" },
    { header: "Bank Name", key: "name" },
    { header: "Country", key: "country" },
    { header: "Number", key: "contactNumber" },
    { header: "Platform", key: "platform" },
    { header: "Status", key: "status" }

  ];