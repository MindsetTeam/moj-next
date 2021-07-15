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
      enum: ["user", "admin", "editor"],
      default: "user",
    },
    departmentRole: {
      type: String
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
      default: false
    },
    addBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    civilID: String,
    department: String,
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
    birthDate: String,
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
        endDate: String,
        otherNote: String,
      },
    ],
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
        startYear: String,
        endYear: String,
        other: String,
        place: String,
      },
    ],
    experience: [
      {
        refNum: String,
        position: String,
        unit: String,
        institution: String,
        department: String,
        startDate: String,
        endDate: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
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
  this.password = await bcrypt.hash(this.nationalityIDNum, 10);
});

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("Nationality ID already being used"));
  } else {
    next(error);
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
