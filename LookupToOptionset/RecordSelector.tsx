import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyleProps, IDropdownStyles, Spinner } from '@fluentui/react';

export interface IRecordSelectorProps {
  value: ComponentFramework.LookupValue | undefined;
  disabled: boolean;
  utility: ComponentFramework.Utility;
  webApi: ComponentFramework.WebApi;
  entityName: string;
  onChange: (value: ComponentFramework.LookupValue | undefined) => void;
}

export const RecordSelector: React.FC<IRecordSelectorProps> = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  const [availableOptions, setAvailableOptions] = React.useState<IDropdownOption[]>([]);
  const [placeholder, setPlaceholder] = React.useState<string>("---");

  React.useEffect(() => {
    (async () => {
      const metadata = await props.utility.getEntityMetadata(props.entityName);
      const entityIdFieldName = metadata.PrimaryIdAttribute;
      const entityNameFieldName = metadata.PrimaryNameAttribute;

      const records = await props.webApi.retrieveMultipleRecords(props.entityName, `?$select=${entityIdFieldName},${entityNameFieldName}`);

      const options: IDropdownOption[] = [{
        key: "",
        text: placeholder
      }];

      options.push(...records.entities.map(r => ({
        key: r[entityIdFieldName],
        text: r[entityNameFieldName] ?? "Display Name is not available"
      })
      ));

      setAvailableOptions(options);
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return (<Spinner label='Loading...' />);
  }

  return (
    <Dropdown
      disabled={props.disabled}
      placeholder={placeholder}
      selectedKey={props.value?.id ?? ""}
      options={availableOptions}
      onChange={(e: any, option?: IDropdownOption) => {
        if (!option || option.key === "") {
          props.onChange(undefined);
          return;
        }

        props.onChange({
          id: option.key as string,
          entityType: props.entityName,
          name: option.text
        });
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