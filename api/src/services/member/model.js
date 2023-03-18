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
    jobExperienceYear: {
      type: DataTypes.STRING,
      unique: true,
    },
    jobExperienceMonth: {
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
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
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
      unique: true,
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

const IdType = db.define(
  "identification_type",
  {
    name: {
      type: DataTypes.STRING,
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

const EmergencyContact = db.define(
  "emergency_contact",
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
    woreda: {
      type: DataTypes.INTEGER,
    },
    houseNo: {
      type: DataTypes.INTEGER,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

//  One to One
// Member to MemberAddress relation
Member.hasOne(MemberAddress);
MemberAddress.belongsTo(Member);

Member.hasOne(EmergencyContact);
EmergencyContact.belongsTo(Member);

//  One to many
City.hasMany(MemberAddress);
MemberAddress.belongsTo(City);

City.hasMany(EmergencyContact);
EmergencyContact.belongsTo(City);

SubCity.hasMany(MemberAddress);
MemberAddress.belongsTo(SubCity);

SubCity.hasMany(EmergencyContact);
EmergencyContact.belongsTo(SubCity);

// Many to Many
const MemberId = db.define("MemberId", {
  memberId: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: "id",
    },
  },
  IdTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: IdType,
      key: "id",
    },
  },
  idNumber: {
    type: DataTypes.STRING,
  },
  idPath: {
    type: DataTypes.STRING,
  },
});

Member.belongsToMany(IdType, { through: MemberId });
IdType.belongsToMany(Member, { through: MemberId });

module.exports = {
  Member,
  City,
  SubCity,
  MemberAddress,
  EmergencyContact,
  IdType,
  MemberId,
};
