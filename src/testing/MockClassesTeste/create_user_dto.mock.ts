import { Role } from '../../enums/role.enum';
import { CreateUserDto } from '../../user/DTO/create_user.dto';

export const MockUserCreate: CreateUserDto = {
  email: 'email@a.com',
  name: 'BOB',
  password: '$2b$10$UW.Gr54hp79MO5V7yOZBwO3Xu87OW45ykK/95cxib77m2QMefpWQq',
  role: Role.Admim,
};
