// export { default as User } from "./user.mjs";
// export { default as Quiz } from "./quiz.mjs";

import User from "./user.mjs";
 import Quiz from "./quiz.mjs";
 import Rank from "./rank.mjs";

 // Model associations
 User.hasMany(Rank, {
   foreignKey: "user_id",
   onDelete: "CASCADE", // If a user is deleted, their ranks are also deleted
 });

 Rank.belongsTo(User, {
   foreignKey: "user_id",
 });

 export { User, Quiz, Rank };
