const StaffModel = require("../models/staff.model");
const ObjectId = require("mongoose").Types.ObjectId;

class StaffService {
  constructor() {
    this.db = StaffModel;
  }

  async findById(StaffID) {
    return await this.db.findOne({
      _id: ObjectId.isValid(StaffID) ? new ObjectId(StaffID) : null,
    });
  }

  async addStaff(Staff) {
    return await this.db.create(Staff);
  }

  async getAll() {
    return await this.db.find(
      {},
      {
        __v: 0,
      }
    );
  }

  async findByPhoneNumber(PhoneNumber) {
    return await this.db.findOne({
      PhoneNumber: PhoneNumber,
    });
  }

  async findByStaffName(FullName) {
    return await this.db.findOne({
      FullName: FullName,
    });
  }
  async findByRefreshToken(RefreshToken) {
    return await this.db.findOne({
      RefreshToken: RefreshToken,
    });
  }
  async updateRefreshToken(StaffID, RefreshToken) {
   return await this.db.findOneAndUpdate(
      { _id: ObjectId.isValid(StaffID) ? new ObjectId(StaffID) : null },
      { RefreshToken: RefreshToken }
    )
  }
} 

module.exports = StaffService;
