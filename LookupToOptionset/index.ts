import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { RecordSelector, IRecordSelectorProps } from "./Components/RecordSelector";
import * as React from "react";

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
            selectedRecordId: context.parameters.lookup.raw != null && context.parameters.lookup.raw.length > 0 ?
                context.parameters.lookup.raw[0].id : undefined,
            onChange: (selectedRecordId: string | undefined, selectedRecordName: string | undefined) => {
                if (!selectedRecordId) {
                    this.currentValue = undefined;
                } else {
                    this.currentValue = [{
                        id: selectedRecordId,
                        name: selectedRecordName,
                        entityType: context.parameters.lookup.getTargetEntityType()
                    }];
                }

                this.notifyOutputChanged();
            },
            disabled: context.mode.isControlDisabled,
            entityName: context.parameters.lookup.getTargetEntityType(),
            utils: context.utils,
            webApi: context.webAPI
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
