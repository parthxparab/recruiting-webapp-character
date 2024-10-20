import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import SkillCheckComponent from './components/SkillCheckComponent';
import SkillCheckResultComponent from './components/SkillCheckResultComponent';
import AttributesComponent from './components/AttributesComponent';
import ClassesComponent from './components/ClassesComponent';
import SkillsComponent from './components/SkillsComponent';
import CharacterNameComponent from './components/CharacterNameComponent';
import { ATTRIBUTE_LIST } from '../../consts';

function CharacterSheetView({ character, onUpdateCharacter }) {

  const calculateModifier = (attributeValue) => {
    return Math.floor((attributeValue - 10) / 2);
  };

  const [attributes, setAttributes] = useState(() =>
    ATTRIBUTE_LIST.reduce((acc, attribute) => {
      acc[attribute] = character?.attributes?.[attribute] ?? 10;;
      return acc;
    }, {})
  );

  const [modifiers, setModifiers] = useState(() =>
    ATTRIBUTE_LIST.reduce((acc, attribute) => {
      acc[attribute] = calculateModifier(character?.attributes?.[attribute] ?? 10);
      return acc;
    }, {})
  );

  const [totalAttribute, setTotalAttribute] = useState(() => {
    return character?.attributes
      ? Object.values(character.attributes).reduce((acc, value) => acc + value, 0)
      : 60;
  });

  const updateAttribute = (attribute, newValue) => {

    if (totalAttribute + newValue > 70) {
      window.alert('total attribute cannot be more than 70')
    }

    else if (attributes[attribute] + newValue <= 0) {
      window.alert(' attribute cannot be 0')

    }

    else {

      setAttributes((prevAttributes) => {
        const updatedAttributes = {
          ...prevAttributes,
          [attribute]: attributes[attribute] + newValue,
        };

        setModifiers((prevModifiers) => ({
          ...prevModifiers,
          [attribute]: calculateModifier(updatedAttributes[attribute]),
        }));

        return updatedAttributes;
      });

      setTotalAttribute(totalAttribute + newValue)

    }
  };

  useEffect(() => {
    onUpdateCharacter(character.id, attributes, modifiers, totalAttribute);
  }, [attributes, modifiers, totalAttribute]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid
            sx={{ border: 1 }}
            size={12}>
            <CharacterNameComponent name={character?.name} />
          </Grid>
          <Grid
            sx={{ border: 1 }}
            size={12}>
            <SkillCheckComponent modifiers={modifiers} />
          </Grid>
          <Grid
            sx={{ border: 1 }}
            size={12}>
            <SkillCheckResultComponent />
          </Grid>
          <Grid
            sx={{ border: 1 }}
            size={4}>
            <AttributesComponent
              updateAttribute={updateAttribute}
              attributes={attributes}
              totalAttribute={totalAttribute}
              modifiers={modifiers}
            />
          </Grid>
          <Grid
            sx={{ border: 1 }}
            size={2}>
            <ClassesComponent attributes={attributes} />
          </Grid>
          <Grid
            sx={{ border: 1 }}
            size={6}>
            <SkillsComponent modifiers={modifiers} />
          </Grid>
        </Grid>

      </Box>

    </div>
  )
}

export default CharacterSheetView