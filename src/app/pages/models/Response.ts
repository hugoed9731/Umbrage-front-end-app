
export interface Response {
    people: Person[];
}

interface Person {
    id:         string;
    first_name: string;
    last_name:  string;
    email:      string;
    job_title:  string;
    avatar:     string;
}
