import { create } from "zustand";
import axiosConfig from "@/lib/axiosConfig";
import { DocumentType, DocumentInType, Collaborator } from "@/types";

interface DocsState {
  documents: DocumentType[] | null;
  singleDoc: DocumentType | null;
  loading: boolean;
  error: string | null;
  collbarotorData : Collaborator[] | null;
  isOwner : boolean;
  
  getAllDocs: (userId: string) => Promise<void>;
  getSingleDoc: (id: string) => Promise<void>;
  createDoc: (docsData: DocumentInType) => Promise<void>;
  updateDoc: (id: string, content: string) => Promise<void>;
  deleteDoc: (id: string, owner: string) => Promise<void>;
  restoreVersion: (id: string, versionIndex: number) => Promise<void>;
  updatePermission: (id: string, userId: string) => Promise<void>;
  addCollaborators:(id:string, collaboratorsArr: { id: string; permesion: string }[]) =>Promise<void>;
  leaveCollaborators: (id: string, docs:string) => Promise<void>; 
  getIsOwner:(userId:string) =>void;
  getAllCollas:(docsId:string) =>Promise<void>;

}

export const useDocsStore = create<DocsState>((set, get) => ({
  documents: null,
  singleDoc: null,
  loading: false,
  error: null,
  collbarotorData:null,
  // ✅ Get all docs for a user (owned or collaborated)
  getAllDocs: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.get(`/docs/${userId}`);
      set({ documents: res.data.documents, loading: false });
    } catch (err) {
      console.error("Fetching all docs failed:", err);
      set({
        documents: null,
        loading: false,
        error: "Failed to fetch documents",
      });
    }
  },

  // ✅ Get a single doc
  getSingleDoc: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.get(`/docs/single/${id}`);
      set({ singleDoc: res.data.docs,collbarotorData: res.data.docs.collaborators , loading: false });
    } catch (err) {
      console.error("Fetching single doc failed:", err);
      set({
        singleDoc: null,
        loading: false,
        error: "Failed to fetch single document",
      });
    }
  },

  // ✅ Create new doc
  createDoc: async (docsData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.post("/docs", docsData);
      set((state) => ({
        documents: state.documents
          ? [...state.documents, res.data.docs]
          : [res.data.docs],
        loading: false,
      }));
    } catch (err) {
      console.error("Creating document failed:", err);
      set({ loading: false, error: "Failed to create document" });
    }
  },

  // ✅ Update doc content
  updateDoc: async (id, content) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.put(`/docs/${id}`, { content });
      set({ singleDoc: res.data.docs, loading: false });
    } catch (err) {
      console.error("Updating document failed:", err);
      set({ loading: false, error: "Failed to update document" });
    }
  },

  // ✅ Delete doc (requires owner ID)
  deleteDoc: async (id, owner) => {
    set({ loading: true, error: null });
    try {
      await axiosConfig.delete(`/docs/${id}`, { data: { owner } });
      const { documents } = get();
      set({
        documents: documents ? documents.filter((d) => d._id !== id) : null,
        loading: false,
      });
    } catch (err) {
      console.error("Deleting document failed:", err);
      set({ loading: false, error: "Failed to delete document" });
    }
  },

  // ✅ Restore version
  restoreVersion: async (id, versionIndex) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.put(`/docs/${id}/restore/${versionIndex}`);
      set({ singleDoc: res.data.docs, loading: false });
    } catch (err) {
      console.error("Restoring version failed:", err);
      set({ loading: false, error: "Failed to restore version" });
    }
  },

  // ✅ Update collaborator permission
  updatePermission: async (id, userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.put(`/docs/${id}/permission`, {
        userId,
      });
      set({ collbarotorData: res.data.docs.collaborators, loading: false });
    } catch (err) {
      console.error("Updating permission failed:", err);
      set({ loading: false, error: "Failed to update permission" });
    }
  },



  // ✅ Add collaborators
  addCollaborators: async (id ,collaborators) => {
  set({ loading: false, error: null });
  try {
    const res = await axiosConfig.post(`/docs/${id}/collaborators`, {
      collaborators,
    });
    set({ singleDoc: res.data.docs, loading: false });
    // Return backend feedback for use in UI
    return {
      userNotFound: res.data.userNotFound,
      userAlreadyAdded: res.data.userAlreadyAdded
    };
  } catch (err) {
    console.error("Adding collaborators failed:", err);
    set({ loading: false, error: "Failed to add collaborators" });
    return undefined;
  }
},


 leaveCollaborators: async (id: string, docsId: string) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosConfig.post(`/docs/leave`, { id, docsId });

    // ✅ Get the previous documents array from the current store
    set((state) => ({
      documents: state.documents
        ? state.documents.filter((doc) => doc._id !== docsId)
        : null,
      loading: false,
    }));

    console.log("Left document:", res.data.message);
  } catch (err) {
    console.error("Leave collaborator failed:", err);
    set({ loading: false, error: "Failed to leave document" });
  }
},

getIsOwner: (userId: string) => {
  set((state) => {
    const ownerId = state.singleDoc?.owner;
    return {
      isOwner: !!userId && !!ownerId && userId.toString() === ownerId.toString(),
    };
  });
},


getAllCollas: async(docsId:string) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosConfig.get(`/docs/collabs/${docsId}`);

  
    set({
      collbarotorData : res.data.collaborators,
      loading: false,
    });


  } catch (err) {
    console.error("Leave collaborator failed:", err);
    set({ loading: false, error: "Failed to leave document" });
  }
},

}));
