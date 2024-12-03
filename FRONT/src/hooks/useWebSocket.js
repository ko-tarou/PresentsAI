import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("https://1d32-202-13-166-100.ngrok-free.app"); // Adjust the URL as needed

const useWebSocket = (setTextBoxes, setSelectedBoxId) => {
  useEffect(() => {
    // Receive initial text boxes from the server
    socket.on("textBoxes", (data) => {
      setTextBoxes(data);
    });

    // Listen for updates to text boxes
    socket.on("textBoxUpdated", (updatedBox) => {
      setTextBoxes((prevBoxes) => {
        const existingIndex = prevBoxes.findIndex(box => box.id === updatedBox.id);
        if (existingIndex !== -1) {
          const updatedBoxes = [...prevBoxes];
          updatedBoxes[existingIndex] = updatedBox;
          return updatedBoxes;
        } else {
          return [...prevBoxes, updatedBox];
        }
      });
    });

    // Listen for deleted text boxes
    socket.on("deleteTextBox", (boxId) => {
      setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxId));
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("textBoxes");
      socket.off("textBoxUpdated");
      socket.off("deleteTextBox");
    };
  }, [setTextBoxes]);

  // Notify server about text box updates
  const updateTextBox = (box) => {
    socket.emit("updateTextBox", box);
  };

  // Notify server about adding a new text box
  const addTextBox = (box) => {
    socket.emit("addTextBox", box);
  };

  // Notify server about deleting a text box
  const deleteTextBox = (boxId) => {
    socket.emit("deleteTextBox", boxId);
    setSelectedBoxId(null); // Reset selected box
  };

  return { updateTextBox, addTextBox, deleteTextBox };
};

export default useWebSocket;
