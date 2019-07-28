import {
    FormArray,
    FormGroup,
} from '@angular/forms';

export class TcFormGroup extends FormGroup {
    /**
     * @params listName
     * @params list
     * @returns void
     */
    addItem(listName: string, list: TcFormGroup): void {
        const items = this.get(listName) as FormArray;
        items.push(list);
    }

    /**
     * @params listName
     * @params index
     * @returns void
     */
    removeItem(listName: string, index: number): void {
        const items = this.get(listName) as FormArray;
        items.removeAt(index);
    }
}