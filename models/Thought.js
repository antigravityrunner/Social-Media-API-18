const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

function getNumberSuffix(num) {
  const th = "th";
  const rd = "rd";
  const nd = "nd";
  const st = "st";

  if (num === 11 || num === 12 || num === 13) return th;

  let lastDigit = num.toString().slice(-1);

  switch (lastDigit) {
    case "1":
      return st;
    case "2":
      return nd;
    case "3":
      return rd;
    default:
      return th;
  }
}

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeStamp) => {
      var numSuf = getNumberSuffix(timeStamp.getDate());
      var firstHalf = DateTime.fromJSDate(timeStamp).toFormat("MMM dd");
      var secondHalf =
        DateTime.fromJSDate(timeStamp).toFormat(", yyyy at hh:mm a");
      return firstHalf + numSuf + secondHalf;
    },
  },
});

const userSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
    minLength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeStamp) => {
      var numSuf = getNumberSuffix(timeStamp.getDate());
      var firstHalf = DateTime.fromJSDate(timeStamp).toFormat("MMM dd");
      var secondHalf =
        DateTime.fromJSDate(timeStamp).toFormat(", yyyy at hh:mm a");
      return firstHalf + numSuf + secondHalf;
    },
  },

  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const User = model("user", userSchema);

module.exports = User;
