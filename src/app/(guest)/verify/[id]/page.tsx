import Verify from "@/components/auth/verify";

const VerifyPage = (params: any) => {
  const { id } = params;

  return (
    <>
      <Verify id={id} />
    </>
  );
};

export default VerifyPage;
