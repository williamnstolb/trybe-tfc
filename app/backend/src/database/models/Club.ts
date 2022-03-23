import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id?: number;

  public clubName: string;
}

Club.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
