import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyleProps, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { Spinner } from '@fluentui/react/lib/Spinner';

export interface IRecordSelectorProps {
    selectedRecordId: string | undefined;
    onChange: (selectedRecordId: string | undefined, selectedRecordName: string | undefined) => void;
    disabled: boolean;
    entityName: string;
    utils: ComponentFramework.Utility;
    webApi: ComponentFramework.WebApi;
}

export const RecordSelector: React.FunctionComponent<IRecordSelectorProps> = props => {
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [availableOptions, setAvailableOptions] = React.useState<IDropdownOption[]>([]);

    React.useEffect(() => {
        (async () => {
            const metadata = await props.utils.getEntityMetadata(props.entityName);
            const entityIdFieldName = metadata.PrimaryIdAttribute;
            const entityNameFieldName = metadata.PrimaryNameAttribute;

            const query = `?$select=${entityIdFieldName},${entityNameFieldName}`;

            const records = await props.webApi.retrieveMultipleRecords(props.entityName, query);

            setAvailableOptions(records.entities.map(e => ({
                key: e[entityIdFieldName],
                text: e[entityNameFieldName] ?? "Display Name is not available"
            })));

            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return (
            <div>
                <Label>Loading, please wait...</Label>
                <Spinner label="Loading, please wait..." ariaLive="assertive" labelPosition="left" />
            </div>);
    }

    return (
        <Dropdown
            selectedKey={props.selectedRecordId}
            options={availableOptions}
            onChange={(e: any, option?: IDropdownOption) => {
                props.onChange(option?.key as string, option?.text);
            }}
            disabled={props.disabled}
            styles={dropdownStyle}
        />);
}

export const dropdownStyle = (props: IDropdownStyleProps): Partial<IDropdownStyles> => ({
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