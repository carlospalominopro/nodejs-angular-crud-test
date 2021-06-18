export class Role {


    id : number
    name : string
    createdAt : Date
    updatedAt : Date

    constructor(
        id : number,
        name : string,
        createdAt : Date,
        updatedAt : Date,
    ){

        this.id =id
        this.name =name
        this.createdAt =createdAt
        this.updatedAt =updatedAt

    }
    
}
