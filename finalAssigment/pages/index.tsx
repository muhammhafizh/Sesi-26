import MainLayout from "@/components/layouts/MainLayout";
import { useAppSelector } from "@/core/redux/hooks";
import { useGetPostsQuery } from "@/core/redux/slices/posts/queries";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isLoading, data, isError } = useGetPostsQuery();
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
  return (
    <MainLayout>
      <div className="text-xl py-8 max-w-xl mx-auto">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {data &&
          data
            .filter((i, idx) => idx < 20)
            .map((post) => (
              <div
                key={post.id}
                className="py-3 px-5 shadow-lg shadow-gray-500/20 rounded-md cursor-pointer hover:bg-gray-50 mt-4"
              >
                {post.title}
              </div>
            ))}
      </div>
    </MainLayout>
  );
};

export default Home;
