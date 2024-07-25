import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@/app/globals.css"; // Include your Tailwind CSS file

interface RichTextEditorProps {
  value: string;
  onEditorChange: (editorState: EditorState) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onEditorChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    value
      ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(value).contentBlocks))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (value === "") {
      setEditorState(EditorState.createEmpty());
    } else {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [value]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    onEditorChange(state);
  };

  return (
    <div className="container mx-auto p-4">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
            bold: { className: "font-bold text-red-500" },
            italic: { className: "italic" },
            underline: { className: "underline" },
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "Blockquote"],
          },
          list: {
            inDropdown: true,
            options: ["unordered", "ordered", "indent", "outdent"],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
          },
        }}
        wrapperClassName="border border-gray-300 rounded p-4"
        editorClassName="min-h-48 border border-gray-300 p-2 rounded"
        toolbarClassName="border border-gray-300 rounded"
      />
    </div>
  );
};

export default RichTextEditor;
