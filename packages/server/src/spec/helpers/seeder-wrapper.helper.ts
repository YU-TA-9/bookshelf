import { ObjectType } from 'typeorm';
import { define as defineOrigin } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

export const define = <Entity, Context>(
  Entity: ObjectType<Entity>,
  factoryFn: (faker) => Entity,
): void => {
  defineOrigin(Entity, (_faker): Entity => {
    // MEMO:
    // typeorm-seedingに依存しているfakerのバージョンがdeprecateかつ使用できない関数があるため、
    // 最新のバージョンでラップする
    return factoryFn(faker);
  });
};
