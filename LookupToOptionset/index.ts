import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { RecordSelector, IRecordSelectorProps } from "./Components/RecordSelector";

export class LookupToOptionset implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
	private currentValue: ComponentFramework.LookupValue[] | null;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        console.log(context.fluentDesignLanguage);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IRecordSelectorProps = {
            value: !context.parameters.lookup.raw || !context.parameters.lookup.raw.length ? null : context.parameters.lookup.raw[0],
            disabled: context.mode.isControlDisabled,
            utility: context.utils,
            webApi: context.webAPI,
            entityName: context.parameters.lookup.getTargetEntityType(),
            onChange: (value: ComponentFramework.LookupValue | null) => {
                this.currentValue = value ? [value] : null;
                this.notifyOutputChanged();
            },
            theme: context.fluentDesignLanguage
        };

        return React.createElement(
            RecordSelector, props
        );
    }

    public getOutputs(): IOutputs {
		return {
			lookup: this.currentValue ?? undefined
		};
    }

    public destroy(): void {
    }
}
