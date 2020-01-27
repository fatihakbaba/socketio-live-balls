app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
    //const socket = io.connect('http://localhost:3000');

    $scope.messages = [];
    $scope.players = {};

    $scope.init = () => {
        const username = prompt('Please enter username');

        if (username)
            initSocket(username);
        else
            return false;
    };

    function initSocket(username) {
        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        };

        indexFactory.connectSocket('http://localhost:3000', connectionOptions)
            .then((socket) => {
                //console.log('Connected', socket);
                socket.emit('newUser', { username });

                socket.on('initPlayers', (players) => {
                    $scope.players = players;
                    $scope.$apply();
                    console.log($scope.players);
                });

                socket.on('newUser', (data) => {
                    console.log(data);
                    const messageData = {
                        type: {
                            code: 0, //server or user message
                            message: 1 //login or disconnect message
                        }, //info
                        username: data.username
                    };

                    $scope.messages.push(messageData);
                    $scope.$apply();
                });

                socket.on('disUser', (data) => {
                    const messageData = {
                        type: {
                            code: 0,
                            message: 0
                        }, //info
                        username: data.username
                    };

                    $scope.messages.push(messageData);
                    $scope.$apply();
                    console.log(users);
                });

                let animate = false;
                $scope.onClickPlayer = ($event) => {
                    console.log($event.offsetX, $event.offsetY);
                    if (!animate) {
                        animate = true;
                        $(`#${socket.id}`).animate({ 'left': $event.offsetX, 'top': $event.offsetY }, () => {
                            animate = false;
                        });

                    }
                };

            }).catch((err) => {
                console.log(err);
            });
    }
}]);