import { sign, verify } from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
// import * as jwt from 'jsonwebtoken';
// import { connectToDatabase } from './db';
// import bcrypt from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import { connectToDatabase } from 'db';

const secretKey = '199310183018'; // replace with your own secret key

export interface IUser {
  _id: any;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  carrier: string;
}

export interface ITokenPayload {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
  isLoggedIn: any;
  static async login(email: string, password: string): Promise<string | null> {
    const db = await connectToDatabase();
    // const user: IUser & { _id: string } | null = await db.collection('users').findOne({ email });
    const user = await db.collection('users').findOne({ email }) as IUser | null;


    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenPayload: ITokenPayload = { id: user._id.toString(), username: user.firstName };
      const token = sign(tokenPayload, secretKey, { expiresIn: '5m' });
      return token;
    } else {
      return null;
    }
  }

  static async verifyToken(token: string): Promise<ITokenPayload | null> {
    try {
      const decoded = verify(token, secretKey) as ITokenPayload;
      return decoded;
    } catch (err) {
      console.error('Error verifying token:', err);
      return null;
    }
  }
}
