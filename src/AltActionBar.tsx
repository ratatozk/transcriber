import { BoxProps } from "@mui/material";
import { ActionRow, AltButton, PriButton } from "./control";


interface IAltActionBar extends BoxProps {
    primaryLabel: string;
    primaryOnClick: () => void;
    primaryDisabled?: boolean;
    primaryKey: string;
    primaryAria: string;
    altLabel: string;
    altOnClick: () => void;
    altDisabled?: boolean;
    altKey: string;
    altAria: string;
}

export const AltActionBar = ({ children, ...rest }: IAltActionBar) => (
    <ActionRow sx={{ textAlign: 'left', padding: '0px' }}>
        <PriButton
            id="actionPrimary"
            key="add"
            aria-label={tp.add}
            disabled={
                !requiredComplete() ||
                !myChanged ||
                saveRequested(toolId) ||
                dupName
            }
            sx={{
                marginLeft: '0',
                textTransform: 'capitalize'
            }}
            onClick={
                currentUser === undefined ?
                handleAdd :
                handleSave
            }
            >
            {editUserId && /Add/i.test(editUserId)
                ? tp.add
                : userNotComplete()
                ? tp.next
                : tp.save}
        </PriButton>
        {((editUserId && /Add/i.test(editUserId)) ||
            (currentUser &&
                currentUser.attributes?.name !==
                currentUser.attributes?.email)) && (
                <AltButton
                    id="profileCancel"
                    key="cancel"
                    aria-label={tp.cancel}
                    onClick={handleCancel}
                    sx={{ marginLeft:'8px' }}
                    >
                    {tp.cancel}
                </AltButton>
        )}
        {!readOnlyMode &&
            <AltButton
                id="createProfileLogout"
                key="logout"
                sx={{ marginLeft:'8px' }}
                aria-label={tp.logout}
                onClick={handleLogout}
                >
                {tp.logout}
            </AltButton>
        }
    </ActionRow>