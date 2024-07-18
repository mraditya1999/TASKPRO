// import { styled, useTheme } from '@mui/material/styles';
// import Drawer from '@mui/material/Drawer';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import List from '@mui/material/List';
// import { routesList } from '../../utils';
// import {
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// const drawerWidth = 240;

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// interface CustomDrawerProps {
//   open: boolean;
//   handleDrawerClose: () => void;
//   handleLogout: () => void;
// }

// const CustomDrawer = ({
//   open,
//   handleDrawerClose,
//   handleLogout,
// }: CustomDrawerProps) => {
//   const theme = useTheme();

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//         },
//       }}
//       variant='persistent'
//       anchor='left'
//       open={open}
//     >
//       <DrawerHeader>
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === 'ltr' ? (
//             <ChevronLeftIcon />
//           ) : (
//             <ChevronRightIcon />
//           )}
//         </IconButton>
//       </DrawerHeader>
//       <Divider />
//       <List>
//         {routesList.map(({ id, href, text, icon }) => (
//           <ListItem key={id} disablePadding sx={{ display: 'block' }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 // px: 2.5,
//               }}
//               component={NavLink}
//               to={href}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 {icon}
//               </ListItemIcon>
//               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <ListItem disablePadding sx={{ display: 'block' }}>
//         <ListItemButton
//           sx={{
//             minHeight: 48,
//             justifyContent: open ? 'initial' : 'center',
//             color: '#d32f2f',
//             width: '100%',
//             '&:hover': {
//               backgroundColor: '#ffe6e6', // Light red background on hover
//             },
//           }}
//           component='button'
//           onClick={handleLogout}
//         >
//           <ListItemIcon
//             sx={{
//               minWidth: 0,
//               mr: open ? 3 : 'auto',
//               justifyContent: 'center',
//               color: '#d32f2f',
//             }}
//           >
//             <LogoutOutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
//         </ListItemButton>
//       </ListItem>
//     </Drawer>
//   );
// };

// export default CustomDrawer;

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { routesList } from '../../utils';
import AdminUsersList from '../UsersList'; // Adjust the path as necessary
import { useAppSelector } from '../../hooks';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface CustomDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleLogout: () => void;
}

const CustomDrawer = ({
  open,
  handleDrawerClose,
  handleLogout,
}: CustomDrawerProps) => {
  const theme = useTheme();
  const userRole = useAppSelector((state) => state.user.user?.role);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routesList.map(({ id, href, text, icon }) => (
          <ListItem key={id} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
              }}
              component={NavLink}
              to={href}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            color: '#d32f2f',
            width: '100%',
            '&:hover': {
              backgroundColor: '#ffe6e6', // Light red background on hover
            },
          }}
          component='button'
          onClick={handleLogout}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: '#d32f2f',
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>

      {userRole === 'admin' && (
        <ListItem disablePadding>
          <AdminUsersList />
        </ListItem>
      )}
    </Drawer>
  );
};

export default CustomDrawer;
