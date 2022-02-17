import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from "@mui/material";

interface Props {
  actions: {
    icon: JSX.Element;
    name: string;
  }[];
  fabAction: Function;
}

const CFab: React.FC<Props> = ({ actions, fabAction }) => {
  return (
    <StyledSpeedDial ariaLabel="speed dial" icon={<SpeedDialIcon />} direction="up">
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          tooltipTitle={action.name}
          icon={action.icon}
          tooltipOpen
          onClick={() => fabAction(action.name)}
        />
      ))}
    </StyledSpeedDial>
  );
};

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(5),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(5),
    left: theme.spacing(5),
  },
}));

export default CFab;
