const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
const {createUser} = require('./user.service');
const {userModel} = require("./model/user.model");


module.exports = {

    createUser: async (req, res) => {
        try {
            let args = {
                phoneNumber: req.body.phoneNumber,
                sessionId: req.body.sessionId,
                serviceCode: req.body.serviceCode,
                text: req.body.text
            };
            console.log(args);
            menu.startState({
                run: () => { // use menu.con() to send response without terminating session
                    menu.con('Welcome. Choose option:' + '\n1. Login' + '\n2. Register');
                },
                // next object links to next state based on user input
                next: {
                    '1': 'login',
                    '2': 'register'
                },
                defaultNext: 'invalidOption'
            });

            menu.state('login', {
                run: () => {
                    menu.end(`We will be back on you`)
                }
            });
            menu.state('register', {
                run: () => {
                    menu.con('Enter name')
                },
                next: {
                    '*\\w+': 'register.name'
                }
            });
            menu.state('register.name', {
                run: () => {
                    try {
                        // let firstName = menu.val;
                        // menu.session.set('firstName', firstName).then(() => {
                        menu.con('Enter phone number');
                        // });
                    } catch (error) {
                        console.log(error);
                    }

                },
                next: {
                    '*\\w+': 'register.validate'
                }
            });
            menu.state('register.validate', {
                run: () => {
                    menu.con('Are you sure you want to register:' + '\n1. Confirm' + '\n2. Cancel');
                },
                next: {
                    '*1': 'confirm',
                    '*2': 'cancel'
                }
            });

            menu.state('confirm', {
                run: () => {
                    let array = req.body.text.split("*");
                    let user = new userModel();

                    user.setName(array[1]);
                    user.setPhoneNumber(array[2]);

                    console.log(user)
                    // Adding user to DB
                    //menu.end();
                    createUser(user).then(function (response) {
                        menu.end(`User ${
                            user.getName()
                        } registered successfully \n${user.getPhoneNumber()}`);
                        console.log(`##${response.body}##`)
                    });
                }
            });
            menu.state('cancel', {
                run: async () => {
                    menu.end(`You have canceled registration`);
                }
            });

            let resMsg = await menu.run(args);
            res.send(resMsg);

        } catch (error) {
            res.send(error);
        }
    }


}
