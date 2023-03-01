import { ROLE } from 'src/constants/role.constants';

export type PersonUpdateDto = {
  name: string;
  birthday: string;
  picture?: string;
  hasAlliance?: boolean;
  roles?: ROLE[];
};
