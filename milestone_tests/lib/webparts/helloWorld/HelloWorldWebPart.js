var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import MockHttpClient from './MockHttpClient';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { PropertyPaneTextField, PropertyPaneCheckbox, PropertyPaneDropdown, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
var HelloWorldWebPart = /** @class */ (function (_super) {
    __extends(HelloWorldWebPart, _super);
    function HelloWorldWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelloWorldWebPart.prototype._getListData = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists?$filter=Hidden eq false", SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    HelloWorldWebPart.prototype._getMockListData = function () {
        return MockHttpClient.get()
            .then(function (data) {
            var _getMockListData = { value: data };
            return _getMockListData;
        });
    };
    HelloWorldWebPart.prototype._renderList = function (items) {
        var html = '';
        items.forEach(function (item) {
            html += "\n    <ul class=\"" + styles.list + "\">\n      <li class=\"" + styles.listItem + "\">\n        <span class=\"ms-font-l\">" + item.User + "</span>\n      </li>\n    </ul>";
        });
        var listContainer = this.domElement.querySelector('#spListContainer');
        listContainer.innerHTML = html;
    };
    HelloWorldWebPart.prototype._renderListAsync = function () {
        var _this = this;
        // Local environment
        if (Environment.type === EnvironmentType.Local) {
            this._getMockListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
        else if (Environment.type == EnvironmentType.SharePoint ||
            Environment.type == EnvironmentType.ClassicSharePoint) {
            this._getListData()
                .then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    HelloWorldWebPart.prototype.render = function () {
        console.log(this.context.pageContext.site.id);
        this.domElement.innerHTML = "\n      <div class=\"" + styles.helloWorld + "\">\n    <div class=\"" + styles.container + "\">\n      <div class=\"" + styles.row + "\">\n        <div class=\"" + styles.column + "\">\n          <span class=\"" + styles.title + "\">Welcome to SharePoint!</span>\n  <p class=\"" + styles.subTitle + "\">Customize SharePoint experiences using Web Parts.</p>\n  <p>Dropdown s\uFFFDlectionn\uFFFD: " + this.properties.dropdown + " </p>\n  <p>Checkbox coch\uFFFDe? " + (this.properties.checkbox ? 'BLABLA TRUE' : 'BLA FALSE') + "</p> \n    <p class=\"" + styles.description + "\">" + escape(this.properties.description) + "</p>\n    <p class=\"" + styles.description + "\">titrre page: " + escape(this.context.pageContext.web.title) + "</p>\n\n      <a href=\"https://aka.ms/spfx\" class=\"" + styles.button + "\">\n        <span class=\"" + styles.label + "\">Learn more</span>\n          </a>\n          </div>\n          </div>\n          <div id=\"spListContainer\" />\n          </div>\n          </div>";
        this._renderListAsync();
    };
    Object.defineProperty(HelloWorldWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return HelloWorldWebPart;
}(BaseClientSideWebPart));
export default HelloWorldWebPart;
//# sourceMappingURL=HelloWorldWebPart.js.map