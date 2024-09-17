import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddServices() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    servicetype: "",
    status: "",
    error: {
      fullname: "",
      title: "",
      company: "",
      phone: "",
      email: "",
      servicetype: "",
      status: "",
    },
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const errKeys = Object.keys(formData).filter((key) => {
        if (formData[key] === "" && key !== "id" && key !== "error") {
          return key;
        }
      });
      if (errKeys.length >= 1) {
        alert("Please fill all Data");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
      ) {
        alert("Please Enter a Valid Email Address");
      } else {
        const response = await axios.post(
          `https://crmapp-g7w5.onrender.com/services/create/`,
          { services: { ...formData } },
          { headers: { accesstoken: localStorage.getItem("token") } }
        );
        console.log(response);
        setTimeout(() => {
          navigate("/servicesdata");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //handlesubmit
  const handleChange = (e) => {
    let error = { ...formData.error };
    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is Required`;
    } else {
      error[e.target.name] = "";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value, error });
  };
  ////

  return (
    <>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <Sidebar />
          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Topbar --> */}
              <Navbar />
              <div style={{ display: "flex" }}>
                <div
                  className="product col-md-3 col-lg-4  offset-md-3"
                  style={{
                    justifyContent: "center",
                    padding: "30px",
                    backgroundColor: "white",
                    paddingLeft: "62px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontSize: "30px",
                      color: "black",
                      fontWeight: "bolder",
                    }}
                  >
                    Services Request
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <div>
                      <TextField
                        fullWidth
                        value={formData.fullname}
                        onChange={(e) => handleChange(e)}
                        label="Name"
                        variant="standard"
                        name="fullname"
                      />
                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.fullname}
                      </span>
                      <br />
                      <TextField
                        fullWidth
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                        label="Service Type"
                        variant="standard"
                        name="title"
                      />
                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.title}
                      </span>
                      <br />
                      <TextField
                        fullWidth
                        value={formData.company}
                        onChange={(e) => handleChange(e)}
                        label="Company"
                        variant="standard"
                        name="company"
                      />
                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.company}
                      </span>
                      <br />
                      <TextField
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => handleChange(e)}
                        label="Phone Number"
                        variant="standard"
                        name="phone"
                      />
                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.phone}
                      </span>
                      <br />
                      <TextField
                        fullWidth
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        label="Email"
                        variant="standard"
                        name="email"
                      />
                      <br />

                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.email}
                      </span>
                      <br />
                      <TextField
                        fullWidth
                        value={formData.servicetype}
                        onChange={(e) => handleChange(e)}
                        label="Description"
                        variant="standard"
                        name="servicetype"
                      />
                      <br />

                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.servicetype}
                      </span>
                      <br />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.status}
                          label="Status"
                          name="status"
                          onChange={(e) => handleChange(e)}
                        >
                          <MenuItem value="Created">Created</MenuItem>
                          <MenuItem value="Released">Released</MenuItem>
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="Inprocess">Inprocess</MenuItem>
                          <MenuItem value="Canceled">Canceled</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                      <br />
                      <span style={{ color: "red" }}>
                        {formData.error.status}
                      </span>
                      <br />
                      <Button
                        style={{
                          width: "120px",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Add Lead
                      </Button>
                    </div>
                    <br />

                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddServices;
