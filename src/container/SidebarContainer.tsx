import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UserComponent from '../components/UserComponent';
import RegionComponent from '../components/RegionComponent';
import LambdaFuncList from '../components/LambdaFuncList';
import { useFunctionContext } from '../context/FunctionContext';
import { useGraphContext } from '../context/GraphContext';

const drawerWidth = 255;

export default function SidebarContainer() {
  // opens the menu drawers on click & changes the color
  const [openMenu, setOpenMenu] = React.useState(false);
  const [currentRegion, setCurrentRegion] = React.useState('us-west-1');
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
    !openMenu
      ? document
          .querySelector('#list-select')
          ?.classList.add('bg-[#B2CAB3]', 'dark:bg-[#7f9f80]')
      : document
          .querySelector('#list-select')
          ?.classList.remove('dark:bg-[#7f9f80]', 'bg-[#B2CAB3]');
  };

  // home sends you to the home page
  const {
    isHomeEnabled,
    setIsHomeEnabled,
    isPricingEnabled,
    setIsPricingEnabled,
    isMetricsEnabled,
    setIsMetricsEnabled,
    isPermissionsEnabled,
    setIsPermissionsEnabled,
  } = useFunctionContext();
  const { setCreateGraphIsShown } = useGraphContext();
  const handleHomeClick = () => {
    setIsHomeEnabled?.(true);
    setIsMetricsEnabled?.(false);
    setIsPricingEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(false);
  };

  // fetch list of lambda functions
  const [lambdaFuncList, setLambdaFuncList] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/main/functions')
      .then((res) => res.json())
      .then((data) => {
        setLambdaFuncList(data);
      })
      .catch((err) => {
        console.log('Error fetching lambda functions:', err);
      });
  }, [currentRegion]);

  /* default region will be US-West-1 for now
     until there is a way to retrieve user's region based on their AWS CLI config
     it will auto-change region to US-West-1 on component mount */
  React.useEffect(() => {
    fetch('http://localhost:3000/main/changeRegion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ region: currentRegion }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'region changed') setCurrentRegion(currentRegion);
        else alert('data');
      })
      .catch((err) => {
        console.log('Error changing region:', err);
      });
  }, [currentRegion]);

  return (
    <div className="bg-[#F5F5F5] text-black dark:bg-[#242424] dark:text-white">
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            p: 2,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="pt-5 flex justify-center">
            <RegionComponent
              currentRegion={currentRegion}
              setCurrentRegion={setCurrentRegion}
            />
          </div>

          <List>
            {['Home'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleHomeClick}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List id="list-select">
            {['Your Lambda Functions'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleOpenMenu}>
                  <ListItemText
                    primary={text}
                    sx={{
                      fontWeight: 'bold',
                    }}
                  />
                  {openMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {openMenu && <LambdaFuncList list={lambdaFuncList} />}

          <Divider />
        </Drawer>
      </Box>
    </div>
  );
}
