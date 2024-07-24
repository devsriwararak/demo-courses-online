import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface RichTextEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onEditorChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    value ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(value).contentBlocks)) : EditorState.createEmpty()
  );

  useEffect(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [value]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = draftToHtml(convertToRaw(state.getCurrentContent()));
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
          inline: {
            inDropdown: true,
            options: ["bold", "italic", "underline", "strikethrough", "monospace"],
            bold: { className: 'demo-option-custom' },
            italic: { className: 'demo-option-custom' },
            underline: { className: 'demo-option-custom' },
            strikethrough: { className: 'demo-option-custom' },
            monospace: { className: 'demo-option-custom' },
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"],
            className: 'demo-option-custom-wide',
            dropdownClassName: 'demo-dropdown-custom',
          },
          fontSize: { className: 'demo-option-custom-medium' },
          fontFamily: { className: 'demo-option-custom-wide' },
          list: {
            inDropdown: true,
            options: ["unordered", "ordered", "indent", "outdent"],
            unordered: { className: 'demo-option-custom' },
            ordered: { className: 'demo-option-custom' },
            indent: { className: 'demo-option-custom' },
            outdent: { className: 'demo-option-custom' },
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
            left: { className: 'demo-option-custom' },
            center: { className: 'demo-option-custom' },
            right: { className: 'demo-option-custom' },
            justify: { className: 'demo-option-custom' },
          },
          colorPicker: {
            className: 'demo-option-custom',
            popupClassName: 'demo-popup-custom',
          },
          link: {
            inDropdown: true,
            className: 'demo-option-custom',
            popupClassName: 'demo-popup-custom',
          },
          embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
          emoji: { className: 'demo-option-custom' },
          image: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
          remove: { className: 'demo-option-custom' },
          history: { className: 'demo-option-custom' },
        }}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        style={{ width: "100%", height: "200px", marginTop: "20px" }}
      />
    </div>
  );
};

export default RichTextEditor;
