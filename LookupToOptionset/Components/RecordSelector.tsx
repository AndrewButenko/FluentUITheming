import * as React from 'react';
import { Spinner } from '@fluentui/react';
import { DropdownOld } from './DropdownOld';
import { DropdownNew } from './DropdownNew';

export interface IRecordSelectorProps {
  value: ComponentFramework.LookupValue | null;
  disabled: boolean;
  utility: ComponentFramework.Utility;
  webApi: ComponentFramework.WebApi;
  entityName: string;
  onChange: (value: ComponentFramework.LookupValue | null) => void;
  theme: ComponentFramework.FluentDesignState | undefined;
}

export const RecordSelector: React.FC<IRecordSelectorProps> = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  const [availableOptions, setAvailableOptions] = React.useState<ComponentFramework.LookupValue[]>([]);

  React.useEffect(() => {
    (async () => {
      const metadata = await props.utility.getEntityMetadata(props.entityName);
      const entityIdFieldName = metadata.PrimaryIdAttribute;
      const entityNameFieldName = metadata.PrimaryNameAttribute;

      const records = await props.webApi.retrieveMultipleRecords(props.entityName, `?$select=${entityIdFieldName},${entityNameFieldName}`);

      setAvailableOptions(records.entities.map(r => ({
        id: r[entityIdFieldName],
        name: r[entityNameFieldName] ?? "Display Name is not available",
        entityType: props.entityName
      })
      ));
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return (<Spinner label='Loading...' />);
  }

  if (!props.theme) {
    return (<DropdownOld
      disabled={props.disabled}
      value={props.value}
      availableOptions={availableOptions}
      onChange={props.onChange}
    />)
  }

  return (
    <DropdownNew
      theme={props.theme.tokenTheme}
      disabled={props.disabled}
      value={props.value}
      availableOptions={availableOptions}
      onChange={props.onChange}
    />);
}