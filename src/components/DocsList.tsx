import React ,{useEffect} from 'react'
import { useDocsStore } from '@/store/docsStore'
import { UserStore } from '@/store/userStore';
const DocsList = () => {
    const {documents,getAllDocs,leaveCollaborators,deleteDoc} = useDocsStore();
    const {user} = UserStore();
    const id : string = user?._id.toString();

useEffect(()=>{
    getAllDocs(id);
},[user]);
const handleDelete =(docsId)=>{
    const owner = id;
        deleteDoc(docsId, owner);
}
const handleLeave = (docsId)=>{
    leaveCollaborators(id,docsId);
}
  return (
    <div className='flex flex-col justify-center items-center w-full'>
        {   
            documents?.map((docs)=>(
                <div key={docs._id}  className='flex bg-zinc-900 justify-between items-center font-mono'>
                    <span>{docs.title}</span>
                    
                </div>
            ))
        }
    </div>
  )
}

export default DocsList