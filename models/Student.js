module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters'
        }
      }
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Class is required'
        },
        len: {
          args: [1, 50],
          msg: 'Class must be between 1 and 50 characters'
        }
      }
    },
    roll_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'roll_no',
      validate: {
        notEmpty: {
          msg: 'Roll number is required'
        },
        len: {
          args: [1, 20],
          msg: 'Roll number must be between 1 and 20 characters'
        }
      }
    }
  }, {
    tableName: 'students',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['roll_no'],
        name: 'students_roll_no_unique'
      }
    ]
  });

  return Student;
};
