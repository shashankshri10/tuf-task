"use client";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import Modal from "./CodeModal";
import Navbar from "../Navbar";

const Page2 = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sub, setsub] = useState();
  const hostname = process.env.HOST_NAME;

  const toggleModal = (submission) => {
    setsub(submission);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          "/api/snippets",
          { cache: "no-store" },
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        // Handle errors, e.g., display error message to the user
      }
    };
    fetchSubmissions();
    const fetchLang = async () => {
      try {
        const response = await fetch(`https://ce.judge0.com/languages/${1}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch language");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching language:", error);
        // Handle errors, e.g., display error message to the user
      }
    };
  }, []);

  return (
    <div className="flex-col space-y-20">
      <Navbar />
      <div className="mx-auto max-w-7xl ">
        {isModalOpen && sub !== null && (
          <Modal closeModal={toggleModal} submission={sub} />
        )}
        <h1 className="text-2xl font-bold mb-4">Code Submissions</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-100%">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  username
                </th>
                <th scope="col" className="px-6 py-3">
                  Language
                </th>
                <th scope="col" className="px-6 py-3">
                  Submission Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Result status
                </th>
                <th scope="col" className="px-6 py-3">
                  stdout
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {submissions.length==0 && (
              <Bars
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="w-full flex justify-around"
                visible={true}
              />
            )} */}
              {submissions &&
                submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {submission.username}
                    </th>
                    <td className="px-6 py-4">{submission.language}</td>
                    <td className="px-6 py-4">{submission.submission_time}</td>
                    <td className="px-6 py-4">{submission.sub_status}</td>
                    <td className="px-6 py-4">{submission.stdout}</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          toggleModal(submission);
                        }}
                      >
                        {submission.id}
                      </a>
                    </td>
                  </tr>
                ))}
              {/* Repeat similar tr elements for other data */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page2;
