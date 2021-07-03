class UserModel {

constructor(Name, phoneNumber) {
        this.userName = Name;
        this.userPhone=phoneNumber;
    }

    // getCustomerId() {
    //     return this.customerId;
    // }

    // setCustomerId(customerId) {
    //     this.customerId = customerId
    // }

    getName() {
        return this.userName;
    }

    setName(userName) {
        this.userName = userName
    }

    getPhoneNumber() {
        return this.userPhone;
    }

    setPhoneNumber(userPhone) {
        this.userPhone = userPhone
    }

}
module.exports.userModel = UserModel;

