"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";

import Collaborators from "@/components/collaborators";
import { useDocsStore } from "@/store/docsStore";
import { useParams } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Page() {
  const { getSingleDoc, singleDoc, updateDoc } = useDocsStore();
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : ""; // Defensive check

  // Fetch doc on mount or id change
  useEffect(() => {
    if (id) getSingleDoc(id);
  }, [id, getSingleDoc]);

  // Update editor when document loads
  useEffect(() => {
    if (singleDoc) {
      setTitle(singleDoc.title || "");
      setContent(singleDoc.content || "");
    }
  }, [singleDoc]);

  useEffect(() => setMounted(true), []);

  // Save changes (call backend/store)
  const handleContentChange = (value: string) => {
    setContent(value);
    // Optional: Call updateDoc here or via Save button
    // updateDoc({ id, content: value });
  };

  if (!mounted) return <p>Loading editor…</p>;

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          className="h-[70vh] w-full mb-10"
        />

        <div className="">
          <Collaborators collaboratorsData={singleDoc?.collaborators}/>
        </div>
      </div>
    </div>
  );
}
