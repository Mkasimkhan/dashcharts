import React from 'react'
import Layout from '../../layout/Layout'
import { Faq } from "../../components/index"

const faqsList = [
    {
        id: 1,
        questionText: 'What is React?',
        answerText: 'React is a JavaScript library for building user interfaces.',
    },
    {
        id: 2,
        questionText: 'Why use React?',
        answerText: 'React allows for efficient, declarative, and flexible code.',
    },
    {
        id: 1,
        questionText: 'What is React?',
        answerText: 'React is a JavaScript library for building user interfaces.',
    },
    {
        id: 2,
        questionText: 'Why use React?',
        answerText: 'React allows for efficient, declarative, and flexible code.',
    },
    // Add more FAQs as needed
];

const UploadPage = () => {
    return (
        <>
            <Layout>
                <Faq faqsList={faqsList} />
            </Layout>
        </>
    )
}

export default UploadPage