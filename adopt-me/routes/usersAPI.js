const data = require('../data/users.json');

let usersData = [];

for (let i = 0; i < data.length; i++) {
    usersData.push(data[i])
}

function get(id) {
    return usersData.find(user => user.id == id)
}

function deleteU(id) {
    const userDeleted = get(id)
    console.log(userDeleted);
    usersData.splice(usersData.indexOf(userDeleted),usersData.indexOf(userDeleted)+1 )
    console.log("Usuario borrado")
    return userDeleted
}

function updateU(id, fullname, age) {
    const user = get(id);
    user.fullname = fullname
    user.age = age
    return user;
}

function add(fullname, age) {
    usersData.push({ id: usersData.length + 1,  fullname: fullname, age: age })
    return get(usersData.length);
}

module.exports = {
    usersData: usersData,
    deleteU: deleteU,
    updateU: updateU,
    add: add
}