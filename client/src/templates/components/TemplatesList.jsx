import React from "react";

import TemplateItem from "./TemplateItem";

const TemplateList = (props) => {
  return (
    <>
      <div>
        {props.items.map((template) => {
          return (
            <TemplateItem
              key={template.id}
              id={template.id}
              title={template.templateTitle}
              content={template.templateContent}
              creator={template.templateCreator}
              lastEdited={template.templateCreated}
              // usedCount={template.usedCount}
            />
          );
        })}
      </div>
    </>
  );
};

export default TemplateList;
