import { useRouter } from "next/router";

import Reset from "../../components/ResetPassword";
const ResetPassword = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <div style={{margin:"0px",padding:"0px"}}>
      <Reset id={userId} />
    </div>
  );
};
export default ResetPassword;
