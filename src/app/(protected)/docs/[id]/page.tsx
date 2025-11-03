"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";

import Collaborators from "@/components/collaborators";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function page() {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => setMounted(true), []);
  if (!mounted) return <p>Loading editor…</p>;
  const lable  = "Lable"

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-xl font-bold">{lable}</h2>
      <div className="flex">
      
       <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-[70vh] w-full mb-10"
      />

      <div className="">
    <Collaborators />
      </div>
    </div>
    </div>
    
  );
}
