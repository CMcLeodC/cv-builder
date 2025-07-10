import { useState } from 'react'
import './App.css'
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';
import { defaultCV } from './data/defaultCVData';

function App() {
  const [cvData, setCVData] = useState(defaultCV);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 overflow-y-auto bg-gray-100">
        <EditorPanel cvData={cvData} setCVData={setCVData} />
      </div>
      <div className="w-1/2 p-4 overflow-y-auto bg-white">
        <ResumePreview cvData={cvData} />
      </div>
    </div>
  );
}

export default App;
