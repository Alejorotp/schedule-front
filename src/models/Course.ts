interface Prototype<Curso>{
    clone() : Curso;
}

export class Course implements Prototype<Course> {
  nrc: number;
  title: string;
  desc: string;
  cred: number;
  sch: string[];

  constructor(
    nrc: number,
    title: string,
    desc: string,
    cred: number,
    sch: string[],
  ) {
    this.nrc = nrc;
    this.title = title;
    this.desc = desc;
    this.cred = cred;
    this.sch = sch;
  }

  getDetails(): string {
    return `${this.title} - ${this.nrc}\n${this.desc}\nCréditos: ${this.cred}`;
  }

  static fromJSON(json: any): Course {
    return new Course(json.nrc, json.title, json.desc, json.cred, json.sch || []);
  }

  toJSON(): any {
    return {
      nrc: this.nrc,
      title: this.title,
      desc: this.desc,
      cred: this.cred,
      sch: this.sch,
    };}

    clone(): Course {
      return new Course(this.nrc, this.title, this.desc, this.cred, this.sch.slice()); 
  }
}
