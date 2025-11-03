"use client";
import React, { useState } from "react";
import { collaboratorsData } from "@/types/collbaratere";

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState(collaboratorsData);

  const handleToggle = (id: string) => {
    setCollaborators((prev) =>
      prev.map((c) =>
        c.user._id === id
          ? { ...c, permission: c.permission === "edit" ? "view" : "edit" }
          : c
      )
    );
  };

  return (
    <div className=" bg-zinc500 shadow-2xs rounded-lg  mx-4 p-4 border-2 flex flex-col  items-start gap-4 font-mono " >
      <h1 className=" text-2xl ">Collaborators :</h1>
      {collaborators.map((data) => (
        <div
          key={data.user._id}
          className=" w-full shadow-2xl flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg gap-2"
        >
          <div className="flex  items-center gap-3">
            {/* <img
              src={data.user.avatar}
              alt={data.user.name}
              className="w-8 h-8 rounded-full"
            /> */}
            <span className="font-semibold text-gray-800">
              {data.user.email}
            </span>
          </div>

          <button 
            onClick={() => handleToggle(data.user._id)}
            className={`px-3 py-1 text-sm rounded-md font-medium ${
              data.permission === "edit"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {data.permission}
          </button>

 
              {/* for showing collaborators */}
           {/* <button 
            onClick={() => handleToggle(data.user._id)}
            className={`px-3 py-1 text-sm rounded-md font-medium ${
              data.permission === "edit"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {data.permission}
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default Collaborators;
