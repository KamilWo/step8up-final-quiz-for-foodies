import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../config/sequelize.mjs";

class Quiz extends Model {
}

Quiz.init({
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

// Export Quiz model
export default Quiz;
