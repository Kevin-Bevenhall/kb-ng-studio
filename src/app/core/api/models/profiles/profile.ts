import { PaletteEnum } from "src/app/shared/services/theme.service";

export type Profile = {
  avatar_url: string,
  full_name: string,
  id: string,
  updated_at: string,
  username: string,
  palette: PaletteEnum
}