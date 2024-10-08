import React, {useState} from 'react'
import "./TagInput.css"


const TagInput = (props) => {
    // console.log("props",props.tag)
    const [tags, setTags] = useState(props.tags);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <>
            <div className="tags-input">
                <ul id="tags">
                    <pre>{JSON.stringify(tags)}</pre> 
                </ul>
                <input
                    type= {props.type}
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder="Press enter to add tags"
                />
            </div>
        </>
    )
}

export default TagInput