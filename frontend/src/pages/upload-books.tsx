import { useRef } from "react";
import { Form } from "react-router-dom";

export default function UploadBookPage() {
  
  let file = useRef<File>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    // send post request.
    if(!file.current) {
      console.log("Select a file to send."); 
    } else {
      const formData = new FormData();
      formData.append("file", file.current, file.current.name)

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch("http://localhost:8000/batch-upload/", {
          method: "POST",
          body: formData,
        });

        const data = await result.text();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }; 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    file.current = e.target.files[0]
  }

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="csvData">Upload file</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="csvData" type="file" onChange={handleInputChange} />
        <button className='bg-blue-700 text-white hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm sm:w-auto px-3 py-2 text-center' type="submit">Submit file</button>
      </form>
    </div>
  )
}
