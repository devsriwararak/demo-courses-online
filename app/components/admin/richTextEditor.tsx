import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


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

  // const customStyleMap = {
  //   BOLD: {
  //     fontWeight: '800', // ใช้ camelCase ใน JavaScript
  //     color: 'red', // ปรับเป็นสีที่ต้องการ
  //   },
  // };

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
        // customStyleMap={customStyleMap}
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
            "remove",
            "history",
          ],
          // inline: {
          //   inDropdown: false,
          //   options: ["bold", "italic", "underline"],
          //   // bold: { className: 'toolbar-bold' },
          //   // italic: { className: 'toolbar-italic' },
          //   underline: { className: 'toolbar-underline' },
          // },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3"],
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
        editorClassName="wysiwyg-editor"
      />
    </div>
  );
};

export default RichTextEditor;
