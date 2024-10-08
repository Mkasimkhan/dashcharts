import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { DeleteButton } from '../../components'
import Layout from '../../layout/Layout';
import JoditEditor from 'jodit-react';
// import "./EditBlog.css"
import { API_ENDPOINT } from "../../constant/constant"

const EditBlog = () => {
    const params = useParams()
    const { id } = params
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [image, setImage] = useState({ myFile: "" })
    const [singleData, setSingleData] = useState([])
    const navigate = useNavigate()
    const editor = useRef(null);


    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage({ ...image, myFile: base64 })
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const updatePost = async (newImage) => {
       
      
            try {
                await axios.put(`${API_ENDPOINT}/update-blog/${id}`, {
                    title, description, image, newImage,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("authToken")}`
                    }
                })
                setTitle("")
                setDescription("")
                setTags("")
                toast.success("Blog Update Successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                });
                navigate(`/single-blog/${id}`)
            }
            catch (e) {
                console.log(e)
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updatePost(image)
    }

    const deletePost = () => {
        axios.delete(`${API_ENDPOINT}/delete-blog/${id}` , {
            headers: {
                Authorization: `${localStorage.getItem("authToken")}`
      
            }})
            .then((response) => {
                navigate('/add-blogs')
                toast.success("Blog deleted successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
            .catch((e) => {
                console.log("delete error", e)
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }

    const getSingleCourse = () => {
        axios.get(`${API_ENDPOINT}/get-single-blog/${id}`)
            .then((response) => {
                // console.log(response.data)
                setSingleData(response.data.blog)      
            })
            .catch((e) => {
                console.log("singleData error", e)
            })
    }

    useEffect(() => {
        getSingleCourse()  
    }, [])

    return (
        <>

           <Layout>
           <div className='edit_course_container m-8'>
                <DeleteButton title = "Delete" function = {deletePost} />
                <form onSubmit={handleSubmit} style = {{
                    width: "fit-content"
                }}>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-">
                        </div>
                        <div className="mt-5 md:col-span-3 md:mt-0 edit-course">

                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                            <div className="mt-1 flex rounded-md shadow-sm">

                                                <input type="text" value={title} name="title" id="title" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-5" placeholder={singleData.title} required
                                                    onChange={(e) => { setTitle(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <JoditEditor
                                    ref={editor}
                                    // value={description}
                                    value={singleData.description}
                                    onChange={newContent => setDescription(newContent)}
                                />
                                   

                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={(e) => handleFileUpload(e)} />


                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update
                                        </button>
                                        <Link to= {`/single-blog/${id}`}>
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
           </Layout>
        </>
    )
}

export default EditBlog
