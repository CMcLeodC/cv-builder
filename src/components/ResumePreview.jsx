import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";

function ResumePreview({ cvData, template }) {
  return (
    <div id="resume" className="p-6 bg-white max-w-[800px] mx-auto">
      {template === "modern" ? (
        <ModernTemplate cvData={cvData} />
      ) : (
        <ClassicTemplate cvData={cvData} />
      )}
    </div>
  );
}

export default ResumePreview;
