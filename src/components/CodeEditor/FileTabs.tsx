type FileTabsProps ={
    activeFile:string;
    onFileChange:(fileName:string)=>void;
    files:string[];
}

export default function FileTabs({activeFile,onFileChange,files}:FileTabsProps){
    return(
       <ul className="overflow-x-auto overflow-y-hidden flex mb-1 gap-1">
        {files.map((fileName)=>(
            <li key={fileName}>
                <button className={ `flex items-center justify-center bg-gray-800 px-2 py-2 border border-gray-500 rounded-[10px] text-white hover:bg-gray-700 text-sm ${activeFile===fileName ? 'bg-gray-950 hover:bg-gray-900':''}`} onClick={()=>onFileChange(fileName)}>
                    {fileName}
                </button>
            </li>
        ))}
       </ul> 
    )
}