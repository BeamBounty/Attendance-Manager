"use client"
/* In order to allow for the dropdowns to be loaded
   Client side rendering must be used */
import Head from "next/head";
import React, {ChangeEvent, useState} from "react"
import Dropdown from "../../components/Dropdown"
import {Radio} from "@material-tailwind/react"
import Image from "next/image";
import formImage from "../../public/TutoringFlier.png"

/* Created a type to allow indexing via strings 
   It's an object with strings as keys AND array values
*/
type OptionsBySubject = {
  [key:string] : string[];
};

export default function Home(){

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const subjects = ["Select a Subject", "Math", "Physics", "Computer Science", "Psychology", "Electrical Engineering", "Other"];
  const optionsBySubject: OptionsBySubject = {
    Math: [
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
      "Physics 103: Basic Concepts of Physics I",
      "Physics 104: Basic Concepts of Physics II",
      "Physics 201: General Physics I",
      "Physics 202: General Physics II",
      "Physics 207: Principles of Physics",
      "Physics 208: Principles of Physics II",
      "Physics 207: Principles of Physics III",
    ],
    ComputerScience:[
      "CS 101: Intro. to Comp I", 
      "CS 102: Intro. to Comp II",
      "CS&nbsp 329: Fundamentals of Algorithms"
    ],
    Psychology:[
      "Psychology 385: Statistical Methods in Psychology"
    ],
    ElectricalEngineering:[
      "ELEG 233: Network Analysis I",
      "ELEG 234: Network Analysis II"
    ],
    Other:[
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
        <form className="bg-white flex rounded-lg w-3/4 font-latoRegular">
          {/* Form Content DIV */}
          <div className="flex-1 text-gray-700 p-20">
            <h1 className="text-2xl pb-2 font-latoBold">University of Bridgeport Tutoring Sign-In Sheet</h1>
            <p className="text-lg text-gray-500">Please scan your ID card and fill out the rest of the form below.</p>
            <div className="mt-0">
              {/* Unique ID Field */}
              <div className="pb-4">
                <label className="block font-latoBold text-sm pb-2" htmlFor="UID">Unique ID#</label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-violet-700"
                  type="text"
                  name="UID"
                  placeholder="Scan your ID"
                  disabled                
                />
              </div>
              {/* Subject Dropdown */}
              <div>
                <Dropdown 
                  label="Select Subject"
                  options={subjectOptions}
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                />
              </div>
              {/* Displaying Classes Dropdown */}
              <div>
               <Dropdown 
                label="Select Class"
                options={options}
                value={selectedOption}
                onChange={handleOptionChange}
               />
              </div>
              {/* Targeted Tutoring */}
              <div className="w-1/2">
                <label className="block font-latoBold text-sm pb-2">Targeted Tutoring</label>
                  <label className="flex items-center">
                    <Radio name="type" ripple={false} />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <Radio name="type" ripple={false} defaultChecked />
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
              alt={""}
            />
          </div>
        </form>
      </main>
    </div>
  )
}