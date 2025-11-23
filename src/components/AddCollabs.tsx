"use client"
import React, { useState } from 'react'
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
import { useDocsStore } from '@/store/docsStore';


type Member = { email: string; permission: "edit" | "view" };

const AddCollabs: React.FC<{ id: string }> = ({ id }) => {
  const { addCollaborators, loading } = useDocsStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [email, setEmail] = useState<string>("");
  const [permission, setPermission] = useState<"edit"|"view">("edit");

  // Add single member to local list (like todo)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setMembers(prev => [...prev, { email, permission }]);
    setEmail(""); // clear input
    setPermission("edit"); // reset permission
  };

  const handleRemove = (index: number) => {
    setMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || members.length === 0) return;
     addCollaborators(id,members); // use store function
    setMembers([]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className='p-2 flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg'>
          Add Member
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Collaborators</DialogTitle>
          <DialogDescription>
            Enter emails and set permissions for each collaborator.
          </DialogDescription>
        </DialogHeader>
        {/* Add member form */}
        <form onSubmit={handleAdd} className="grid gap-4 mb-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type='email'
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter collaborator's email"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label>Permission</Label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="permission"
                  value="edit"
                  checked={permission === "edit"}
                  onChange={() => setPermission("edit")}
                /> Edit
              </label>
              <label>
                <input
                  type="radio"
                  name="permission"
                  value="view"
                  checked={permission === "view"}
                  onChange={() => setPermission("view")}
                /> View
              </label>
            </div>
          </div>
          <Button type="submit">Add to List</Button>
        </form>

        {/* List of added members (like todo list) */}
        <div className="mb-4">
          {members.length > 0 ? (
            <ul className="space-y-2">
              {members.map((m, idx) => (
                <li key={idx} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-gray-800">
                  <span>{m.email} <span className="ml-2 px-2 py-1 bg-blue-100 rounded text-xs">{m.permission}</span></span>
                  <Button variant="outline" size="sm" onClick={() => handleRemove(idx)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">No collaborators added yet.</span>
          )}
        </div>

        {/* Final submit to backend */}
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" >
              { "Invite Collaborators"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCollabs;
