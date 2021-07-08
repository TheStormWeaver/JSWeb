enum UserRole {
  Admin,
  Client,
}

interface IUserNewData {
  newName: string;
  newAge: number;
}

class Person {
  constructor(
    public name: string,
    public age: number,
    public role: UserRole
  ) {}

  setData(newData: IUserNewData) {
    this.name = newData.newName;
    this.age = newData.newAge;
  }

  getAge(): number {
    return this.age;
  }
}

const ivan = new Person("Ivan", 30, UserRole.Admin);

const newData: IUserNewData = { newName: "Peter", newAge: 20 };
ivan.setData(newData);

function idnentity<T>(arg: T): T {
  return arg
}

const test = UserRole.Client

if (test == ivan.role) {
  console.log(ivan)
}
