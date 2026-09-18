import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from '../types';

export interface IUserDocument extends Document {
  name: string;
  email?: string;
  phone: string;
  passwordHash?: string;
  role: Role;
  addresses: {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    streetAddress: string;
    isDefault?: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, sparse: true },
    phone: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['CUSTOMER', 'ADMIN', 'STAFF'], default: 'CUSTOMER' },
    addresses: [
      {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        streetAddress: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
