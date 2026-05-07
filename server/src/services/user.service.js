import { becomeSeller } from "../repositories/user.repository.js";

export const becomeSellerService = async (userId) => {
  const updatedUser = await becomeSeller(userId);

  return updatedUser;
};