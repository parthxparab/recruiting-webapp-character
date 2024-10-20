import React, { useState } from 'react'
import { Button, Divider, MenuItem, Select, TextField } from '@mui/material';
import { SKILL_LIST } from '../../../consts';

function SkillCheckComponent({ modifiers }) {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(''); 
  const [rollResult, setRollResult] = useState(null); 
  const [totalSkillCheck, setTotalSkillCheck] = useState(null); 
  const [skillCheckResult, setSkillCheckResult] = useState('');

  const handleRoll = () => {
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const skillModifier = modifiers[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier]; 
    const total = randomRoll + skillModifier;

    setRollResult(randomRoll);
    setTotalSkillCheck(total);

    if (total >= dc) {
      setSkillCheckResult('Success');
      window.alert('Success')
    } else {
      setSkillCheckResult('Failure');
      window.alert('Failure')
    }
  };

  return (
    <div><div>SKILL CHECK</div>
      <Divider sx={{ backgroundColor: 'white' }} />
      <span>SKILL: </span>
      <Select
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
        displayEmpty
        size='small'
        style={{ marginRight: '10px', minWidth: '120px', color: 'black', backgroundColor: 'white', margin: 10 }}
      >
        {SKILL_LIST.map(skill => (
          <MenuItem key={skill.name} value={skill.name}>
            {skill.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="DC"
        type="number"
        size='small'
        value={dc}
        onChange={(e) => setDc(Number(e.target.value))}
        style={{ marginRight: '10px', width: '100px', color: 'black', backgroundColor: 'white', margin: 10  }}
      />
      <Button variant="contained"  onClick={handleRoll} style={{ backgroundColor: 'white', color: 'black' }}
      size='small'
        color='white'>
        Roll
      </Button>
      </div>
  )
}

export default SkillCheckComponent