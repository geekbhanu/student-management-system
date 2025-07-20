module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Please enter a valid date'
        },
        notEmpty: {
          msg: 'Date is required'
        },
        isAfter: {
          args: '2000-01-01',
          msg: 'Date must be after January 1, 2000'
        },
        isBefore: {
          args: '2100-01-01',
          msg: 'Date must be before January 1, 2100'
        }
      }
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent"),
      allowNull: false,
      defaultValue: "Present",
      validate: {
        isIn: {
          args: [["Present", "Absent"]],
          msg: "Status must be either 'Present' or 'Absent'"
        }
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'attendances',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['student_id', 'date'],
        name: 'attendance_student_date_unique'
      }
    ]
  });

  return Attendance;
};
