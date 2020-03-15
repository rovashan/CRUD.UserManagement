export interface Group {
  groupId : number;
  groupName : string ;
  groupAdmin : number;
  groupAdminName? : string;
  userGroups? : UserGroups[];
}

export interface UserGroups {
  userId : number;
  groupId : number;
}

