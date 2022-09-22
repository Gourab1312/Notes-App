import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");

  const characterLimit = 200;

  const handleChange = (event) => {
    if(characterLimit-event.target.value.length >= 0){
        setNoteText(event.target.value);
    }
  };

  const handleClick = () => {

    // trim function removes all the spaces thus restrictiing the user in adding blank cards
    if (noteText.trim().length > 0){
        handleAddNote(noteText);
        // after adding a card we want to set the next card's state to an empty string
        setNoteText('');
    }
  };

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type here to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} remaining</small>
        <button className="save" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
