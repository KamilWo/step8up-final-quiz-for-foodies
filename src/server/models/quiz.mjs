import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../config/sequelize.mjs";

class Quiz extends Model {
}

Quiz.init(
  {
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,    
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,   
  },
  option_01: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
  option_02: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
  option_03: {
    type: DataTypes.TEXT,
    allowNull: true,  
  },
  option_04: {
    type: DataTypes.TEXT,
    allowNull: true,   
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
  difficulty: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate: {
      isIn: [['easy', 'medium', 'hard']],
    }, 
},
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "question",
});

// Export Quiz model
export default Quiz;
