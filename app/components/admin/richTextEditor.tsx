// src/components/RichTextEditor.tsx
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface RichTextEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onEditorChange,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  );

  useEffect(() => {
    if (value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(value))));
    }
  }, [value]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
    onEditorChange(content);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 
            'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'
          ],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
          },
          fontSize: {},
          fontFamily: {},
          list: {
            inDropdown: true,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
          },
          textAlign: {
            inDropdown: true,
            options: ['left', 'center', 'right', 'justify'],
          },
          colorPicker: {},
          link: {
            inDropdown: true,
          },
          embedded: {},
          emoji: {},
          image: {},
          remove: {},
          history: {},
        }}
      />
    </div>
  );
};

export default RichTextEditor;
