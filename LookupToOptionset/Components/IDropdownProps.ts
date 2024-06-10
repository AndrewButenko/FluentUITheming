import { Theme } from "@fluentui/react-components";

export interface IDropdownProps {
    value: ComponentFramework.LookupValue | null;
    disabled: boolean;
    availableOptions: ComponentFramework.LookupValue[];
    onChange: (value: ComponentFramework.LookupValue | null) => void;
    theme?: Theme;
}