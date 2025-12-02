"use client";
import { useDocsStore } from "@/store/docsStore";
import React, { useEffect, useState } from "react";
import AddCollabs from "./AddCollabs";
import { UserStore } from "@/store/userStore";

type CollaboratorsProps = {
  id: string | string[];
};

type Collaborator = {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  permission: "edit" | "view";
};

const Collaborators: React.FC<CollaboratorsProps> = ({ id }) => {
  const { updatePermission, getIsOwner, isOwner, getAllCollas, collbarotorData } =
    useDocsStore();
  const { user } = UserStore();

  const [collaborators, setCollaborators] = useState<Collaborator[]>(
    collbarotorData || []
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // normalize id to string
  const docId = Array.isArray(id) ? id[0] : id;

  // Sync with store data
  useEffect(() => {
    if (docId) {
      getAllCollas(docId);
    }
    if (user?._id) {
      getIsOwner(user._id);
    }
  }, [docId, user?._id, getAllCollas, getIsOwner]);

  useEffect(() => {
    if (collbarotorData) {
      setCollaborators(collbarotorData as Collaborator[]);
    }
  }, [collbarotorData]);

  const handleToggle = async (userId: string) => {
    if (!isOwner || !docId) return;
    setLoadingId(userId);
    await updatePermission(docId, userId);
    setCollaborators((prev) =>
      prev.map((c) =>
        c.user._id === userId
          ? {
              ...c,
              permission: c.permission === "edit" ? "view" : "edit",
            }
          : c
      )
    );
    setLoadingId(null);
  };

  if (!collaborators || collaborators.length === 0) {
    return (
      <div className="flex justify-between items-center ">
        <span>No collaborator is added</span>
        {isOwner && docId && <AddCollabs id={docId} />}
      </div>
    );
  }

  return (
    <div className="bg-zinc500 shadow-2xs rounded-lg p-2 border-2 flex flex-col items-start gap-4 font-mono">
      <div className="flex w-full p-2 justify-between items-center">
        <h1>Collaborators :</h1>
        {isOwner && docId && <AddCollabs id={docId} />}
      </div>
      {collaborators.map((data) => (
        <div
          key={data.user._id}
          className="w-full shadow-2xl flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg gap-2"
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-800">
              {data.user.name}
            </span>
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
