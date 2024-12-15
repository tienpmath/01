import { auth } from "@/auth";
import ProductsTable from "@/components/admin/product.table";
import { sendRequest } from "@/utils/api";

// interface IProps {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }
const ManageProductPage = async (props: any) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-products"] },
    },
  });
  return (
    <div>
      <ProductsTable blogs={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageProductPage;
