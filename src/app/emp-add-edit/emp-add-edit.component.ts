import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  alarmForm: FormGroup;
  escalation_levels: number[] = [0, 1, 2, 3];
  statuses = ['Active', 'Resolved', 'Attention Required'];
  alarmAlertLinks = [{ uuid: 'alertAlertLink1', name: 'Alert Alert Link 1' }];
  alarmProfiles = [{ uuid: 'alarmProfile1', name: 'Alarm Profile 1' }];
  approvals = [{ uuid: 'approval', name: 'MR. FIRST LAST' }];
  facilities = [{ uuid: 'facility1', name: 'Facility1' }];
  sites = [{ uuid: 'TWSC', name: 'TWSC' }, { uuid: 'HYD', name: 'HYD' }];
  zones = [{ uuid: 'TWNOH', name: 'TWNOH' }, { uuid: 'INDY', name: 'INDY' }];
  activeLists = [
    { "name": "Working", value: "true", "checked": true },
    { "name": "Inactive", value: "false", "checked": false }
  ]
  constructor(
    private _fb: FormBuilder,
    private _alarmService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.alarmForm = this._fb.group({
      escalation_level: '',
      status: '',
      zone_name: '',
      site_uuid: '',
      zone_uuid: '',
      alarm_alert_uuid: '',
      alarm_profile_uuid: '',
      comment: '',
      approval_uuid: '',
      facility_uuid: '',
      active: ''
    });
  }

  ngOnInit(): void {
    if("active" in this.data){
      this.activeLists.forEach((data) => {
        if(String(this.data.active) === data.value) data.checked = true;
        else data.checked = false;
      })
    }
    this.alarmForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.alarmForm.valid) {
      const data = this.alarmForm.value;
      Object.entries(data).forEach(([key, value]) => {
        if (!value) delete data[key]
      })
      if (this.data) {
        this._alarmService
          .updateAlarm(this.data.uuid, this.alarmForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._alarmService.addAlarm(this.alarmForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Alarm successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
