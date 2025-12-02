"use client";
import { useDocsStore } from "@/store/docsStore";
import React, { useEffect, useState } from "react";
import AddCollabs from "./AddCollabs";
import { UserStore } from "@/store/userStore"; 
const Collaborators = ({id}) => {
  const { updatePermission,getIsOwner,isOwner,getAllCollas,collbarotorData} = useDocsStore();
  const {user} = UserStore();
  const [collaborators, setCollaborators] = useState(collbarotorData);
  const [loadingId, setLoadingId] = useState(null);

  // Sync with parent data
  useEffect(() => {
    getAllCollas(id);
    setCollaborators(collbarotorData);
    getIsOwner(user?._id);
  }, [collbarotorData,user]);


  
  const handleToggle = async (userId) => {
    if (!isOwner) return;
    setLoadingId(userId);
    await updatePermission(id, userId);
    setCollaborators((prev) =>
      prev.map((c) =>
        c.user._id === userId
          ? { ...c, permission: c.permission === "edit" ? "view" : "edit" }
          : c
      )
    );
    setLoadingId(null);
  };

  if (!collaborators || collaborators.length === 0) {
    return (
      <div className="flex justify-between items-center ">
        <span>No collaborator is added</span>
        { isOwner && <AddCollabs id={id?.toString()}  />}
      </div>
    );
  }

  return (
    <div className="bg-zinc500 shadow-2xs rounded-lg p-2 border-2 flex flex-col items-start gap-4 font-mono">
      <div className="flex w-full p-2 justify-between items-center">
        <h1 className="">Collaborators :</h1>
         { isOwner && <AddCollabs id={id?.toString()}  />}
      </div>
      {collaborators.map((data) => (
        <div
          key={data.user._id}
          className="w-full shadow-2xl flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg gap-2"
        >
          <div className="flex items-center gap-3">
            {/* Optional: <img src={data.user.avatar} alt={data.user.name} ... /> */}
            <span className="font-semibold text-gray-800">{data.user.name}</span>
          </div>
          <button
            onClick={() => handleToggle(data.user._id)}
            className={`px-3 py-1 text-sm rounded-md font-medium ${
              data.permission === "edit"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
            disabled={loadingId === data.user._id}
            aria-label={`Change permission for ${data.user.email}`}
          >
            {loadingId === data.user._id ? "..." : data.permission}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Collaborators;
