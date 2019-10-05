import { SearchOwner } from '../../models/SearchOwner';
import React, { FC } from 'react';
import { Tooltip, Avatar, makeStyles, Typography } from '@material-ui/core';
import * as Colors from '@material-ui/core/colors';

/**
 * Isearch data item owner
 */
interface ISearchDataItemOwner {
    owner: SearchOwner;
    index: number;
    onClick: () => void;
}

export /**
 * Props search data item owner
 * @param props
 * @returns
 */
const SearchDataItemOwner: FC<ISearchDataItemOwner> = (
    props: ISearchDataItemOwner
) => {
    const ColorsList = [
        Colors.brown,
        Colors.common,
        Colors.cyan,
        Colors.deepOrange,
        Colors.deepPurple,
        Colors.green,
        Colors.grey,
        Colors.indigo,
        Colors.lightBlue,
        Colors.lightGreen,
        Colors.lime,
        Colors.orange,
        Colors.pink,
        Colors.purple,
        Colors.red,
        Colors.teal,
        Colors.yellow
    ];

    const idx =
        props.index > ColorsList.length
            ? ColorsList.length % props.index
            : props.index;
    const useStyles = makeStyles({
        avatar: {
            margin: 10,
            color: '#fff',
            backgroundColor: (ColorsList[idx] as any)[500]
        }
    });
    const classes = useStyles();

    const shortName = () => {
        const tokens = props.owner.display_name.split(' ');
        let name;
        if (tokens.length > 1) {
            name = `${tokens[0][0]}${tokens[1][0]}`;
        } else if (tokens.length === 1) {
            name = `${tokens[0][0]}`;
        } else {
            name = 'UN';
        }

        return name;
    };

    return (
        <Tooltip title={props.owner.display_name}>
            <Avatar className={`${classes.avatar} owner-picture`} onClick={props.onClick}>
                <Typography variant='caption'>{shortName()}</Typography>
            </Avatar>
        </Tooltip>
    );
};
