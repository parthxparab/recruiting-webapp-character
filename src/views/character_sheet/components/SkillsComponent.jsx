import { Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { SKILL_LIST } from '../../../consts';

function SkillsComponent({modifiers}) {

  const totalSkillPoints = 10 + (4 * modifiers['Intelligence']);
  const [remainingPoints, setRemainingPoints] = useState(totalSkillPoints);

  const [skillPoints, setSkillPoints] = useState(() =>
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = 0;
      return acc;
    }, {})
  );

  const updateSkillPoints = (skillName, change) => {
    const currentPoints = skillPoints[skillName];
    const newPoints = currentPoints + change;

    if (newPoints < 0) {
      window.alert("You cant go below zero.");
      return;
    }

    if (remainingPoints - change < 0) {
      window.alert('You need more Intelligence to have more skill points.');
      return;
    }

    setSkillPoints((prevPoints) => ({
      ...prevPoints,
      [skillName]: newPoints,
    }));
    setRemainingPoints(remainingPoints - change);
  };

  useEffect(() => {
    const spentPoints = Object.values(skillPoints).reduce((acc, points) => acc + points, 0);
    setRemainingPoints(totalSkillPoints - spentPoints);
  }, [modifiers['Intelligence'], totalSkillPoints, skillPoints]);


  return (
    <div>
      <div>SKILL</div>
      <Divider sx={{backgroundColor: 'white'}} />
      <div>Total skill points: {totalSkillPoints}</div>
      <div>Remaining points: {remainingPoints}</div>
      <br />
      {SKILL_LIST.map((skill) => {
        const attributeModifier = modifiers[skill.attributeModifier];
        const totalSkillValue = skillPoints[skill.name] + attributeModifier;

        return (
          <div key={skill.name}>
            <label>{skill.name}</label> : 
            <Button
              variant="text"
              size="small"
              color="white"
              onClick={() => updateSkillPoints(skill.name, -1)}
            >
              -
            </Button>
            {skillPoints[skill.name]}
            <Button
              variant="text"
              size="small"
              color="white"
              onClick={() => updateSkillPoints(skill.name, 1)}
            >
              +
            </Button>
            <span style={{ marginLeft: '5px' }}>
              modifier ({skill.attributeModifier}): {attributeModifier}
            </span>
            <span style={{ marginLeft: '5px' }}>
              total: {totalSkillValue}
            </span>
          </div>
        );
      })}
    </div>
  );
}


export default SkillsComponent