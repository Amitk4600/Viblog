import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../../components/Navbar"; 

const Story = ({ story }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> 
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          {story ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {story.title}
              </h2>
              <p className="text-gray-600 mb-6">{story.content}</p>
              <div className="flex justify-end space-x-4">
                <IconButton color="primary" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">No story available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;
