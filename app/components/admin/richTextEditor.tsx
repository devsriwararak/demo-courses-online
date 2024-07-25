import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@/app/globals.css"; // Include your Tailwind CSS file
import "./richTextEditor.css"; // Include your Tailwind CSS file

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

  const customStyleMap = {
    'BOLD': {
      fontWeight: 'bold', // ใช้ 'bold' เพื่อความเข้ากันได้
      color: 'red', // ปรับเป็นสีที่ต้องการ
    },
    'ITALIC': {
      fontStyle: 'italic', // ใช้ 'italic' เพื่อความเข้ากันได้
      color: 'blue', // ปรับเป็นสีที่ต้องการ
    },
    'H2': {
      fontSize: '20px',
      color: 'green'
    }
  };

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
    <div>
      <Editor
        editorState={editorState}
        customStyleMap={customStyleMap}
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
        editorClassName="min-h-48 border border-gray-300 p-2 rounded"
      />
    </div>
  );
};

export default RichTextEditor;
