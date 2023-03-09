class User {
    private _id: number;
    private _username: string;
    private _email: string;
    private _birthdate: Date;
    private _password: string;

    constructor(id:number,username: string, email: string, birthdate: Date, password: string) {
        this.id=id;
        this.username = username;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
    }
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        if (!value) {
            throw new Error('Naam mag niet leeg zijn');
        }

        this._username = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (!value) {
            throw new Error('Email mag niet leeg zijn');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Ongeldig e-mailadres');
        }

        this._email = value;
    }

    public get birthdate(): Date {
        return this._birthdate;
    }

    public set birthdate(value: Date) {
        if (!value) {
            throw new Error('geboortedatum mag niet leeg zijn');
        }

        const now = new Date();
        if (value.getTime() > now.getTime()) {
            throw new Error('geboortedatum mag niet in de toekomst liggen');
        }

        this._birthdate = value;
    }


    public set password(password: string) {
        if (!password || password.length < 8) {
            throw new Error('Wachtwoord moet minstens 8 karakters lang zijn');
        }
        this._password = password;
    }

    public get password(): string {
        return this._password;
    }
}
export { User };


