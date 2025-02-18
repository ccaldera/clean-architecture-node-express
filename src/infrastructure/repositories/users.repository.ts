import { error } from "console";
import { IUserRepository } from "../../application/interfaces/users.repository";
import { User } from "../../domain/entities/user";
import { MongoClient } from 'mongodb';

export class UserRepository implements IUserRepository {  

  private url:string = 'mongodb://localhost:27017/';
  private dbName:string = 'admin';
  
  async findByEmailAndPassword(email: string, password:string): Promise<User | null> {

    const client = new MongoClient(this.url);

    try {
      await client.connect();

      const db = client.db(this.dbName);

      const collection = db.collection('Users');

      const user = await collection.findOne<User>({email, password});

      return user;
      
    }
    catch(e){
      console.log(e);
      return null;
    }
    finally {
      await client.close();
    }
  }
}



