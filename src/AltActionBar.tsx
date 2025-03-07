import { BoxProps } from "@mui/material";
import { ActionRow, AltButton, PriButton } from "./control";


interface IAltActionBar extends BoxProps {
    primaryLabel: string;
    primaryOnClick: () => void;
    primaryDisabled?: boolean;
    primaryKey: string;
    primaryAria: string;
    altShown?: boolean;
    altLabel: string;
    altOnClick: () => void;
    altDisabled?: boolean;
    altKey: string;
    altAria: string;
}

export const AltActionBar = (props: IAltActionBar) => (
  <ActionRow sx={{ textAlign: 'left', padding: '0px' }}>
    <PriButton
      id="primaryAction"
      key={props.primaryKey}
      aria-label={props.primaryAria}
      disabled={props.primaryDisabled || false}
      sx={{ marginLeft: '0' }}
      onClick={props.primaryOnClick}
    >
      {props.primaryLabel}  
    </PriButton>
    { props.altShown && 
      (<AltButton
        id="altAction"
        key={props.altKey}
        aria-label={props.altAria}
        onClick={props.altOnClick}
        sx={{ textTransform: 'capitalize', marginLeft:'8px' }}
      >
        {props.altLabel}
      </AltButton>)
    }
  </ActionRow>
);