import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../config/sequelize.mjs";

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "question",
});

// Export User model
export default Question;
