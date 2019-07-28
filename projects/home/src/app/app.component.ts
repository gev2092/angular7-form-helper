import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  listArray;
  list;

  constructor(public fb: FormBuilder) {
    this.listArray = [
      [
        { name: 'name', initialValue: null, rules: [Validators.required] },
        { name: 'value', initialValue: null, rules: null }
      ],
      [
        { name: 'name', initialValue: null, rules: [Validators.required] },
        { name: 'value', initialValue: null, rules: null },
      ],
    ];
    this.list = [
      { name: 'name', initialValue: null, rules: [Validators.required] },
      { name: 'value', initialValue: null, rules: [] },
    ];
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      additional: this.fb.arrayCustom(this.listArray),
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
