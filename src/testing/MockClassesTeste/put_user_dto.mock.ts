import { UpdatePutUserDto } from '../../user/DTO/update_put-user.dto';
import { Role } from '../../enums/role.enum';

export const MockUserPut: UpdatePutUserDto = {
  email: 'email2@a.com',
  name: 'Baba',
  password: '$2b$10$UW.Gr54hp79MO5V7yOZBwO3Xu87OW45ykK/95cxib77m2QMefpWQq',
  role: Role.User,
};
