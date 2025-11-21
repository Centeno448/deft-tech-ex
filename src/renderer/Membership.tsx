import { useAppDispatch } from "./hooks";
import { setPurchaseCustomer } from "./store";
import { CustomerType } from "../common/customerType";
import { useNavigate } from "react-router";

export default function Membership() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMembership = (type: CustomerType) => {
    dispatch(setPurchaseCustomer(type));
    navigate("/purchase/cart");
  };

  const handleRewardsMember = () => handleMembership(CustomerType.Member);
  const handleRegularCustomer = () => handleMembership(CustomerType.Regular);

  return (
    <>
      <p>Select customer type:</p>

      <button onClick={handleRewardsMember}>Rewards Member</button>

      <button onClick={handleRegularCustomer}>Regular Customer</button>
    </>
  );
}
