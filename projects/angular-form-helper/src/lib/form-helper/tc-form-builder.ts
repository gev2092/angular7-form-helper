import {
    FormArray,
    FormBuilder,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { IConfig } from './config';
import { TcFormGroup } from './tc-form-group';

export class TcFormBuilder extends FormBuilder {
    /**
     * @params controlsConfig
     * @params extra
     * @returns TcFormGroup
     */
    group(controlsConfig: { [key: string]: any }, extra: { [key: string]: any } | null = null): TcFormGroup {
        const baseGroup = super.group(controlsConfig);
        return  new TcFormGroup(baseGroup.controls, baseGroup.validator, baseGroup.asyncValidator);
    }

    /**
     * @params controlsConfig
     * @returns FormArray
     */
    arrayCustom(controlsConfig: Array<IConfig> | Array<Array<IConfig>>): FormArray {
        const formGroupData = [];
        if (!controlsConfig) {
            throw new Error('no data supplied');
        }
        let i = 0;
        for (const item  of controlsConfig) {
            if (typeof formGroupData[i] === 'undefined') {
                formGroupData[i] = {};
            }
            if (Array.isArray(item)) {
                for (const innerItem of item) {
                    if (typeof formGroupData[i] === 'undefined') {
                        formGroupData[i] = {};
                    }
                    formGroupData[i][innerItem.name] = [
                        innerItem.initialValue,
                        this._validationRules(innerItem.rules)
                    ];
                }
                i++;
            } else {
                formGroupData[i][item.name] = [
                    item.initialValue,
                    this._validationRules(item.rules)
                ];
            }
        }
        return this.array(formGroupData.map((item) => {
            return this.group(item);
        }));
    }

    /**
     * @params list
     * @returns TcFormGroup
     */
    groupCustom(list: Array<IConfig>): TcFormGroup {
        const formBuilderGroup = {};
        if (!list) {
            throw new Error('no data supplied');
        }
        for (const item of list) {
            formBuilderGroup[item.name] = [
                item.initialValue,
                this._validationRules(item.rules)
            ];
        }
        return this.group(formBuilderGroup);
    }

    /**
     * @params rules
     * @returns ValidatorFn | null
     */
    private _validationRules(rules = null): ValidatorFn | null {
        return Validators.compose(rules);
    }
}
