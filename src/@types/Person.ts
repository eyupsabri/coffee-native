export type DummyPerson = {
  Id: number;
  Name: string;
  SirName: string;
  Address: string;
  Departman: string;
  Overtime: number;
  BirthDate: string | Date,
  PlaceOfBirth: string;
  DateOfRecruitment: string | Date
}

export type SortingType = {
  LastSort: string;
  SortAsc: boolean;
}
