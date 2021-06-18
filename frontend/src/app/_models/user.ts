import { Role } from "./role"

export class User {


    id : number
    username : string
    password : string
    firstName : string
    lastName : string
    job : string
    entryDate : Date
    salary : number
    roleId : number
    statusId : number
    Role : Role
    createdAt : Date
    updatedAt : Date
    
    constructor(
        id : number,
        username : string,
        password : string,
        firstName : string,
        lastName : string,
        job : string,
        entryDate : Date,
        salary : number,
        roleId : number,
        statusId : number,
        Role : Role,
        createdAt : Date,
        updatedAt : Date,
    ){

        this.id =id
        this.username =username
        this.password =password
        this.firstName =firstName
        this.lastName =lastName
        this.job =job
        this.entryDate =entryDate
        this.salary =salary
        this.roleId =roleId
        this.statusId =statusId
        this.Role =Role
        this.createdAt =createdAt
        this.updatedAt =updatedAt

    }
    
}
