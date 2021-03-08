/*
  Object.keys(객체)
  - 객체 혹은 enum타입의 각 key들의 값들의 배열.
*/
const UserRole = {
  Client: "Client",
  Delivery: "Delivery",
  Owner: "Owner",
};

Object.keys(UserRole);
// ["Client", "Delivery", "Owner"]

// ==============================================
// React - TS
export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}
// ~~~~
<select ref={register({ required: true })} className="capsule-input">
{Object.keys(UserRole).map((role) => (
  <option>{role}</option>
))}
</select>

// ==============================================