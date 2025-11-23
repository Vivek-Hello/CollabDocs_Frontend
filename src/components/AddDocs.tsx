"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserStore } from "@/store/userStore";
import { useDocsStore } from '@/store/docsStore'; // <-- import your doc store!
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddDocs() {
  const [title, setTitle] = useState("");
  const { user } = UserStore();
  const { createDoc } = useDocsStore(); // <-- make sure this exists
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !user?._id) return;
    setLoading(true);
    try {
      // Call your docs store method for creating a doc (adjust parameters as needed!)
      await createDoc({ title, id: user._id });
      setTitle(""); // Reset input
      // Optionally close dialog here
    } catch (err:any) {
      // Handle any errors, maybe show a toast
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 
            hover:from-green-600 hover:to-emerald-600 text-2xl font-bold shadow-lg
            transition-all duration-200 transform hover:scale-110 active:scale-95
            hover:shadow-xl"
        >
          +
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creating Document</DialogTitle>
          <DialogDescription>
            Please provide the details of the Doc correctly
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title-1">Title</Label>
            <Input
              id="title-1"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              required
            />
          </div>
          {/* Optional: Remove or repurpose username input */}
          {/* <div className="grid gap-3">
            <Label htmlFor="username-1"></Label>
            <Input
              id="username-1"
              name="username"
              placeholder="Username (not used)"
            />
          </div> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Docs"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
