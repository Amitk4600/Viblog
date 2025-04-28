import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../components/Navbar";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
} from "@mui/material";
function NewStory() {
  const editorRef = useRef(null);
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const handlePublish = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log("Published Content:", content);
    }
  };
  const availableTags = [
    "Programming",
    "Design",
    "Technology",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
    "Finance",
    "Entertainment",
  ];


  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-row gap-4 mb-4">
            <TextField
              label="Story Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="tag-select-label">Select Tags</InputLabel>
              <Select
                labelId="tag-select-label"
                multiple
                value={tags}
                onChange={handleTagChange}
                input={<OutlinedInput label="Select Tags" />}
                renderValue={(selected) => (
                  <div className="flex flex-wrap gap-2">
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {availableTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Editor
            apiKey="2da2hm72gqqpajbmh7ftpp1nmscebuxx2s7ic3ldpu08xfwd"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              menubar: true,
              branding: false,
              resize: false,
              placeholder: "Start writing your story here...",
              plugins:
                "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount",
              toolbar:
                "undo redo | formatselect | bold italic underline backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist | link image | removeformat | help",
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.onchange = function () {
                  const file = this.files[0];
                  const reader = new FileReader();
                  reader.onload = function () {
                    const id = "blobid" + new Date().getTime();
                    const blobCache = editorRef.current.editorUpload.blobCache;
                    const base64 = reader.result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              },
            }}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePublish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


export default NewStory;
