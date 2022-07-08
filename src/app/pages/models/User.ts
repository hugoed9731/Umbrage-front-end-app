
interface comments {
    id: string;
    comment: string;
}


    export class User {
  
        constructor(
            public id: string,
            public first_name: string,
            public last_name: string,
            public email: string,
            public job_title: string,
            public avatar: string,
        ){ }
    }

    export class Person {
  
        constructor(
            public id: string,
            public first_name: string,
            public last_name: string,
            public email: string,
            public job_title: string,
            public avatar: string,
            public comments: comments
        ){ }
    }