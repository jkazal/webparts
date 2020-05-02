declare interface IHelloWorldWebPartStrings {
  MultiLineTextField: string;
  TestToggle: any;
  TestDropdown: string;
  TestCheckbox: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
    Tasks: string;
    Emails: string;
    Events: string;
    On: string;
    Off: string;
}

declare module 'HelloWorldWebPartStrings' {
  const strings: IHelloWorldWebPartStrings;
  export = strings;
}
