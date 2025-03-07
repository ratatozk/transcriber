import React, { useEffect, useState } from 'react';
import { ITag, IVProjectStrings } from '../../../model';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
  styled,
  Tabs,
  Tab,
  SxProps,
} from '@mui/material';
import {
  ProjectName,
  ProjectDescription,
  ProjectType,
  ProjectTags,
  ProjectExpansion,
  Language,
  ILanguage,
} from '.';
import Mode from '../../../model/dialogMode';
import { IDialog } from '../../../model';
import { shallowEqual, useSelector } from 'react-redux';
import { vProjectSelector } from '../../../selector';
import { ProjectBook } from './ProjectBook';

const initState = {
  name: '',
  description: '',
  type: 'scripture',
  book: '',
  story: true,
  bcp47: 'und',
  languageName: '',
  isPublic: false,
  spellCheck: false,
  font: '',
  rtl: false,
  fontSize: 'large',
  tags: {} as ITag,
  flat: false,
  organizedBy: '',
  isPersonal: false,
  vProjectStrings: {} as IVProjectStrings,
};
export const initProjectState = { ...initState };
export type IProjectDialog = typeof initState;

export interface IProjectDialogState {
  state: IProjectDialog;
  setState: React.Dispatch<React.SetStateAction<IProjectDialog>>;
  setBookErr?: React.Dispatch<React.SetStateAction<string>>;
  addMode?: boolean;
}

interface IProps extends IDialog<IProjectDialog> {
  nameInUse?: (newName: string) => boolean;
}

const tabProps = {
  width: "200px",
} as SxProps;

export function ProjectDialog(props: IProps) {
  const { mode, values, isOpen, onOpen, onCommit, onCancel, nameInUse } = props;
  const t = useSelector(vProjectSelector, shallowEqual);
  initState.organizedBy = 'section';
  initState.vProjectStrings = t;
  const [state, setState] = React.useState({ ...initState });
  const { name, type, bcp47 } = state;
  const [bookErr, setBookErr] = React.useState('');
  const addingRef = React.useRef(false);

  useEffect(() => {
    setState(!values ? { ...initState } : { ...values });
    if (isOpen) addingRef.current = false;
  }, [values, isOpen]);

  const handleClose = () => {
    if (onOpen) onOpen(false);
    if (onCancel) onCancel();
  };

  const handleAdd = () => {
    if (!addingRef.current) {
      addingRef.current = true;

      if (onOpen) onOpen(false);
      onCommit(state);
    }
  };

  const handleTypeChange = (val: string) => {
    setState((state) => ({ ...state, type: val || '' }));
  };

  const handleLanguageChange = (val: ILanguage) => {
    setState((state) => ({ ...state, ...val }));
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Dialog
      id="projectSettings"
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="projectDlg"
      scroll={'paper'}
      disableEnforceFocus
      maxWidth="md"
      fullWidth
    >
      <DialogTitle 
        id="projectDlg"
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '10px',
          paddingLeft: '25px',
          color: 'secondary.contrastText',
          borderBottom: '1px solid lightgray'
        }}>
        {t.newProject.replace('{0}', mode === Mode.add ? t.configure : t.edit)}
      </DialogTitle>
      <Tabs 
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
              backgroundColor: "secondary.dark",
              height: "2px",
            },
          "& .Mui-selected": {
            color: "secondary.dark"
          }
        }}
      >
        <Tab label="Basic" sx={ tabProps }/>
        <Tab label="Advanced" sx={ tabProps }/>
      </Tabs>
      <DialogContent>
        <ProjectName state={state} setState={setState} inUse={nameInUse} />
        <ProjectDescription state={state} setState={setState} />
        <ProjectType type={type} onChange={handleTypeChange} />
        <ProjectBook
          state={state}
          setState={setState}
          setBookErr={setBookErr}
        />
        <Language {...state} onChange={handleLanguageChange} />
        <ProjectTags state={state} setState={setState} />
        <ProjectExpansion
          state={state}
          setState={setState}
          addMode={mode === Mode.add}
        />
      </DialogContent>
      <DialogActions>
        <Button id="projCancel" onClick={handleClose} color="primary">
          {t.cancel}
        </Button>
        <Button
          id="projAdd"
          onClick={handleAdd}
          color="primary"
          disabled={
            (nameInUse && nameInUse(name)) ||
            name === '' ||
            bcp47 === 'und' ||
            type === '' ||
            bookErr !== ''
          }
        >
          {mode === Mode.add ? t.add : t.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
