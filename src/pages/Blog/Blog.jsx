import React from 'react'
import { AddBlog, Header } from '../../components'
import Layout from '../../layout/Layout';

const Blog = () => {
    return (
        <>
            <Layout>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <Header category="Page" title="Add Blog" />
                    <AddBlog />
                </div>
            </Layout>
        </>
    )
}

export default Blog