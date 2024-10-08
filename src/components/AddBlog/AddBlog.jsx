import React, { useState, useRef } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { API_ENDPOINT } from "../../constant/constant"

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [image, setImage] = useState({ myFile: "" })
    const [tags, setTags] = useState([]);
    // const URL = "http://localhost:8000"
    const editor = useRef(null);

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage({ ...image, myFile: base64 })
        // setImage({ ...image, image: base64 })
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

    const createPost = async (newImage) => {
        if (title == "" || description === "" || tags === "" || image === "") {
            toast.error(`Please fill all fields`, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_LEFT
            })
        }
        else {
            try {
                await axios.post(`${API_ENDPOINT}/add-blog`, {
                    title, description, tags, image, newImage,
                    
                },
            {
                headers: {
                    Authorization: `${localStorage.getItem("authToken")}`
                }
            })
                setTitle("")
                setDescription("")
                setTags("")

                toast.success("Blogs Add Successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
            catch (e) {
                console.log(e)
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        createPost(image)
    }
    return (
        <>
            <div>

                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="md:col-span-3">
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">

                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="col-span-5 sm:col-span-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">

                                            <input type="text" value={title} name="title" id="title" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-5" placeholder="Enter Blog title" required
                                                onChange={(e) => { setTitle(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <JoditEditor
                                    ref={editor}
                                    value={description}
                                    onChange={newContent => setDescription(newContent)}
                                />
                                <div>


                                    <div className="tags-input">
                                        <ul id="tags">

                                            {
                                                Array.isArray(tags)
                                                    ? tags.map((tag, index) =>


                                                        <li className="tag" key = {index}>
                                                            <span className='tag-title'>{tag}</span>
                                                            <span className='tag-close-icon'
                                                                onClick={() => removeTags(index)}
                                                            >
                                                                x
                                                            </span>
                                                        </li>

                                                    )
                                                    : null
                                            }


                                        </ul>
                                        <input
                                            type="text"
                                            onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                                            placeholder="Press enter to add tags"
                                        />
                                    </div>
                                </div>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(e) => handleFileUpload(e)} />
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSubmit}>Upload</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBlog