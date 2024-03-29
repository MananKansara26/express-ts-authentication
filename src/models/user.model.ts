import { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUserMethods {
  isPasswordMatch(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (this: IUser) {
  // why we are passing this in function argument?
  if (this.isModified('password')) {
    const rounds = 10;
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
  }
});

userSchema.method(
  'isPasswordMatch',
  async function (this: IUser, password: string) {
    return bcrypt.compare(password, this.password);
  },
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
