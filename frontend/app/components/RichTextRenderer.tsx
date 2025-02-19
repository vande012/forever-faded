import React from "react";

interface RichTextBlock {
  type: string;
  children: Array<{
    type: string;
    text?: string;
  }>;
}

interface RichTextRendererProps {
  richText: RichTextBlock[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ richText }) => {
  if (!richText) {
    return null;
  }

  return (
    <>
      {richText.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.children.map((child) => child.text).join(' ')}</p>;
          case "heading":
            return <h2 key={index}>{block.children.map((child) => child.text).join(' ')}</h2>;
          // Add more cases as needed for different block types
          default:
            return <div key={index}>{block.children.map((child) => child.text).join(' ')}</div>;
        }
      })}
    </>
  );
};

export default RichTextRenderer;