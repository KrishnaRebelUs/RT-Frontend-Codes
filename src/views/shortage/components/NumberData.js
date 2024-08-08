import React, { useState, useEffect } from 'react';
import { Box, Stack, styled, Avatar, useTheme, Typography } from '@mui/material';
import { IconClock, IconBriefcase, IconCurrencyDollar } from '@tabler/icons-react';

const NumberData = (props) => {
  const { data } = props;
  const [iconComponents, setIconComponents] = useState([]);
  const theme = useTheme();

  const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: '7px',
    width: '32px',
    height: '32px',
    '& svg': {
      color: theme.palette.primary.contrastText,
      width: '22px',
      height: '22px',
      size:'12'
    }
  }));

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons = await Promise.all(
        data.map(async (section) => {
          switch (section.icon) {
            case 'IconClock':
              return IconClock;
            case 'IconBriefcase':
              return IconBriefcase;
            case 'IconCurrencyDollar':
              return IconCurrencyDollar;
            default:
              return null;
          }
        })
      );
      setIconComponents(loadedIcons);
    };

    loadIcons();
  }, [data]);

  return (
    <Box>
      <Stack direction='column'>
        {data.map((section, index) => (
          <React.Fragment key={index}>
            <Box>
              <Stack direction='row' spacing={1} alignItems="center" marginBottom={index !== data.length - 1 ? 2 : 0}>
                <AvatarStyled style={{ backgroundColor: section.avatarBackgroundColor || theme.palette.success.main }}>
                  {iconComponents[index] && React.createElement(iconComponents[index])}
                </AvatarStyled>
                <Box>
                  <Typography variant='body1' style={{ color: theme.palette.secondary.main }} fontWeight={600}>{section.body}</Typography>
                </Box>
                <Typography variant='body1' style={{ color: section.numberColor || theme.palette.success.extraDark }}>
                {section.number}
              </Typography>
              </Stack>
            

            </Box>
            {index !== data.length - 1 && <Box mb={2}></Box>}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default NumberData;
