import { useState } from 'react'
import './App.css'
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';
import { defaultCV } from './data/defaultCVData';
import { exportPDF } from './utils/pdfExport';

function App() {
  const [cvData, setCVData] = useState(defaultCV);
  const [template, setTemplate] = useState("modern");

  return (
    <>
      <div className="p-4 bg-gray-200 flex items-center">
        <label className="mr-2 font-semibold">Choose Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>
        <button
          onClick={() => exportPDF()}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📄 Export PDF
        </button>
      </div>
      <div className="flex h-screen">
        <div className="w-1/2 p-4 overflow-y-auto bg-gray-100">
          <EditorPanel cvData={cvData} setCVData={setCVData} />
        </div>
        <div className="w-1/2 p-4 overflow-y-auto bg-white">
          <ResumePreview cvData={cvData} template={template} />
        </div>
      </div>
    </>
  );
}

export default App;
