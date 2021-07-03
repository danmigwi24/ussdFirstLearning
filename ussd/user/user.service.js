const pool = require('../../config/database.config');

module.exports = {
    createUser: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            pool.query(`insert into users(user_name,user_phone) value(?,?)`, [
                data.userName,
                data.userPhone
            ], (errors, results, field) => {
                if (errors) {
                    reject(errors)
                } else {
                    resolve(results)
                }
            })
        })
    },
    // getUser: () => {
    //     return new Promise((resolve, reject) => {
    //         pool.query(`SELECT * FROM users`, [], (errors, results, fields) => {
    //             if (errors) {
    //                 reject(errors)
    //             } else {
    //                 resolve(result)
    //             }
    //         });
    //     })
    // }
}
