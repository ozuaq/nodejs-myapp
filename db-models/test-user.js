/*
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://ozayoshi:kurogane4679@localhost/mydb');

const testUser = sequelize.define('testUser', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(testUser === sequelize.models.testUser); // true

async function initTestUser(){
  await testUser.sync({force: true});
}

async function insertTestUser(){
  // Create a new user
  const jane = await testUser.create({ firstName: "Jane", lastName: "Doe" });
  console.log("Jane's auto-generated ID:", jane.id);
}

async function selectTestUser(){
  // Find all users
  const testUsers = await testUser.findAll();
  console.log("All users:", JSON.stringify(testUsers));
}

async function updateTestUser(){
  // Change everyone without a last name to "Doe"
  await testUser.update({ lastName: "Doe" }, {
    where: {
      lastName: null
    }
  });
}


// main
let argv = process.argv

switch (argv[1]) {
  case "init":
    initTestUser();
    break;
  case "insert":
    insertTestUser();
    break;
  case "update":
    updateTestUser();
    break;
  case "select":
    selectTestUser();
    break;
  default:
    break;
}
*/
const { Sequelize, DataTypes } = require('sequelize')
/*
const sequelize = new Sequelize('mydb', 'ozayoshi', 'kurogane4679', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})
*/

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../mydb.db',
  logging: false,
});

//--------------------------------------------
// Models
//--------------------------------------------
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  }
})

//--------------------------------------------
// CRUD
//--------------------------------------------
!(async()=>{
  // MySQL上にテーブルを作成
  await User.sync({alter: true})

  // 既存のデータを削除(TRUNCATE)
  await User.destroy({
    truncate: true
  })

  // Userテーブルへデータを挿入
  const user = await User.bulkCreate([
    {name:'Honda',    age:18},
    {name:'Yamaha',   age:16},
    {name:'Suzuki',   age:20},
    {name:'Kawasaki', age:24}
  ])

  // 'Suzuki'のageを21に更新
  await User.update({ age: 21 }, {
    where: {
      name: 'Suzuki'
    }
  })

  // 'Yamaha'を削除
  await User.destroy({
    where: {
      name: 'Yamaha'
    }
  })

  // Userテーブルの全レコードを取得
  const rows = await User.findAll();
  rows.forEach(row => {
    const id = row.id
    const name = row.name
    const age  = row.age

    console.log(`${id}: ${name} ${age}`)
  })

  // MySQLから切断
  await sequelize.close()
})()