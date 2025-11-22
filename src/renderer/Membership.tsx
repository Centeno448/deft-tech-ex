import { useAppDispatch } from "./hooks";
import { setPurchaseCustomer } from "./store";
import { CustomerType } from "../common/customerType";
import { useNavigate } from "react-router";
import "./Membership.scss";

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
      <div className="options">
        <p className="label">Select customer type:</p>
        <div className="btnContainer">
          <button className="btn primary" onClick={handleRewardsMember}>
            Rewards Member
          </button>

          <button className="btn secondary" onClick={handleRegularCustomer}>
            Regular Customer
          </button>
        </div>
      </div>
    </>
  );
}
