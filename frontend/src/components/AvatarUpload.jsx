import React, { useRef, useState, useEffect } from "react";
import { Button, Avatar } from "@mui/material";
import {
  getStorage,
  uploadBytesResumable,
  ref as firebaseRef,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/firebase";

export default function AvatarUpload({ formData, setFormData }) {
  // Function to handle the upload process
  const handleImageUpload = async (image) => {
    const storage = getStorage(app); // Initialize Firebase storage
    const fileName = `${new Date().getTime()}${image.name}`; // Create a unique file name
    const storageRef = firebaseRef(storage, `avatars/${fileName}`); // Create a storage reference
    const uploadTask = uploadBytesResumable(storageRef, image); // Start the upload task

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error); // Log any errors
      },
      () => {
        // Once the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL }); // Update formData with the image URL
        });
      }
    );
  };

  // Function to handle file selection
  const handleChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // setImage(file); // Update the image state
      handleImageUpload(file);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        accept="image/*"
        id="avatar-upload"
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {formData.profilePicture && (
        <Avatar
          src={formData.profilePicture}
          alt="User Avatar"
          sx={{
            width: 90,
            height: 90,
            marginTop: 2,
            marginBottom: 2,
            borderRadius: "50%",
          }}
        />
      )}
      <label
        htmlFor="avatar-upload"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button variant="contained" component="span" sx={{ marginBottom: 2 }}>
          Upload Avatar
        </Button>
      </label>
    </div>
  );
}
