import * as React from "react";
import { Dropdown, IDropdownOption, IDropdownStyleProps, IDropdownStyles } from "@fluentui/react";
import { IDropdownProps } from "./IDropdownProps";

export const DropdownOld: React.FC<IDropdownProps> = (props) => {
    const [placeholder, setPlaceholder] = React.useState<string>("---");

    const availableOptions = [{
        key: "",
        text: placeholder
    }, ...props.availableOptions.map(o => ({
        key: o.id,
        text: o.name!
    }))];

    return (
        <Dropdown
            disabled={props.disabled}
            placeholder={placeholder}
            selectedKey={props.value?.id ?? ""}
            options={availableOptions}
            onChange={(e: any, option?: IDropdownOption) => {
                if (!option || option.key === "") {
                    props.onChange(null);
                    return;
                }

                props.onChange(props.availableOptions.find(o => o.id === (option.key as string))!);
            }}
            onMouseEnter={() => {
                !props.disabled && setPlaceholder("--Select--");
            }}
            onMouseLeave={() => {
                setPlaceholder("---");
            }}
            styles={DropdownStyle}
        />);
}

export const DropdownStyle = (props: IDropdownStyleProps): Partial<IDropdownStyles> => ({
    ...(props.disabled ? {
        root: {
            width: "100%"
        },
        title: {
            color: "rgb(50, 49, 48)",
            borderColor: "transparent",
            backgroundColor: "transparent",
            fontWeight: 600,
            ":hover": {
                backgroundColor: "rgb(226, 226, 226)"
            }
        },
        caretDown: {
            color: "transparent"
        }
    } : {
        root: {
            width: "100%"
        },
        title: {
            borderColor: "transparent",
            fontWeight: 600,
            ":hover": {
                borderColor: "rgb(96, 94, 92)",
                fontWeight: 400
            }
        },
        caretDown: {
            color: "transparent",
            ":hover": {
                color: "rgb(96, 94, 92)"
            }
        },
        dropdown: {
            ":focus:after": {
                borderColor: "transparent"
            }
        }
    })
});