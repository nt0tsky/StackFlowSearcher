import React from "react";
import { Avatar } from "@material-ui/core";

/**
 * Idetails avatar
 */
interface IDetailsAvatar {
    avatarUrl?: string;
    alt?: string;
    classes?: string;
}

/**
 * Details avatar
 */
export class DetailsAvatar extends React.PureComponent<IDetailsAvatar>
{
    /**
     * Renders details avatar
     */
    render() {
        return(
            <Avatar alt={this.props.alt} src={this.props.avatarUrl} className={this.props.classes}/>
        )
    }
}