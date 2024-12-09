import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import theme from './theme';

const MenuItemStyled = styled(MenuItem)(({theme, variant})=>({
    '&&': {...theme.typography.body1,
    color: variant === 'active' ? theme.palette.primary.main : theme.palette.grey[400],
    textOverflow: 'clip',

    backgroundColor: variant === 'active' ? theme.palette.primary.light : 'inherit',
    '&:hover': {
        backgroundColor: variant === 'active' ? theme.palette.primary.dark : theme.palette.grey[300],
    },}
}));

export { MenuItemStyled };