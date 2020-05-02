import { Version } from '@microsoft/sp-core-library';
import MockHttpClient from './MockHttpClient';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http'

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import { IPointage } from './IPointage';
import { IPointages } from './IPointages';


export interface IHelloWorldWebPartProps {
  description: string;
  test: string,
    checkbox: boolean,
  dropdown: string,
  toggle: boolean
}
export default class HelloWorldWebPart extends BaseClientSideWebPart <IHelloWorldWebPartProps> {

  private _getListData(): Promise<IPointages> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getMockListData(): Promise<IPointages> {
    return MockHttpClient.get()
    .then((data: IPointage[]) => {
      var _getMockListData : IPointages = { value: data };
      return _getMockListData;
    }) as Promise<IPointages>;
  }

  private _renderList(items: IPointage[]): void {
    let html: string = '';
    items.forEach((item: IPointage) => {
      html += `
    <ul class="${styles.list}">
      <li class="${styles.listItem}">
        <span class="ms-font-l">${item.User}</span>
      </li>
    </ul>`;
    });
  
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }

  public render(): void {
    console.log(this.context.pageContext.site.id);
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
  <p>Dropdown s�lectionn�: ${ this.properties.dropdown } </p>
  <p>Checkbox coch�e? ${this.properties.checkbox ? 'BLABLA TRUE' : 'BLA FALSE'}</p> 
    <p class="${ styles.description }">${escape(this.properties.description)}</p>
    <p class="${ styles.description }">titrre page: ${escape(this.context.pageContext.web.title)}</p>

      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          <div id="spListContainer" />
          </div>
          </div>`;

          this._renderListAsync();
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              }),
              PropertyPaneTextField('test', {
                label: strings.MultiLineTextField,
                multiline: true
              }),
              PropertyPaneCheckbox('checkbox', {
                    text: strings.TestCheckbox
              }),
              PropertyPaneDropdown('dropdown', {
                  label: strings.TestDropdown,
                  options: [
                    { key: '1', text: strings.Emails },
                    { key: '2', text: strings.Tasks },
                    { key: '3', text: strings.Events }
                  ]
              }),
              PropertyPaneToggle('toggle', {
                label: strings.TestToggle,
                onText: strings.On,
                offText: strings.Off
            })
            ]
          }
        ]
      }
    ]
  };
}
}
