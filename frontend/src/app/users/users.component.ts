import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.dataSource =  new MatTableDataSource();
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

}
