import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from './group.service';
import { Group } from './group.interface';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  userId : number;
  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    this.loadGroups();
    this.userId =  parseInt(localStorage.getItem("jwt_UserId"));
  }

  loadGroups() {
    
    this.groupService.getGroups()
      .subscribe(data => {

        this.groups = data;
        debugger;
      }, fail => {
        alert("Error Occured , for more details , please check the error log  ");
      });
  }

  add() {
    this.router.navigate(["groups-form/0"]);
  }

  edit(group: Group) {
    this.router.navigate(["groups-form", group.groupId]);
  }

  ViewMembers(group:Group)
  {
    this.router.navigate(["users", group.groupId]);
  }

  join(group : Group)
  {
    if (confirm("Are you sure you want to join this group?")) {
      this.groupService.addusergroup(group.groupId).subscribe(success => {
        this.loadGroups();
      }, fail => {
        alert("Error Joining the group , please contact support");
      })
    }

  }

  memberExist(group:Group)
  {
    if(group.userGroups.find(a=>a.userId==this.userId))
    {
      return true;
    }else
    {
      return false;
    }
  }

  isAdmin(group:Group)
  {
    if(group.groupAdmin == this.userId)
    {
      return true;
    }else
    {
      return false;
    }

  }

  delete(group: Group) {
    if (confirm("Are you sure you want to delete this group?")) {
      this.groupService.deleteGroup(group.groupId).subscribe(success => {
        this.loadGroups();
      }, fail => {
        alert("Error Deleting the group");
      })
    }
  }
}
