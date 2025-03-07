import React from "react";
import ReactMarkdown from 'react-markdown';

// Define more specific types for rich text blocks
interface RichTextChild {
  type: string;
  text?: string;
  [key: string]: any; // Allow for other properties
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
  [key: string]: any; // Allow for other properties
}

interface RichTextRendererProps {
  content: string | RichTextBlock[] | any;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  // If content is null or undefined, return null
  if (!content) {
    return null;
  }

  // If content is a string, try to render it as Markdown
  if (typeof content === 'string') {
    // Check if it looks like Markdown (contains common Markdown syntax)
    const containsMarkdown = /(\*\*|__|\*|_|##|#|\[.*\]\(.*\)|`{1,3}|>|---|---|^\d+\.)/.test(content);
    
    if (containsMarkdown) {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    }
    
    // If not Markdown, render as HTML
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // If content is an array (assuming it's an array of RichTextBlocks)
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((block: RichTextBlock, index: number) => {
          switch (block.type) {
            case "paragraph":
              return <p key={index}>{block.children.map((child: RichTextChild) => child.text).join(' ')}</p>;
            case "heading":
              return <h2 key={index}>{block.children.map((child: RichTextChild) => child.text).join(' ')}</h2>;
            // Add more cases as needed for different block types
            default:
              return <div key={index}>{block.children.map((child: RichTextChild) => child.text).join(' ')}</div>;
          }
        })}
      </>
    );
  }

  // If content is an object (could be Strapi's rich text format)
  if (typeof content === 'object') {
    try {
      // Try to parse it as Strapi v4/v5 rich text
      if (content.data && Array.isArray(content.data)) {
        return <div dangerouslySetInnerHTML={{ __html: content.data.join(' ') }} />;
      }
      
      // If it has a blocks property (another Strapi format)
      if (content.blocks && Array.isArray(content.blocks)) {
        return (
          <>
            {content.blocks.map((block: any, index: number) => {
              if (block.text) {
                return <p key={index}>{block.text}</p>;
              }
              return null;
            })}
          </>
        );
      }
      
      // Fallback: just stringify the object
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    } catch (error) {
      console.error('Error rendering rich text:', error);
      return <p>Error rendering content</p>;
    }
  }

  // Fallback for any other type
  return <p>{String(content)}</p>;
};

export default RichTextRenderer;