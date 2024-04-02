import React, { useState } from 'react';
import Link, { LinkProps } from '@mui/material/Link';
import { useTheme } from '@mui/material';

interface MyLinkProps extends LinkProps {
    // Дополнительные свойства, если необходимо
}

const MyLink: React.FC<MyLinkProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const theme = useTheme();
    const PrimaryMainColor = theme.palette.primary.main;

    return (
        <Link
            {...props}
            color={theme.palette.primary.main}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            underline="none"
            sx={{
                cursor: 'pointer',
                color: PrimaryMainColor,
                transition: 'color 1s ease'
            }}
        />
    );
};

export default MyLink;
