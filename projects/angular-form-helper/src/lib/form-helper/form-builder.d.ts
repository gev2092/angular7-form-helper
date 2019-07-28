import {
    FormArray,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import {TcFormGroup} from './tc-form-group';
import {IConfig} from './config';

declare module '@angular/forms/src/form_builder' {
    interface FormBuilder {
        arrayCustom(controlsConfig: Array<IConfig> | Array<Array<IConfig>>): FormArray;

        groupCustom(controlsConfig: Array<IConfig>): TcFormGroup;
    }
}

declare module '@angular/forms/src/model' {
    interface FormGroup {
        addItem(listName: string, list: TcFormGroup): void;

        removeItem(listName: string, index: number): void;
    }
}
