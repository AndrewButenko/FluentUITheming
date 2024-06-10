import * as React from "react";
import { IDropdownProps } from "./IDropdownProps";
import { Dropdown, FluentProvider, IdPrefixProvider, makeStyles, Option } from "@fluentui/react-components";

export const DropdownNew: React.FC<IDropdownProps> = (props) => {
    const selectString = "--Select--";
    const [placeholder, setPlaceholder] = React.useState<string>("---");
    const [dropdownIconVisible, setDropdownIconVisible] = React.useState<boolean>(false);

    const _useStyles = makeStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            width: "100%"
        },
        dropdown: {
            width: "100%",
            backgroundColor: props.theme?.colorNeutralBackground3,
            borderTopColor: props.theme?.colorTransparentStrokeInteractive,
            borderRightColor: props.theme?.colorTransparentStrokeInteractive,
            borderLeftColor: props.theme?.colorTransparentStrokeInteractive,
            borderBottomColor: props.theme?.colorTransparentStrokeInteractive,
            cursor: props.disabled ? "text" : "pointer",
            ":hover": {
                borderTopColor: props.theme?.colorTransparentStrokeInteractive,
                borderRightColor: props.theme?.colorTransparentStrokeInteractive,
                borderLeftColor: props.theme?.colorTransparentStrokeInteractive,
                borderBottomColor: props.theme?.colorTransparentStrokeInteractive,
            },
            ":active": {
                borderTopColor: props.theme?.colorTransparentStrokeInteractive,
                borderRightColor: props.theme?.colorTransparentStrokeInteractive,
                borderLeftColor: props.theme?.colorTransparentStrokeInteractive,
                borderBottomColor: props.theme?.colorTransparentStrokeInteractive,
            },
            "> button": {
                color: props.value ? props.theme?.colorNeutralForeground1 : props.theme?.colorNeutralForeground4,
                cursor: props.disabled ? "text" : "pointer"
            }
        }
    });

    const styles = _useStyles();

    return (
        <div className={styles.root}>
            <IdPrefixProvider value={"newDropdownControl"}>
                <FluentProvider theme={props.theme}>
                    <Dropdown
                        className={styles.dropdown}
                        disabled={props.disabled}
                        placeholder={placeholder}
                        value={props.value?.name ?? placeholder}
                        selectedOptions={props.value ? [ props.value.id ] : [ "" ]}
                        onMouseEnter={() => {
                            setPlaceholder(selectString);
                            setDropdownIconVisible(true);
                        }}
                        onMouseLeave={() => {
                            setPlaceholder("---");
                            setDropdownIconVisible(false);
                        }}
                        onBlur={() => {
                            setPlaceholder("---");
                            setDropdownIconVisible(false);
                        }}
                        expandIcon={dropdownIconVisible ? undefined : null}
                        onOptionSelect={(e, option) => {
                            if (!option?.optionValue) {
                                props.onChange(null);
                                return;
                            }

                            props.onChange(props.availableOptions.find(o => o.id === option.optionValue)!);
                        }}
                    >
                        <Option key="" value="">
                            {selectString}
                        </Option>
                        {props.availableOptions.map(option => (
                            <Option
                                key={option.id}
                                value={option.id as string}
                            >
                                {option.name!}
                            </Option>
                        ))}
                    </Dropdown>
                </FluentProvider>
            </IdPrefixProvider>
        </div>);
}