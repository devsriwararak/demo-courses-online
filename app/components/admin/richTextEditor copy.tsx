// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Font,
  Link,
  Image,
  BlockQuote,
  Code,
  Alignment,
  List,
  Indent,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

function CustomEditor() {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          Undo,
          Heading,
          Font,
          Link,
          Image,
          BlockQuote,
          Code,
          Alignment,
          List,
          Indent,
        ],
        initialData: "<p>Hello from CKEditor 5 in React!</p>",
      }}
    />
  );
}

export default CustomEditor;
