import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'Welcome to my Notes App !',
			date: 'Wed Sep 21 2022',
		},
		{
			id: nanoid(),
			text: 'Put your important notes of the day arranged',
			date: 'Wed Sep 21 2022',
		},
		{
			id: nanoid(),
			text: 'Refresh as much as you want , your notes are safe with us',
			date: 'Thu Sep 22 2022',
		},
		{
			id: nanoid(),
			text: 'Add as many notes you want to using our green card!',
			date: 'Thu Sep 22 2022',
		},
	]);

  // state for the search bar
	const [searchText, setSearchText] = useState('');

  // state for the dark mode toggle button
	const [darkMode, setDarkMode] = useState(false);

  // use effect for retrieving any notes when the app loads for the first time the server starts
	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

  //when the dependency array of a useEffect hook is empty that means that hook will only run when the app first loads and in this case that is what we exactly want



  // this use effect helps us in saving the stringified version of our notes array in the local storage with the key given as the first parameter

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);


   // this text is passed over to the parent component ie the app.js from the addNote component by passing this function via handleAddNote from NoteList.js the addNote.js

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
    // this basically states if darkMode is set to true then add the dark-mode class to the div
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />

        {/* below line basically takes all the notes , filters them and returns only the ones that includes the search text which is having a hook value being updated as the user types */}
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;
