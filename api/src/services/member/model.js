const Sequelize = require("sequelize");
const db = require("../../helper/database");

const { DataTypes } = Sequelize;

const Member = db.define(
  "members",
  {
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      nullable: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      nullable: true,
    },
    dob: {
      type: DataTypes.DATE,
      nullable: true,
    },
    martialStatus: {
      type: DataTypes.ENUM("married", "single", "divorced", "widow"),
      nullable: true,
    },
    familyMembers_no: {
      type: DataTypes.INTEGER,
      nullable: true,
    },
    familyMembersGender: {
      type: DataTypes.STRING,
      nullable: true,
    },
    eduStatus: {
      type: DataTypes.ENUM(
        "elementary",
        "primary",
        "secondary",
        "college",
        "degree",
        "masters",
        "phd",
        "professor"
      ),
      nullable: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      unique: true,
    },
    jobExperience: {
      type: DataTypes.STRING,
      unique: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      nullable: true,
    },
    willList: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    memberType: {
      type: DataTypes.ENUM("regular", "child"), // An ENUM with allowed values 'foo' and 'bar'
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

const City = db.define(
  "cities",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

const SubCity = db.define(
  "sub_cities",
  {
    name: {
      type: DataTypes.STRING,
    },
    woredas: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

const MemberAddress = db.define(
  "member_addresses",
  {
    woreda: {
      type: DataTypes.INTEGER,
    },
    houseNo: {
      type: DataTypes.INTEGER,
    },
    placeName: {
      type: DataTypes.INTEGER,
    },
    phoneNo2: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

MemberAddress.hasMany(City);
City.belongsTo(MemberAddress);

MemberAddress.hasMany(SubCity);
SubCity.belongsTo(MemberAddress);

MemberAddress.hasOne(Member);
Member.belongsTo(MemberAddress);

module.exports = { Member, City, SubCity, MemberAddress };
