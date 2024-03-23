"use client";

import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import Navbar from "../Navbar";
import langs from "../langs.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Blocks } from "react-loader-spinner";

const Page1 = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [stdin, setStdin] = useState("");
  const [code, setCode] = useState("console.log('hello world!')");
  const [lol, setlol] = useState(langs);
  const [isRunning, setisRunning] = useState(false);
  const [exeRes, setexeRes] = useState();
  const router = useRouter;
  const hostname = process.env.HOST_NAME;

  const handleUsernameChange = (e) => setUsername(e.target.value);
  // const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleLanguageChange = (event) => {
    const selectedId = event.target.value;
    console.log("Selected id:", selectedId);
    setLanguage(event.target.value);
    // You can perform further actions with the selectedId and selectedKey here
  };
  const handleStdinChange = (e) => setStdin(e.target.value);
  const handleCodeChange = useCallback((val, viewUpdate) => {
    // console.log("val:", val);
    setCode(val);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisRunning(true);
    //  console.log("Reaching this submit func");
    // Check if any required field is empty
    if (!username || !language || !stdin || !code) {
      alert("Please fill in all fields.");
      return;
    }
    const lang_id = language;
    try {
      const response = await fetch('/api/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          lang_id,
          stdin,
          code,
        }),
      });
      const data = await response.json();
      const foo = async (data) => {
        setisRunning(false);
        console.log(data);
        setexeRes(data);
      };
      foo(data);
      // Optionally, you can handle the response and display results to the user
    } catch (error) {
      console.error("Submission error:", error);
      // Handle errors, e.g., display error message to the user
    }
  };

  return (
    <>
      <Navbar />
      {/* <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/> */}
      <section className="bg-white dark:bg-gray-900 h-fit mt-5">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Submit Code
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={username}
                  placeholder="Type username"
                  onChange={handleUsernameChange}
                  required=""
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="lang"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Language
                </label>
                <select
                  id="lang"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleLanguageChange}
                >
                  {lol &&
                    lol.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stdin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stdin
                </label>
                <textarea
                  id="stdin"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write stdin here..."
                  value={stdin}
                  onChange={handleStdinChange}
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Source Code:
                </label>
                <CodeMirror
                  value={code}
                  height="300px"
                  theme={vscodeDark}
                  onChange={handleCodeChange}
                  basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: false,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
              {isRunning && exeRes == null && (
                <Blocks
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  visible={true}
                />
              )}
              {!isRunning && exeRes != null && (
                <div className="block mb-2 text-2xl font-medium text-green-900 dark:text-green bg-white">
                  {exeRes.sub_status}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Page1;
