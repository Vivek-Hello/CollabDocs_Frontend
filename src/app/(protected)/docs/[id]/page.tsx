"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Collaborators from "@/components/collaborators";
import { useDocsStore } from "@/store/docsStore";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";
import { io } from "socket.io-client";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function Page() {
  const { user } = UserStore();
  const { getSingleDoc, singleDoc, updateDoc, collbarotorData, isOwner } = useDocsStore();
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const [isEditor, setIsEditor] = useState(true);
  const router = useRouter();
  const socketRef = useRef(null);

  // Permission check: is user editor?
  useEffect(() => {
    setIsEditor(
      collbarotorData?.some(
        c => c.user._id === user._id && c.permission === "edit"
      ) || false
    );
  }, [collbarotorData, user]);

  // Fetch doc on mount or id change
  useEffect(() => {
    if (id) getSingleDoc(id.toString());
  }, [id, getSingleDoc]);

  // Update local state when document loads
  useEffect(() => {
    if (singleDoc) {
      setTitle(singleDoc.title || "");
      setContent(singleDoc.content || "");
    }
  }, [singleDoc]);

  useEffect(() => setMounted(true), []);

  // --- Socket.IO integration ---
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    if (id) {
      socketRef.current.emit("joinDoc", { docId: id.toString() });
    }
    socketRef.current.on("docChangeRemote", ({ content: remoteContent }) => {
      setContent(remoteContent);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  // Broadcast change
  const handleContentChange = (value: string) => {
    setContent(value);
    if (isEditor || isOwner) {
      socketRef.current?.emit("docChange", { docId: id.toString(), content: value });
    }
  };

  // Save document (manual save to backend)
  const handleSave = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await updateDoc(id.toString(), content);
      // Optional: success notification
    } catch (error) {
      console.error("Failed to save document:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const isLoading = !singleDoc;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-zinc-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading editor…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-zinc-800 text-white">
      {/* Header */}
      <div className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-700/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 max-w-7xl mx-auto">
          {/* Back button and title */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <Skeleton width={300} height={32} baseColor="#3f3f46" highlightColor="#52525b" />
              ) : (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  className="text-2xl font-bold bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 p-0 h-auto"
                  placeholder="Untitled Document"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton width={100} height={40} baseColor="#3f3f46" highlightColor="#52525b" />
            ) : (
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton height={60} baseColor="#3f3f46" highlightColor="#52525b" />
                <Skeleton height={400} baseColor="#3f3f46" highlightColor="#52525b" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <ReactQuill
                  theme="snow"
                  readOnly={!isEditor && !isOwner}
                  value={content}
                  onChange={handleContentChange}
                  className="h-[70vh] min-h-[500px] [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:text-gray-900"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton height={200} baseColor="#3f3f46" highlightColor="#52525b" className="rounded-2xl" />
                <Skeleton height={150} baseColor="#3f3f46" highlightColor="#52525b" className="rounded-2xl" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Document Info */}
                <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-6 shadow-2xl">
                  <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Document Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created</span>
                      <span className="text-gray-300">
                        {singleDoc?.createdAt ? new Date(singleDoc.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated</span>
                      <span className="text-gray-300">
                        {singleDoc?.updatedAt ? new Date(singleDoc.updatedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Owner</span>
                      <span className="text-blue-400">{singleDoc?.owner?.name || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {/* Collaborators */}
                <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-6 shadow-2xl">
                  <Collaborators 
                    id={id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Indicator */}
      {isSaving && (
        <div className="fixed bottom-6 right-6 bg-zinc-800/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg border border-zinc-700/50">
          Saving changes...
        </div>
      )}
    </div>
  );
}
