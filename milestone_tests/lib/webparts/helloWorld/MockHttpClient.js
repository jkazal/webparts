var MockHttpClient = /** @class */ (function () {
    function MockHttpClient() {
    }
    MockHttpClient.get = function () {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    MockHttpClient._items = [
        {
            ElementID: '1',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla pharetra diam sit amet nisl. Senectus et netus et malesuada fames. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Vulputate ut pharetra sit amet. Sit amet consectetur adipiscing elit. Tellus in metus vulputate eu. Praesent semper feugiat nibh sed. Tortor aliquam nulla facilisi cras fermentum odio eu. Eget arcu dictum varius duis at consectetur.',
            User: 'Hubert Dupont',
            Duration: 500,
            StartDate: new Date(1135468800),
            EndDate: new Date(1167609600),
            SubjectType: 'Email',
            MainTagId: '1'
        },
        {
            ElementID: '2',
            Description: 'Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus.',
            User: 'Orson Welles',
            Duration: 500,
            StartDate: new Date(1235468800),
            EndDate: new Date(1217609600),
            SubjectType: 'Event',
            MainTagId: '14'
        },
        {
            ElementID: '3',
            Description: ' Neque egestas congue quisque egestas diam in arcu.',
            User: 'Jean dupont',
            Duration: 500,
            StartDate: new Date(1335468800),
            EndDate: new Date(1367409600),
            SubjectType: 'Event',
            MainTagId: '11'
        }
    ];
    return MockHttpClient;
}());
export default MockHttpClient;
//# sourceMappingURL=MockHttpClient.js.map