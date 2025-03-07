import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { vProjectSelector, pickerSelector } from '../../../selector/selectors';
import { ITag } from '../../../model';
import { IProjectDialogState } from './ProjectDialog';
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormLabel,
  SxProps,
  TextField,
} from '@mui/material';
import { IVProjectStrings } from '../../../model';
import Tags from '../../../control/Tags';

export const ProjectTags = (props: IProjectDialogState) => {
  const { state, setState } = props;
  const { tags } = state;

  const t: IVProjectStrings = useSelector(vProjectSelector, shallowEqual);

  const handleChange = (tags: ITag) => {
    setState((state) => ({ ...state, tags }));
  };
  const handleTagChange = (e: any) => {
    setState((state) => ({ ...state }));
  };

  const textFieldProps = {
    mx: 1,
    "&:has([readOnly]) ": {
      height: '47px',
      marginBottom: '1px',
      "& .MuiInputLabel-root": {
        color: "rgba(0, 0, 0, 0.6)"
      },
    }
  } as SxProps;

  return(
    <>
      <FormLabel sx={{ color: 'primary.main', textTransform: 'uppercase' }}>{t.tags}</FormLabel>
      <Box sx={{display: 'flex', justifyContent: 'flex-start', position: 'relative' }}>
        <FormControlLabel
          sx={{
            ...textFieldProps,
            marginLeft: '-11px',
            paddingLeft: '0px'
          }}
          control={
            <Checkbox
              id="digest"
              checked={false}
              onChange={handleTagChange}
              sx={{ margin: '0px' }}
            />
          }
          label={"labeledTag"}
        />
        <FormControlLabel
          sx={{
            ...textFieldProps,
            marginLeft: '30px',
            paddingLeft: '0px'
          }}
          control={
            <>
              <Checkbox
                id="digest"
                checked={false}
                onChange={handleTagChange}
                sx={{ margin: '0px' }}
              />
              <TextField
                title={"Press \'enter\' to save your tag."}
                placeholder={"other.."}
                //onChange={handleSyncFreqChange}
                type="text"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                      borderRadius: '0%',
                      borderBottom: '2px solid',
                      borderColor: 'secondary.contrastText',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'secondary.dark',
                    },
                  },
                }}
              />
            </>
          }
          label=""
        />
      </Box>
      
    </>
  );
  // return <Tags tags={tags} onChange={handleChange} sx={{ mb: 3 }} />;
};
