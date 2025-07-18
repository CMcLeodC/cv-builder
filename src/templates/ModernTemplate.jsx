function ModernTemplate({ cvData }) {
  return (
    <div className="font-sans space-y-4 text-gray-800">
      <h1 className={`${cvData.styles?.nameFontSize || 'text-3xl'} font-bold`}>
        {cvData.name}
      </h1>

      <h2 className={`${cvData.styles?.titleFontSize || 'text-xl'} text-gray-500`}>
        {cvData.title}
      </h2>
      <div className={`${cvData.styles?.fontFamily || "font-sans"} space-y-4 text-gray-800`}></div>

      <div className="text-sm text-gray-600 space-x-4">
        {cvData.email && <span>{cvData.email}</span>}
        {cvData.phone && <span>{cvData.phone}</span>}
        {cvData.location && <span>{cvData.location}</span>}
      </div>
      <p className="mt-2">{cvData.summary}</p>

      {cvData.sections.map(section => (
        <div key={section.id}>
          <h3 className={`${cvData.styles?.sectionTitleFontSize || 'text-lg'} font-semibold border-b border-gray-300`}>
            {section.title}
          </h3>
          {section.items.map((item, i) => (
            <div key={i} className="mb-2">
              {item.role && (
                <p className={`${cvData.styles?.roleFontSize || 'text-base'} font-medium`}>
                  {item.role} @ {item.company}
                </p>
              )}
              {item.degree && <p>{item.degree}, {item.institution}</p>}
              <p className="text-sm text-gray-600 italic">{item.date}</p>
              <p className={`${cvData.styles?.bodyFontSize || "text-sm"}`}>
                {item.description && (
                  <ul className="ml-4 list-disc space-y-1">
                    {item.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}

              </p>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ModernTemplate;
