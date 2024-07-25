import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextEditor.css"; // เพิ่มไฟล์ CSS สำหรับ custom styles

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
      fontWeight: "bold",
      color: 'red',
    },
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
      onEditorStateChange={setEditorState}
      customStyleMap={customStyleMap}
    />
    </div>
  );
};

export default RichTextEditor;
