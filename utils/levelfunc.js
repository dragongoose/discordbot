var hex = Math.floor(Math.random() * 0xFFFFFF);
var result = "#" + hex.toString(16);


var hex = Math.floor(Math.random() * 0xFFFFFF);
var result = "#" + hex.toString(16);


function checkLevel(level, message, user) {

  if (level == undefined) {
    var level = 0
    console.log('NEW LEVEL: ' + level)
  }
  var abc = 1
  var ids = []
  let player = message.guild.members.cache.get(user);

  while (true) {
    const role = message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + abc)

    if (role == undefined) {
      var total = abc
      break;
    }
    ++abc;
    var rle = JSON.stringify(role)
    ids.push(JSON.parse(rle).id)
  }

  var addloop = 0
  while (addloop < ids.length) {
    if (message.guild.roles.cache.find(guild_role => guild_role.id == ids[addloop]) == message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + level)) {
      ++addloop;
    } else {
      player.roles.remove(ids[addloop])
      ++addloop;
    }
  }
  if (message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + level) == undefined) {
    console.log('user is unranked')
  } else {
    player.roles.add(message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + level))
  }

}


function levelRole(level, message, user) {

  if (level == undefined) {
    var level = 0
    console.log('NEW LEVEL: ' + level)
  }

  const role = message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + level)
  var role2var = level - 1
  console.log(role2var)
  const role2 = message.guild.roles.cache.find(guild_role => guild_role.name == 'Level ' + role2var)

  if (!role) {
    message.guild.roles.create({
      data: {
        name: 'Level ' + level,
        color: result,
      },
      reason: 'role for auto level',
    })
      .then(value => {
        console.log('2 ' + role2);
        const newvalue = JSON.stringify(value);
        const codeid = JSON.parse(newvalue);
        let setroleuser = message.guild.members.cache.get(user);
        setroleuser.roles.remove(role2);
        setroleuser.roles.add(codeid.id);


      })
      .catch(console.error);
  } else {
    console.log('2 ' + role2)
    let setroleuser = message.guild.members.cache.get(user)
    let value = JSON.stringify(role)
    let value2 = JSON.parse(value)
    setroleuser.roles.remove(role2)
    setroleuser.roles.add(value2.id)



  }
}

module.exports = {
  checkLevel,
  levelRole
}