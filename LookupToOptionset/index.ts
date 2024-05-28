import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { RecordSelector, IRecordSelectorProps } from "./RecordSelector";

export class LookupToOptionset implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
	private currentValue?: ComponentFramework.LookupValue[];

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IRecordSelectorProps = {
            value: context.parameters.lookup.raw == null || context.parameters.lookup.raw.length === 0 ? undefined : context.parameters.lookup.raw[0],
            disabled: context.mode.isControlDisabled,
            utility: context.utils,
            webApi: context.webAPI,
            entityName: context.parameters.lookup.getTargetEntityType(),
            onChange: (value: ComponentFramework.LookupValue | undefined) => {
                this.currentValue = value ? [value] : undefined;
                this.notifyOutputChanged();
            }
        };

        return React.createElement(
            RecordSelector, props
        );
    }

    public getOutputs(): IOutputs {
		return {
			lookup: this.currentValue
		};
    }

    public destroy(): void {
    }
}
