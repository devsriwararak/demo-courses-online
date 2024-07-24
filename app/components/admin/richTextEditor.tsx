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
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline", "strikethrough", "monospace"],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"],
          },
          fontSize: {},
          fontFamily: {},
          list: {
            inDropdown: true,
            options: ["unordered", "ordered", "indent", "outdent"],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
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
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        style={{ width: "100%", height: "200px", marginTop: "20px" }}
      />
      
    </div>
  );
};

export default RichTextEditor;
