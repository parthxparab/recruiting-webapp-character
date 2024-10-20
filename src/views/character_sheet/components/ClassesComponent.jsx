import { Divider } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { CLASS_LIST } from '../../../consts';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

function ClassesComponent({ attributes }) {

  const meetsClassRequirements = (classAttributes) => {
    return Object.keys(classAttributes).every(
      (attribute) => attributes[attribute] >= classAttributes[attribute]
    );
  };

  return (
    <div>
      <div>CLASS</div>
      <Divider sx={{ backgroundColor: 'white' }} />
      {Object.keys(CLASS_LIST).map((className) => {
        const classAttributes = CLASS_LIST[className];
        const qualifies = meetsClassRequirements(classAttributes);

        return (
          <div
            key={className}
            style={{
              marginBottom: '10px',
              backgroundColor: qualifies ? 'lightcoral' : null, 
              padding: '10px',
            }}
          >
            <LightTooltip
              title={
                <div>
                  {Object.entries(CLASS_LIST[className]).map(([attribute, value]) => (
                    <div key={attribute}>
                      {attribute}: {value}
                    </div>
                  ))}
                </div>
              }
            >
          <span>{className}</span>
            </LightTooltip>
          </div>)})}
    </div>
  )
}

export default ClassesComponent