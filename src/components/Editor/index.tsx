'use client';

import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface EditerProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Editor({ placeholder, onChange }: EditerProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={placeholder}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange?.(data);
      }}
    />
  );
}
