export interface Person {
    person: User[];
}

export interface User {
    id:         string;
    first_name: string;
    last_name:  string;
    email:      string;
    job_title:  string;
    avatar:     string;
    comments:   Comment[];
}

export interface Comment {
    id:      string;
    comment: string;
}
