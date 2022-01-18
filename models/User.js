import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    nationalityIDNum: {
      type: String,
      required: [true, "Please add a nationality ID"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide add a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "editor", "moderator"],
      default: "user",
    },
    photo: {
      type: String,
      default: "/noImg.jpg",
    },
    approval: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    addBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachment: {
      info: [{ description: String, url: String }],
      family: [{ description: String, url: String }],
      rank: [{ description: String, url: String }],
      work: [{ description: String, url: String }],
      education: [{ description: String, url: String }],
      status: [{ description: String, url: String }],
      medal: [{ description: String, url: String }],
      // education: [{ description: String, url: String }],
      // child: [{ description: String, url: String }],
    },
    moderatorType: String,
    vaccine: String,
    civilID: String,
    officerID: String,
    cardID: String,
    department: String,
    generalDepartment: String,
    employmentDate: String,
    fullyEmploymentDate: String,
    otherNote: String,
    birthCertificateNum: String,
    passportNumber: String,
    otherNum: String,
    lastName: String,
    firstName: String,
    nationality: String,
    lastNameLatin: String,
    firstNameLatin: String,
    ethnicity: String,
    gender: String,
    birthDate: Date,
    bloodType: String,
    physical: String,
    disabilityNum: String,
    familyStatus: String,
    officerStatus: [
      {
        refNum: String,
        letterType: String,
        rank: String,
        status: String,
        ministry: String,
        position: String,
        startDate: String,
        generalDepartment: String,
        department: String,
        endDate: String,
        otherNote: String,
      },
    ],
    latestOfficerStatus: {
      refNum: String,
      letterType: String,
      rank: String,
      unit: String,
      office: String,
      status: String,
      ministry: String,
      position: String,
      startDate: String,
      generalDepartment: String,
      department: String,
      endDate: String,
      otherNote: String,
    },
    rank: [
      {
        refNum: String,
        startDate: String,
        endDate: String,
        letterType: String,
        promoteType: String,
        statueType: String,
        framework: String,
        rankType: String,
        level: String,
        otherNote: String,
      },
    ],
    privateSector: [
      {
        unit: String,
        role: String,
        skill: String,
        startDate: String,
        endDate: String,
      },
    ],
    praised: [
      {
        refNum: String,
        date: String,
        letterType: String,
        ministry: String,
        type: { type: String },
        photo: String,
      },
    ],
    penalty: [
      {
        refNum: String,
        date: String,
        letterType: String,
        ministry: String,
        type: { type: String },
        photo: String,
      },
    ],
    birthPlace: {
      province: String,
      district: String,
      commune: String,
      village: String,
      other: String,
    },
    currentResidence: {
      province: String,
      district: String,
      commune: String,
      village: String,
      other: String,
      houseNum: String,
      streetNum: String,
    },
    contactInfo: {
      email: String,
      phoneNumber1: String,
      phoneNumber2: String,
      other: String,
    },
    motherInfo: {
      nationalityIDNum: String,
      fullName: String,
      fullNameLatin: String,
      birthDate: String,
      nationality: String,
      ethnicity: String,
      occupation: String,
      livingStatus: String,
      birthPlace: {
        province: String,
        district: String,
        commune: String,
        village: String,
        other: String,
      },
      phoneNumber: String,
    },
    fatherInfo: {
      nationalityIDNum: String,
      fullName: String,
      fullNameLatin: String,
      birthDate: String,
      nationalityIDNum: String,
      nationality: String,
      ethnicity: String,
      occupation: String,
      livingStatus: String,
      birthPlace: {
        province: String,
        district: String,
        commune: String,
        village: String,
        other: String,
      },
      phoneNumber: String,
    },
    partnerInfo: {
      weddingCertificateNum: String,
      nationalityIDNum: String,
      fullName: String,
      fullNameLatin: String,
      statusLive: String,
      occupation: String,
      birthDate: String,
      nationality: String,
      ethnicity: String,
      phoneNumber: String,
      workPlace: String,
      birthPlace: {
        province: String,
        district: String,
        commune: String,
        village: String,
        other: String,
      },
      currentResidence: {
        province: String,
        district: String,
        commune: String,
        village: String,
        other: String,
        houseNum: String,
        streetNum: String,
      },
    },
    children: [
      {
        birthCertificateNum: String,
        nationalityIDNum: String,
        fullName: String,
        fullNameLatin: String,
        birthDate: String,
        gender: String,
        occupation: String,
        livingStatus: String,
      },
    ],
    education: [
      {
        course: String,
        level: String,
        degreeType: String,
        institution: String,
        startDate: String,
        endDate: String,
        other: String,
        place: String,
      },
    ],
    experience: [
      {
        refNum: String,
        refType: String,
        ministry: String,
        position: String,
        unit: String,
        office: String,
        institution: String,
        provinces: String,
        district: String,
        commune: String,
        department: String,
        startDate: String,
        endDate: String,
      },
    ],
  },
  {
    timestamps: true,
    // toObject: { virtuals: true },
    toJSON: {
      // virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  //
  const { officerStatus, experience, education } = this._update;
  if (officerStatus) {
    this._update.officerStatus = officerStatus.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    this._update.latestOfficerStatus = this._update.officerStatus[0];
  }
  if (experience) {
    this._update.experience = experience.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }
  if (education) {
    this._update.education = education.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }
  next();
});

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("Nationality ID already being used"));
  }
  next();
});

// UserSchema.virtual("latestOfficerStatus").get(function () {
//   return this.officerStatus[0] || {};
// });

export default mongoose.models.User || mongoose.model("User", UserSchema);
