import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertHelper } from '../_helpers/alert';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'roleId', 'statusId', 'entryDate', 'action'];
  dataSource: MatTableDataSource<User>;

  loading: boolean = false;

  constructor(
    public userService: UserService,
    public alertHelper: AlertHelper,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getListUsers()
  }

  getListUsers() {

    this.loading = true;
    this.dataSource.data = [];

    this.userService.list({}).subscribe(
      (res: any) => {

        if (res.users?.length) {
          this.dataSource.data = res.users;
        }
      },
      (err: any) => {
        this.alertHelper.alert(err?.error?.message)
      },
    )

  }

  openDialog(data: Object = new Object()) {

    const user = { ...data }

    var dialogRef = this.dialog.open(UserModal, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.submit) {
        this.getListUsers()
      }

    });

  }

  delete(user: User) {

    let dataObject = {
      message: `¿Está segur@ de eliminar usuario?`,
      user: user
    }

    this.dialog
      .open(DeleteUserComponent, {
        data: dataObject
      })
      .afterClosed()
      .subscribe((result: Boolean) => {

        if (result) {
          this.userService.delete(user).subscribe(
            (res: any) => {
              this.dialog.closeAll();
              this.alertHelper.alert(res?.message)
              this.getListUsers()
            },
            (errors: any) => {
              this.alertHelper.alert(errors?.error?.message)
            });
        }
      });
  }

  changeStatus(user : User){
    
    const data = {
      statusId : user.statusId ? 1 : 0,
      id : user.id,
    }

    this.userService.changeStatus(data).subscribe(
      (res: any) => {
        this.alertHelper.alert(res?.message)
        this.getListUsers()
      },
      (err: any) => {
        this.alertHelper.alert(err?.error?.message)
      },
    )
    
    
  }


}

//MODAL USUARIO

@Component({
  templateUrl: 'users-modal.html',
})

export class UserModal {


  public formUser: FormGroup;

  public loading = false
  public submitted = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<UserModal>,
    private _formBuilder: FormBuilder,
    public alertHelper: AlertHelper,
    public userService: UserService,
  ) {

    this.formUser = this._formBuilder.group({

      username: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      job: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],

    })


    if (this.user.id) {
      this.user.password = '******'
    }

  }


  loginSubmit(formData: any) {


    if (this.formUser.invalid) {
      this.alertHelper.alert('Por favor ingrese todos los campos requeridos')
      return
    }

    this.loading = true
    this.submitted = true

    let http = null;

    console.log(this.user.id);
    

    if (this.user.id) {
      formData.id = this.user.id
      http = this.userService.update(formData);
    } else {
      http = this.userService.create(formData);
    }


    http.subscribe(
      async (res: any) => {

        this.loading = false
        this.submitted = false
        this.close(true)
        this.alertHelper.alert(res?.message)

      },
      (errors: any) => {

        this.loading = false
        this.submitted = false
        this.alertHelper.alert(errors?.error?.message)

      });
  }

  close(submit: boolean = false) {
    this.dialogRef.close({ submit: submit, data: this.user })
  }

}

//ELIMINAR USUARIO

@Component({
  templateUrl: './users-delete-modal.html',
})

export class DeleteUserComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeDialog(type: boolean = false): void {
    this.dialog.close(type);
  }



}

