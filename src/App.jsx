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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">CV Builder</h1>
        <div className="flex gap-4">
          {/* Template Switcher */}
          <div>
            <label className="mr-2 font-semibold">Choose Template:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>
          {/* Export PDF Button */}
          <button
            onClick={() => exportPDF()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4 bg-gray-50">
          <EditorPanel cvData={cvData} setCVData={setCVData} />
        </div>
        <div className="lg:w-1/2 p-4 bg-white">
          <ResumePreview cvData={cvData} template={template} />
        </div>

      </div>
    </div>
  );
}

export default App;
