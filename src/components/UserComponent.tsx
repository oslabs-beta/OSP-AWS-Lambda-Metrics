import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function UserComponent() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div className="flex justify-between w-5.5/12">
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
                variant="contained" {...bindTrigger(popupState)}
                sx = {{
                fontSize: 10,
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
            >
              <AccessibilityIcon sx = {{
                pr:0.5
              }}/>
              Username
            </Button>
          </div>
          <Menu 
          sx={{
            width: '100%'
          }} {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>admin</MenuItem>
            <MenuItem onClick={popupState.close}>user1</MenuItem>
            <MenuItem onClick={popupState.close}>user2</MenuItem>
          </Menu>

  </React.Fragment>
    )}
</PopupState>
  );
}