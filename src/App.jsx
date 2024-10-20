import { useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.ts';
import CharacterSheetView from './views/character_sheet/CharacterSheetView';
import { getCharacters, saveCharacters } from './services/appServices';
import { Button, ButtonGroup, makeStyles } from '@mui/material';

function App() {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function fetchData() {
      const characterData = await getCharacters();
      setCharacters(characterData); 
    }

    fetchData();
  }, []);

  const addNewCharacter = () => {
    const maxId = characters.length > 0 ? Math.max(...characters.map(c => c.id)) : 0;

    const newCharacter = {
      id: maxId + 1, 
      name: `Character ${maxId + 1}`, 
    };

    setCharacters([...characters, newCharacter]);
  }

  const saveAllCharacters = async () => {
    try {
      await saveCharacters(characters);
      alert('All characters saved successfully!');
    } catch (error) {
      console.error('Error saving characters:', error);
      alert('Failed to save characters.');
    }
  };

  const updateCharacterData = (id, updatedAttributes, updatedModifiers, totalAttribute) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === id
          ? { ...char, attributes: updatedAttributes, modifiers: updatedModifiers, totalAttribute }
          : char
      )
    );
  };

  const resetAllCharacters = async () => {
    try {
      await saveCharacters([]);
      setCharacters([]);
      alert('All characters have been reset!');
    } catch (error) {
      console.error('Error resetting characters:', error);
      alert('Failed to reset characters.');
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{margin: '10px 0px'}} 
        style={{backgroundColor: 'white', color: 'black'}}
        color='white'
        >
          <Button onClick={addNewCharacter}>Add New Character</Button>
          <Button onClick={resetAllCharacters}>Reset All Characters</Button>
          <Button onClick={saveAllCharacters}>Save All Characters</Button>
        </ButtonGroup>
        {characters && characters.map(character => (
          <div key={character.id}>
            <CharacterSheetView character={character}
              onUpdateCharacter={updateCharacterData}
               />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
