import { Factory, Seeder } from 'typeorm-seeding';
import Book from '../factories/book.factory';
import User from '../factories/user.factory';

export class SampleSeed implements Seeder {
  public async run(factory: Factory) {
    const user = await factory(User)().create();
    await factory(Book)().create({ user: user });
  }
}
