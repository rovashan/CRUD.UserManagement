import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user.interface';
import { UserService } from './user.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  originalUsers: User[];
  editRowId: number = 0;
  currentId: number=0;

  loggedUserId:number;

  constructor(private router: Router, private userService: UserService , private groupService : GroupService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loggedUserId =  parseInt(localStorage.getItem("jwt_UserId"));
    this.currentId = this.activatedRoute.snapshot.params['groupId'];
    this.userService.getUserByGroupId(this.currentId)
      .subscribe(data => {
        this.users = data;
        this.originalUsers = JSON.parse(JSON.stringify(this.users));
      }, fail => {
        alert("Error Occured , for more details , please check the error log  ");
      });
  }

  deleteUser(user: User): void {
      if (confirm("Are you sure you want to kick this user ?")) {
          this.groupService.deleteUserGroup(user.userId ,this.currentId)
            .subscribe(result => {
              this.router.navigate(["groups"]);
            }, fail => {
              alert("Error Occured , for more details , please check the error log  ");
            });
        
      }
    
  };

  edit(id: number) {
    if (this.editRowId > 0) {
      alert("Please save or discard your changes first before edit another record.");
    }
    else {
      this.editRowId = id;
    }
  }

  save(user: User): void {
    if (user.userId > 0) {
      this.userService.updateUser(user).subscribe((result) => {

        let userObj = this.users.find(u => u.userId == user.userId);
        let index = this.users.indexOf(userObj);
        this.users[index] = result;
        this.originalUsers = JSON.parse(JSON.stringify(this.users));
        this.editRowId = 0;
      }, fail => {
        alert("Error Occured , for more details , please check the error log  ");
      })
    }
    else {
      this.userService.createUser(user).subscribe((result) => {
        let userObj = this.users.find(u => u.userId == user.userId);
        let index = this.users.indexOf(userObj);
        this.users[index] = result;
        this.originalUsers = JSON.parse(JSON.stringify(this.users));
        this.editRowId = 0;
      }, fail => {
        alert("Error Occured , for more details , please check the error log  ");
      });
    }
  };

  add() {

    if (this.editRowId > 0) {
      alert("Please save or discard your changes first before add a new record.");
    }
    else {
      let user: User = {
        userId: 0,
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        userGroups: [],
      };
      this.users.push(user);
    }
  };
}
