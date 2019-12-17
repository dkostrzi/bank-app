export default class User {
    public id: number | undefined;
    public createdAt!: string;
    public date_registration!: string;
    public email!: string;
    public last_failed_logged!: string;
    public last_present_logged!: string;
    public last_successful_logged!: string;
    public login!: number;
    public name!: string;
    public password!: string;
    public surname!: string;
    public updatedAt!: string;

    constructor(id?: number){
        this.id = id;
    }
}