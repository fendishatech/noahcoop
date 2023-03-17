const db = require("./database");
const userModel = require("../services/user/model");
const clientModel = require("../services/client/model");
const {
  Member,
  City,
  SubCity,
  MemberAddress,
  EmergencyContact,
  IdType,
  MemberId,
} = require("../services/member/model");

const migrateSchema = async () => {
  try {
    await db.authenticate();
    console.log("Database is connected");

    await userModel.sync();
    await clientModel.sync();
    await Member.sync();
    await City.sync();
    await SubCity.sync();
    // await MemberAddress.sync();
    // await EmergencyContact.sync();
    await IdType.sync();
    // await MemberId.sync();
    console.log("Migration must'a went well!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  migrateSchema,
};
