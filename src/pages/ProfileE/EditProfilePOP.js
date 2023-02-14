import React, { useState } from "react";

const EditProfilePOP = (props) => {
    
    return (
        <div style={{
            background: "lightGray"
        }}>
            <button onClick={props.handleClose}>close</button>
            <div>
                <img alt="user photo"/>
                <h4>upload kon</h4>
            </div>
            <div>
                <input placeholder="esmesh"/>
                <input placeholder="shomarash"/>
            </div>
            <button>sabt edit</button>
        </div>
    )
};

export default EditProfilePOP;