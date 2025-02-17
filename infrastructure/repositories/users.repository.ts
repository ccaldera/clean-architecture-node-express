import { IUserRepository } from "../../application/interfaces/users.repository";
import { User } from "../../domain/entities/user";
import { MongoClient } from 'mongodb';

export class UserRepository implements IUserRepository {  

  private url:string = 'mongodb://localhost:27017';
  private dbName:string = 'mydatabase';
  
  async findByEmailAndPassword(email: string, password:string): Promise<User | null> {

    const client = new MongoClient(this.url);

    try {
      await client.connect();

      const db = client.db(this.dbName);

      const collection = db.collection('users');

      const user = await collection.findOne<User>({email, password});

      return user;
    } finally {
      await client.close();
    }

  }
}



