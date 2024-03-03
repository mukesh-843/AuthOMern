import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        localStorage.setItem("uploadedImage", reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);

    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setUploadedImage(storedImage);
    }
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>User Email: {logindata ? logindata.ValidUserOne?.email : ""}</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: 20 }}
          />
          {uploading && <CircularProgress />}
          {uploadedImage && (
            <div style={{ marginTop: 20 }}>
              <h2>Uploaded Image:</h2>
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ width: "200px" }}
              />
            </div>
          )}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
