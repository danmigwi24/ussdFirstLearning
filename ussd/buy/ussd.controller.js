const UssdMenu = require('ussd-menu-builder');
const menu = new UssdMenu();

const {buyAirtime, fetchBalance} = require('./ussd.service');

module.exports = {
    ussd: async (req, res) => {
        let args = {
            phoneNumber,
            sessionId,
            serviceCode,
            text
        } = req.body;


        // Define menu states
        menu.startState({
            run: () => { // use menu.con() to send response without terminating session
                menu.con('Welcome. Choose option:' + '\n1. Show Balance' + '\n2. Buy Airtime' + '\n3. My number');
            },
            // next object links to next state based on user input
            next: {
                '1': 'showBalance',
                '2': 'buyAirtime',
                '3': 'myNumber'
            },
            defaultNext: 'invalidOption'
        });

        menu.state('showBalance', {
            run: async () => { // fetch balance
                fetchBalance(menu.args.phoneNumber).then(function (bal) { // use menu.end() to send response and terminate session
                    menu.end('Your balance is KES ' + bal);
                });
            }
        });

        menu.state('buyAirtime', {
            run: () => {
                menu.con('Enter amount');
            },
            next: {
                '*\\d+': 'buyAirtime.amount'
            }
        });

        // nesting states
        menu.state('buyAirtime.amount', {
            run: async () => { // use menu.val to access user input value
                var amount = Number(menu.val);
                buyAirtime(menu.args.phoneNumber, amount).then(function (res) {
                    menu.end(`Airtime bought ${res}.`);
                });
            }
        });

        menu.state('myNumber', {
            run: function () {
                menu.end(`Your phone number is ${phoneNumber}`);
            }
        });
        let resMsg = await menu.run(args);
        res.send(resMsg);
    }
}
