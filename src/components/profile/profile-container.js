import axios from "axios";
import { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

const UseProfileForm = (userData, token) => {
  const [profile, setProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [imageToSave, setImageToSave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  if (_.isEmpty(profile)) {
    userData.then((value) => {
      setProfile(value);
      setLoaded(true);
    });
  }

  const handleTextParametersChange = (event) => {
    const newProfile = {
      ...profile,
      [event.target.name]: event.target.value,
    };
    const newChangedFields = {
      ...changedFields,
      [event.target.name]: event.target.value,
    };
    setChangedFields(newChangedFields);
    setProfile(newProfile);
  };

  const handleSubmitParameters = (event) => {
    event.persist();
    if (_.isEmpty(changedFields)) {
      toast.error("You didn't make any changes!");
    } else if (event) {
      event.preventDefault();
      axios
        .put(`/api/users`, changedFields, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "JWT " + token,
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            setChangedFields({});
          } else {
            response.data.errors.forEach((error) => {
              toast.error(error);
            });
          }
        });
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  };

  const sendCroppedImageServer = (formData) => {
    axios
      .post(`/api/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const newInput = {
            ...profile,
            picture: response.data.Location,
          };
          setProfile(newInput);
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
      });
    setShowModal(false);
  };

  const upload = (imageBlob) => {
    const image = blobToFile(imageBlob, "coucou.png");
    const formData = new FormData();
    formData.append("file", image);
    setFinalImage(formData);
  };

  const handleFileUpload = async (event) => {
    if (event.target.files[0]) {
      const imageDataUrl = await readFile(event.target.files[0]);
      setShowModal(true);
      setImageToSave(imageDataUrl);
    }
  };

  const handleDeleteImage = (url) => {
    axios
      .post(
        `/api/images/delete`,
        { url },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "x-access-token": token,
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          if (url === profile.picture) {
            const newInput = {
              ...profile,
              images: _.without(profile.images, url),
              picture:
                _.without(profile.images, url)[0] ||
                "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
            };
            setProfile(newInput);
          } else {
            const newInput = {
              ...profile,
              images: _.without(profile.images, url),
            };
            setProfile(newInput);
          }
        }
      })
      .catch((error) => {
        if (process.env.REACT_APP_VERBOSE === "true") console.log(error);
      });
  };

  const handleChangeProfileImage = (pictureUrl) => {
    const newInput = {
      ...profile,
      picture: pictureUrl,
    };
    const newChangedFields = {
      ...changedFields,
      picture: pictureUrl,
    };
    setProfile(newInput);
    setChangedFields(newChangedFields);
  };

  const deleteUser = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account ?"
    );
    if (confirmation) {
      axios
        .delete(`/api/users/`, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "JWT " + token,
          },
        })
        .then((response) => {
          if (response.data.deleted === true) {
            localStorage.removeItem("token");
            window.location = "/?message=delete_success";
          } else {
            if (process.env.REACT_APP_VERBOSE === "true")
              console.log(response.data);
          }
        });
    }
  };

  return {
    handleFileUpload,
    handleDeleteImage,
    profile,
    loaded,
    handleChangeProfileImage,
    handleSubmitParameters,
    deleteUser,
    showModal,
    setShowModal,
    imageToSave,
    setImageToSave,
    croppedImage,
    setCroppedImage,
    upload,
    finalImage,
    sendCroppedImageServer,
    handleTextParametersChange,
  };
};

export default UseProfileForm;
