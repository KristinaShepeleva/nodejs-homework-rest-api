const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseErroe } = require("../helpers");

const subscriptionList = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
     password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
        type: String,
        default: "",
    },
    avatarURL: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: "",
    },
}, { versionKey: false, timestamps: true });


userSchema.post("save", handleMongooseErroe);


const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})


const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const schemas = {
    registerSchema,
    emailSchema,
    loginSchema,
    updateSubscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
    User, 
    schemas,
}