import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {app} from "../firebase.js";
import {getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const[formData,setFormData]=useState({})
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name;
    const strorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(strorageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData(({...formData,avatar:downloadURL}))
    )
  }
)
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
