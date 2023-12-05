import PermissionSeed from '@/modules/database/seeds/permission.seed';
import RoleSeed from '@/modules/database/seeds/role.seed';
import RolePermissionSeed from '@/modules/database/seeds/role-permission.seed';
import UserSeed from '@/modules/database/seeds/user.seed';
import LayerSeed from '@/modules/database/seeds/layer.seed';
import CustomFieldTypeSeed from '@/modules/database/seeds/custom-filed-type.seed';

export default async function InitialSeed() {
  await PermissionSeed();
  await RoleSeed();
  await RolePermissionSeed();
  await UserSeed();
  await LayerSeed();
  await CustomFieldTypeSeed();
}
