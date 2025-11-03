interface UserI {
    _id:string;
    name:string;
    email:string;
}

interface UserIn{
    name:string;
    email:string;
    password:string;
}

interface UserLogin{
    email:string;
    password:string;
}




export interface Collaborator {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  permission: "edit" | "view";
}

export interface Version {
  content: string;
}

export interface DocumentType {
  _id: string;
  title: string;
  content: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  collaborators: Collaborator[];
  versionHistory: Version[];
  lastEdited: string;
  createdAt: string;
  updatedAt: string;
}

interface DocumentInType {
    id: String; 
   title: string;
}


export {UserI,UserIn,UserLogin,DocumentType,Version,Collaborator,DocumentInType};