import React from 'react'
import { ATTRIBUTE_LIST } from '../../../consts'
import { Button, Divider } from '@mui/material'

function AttributesComponent({ updateAttribute, attributes, totalAttribute, modifiers }) {

  return (
    <div>
      <div>ATTRIBUTES</div>
      <Divider sx={{ backgroundColor: 'white' }} />
      Total attribute count: {totalAttribute}
      <br/>
      <br />
      {ATTRIBUTE_LIST.map((attribute) => (
      <div key={attribute}>
        <label>{attribute}</label>
        <Button 
            variant='text' 
        size="small" 
        color='white' 
        onClick={() => updateAttribute(attribute, - 1)}>-</Button>
        <span>{attributes[attribute]}</span>
          <Button variant='text' size="small" 
        color='white' 
        onClick={() => updateAttribute(attribute, 1)}>+</Button>
          <span style={{ marginLeft: '10px' }}>
            Modifier : {modifiers[attribute]}
          </span>
      </div>
    ))}</div>
  )
}

export default AttributesComponent