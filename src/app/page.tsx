"use client"
/* In order to allow for the dropdowns to be loaded
   Client side rendering must be used */
import Head from "next/head";
import React, {ChangeEvent, useState} from "react"
import Dropdown from "../../components/Dropdown"
import {Radio} from "@material-tailwind/react"
import Image from "next/image";
import formImage from "../../public/TutoringFlier.png"
import { useFormik } from "formik";
import useScanDetection from "use-scan-detection";
import * as Yup from "yup"
import { useRouter } from "next/navigation";
import { appendDataToSheet } from "../../components/GoogleSheetsAPI"

/* Created a type to allow indexing via strings 
   It's an object with strings as keys AND array values
*/
type OptionsBySubject = {
  [key:string] : string[];
};

/* Handles all the validation for the form 
   Since class and subject have default values tests must be added 
   Avoids user from submitting default value and forces them to pick an option
   All values created by Formik remove spaces HENCE,
   Select a Subject -> SelectaSubject
   So the test cases MUST STAY WITHOUT SPACES
*/
const validationSchema = Yup.object().shape({
  UID: Yup.string().required("*Please Scan the SMALL BARCODE on your ID").matches(/^\d{6}$/,"Please Scan Small Barcode"),
  subject: Yup.string()
    .required("*Please select a subject")
    .test("is-valid-subject", "*Please select a subject", (value) => value !== "SelectaSubject"),
  class: Yup.string()
    .required("*Please select a class")
    .test("is-valid-class", "*Please select a class", (value) => value !== "SelectaClass"),
});

export default function Home(){

  // Re-direct to success page
  const router = useRouter();
  
  //Formik Logics
  const formik = useFormik({
    initialValues: {
      UID: "",
      subject: "",
      class:"",
      tarTutor: "",
      timeOfSub: "",
      dateOfSub: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const currentDate = new Date();
      const dateParts = currentDate.toISOString().split("T")[0].split("-");
      const timeParts = currentDate.toTimeString().split(" ")[0].split(":");
      
      // Remove leading zeros from date and time for Google formatting
      const formattedDate = dateParts.map(part => parseInt(part).toString()).join("/");
      const formattedTime = timeParts.map(part => parseInt(part).toString()).join(":");
      
      formik.values.dateOfSub = formattedDate;
      formik.values.timeOfSub = formattedTime;
    
      // Call the appendDataToSheet function to send data to the Google Sheet
      await appendDataToSheet(formik.values);
      console.log(values);
      router.push("/success");
    },
  })

  const [barcodeScan,setBarcodeScan] = useState("Please Scan Your ID");

  useScanDetection({
    onComplete: (code:String) =>
    {
      setBarcodeScan(String(code));
      formik.setFieldValue("UID", String(code));
    },
    minLength:3
  })

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const subjects = ["Select a Subject", "Math", "Physics", "Computer Science", "Psychology", "Electrical Engineering", "Other"];
  const optionsBySubject: OptionsBySubject = {
    Math: [
      "Select a Class",
      "Math 102: Nature of Mathematics",
      "Math 103: Intro to College Algebra/Statistics",
      "Math 106: College Algebra",
      "Math 109: Precalculus Mathematics",
      "Math 110: Calculus and Analytic Geometry I",
      "Math 112: Calculus and Analytic Geometry II",
      "Math 203: Elem Stats",
      "Math 203B: Biostatistics Applications",
      "Math 214: Linear Algebra",
      "Math 215: Calculus and Analytic Geometry III",
      "Math 227: Discrete Structures",
      "Math 281: Differential Equations",
      "Math 323: Probability and Statistics I",
      "Math 324: Probability and Statistics II",
      "Math Club"
    ],
    Physics: [
      "Select a Class",
      "Physics 103: Basic Concepts of Physics I",
      "Physics 104: Basic Concepts of Physics II",
      "Physics 201: General Physics I",
      "Physics 202: General Physics II",
      "Physics 207: Principles of Physics",
      "Physics 208: Principles of Physics II",
      "Physics 207: Principles of Physics III",
    ],
    ComputerScience:[
      "Select a Class",
      "CS 101: Intro. to Comp I", 
      "CS 102: Intro. to Comp II",
      "CS 329: Fundamentals of Algorithms"
    ],
    Psychology:[
      "Select a Class",
      "Psychology 385: Statistical Methods in Psychology"
    ],
    ElectricalEngineering:[
      "Select a Class",
      "ELEG 233: Network Analysis I",
      "ELEG 234: Network Analysis II"
    ],
    Other:[
      "Select a Class",
      "Studying",
      "Class Not Included"
    ]
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSelectedOption("");
  };

  const handleOptionChange = (e:ChangeEvent<HTMLSelectElement>) =>{
    setSelectedOption(e.target.value);
  };

  const subjectOptions = subjects.map((subject) => (subject));
  /* Will populate dropdowns based on option selected */
  const options = (optionsBySubject[selectedSubject] || []) as string[];
  
  return(
    <div>
      <Head>
        <title>UB Tutoring Sign-In</title>
        <meta name="description" content="A simple form to manage student sign-in"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      {/* Form Container */}
      <main className="h-screen flex items-center justify-center">
        {/* ACTUAL Form
            className defines all of it's properties on screen */}
        <form className="bg-white flex rounded-lg w-3/4 font-latoRegular" onSubmit={formik.handleSubmit}>
          {/* Form Content DIV */}
          <div className="flex-1 text-gray-700 p-14">
            <h1 className="text-xl pb-2 font-latoBold">University of Bridgeport Tutoring Sign-In Sheet</h1>
            <p className="text-md text-gray-500 pb-2">Please scan the SMALL BARCODE on your ID Card and fill out the rest of the form below.</p>
            <div className="mt-0">
              {/* Unique ID Field */}
              <div className="pb-4">
                <label className="block font-latoBold text-sm pb-2" htmlFor="UID">Unique ID#</label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-violet-700"
                  type="text"
                  name="UID"
                  placeholder="Scan your ID"
                  value={barcodeScan}
                  onChange={formik.handleChange}
                  disabled                
                />
                {formik.touched.UID && formik.errors.UID ? (
                  <div className="text-red-500 font-latoBold text-sm">{formik.errors.UID}</div>
                ): null}
              </div>

              {/* Subject Dropdown */}
              <div className="pb-4">
                <Dropdown
                  label="Select Subject"
                  options={subjectOptions}
                  value={selectedSubject}
                  onChange = {(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleSubjectChange(e);
                    formik.setFieldValue("subject", e.target.value);
                  }}
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <div className="text-red-500 font-latoBold text-sm">{formik.errors.subject}</div>
                ): null}
              </div>

              {/* Displaying Classes Dropdown */}
              <div className="pb-4">
               <Dropdown 
                label="Select Class"
                options={options}
                value={selectedOption}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleOptionChange(e);
                  formik.setFieldValue("class", e.target.value);
                }}
               />
                {formik.touched.class && formik.errors.class ? (
                  <div className="text-red-500 font-latoBold text-sm">{formik.errors.class}</div>
                ): null}
              </div>
              {/* Targeted Tutoring */}
              <div className="w-1/2">
                <label className="block font-latoBold text-sm pb-2">Targeted Tutoring</label>
                  <label className="flex items-center">
                    <Radio 
                      name="tarTutor" 
                      ripple={false} 
                      value="yes"
                      checked={formik.values.tarTutor === "yes"}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <Radio 
                      name="tarTutor" 
                      ripple={false}
                      value="no"
                      checked={formik.values.tarTutor === "no"}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
              </div>
            </div>
            <div>
              <button type="submit" className="bg-violet-700 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full">
                Sign-In Now
              </button>
            </div>
          </div>
          {/* Image DIV */}
          <div className="relative flex-1">
            <Image
              className="rounded-lg" 
              src={formImage} 
              fill 
              alt={"form-image"}
            />
          </div>
        </form>
      </main>
    </div>
  )
}